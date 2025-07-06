import React, { forwardRef, useEffect, useState, useContext, createContext } from 'react';
import { cn } from '../../utils/cn';
import { QuickIcon } from '../Icon';
import './Toast.scss';

export type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  /**
   * Toast message content
   */
  children: React.ReactNode;
  /**
   * Toast variant
   */
  variant?: ToastVariant;
  /**
   * Toast title
   */
  title?: string;
  /**
   * Whether to show close button
   */
  showCloseButton?: boolean;
  /**
   * Duration in milliseconds (0 = no auto close)
   */
  duration?: number;
  /**
   * Function called when toast is closed
   */
  onClose?: () => void;
  /**
   * Function called when toast is clicked
   */
  onClick?: () => void;
  /**
   * Custom icon (overrides default variant icon)
   */
  icon?: React.ReactNode;
  /**
   * Whether to show icon
   */
  showIcon?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Action button
   */
  action?: React.ReactNode;
  /**
   * Toast position
   */
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
}

export interface ToastContextType {
  addToast: (toast: Omit<ToastProps, 'onClose'>) => string;
  removeToast: (id: string) => void;
  clearAllToasts: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastItem extends ToastProps {
  id: string;
}

interface ToastProviderProps {
  children: React.ReactNode;
  maxToasts?: number;
  defaultPosition?: ToastProps['position'];
}

/**
 * Toast component for displaying temporary messages.
 * 
 * Features:
 * - Multiple variants (success, error, warning, info, default)
 * - Auto-dismiss with customizable duration
 * - Multiple positioning options
 * - Custom icons and actions
 * - Accessible with proper ARIA attributes
 * - Stacking and queuing support
 * - Context API for global toast management
 */
export const Toast = forwardRef<HTMLDivElement, ToastProps>(({
  children,
  variant = 'default',
  title,
  showCloseButton = true,
  duration = 5000,
  onClose,
  onClick,
  icon,
  showIcon = true,
  className,
  action,
  position = 'top-right',
  ...props
}, ref) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (duration === 0 || !isVisible) return;

    const timer = setTimeout(() => {
      if (!isPaused) {
        handleClose();
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, isVisible, isPaused]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose?.();
    }, 150); // Match animation duration
  };

  const getVariantIcon = () => {
    if (icon) return icon;
    if (!showIcon) return null;

    switch (variant) {
      case 'success':
        return <QuickIcon name="plus" className="text-green-500" />;
      case 'error':
        return <QuickIcon name="close" className="text-red-500" />;
      case 'warning':
        return <QuickIcon name="search" className="text-yellow-500" />;
      case 'info':
        return <QuickIcon name="search" className="text-blue-500" />;
      default:
        return <QuickIcon name="search" className="text-gray-500" />;
    }
  };

  const variantClasses = {
    default: 'vromm-toast--default',
    success: 'vromm-toast--success',
    error: 'vromm-toast--error',
    warning: 'vromm-toast--warning',
    info: 'vromm-toast--info',
  };

  const positionClasses = {
    'top-left': 'vromm-toast--top-left',
    'top-center': 'vromm-toast--top-center',
    'top-right': 'vromm-toast--top-right',
    'bottom-left': 'vromm-toast--bottom-left',
    'bottom-center': 'vromm-toast--bottom-center',
    'bottom-right': 'vromm-toast--bottom-right',
  };

  if (!isVisible) return null;

  return (
    <div
      ref={ref}
      className={cn(
        'vromm-toast',
        variantClasses[variant],
        positionClasses[position],
        onClick && 'vromm-toast--clickable',
        className
      )}
      role="alert"
      aria-live="polite"
      aria-atomic="true"
      onClick={onClick}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      data-state={isVisible ? 'open' : 'closed'}
      {...props}
    >
      {/* Icon */}
      {getVariantIcon() && (
        <div className="vromm-toast-icon">
          {getVariantIcon()}
        </div>
      )}

      {/* Content */}
      <div className="vromm-toast-content">
        {title && (
          <div className="vromm-toast-title">
            {title}
          </div>
        )}
        <div className="vromm-toast-message">
          {children}
        </div>
      </div>

      {/* Action */}
      {action && (
        <div className="vromm-toast-action">
          {action}
        </div>
      )}

      {/* Close button */}
      {showCloseButton && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
          className="vromm-toast-close"
          aria-label="Close toast"
        >
          <QuickIcon name="close" size="sm" />
        </button>
      )}
    </div>
  );
});

Toast.displayName = 'Toast';

/**
 * Toast provider component for managing global toasts.
 */
export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  maxToasts = 5,
  defaultPosition = 'top-right',
}) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = (toast: Omit<ToastProps, 'onClose'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastItem = {
      ...toast,
      id,
      position: toast.position || defaultPosition,
      onClose: () => removeToast(id),
    };

    setToasts((prev) => {
      const updated = [...prev, newToast];
      return updated.slice(-maxToasts);
    });

    return id;
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const clearAllToasts = () => {
    setToasts([]);
  };

  const contextValue: ToastContextType = {
    addToast,
    removeToast,
    clearAllToasts,
  };

  const groupedToasts = toasts.reduce((acc, toast) => {
    const position = toast.position || defaultPosition;
    if (!acc[position]) {
      acc[position] = [];
    }
    acc[position].push(toast);
    return acc;
  }, {} as Record<string, ToastItem[]>);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {Object.entries(groupedToasts).map(([position, positionToasts]) => (
        <div
          key={position}
          className={cn('vromm-toast-container', `vromm-toast-container--${position}`)}
          aria-label="Notifications"
        >
          {positionToasts.map((toast) => (
            <Toast key={toast.id} {...toast} />
          ))}
        </div>
      ))}
    </ToastContext.Provider>
  );
};

/**
 * Helper functions for common toast patterns
 */
export const toast = {
  success: (message: string, options?: Partial<ToastProps>) => {
    // This would be used with useToast hook
    return { variant: 'success' as const, children: message, ...options };
  },
  error: (message: string, options?: Partial<ToastProps>) => {
    return { variant: 'error' as const, children: message, ...options };
  },
  warning: (message: string, options?: Partial<ToastProps>) => {
    return { variant: 'warning' as const, children: message, ...options };
  },
  info: (message: string, options?: Partial<ToastProps>) => {
    return { variant: 'info' as const, children: message, ...options };
  },
  default: (message: string, options?: Partial<ToastProps>) => {
    return { variant: 'default' as const, children: message, ...options };
  },
}; 