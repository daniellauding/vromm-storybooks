import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { LucideIcon } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button variant
   */
  variant?: 'primary' | 'secondary' | 'destructive' | 'success';
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
  variant?: 'primary' | 'secondary' | 'destructive' | 'success';
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

// Base button styles
const baseButtonClasses = [
  'inline-flex',
  'items-center',
  'justify-center',
  'gap-2',
  'font-title',
  'font-extrabold',
  'italic',
  'transition-all',
  'duration-200',
  'ease-in-out',
  'focus:outline-none',
  'focus:ring-2',
  'focus:ring-offset-2',
  'disabled:opacity-50',
  'disabled:cursor-not-allowed',
  'disabled:pointer-events-none',
  'select-none',
  'relative',
  'overflow-hidden',
  'border',
  'rounded-md',
].join(' ');

// Size variants
const sizeClasses = {
  xs: 'px-2.5 py-1.5 text-xs min-h-[28px]',
  sm: 'px-3 py-2 text-sm min-h-[32px]',
  md: 'px-4 py-2.5 text-sm min-h-[40px]',
  lg: 'px-6 py-3 text-base min-h-[48px]',
};

// Icon only size adjustments
const iconOnlySizeClasses = {
  xs: 'w-7 h-7 p-1.5',
  sm: 'w-8 h-8 p-2',
  md: 'w-10 h-10 p-2.5',
  lg: 'w-12 h-12 p-3',
};

// Variant and fill combinations
const variantFillClasses = {
  primary: {
    solid: [
      'bg-primary-600',
      'text-white',
      'border-primary-600',
      'hover:bg-primary-700',
      'hover:border-primary-700',
      'focus:ring-primary-500',
      'active:bg-primary-800',
      'shadow-sm',
      'hover:shadow-md',
    ].join(' '),
    outline: [
      'bg-transparent',
      'text-primary-600',
      'border-primary-600',
      'hover:bg-primary-50',
      'hover:text-primary-700',
      'focus:ring-primary-500',
      'active:bg-primary-100',
      'dark:hover:bg-primary-950',
      'dark:text-primary-400',
      'dark:border-primary-400',
      'dark:hover:text-primary-300',
    ].join(' '),
    text: [
      'bg-transparent',
      'text-primary-600',
      'border-transparent',
      'hover:bg-primary-50',
      'hover:text-primary-700',
      'focus:ring-primary-500',
      'active:bg-primary-100',
      'dark:hover:bg-primary-950',
      'dark:text-primary-400',
      'dark:hover:text-primary-300',
    ].join(' '),
  },
  secondary: {
    solid: [
      'bg-neutral-100',
      'text-neutral-900',
      'border-neutral-300',
      'hover:bg-neutral-200',
      'hover:border-neutral-400',
      'focus:ring-neutral-500',
      'active:bg-neutral-300',
      'shadow-sm',
      'hover:shadow-md',
      'dark:bg-neutral-800',
      'dark:text-neutral-100',
      'dark:border-neutral-600',
      'dark:hover:bg-neutral-700',
    ].join(' '),
    outline: [
      'bg-transparent',
      'text-neutral-700',
      'border-neutral-300',
      'hover:bg-neutral-50',
      'hover:text-neutral-900',
      'focus:ring-neutral-500',
      'active:bg-neutral-100',
      'dark:text-neutral-300',
      'dark:border-neutral-600',
      'dark:hover:bg-neutral-800',
      'dark:hover:text-neutral-100',
    ].join(' '),
    text: [
      'bg-transparent',
      'text-neutral-700',
      'border-transparent',
      'hover:bg-neutral-50',
      'hover:text-neutral-900',
      'focus:ring-neutral-500',
      'active:bg-neutral-100',
      'dark:text-neutral-300',
      'dark:hover:bg-neutral-800',
      'dark:hover:text-neutral-100',
    ].join(' '),
  },
  destructive: {
    solid: [
      'bg-error-600',
      'text-white',
      'border-error-600',
      'hover:bg-error-700',
      'hover:border-error-700',
      'focus:ring-error-500',
      'active:bg-error-800',
      'shadow-sm',
      'hover:shadow-md',
    ].join(' '),
    outline: [
      'bg-transparent',
      'text-error-600',
      'border-error-600',
      'hover:bg-error-50',
      'hover:text-error-700',
      'focus:ring-error-500',
      'active:bg-error-100',
      'dark:hover:bg-error-950',
      'dark:text-error-400',
      'dark:border-error-400',
      'dark:hover:text-error-300',
    ].join(' '),
    text: [
      'bg-transparent',
      'text-error-600',
      'border-transparent',
      'hover:bg-error-50',
      'hover:text-error-700',
      'focus:ring-error-500',
      'active:bg-error-100',
      'dark:hover:bg-error-950',
      'dark:text-error-400',
      'dark:hover:text-error-300',
    ].join(' '),
  },
  success: {
    solid: [
      'bg-success-600',
      'text-white',
      'border-success-600',
      'hover:bg-success-700',
      'hover:border-success-700',
      'focus:ring-success-500',
      'active:bg-success-800',
      'shadow-sm',
      'hover:shadow-md',
    ].join(' '),
    outline: [
      'bg-transparent',
      'text-success-600',
      'border-success-600',
      'hover:bg-success-50',
      'hover:text-success-700',
      'focus:ring-success-500',
      'active:bg-success-100',
      'dark:hover:bg-success-950',
      'dark:text-success-400',
      'dark:border-success-400',
      'dark:hover:text-success-300',
    ].join(' '),
    text: [
      'bg-transparent',
      'text-success-600',
      'border-transparent',
      'hover:bg-success-50',
      'hover:text-success-700',
      'focus:ring-success-500',
      'active:bg-success-100',
      'dark:hover:bg-success-950',
      'dark:text-success-400',
      'dark:hover:text-success-300',
    ].join(' '),
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

  const classes = cn(
    baseButtonClasses,
    variantFillClasses[variant][fill],
    iconOnly ? iconOnlySizeClasses[size] : sizeClasses[size],
    fullWidth && 'w-full',
    loading && 'cursor-wait',
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
          className="animate-spin"
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

  const classes = cn(
    baseButtonClasses,
    variantFillClasses[variant][fill],
    iconOnly ? iconOnlySizeClasses[size] : sizeClasses[size],
    fullWidth && 'w-full',
    'no-underline', // Remove default anchor underline
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