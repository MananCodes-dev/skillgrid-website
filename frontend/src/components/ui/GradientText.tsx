import React from 'react'

interface GradientTextProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'rainbow'
  className?: string
}

const GradientText: React.FC<GradientTextProps> = ({
  children,
  variant = 'primary',
  className = ''
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600',
    secondary: 'bg-gradient-to-r from-gray-600 to-gray-800',
    success: 'bg-gradient-to-r from-green-500 to-emerald-500',
    warning: 'bg-gradient-to-r from-orange-500 to-red-500',
    error: 'bg-gradient-to-r from-red-500 to-pink-500',
    rainbow: 'bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500'
  }
  
  const classes = `${variants[variant]} bg-clip-text text-transparent ${className}`
  
  return (
    <span className={classes}>
      {children}
    </span>
  )
}

export default GradientText