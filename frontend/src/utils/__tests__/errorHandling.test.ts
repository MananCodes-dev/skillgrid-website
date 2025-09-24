import { describe, it, expect } from 'vitest'
import { 
  NetworkError, 
  handleApiError, 
  getErrorMessage, 
  isNetworkError 
} from '../errorHandling'

describe('NetworkError', () => {
  it('creates error with message only', () => {
    const error = new NetworkError('Test error')
    expect(error.message).toBe('Test error')
    expect(error.name).toBe('NetworkError')
    expect(error.status).toBeUndefined()
    expect(error.code).toBeUndefined()
  })

  it('creates error with status and code', () => {
    const error = new NetworkError('Server error', 500, 'INTERNAL_ERROR')
    expect(error.message).toBe('Server error')
    expect(error.status).toBe(500)
    expect(error.code).toBe('INTERNAL_ERROR')
  })
})

describe('handleApiError', () => {
  it('handles NetworkError correctly', () => {
    const networkError = new NetworkError('Network failed', 404, 'NOT_FOUND')
    const result = handleApiError(networkError)
    
    expect(result).toEqual({
      message: 'Network failed',
      status: 404,
      code: 'NOT_FOUND'
    })
  })

  it('handles regular Error correctly', () => {
    const error = new Error('Regular error')
    const result = handleApiError(error)
    
    expect(result).toEqual({
      message: 'Regular error'
    })
  })

  it('handles string error correctly', () => {
    const result = handleApiError('String error')
    
    expect(result).toEqual({
      message: 'String error'
    })
  })

  it('handles unknown error type', () => {
    const result = handleApiError({ unknown: 'object' })
    
    expect(result).toEqual({
      message: 'An unexpected error occurred'
    })
  })
})

describe('getErrorMessage', () => {
  it('returns user-friendly message for 404 error', () => {
    const error = new NetworkError('Not found', 404)
    const message = getErrorMessage(error)
    
    expect(message).toBe('The requested resource was not found')
  })

  it('returns user-friendly message for 500 error', () => {
    const error = new NetworkError('Internal server error', 500)
    const message = getErrorMessage(error)
    
    expect(message).toBe('Server error. Please try again later')
  })

  it('returns user-friendly message for 429 error', () => {
    const error = new NetworkError('Too many requests', 429)
    const message = getErrorMessage(error)
    
    expect(message).toBe('Too many requests. Please wait a moment and try again')
  })

  it('returns network error message for fetch errors', () => {
    const error = new Error('fetch failed')
    const message = getErrorMessage(error)
    
    expect(message).toBe('Network error. Please check your connection and try again')
  })

  it('returns original message for other errors', () => {
    const error = new Error('Custom error message')
    const message = getErrorMessage(error)
    
    expect(message).toBe('Custom error message')
  })

  it('returns fallback message for unknown errors', () => {
    const message = getErrorMessage(null)
    
    expect(message).toBe('Something went wrong. Please try again')
  })
})

describe('isNetworkError', () => {
  it('returns true for NetworkError', () => {
    const error = new NetworkError('Network error')
    expect(isNetworkError(error)).toBe(true)
  })

  it('returns true for fetch-related errors', () => {
    const error = new Error('fetch failed')
    expect(isNetworkError(error)).toBe(true)
  })

  it('returns false for regular errors', () => {
    const error = new Error('Regular error')
    expect(isNetworkError(error)).toBe(false)
  })

  it('returns false for non-error values', () => {
    expect(isNetworkError('string')).toBe(false)
    expect(isNetworkError(null)).toBe(false)
    expect(isNetworkError(undefined)).toBe(false)
  })
})