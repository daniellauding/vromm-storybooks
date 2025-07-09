import React from 'react';
import { cn } from '../../utils/cn';
import './Chip.scss';

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'neutral' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  removable?: boolean;
  onRemove?: () => void;
  icon?: React.ComponentType<{ className?: string }>;
  disabled?: boolean;
  selected?: boolean;
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
 * - Selected state
 * - Accessible design
 */
export const Chip = React.forwardRef<HTMLDivElement, ChipProps>(({
  variant = 'neutral',
  size = 'md',
  removable = false,
  onRemove,
  icon: Icon,
  disabled = false,
  selected = false,
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick?.(e as any);
    }
  };

  return (
    <div
      ref={ref}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onClick={isClickable ? onClick : undefined}
      onKeyDown={handleKeyDown}
      className={cn(
        'vromm-chip',
        `vromm-chip--${variant}`,
        `vromm-chip--${size}`,
        disabled && 'vromm-chip--disabled',
        selected && 'vromm-chip--selected',
        isClickable && 'vromm-chip--clickable',
        className
      )}
      aria-pressed={selected}
      aria-disabled={disabled}
      {...props}
    >
      {Icon && (
        <Icon className="vromm-chip__icon" />
      )}
      
      <span className="vromm-chip__content">
        {children}
      </span>
      
      {removable && (
        <button
          type="button"
          onClick={handleRemove}
          disabled={disabled}
          className="vromm-chip__remove"
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