import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import './Forms.scss';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'default' | 'filled' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  error?: boolean;
  label?: string;
  helperText?: string;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ 
    className, 
    variant = 'default', 
    size = 'md',
    error = false,
    label,
    helperText,
    resize = 'vertical',
    id,
    rows = 4,
    ...props 
  }, ref) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substring(2)}`;

    const variants = {
      default: 'vromm-input--default',
      filled: 'vromm-input--filled',
      outline: 'vromm-input--outline'
    };

    const sizes = {
      sm: 'vromm-textarea--sm',
      md: 'vromm-textarea--md',
      lg: 'vromm-textarea--lg'
    };

    const resizeStyles = {
      none: 'resize-none',
      vertical: 'resize-y',
      horizontal: 'resize-x',
      both: 'resize'
    };

    const errorStyles = error ? 'vromm-input--error' : '';

    return (
      <div className="vromm-form-field">
        {label && (
          <label 
            htmlFor={textareaId}
            className="vromm-form-label"
          >
            {label}
          </label>
        )}
        
        <textarea
          id={textareaId}
          rows={rows}
          className={cn(
            'vromm-textarea',
            variants[variant],
            sizes[size],
            resizeStyles[resize],
            errorStyles,
            className
          )}
          ref={ref}
          {...props}
        />
        
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

TextArea.displayName = 'TextArea'; 