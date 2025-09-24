import { NetworkError } from './errorHandling';

interface RetryOptions {
  maxAttempts?: number;
  delay?: number;
  backoff?: boolean;
  retryCondition?: (error: unknown) => boolean;
}

const defaultRetryCondition = (error: unknown): boolean => {
  if (error instanceof NetworkError) {
    // Retry on network errors, timeouts, and 5xx server errors
    return error.code === 'NETWORK_ERROR' || 
           error.code === 'TIMEOUT' || 
           (error.status !== undefined && error.status >= 500);
  }
  return false;
};

export const withRetry = async <T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> => {
  const {
    maxAttempts = 3,
    delay = 1000,
    backoff = true,
    retryCondition = defaultRetryCondition
  } = options;

  let lastError: unknown;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      // Don't retry if this is the last attempt or if retry condition fails
      if (attempt === maxAttempts || !retryCondition(error)) {
        throw error;
      }
      
      // Calculate delay with optional exponential backoff
      const currentDelay = backoff ? delay * Math.pow(2, attempt - 1) : delay;
      
      console.warn(`Attempt ${attempt} failed, retrying in ${currentDelay}ms...`, error);
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, currentDelay));
    }
  }
  
  throw lastError;
};