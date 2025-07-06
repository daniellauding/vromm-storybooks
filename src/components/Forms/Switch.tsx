import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import './Forms.scss';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  description?: string;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ 
    className, 
    size = 'md',
    label,
    description,
    id,
    checked,
    ...props 
  }, ref) => {
    const switchId = id || `switch-${Math.random().toString(36).substring(2)}`;

    const sizes = {
      sm: {
        track: 'vromm-switch--sm',
        thumb: 'vromm-switch-thumb--sm',
        translate: 'vromm-switch-thumb--checked-sm'
      },
      md: {
        track: 'vromm-switch--md',
        thumb: 'vromm-switch-thumb--md',
        translate: 'vromm-switch-thumb--checked-md'
      },
      lg: {
        track: 'vromm-switch--lg',
        thumb: 'vromm-switch-thumb--lg',
        translate: 'vromm-switch-thumb--checked-lg'
      }
    };

    return (
      <div className="flex items-start space-x-3">
        <div className="relative inline-flex items-center">
          <input
            id={switchId}
            type="checkbox"
            checked={checked}
            className="sr-only"
            ref={ref}
            {...props}
          />
          <label
            htmlFor={switchId}
            className={cn(
              'vromm-switch',
              sizes[size].track,
              checked 
                ? 'vromm-switch--checked' 
                : 'vromm-switch--unchecked',
              className
            )}
          >
            <span
              className={cn(
                'vromm-switch-thumb',
                sizes[size].thumb,
                checked ? sizes[size].translate : 'vromm-switch-thumb--unchecked'
              )}
            />
          </label>
        </div>
        
        {(label || description) && (
          <div className="flex-1">
            {label && (
              <label 
                htmlFor={switchId}
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
              >
                {label}
              </label>
            )}
            {description && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Switch.displayName = 'Switch'; 