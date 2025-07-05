import React, { forwardRef } from 'react';
import { TypographyProps } from '../../types';
import { cn } from '../../utils';

const sizeStyles = {
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
  '7xl': 'text-7xl',
  '8xl': 'text-8xl',
  '9xl': 'text-9xl',
};

const weightStyles = {
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

const variantStyles = {
  primary: 'text-slate-900 dark:text-slate-50',
  secondary: 'text-slate-600 dark:text-slate-400',
  tertiary: 'text-slate-500 dark:text-slate-500',
  success: 'text-green-600 dark:text-green-400',
  warning: 'text-amber-600 dark:text-amber-400',
  error: 'text-red-600 dark:text-red-400',
};

const alignStyles = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
};

const transformStyles = {
  none: 'normal-case',
  uppercase: 'uppercase',
  lowercase: 'lowercase',
  capitalize: 'capitalize',
};

export interface TextProps extends TypographyProps {
  leading?: 'tight' | 'normal' | 'relaxed' | 'loose';
  tracking?: 'tight' | 'normal' | 'wide';
}

const Text = forwardRef<HTMLParagraphElement, TextProps>(
  (
    {
      as = 'p',
      size = 'base',
      weight = 'normal',
      variant = 'primary',
      align = 'left',
      transform = 'none',
      italic = false,
      underline = false,
      truncate = false,
      balance = false,
      leading = 'normal',
      tracking = 'normal',
      className,
      children,
      'data-testid': testId,
      ...props
    },
    ref
  ) => {
    const Component = as as 'p';

    const leadingStyles = {
      tight: 'leading-tight',
      normal: 'leading-normal',
      relaxed: 'leading-relaxed',
      loose: 'leading-loose',
    };

    const trackingStyles = {
      tight: 'tracking-tight',
      normal: 'tracking-normal',
      wide: 'tracking-wide',
    };

    const classes = cn(
      // Base styles
      'font-sans',
      'vromm-transition',
      
      // Size styles
      sizeStyles[size],
      
      // Weight styles
      weightStyles[weight],
      
      // Variant styles
      variantStyles[variant],
      
      // Alignment styles
      alignStyles[align],
      
      // Transform styles
      transformStyles[transform],
      
      // Leading styles
      leadingStyles[leading],
      
      // Tracking styles
      trackingStyles[tracking],
      
      // Conditional styles
      {
        'italic': italic,
        'underline': underline,
        'truncate': truncate,
        'text-balance': balance,
      },
      
      // Custom className
      className
    );

    return (
      <Component
        ref={ref}
        className={classes}
        data-testid={testId}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Text.displayName = 'Text';

export { Text };
export default Text; 