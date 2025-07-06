import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { cn } from '../../utils/cn';
import { QuickIcon, icons } from '../Icon';
import './Dropdown.scss';

export interface DropdownProps {
  /**
   * Dropdown trigger element
   */
  trigger: React.ReactNode;
  /**
   * Whether the dropdown is open
   */
  open?: boolean;
  /**
   * Function called when open state changes
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Dropdown position relative to trigger
   */
  side?: 'top' | 'right' | 'bottom' | 'left';
  /**
   * Dropdown alignment relative to trigger
   */
  align?: 'start' | 'center' | 'end';
  /**
   * Dropdown content
   */
  children: React.ReactNode;
  /**
   * Additional CSS classes for content
   */
  className?: string;
  /**
   * Whether clicking outside closes dropdown
   */
  closeOnClickOutside?: boolean;
  /**
   * Whether pressing escape closes dropdown
   */
  closeOnEscape?: boolean;
  /**
   * Whether to show search functionality
   */
  searchable?: boolean;
  /**
   * Search placeholder text
   */
  searchPlaceholder?: string;
  /**
   * Function called when search value changes
   */
  onSearch?: (value: string) => void;
}

export interface DropdownItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Whether the item is disabled
   */
  disabled?: boolean;
  /**
   * Whether the item is selected/active
   */
  selected?: boolean;
  /**
   * Icon to display before content
   */
  icon?: keyof typeof icons;
  /**
   * Custom icon component
   */
  customIcon?: React.ReactNode;
  /**
   * Icon color variant
   */
  iconVariant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  /**
   * Item content
   */
  children: React.ReactNode;
  /**
   * Function called when item is clicked
   */
  onSelect?: () => void;
}

export interface DropdownSeparatorProps {
  className?: string;
}

export interface DropdownLabelProps {
  /**
   * Label content
   */
  children: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Dropdown component for displaying contextual menus and options.
 * 
 * Features:
 * - Customizable trigger element
 * - Multiple positioning options
 * - Keyboard navigation support
 * - Click outside and escape key handling
 * - Accessible with proper ARIA attributes
 * - Support for icons, separators, and labels
 * - Optional search functionality
 */
export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(({
  trigger,
  open: controlledOpen,
  onOpenChange,
  side = 'bottom',
  align = 'start',
  children,
  className,
  closeOnClickOutside = true,
  closeOnEscape = true,
  searchable = false,
  searchPlaceholder = 'Search...',
  onSearch,
  ...props
}, ref) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleOpenChange = (newOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
    
    // Reset search when closing
    if (!newOpen) {
      setSearchValue('');
      onSearch?.('');
    }
  };

  const handleTriggerClick = () => {
    handleOpenChange(!isOpen);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    onSearch?.(value);
  };

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, searchable]);

  // Handle click outside
  useEffect(() => {
    if (!isOpen || !closeOnClickOutside) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        triggerRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        handleOpenChange(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, closeOnClickOutside]);

  // Handle escape key
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        // If search is active and has value, clear it first
        if (searchable && searchValue && searchInputRef.current === document.activeElement) {
          setSearchValue('');
          onSearch?.('');
        } else {
          handleOpenChange(false);
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscape, searchable, searchValue, onSearch]);

  const sideClasses = {
    top: 'vromm-dropdown--top',
    right: 'vromm-dropdown--right',
    bottom: 'vromm-dropdown--bottom',
    left: 'vromm-dropdown--left',
  };

  const alignClasses = {
    start: 'vromm-dropdown--align-start',
    center: 'vromm-dropdown--align-center',
    end: 'vromm-dropdown--align-end',
  };

  return (
    <div className="vromm-dropdown-wrapper">
      {/* Trigger */}
      <div
        ref={triggerRef}
        onClick={handleTriggerClick}
        className="vromm-dropdown-trigger"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        data-state={isOpen ? 'open' : 'closed'}
      >
        {trigger}
      </div>

      {/* Content */}
      {isOpen && (
        <div
          ref={ref || dropdownRef}
          className={cn(
            'vromm-dropdown-content',
            sideClasses[side],
            alignClasses[align],
            searchable && 'vromm-dropdown-content--searchable',
            className
          )}
          role="menu"
          aria-orientation="vertical"
          data-state="open"
          data-side={side}
          data-align={align}
          tabIndex={-1}
          {...props}
        >
          {/* Search input */}
          {searchable && (
            <div className="vromm-dropdown-search">
              <QuickIcon name="search" size="sm" className="vromm-dropdown-search-icon" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchValue}
                onChange={handleSearchChange}
                placeholder={searchPlaceholder}
                className="vromm-dropdown-search-input"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
          
          {/* Content */}
          <div className="vromm-dropdown-items">
            {children}
          </div>
        </div>
      )}
    </div>
  );
});

Dropdown.displayName = 'Dropdown';

/**
 * DropdownItem component for individual menu items.
 */
export const DropdownItem = forwardRef<HTMLDivElement, DropdownItemProps>(({
  disabled = false,
  selected = false,
  icon,
  customIcon,
  iconVariant = 'default',
  children,
  onSelect,
  className,
  onClick,
  ...props
}, ref) => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    onSelect?.();
    onClick?.(event);
  };

  return (
    <div
      ref={ref}
      role="menuitem"
      className={cn(
        'vromm-dropdown-item',
        disabled && 'vromm-dropdown-item--disabled',
        selected && 'vromm-dropdown-item--selected',
        className
      )}
      tabIndex={disabled ? undefined : -1}
      data-disabled={disabled}
      onClick={handleClick}
      {...props}
    >
      {(icon || customIcon) && (
        <div className="vromm-dropdown-item-icon">
          {customIcon || (icon && <QuickIcon name={icon} size="sm" variant={iconVariant} />)}
        </div>
      )}
      <span className="vromm-dropdown-item-content">{children}</span>
    </div>
  );
});

DropdownItem.displayName = 'DropdownItem';

/**
 * Simple DropdownItem without icons for cleaner appearance
 */
export const SimpleDropdownItem = forwardRef<HTMLDivElement, Omit<DropdownItemProps, 'icon' | 'customIcon' | 'iconVariant'>>(({
  disabled = false,
  selected = false,
  children,
  onSelect,
  className,
  onClick,
  ...props
}, ref) => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    onSelect?.();
    onClick?.(event);
  };

  return (
    <div
      ref={ref}
      role="menuitem"
      className={cn(
        'vromm-dropdown-item',
        'vromm-dropdown-item--simple',
        disabled && 'vromm-dropdown-item--disabled',
        selected && 'vromm-dropdown-item--selected',
        className
      )}
      tabIndex={disabled ? undefined : -1}
      data-disabled={disabled}
      onClick={handleClick}
      {...props}
    >
      <span className="vromm-dropdown-item-content">{children}</span>
    </div>
  );
});

SimpleDropdownItem.displayName = 'SimpleDropdownItem';

/**
 * DropdownSeparator component for visual separation between items.
 */
export const DropdownSeparator = forwardRef<HTMLDivElement, DropdownSeparatorProps>(({
  className,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      role="separator"
      aria-orientation="horizontal"
      className={cn('vromm-dropdown-separator', className)}
      {...props}
    />
  );
});

DropdownSeparator.displayName = 'DropdownSeparator';

/**
 * DropdownLabel component for section headers.
 */
export const DropdownLabel = forwardRef<HTMLDivElement, DropdownLabelProps>(({
  children,
  className,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn('vromm-dropdown-label', className)}
      {...props}
    >
      {children}
    </div>
  );
});

DropdownLabel.displayName = 'DropdownLabel'; 