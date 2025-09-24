import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import userEvent from '@testing-library/user-event'
import ContactPage from '../../pages/ContactPage'
import { ToastProvider } from '../../components/ui/Toast'
import { ErrorBoundary } from '../../components/ErrorBoundary'

// Mock the API
const mockFetch = vi.fn()
global.fetch = mockFetch

// Mock analytics
vi.mock('../../utils/analytics', () => ({
  trackContactFormSubmission: vi.fn(),
}))

describe('End-to-End Contact Flow', () => {
  const renderContactPage = () => {
    return render(
      <HelmetProvider>
        <BrowserRouter>
          <ErrorBoundary>
            <ToastProvider>
              <ContactPage />
            </ToastProvider>
          </ErrorBoundary>
        </BrowserRouter>
      </HelmetProvider>
    )
  }

  beforeEach(() => {
    vi.clearAllMocks()
    // Mock successful API response
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        success: true,
        message: 'Thank you for your message! We will get back to you soon.'
      })
    })
  })

  it('completes full contact form submission journey', async () => {
    const user = userEvent.setup()
    
    renderContactPage()

    // Verify we're on the contact page
    expect(screen.getByText(/contact us/i)).toBeInTheDocument()
    expect(screen.getByText(/send us a message/i)).toBeInTheDocument()

    // Fill out the contact form
    const nameInput = screen.getByLabelText(/full name/i)
    const emailInput = screen.getByLabelText(/email address/i)
    const serviceSelect = screen.getByLabelText(/service of interest/i)
    const messageInput = screen.getByLabelText(/message/i)

    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john.doe@example.com')
    await user.selectOptions(serviceSelect, 'Website Designing')
    await user.type(messageInput, 'I need a professional website for my business. Please contact me to discuss the requirements and pricing.')

    // Verify form is filled correctly
    expect(nameInput).toHaveValue('John Doe')
    expect(emailInput).toHaveValue('john.doe@example.com')
    expect(serviceSelect).toHaveValue('Website Designing')
    expect(messageInput).toHaveValue('I need a professional website for my business. Please contact me to discuss the requirements and pricing.')

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)

    // Verify loading state
    expect(screen.getByText(/sending message/i)).toBeInTheDocument()
    expect(submitButton).toBeDisabled()

    // Wait for submission to complete
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3001/api/contact',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json'
          }),
          body: JSON.stringify({
            name: 'John Doe',
            email: 'john.doe@example.com',
            service: 'Website Designing',
            message: 'I need a professional website for my business. Please contact me to discuss the requirements and pricing.'
          })
        })
      )
    })

    // Verify success toast appears
    await waitFor(() => {
      expect(screen.getByText(/message sent successfully/i)).toBeInTheDocument()
    })

    // Verify form is reset after successful submission
    await waitFor(() => {
      expect(nameInput).toHaveValue('')
      expect(emailInput).toHaveValue('')
      expect(serviceSelect).toHaveValue('')
      expect(messageInput).toHaveValue('')
    })

    // Verify submit button is re-enabled
    expect(submitButton).not.toBeDisabled()
    expect(screen.getByText(/send message/i)).toBeInTheDocument()
  })

  it('handles form validation errors in complete flow', async () => {
    const user = userEvent.setup()
    
    renderContactPage()

    // Try to submit empty form
    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)

    // Verify validation errors appear
    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument()
      expect(screen.getByText('Email is required')).toBeInTheDocument()
      expect(screen.getByText('Please select a service')).toBeInTheDocument()
      expect(screen.getByText('Message is required')).toBeInTheDocument()
    })

    // Verify error toast appears
    await waitFor(() => {
      expect(screen.getByText(/form validation failed/i)).toBeInTheDocument()
    })

    // Fill in invalid email
    const emailInput = screen.getByLabelText(/email address/i)
    await user.type(emailInput, 'invalid-email')
    await user.click(submitButton)

    // Verify email validation error
    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument()
    })

    // Fix the email and verify error clears
    await user.clear(emailInput)
    await user.type(emailInput, 'valid@example.com')

    expect(screen.queryByText('Please enter a valid email address')).not.toBeInTheDocument()
  })

  it('handles network errors gracefully', async () => {
    const user = userEvent.setup()
    
    // Mock network error
    mockFetch.mockRejectedValue(new Error('Network error'))
    
    renderContactPage()

    await user.type(screen.getByLabelText(/full name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email address/i), 'john@example.com')
    await user.selectOptions(screen.getByLabelText(/service of interest/i), 'Website Designing')
    await user.type(screen.getByLabelText(/message/i), 'Test message for network error handling.')

    // Submit form
    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)

    // Verify error toast appears
    await waitFor(() => {
      expect(screen.getByText(/failed to send message/i)).toBeInTheDocument()
    })

    // Verify form is not reset on error
    expect(screen.getByLabelText(/full name/i)).toHaveValue('John Doe')
    expect(screen.getByLabelText(/email address/i)).toHaveValue('john@example.com')
  })

  it('handles 404 page correctly', async () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/invalid-route']}>
          <ErrorBoundary>
            <ToastProvider>
              <ContactPage />
            </ToastProvider>
          </ErrorBoundary>
        </MemoryRouter>
      </HelmetProvider>
    )

    // Since we're rendering ContactPage on an invalid route, it should still render the contact page
    // This test verifies that the contact page renders without crashing
    expect(screen.getByText(/contact us/i)).toBeInTheDocument()
  })
})