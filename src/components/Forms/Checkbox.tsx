import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import './Forms.scss';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  description?: string;
  error?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ 
    className, 
    size = 'md',
    label,
    description,
    error = false,
    id,
    ...props 
  }, ref) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substring(2)}`;

    const sizes = {
      sm: 'vromm-checkbox--sm',
      md: 'vromm-checkbox--md',
      lg: 'vromm-checkbox--lg'
    };

    const errorStyles = error ? 'vromm-checkbox--error' : 'vromm-checkbox--normal';

    return (
      <div className="flex items-start space-x-3">
        <div className="flex items-center h-5">
          <input
            id={checkboxId}
            type="checkbox"
            className={cn(
              'vromm-checkbox',
              sizes[size],
              errorStyles,
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        
        {(label || description) && (
          <div className="flex-1">
            {label && (
              <label 
                htmlFor={checkboxId}
                className={cn(
                  'block text-sm font-medium cursor-pointer',
                  error 
                    ? 'text-red-700 dark:text-red-400' 
                    : 'text-gray-700 dark:text-gray-300'
                )}
              >
                {label}
              </label>
            )}
            {description && (
              <p className={cn(
                'text-sm',
                error 
                  ? 'text-red-600 dark:text-red-400' 
                  : 'text-gray-500 dark:text-gray-400'
              )}>
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox'; 