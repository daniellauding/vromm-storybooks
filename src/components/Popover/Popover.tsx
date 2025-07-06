import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { cn } from '../../utils/cn';
import './Popover.scss';

export interface PopoverProps {
  /**
   * Popover trigger element
   */
  trigger: React.ReactNode;
  /**
   * Whether the popover is open
   */
  open?: boolean;
  /**
   * Function called when open state changes
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Popover position relative to trigger
   */
  side?: 'top' | 'right' | 'bottom' | 'left';
  /**
   * Popover alignment relative to trigger
   */
  align?: 'start' | 'center' | 'end';
  /**
   * Popover content
   */
  children: React.ReactNode;
  /**
   * Additional CSS classes for content
   */
  className?: string;
  /**
   * Additional CSS classes for trigger wrapper
   */
  triggerClassName?: string;
  /**
   * Whether clicking outside closes popover
   */
  closeOnClickOutside?: boolean;
  /**
   * Whether pressing escape closes popover
   */
  closeOnEscape?: boolean;
  /**
   * Popover size
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Whether to show arrow pointer
   */
  showArrow?: boolean;
  /**
   * Whether popover content is interactive (allows focus/click)
   */
  interactive?: boolean;
}

export interface PopoverHeaderProps {
  /**
   * Header content
   */
  children: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Whether to show close button
   */
  showCloseButton?: boolean;
  /**
   * Function called when close button is clicked
   */
  onClose?: () => void;
}

export interface PopoverContentProps {
  /**
   * Content
   */
  children: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

export interface PopoverFooterProps {
  /**
   * Footer content
   */
  children: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Popover component for displaying rich interactive content in an overlay.
 * 
 * Features:
 * - Customizable trigger element
 * - Multiple positioning options
 * - Interactive content support
 * - Click outside and escape key handling
 * - Accessible with proper ARIA attributes
 * - Optional arrow pointer
 * - Multiple sizes
 */
export const Popover = forwardRef<HTMLDivElement, PopoverProps>(({
  trigger,
  open: controlledOpen,
  onOpenChange,
  side = 'bottom',
  align = 'center',
  children,
  className,
  triggerClassName,
  closeOnClickOutside = true,
  closeOnEscape = true,
  size = 'md',
  showArrow = true,
  interactive = true,
  ...props
}, ref) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;
  
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const handleOpenChange = (newOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  const handleTriggerClick = () => {
    handleOpenChange(!isOpen);
  };

  // Handle click outside
  useEffect(() => {
    if (!isOpen || !closeOnClickOutside) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        triggerRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        handleOpenChange(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, closeOnClickOutside]);

  // Handle escape key
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleOpenChange(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscape]);

  const sideClasses = {
    top: 'vromm-popover--top',
    right: 'vromm-popover--right',
    bottom: 'vromm-popover--bottom',
    left: 'vromm-popover--left',
  };

  const alignClasses = {
    start: 'vromm-popover--align-start',
    center: 'vromm-popover--align-center',
    end: 'vromm-popover--align-end',
  };

  const sizeClasses = {
    sm: 'vromm-popover--sm',
    md: 'vromm-popover--md',
    lg: 'vromm-popover--lg',
    xl: 'vromm-popover--xl',
  };

  return (
    <div className={cn('vromm-popover-wrapper', triggerClassName)}>
      {/* Trigger */}
      <div
        ref={triggerRef}
        onClick={handleTriggerClick}
        className="vromm-popover-trigger"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        data-state={isOpen ? 'open' : 'closed'}
      >
        {trigger}
      </div>

      {/* Content */}
      {isOpen && (
        <div
          ref={ref || popoverRef}
          className={cn(
            'vromm-popover-content',
            sideClasses[side],
            alignClasses[align],
            sizeClasses[size],
            !interactive && 'vromm-popover-content--non-interactive',
            className
          )}
          role="dialog"
          data-state="open"
          data-side={side}
          data-align={align}
          tabIndex={interactive ? -1 : undefined}
          {...props}
        >
          {showArrow && <div className="vromm-popover-arrow" data-side={side} />}
          {children}
        </div>
      )}
    </div>
  );
});

Popover.displayName = 'Popover';

/**
 * PopoverHeader component for popover titles and close buttons.
 */
export const PopoverHeader = forwardRef<HTMLDivElement, PopoverHeaderProps>(({
  children,
  className,
  showCloseButton = false,
  onClose,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn('vromm-popover-header', className)}
      {...props}
    >
      <div className="vromm-popover-header-content">
        {children}
      </div>
      {showCloseButton && (
        <button
          onClick={onClose}
          className="vromm-popover-close"
          aria-label="Close popover"
        >
          ×
        </button>
      )}
    </div>
  );
});

PopoverHeader.displayName = 'PopoverHeader';

/**
 * PopoverContent component for main popover content.
 */
export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(({
  children,
  className,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn('vromm-popover-body', className)}
      {...props}
    >
      {children}
    </div>
  );
});

PopoverContent.displayName = 'PopoverContent';

/**
 * PopoverFooter component for action buttons and additional content.
 */
export const PopoverFooter = forwardRef<HTMLDivElement, PopoverFooterProps>(({
  children,
  className,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn('vromm-popover-footer', className)}
      {...props}
    >
      {children}
    </div>
  );
});

PopoverFooter.displayName = 'PopoverFooter'; 