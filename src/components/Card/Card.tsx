import React from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline' | 'elevated' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  className?: string;
  children: React.ReactNode;
}

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string;
  children: React.ReactNode;
}

/**
 * Card component for displaying content in a contained surface.
 * 
 * Features:
 * - Multiple variants (default, outline, elevated, glass)
 * - Size variants
 * - Composable with Header, Content, Footer
 * - Brand styling integration
 * - Dark mode support
 * - Accessible design
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(({
  variant = 'default',
  size = 'md',
  className,
  children,
  ...props
}, ref) => {
  const variants = {
    default: 'vromm-card--default',
    outline: 'vromm-card--outline',
    elevated: 'vromm-card--elevated',
    glass: 'vromm-card--glass'
  };

  const sizes = {
    sm: 'vromm-card--sm',
    md: 'vromm-card--md',
    lg: 'vromm-card--lg'
  };

  return (
    <div
      ref={ref}
      className={cn(
        'vromm-card',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(({
  className,
  children,
  ...props
}, ref) => (
  <div
    ref={ref}
    className={cn('vromm-card-header', className)}
    {...props}
  >
    {children}
  </div>
));

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(({
  className,
  children,
  ...props
}, ref) => (
  <div
    ref={ref}
    className={cn('vromm-card-content', className)}
    {...props}
  >
    {children}
  </div>
));

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(({
  className,
  children,
  ...props
}, ref) => (
  <div
    ref={ref}
    className={cn('vromm-card-footer', className)}
    {...props}
  >
    {children}
  </div>
));

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(({
  className,
  children,
  ...props
}, ref) => (
  <h3
    ref={ref}
    className={cn('vromm-card-title', className)}
    {...props}
  >
    {children}
  </h3>
));

export const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(({
  className,
  children,
  ...props
}, ref) => (
  <p
    ref={ref}
    className={cn('vromm-card-description', className)}
    {...props}
  >
    {children}
  </p>
));

Card.displayName = 'Card';
CardHeader.displayName = 'CardHeader';
CardContent.displayName = 'CardContent';
CardFooter.displayName = 'CardFooter';
CardTitle.displayName = 'CardTitle';
CardDescription.displayName = 'CardDescription'; 