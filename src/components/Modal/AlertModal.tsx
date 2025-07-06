import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { Modal, ModalProps } from './Modal';
import { Button } from '../Button/Button';
import { AlertCircle, CheckCircle, XCircle, Info } from 'lucide-react';
import './Modal.scss';

export interface AlertModalProps extends Omit<ModalProps, 'children' | 'header' | 'footer'> {
  /**
   * Alert variant
   */
  variant?: 'info' | 'success' | 'warning' | 'destructive';
  /**
   * Alert message content
   */
  message: React.ReactNode;
  /**
   * Primary action button text
   */
  confirmText?: string;
  /**
   * Secondary action button text
   */
  cancelText?: string;
  /**
   * Function called when confirm button is clicked
   */
  onConfirm?: () => void;
  /**
   * Function called when cancel button is clicked
   */
  onCancel?: () => void;
  /**
   * Whether to show cancel button
   */
  showCancel?: boolean;
  /**
   * Whether primary action is loading
   */
  isLoading?: boolean;
  /**
   * Custom icon override
   */
  icon?: React.ComponentType<{ className?: string }>;
}

const variantConfig = {
  info: {
    icon: Info,
    iconColor: 'text-blue-500',
    confirmVariant: 'primary' as const,
  },
  success: {
    icon: CheckCircle,
    iconColor: 'text-green-500',
    confirmVariant: 'success' as const,
  },
  warning: {
    icon: AlertCircle,
    iconColor: 'text-yellow-500',
    confirmVariant: 'primary' as const,
  },
  destructive: {
    icon: XCircle,
    iconColor: 'text-red-500',
    confirmVariant: 'destructive' as const,
  },
};

/**
 * AlertModal component for confirmations, warnings, and alerts.
 * 
 * Features:
 * - Different variants (info, success, warning, destructive)
 * - Customizable confirm/cancel actions
 * - Loading states
 * - Accessible with proper ARIA labels
 * - Icon indicators for each variant
 */
export const AlertModal = forwardRef<HTMLDivElement, AlertModalProps>(({
  variant = 'info',
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  onClose,
  showCancel = true,
  isLoading = false,
  icon: CustomIcon,
  size = 'sm',
  ...modalProps
}, ref) => {
  const config = variantConfig[variant];
  const IconComponent = CustomIcon || config.icon;

  const handleConfirm = () => {
    onConfirm?.();
    if (!isLoading) {
      onClose();
    }
  };

  const handleCancel = () => {
    onCancel?.();
    onClose();
  };

  const header = (
    <div className="flex items-center gap-3">
      <div className={cn('flex-shrink-0', config.iconColor)}>
        <IconComponent className="w-6 h-6" />
      </div>
      <div>
        {modalProps.title && (
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {modalProps.title}
          </h2>
        )}
        {modalProps.description && (
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {modalProps.description}
          </p>
        )}
      </div>
    </div>
  );

  const footer = (
    <div className="flex gap-3 justify-end">
      {showCancel && (
        <Button
          variant="secondary"
          onClick={handleCancel}
          disabled={isLoading}
        >
          {cancelText}
        </Button>
      )}
      {onConfirm && (
        <Button
          variant={config.confirmVariant}
          onClick={handleConfirm}
          loading={isLoading}
        >
          {confirmText}
        </Button>
      )}
    </div>
  );

  return (
    <Modal
      ref={ref}
      {...modalProps}
      onClose={onClose}
      size={size}
      header={header}
      footer={footer}
      closeOnOverlayClick={!isLoading}
      closeOnEscape={!isLoading}
    >
      <div className="text-gray-700 dark:text-gray-300">
        {message}
      </div>
    </Modal>
  );
});

AlertModal.displayName = 'AlertModal'; 