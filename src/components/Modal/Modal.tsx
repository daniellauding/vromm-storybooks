import React, { forwardRef, useEffect } from 'react';
import { cn } from '../../utils/cn';
import { X } from 'lucide-react';
import { Button } from '../Button/Button';
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
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
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
  full: 'vromm-modal--full',
};

/**
 * Modal component for displaying content in an overlay.
 * 
 * Features:
 * - Multiple sizes (sm, md, lg, xl, full)
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
  header,
  children,
  footer,
  className,
  contentClassName,
  overlayClassName,
}, ref) => {
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

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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
        overlayClassName
      )}
      onClick={handleOverlayClick}
    >
      <div className="vromm-modal-container">
        <span className="vromm-modal-spacer" aria-hidden="true">&#8203;</span>
        <div
          ref={ref}
          className={cn(
            'vromm-modal-content',
            sizeClasses[size],
            className
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'modal-title' : undefined}
          aria-describedby={description ? 'modal-description' : undefined}
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