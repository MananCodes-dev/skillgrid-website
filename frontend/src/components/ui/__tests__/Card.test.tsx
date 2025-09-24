import { render, screen } from '@testing-library/react'
import Card from '../Card'

describe('Card Component', () => {
  it('renders with default props', () => {
    render(<Card>Card content</Card>)
    const card = screen.getByText('Card content')
    expect(card).toBeInTheDocument()
    expect(card).toHaveClass('bg-white', 'border', 'border-gray-200')
  })

  it('renders different variants correctly', () => {
    const { rerender } = render(<Card variant="glass">Glass card</Card>)
    expect(screen.getByText('Glass card')).toHaveClass('backdrop-blur-md', 'bg-white/10')

    rerender(<Card variant="gradient">Gradient card</Card>)
    expect(screen.getByText('Gradient card')).toHaveClass('bg-gradient-to-br')

    rerender(<Card variant="hover">Hover card</Card>)
    expect(screen.getByText('Hover card')).toHaveClass('hover:shadow-2xl')
  })

  it('renders different padding sizes correctly', () => {
    const { rerender } = render(<Card padding="sm">Small padding</Card>)
    expect(screen.getByText('Small padding')).toHaveClass('p-4')

    rerender(<Card padding="lg">Large padding</Card>)
    expect(screen.getByText('Large padding')).toHaveClass('p-8')
  })

  it('renders different shadow sizes correctly', () => {
    const { rerender } = render(<Card shadow="sm">Small shadow</Card>)
    expect(screen.getByText('Small shadow')).toHaveClass('shadow-sm')

    rerender(<Card shadow="lg">Large shadow</Card>)
    expect(screen.getByText('Large shadow')).toHaveClass('shadow-xl')

    rerender(<Card shadow="xl">Extra large shadow</Card>)
    expect(screen.getByText('Extra large shadow')).toHaveClass('shadow-2xl')
  })

  it('applies custom className', () => {
    render(<Card className="custom-class">Custom card</Card>)
    expect(screen.getByText('Custom card')).toHaveClass('custom-class')
  })

  it('renders children correctly', () => {
    render(
      <Card>
        <h2>Card Title</h2>
        <p>Card description</p>
      </Card>
    )
    
    expect(screen.getByText('Card Title')).toBeInTheDocument()
    expect(screen.getByText('Card description')).toBeInTheDocument()
  })
})