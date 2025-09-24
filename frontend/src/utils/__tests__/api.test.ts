import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { api } from '../api'
import { NetworkError } from '../errorHandling'

// Mock fetch
const mockFetch = vi.fn()
global.fetch = mockFetch

describe('API Utility', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('GET requests', () => {
    it('makes successful GET request', async () => {
      const mockResponse = { data: 'test' }
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse),
        headers: new Headers({ 'content-type': 'application/json' })
      })

      const result = await api.get('/test')
      
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3001/test',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Content-Type': 'application/json'
          })
        })
      )
      expect(result).toEqual(mockResponse)
    })

    it('handles GET request with custom headers', async () => {
      const mockResponse = { data: 'test' }
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse),
        headers: new Headers({ 'content-type': 'application/json' })
      })

      await api.get('/test', {
        headers: { 'Authorization': 'Bearer token' }
      })
      
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3001/test',
        expect.objectContaining({
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer token'
          })
        })
      )
    })
  })

  describe('POST requests', () => {
    it('makes successful POST request with data', async () => {
      const mockResponse = { success: true }
      const requestData = { name: 'test' }
      
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse),
        headers: new Headers({ 'content-type': 'application/json' })
      })

      const result = await api.post('/test', requestData)
      
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3001/test',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(requestData),
          headers: expect.objectContaining({
            'Content-Type': 'application/json'
          })
        })
      )
      expect(result).toEqual(mockResponse)
    })

    it('makes POST request without data', async () => {
      const mockResponse = { success: true }
      
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse),
        headers: new Headers({ 'content-type': 'application/json' })
      })

      await api.post('/test')
      
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3001/test',
        expect.objectContaining({
          method: 'POST',
          body: undefined
        })
      )
    })
  })

  describe('Error handling', () => {
    it('throws NetworkError for HTTP error status', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        json: () => Promise.resolve({ message: 'Resource not found' })
      })

      await expect(api.get('/test')).rejects.toThrow(NetworkError)
      await expect(api.get('/test')).rejects.toThrow('Resource not found')
    })

    it('uses status text when error response cannot be parsed', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: () => Promise.reject(new Error('Invalid JSON'))
      })

      await expect(api.get('/test')).rejects.toThrow('Internal Server Error')
    })

    it('handles network errors', async () => {
      mockFetch.mockRejectedValue(new TypeError('fetch failed'))

      await expect(api.get('/test')).rejects.toThrow(NetworkError)
      await expect(api.get('/test')).rejects.toThrow('Network error. Please check your connection.')
    })

    it('handles timeout errors', async () => {
      mockFetch.mockImplementation(() => 
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('timeout')), 100)
        )
      )

      await expect(api.get('/test', { timeout: 50 })).rejects.toThrow(NetworkError)
    })
  })

  describe('Response handling', () => {
    it('handles non-JSON responses', async () => {
      const textResponse = 'Plain text response'
      mockFetch.mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(textResponse),
        headers: new Headers({ 'content-type': 'text/plain' })
      })

      const result = await api.get('/test')
      expect(result).toBe(textResponse)
    })

    it('handles empty responses', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(''),
        headers: new Headers()
      })

      const result = await api.get('/test')
      expect(result).toBe('')
    })
  })

  describe('Retry mechanism', () => {
    it('retries on network errors', async () => {
      mockFetch
        .mockRejectedValueOnce(new TypeError('fetch failed'))
        .mockRejectedValueOnce(new TypeError('fetch failed'))
        .mockResolvedValue({
          ok: true,
          json: () => Promise.resolve({ success: true }),
          headers: new Headers({ 'content-type': 'application/json' })
        })

      const result = await api.get('/test')
      
      expect(mockFetch).toHaveBeenCalledTimes(3)
      expect(result).toEqual({ success: true })
    })

    it('does not retry POST requests as many times', async () => {
      mockFetch
        .mockRejectedValueOnce(new TypeError('fetch failed'))
        .mockRejectedValueOnce(new TypeError('fetch failed'))
        .mockRejectedValue(new TypeError('fetch failed'))

      await expect(api.post('/test', {})).rejects.toThrow()
      
      // POST should only retry once (2 total attempts)
      expect(mockFetch).toHaveBeenCalledTimes(2)
    })
  })
})