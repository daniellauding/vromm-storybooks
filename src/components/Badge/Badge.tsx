import React from 'react';
import { cn } from '../../utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
}

/**
 * Badge component for displaying small pieces of information.
 * 
 * Features:
 * - Multiple variants (default, secondary, destructive, outline, success, warning)
 * - Size variants (sm, md, lg) 
 * - Brand color integration
 * - Dark mode support
 * - Accessible design
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(({
  variant = 'default',
  size = 'md',
  className,
  children,
  ...props
}, ref) => {
  const variants = {
    default: 'vromm-badge--default',
    secondary: 'vromm-badge--secondary', 
    destructive: 'vromm-badge--destructive',
    outline: 'vromm-badge--outline',
    success: 'vromm-badge--success',
    warning: 'vromm-badge--warning'
  };

  const sizes = {
    sm: 'vromm-badge--sm',
    md: 'vromm-badge--md', 
    lg: 'vromm-badge--lg'
  };

  return (
    <span
      ref={ref}
      className={cn(
        'vromm-badge',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = 'Badge'; 