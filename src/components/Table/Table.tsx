import React, { useState } from 'react';
import { cn } from '../../utils/cn';
import { ChevronDown, ChevronRight, MoreHorizontal } from 'lucide-react';
import { Button } from '../Button/Button';
import { Dropdown } from '../Dropdown/Dropdown';
import { Badge } from '../Badge/Badge';

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  variant?: 'default' | 'minimal' | 'bordered' | 'admin';
  size?: 'sm' | 'md' | 'lg';
  selectable?: boolean;
  selectedRows?: string[];
  onSelectionChange?: (selectedRows: string[]) => void;
  expandable?: boolean;
}

export interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  variant?: 'default' | 'hover' | 'selected';
  id?: string;
  selectable?: boolean;
  selected?: boolean;
  onSelect?: (selected: boolean) => void;
  expandable?: boolean;
  expanded?: boolean;
  onExpand?: (expanded: boolean) => void;
  expandedContent?: React.ReactNode;
}

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  variant?: 'default' | 'header' | 'numeric' | 'checkbox' | 'expand' | 'actions';
  align?: 'left' | 'center' | 'right';
  truncate?: boolean;
  width?: string;
}

export interface TableHeaderCellProps extends React.ThHTMLAttributes<HTMLTableHeaderCellElement> {
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  sorted?: 'asc' | 'desc' | false;
  onSort?: () => void;
  width?: string;
  checkbox?: boolean;
  onSelectAll?: (selected: boolean) => void;
  allSelected?: boolean;
  someSelected?: boolean;
}

export interface TableActionItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  variant?: 'default' | 'destructive';
  disabled?: boolean;
}

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, variant = 'default', size = 'md', selectable, selectedRows = [], onSelectionChange, ...props }, ref) => {
    return (
      <div className="relative w-full overflow-auto">
        <table
          ref={ref}
          className={cn(
            'w-full caption-bottom text-sm',
            {
              // Variants
              'border-collapse': variant === 'default',
              'border-separate border-spacing-0': variant === 'minimal',
              'border border-gray-200 rounded-lg': variant === 'bordered',
              'admin-table': variant === 'admin',
              
              // Sizes
              'text-xs': size === 'sm',
              'text-sm': size === 'md', 
              'text-base': size === 'lg',
            },
            'dark:text-vromm-light',
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

export const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <thead
        ref={ref}
        className={cn(
          '[&_tr]:border-b border-gray-200',
          'dark:[&_tr]:border-vromm-surface-tonal-a20',
          className
        )}
        {...props}
      />
    );
  }
);

export const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, ...props }, ref) => {
    return (
      <tbody
        ref={ref}
        className={cn(
          '[&_tr:last-child]:border-0',
          className
        )}
        {...props}
      />
    );
  }
);

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ 
    className, 
    variant = 'default', 
    id,
    selectable,
    selected,
    onSelect,
    expandable,
    expanded,
    onExpand,
    expandedContent,
    children,
    ...props 
  }, ref) => {
    const [isExpanded, setIsExpanded] = useState(expanded || false);

    const handleExpand = () => {
      const newExpanded = !isExpanded;
      setIsExpanded(newExpanded);
      onExpand?.(newExpanded);
    };

    return (
      <>
        <tr
          ref={ref}
          className={cn(
            'border-b transition-colors hover:bg-muted/50',
            'data-[state=selected]:bg-muted',
            'dark:border-vromm-surface-tonal-a20',
            'dark:hover:bg-vromm-surface-tonal-a10',
            'dark:data-[state=selected]:bg-vromm-surface-tonal-a10',
            {
              'group': variant === 'hover',
              'bg-blue-50 dark:bg-blue-900/20': variant === 'selected' || selected,
            },
            className
          )}
          data-state={selected ? 'selected' : undefined}
          {...props}
        >
          {expandable && (
            <TableCell variant="expand" width="50px">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleExpand}
                aria-label={isExpanded ? 'Collapse' : 'Expand'}
              >
                {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </Button>
            </TableCell>
          )}
          
          {selectable && (
            <TableCell variant="checkbox" width="50px">
              <Checkbox
                checked={selected}
                onChange={onSelect}
                aria-label={`Select ${id || 'row'}`}
              />
            </TableCell>
          )}
          
          {children}
        </tr>
        
        {expandable && isExpanded && expandedContent && (
          <tr>
            <td colSpan={100} className="p-0">
              <div className="px-4 py-3 bg-gray-50 dark:bg-vromm-surface-tonal-a05">
                {expandedContent}
              </div>
            </td>
          </tr>
        )}
      </>
    );
  }
);

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, variant = 'default', align = 'left', truncate, width, children, ...props }, ref) => {
    return (
      <td
        ref={ref}
        className={cn(
          'p-4 align-middle',
          '[&:has([role=checkbox])]:pr-0',
          'dark:text-vromm-light',
          {
            // Variants
            'font-medium': variant === 'header',
            'text-right tabular-nums': variant === 'numeric',
            'w-[50px]': variant === 'checkbox' || variant === 'expand',
            
            // Alignment
            'text-left': align === 'left',
            'text-center': align === 'center',
            'text-right': align === 'right',
            
            // Truncation
            'max-w-[300px] truncate': truncate,
          },
          className
        )}
        style={width ? { width } : undefined}
        {...props}
      >
        {children}
      </td>
    );
  }
);

export const TableHeaderCell = React.forwardRef<HTMLTableHeaderCellElement, TableHeaderCellProps>(
  ({ 
    className, 
    align = 'left', 
    sortable = false, 
    sorted = false, 
    onSort, 
    width,
    checkbox,
    onSelectAll,
    allSelected,
    someSelected,
    children, 
    ...props 
  }, ref) => {
    return (
      <th
        ref={ref}
        className={cn(
          'h-12 px-4 text-left align-middle font-medium text-muted-foreground',
          '[&:has([role=checkbox])]:pr-0',
          'dark:text-vromm-primary-a30',
          {
            // Alignment
            'text-left': align === 'left',
            'text-center': align === 'center',
            'text-right': align === 'right',
            
            // Sortable
            'cursor-pointer hover:text-gray-900 dark:hover:text-vromm-light select-none': sortable,
            
            // Checkbox column
            'w-[50px]': checkbox,
          },
          className
        )}
        style={width ? { width } : undefined}
        onClick={sortable ? onSort : undefined}
        {...props}
      >
        <div className={cn(
          'flex items-center gap-2',
          {
            'justify-start': align === 'left',
            'justify-center': align === 'center',
            'justify-end': align === 'right',
          }
        )}>
          {checkbox && (
            <Checkbox
              checked={allSelected}
              indeterminate={someSelected && !allSelected}
              onChange={onSelectAll}
              aria-label="Select all"
            />
          )}
          
          {children}
          
          {sortable && (
            <span className="text-gray-400 dark:text-vromm-primary-a20">
              {sorted === 'asc' ? '↑' : sorted === 'desc' ? '↓' : '↕'}
            </span>
          )}
        </div>
      </th>
    );
  }
);

// Helper components
export const TableActions: React.FC<{
  actions: TableActionItem[];
  className?: string;
}> = ({ actions, className }) => {
  return (
    <div className={cn('flex justify-end space-x-2 items-center', className)}>
      <Dropdown
        trigger={
          <Button variant="ghost" size="sm">
            <MoreHorizontal size={16} />
          </Button>
        }
        items={actions.map(action => ({
          id: action.id,
          label: action.label,
          icon: action.icon,
          onClick: action.onClick,
          disabled: action.disabled,
          variant: action.variant,
        }))}
      />
    </div>
  );
};

export const TableStatusBadge: React.FC<{
  status: string;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  className?: string;
}> = ({ status, variant = 'default', className }) => {
  return (
    <Badge 
      variant={variant} 
      size="sm"
      className={cn('capitalize', className)}
    >
      {status}
    </Badge>
  );
};

export const TableImageCell: React.FC<{
  src?: string;
  alt: string;
  fallback?: React.ReactNode;
  className?: string;
}> = ({ src, alt, fallback, className }) => {
  if (!src && !fallback) {
    return (
      <div className={cn(
        'w-12 h-12 rounded-md bg-muted flex items-center justify-center',
        className
      )}>
        <span className="text-xs text-muted-foreground">No Image</span>
      </div>
    );
  }

  if (!src && fallback) {
    return (
      <div className={cn(
        'w-12 h-12 rounded-md bg-muted flex items-center justify-center',
        className
      )}>
        {fallback}
      </div>
    );
  }

  return (
    <div className={cn('w-12 h-12 rounded-md overflow-hidden', className)}>
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover"
      />
    </div>
  );
};

// Simple checkbox component for table use
const Checkbox: React.FC<{
  checked?: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  'aria-label'?: string;
}> = ({ checked, indeterminate, onChange, ...props }) => {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={indeterminate ? 'mixed' : checked}
      data-state={indeterminate ? 'indeterminate' : checked ? 'checked' : 'unchecked'}
      className={cn(
        'peer h-4 w-4 shrink-0 rounded-sm border border-primary',
        'ring-offset-background focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
        checked && 'bg-primary text-primary-foreground'
      )}
      onClick={() => onChange?.(!checked)}
      {...props}
    >
      {checked && (
        <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3">
          <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
        </svg>
      )}
      {indeterminate && (
        <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3">
          <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
        </svg>
      )}
    </button>
  );
};

Table.displayName = 'Table';
TableHeader.displayName = 'TableHeader';
TableBody.displayName = 'TableBody';
TableRow.displayName = 'TableRow';
TableCell.displayName = 'TableCell';
TableHeaderCell.displayName = 'TableHeaderCell'; 