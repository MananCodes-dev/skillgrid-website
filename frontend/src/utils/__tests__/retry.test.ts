import { describe, it, expect, beforeEach } from 'vitest'
import { withRetry } from '../retry'
import { NetworkError } from '../errorHandling'

describe('Retry Utility', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('succeeds on first attempt', async () => {
    const mockFn = vi.fn().mockResolvedValue('success')
    
    const result = await withRetry(mockFn)
    
    expect(result).toBe('success')
    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  it('retries on network errors', async () => {
    const mockFn = vi.fn()
      .mockRejectedValueOnce(new NetworkError('Network error', 0, 'NETWORK_ERROR'))
      .mockResolvedValue('success')
    
    const promise = withRetry(mockFn)
    
    // Fast-forward through the delay
    await vi.runAllTimersAsync()
    
    const result = await promise
    
    expect(result).toBe('success')
    expect(mockFn).toHaveBeenCalledTimes(2)
  })

  it('retries on timeout errors', async () => {
    const mockFn = vi.fn()
      .mockRejectedValueOnce(new NetworkError('Timeout', 408, 'TIMEOUT'))
      .mockResolvedValue('success')
    
    const promise = withRetry(mockFn)
    
    await vi.runAllTimersAsync()
    
    const result = await promise
    
    expect(result).toBe('success')
    expect(mockFn).toHaveBeenCalledTimes(2)
  })

  it('retries on 5xx server errors', async () => {
    const mockFn = vi.fn()
      .mockRejectedValueOnce(new NetworkError('Server error', 500))
      .mockResolvedValue('success')
    
    const promise = withRetry(mockFn)
    
    await vi.runAllTimersAsync()
    
    const result = await promise
    
    expect(result).toBe('success')
    expect(mockFn).toHaveBeenCalledTimes(2)
  })

  it('does not retry on 4xx client errors', async () => {
    const mockFn = vi.fn()
      .mockRejectedValue(new NetworkError('Bad request', 400))
    
    await expect(withRetry(mockFn)).rejects.toThrow('Bad request')
    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  it('respects maxAttempts option', async () => {
    const mockFn = vi.fn()
      .mockRejectedValue(new NetworkError('Network error', 0, 'NETWORK_ERROR'))
    
    const promise = withRetry(mockFn, { maxAttempts: 2 })
    
    await vi.runAllTimersAsync()
    
    await expect(promise).rejects.toThrow('Network error')
    expect(mockFn).toHaveBeenCalledTimes(2)
  })

  it('uses custom delay', async () => {
    const mockFn = vi.fn()
      .mockRejectedValueOnce(new NetworkError('Network error', 0, 'NETWORK_ERROR'))
      .mockResolvedValue('success')
    
    const promise = withRetry(mockFn, { delay: 2000 })
    
    // Advance by less than the delay
    vi.advanceTimersByTime(1000)
    
    // Should not have retried yet
    expect(mockFn).toHaveBeenCalledTimes(1)
    
    // Advance past the delay
    vi.advanceTimersByTime(1000)
    
    await promise
    
    expect(mockFn).toHaveBeenCalledTimes(2)
  })

  it('uses exponential backoff when enabled', async () => {
    const mockFn = vi.fn()
      .mockRejectedValueOnce(new NetworkError('Network error', 0, 'NETWORK_ERROR'))
      .mockRejectedValueOnce(new NetworkError('Network error', 0, 'NETWORK_ERROR'))
      .mockResolvedValue('success')
    
    const promise = withRetry(mockFn, { delay: 1000, backoff: true })
    
    // First retry should wait 1000ms
    vi.advanceTimersByTime(1000)
    expect(mockFn).toHaveBeenCalledTimes(2)
    
    // Second retry should wait 2000ms (exponential backoff)
    vi.advanceTimersByTime(2000)
    
    await promise
    
    expect(mockFn).toHaveBeenCalledTimes(3)
  })

  it('uses custom retry condition', async () => {
    const mockFn = vi.fn()
      .mockRejectedValue(new Error('Custom error'))
    
    const customRetryCondition = (error: unknown) => {
      return error instanceof Error && error.message === 'Custom error'
    }
    
    const promise = withRetry(mockFn, { 
      maxAttempts: 2, 
      retryCondition: customRetryCondition 
    })
    
    await vi.runAllTimersAsync()
    
    await expect(promise).rejects.toThrow('Custom error')
    expect(mockFn).toHaveBeenCalledTimes(2)
  })

  it('does not retry when custom condition returns false', async () => {
    const mockFn = vi.fn()
      .mockRejectedValue(new Error('Do not retry'))
    
    const customRetryCondition = () => false
    
    await expect(withRetry(mockFn, { retryCondition: customRetryCondition }))
      .rejects.toThrow('Do not retry')
    
    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  it('throws the last error after all attempts fail', async () => {
    const error1 = new NetworkError('First error', 0, 'NETWORK_ERROR')
    const error2 = new NetworkError('Second error', 0, 'NETWORK_ERROR')
    const error3 = new NetworkError('Third error', 0, 'NETWORK_ERROR')
    
    const mockFn = vi.fn()
      .mockRejectedValueOnce(error1)
      .mockRejectedValueOnce(error2)
      .mockRejectedValueOnce(error3)
    
    const promise = withRetry(mockFn, { maxAttempts: 3 })
    
    await vi.runAllTimersAsync()
    
    await expect(promise).rejects.toThrow('Third error')
    expect(mockFn).toHaveBeenCalledTimes(3)
  })
})