import { render, screen } from '@testing-library/react'
import Badge from '../Badge'

describe('Badge Component', () => {
  it('renders with default props', () => {
    render(<Badge>Default badge</Badge>)
    const badge = screen.getByText('Default badge')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('bg-gray-100', 'text-gray-800')
  })

  it('renders different variants correctly', () => {
    const { rerender } = render(<Badge variant="secondary">Secondary</Badge>)
    expect(screen.getByText('Secondary')).toHaveClass('bg-gray-200', 'text-gray-700')

    rerender(<Badge variant="success">Success</Badge>)
    expect(screen.getByText('Success')).toHaveClass('bg-green-100', 'text-green-800')

    rerender(<Badge variant="warning">Warning</Badge>)
    expect(screen.getByText('Warning')).toHaveClass('bg-yellow-100', 'text-yellow-800')

    rerender(<Badge variant="error">Error</Badge>)
    expect(screen.getByText('Error')).toHaveClass('bg-red-100', 'text-red-800')
  })

  it('renders different sizes correctly', () => {
    const { rerender } = render(<Badge size="sm">Small</Badge>)
    expect(screen.getByText('Small')).toHaveClass('px-2', 'py-1', 'text-xs')

    rerender(<Badge size="lg">Large</Badge>)
    expect(screen.getByText('Large')).toHaveClass('px-4', 'py-2', 'text-base')
  })

  it('applies custom className', () => {
    render(<Badge className="custom-class">Custom badge</Badge>)
    expect(screen.getByText('Custom badge')).toHaveClass('custom-class')
  })

  it('renders children correctly', () => {
    render(<Badge>✨ Special Badge</Badge>)
    expect(screen.getByText('✨ Special Badge')).toBeInTheDocument()
  })
})