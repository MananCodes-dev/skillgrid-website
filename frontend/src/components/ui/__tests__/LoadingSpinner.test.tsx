import { render, screen } from '@testing-library/react'
import { LoadingSpinner, LoadingOverlay } from '../LoadingSpinner'

describe('LoadingSpinner Component', () => {
  it('renders with default props', () => {
    const { container } = render(<LoadingSpinner />)
    const spinner = container.firstChild as HTMLElement
    expect(spinner).toBeInTheDocument()
    expect(spinner).toHaveClass('w-8', 'h-8')
  })

  it('renders different sizes correctly', () => {
    const { container, rerender } = render(<LoadingSpinner size="sm" />)
    expect(container.firstChild).toHaveClass('w-4', 'h-4')

    rerender(<LoadingSpinner size="lg" />)
    expect(container.firstChild).toHaveClass('w-12', 'h-12')
  })

  it('applies custom className', () => {
    const { container } = render(<LoadingSpinner className="custom-class" />)
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('has spinning animation', () => {
    const { container } = render(<LoadingSpinner />)
    const spinnerInner = (container.firstChild as HTMLElement).firstChild
    expect(spinnerInner).toHaveClass('animate-spin')
  })
})

describe('LoadingOverlay Component', () => {
  it('renders children when not loading', () => {
    render(
      <LoadingOverlay isLoading={false}>
        <div>Content</div>
      </LoadingOverlay>
    )
    
    expect(screen.getByText('Content')).toBeInTheDocument()
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
  })

  it('shows loading overlay when loading', () => {
    render(
      <LoadingOverlay isLoading={true}>
        <div>Content</div>
      </LoadingOverlay>
    )
    
    expect(screen.getByText('Content')).toBeInTheDocument()
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('shows custom loading message', () => {
    render(
      <LoadingOverlay isLoading={true} message="Processing...">
        <div>Content</div>
      </LoadingOverlay>
    )
    
    expect(screen.getByText('Processing...')).toBeInTheDocument()
  })

  it('applies correct overlay styles when loading', () => {
    render(
      <LoadingOverlay isLoading={true}>
        <div>Content</div>
      </LoadingOverlay>
    )
    
    const overlay = screen.getByText('Loading...').closest('.absolute')
    expect(overlay).toHaveClass('absolute', 'inset-0', 'bg-white', 'bg-opacity-75')
  })
})