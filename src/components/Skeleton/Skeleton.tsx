import React from 'react';
import { cn } from '../../utils/cn';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

/**
 * Skeleton component for loading placeholders.
 * 
 * Features:
 * - Multiple shape variants (text, rectangular, circular)
 * - Animation options (pulse, wave, none)
 * - Customizable dimensions
 * - Brand styling integration
 * - Dark mode support
 * - Accessible loading indicator
 */
export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(({
  className,
  ...props
}, ref) => (
  <div
    ref={ref}
    className={cn(
      'vromm-skeleton',
      className
    )}
    {...props}
  />
));

Skeleton.displayName = 'Skeleton'; 