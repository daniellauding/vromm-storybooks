import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import './Forms.scss';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'filled' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  error?: boolean;
  label?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    variant = 'default', 
    size = 'md',
    error = false,
    label,
    helperText,
    leftIcon,
    rightIcon,
    type = 'text',
    id,
    ...props 
  }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substring(2)}`;

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
            htmlFor={inputId}
            className="vromm-form-label"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}
          
          <input
            id={inputId}
            type={type}
            className={cn(
              'vromm-input',
              variants[variant],
              sizes[size],
              errorStyles,
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              className
            )}
            ref={ref}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {rightIcon}
            </div>
          )}
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

Input.displayName = 'Input'; 