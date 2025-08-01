import { useCallback } from "react";
import { toast } from "react-toastify";
import { UseFormSetError } from "react-hook-form";

interface ApiError {
  data?: {
    message?: string;
    errors?: Record<string, string[]>;
  };
  status?: number;
}

export const useErrorHandler = <T extends Record<string, any>>(
  setError: UseFormSetError<T>
) => {
  const handleApiError = useCallback((error: ApiError) => {
    console.error("API Error:", error);

    // Handle validation errors
    if (error?.data?.errors) {
      Object.entries(error.data.errors).forEach(([field, messages]) => {
        if (Array.isArray(messages) && messages.length > 0) {
          setError(field as keyof T, {
            type: "server",
            message: messages[0],
          });
        }
      });
      toast.error("Please check the form for errors");
    } else {
      // Handle general errors
      const message = error?.data?.message || "An unexpected error occurred";
      toast.error(message);
    }
  }, [setError]);

  return { handleApiError };
};