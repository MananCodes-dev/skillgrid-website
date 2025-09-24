import request from 'supertest'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import contactRoutes from '../routes/contact'
import { sendContactEmail } from '../services/emailService'

// Mock the email service
jest.mock('../services/emailService', () => ({
  sendContactEmail: jest.fn().mockResolvedValue(undefined)
}))

const mockSendContactEmail = sendContactEmail as jest.MockedFunction<typeof sendContactEmail>

// Create test app
const app = express()
app.use(helmet())
app.use(cors())

// Add rate limiting for testing
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
})
app.use(limiter)

app.use(express.json())
app.use('/api/contact', contactRoutes)

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!' 
  })
})

describe('Contact API', () => {
  const validContactData = {
    name: 'John Doe',
    email: 'john@example.com',
    service: 'Website Designing',
    message: 'I need a website for my business. Please contact me.'
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('POST /api/contact', () => {
    it('should accept valid contact form submission', async () => {
      const response = await request(app)
        .post('/api/contact')
        .send(validContactData)
        .expect(200)

      expect(response.body.success).toBe(true)
      expect(response.body.message).toContain('Thank you')
    })

    it('should reject submission with missing name', async () => {
      const invalidData = { ...validContactData, name: '' }
      
      const response = await request(app)
        .post('/api/contact')
        .send(invalidData)
        .expect(400)

      expect(response.body.success).toBe(false)
      expect(response.body.message).toBe('Validation failed')
    })

    it('should reject submission with invalid email', async () => {
      const invalidData = { ...validContactData, email: 'invalid-email' }
      
      const response = await request(app)
        .post('/api/contact')
        .send(invalidData)
        .expect(400)

      expect(response.body.success).toBe(false)
      expect(response.body.errors).toBeDefined()
    })

    it('should reject submission with invalid service', async () => {
      const invalidData = { ...validContactData, service: 'Invalid Service' }
      
      const response = await request(app)
        .post('/api/contact')
        .send(invalidData)
        .expect(400)

      expect(response.body.success).toBe(false)
    })

    it('should reject submission with short message', async () => {
      const invalidData = { ...validContactData, message: 'Too short' }
      
      const response = await request(app)
        .post('/api/contact')
        .send(invalidData)
        .expect(400)

      expect(response.body.success).toBe(false)
    })

    it('should reject submission with long message', async () => {
      const invalidData = { 
        ...validContactData, 
        message: 'a'.repeat(501) // 501 characters
      }
      
      const response = await request(app)
        .post('/api/contact')
        .send(invalidData)
        .expect(400)

      expect(response.body.success).toBe(false)
    })

    it('should handle all valid services', async () => {
      const services = [
        'Website Designing',
        'Notes', 
        'Translation',
        'Logo Design',
        'Counselling'
      ]

      for (const service of services) {
        const data = { ...validContactData, service }
        
        const response = await request(app)
          .post('/api/contact')
          .send(data)
          .expect(200)

        expect(response.body.success).toBe(true)
      }
    })

    it('should call email service with correct data', async () => {
      await request(app)
        .post('/api/contact')
        .send(validContactData)
        .expect(200)

      expect(mockSendContactEmail).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        service: 'Website Designing',
        message: 'I need a website for my business. Please contact me.'
      })
    })

    it('should handle email service errors gracefully', async () => {
      mockSendContactEmail.mockRejectedValueOnce(new Error('Email service failed'))

      const response = await request(app)
        .post('/api/contact')
        .send(validContactData)
        .expect(500)

      expect(response.body.success).toBe(false)
      expect(response.body.message).toContain('Failed to send')
    })

    it('should trim whitespace from input fields', async () => {
      const dataWithWhitespace = {
        name: '  John Doe  ',
        email: '  john@example.com  ',
        service: 'Website Designing',
        message: '  I need a website for my business. This is a longer message to meet validation requirements.  '
      }

      await request(app)
        .post('/api/contact')
        .send(dataWithWhitespace)
        .expect(200)

      expect(mockSendContactEmail).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        service: 'Website Designing',
        message: 'I need a website for my business. This is a longer message to meet validation requirements.'
      })
    })

    it('should normalize email addresses', async () => {
      const dataWithUnnormalizedEmail = {
        ...validContactData,
        email: 'John.Doe+test@EXAMPLE.COM'
      }

      await request(app)
        .post('/api/contact')
        .send(dataWithUnnormalizedEmail)
        .expect(200)

      expect(mockSendContactEmail).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'john.doe+test@example.com'
        })
      )
    })



    it('should validate name length constraints', async () => {
      // Test minimum length
      const shortName = { ...validContactData, name: 'A' }
      let response = await request(app)
        .post('/api/contact')
        .send(shortName)
        .expect(400)
      expect(response.body.success).toBe(false)

      // Test maximum length
      const longName = { ...validContactData, name: 'a'.repeat(51) }
      response = await request(app)
        .post('/api/contact')
        .send(longName)
        .expect(400)
      expect(response.body.success).toBe(false)
    })

    it('should validate message length constraints', async () => {
      // Test minimum length
      const shortMessage = { ...validContactData, message: 'Short' }
      let response = await request(app)
        .post('/api/contact')
        .send(shortMessage)
        .expect(400)
      expect(response.body.success).toBe(false)

      // Test maximum length
      const longMessage = { ...validContactData, message: 'a'.repeat(501) }
      response = await request(app)
        .post('/api/contact')
        .send(longMessage)
        .expect(400)
      expect(response.body.success).toBe(false)
    })

    it('should handle multiple validation errors', async () => {
      const invalidData = {
        name: '',
        email: 'invalid-email',
        service: 'Invalid Service',
        message: 'Short'
      }

      const response = await request(app)
        .post('/api/contact')
        .send(invalidData)
        .expect(400)

      expect(response.body.success).toBe(false)
      expect(response.body.errors).toHaveLength(4)
    })

    it('should return proper error structure', async () => {
      const invalidData = { ...validContactData, email: 'invalid' }

      const response = await request(app)
        .post('/api/contact')
        .send(invalidData)
        .expect(400)

      expect(response.body).toHaveProperty('success', false)
      expect(response.body).toHaveProperty('message', 'Validation failed')
      expect(response.body).toHaveProperty('errors')
      expect(Array.isArray(response.body.errors)).toBe(true)
    })
  })

  describe('Security and Performance', () => {
    it('should have security headers', async () => {
      const response = await request(app)
        .post('/api/contact')
        .send(validContactData)

      // Check for some common security headers set by helmet
      expect(response.headers['x-content-type-options']).toBeDefined()
      expect(response.headers['x-frame-options']).toBeDefined()
    })

    it('should handle CORS properly', async () => {
      const response = await request(app)
        .options('/api/contact')

      expect(response.headers['access-control-allow-origin']).toBeDefined()
    })
  })
})