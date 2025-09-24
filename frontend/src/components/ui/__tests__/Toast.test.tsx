import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { ToastProvider, useToast } from '../Toast'

// Test component that uses the toast hook
const TestComponent = () => {
  const { addToast } = useToast()
  
  return (
    <div>
      <button onClick={() => addToast({ type: 'success', title: 'Success!' })}>
        Add Success Toast
      </button>
      <button onClick={() => addToast({ type: 'error', title: 'Error!', message: 'Something went wrong' })}>
        Add Error Toast
      </button>
      <button onClick={() => addToast({ type: 'warning', title: 'Warning!' })}>
        Add Warning Toast
      </button>
      <button onClick={() => addToast({ type: 'info', title: 'Info!' })}>
        Add Info Toast
      </button>
    </div>
  )
}

const renderWithToastProvider = (component: React.ReactElement) => {
  return render(<ToastProvider>{component}</ToastProvider>)
}

describe('Toast System', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders toast provider without crashing', () => {
    renderWithToastProvider(<div>Test content</div>)
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('throws error when useToast is used outside provider', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    expect(() => {
      render(<TestComponent />)
    }).toThrow('useToast must be used within a ToastProvider')
    
    consoleSpy.mockRestore()
  })

  it('displays success toast correctly', () => {
    renderWithToastProvider(<TestComponent />)
    
    fireEvent.click(screen.getByText('Add Success Toast'))
    
    expect(screen.getByText('Success!')).toBeInTheDocument()
    expect(screen.getByText('✓')).toBeInTheDocument()
  })

  it('displays error toast with message correctly', () => {
    renderWithToastProvider(<TestComponent />)
    
    fireEvent.click(screen.getByText('Add Error Toast'))
    
    expect(screen.getByText('Error!')).toBeInTheDocument()
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    expect(screen.getAllByText('✕')).toHaveLength(2) // Icon and close button
  })

  it('displays warning toast correctly', () => {
    renderWithToastProvider(<TestComponent />)
    
    fireEvent.click(screen.getByText('Add Warning Toast'))
    
    expect(screen.getByText('Warning!')).toBeInTheDocument()
    expect(screen.getByText('⚠')).toBeInTheDocument()
  })

  it('displays info toast correctly', () => {
    renderWithToastProvider(<TestComponent />)
    
    fireEvent.click(screen.getByText('Add Info Toast'))
    
    expect(screen.getByText('Info!')).toBeInTheDocument()
    expect(screen.getByText('ℹ')).toBeInTheDocument()
  })

  it('removes toast when close button is clicked', () => {
    renderWithToastProvider(<TestComponent />)
    
    fireEvent.click(screen.getByText('Add Success Toast'))
    expect(screen.getByText('Success!')).toBeInTheDocument()
    
    const closeButtons = screen.getAllByText('✕')
    const closeButton = closeButtons.find(button => button.tagName === 'BUTTON')
    fireEvent.click(closeButton!)
    
    expect(screen.queryByText('Success!')).not.toBeInTheDocument()
  })

  it('auto-removes toast after duration', async () => {
    renderWithToastProvider(<TestComponent />)
    
    fireEvent.click(screen.getByText('Add Success Toast'))
    expect(screen.getByText('Success!')).toBeInTheDocument()
    
    act(() => {
      vi.advanceTimersByTime(5000)
    })
    
    await waitFor(() => {
      expect(screen.queryByText('Success!')).not.toBeInTheDocument()
    })
  })

  it('displays multiple toasts', () => {
    renderWithToastProvider(<TestComponent />)
    
    fireEvent.click(screen.getByText('Add Success Toast'))
    fireEvent.click(screen.getByText('Add Error Toast'))
    
    expect(screen.getByText('Success!')).toBeInTheDocument()
    expect(screen.getByText('Error!')).toBeInTheDocument()
  })
})