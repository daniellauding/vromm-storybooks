import React, { useState } from 'react';
import { cn } from '../../utils/cn';

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'pills' | 'underline' | 'minimal';
}

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
}

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const TabsContext = React.createContext<{
  value: string;
  onValueChange: (value: string) => void;
  orientation: 'horizontal' | 'vertical';
  variant: 'default' | 'pills' | 'underline' | 'minimal';
}>({
  value: '',
  onValueChange: () => {},
  orientation: 'horizontal',
  variant: 'default',
});

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ 
    className, 
    defaultValue, 
    value: controlledValue, 
    onValueChange, 
    orientation = 'horizontal',
    variant = 'default',
    children, 
    ...props 
  }, ref) => {
    const [internalValue, setInternalValue] = useState(defaultValue || '');
    
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;

    const handleValueChange = (newValue: string) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    };

    return (
      <TabsContext.Provider 
        value={{ 
          value, 
          onValueChange: handleValueChange,
          orientation,
          variant
        }}
      >
        <div
          ref={ref}
          className={cn(
            {
              'flex flex-col': orientation === 'horizontal',
              'flex flex-row': orientation === 'vertical',
            },
            className
          )}
          {...props}
        >
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);

export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, ...props }, ref) => {
    const { orientation, variant } = React.useContext(TabsContext);

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center',
          {
            // Orientation
            'flex-row': orientation === 'horizontal',
            'flex-col': orientation === 'vertical',
            
            // Variants
            'rounded-lg bg-gray-100 p-1': variant === 'default',
            'rounded-full bg-gray-100 p-1': variant === 'pills',
            'border-b border-gray-200': variant === 'underline',
            'gap-1': variant === 'minimal',
          },
          className
        )}
        {...props}
      />
    );
  }
);

export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value: triggerValue, icon, badge, children, ...props }, ref) => {
    const { value, onValueChange, variant } = React.useContext(TabsContext);
    const isSelected = value === triggerValue;

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium',
          'ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2',
          'focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          {
            // Default variant
            'bg-white text-gray-900 shadow-sm': variant === 'default' && isSelected,
            'text-gray-600 hover:text-gray-900': variant === 'default' && !isSelected,
            
            // Pills variant
            'bg-white text-gray-900 shadow-sm rounded-full': variant === 'pills' && isSelected,
            'text-gray-600 hover:text-gray-900 rounded-full': variant === 'pills' && !isSelected,
            
            // Underline variant
            'border-b-2 border-blue-500 text-blue-600 bg-transparent rounded-none': variant === 'underline' && isSelected,
            'border-b-2 border-transparent text-gray-600 hover:text-gray-900 bg-transparent rounded-none': variant === 'underline' && !isSelected,
            
            // Minimal variant
            'text-blue-600 bg-blue-50': variant === 'minimal' && isSelected,
            'text-gray-600 hover:text-gray-900 hover:bg-gray-50': variant === 'minimal' && !isSelected,
          },
          className
        )}
        onClick={() => onValueChange(triggerValue)}
        {...props}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {children}
        {badge && <span className="ml-2">{badge}</span>}
      </button>
    );
  }
);

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value: contentValue, children, ...props }, ref) => {
    const { value } = React.useContext(TabsContext);
    const isSelected = value === contentValue;

    if (!isSelected) return null;

    return (
      <div
        ref={ref}
        className={cn(
          'mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2',
          'focus-visible:ring-ring focus-visible:ring-offset-2',
          'animate-in fade-in-50 duration-200',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Tabs.displayName = 'Tabs';
TabsList.displayName = 'TabsList';
TabsTrigger.displayName = 'TabsTrigger';
TabsContent.displayName = 'TabsContent'; 