import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart, X, Star, MapPin } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface CardImage {
  src: string;
  alt: string;
}

export interface CardProps {
  variant?: 'default' | 'outline' | 'elevated' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children?: React.ReactNode;
  
  // Map preview card specific props
  images?: CardImage[];
  title?: string;
  description?: string;
  rating?: number;
  reviewCount?: number;
  price?: string;
  location?: string;
  isSaved?: boolean;
  isClosable?: boolean;
  
  // Event handlers
  onSave?: () => void;
  onClose?: () => void;
  onClick?: () => void;
  onImageChange?: (currentIndex: number) => void;
}

export interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
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
export const Card: React.FC<CardProps> = ({
  variant = 'default',
  size = 'md',
  className,
  children,
  images,
  title,
  description,
  rating,
  reviewCount,
  price,
  location,
  isSaved = false,
  isClosable = false,
  onSave,
  onClose,
  onClick,
  onImageChange,
  ...props
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageSaved, setIsImageSaved] = useState(isSaved);

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (images && images.length > 1) {
      const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : images.length - 1;
      setCurrentImageIndex(newIndex);
      onImageChange?.(newIndex);
    }
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (images && images.length > 1) {
      const newIndex = currentImageIndex < images.length - 1 ? currentImageIndex + 1 : 0;
      setCurrentImageIndex(newIndex);
      onImageChange?.(newIndex);
    }
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsImageSaved(!isImageSaved);
    onSave?.();
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose?.();
  };

  const handleCardClick = () => {
    onClick?.();
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative h-4 w-4">
            <Star className="absolute h-4 w-4 text-gray-300" />
            <div className="absolute overflow-hidden w-1/2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        );
      } else {
        stars.push(
          <Star key={i} className="h-4 w-4 text-gray-300" />
        );
      }
    }
    return stars;
  };

  // If it's a map preview card (has images or title), render the special layout
  if (images || title) {
    return (
      <div 
        className={cn(
          'vromm-card',
          `vromm-card--${variant}`,
          `vromm-card--${size}`,
          onClick && 'cursor-pointer hover:shadow-lg transition-shadow duration-200',
          className
        )}
        onClick={handleCardClick}
        {...props}
      >
        {/* Image Section */}
        {images && images.length > 0 && (
          <div className="relative overflow-hidden rounded-t-brand">
            <img
              src={images[currentImageIndex].src}
              alt={images[currentImageIndex].alt}
              className="w-full h-48 object-cover"
            />
            
            {/* Image Pagination */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 shadow-md transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-4 w-4 text-gray-700" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 shadow-md transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-4 w-4 text-gray-700" />
                </button>
                
                {/* Image Indicators */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                  {images.map((_, index) => (
                    <div
                      key={index}
                      className={cn(
                        'w-2 h-2 rounded-full transition-colors',
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      )}
                    />
                  ))}
                </div>
              </>
            )}
            
            {/* Save Button */}
            {onSave && (
              <button
                onClick={handleSave}
                className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full p-1.5 shadow-md transition-colors"
                aria-label={isImageSaved ? "Remove from saved" : "Save"}
              >
                <Heart
                  className={cn(
                    'h-4 w-4 transition-colors',
                    isImageSaved 
                      ? 'fill-red-500 text-red-500' 
                      : 'text-gray-700 hover:text-red-500'
                  )}
                />
              </button>
            )}
            
            {/* Close Button */}
            {isClosable && onClose && (
              <button
                onClick={handleClose}
                className="absolute top-2 left-2 bg-white/80 hover:bg-white rounded-full p-1.5 shadow-md transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4 text-gray-700" />
              </button>
            )}
          </div>
        )}
        
        {/* Content Section */}
        <div className="vromm-card-content space-y-2">
          {/* Rating */}
          {rating !== undefined && (
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-0.5">
                {renderStars(rating)}
              </div>
              <span className="text-sm font-medium text-gray-900">
                {rating.toFixed(1)}
              </span>
              {reviewCount && (
                <span className="text-sm text-gray-500">
                  ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
                </span>
              )}
            </div>
          )}
          
          {/* Title */}
          {title && (
            <h3 className="vromm-card-title text-base font-semibold leading-tight">
              {title}
            </h3>
          )}
          
          {/* Location */}
          {location && (
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <MapPin className="h-3 w-3" />
              <span>{location}</span>
            </div>
          )}
          
          {/* Description */}
          {description && (
            <p className="vromm-card-description text-sm text-gray-600 line-clamp-2">
              {description}
            </p>
          )}
          
          {/* Price */}
          {price && (
            <div className="pt-1">
              <span className="text-base font-semibold text-gray-900">
                {price}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Default card layout for custom content
  return (
    <div 
      className={cn(
        'vromm-card',
        `vromm-card--${variant}`,
        `vromm-card--${size}`,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// Sub-components for custom layouts
export const CardHeader: React.FC<CardHeaderProps> = ({ children, className, ...props }) => (
  <div className={cn('vromm-card-header', className)} {...props}>
    {children}
  </div>
);

export const CardContent: React.FC<CardContentProps> = ({ children, className, ...props }) => (
  <div className={cn('vromm-card-content', className)} {...props}>
    {children}
  </div>
);

export const CardFooter: React.FC<CardFooterProps> = ({ children, className, ...props }) => (
  <div className={cn('vromm-card-footer', className)} {...props}>
    {children}
  </div>
);

export const CardTitle: React.FC<CardTitleProps> = ({ children, className, ...props }) => (
  <h3 className={cn('vromm-card-title', className)} {...props}>
    {children}
  </h3>
);

export const CardDescription: React.FC<CardDescriptionProps> = ({ children, className, ...props }) => (
  <p className={cn('vromm-card-description', className)} {...props}>
    {children}
  </p>
);

Card.displayName = 'Card';
CardHeader.displayName = 'CardHeader';
CardContent.displayName = 'CardContent';
CardFooter.displayName = 'CardFooter';
CardTitle.displayName = 'CardTitle';
CardDescription.displayName = 'CardDescription'; 