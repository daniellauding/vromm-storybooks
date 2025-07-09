import React from 'react';
import { cn } from '../../utils/cn';

export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  variant?: 'default' | 'ordered' | 'unstyled' | 'spaced' | 'divided';
  size?: 'sm' | 'md' | 'lg';
  as?: 'ul' | 'ol';
}

export interface ListItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  variant?: 'default' | 'interactive' | 'disabled';
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export const List = React.forwardRef<HTMLUListElement, ListProps>(
  ({ className, variant = 'default', size = 'md', as = 'ul', children, ...props }, ref) => {
    const Component = as;
    
    return (
      <Component
        ref={ref}
        className={cn(
          'space-y-1',
          {
            // Variants
            'list-disc list-inside': variant === 'default' && as === 'ul',
            'list-decimal list-inside': variant === 'ordered' || as === 'ol',
            'list-none': variant === 'unstyled',
            'space-y-3': variant === 'spaced',
            'divide-y divide-gray-200': variant === 'divided',
            
            // Sizes
            'text-sm': size === 'sm',
            'text-base': size === 'md',
            'text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

export const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ className, variant = 'default', icon, action, children, ...props }, ref) => {
    return (
      <li
        ref={ref}
        className={cn(
          'flex items-start gap-2',
          {
            'hover:bg-gray-50 cursor-pointer rounded-md px-2 py-1 transition-colors': variant === 'interactive',
            'opacity-50 cursor-not-allowed': variant === 'disabled',
          },
          className
        )}
        {...props}
      >
        {icon && (
          <span className="flex-shrink-0 mt-0.5 text-gray-500">
            {icon}
          </span>
        )}
        <span className="flex-grow">{children}</span>
        {action && (
          <span className="flex-shrink-0">
            {action}
          </span>
        )}
      </li>
    );
  }
);

// Specialized List variants
export interface DescriptionListProps extends React.HTMLAttributes<HTMLDListElement> {
  orientation?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
}

export interface DescriptionTermProps extends React.HTMLAttributes<HTMLElement> {}

export interface DescriptionDetailsProps extends React.HTMLAttributes<HTMLElement> {}

export const DescriptionList = React.forwardRef<HTMLDListElement, DescriptionListProps>(
  ({ className, orientation = 'vertical', size = 'md', ...props }, ref) => {
    return (
      <dl
        ref={ref}
        className={cn(
          {
            'space-y-2': orientation === 'vertical',
            'grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-3': orientation === 'horizontal',
            
            'text-sm': size === 'sm',
            'text-base': size === 'md',
            'text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      />
    );
  }
);

export const DescriptionTerm = React.forwardRef<HTMLElement, DescriptionTermProps>(
  ({ className, ...props }, ref) => {
    return (
      <dt
        ref={ref}
        className={cn(
          'font-medium text-gray-900',
          className
        )}
        {...props}
      />
    );
  }
);

export const DescriptionDetails = React.forwardRef<HTMLElement, DescriptionDetailsProps>(
  ({ className, ...props }, ref) => {
    return (
      <dd
        ref={ref}
        className={cn(
          'text-gray-700 mt-1',
          className
        )}
        {...props}
      />
    );
  }
);

List.displayName = 'List';
ListItem.displayName = 'ListItem';
DescriptionList.displayName = 'DescriptionList';
DescriptionTerm.displayName = 'DescriptionTerm';
DescriptionDetails.displayName = 'DescriptionDetails'; 