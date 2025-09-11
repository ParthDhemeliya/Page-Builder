export interface ErrorInfo {
  message: string;
  stack?: string;
  componentStack?: string;
  timestamp: string;
  userAgent: string;
  url: string;
}

class GlobalErrorHandler {
  constructor() {
    this.setupGlobalErrorHandlers();
  }

  private setupGlobalErrorHandlers() {
    window.addEventListener('error', event => {
      this.handleError({
        message: event.message,
        stack: event.error?.stack,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
        componentStack: 'Global Error Handler',
      });
    });

    window.addEventListener('unhandledrejection', event => {
      this.handleError({
        message: `Unhandled Promise Rejection: ${event.reason}`,
        stack: event.reason?.stack,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
        componentStack: 'Promise Rejection Handler',
      });
    });
  }

  public handleError(errorInfo: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error('Global Error Handler:', errorInfo);
    }

    this.showErrorToast(errorInfo.message);
  }

  private showErrorToast(message: string) {
    const toast = document.createElement('div');
    toast.className = 'error-toast-simple';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  }
}

export const globalErrorHandler = new GlobalErrorHandler();
