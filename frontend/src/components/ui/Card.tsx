import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'hover' | 'gradient' | 'glass'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  padding = 'md',
  shadow = 'md'
}) => {
  const baseClasses = 'rounded-xl transition-all duration-300'
  
  const variants = {
    default: 'bg-gray-800 border border-gray-700',
    hover: 'bg-gray-800 border border-gray-700 hover:shadow-2xl hover:scale-105 transform cursor-pointer hover:border-gray-600',
    gradient: 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700',
    glass: 'backdrop-blur-md bg-gray-800/50 border border-gray-600/50'
  }
  
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }
  
  const shadows = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-lg',
    lg: 'shadow-xl',
    xl: 'shadow-2xl'
  }
  
  const classes = `${baseClasses} ${variants[variant]} ${paddings[padding]} ${shadows[shadow]} ${className}`
  
  return (
    <div className={classes}>
      {children}
    </div>
  )
}

export default Card