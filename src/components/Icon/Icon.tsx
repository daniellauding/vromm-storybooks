import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import './Icon.scss';

export interface IconProps extends React.SVGAttributes<SVGElement> {
  /**
   * Icon size
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  /**
   * Icon color variant
   */
  variant?: 'default' | 'muted' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'white';
  /**
   * SVG content as string
   */
  children?: React.ReactNode;
  /**
   * Icon name for accessibility
   */
  name?: string;
}

const sizeClasses = {
  xs: 'vromm-icon--xs',
  sm: 'vromm-icon--sm',
  md: 'vromm-icon--md',
  lg: 'vromm-icon--lg',
  xl: 'vromm-icon--xl',
  '2xl': 'vromm-icon--2xl',
};

const variantClasses = {
  default: 'vromm-icon--default',
  muted: 'vromm-icon--muted',
  primary: 'vromm-icon--primary',
  secondary: 'vromm-icon--secondary',
  success: 'vromm-icon--success',
  warning: 'vromm-icon--warning',
  error: 'vromm-icon--error',
  white: 'vromm-icon--white',
};

/**
 * Icon component for displaying SVG icons with consistent sizing and colors.
 * 
 * Features:
 * - Multiple size options from xs to 2xl
 * - Color variants for different semantic meanings
 * - Accessibility support with aria-label
 * - Dark mode support
 * - Flexible children for any SVG content
 */
export const Icon = forwardRef<SVGSVGElement, IconProps>(({
  size = 'md',
  variant = 'default',
  children,
  name,
  className,
  ...props
}, ref) => {
  const classes = cn(
    'vromm-icon',
    sizeClasses[size],
    variantClasses[variant],
    className
  );

  return (
    <svg
      ref={ref}
      className={classes}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={name}
      role={name ? 'img' : 'presentation'}
      {...props}
    >
      {children}
    </svg>
  );
});

Icon.displayName = 'Icon';

// Pre-built icons from Untitled UI
export const icons = {
  // Navigation
  'arrow-left': (
    <path d="M19 12H5M12 19L5 12L12 5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
  ),
  'arrow-right': (
    <path d="M5 12H19M12 5L19 12L12 19" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
  ),
  'arrow-up': (
    <path d="M12 19V5M5 12L12 5L19 12" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
  ),
  'arrow-down': (
    <path d="M12 5V19M19 12L12 19L5 12" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
  ),
  'chevron-up': (
    <path d="M18 15L12 9L6 15" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
  ),
  'chevron-down': (
    <path d="M6 9L12 15L18 9" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
  ),
  'chevron-left': (
    <path d="M15 18L9 12L15 6" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
  ),
  'chevron-right': (
    <path d="M9 18L15 12L9 6" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
  ),

  // Actions
  'plus': (
    <path d="M12 5V19M5 12H19" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
  ),
  'close': (
    <path d="M18 6L6 18M6 6L18 18" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
  ),
  'trash': (
    <path d="M3 6H5H21M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
  ),
  'search': (
    <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
  ),
  'menu': (
    <path d="M3 12H21M3 6H21M3 18H21" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
  ),
  'more-dots': (
    <>
      <circle cx="12" cy="12" r="1" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="19" cy="12" r="1" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="5" cy="12" r="1" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
    </>
  ),

  // Interface
  'home': (
    <>
      <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 22V12H15V22" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
    </>
  ),
  'user': (
    <>
      <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="7" r="4" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
    </>
  ),
  'grid': (
    <>
      <rect x="3" y="3" width="7" height="7" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="14" y="3" width="7" height="7" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="14" y="14" width="7" height="7" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="3" y="14" width="7" height="7" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
    </>
  ),
  'calendar': (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="16" y1="2" x2="16" y2="6" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="8" y1="2" x2="8" y2="6" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="3" y1="10" x2="21" y2="10" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
    </>
  ),

  // Communication
  'mail': (
    <>
      <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="22,6 12,13 2,6" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
    </>
  ),
  'phone': (
    <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.18C2.095 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85669 2.63476 2.65162C2.82196 2.44655 3.0498 2.28271 3.30379 2.17052C3.55777 2.05833 3.83233 2.00026 4.10999 2H7.10999C7.59531 1.99522 8.06266 2.16708 8.43237 2.48353C8.80208 2.79999 9.04214 3.23945 9.10999 3.72C9.23662 4.68007 9.47144 5.62273 9.80999 6.53C9.94454 6.88792 9.97366 7.27691 9.8939 7.65088C9.81415 8.02485 9.62886 8.36811 9.35999 8.64L8.08999 9.91C9.51355 12.4135 11.5865 14.4865 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9751 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
  ),
};

// Helper component for quick icon usage
interface QuickIconProps extends Omit<IconProps, 'children'> {
  name: keyof typeof icons;
}

export const QuickIcon = forwardRef<SVGSVGElement, QuickIconProps>(({
  name,
  ...props
}, ref) => {
  return (
    <Icon ref={ref} name={name} {...props}>
      {icons[name]}
    </Icon>
  );
});

QuickIcon.displayName = 'QuickIcon'; 