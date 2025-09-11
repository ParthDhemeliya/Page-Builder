import { useCallback } from 'react';
import { globalErrorHandler } from '../utils/errorHandler';

export const useErrorHandler = () => {
  const handleError = useCallback(
    (error: Error, context?: Record<string, unknown>) => {
      globalErrorHandler.handleError({
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
        componentStack: 'Component Error Handler',
        ...context,
      });
    },
    []
  );

  return {
    handleError,
  };
};
