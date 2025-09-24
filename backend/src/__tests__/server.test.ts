import request from 'supertest'
import express from 'express'

// Mock the server setup for testing
const app = express()
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString() 
  })
})

describe('Server Health Check', () => {
  it('should return health status', async () => {
    const response = await request(app)
      .get('/api/health')
      .expect(200)

    expect(response.body.status).toBe('ok')
    expect(response.body.timestamp).toBeDefined()
  })
})