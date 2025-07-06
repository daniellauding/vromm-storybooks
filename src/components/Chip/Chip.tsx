import React from 'react';
import { cn } from '../../utils/cn';

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  removable?: boolean;
  onRemove?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

/**
 * Chip component for displaying small pieces of information, tags, or filters.
 * 
 * Features:
 * - Multiple variants and sizes
 * - Removable chips with close button
 * - Icon support
 * - Brand color integration
 * - Dark mode support
 * - Disabled state
 * - Accessible design
 */
export const Chip = React.forwardRef<HTMLDivElement, ChipProps>(({
  variant = 'default',
  size = 'md',
  color = 'default',
  removable = false,
  onRemove,
  icon,
  disabled = false,
  className,
  children,
  onClick,
  ...props
}, ref) => {
  const isClickable = onClick && !disabled;
  
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled && onRemove) {
      onRemove();
    }
  };

  const variants = {
    default: 'vromm-chip--default',
    secondary: 'vromm-chip--secondary',
    outline: 'vromm-chip--outline',
    filled: 'vromm-chip--filled'
  };

  const sizes = {
    sm: 'vromm-chip--sm',
    md: 'vromm-chip--md',
    lg: 'vromm-chip--lg'
  };

  const colors = {
    default: 'vromm-chip--color-default',
    primary: 'vromm-chip--color-primary',
    secondary: 'vromm-chip--color-secondary',
    success: 'vromm-chip--color-success',
    warning: 'vromm-chip--color-warning',
    error: 'vromm-chip--color-error'
  };

  return (
    <div
      ref={ref}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onClick={isClickable ? onClick : undefined}
      className={cn(
        'vromm-chip',
        variants[variant],
        sizes[size],
        colors[color],
        disabled && 'vromm-chip--disabled',
        isClickable && 'vromm-chip--clickable',
        className
      )}
      {...props}
    >
      {icon && (
        <span className="vromm-chip-icon">
          {icon}
        </span>
      )}
      
      <span className="vromm-chip-content">
        {children}
      </span>
      
      {removable && (
        <button
          type="button"
          onClick={handleRemove}
          disabled={disabled}
          className="vromm-chip-remove"
          aria-label="Remove"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M9 3L3 9M3 3L9 9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
});

Chip.displayName = 'Chip'; 