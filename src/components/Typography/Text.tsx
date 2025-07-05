import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  /**
   * Size of the text
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
   * Maximum number of lines before truncating
   */
  maxLines?: number;
  /**
   * Font family variant
   */
  family?: 'sans' | 'mono';
  /**
   * Custom HTML tag to render
   */
  as?: 'p' | 'span' | 'div' | 'label' | 'small' | 'strong' | 'em';
}

const sizeClasses = {
  xs: 'text-xs',
  sm: 'text-sm', 
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl',
  '6xl': 'text-6xl',
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
  sans: 'font-sans',
  mono: 'font-mono',
};

/**
 * Text component for displaying text content with consistent typography.
 * 
 * Features:
 * - Multiple size options from xs to 6xl
 * - Font weight control
 * - Color variants for different semantic meanings
 * - Text alignment options
 * - Text truncation with max lines support
 * - Font family variants (sans/mono)
 * - Custom HTML tag rendering
 * - Dark mode support via design tokens
 */
export const Text = forwardRef<HTMLElement, TextProps>(({
  children,
  size = 'base',
  weight = 'normal',
  variant = 'default',
  align = 'left',
  truncate = false,
  maxLines,
  family = 'sans',
  as = 'p',
  className,
  style,
  ...props
}, ref) => {
  const Component = as;
  
  const classes = cn(
    // Base styles
    'leading-relaxed',
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
    maxLines && 'line-clamp-' + maxLines,
    // Dark mode support
    'dark:text-opacity-90',
    className
  );

  const inlineStyles = {
    ...style,
    ...(maxLines && !truncate && {
      display: '-webkit-box',
      WebkitLineClamp: maxLines,
      WebkitBoxOrient: 'vertical' as const,
      overflow: 'hidden',
    }),
  };

  return (
    <Component
      ref={ref as any}
      className={classes}
      style={inlineStyles}
      {...props}
    >
      {children}
    </Component>
  );
});

Text.displayName = 'Text'; 