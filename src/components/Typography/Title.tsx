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

export interface TitleProps extends TypographyProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

const Title = forwardRef<HTMLHeadingElement, TitleProps>(
  (
    {
      as,
      level = 1,
      size = '2xl',
      weight = 'semibold',
      variant = 'primary',
      align = 'left',
      transform = 'none',
      italic = false,
      underline = false,
      truncate = false,
      balance = false,
      className,
      children,
      'data-testid': testId,
      ...props
    },
    ref
  ) => {
    // Determine the HTML element to use
    const Component = (as || (`h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6')) as 'h1';

    // Default sizes for different heading levels
    const defaultSizes = {
      1: '4xl',
      2: '3xl',
      3: '2xl',
      4: 'xl',
      5: 'lg',
      6: 'base',
    } as const;

    // Use provided size or default based on level
    const finalSize = size || defaultSizes[level];

    const classes = cn(
      // Base styles
      'font-sans',
      'vromm-transition',
      
      // Size styles
      sizeStyles[finalSize],
      
      // Weight styles
      weightStyles[weight],
      
      // Variant styles
      variantStyles[variant],
      
      // Alignment styles
      alignStyles[align],
      
      // Transform styles
      transformStyles[transform],
      
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

Title.displayName = 'Title';

export { Title };
export default Title; 