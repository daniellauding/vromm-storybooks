import React, { forwardRef, useState } from 'react';
import { cn } from '../../utils/cn';
import { Button } from '../Button/Button';
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import './SystemMessage.scss';

export interface SystemMessageAction {
  id: string;
  label: string;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  external?: boolean;
}

export interface SystemMessageProps {
  /**
   * Message variant/type
   */
  variant?: 'info' | 'success' | 'warning' | 'error' | 'promotional' | 'announcement';
  /**
   * Message content
   */
  message: React.ReactNode;
  /**
   * Additional description text
   */
  description?: React.ReactNode;
  /**
   * Action buttons
   */
  actions?: SystemMessageAction[];
  /**
   * Custom icon override
   */
  icon?: React.ComponentType<{ className?: string }>;
  /**
   * Whether to show default icon
   */
  showIcon?: boolean;
  /**
   * Whether message can be dismissed
   */
  dismissible?: boolean;
  /**
   * Callback when dismissed
   */
  onDismiss?: () => void;
  /**
   * Whether message is sticky (fixed position)
   */
  sticky?: 'top' | 'bottom' | false;
  /**
   * Message size
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Background color style
   */
  background?: 'solid' | 'gradient' | 'subtle';
  /**
   * Animation type
   */
  animation?: 'slide' | 'fade' | 'bounce' | 'none';
  /**
   * Whether message is visible
   */
  visible?: boolean;
  /**
   * Auto-dismiss after milliseconds (0 to disable)
   */
  autoHide?: number;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Container CSS classes
   */
  containerClassName?: string;
  /**
   * Custom styles
   */
  style?: React.CSSProperties;
}

const variantConfig = {
  info: {
    icon: Info,
    colorClass: 'vromm-system-message--info',
  },
  success: {
    icon: CheckCircle,
    colorClass: 'vromm-system-message--success',
  },
  warning: {
    icon: AlertTriangle,
    colorClass: 'vromm-system-message--warning',
  },
  error: {
    icon: AlertCircle,
    colorClass: 'vromm-system-message--error',
  },
  promotional: {
    icon: null,
    colorClass: 'vromm-system-message--promotional',
  },
  announcement: {
    icon: null,
    colorClass: 'vromm-system-message--announcement',
  },
};

const sizeClasses = {
  sm: 'vromm-system-message--sm',
  md: 'vromm-system-message--md',
  lg: 'vromm-system-message--lg',
};

const backgroundClasses = {
  solid: 'vromm-system-message--bg-solid',
  gradient: 'vromm-system-message--bg-gradient',
  subtle: 'vromm-system-message--bg-subtle',
};

const animationClasses = {
  slide: 'vromm-system-message--anim-slide',
  fade: 'vromm-system-message--anim-fade',
  bounce: 'vromm-system-message--anim-bounce',
  none: '',
};

/**
 * SystemMessage component for displaying promotional banners, alerts, and notifications.
 * 
 * Features:
 * - Multiple variants (info, success, warning, error, promotional, announcement)
 * - Sticky positioning (top/bottom)
 * - Auto-dismiss functionality
 * - Custom actions and icons
 * - Responsive design
 * - Animation support
 * - Dismissible with close button
 */
export const SystemMessage = forwardRef<HTMLDivElement, SystemMessageProps>(({
  variant = 'info',
  message,
  description,
  actions = [],
  icon: CustomIcon,
  showIcon = true,
  dismissible = true,
  onDismiss,
  sticky = false,
  size = 'md',
  background = 'solid',
  animation = 'slide',
  visible = true,
  autoHide = 0,
  className,
  containerClassName,
  style,
}, ref) => {
  const [isVisible, setIsVisible] = useState(visible);
  const [isAnimating, setIsAnimating] = useState(false);

  const config = variantConfig[variant];
  const IconComponent = CustomIcon || config.icon;

  // Auto-hide functionality
  React.useEffect(() => {
    if (autoHide > 0 && isVisible) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, autoHide);
      
      return () => clearTimeout(timer);
    }
  }, [autoHide, isVisible]);

  // Sync visibility with prop
  React.useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  const handleDismiss = () => {
    if (animation !== 'none') {
      setIsAnimating(true);
      setTimeout(() => {
        setIsVisible(false);
        onDismiss?.();
      }, 300); // Match animation duration
    } else {
      setIsVisible(false);
      onDismiss?.();
    }
  };

  const handleActionClick = (action: SystemMessageAction) => {
    if (action.href && !action.onClick) {
      if (action.external) {
        window.open(action.href, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = action.href;
      }
    } else {
      action.onClick?.();
    }
  };

  if (!isVisible) return null;

  return (
    <div
      ref={ref}
      className={cn(
        'vromm-system-message',
        config.colorClass,
        sizeClasses[size],
        backgroundClasses[background],
        animationClasses[animation],
        sticky && `vromm-system-message--sticky-${sticky}`,
        isAnimating && 'vromm-system-message--animating-out',
        className
      )}
      style={style}
      role="banner"
      aria-live="polite"
    >
      <div className={cn('vromm-system-message-container', containerClassName)}>
        <div className="vromm-system-message-content">
          {/* Icon */}
          {showIcon && IconComponent && (
            <div className="vromm-system-message-icon">
              <IconComponent className="vromm-system-message-icon-svg" />
            </div>
          )}

          {/* Text Content */}
          <div className="vromm-system-message-text">
            <div className="vromm-system-message-message">
              {message}
            </div>
            {description && (
              <div className="vromm-system-message-description">
                {description}
              </div>
            )}
          </div>

          {/* Actions */}
          {actions.length > 0 && (
            <div className="vromm-system-message-actions">
              {actions.map((action) => (
                <Button
                  key={action.id}
                  variant={action.variant || 'primary'}
                  size={size === 'lg' ? 'md' : 'sm'}
                  onClick={() => handleActionClick(action)}
                  className="vromm-system-message-action"
                >
                  {action.label}
                </Button>
              ))}
            </div>
          )}

          {/* Dismiss Button */}
          {dismissible && (
            <button
              onClick={handleDismiss}
              className="vromm-system-message-dismiss"
              aria-label="Dismiss message"
              type="button"
            >
              <X className="vromm-system-message-dismiss-icon" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

SystemMessage.displayName = 'SystemMessage';

// Hook for managing multiple system messages
export const useSystemMessage = () => {
  const [messages, setMessages] = useState<Array<SystemMessageProps & { id: string }>>([]);

  const showMessage = (message: Omit<SystemMessageProps, 'visible'> & { id?: string }) => {
    const id = message.id || `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newMessage = { ...message, id, visible: true };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Auto-remove if autoHide is set
    if (message.autoHide) {
      setTimeout(() => {
        removeMessage(id);
      }, message.autoHide);
    }
    
    return id;
  };

  const removeMessage = (id: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
  };

  const clearAllMessages = () => {
    setMessages([]);
  };

  return {
    messages,
    showMessage,
    removeMessage,
    clearAllMessages,
  };
}; 