import React, { useState, useEffect } from 'react';
import { cn } from '../../utils/cn';
import { Button } from '../Button/Button';
import { X } from 'lucide-react';
import './SystemAlert.scss';

export interface SystemAlertAction {
  label: string;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  external?: boolean;
}

export interface SystemAlertProps {
  /**
   * Alert variant
   */
  variant?: 'info' | 'success' | 'warning' | 'error' | 'announcement';
  /**
   * Main message text
   */
  message: string;
  /**
   * Optional description text
   */
  description?: string;
  /**
   * Action button
   */
  action?: SystemAlertAction;
  /**
   * Whether the alert can be dismissed
   */
  dismissible?: boolean;
  /**
   * Positioning
   */
  position?: 'top' | 'bottom';
  /**
   * Whether the alert is sticky
   */
  sticky?: boolean;
  /**
   * Auto-hide after specified milliseconds
   */
  autoHide?: number;
  /**
   * Show state (controlled)
   */
  show?: boolean;
  /**
   * Callback when alert is dismissed
   */
  onDismiss?: () => void;
  /**
   * Custom background color or gradient
   */
  background?: string;
  /**
   * Text color
   */
  textColor?: string;
  /**
   * Size variant
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Layout orientation
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Custom icon
   */
  icon?: React.ComponentType<{ className?: string }>;
  /**
   * Custom CSS classes
   */
  className?: string;
  /**
   * Additional content
   */
  children?: React.ReactNode;
}

/**
 * System Alert/Banner component for displaying important messages.
 * Perfect for announcements, early access banners, system status, etc.
 */
export const SystemAlert: React.FC<SystemAlertProps> = ({
  variant = 'info',
  message,
  description,
  action,
  dismissible = false,
  position = 'top',
  sticky = true,
  autoHide,
  show: controlledShow,
  onDismiss,
  background,
  textColor,
  size = 'md',
  orientation = 'horizontal',
  icon: Icon,
  className,
  children,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const isControlled = controlledShow !== undefined;
  const shouldShow = isControlled ? controlledShow : isVisible;

  // Auto-hide functionality
  useEffect(() => {
    if (autoHide && shouldShow) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, autoHide);

      return () => clearTimeout(timer);
    }
  }, [autoHide, shouldShow]);

  const handleDismiss = () => {
    setIsAnimating(true);
    
    setTimeout(() => {
      if (isControlled && onDismiss) {
        onDismiss();
      } else {
        setIsVisible(false);
      }
      setIsAnimating(false);
    }, 200); // Animation duration
  };

  const handleActionClick = () => {
    if (action?.onClick) {
      action.onClick();
    } else if (action?.href) {
      if (action.external) {
        window.open(action.href, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = action.href;
      }
    }
  };

  if (!shouldShow) return null;

  const customStyles = {
    ...(background && { backgroundColor: background }),
    ...(textColor && { color: textColor }),
  };

  return (
    <div
      className={cn(
        "vromm-system-alert",
        `vromm-system-alert--${variant}`,
        `vromm-system-alert--${size}`,
        `vromm-system-alert--${orientation}`,
        `vromm-system-alert--${position}`,
        sticky && "vromm-system-alert--sticky",
        isAnimating && "vromm-system-alert--dismissing",
        className
      )}
      style={customStyles}
      role="alert"
      aria-live="polite"
    >
      <div className="vromm-system-alert__container">
        <div className="vromm-system-alert__content">
          {/* Icon */}
          {Icon && (
            <div className="vromm-system-alert__icon">
              <Icon className="vromm-system-alert__icon-svg" />
            </div>
          )}

          {/* Text Content */}
          <div className="vromm-system-alert__text">
            <div className="vromm-system-alert__message">{message}</div>
            {description && (
              <div className="vromm-system-alert__description">{description}</div>
            )}
          </div>

          {/* Action Button */}
          {action && (
            <div className="vromm-system-alert__action">
              <Button
                variant={action.variant || 'primary'}
                size={size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md'}
                onClick={handleActionClick}
                className="vromm-system-alert__button"
              >
                {action.label}
              </Button>
            </div>
          )}

          {/* Custom Children */}
          {children && (
            <div className="vromm-system-alert__custom">
              {children}
            </div>
          )}
        </div>

        {/* Dismiss Button */}
        {dismissible && (
          <button
            onClick={handleDismiss}
            className="vromm-system-alert__dismiss"
            aria-label="Dismiss alert"
          >
            <X className="vromm-system-alert__dismiss-icon" />
          </button>
        )}
      </div>
    </div>
  );
};

SystemAlert.displayName = 'SystemAlert'; 