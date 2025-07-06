import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import './Forms.scss';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  variant?: 'default' | 'filled' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  error?: boolean;
  label?: string;
  helperText?: string;
  placeholder?: string;
  children: React.ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ 
    className, 
    variant = 'default', 
    size = 'md',
    error = false,
    label,
    helperText,
    placeholder,
    children,
    id,
    ...props 
  }, ref) => {
    const selectId = id || `select-${Math.random().toString(36).substring(2)}`;

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

    return (
      <div className="vromm-form-field">
        {label && (
          <label 
            htmlFor={selectId}
            className="vromm-form-label"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          <select
            id={selectId}
            className={cn(
              'vromm-select',
              variants[variant],
              sizes[size],
              errorStyles,
              className
            )}
            ref={ref}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {children}
          </select>
          
          {/* Custom arrow */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        
        {helperText && (
          <p className={cn(
            'vromm-form-helper',
            error ? 'vromm-form-helper--error' : 'vromm-form-helper--normal'
          )}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select'; 