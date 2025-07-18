import React, { forwardRef } from 'react';
import { cn } from '../../../utils/cn';
import '../Typography.scss';

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
  default: 'vromm-text--body',
  weak: 'vromm-text--weak',
  disabled: 'vromm-text--disabled',
  inverted: 'vromm-text--inverted',
  primary: 'vromm-text--primary',
  secondary: 'vromm-text--secondary',
  success: 'vromm-text--success',
  warning: 'vromm-text--warning',
  error: 'vromm-text--error',
};

const alignClasses = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
};

const familyClasses = {
  sans: 'vromm-text',
  mono: 'font-mono',
};

/**
 * Text component for displaying text content with consistent typography.
 * 
 * Features:
 * - Multiple size options from xs to 6xl
 * - Font weight control
 * - Color variants for different semantic meanings using brand colors
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
    // Variant (now using brand colors)
    variantClasses[variant],
    // Alignment
    alignClasses[align],
    // Font family
    familyClasses[family],
    // Truncation
    truncate && 'truncate',
    maxLines && 'line-clamp-' + maxLines,
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