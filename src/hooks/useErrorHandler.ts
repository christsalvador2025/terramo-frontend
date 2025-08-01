import { ApiError } from '@/lib/types/client.types';

export const useErrorHandlerHook = () => {
  const handleApiError = (error: ApiError): string => {
    // Handle different types of API errors
    if (error?.data?.message) {
      return error.data.message;
    }
    
    if (error?.status === 400) {
      return 'Invalid data provided. Please check your inputs.';
    }
    
    if (error?.status === 401) {
      return 'You are not authorized to perform this action.';
    }
    
    if (error?.status === 403) {
      return 'Access denied. You do not have permission to perform this action.';
    }
    
    if (error?.status === 404) {
      return 'The requested resource was not found.';
    }
    
    if (error?.status === 422) {
      return 'Validation error. Please check your inputs and try again.';
    }
    
    if (error?.status === 500) {
      return 'Internal server error. Please try again later.';
    }
    
    if (error?.message) {
      return error.message;
    }
    
    return 'An unexpected error occurred. Please try again.';
  };

  return { handleApiError };
};