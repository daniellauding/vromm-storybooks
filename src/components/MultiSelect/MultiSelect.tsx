import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../utils/cn';

export interface MultiSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface MultiSelectProps {
  options: MultiSelectOption[];
  value?: string[];
  onChange?: (selected: string[]) => void;
  placeholder?: string;
  label?: string;
  helperText?: string;
  error?: boolean | string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled' | 'outline';
  maxDisplayCount?: number;
  searchable?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
}

/**
 * MultiSelect component for selecting multiple options from a dropdown.
 * 
 * Features:
 * - Multiple option selection
 * - Search/filter functionality
 * - Customizable display of selected items
 * - Keyboard navigation
 * - Form integration
 * - Error states
 * - Brand styling
 * - Dark mode support
 * - Accessibility support
 */
export const MultiSelect = React.forwardRef<HTMLDivElement, MultiSelectProps>(({
  options = [],
  value = [],
  onChange,
  placeholder = 'Select options...',
  label,
  helperText,
  error = false,
  size = 'md',
  variant = 'default',
  maxDisplayCount = 3,
  searchable = false,
  disabled = false,
  className,
  id,
  ...props
}, ref) => {
  const multiSelectId = id || `multiselect-${Math.random().toString(36).substring(2)}`;
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(-1);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // Combine external ref with internal ref
  React.useImperativeHandle(ref, () => containerRef.current!);
  
  // Filter options based on search query
  const filteredOptions = searchable 
    ? options.filter(option => 
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;
  
  // Get selected options
  const selectedOptions = options.filter(option => value.includes(option.value));
  
  // Handle option selection
  const handleOptionToggle = (optionValue: string) => {
    const newSelected = value.includes(optionValue)
      ? value.filter(v => v !== optionValue)
      : [...value, optionValue];
    onChange?.(newSelected);
  };
  
  // Handle clear all
  const handleClearAll = () => {
    onChange?.([]);
  };
  
  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    
    switch (e.key) {
      case 'Enter':
      case ' ':
        if (!isOpen) {
          setIsOpen(true);
          if (searchable && searchInputRef.current) {
            searchInputRef.current.focus();
          }
        } else if (focusedIndex >= 0 && filteredOptions[focusedIndex]) {
          handleOptionToggle(filteredOptions[focusedIndex].value);
        }
        e.preventDefault();
        break;
      case 'Escape':
        setIsOpen(false);
        setFocusedIndex(-1);
        break;
      case 'ArrowDown':
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setFocusedIndex(prev => 
            prev < filteredOptions.length - 1 ? prev + 1 : 0
          );
        }
        e.preventDefault();
        break;
      case 'ArrowUp':
        if (isOpen) {
          setFocusedIndex(prev => 
            prev > 0 ? prev - 1 : filteredOptions.length - 1
          );
          e.preventDefault();
        }
        break;
    }
  };
  
  // Handle outside clicks
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Display text for selected items
  const getDisplayText = () => {
    if (selectedOptions.length === 0) return placeholder;
    
    if (selectedOptions.length <= maxDisplayCount) {
      return selectedOptions.map(opt => opt.label).join(', ');
    }
    
    return `${selectedOptions.slice(0, maxDisplayCount).map(opt => opt.label).join(', ')} +${selectedOptions.length - maxDisplayCount} more`;
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
    <div className="vromm-form-field" ref={containerRef} {...props}>
      {label && (
        <label 
          htmlFor={multiSelectId}
          className="vromm-form-label"
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        {/* Trigger */}
        <div
          id={multiSelectId}
          tabIndex={disabled ? -1 : 0}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-label={label || placeholder}
          onKeyDown={handleKeyDown}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={cn(
            'vromm-input vromm-select cursor-pointer',
            variants[variant],
            sizes[size],
            errorStyles,
            disabled && 'opacity-50 cursor-not-allowed',
            'flex items-center justify-between',
            className
          )}
        >
          <span className={cn(
            'truncate',
            selectedOptions.length === 0 && 'text-gray-500 dark:text-gray-400'
          )}>
            {getDisplayText()}
          </span>
          
          <div className="flex items-center gap-2 ml-2">
            {selectedOptions.length > 0 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClearAll();
                }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            <svg 
              className={cn(
                'w-4 h-4 text-gray-400 transition-transform',
                isOpen && 'rotate-180'
              )} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        
        {/* Dropdown */}
        {isOpen && (
          <div className={cn(
            'absolute top-full left-0 right-0 z-50 mt-1',
            'bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600',
            'rounded-lg shadow-lg max-h-60 overflow-y-auto'
          )}>
            {searchable && (
              <div className="p-2 border-b border-gray-200 dark:border-gray-700">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search options..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={cn(
                    'w-full px-3 py-2 text-sm border-0 bg-transparent',
                    'focus:outline-none focus:ring-0'
                  )}
                />
              </div>
            )}
            
            <div role="listbox" aria-multiselectable="true">
              {filteredOptions.length === 0 ? (
                <div className="px-3 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
                  No options found
                </div>
              ) : (
                filteredOptions.map((option, index) => (
                  <div
                    key={option.value}
                    role="option"
                    aria-selected={value.includes(option.value)}
                    onClick={() => !option.disabled && handleOptionToggle(option.value)}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 cursor-pointer text-sm',
                      'hover:bg-gray-50 dark:hover:bg-gray-800',
                      index === focusedIndex && 'bg-gray-100 dark:bg-gray-700',
                      option.disabled && 'opacity-50 cursor-not-allowed',
                      value.includes(option.value) && 'bg-blue-50 dark:bg-blue-900/30'
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={value.includes(option.value)}
                      disabled={option.disabled}
                      readOnly
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <span className="flex-1">{option.label}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
      
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

MultiSelect.displayName = 'MultiSelect'; 