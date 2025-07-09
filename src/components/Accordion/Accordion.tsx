import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'single' | 'multiple';
  collapsible?: boolean;
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
}

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean;
}

export interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
}

export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const AccordionContext = React.createContext<{
  type: 'single' | 'multiple';
  collapsible: boolean;
  value: string | string[];
  onValueChange: (value: string | string[]) => void;
}>({
  type: 'single',
  collapsible: false,
  value: '',
  onValueChange: () => {},
});

const AccordionItemContext = React.createContext<{
  value: string;
  isOpen: boolean;
  toggle: () => void;
  disabled: boolean;
}>({
  value: '',
  isOpen: false,
  toggle: () => {},
  disabled: false,
});

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ 
    className, 
    type = 'single', 
    collapsible = false, 
    defaultValue, 
    value: controlledValue, 
    onValueChange, 
    children, 
    ...props 
  }, ref) => {
    const [internalValue, setInternalValue] = useState<string | string[]>(() => {
      if (controlledValue !== undefined) return controlledValue;
      if (defaultValue !== undefined) return defaultValue;
      return type === 'multiple' ? [] : '';
    });

    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;

    const handleValueChange = (newValue: string | string[]) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    };

    return (
      <AccordionContext.Provider 
        value={{ 
          type, 
          collapsible, 
          value, 
          onValueChange: handleValueChange 
        }}
      >
        <div
          ref={ref}
          className={cn(
            'divide-y divide-gray-200 border border-gray-200 rounded-lg',
            className
          )}
          {...props}
        >
          {children}
        </div>
      </AccordionContext.Provider>
    );
  }
);

export const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, value, disabled = false, children, ...props }, ref) => {
    const { type, collapsible, value: accordionValue, onValueChange } = React.useContext(AccordionContext);
    
    const isOpen = type === 'multiple' 
      ? Array.isArray(accordionValue) && accordionValue.includes(value)
      : accordionValue === value;

    const toggle = () => {
      if (disabled) return;
      
      if (type === 'multiple') {
        const currentValue = Array.isArray(accordionValue) ? accordionValue : [];
        const newValue = isOpen 
          ? currentValue.filter(v => v !== value)
          : [...currentValue, value];
        onValueChange(newValue);
      } else {
        const newValue = (isOpen && collapsible) ? '' : value;
        onValueChange(newValue);
      }
    };

    return (
      <AccordionItemContext.Provider value={{ value, isOpen, toggle, disabled }}>
        <div
          ref={ref}
          className={cn(
            'border-gray-200',
            className
          )}
          {...props}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  }
);

export const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, icon, children, ...props }, ref) => {
    const { isOpen, toggle, disabled } = React.useContext(AccordionItemContext);

    return (
      <button
        ref={ref}
        className={cn(
          'flex w-full items-center justify-between px-4 py-3 text-left font-medium',
          'hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset',
          'transition-colors duration-200',
          {
            'bg-gray-50': isOpen,
            'opacity-50 cursor-not-allowed': disabled,
            'cursor-pointer': !disabled,
          },
          className
        )}
        disabled={disabled}
        onClick={toggle}
        aria-expanded={isOpen}
        {...props}
      >
        <span className="flex items-center gap-2">
          {icon && <span className="text-gray-500">{icon}</span>}
          {children}
        </span>
        <ChevronDown 
          className={cn(
            'h-4 w-4 transition-transform duration-200 text-gray-500',
            isOpen && 'rotate-180'
          )} 
        />
      </button>
    );
  }
);

export const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, children, ...props }, ref) => {
    const { isOpen } = React.useContext(AccordionItemContext);

    return (
      <div
        ref={ref}
        className={cn(
          'overflow-hidden transition-all duration-200',
          isOpen ? 'animate-in slide-in-from-top-2' : 'animate-out slide-out-to-top-2 hidden'
        )}
        {...props}
      >
        <div className={cn('px-4 py-3 text-gray-700', className)}>
          {children}
        </div>
      </div>
    );
  }
);

Accordion.displayName = 'Accordion';
AccordionItem.displayName = 'AccordionItem';
AccordionTrigger.displayName = 'AccordionTrigger';
AccordionContent.displayName = 'AccordionContent'; 