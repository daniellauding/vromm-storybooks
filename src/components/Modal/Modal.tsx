import React, { forwardRef, useEffect, useMemo } from 'react';
import { cn } from '../../utils/cn';
import { X } from 'lucide-react';
import { Button } from '../Button/Button';
import { zIndex } from '../../tokens';
import './Modal.scss';

export interface ModalProps {
  /**
   * Whether the modal is open
   */
  isOpen: boolean;
  /**
   * Function called when modal should close
   */
  onClose: () => void;
  /**
   * Modal title
   */
  title?: string;
  /**
   * Modal description
   */
  description?: string;
  /**
   * Modal size
   */
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | 'full';
  /**
   * Whether to show close button
   */
  showCloseButton?: boolean;
  /**
   * Whether clicking overlay closes modal
   */
  closeOnOverlayClick?: boolean;
  /**
   * Whether pressing escape closes modal
   */
  closeOnEscape?: boolean;
  /**
   * Enable mobile bottom sheet behavior
   */
  mobileBottomSheet?: boolean;
  /**
   * Height for mobile bottom sheet (e.g., '60vh', '70vh', '80vh')
   */
  mobileHeight?: string;
  /**
   * Z-index override for custom stacking (optional)
   */
  zIndexOverride?: number;
  /**
   * Custom header content
   */
  header?: React.ReactNode;
  /**
   * Modal content
   */
  children: React.ReactNode;
  /**
   * Footer content
   */
  footer?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Additional CSS classes for content
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for overlay
   */
  overlayClassName?: string;
}

const sizeClasses = {
  sm: 'vromm-modal--sm',
  md: 'vromm-modal--md',
  lg: 'vromm-modal--lg',
  xl: 'vromm-modal--xl',
  '2xl': 'vromm-modal--2xl',
  '3xl': 'vromm-modal--3xl',
  '4xl': 'vromm-modal--4xl',
  full: 'vromm-modal--full',
};

// Track open modals for automatic z-index stacking
let openModalCount = 0;
const getNextZIndex = () => {
  openModalCount++;
  // Base modal z-index + stacking increment
  return zIndex.modal + (openModalCount - 1) * 100;
};

const releaseZIndex = () => {
  openModalCount = Math.max(0, openModalCount - 1);
};

/**
 * Modal component for displaying content in an overlay.
 * 
 * Features:
 * - Multiple sizes (sm, md, lg, xl, 2xl, 3xl, 4xl, full)
 * - Mobile bottom sheet behavior
 * - Automatic z-index management for stacked modals
 * - Customizable header, content, and footer
 * - Overlay and escape key closing
 * - Accessible with focus management
 * - Mobile responsive
 * - Dark mode support
 */
export const Modal = forwardRef<HTMLDivElement, ModalProps>(({
  isOpen,
  onClose,
  title,
  description,
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  mobileBottomSheet = false,
  mobileHeight = '70vh',
  zIndexOverride,
  header,
  children,
  footer,
  className,
  contentClassName,
  overlayClassName,
}, ref) => {
  // Calculate z-index for this modal instance
  const modalZIndex = useMemo(() => {
    if (zIndexOverride) return zIndexOverride;
    if (!isOpen) return zIndex.modal;
    return getNextZIndex();
  }, [isOpen, zIndexOverride]);

  // Handle escape key
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscape, onClose]);

  // Prevent body scroll when modal is open and manage z-index count
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Z-index is already calculated in useMemo
    } else {
      document.body.style.overflow = 'unset';
      if (!zIndexOverride) {
        releaseZIndex();
      }
    }

    return () => {
      document.body.style.overflow = 'unset';
      if (isOpen && !zIndexOverride) {
        releaseZIndex();
      }
    };
  }, [isOpen, zIndexOverride]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  return (
    <div
      className={cn(
        'vromm-modal-overlay',
        mobileBottomSheet && 'vromm-modal-overlay--mobile',
        overlayClassName
      )}
      style={{ zIndex: modalZIndex }}
      onClick={handleOverlayClick}
    >
      <div 
        className={cn(
          'vromm-modal-container',
          mobileBottomSheet && 'vromm-modal-container--mobile'
        )}
        onClick={handleOverlayClick}
      >
        {!mobileBottomSheet && <span className="vromm-modal-spacer" aria-hidden="true">&#8203;</span>}
        <div
          ref={ref}
          className={cn(
            'vromm-modal-content',
            !mobileBottomSheet && sizeClasses[size],
            mobileBottomSheet && 'vromm-modal-content--mobile',
            className
          )}
          style={mobileBottomSheet ? { height: mobileHeight } : undefined}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'modal-title' : undefined}
          aria-describedby={description ? 'modal-description' : undefined}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          {(header || title || showCloseButton) && (
            <div className="vromm-modal-header">
              <div className="flex-1">
                {header || (
                  <div>
                    {title && (
                      <h2
                        id="modal-title"
                        className="vromm-modal-title"
                      >
                        {title}
                      </h2>
                    )}
                    {description && (
                      <p
                        id="modal-description"
                        className="mt-1 text-sm text-gray-600 dark:text-gray-400"
                      >
                        {description}
                      </p>
                    )}
                  </div>
                )}
              </div>
              
              {showCloseButton && (
                <Button
                  variant="secondary"
                  size="sm"
                  iconOnly
                  icon={X}
                  onClick={onClose}
                  className="vromm-modal-close"
                  aria-label="Close modal"
                />
              )}
            </div>
          )}

          {/* Content */}
          <div
            className={cn(
              'vromm-modal-body',
              mobileBottomSheet && 'vromm-modal-body--mobile',
              contentClassName
            )}
          >
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className="vromm-modal-footer">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

Modal.displayName = 'Modal'; 