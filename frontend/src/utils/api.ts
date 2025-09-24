import { NetworkError } from './errorHandling';
import { withRetry } from './retry';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface ApiOptions extends RequestInit {
  timeout?: number;
}

const createTimeoutPromise = (timeout: number): Promise<never> => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new NetworkError('Request timeout', 408, 'TIMEOUT'));
    }, timeout);
  });
};

const apiRequest = async <T>(
  endpoint: string, 
  options: ApiOptions = {}
): Promise<T> => {
  const { timeout = 10000, ...fetchOptions } = options;
  
  const url = `${API_BASE_URL}${endpoint}`;
  
  const fetchPromise = fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
    },
    ...fetchOptions,
  });

  try {
    const response = await Promise.race([
      fetchPromise,
      createTimeoutPromise(timeout)
    ]);

    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}`;
      
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        // If we can't parse the error response, use the status text
        errorMessage = response.statusText || errorMessage;
      }
      
      throw new NetworkError(errorMessage, response.status);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    
    return await response.text() as T;
  } catch (error) {
    if (error instanceof NetworkError) {
      throw error;
    }
    
    // Handle network errors (no internet, server down, etc.)
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new NetworkError('Network error. Please check your connection.', 0, 'NETWORK_ERROR');
    }
    
    throw new NetworkError('An unexpected error occurred');
  }
};

export const api = {
  get: <T>(endpoint: string, options?: ApiOptions) => 
    withRetry(() => apiRequest<T>(endpoint, { ...options, method: 'GET' })),
    
  post: <T>(endpoint: string, data?: unknown, options?: ApiOptions) => 
    withRetry(() => apiRequest<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    }), { maxAttempts: 2 }), // Fewer retries for POST requests
    
  put: <T>(endpoint: string, data?: unknown, options?: ApiOptions) => 
    withRetry(() => apiRequest<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    }), { maxAttempts: 2 }),
    
  delete: <T>(endpoint: string, options?: ApiOptions) => 
    withRetry(() => apiRequest<T>(endpoint, { ...options, method: 'DELETE' }), { maxAttempts: 2 }),
};