import React from 'react';
import { cn } from '../../utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  shape?: 'rounded' | 'circular' | 'dot';
  className?: string;
  children?: React.ReactNode;
  count?: number | string;
}

/**
 * Badge component for displaying small status indicators, notifications, or labels.
 * 
 * **This is NOT a button** - it's a visual indicator only.
 * 
 * Features:
 * - Multiple variants (default, secondary, destructive, outline, success, warning)
 * - Size variants (sm, md, lg) 
 * - Shape variants:
 *   - `rounded`: Traditional pill-shaped badges for text/labels
 *   - `circular`: Perfect circles for numbers or single icons (e.g., "5", "99+")
 *   - `dot`: Small status dots for simple presence indicators
 * - Support for numbers, icons, or text content
 * - Brand color integration
 * - Dark mode support
 * - Accessible design with proper ARIA attributes
 * 
 * @example
 * // Number indicators (circular)
 * <Badge shape="circular" count="5" />
 * <Badge shape="circular" count="99+" variant="destructive" />
 * 
 * // Status dots
 * <Badge shape="dot" variant="success" />
 * <Badge shape="dot" variant="warning" />
 * 
 * // Text labels (rounded)
 * <Badge>New</Badge>
 * <Badge variant="success">Online</Badge>
 * 
 * // Icon indicators (circular)
 * <Badge shape="circular" variant="outline">
 *   <Heart className="w-4 h-4" />
 * </Badge>
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(({
  variant = 'default',
  size = 'md',
  shape = 'rounded',
  className,
  children,
  count,
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

  const shapes = {
    rounded: 'vromm-badge--rounded',
    circular: 'vromm-badge--circular',
    dot: 'vromm-badge--dot'
  };

  // For circular badges, prioritize count prop for number indicators
  // For dot badges, never show content (just the colored dot)
  // For rounded badges, use children normally
  let displayContent;
  if (shape === 'dot') {
    displayContent = null; // Dots never show content
  } else if (shape === 'circular' && count !== undefined) {
    displayContent = count; // Numbers take priority for circular badges
  } else {
    displayContent = children; // Default behavior
  }

  return (
    <span
      ref={ref}
      className={cn(
        'vromm-badge',
        variants[variant],
        sizes[size],
        shapes[shape],
        className
      )}
      role="status"
      aria-label={
        shape === 'dot' 
          ? `${variant} status indicator`
          : typeof displayContent === 'string' || typeof displayContent === 'number'
            ? `${displayContent}`
            : 'Status indicator'
      }
      {...props}
    >
      {displayContent}
    </span>
  );
});

Badge.displayName = 'Badge'; 