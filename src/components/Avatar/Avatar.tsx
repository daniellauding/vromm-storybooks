import React, { useState } from 'react';
import { User } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'circular' | 'rounded' | 'square';
  fallback?: string | React.ReactNode;
  showFallbackIcon?: boolean;
  status?: 'online' | 'offline' | 'away' | 'busy';
  statusPosition?: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left';
}

export interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  onLoadingStatusChange?: (status: 'loading' | 'loaded' | 'error') => void;
}

export interface AvatarFallbackProps extends React.HTMLAttributes<HTMLDivElement> {}

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ 
    className, 
    src, 
    alt = '',
    size = 'md', 
    variant = 'circular',
    fallback,
    showFallbackIcon = true,
    status,
    statusPosition = 'bottom-right',
    ...props 
  }, ref) => {
    const [imageStatus, setImageStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

    const sizeClasses = {
      xs: 'h-6 w-6 text-xs',
      sm: 'h-8 w-8 text-sm',
      md: 'h-10 w-10 text-base',
      lg: 'h-12 w-12 text-lg',
      xl: 'h-16 w-16 text-xl',
      '2xl': 'h-20 w-20 text-2xl',
    };

    const variantClasses = {
      circular: 'rounded-full',
      rounded: 'rounded-lg',
      square: 'rounded-none',
    };

    const statusColors = {
      online: 'bg-green-500',
      offline: 'bg-gray-400',
      away: 'bg-yellow-500',
      busy: 'bg-red-500',
    };

    const statusPositionClasses = {
      'top-right': 'top-0 right-0',
      'bottom-right': 'bottom-0 right-0',
      'top-left': 'top-0 left-0',
      'bottom-left': 'bottom-0 left-0',
    };

    const renderFallback = () => {
      if (typeof fallback === 'string') {
        return getInitials(fallback);
      }
      if (fallback) {
        return fallback;
      }
      if (showFallbackIcon) {
        return <User className="h-1/2 w-1/2" />;
      }
      return alt ? getInitials(alt) : null;
    };

    return (
      <div
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center bg-gray-100 text-gray-600 font-medium overflow-hidden',
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {src && imageStatus !== 'error' && (
          <img
            src={src}
            alt={alt}
            className={cn(
              'h-full w-full object-cover',
              variantClasses[variant]
            )}
            onLoad={() => setImageStatus('loaded')}
            onError={() => setImageStatus('error')}
          />
        )}
        
        {(!src || imageStatus === 'error') && (
          <span className="select-none">
            {renderFallback()}
          </span>
        )}

        {status && (
          <span
            className={cn(
              'absolute block h-2.5 w-2.5 rounded-full ring-2 ring-white',
              statusColors[status],
              statusPositionClasses[statusPosition]
            )}
          />
        )}
      </div>
    );
  }
);

export const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, onLoadingStatusChange, ...props }, ref) => {
    return (
      <img
        ref={ref}
        className={cn(
          'aspect-square h-full w-full object-cover',
          className
        )}
        onLoad={() => onLoadingStatusChange?.('loaded')}
        onError={() => onLoadingStatusChange?.('error')}
        {...props}
      />
    );
  }
);

export const AvatarFallback = React.forwardRef<HTMLDivElement, AvatarFallbackProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex h-full w-full items-center justify-center bg-gray-100 text-gray-600 font-medium',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

// Specialized Avatar variants
export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'circular' | 'rounded' | 'square';
  spacing?: 'tight' | 'normal' | 'loose';
}

export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ 
    className, 
    children, 
    max = 4, 
    size = 'md',
    variant = 'circular',
    spacing = 'normal',
    ...props 
  }, ref) => {
    const childrenArray = React.Children.toArray(children);
    const visibleChildren = childrenArray.slice(0, max);
    const remainingCount = Math.max(0, childrenArray.length - max);

    const spacingClasses = {
      tight: '-space-x-1',
      normal: '-space-x-2',
      loose: '-space-x-3',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center',
          spacingClasses[spacing],
          className
        )}
        {...props}
      >
        {visibleChildren.map((child, index) => (
          <div key={index} className="ring-2 ring-white">
            {React.isValidElement(child) 
              ? React.cloneElement(child, { size, variant } as any)
              : child
            }
          </div>
        ))}
        
        {remainingCount > 0 && (
          <Avatar
            size={size}
            variant={variant}
            className="ring-2 ring-white bg-gray-200 text-gray-600"
            fallback={`+${remainingCount}`}
            showFallbackIcon={false}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';
AvatarImage.displayName = 'AvatarImage';
AvatarFallback.displayName = 'AvatarFallback';
AvatarGroup.displayName = 'AvatarGroup'; 