import React, { useEffect, useRef, useState } from 'react'

interface AnimatedSectionProps {
  children: React.ReactNode
  animation?: 'fade-in' | 'slide-up' | 'slide-left' | 'slide-right' | 'scale-up'
  delay?: number
  duration?: number
  className?: string
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  animation = 'fade-in',
  delay = 0,
  duration = 800,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [delay])

  const animations = {
    'fade-in': {
      initial: 'opacity-0 translate-y-8',
      animate: 'opacity-100 translate-y-0'
    },
    'slide-up': {
      initial: 'opacity-0 translate-y-16',
      animate: 'opacity-100 translate-y-0'
    },
    'slide-left': {
      initial: 'opacity-0 translate-x-16',
      animate: 'opacity-100 translate-x-0'
    },
    'slide-right': {
      initial: 'opacity-0 -translate-x-16',
      animate: 'opacity-100 translate-x-0'
    },
    'scale-up': {
      initial: 'opacity-0 scale-95',
      animate: 'opacity-100 scale-100'
    }
  }

  const animationClasses = animations[animation]
  const transitionClass = `transition-all duration-${duration} ease-out`

  return (
    <div
      ref={ref}
      className={`${transitionClass} ${
        isVisible ? animationClasses.animate : animationClasses.initial
      } ${className}`}
    >
      {children}
    </div>
  )
}

export default AnimatedSection