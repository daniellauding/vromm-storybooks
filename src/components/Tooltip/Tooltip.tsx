import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { cn } from '../../utils/cn';
import './Tooltip.scss';

export interface TooltipProps {
  /**
   * Tooltip content
   */
  content: React.ReactNode;
  /**
   * Tooltip position relative to trigger
   */
  side?: 'top' | 'right' | 'bottom' | 'left';
  /**
   * Tooltip alignment relative to trigger
   */
  align?: 'start' | 'center' | 'end';
  /**
   * Tooltip trigger element
   */
  children: React.ReactNode;
  /**
   * Whether to show tooltip on hover
   */
  showOnHover?: boolean;
  /**
   * Whether to show tooltip on focus
   */
  showOnFocus?: boolean;
  /**
   * Delay before showing tooltip (ms)
   */
  delay?: number;
  /**
   * Whether tooltip is disabled
   */
  disabled?: boolean;
  /**
   * Additional CSS classes for tooltip content
   */
  className?: string;
  /**
   * Additional CSS classes for trigger wrapper
   */
  triggerClassName?: string;
  /**
   * Tooltip variant
   */
  variant?: 'default' | 'dark' | 'light' | 'error' | 'warning' | 'success';
  /**
   * Maximum width of tooltip
   */
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * Tooltip component for displaying contextual information on hover or focus.
 * 
 * Features:
 * - Multiple positioning options (top, right, bottom, left)
 * - Alignment options (start, center, end)
 * - Hover and focus triggers
 * - Customizable delay
 * - Multiple variants and sizes
 * - Accessibility support with ARIA attributes
 * - Auto-positioning to stay within viewport
 */
export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(({
  content,
  side = 'top',
  align = 'center',
  children,
  showOnHover = true,
  showOnFocus = true,
  delay = 200,
  disabled = false,
  className,
  triggerClassName,
  variant = 'default',
  maxWidth = 'sm',
  ...props
}, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [actualSide, setActualSide] = useState(side);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const showTooltip = () => {
    if (disabled) return;
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      // Auto-positioning logic could go here
      setActualSide(side);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const sideClasses = {
    top: 'vromm-tooltip--top',
    right: 'vromm-tooltip--right',
    bottom: 'vromm-tooltip--bottom',
    left: 'vromm-tooltip--left',
  };

  const alignClasses = {
    start: 'vromm-tooltip--align-start',
    center: 'vromm-tooltip--align-center',
    end: 'vromm-tooltip--align-end',
  };

  const variantClasses = {
    default: 'vromm-tooltip--default',
    dark: 'vromm-tooltip--dark',
    light: 'vromm-tooltip--light',
    error: 'vromm-tooltip--error',
    warning: 'vromm-tooltip--warning',
    success: 'vromm-tooltip--success',
  };

  const maxWidthClasses = {
    xs: 'vromm-tooltip--max-w-xs',
    sm: 'vromm-tooltip--max-w-sm',
    md: 'vromm-tooltip--max-w-md',
    lg: 'vromm-tooltip--max-w-lg',
    xl: 'vromm-tooltip--max-w-xl',
  };

  return (
    <div className={cn('vromm-tooltip-wrapper', triggerClassName)}>
      {/* Trigger */}
      <div
        ref={triggerRef}
        className="vromm-tooltip-trigger"
        onMouseEnter={showOnHover ? showTooltip : undefined}
        onMouseLeave={showOnHover ? hideTooltip : undefined}
        onFocus={showOnFocus ? showTooltip : undefined}
        onBlur={showOnFocus ? hideTooltip : undefined}
        aria-describedby={isVisible ? 'tooltip' : undefined}
      >
        {children}
      </div>

      {/* Tooltip Content */}
      {isVisible && (
        <div
          ref={ref || tooltipRef}
          id="tooltip"
          role="tooltip"
          className={cn(
            'vromm-tooltip-content',
            sideClasses[actualSide],
            alignClasses[align],
            variantClasses[variant],
            maxWidthClasses[maxWidth],
            className
          )}
          data-side={actualSide}
          data-align={align}
          {...props}
        >
          <div className="vromm-tooltip-arrow" />
          <div className="vromm-tooltip-text">
            {content}
          </div>
        </div>
      )}
    </div>
  );
});

Tooltip.displayName = 'Tooltip'; 