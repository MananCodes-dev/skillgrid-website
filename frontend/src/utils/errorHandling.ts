export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export class NetworkError extends Error {
  status?: number;
  code?: string;

  constructor(message: string, status?: number, code?: string) {
    super(message);
    this.name = 'NetworkError';
    this.status = status;
    this.code = code;
  }
}

export const handleApiError = (error: unknown): ApiError => {
  if (error instanceof NetworkError) {
    return {
      message: error.message,
      status: error.status,
      code: error.code
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message
    };
  }

  if (typeof error === 'string') {
    return {
      message: error
    };
  }

  return {
    message: 'An unexpected error occurred'
  };
};

export const getErrorMessage = (error: unknown): string => {
  const apiError = handleApiError(error);
  
  // Provide user-friendly messages for common errors
  if (apiError.status === 404) {
    return 'The requested resource was not found';
  }
  
  if (apiError.status === 500) {
    return 'Server error. Please try again later';
  }
  
  if (apiError.status === 429) {
    return 'Too many requests. Please wait a moment and try again';
  }
  
  if (apiError.message.includes('fetch')) {
    return 'Network error. Please check your connection and try again';
  }
  
  return apiError.message || 'Something went wrong. Please try again';
};

export const isNetworkError = (error: unknown): boolean => {
  return error instanceof NetworkError || 
         (error instanceof Error && error.message.includes('fetch'));
};