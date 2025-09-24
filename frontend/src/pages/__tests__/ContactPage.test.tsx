import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import ContactPage from '../ContactPage'
import { ToastProvider } from '../../components/ui/Toast'

// Mock the analytics function
vi.mock('../../utils/analytics', () => ({
  trackContactFormSubmission: vi.fn(),
}))

// Mock the API
vi.mock('../../utils/api', () => ({
  api: {
    post: vi.fn(),
  },
}))

import { api } from '../../utils/api'
import { trackContactFormSubmission } from '../../utils/analytics'

const renderContactPage = () => {
  return render(
    <HelmetProvider>
      <BrowserRouter>
        <ToastProvider>
          <ContactPage />
        </ToastProvider>
      </BrowserRouter>
    </HelmetProvider>
  )
}

describe('ContactPage Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders all form fields correctly', () => {
    renderContactPage()
    
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/service of interest/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
  })

  it('shows validation errors for empty fields', async () => {
    renderContactPage()
    
    const submitButton = screen.getByRole('button', { name: /send message/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument()
      expect(screen.getByText('Email is required')).toBeInTheDocument()
      expect(screen.getByText('Please select a service')).toBeInTheDocument()
      expect(screen.getByText('Message is required')).toBeInTheDocument()
    })
  })

  it('shows validation error for invalid email', async () => {
    renderContactPage()
    
    const emailInput = screen.getByLabelText(/email address/i)
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
    
    const submitButton = screen.getByRole('button', { name: /send message/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument()
    })
  })

  it('shows validation error for short name', async () => {
    renderContactPage()
    
    const nameInput = screen.getByLabelText(/full name/i)
    fireEvent.change(nameInput, { target: { value: 'A' } })
    
    const submitButton = screen.getByRole('button', { name: /send message/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Name must be at least 2 characters')).toBeInTheDocument()
    })
  })

  it('shows validation error for short message', async () => {
    renderContactPage()
    
    const messageInput = screen.getByLabelText(/message/i)
    fireEvent.change(messageInput, { target: { value: 'Short' } })
    
    const submitButton = screen.getByRole('button', { name: /send message/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Message must be at least 10 characters')).toBeInTheDocument()
    })
  })

  it('clears validation errors when user starts typing', async () => {
    renderContactPage()
    
    const nameInput = screen.getByLabelText(/full name/i)
    const submitButton = screen.getByRole('button', { name: /send message/i })
    
    // Trigger validation error
    fireEvent.click(submitButton)
    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument()
    })
    
    // Start typing to clear error
    fireEvent.change(nameInput, { target: { value: 'John' } })
    
    expect(screen.queryByText('Name is required')).not.toBeInTheDocument()
  })

  it('submits form successfully with valid data', async () => {
    const mockApiResponse = { success: true, message: 'Thank you for your message!' }
    vi.mocked(api.post).mockResolvedValue(mockApiResponse)
    
    renderContactPage()
    
    // Fill out the form
    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'John Doe' } })
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'john@example.com' } })
    fireEvent.change(screen.getByLabelText(/service of interest/i), { target: { value: 'Website Designing' } })
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'I need a new website for my business.' } })
    
    const submitButton = screen.getByRole('button', { name: /send message/i })
    fireEvent.click(submitButton)
    
    // Check loading state
    await waitFor(() => {
      expect(screen.getByText('Sending Message...')).toBeInTheDocument()
    })
    
    // Wait for success
    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/api/contact', {
        name: 'John Doe',
        email: 'john@example.com',
        service: 'Website Designing',
        message: 'I need a new website for my business.'
      })
    })
    
    expect(trackContactFormSubmission).toHaveBeenCalledWith('Website Designing')
  })

  it('handles API error gracefully', async () => {
    const mockError = new Error('Network error')
    vi.mocked(api.post).mockRejectedValue(mockError)
    
    renderContactPage()
    
    // Fill out the form with valid data
    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'John Doe' } })
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'john@example.com' } })
    fireEvent.change(screen.getByLabelText(/service of interest/i), { target: { value: 'Website Designing' } })
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'I need a new website for my business.' } })
    
    const submitButton = screen.getByRole('button', { name: /send message/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(api.post).toHaveBeenCalled()
    })
    
    // Should not call tracking on error
    expect(trackContactFormSubmission).not.toHaveBeenCalled()
  })

  it('shows character count for message field', () => {
    renderContactPage()
    
    const messageInput = screen.getByLabelText(/message/i)
    fireEvent.change(messageInput, { target: { value: 'Hello world' } })
    
    expect(screen.getByText('11/500 characters')).toBeInTheDocument()
  })

  it('shows warning color when approaching character limit', () => {
    renderContactPage()
    
    const messageInput = screen.getByLabelText(/message/i)
    const longMessage = 'a'.repeat(451)
    fireEvent.change(messageInput, { target: { value: longMessage } })
    
    const characterCount = screen.getByText('451/500 characters')
    expect(characterCount).toHaveClass('text-orange-600')
  })

  it('resets form after successful submission', async () => {
    const mockApiResponse = { success: true, message: 'Thank you for your message!' }
    vi.mocked(api.post).mockResolvedValue(mockApiResponse)
    
    renderContactPage()
    
    const nameInput = screen.getByLabelText(/full name/i) as HTMLInputElement
    const emailInput = screen.getByLabelText(/email address/i) as HTMLInputElement
    const serviceSelect = screen.getByLabelText(/service of interest/i) as HTMLSelectElement
    const messageInput = screen.getByLabelText(/message/i) as HTMLTextAreaElement
    
    // Fill out the form
    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } })
    fireEvent.change(serviceSelect, { target: { value: 'Website Designing' } })
    fireEvent.change(messageInput, { target: { value: 'I need a new website for my business.' } })
    
    const submitButton = screen.getByRole('button', { name: /send message/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(nameInput.value).toBe('')
      expect(emailInput.value).toBe('')
      expect(serviceSelect.value).toBe('')
      expect(messageInput.value).toBe('')
    })
  })
})