import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { LucideIcon } from 'lucide-react';
import './Button.scss';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button variant
   */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'destructive' | 'success';
  /**
   * Button size
   */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /**
   * Button fill style
   */
  fill?: 'solid' | 'outline' | 'text';
  /**
   * Icon to display (Lucide icon component)
   */
  icon?: LucideIcon;
  /**
   * Icon position
   */
  iconPosition?: 'left' | 'right';
  /**
   * Show only icon (no text)
   */
  iconOnly?: boolean;
  /**
   * Whether button should take full width
   */
  fullWidth?: boolean;
  /**
   * Loading state
   */
  loading?: boolean;
  /**
   * Tooltip content to display on hover
   */
  tooltip?: string;
  /**
   * Button content
   */
  children?: React.ReactNode;
}

export interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Button variant
   */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'destructive' | 'success';
  /**
   * Button size
   */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /**
   * Button fill style
   */
  fill?: 'solid' | 'outline' | 'text';
  /**
   * Icon to display (Lucide icon component)
   */
  icon?: LucideIcon;
  /**
   * Icon position
   */
  iconPosition?: 'left' | 'right';
  /**
   * Show only icon (no text)
   */
  iconOnly?: boolean;
  /**
   * Whether button should take full width
   */
  fullWidth?: boolean;
  /**
   * Required href for link button
   */
  href: string;
  /**
   * Button content
   */
  children?: React.ReactNode;
}

// Base button classes using SCSS
const baseButtonClasses = 'vromm-button';

// Size variants using SCSS
const sizeClasses = {
  xs: 'vromm-button--xs',
  sm: 'vromm-button--sm',
  md: 'vromm-button--md',
  lg: 'vromm-button--lg',
};

// Icon only size adjustments using SCSS
const iconOnlySizeClasses = {
  xs: 'vromm-button--icon-xs',
  sm: 'vromm-button--icon-sm',
  md: 'vromm-button--icon-md',
  lg: 'vromm-button--icon-lg',
};

// Variant and fill combinations using SCSS
const variantFillClasses = {
  primary: {
    solid: 'vromm-button--primary-solid',
    outline: 'vromm-button--primary-outline',
    text: 'vromm-button--primary-text',
  },
  secondary: {
    solid: 'vromm-button--secondary-solid',
    outline: 'vromm-button--secondary-outline',
    text: 'vromm-button--secondary-text',
  },
  tertiary: {
    solid: 'vromm-button--tertiary-solid',
    outline: 'vromm-button--tertiary-outline',
    text: 'vromm-button--tertiary-text',
  },
  destructive: {
    solid: 'vromm-button--destructive-solid',
    outline: 'vromm-button--destructive-outline',
    text: 'vromm-button--destructive-text',
  },
  success: {
    solid: 'vromm-button--success-solid',
    outline: 'vromm-button--success-outline',
    text: 'vromm-button--success-text',
  },
};

/**
 * Button component following accessibility guidelines and design system patterns.
 * 
 * Features:
 * - Multiple variants: primary, secondary, destructive, success
 * - Multiple sizes: xs, sm, md, lg
 * - Multiple fills: solid, outline, text
 * - Icon support with positioning
 * - Loading states
 * - Full width option
 * - Tooltip support
 * - Keyboard navigation
 * - Screen reader friendly
 * - Dark mode support
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'secondary',
  size = 'md',
  fill = 'solid',
  icon: Icon,
  iconPosition = 'left',
  iconOnly = false,
  fullWidth = false,
  loading = false,
  tooltip,
  children,
  className,
  disabled,
  type = 'button',
  ...props
}, ref) => {
  const isDisabled = disabled || loading;
  
  // Get icon size based on button size
  const getIconSize = () => {
    switch (size) {
      case 'xs': return 12;
      case 'sm': return 14;
      case 'md': return 16;
      case 'lg': return 18;
      default: return 16;
    }
  };

  // Safely get variant and fill classes with fallbacks
  const variantClasses = variantFillClasses[variant] || variantFillClasses.secondary;
  const fillClasses = variantClasses[fill] || variantClasses.solid;
  
  const classes = cn(
    baseButtonClasses,
    fillClasses,
    iconOnly ? iconOnlySizeClasses[size] : sizeClasses[size],
    fullWidth && 'vromm-button--full',
    loading && 'vromm-button--loading',
    className
  );

  const iconSize = getIconSize();
  const shouldShowIcon = Icon && !loading;
  const shouldShowText = children && !iconOnly;
  const showIconLeft = shouldShowIcon && iconPosition === 'left';
  const showIconRight = shouldShowIcon && iconPosition === 'right';

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      className={classes}
      title={tooltip}
      aria-label={iconOnly ? (typeof children === 'string' ? children : tooltip) : undefined}
      {...props}
    >
      {/* Loading spinner */}
      {loading && (
        <svg
          className="vromm-spinner"
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="16 8"
          />
        </svg>
      )}
      
      {/* Left icon */}
      {showIconLeft && (
        <Icon size={iconSize} aria-hidden="true" />
      )}
      
      {/* Button text */}
      {shouldShowText && children}
      
      {/* Right icon */}
      {showIconRight && (
        <Icon size={iconSize} aria-hidden="true" />
      )}
    </button>
  );
});

Button.displayName = 'Button';

/**
 * LinkButton component for creating anchor elements that look like buttons.
 * 
 * Use this when you need navigation behavior instead of action behavior.
 * All the same styling options as Button but renders as an anchor tag.
 */
export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(({
  variant = 'secondary',
  size = 'md',
  fill = 'solid',
  icon: Icon,
  iconPosition = 'left',
  iconOnly = false,
  fullWidth = false,
  children,
  className,
  href,
  ...props
}, ref) => {
  // Get icon size based on button size
  const getIconSize = () => {
    switch (size) {
      case 'xs': return 12;
      case 'sm': return 14;
      case 'md': return 16;
      case 'lg': return 18;
      default: return 16;
    }
  };

  // Safely get variant and fill classes with fallbacks
  const variantClasses = variantFillClasses[variant] || variantFillClasses.secondary;
  const fillClasses = variantClasses[fill] || variantClasses.solid;
  
  const classes = cn(
    baseButtonClasses,
    fillClasses,
    iconOnly ? iconOnlySizeClasses[size] : sizeClasses[size],
    fullWidth && 'vromm-button--full',
    'vromm-link-button', // Remove default anchor underline
    className
  );

  const iconSize = getIconSize();
  const shouldShowIcon = Icon;
  const shouldShowText = children && !iconOnly;
  const showIconLeft = shouldShowIcon && iconPosition === 'left';
  const showIconRight = shouldShowIcon && iconPosition === 'right';

  return (
    <a
      ref={ref}
      href={href}
      className={classes}
      aria-label={iconOnly ? (typeof children === 'string' ? children : undefined) : undefined}
      {...props}
    >
      {/* Left icon */}
      {showIconLeft && (
        <Icon size={iconSize} aria-hidden="true" />
      )}
      
      {/* Link text */}
      {shouldShowText && children}
      
      {/* Right icon */}
      {showIconRight && (
        <Icon size={iconSize} aria-hidden="true" />
      )}
    </a>
  );
});

LinkButton.displayName = 'LinkButton'; 