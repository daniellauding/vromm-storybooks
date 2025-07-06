import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../utils/cn';
import { Search as SearchIcon, Locate, Filter, X } from 'lucide-react';
import './Forms.scss';

export interface SearchOption {
  id: string;
  label: string;
  value: string;
  category?: string;
  icon?: React.ReactNode;
}

export interface SearchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size'> {
  /**
   * Search options/suggestions
   */
  options?: SearchOption[];
  /**
   * Callback when search value changes
   */
  onSearch?: (value: string) => void;
  /**
   * Callback when an option is selected
   */
  onSelect?: (option: SearchOption) => void;
  /**
   * Callback when geolocation button is clicked
   */
  onLocationRequest?: () => void;
  /**
   * Whether to show the geolocation button
   */
  showLocationButton?: boolean;
  /**
   * Whether to show the filter button
   */
  showFilterButton?: boolean;
  /**
   * Callback when filter button is clicked
   */
  onFilterClick?: () => void;
  /**
   * Number of active filters (shows badge)
   */
  activeFiltersCount?: number;
  /**
   * Whether the search is in loading state
   */
  loading?: boolean;
  /**
   * Maximum height for results dropdown
   */
  maxResultsHeight?: string;
  /**
   * Whether to close results when clicking outside
   */
  closeOnOutsideClick?: boolean;
  /**
   * Custom empty state message
   */
  emptyMessage?: string;
  /**
   * Size of the search input
   */
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'h-9',
  md: 'h-11',
  lg: 'h-12',
};

/**
 * Search component with suggestions, filtering, and location support.
 * 
 * Features:
 * - Search input with live suggestions
 * - Categorized search results
 * - Geolocation button support
 * - Filter button with active count badge
 * - Keyboard navigation
 * - Loading states
 * - Customizable styling
 * - Dark mode support
 */
export const VrommSearch = React.forwardRef<HTMLInputElement, SearchProps>(({
  options = [],
  onSearch,
  onSelect,
  onLocationRequest,
  showLocationButton = false,
  showFilterButton = false,
  onFilterClick,
  activeFiltersCount = 0,
  loading = false,
  maxResultsHeight = '300px',
  closeOnOutsideClick = true,
  emptyMessage = 'No results found.',
  size = 'md',
  placeholder = 'Search...',
  className,
  value,
  ...props
}, ref) => {
  const [searchValue, setSearchValue] = useState(String(value || ''));
  const [showResults, setShowResults] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [isLocating, setIsLocating] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Combine external ref with internal ref
  React.useImperativeHandle(ref, () => inputRef.current!);

  // Filter options based on search value
  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchValue.toLowerCase()) ||
    option.value.toLowerCase().includes(searchValue.toLowerCase())
  );

  // Group options by category
  const groupedOptions = filteredOptions.reduce((groups, option) => {
    const category = option.category || 'General';
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(option);
    return groups;
  }, {} as Record<string, SearchOption[]>);

  // Handle search input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    setShowResults(true);
    setFocusedIndex(-1);
    onSearch?.(newValue);
  };

  // Handle option selection
  const handleOptionSelect = (option: SearchOption) => {
    setSearchValue(option.label);
    setShowResults(false);
    setFocusedIndex(-1);
    onSelect?.(option);
    inputRef.current?.focus();
  };

  // Handle geolocation
  const handleLocationClick = async () => {
    setIsLocating(true);
    try {
      await onLocationRequest?.();
    } finally {
      setIsLocating(false);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showResults) return;

    const totalOptions = filteredOptions.length;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev => 
          prev < totalOptions - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => 
          prev > 0 ? prev - 1 : totalOptions - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (focusedIndex >= 0 && filteredOptions[focusedIndex]) {
          handleOptionSelect(filteredOptions[focusedIndex]);
        }
        break;
      case 'Escape':
        setShowResults(false);
        setFocusedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  // Handle outside clicks
  useEffect(() => {
    if (!closeOnOutsideClick) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowResults(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeOnOutsideClick]);

  // Sync external value
  useEffect(() => {
    if (value !== undefined) {
      setSearchValue(String(value));
    }
  }, [value]);

  const hasResults = filteredOptions.length > 0;
  const showDropdown = showResults && searchValue.length > 0;

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Search Input Container */}
      <div className={cn(
        'flex items-center border rounded-brand bg-background transition-colors',
        'border-border focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500',
        'dark:bg-neutral-900 dark:border-neutral-700',
        sizeClasses[size],
        className
      )}>
        {/* Search Icon */}
        <SearchIcon className="ml-3 h-4 w-4 text-muted-foreground flex-shrink-0" />
        
        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          className={cn(
            'flex-1 bg-transparent px-3 py-2 text-sm outline-none',
            'placeholder:text-muted-foreground',
            'disabled:cursor-not-allowed disabled:opacity-50'
          )}
          placeholder={placeholder}
          value={searchValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => searchValue.length > 0 && setShowResults(true)}
          {...props}
        />

        {/* Clear Button */}
        {searchValue && (
          <button
            type="button"
            onClick={() => {
              setSearchValue('');
              setShowResults(false);
              onSearch?.('');
              inputRef.current?.focus();
            }}
            className="mr-2 p-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
        )}

        {/* Location Button */}
        {showLocationButton && (
          <button
            type="button"
            onClick={handleLocationClick}
            disabled={isLocating}
            className={cn(
              'mr-2 p-1.5 rounded-md transition-colors',
              'hover:bg-accent hover:text-accent-foreground',
              'focus:outline-none focus:ring-2 focus:ring-primary-500',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
            title="Get current location"
          >
            <Locate className={cn(
              'h-4 w-4',
              isLocating && 'animate-pulse'
            )} />
          </button>
        )}

        {/* Filter Button */}
        {showFilterButton && (
          <button
            type="button"
            onClick={onFilterClick}
            className={cn(
              'relative mr-2 p-1.5 rounded-md transition-colors',
              'hover:bg-accent hover:text-accent-foreground',
              'focus:outline-none focus:ring-2 focus:ring-primary-500'
            )}
            title="Open filters"
          >
            <Filter className="h-4 w-4" />
            {activeFiltersCount > 0 && (
              <span className={cn(
                'absolute -top-1 -right-1 h-4 w-4 text-xs',
                'bg-primary-500 text-white rounded-full',
                'flex items-center justify-center font-medium'
              )}>
                {activeFiltersCount > 9 ? '9+' : activeFiltersCount}
              </span>
            )}
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {showDropdown && (
        <div
          ref={resultsRef}
          className={cn(
            'absolute top-full left-0 right-0 z-50 mt-1',
            'bg-background border border-border rounded-brand shadow-lg',
            'dark:bg-neutral-900 dark:border-neutral-700'
          )}
          style={{ maxHeight: maxResultsHeight }}
        >
          <div className="overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-6">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-500" />
                <span className="ml-2 text-sm text-muted-foreground">Searching...</span>
              </div>
            ) : hasResults ? (
              Object.entries(groupedOptions).map(([category, categoryOptions]) => (
                <div key={category}>
                  {Object.keys(groupedOptions).length > 1 && (
                    <div className="px-3 py-2 text-xs font-medium text-muted-foreground border-b border-border">
                      {category}
                    </div>
                  )}
                  {categoryOptions.map((option, index) => {
                    const globalIndex = filteredOptions.indexOf(option);
                    return (
                      <button
                        key={option.id}
                        type="button"
                        className={cn(
                          'w-full flex items-center gap-2 px-3 py-3 text-left text-sm',
                          'hover:bg-accent hover:text-accent-foreground',
                          'focus:bg-accent focus:text-accent-foreground focus:outline-none',
                          globalIndex === focusedIndex && 'bg-accent text-accent-foreground'
                        )}
                        onClick={() => handleOptionSelect(option)}
                      >
                        {option.icon && (
                          <span className="flex-shrink-0 text-primary-500">
                            {option.icon}
                          </span>
                        )}
                        <span className="flex-1 truncate">{option.label}</span>
                      </button>
                    );
                  })}
                </div>
              ))
            ) : (
              <div className="py-6 text-center text-sm text-muted-foreground">
                {emptyMessage}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

VrommSearch.displayName = 'Search';

// Export as Search for convenience
export const Search = VrommSearch; 