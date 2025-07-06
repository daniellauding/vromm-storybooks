import React from 'react';
import { cn } from '../../utils/cn';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'floating';
  className?: string;
  children: React.ReactNode;
}

/**
 * Label component for form inputs and controls.
 * 
 * Features:
 * - Required indicator
 * - Disabled state
 * - Size variants
 * - Floating label support
 * - Brand styling
 * - Dark mode support
 * - Accessibility features
 */
export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({
  required = false,
  disabled = false,
  size = 'md',
  variant = 'default',
  className,
  children,
  ...props
}, ref) => {
  const sizes = {
    sm: 'vromm-label--sm',
    md: 'vromm-label--md',
    lg: 'vromm-label--lg'
  };

  const variants = {
    default: 'vromm-label--default',
    floating: 'vromm-label--floating'
  };

  return (
    <label
      ref={ref}
      className={cn(
        'vromm-label',
        variants[variant],
        sizes[size],
        disabled && 'vromm-label--disabled',
        className
      )}
      {...props}
    >
      {children}
      {required && (
        <span className="vromm-label-required" aria-label="required">
          *
        </span>
      )}
    </label>
  );
});

Label.displayName = 'Label'; 