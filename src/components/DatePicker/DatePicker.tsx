import React, { useState } from 'react';
import { cn } from '../../utils/cn';

export interface DatePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  label?: string;
  helperText?: string;
  error?: boolean | string;
  showTime?: boolean;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled' | 'outline';
  className?: string;
}

/**
 * DatePicker component for selecting dates and optionally times.
 * 
 * Features:
 * - Date selection with native input
 * - Optional time selection
 * - Form integration
 * - Error states
 * - Brand styling
 * - Dark mode support
 * - Accessibility support
 */
export const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(({
  value,
  onChange,
  label,
  helperText,
  error = false,
  showTime = false,
  placeholder,
  size = 'md',
  variant = 'default',
  className,
  id,
  ...props
}, ref) => {
  const datePickerId = id || `datepicker-${Math.random().toString(36).substring(2)}`;
  
  // Convert Date to input value format
  const formatDateForInput = (date: Date | null): string => {
    if (!date) return '';
    
    if (showTime) {
      // Format: YYYY-MM-DDTHH:mm
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    } else {
      // Format: YYYY-MM-DD
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  };

  // Parse input value to Date
  const parseInputValue = (inputValue: string): Date | null => {
    if (!inputValue) return null;
    const date = new Date(inputValue);
    return isNaN(date.getTime()) ? null : date;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const parsedDate = parseInputValue(inputValue);
    onChange?.(parsedDate);
  };

  const variants = {
    default: 'vromm-input--default',
    filled: 'vromm-input--filled',
    outline: 'vromm-input--outline'
  };

  const sizes = {
    sm: 'vromm-input--sm',
    md: 'vromm-input--md',
    lg: 'vromm-input--lg'
  };

  const errorStyles = error ? 'vromm-input--error' : '';
  const errorMessage = typeof error === 'string' ? error : undefined;

  return (
    <div className="vromm-form-field">
      {label && (
        <label 
          htmlFor={datePickerId}
          className="vromm-form-label"
        >
          {label}
        </label>
      )}
      
      <input
        id={datePickerId}
        ref={ref}
        type={showTime ? 'datetime-local' : 'date'}
        value={formatDateForInput(value || null)}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={cn(
          'vromm-input',
          variants[variant],
          sizes[size],
          errorStyles,
          className
        )}
        {...props}
      />
      
      {(helperText || errorMessage) && (
        <p className={cn(
          'vromm-form-helper',
          error ? 'vromm-form-helper--error' : 'vromm-form-helper--normal'
        )}>
          {errorMessage || helperText}
        </p>
      )}
    </div>
  );
});

DatePicker.displayName = 'DatePicker'; 