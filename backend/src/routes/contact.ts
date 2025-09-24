import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { sendContactEmail } from '../services/emailService'

const router = express.Router()

// Contact form validation rules
const contactValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('service')
    .isIn(['Website Designing', 'Notes', 'Translation', 'Logo Design', 'Counselling'])
    .withMessage('Please select a valid service'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Message must be between 10 and 500 characters')
]

// POST /api/contact
router.post('/', contactValidation, async (req: Request, res: Response) => {
  try {
    // Check for validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      })
    }

    const { name, email, service, message } = req.body

    // Send email
    await sendContactEmail({ name, email, service, message })

    res.json({
      success: true,
      message: 'Thank you for your inquiry! We will get back to you soon.'
    })
  } catch (error) {
    console.error('Contact form error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to send your message. Please try again later.'
    })
  }
})

export default router