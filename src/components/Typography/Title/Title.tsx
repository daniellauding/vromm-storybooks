import React, { forwardRef } from 'react';
import { cn } from '../../../utils/cn';
import '../Typography.scss';

export interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  /**
   * Heading level (semantic HTML)
   */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * Visual size (independent of semantic level)
   */
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
  /**
   * Font weight
   */
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  /**
   * Text color variant
   */
  variant?: 'default' | 'weak' | 'disabled' | 'inverted' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  /**
   * Text alignment
   */
  align?: 'left' | 'center' | 'right' | 'justify';
  /**
   * Whether text should be truncated with ellipsis
   */
  truncate?: boolean;
  /**
   * Font family variant
   */
  family?: 'title' | 'sans' | 'mono';
}

const sizeClasses = {
  xs: 'text-base',
  sm: 'text-lg',
  base: 'text-xl',
  lg: 'text-2xl',
  xl: 'text-3xl',
  '2xl': 'text-4xl',
  '3xl': 'text-5xl',
  '4xl': 'text-6xl',
  '5xl': 'text-7xl',
  '6xl': 'text-8xl',
};

const weightClasses = {
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

const variantClasses = {
  default: 'text-gray-900 dark:text-gray-100',
  weak: 'text-gray-600 dark:text-gray-400',
  disabled: 'text-gray-400 cursor-not-allowed dark:text-gray-500',
  inverted: 'text-white dark:text-gray-900',
  primary: 'text-blue-600 dark:text-blue-400',
  secondary: 'text-gray-600 dark:text-gray-400',
  success: 'text-green-600 dark:text-green-400',
  warning: 'text-yellow-600 dark:text-yellow-400',
  error: 'text-red-600 dark:text-red-400',
};

const alignClasses = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
};

const familyClasses = {
  title: 'vromm-title',
  sans: 'font-sans',
  mono: 'font-mono',
};

/**
 * Title component for headings and titles with semantic HTML support.
 * 
 * Features:
 * - Semantic heading levels (h1-h6) for accessibility
 * - Visual size independent of semantic level
 * - Font weight control
 * - Color variants for different semantic meanings
 * - Text alignment options
 * - Text truncation support
 * - Font family variants (sans/mono)
 * - Dark mode support via design tokens
 */
export const Title = forwardRef<HTMLHeadingElement, TitleProps>(({
  children,
  level = 1,
  size = '2xl',
  weight = 'semibold',
  variant = 'default',
  align = 'left',
  truncate = false,
  family = 'title',
  className,
  ...props
}, ref) => {
  // Map level to HTML tag
  const tagMap = {
    1: 'h1',
    2: 'h2',
    3: 'h3',
    4: 'h4',
    5: 'h5',
    6: 'h6',
  } as const;

  const Component = tagMap[level];
  
  const classes = cn(
    // Base styles
    'tracking-tight leading-tight',
    // Size
    sizeClasses[size],
    // Weight
    weightClasses[weight],
    // Variant
    variantClasses[variant],
    // Alignment
    alignClasses[align],
    // Font family
    familyClasses[family],
    // Truncation
    truncate && 'truncate',
    // Dark mode support
    'dark:text-opacity-90',
    className
  );

  return (
    <Component
      ref={ref}
      className={classes}
      {...props}
    >
      {children}
    </Component>
  );
});

Title.displayName = 'Title'; 