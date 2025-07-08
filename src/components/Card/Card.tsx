import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Heart, X, Star, MapPin, Map, Play, Pause, Check, MoreVertical, Edit, Trash2, Share, Flag, ExternalLink } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface CardImage {
  src: string;
  alt: string;
  type?: 'photo' | 'map' | 'video';
  poster?: string; // For video thumbnail
  duration?: string; // For video duration display
}

export interface CardComponentItem {
  component: React.ReactNode;
  type: 'component';
  alt?: string; // Optional alt text for accessibility
}

export type CardMediaOrComponent = CardImage | CardComponentItem;

// Type guard functions for Card
const isCardMediaItem = (item: CardMediaOrComponent): item is CardImage => {
  return item.type !== 'component';
};

const isCardComponentItem = (item: CardMediaOrComponent): item is CardComponentItem => {
  return item.type === 'component';
};

// Card Media Actions Dropdown Types
export interface CardMediaAction {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  type: 'edit' | 'delete' | 'share' | 'report' | 'external' | 'maps' | 'custom';
  onClick: (mediaIndex: number, media: CardMediaOrComponent) => void;
  url?: string; // For external links
  coordinates?: { lat: number; lng: number }; // For Google Maps
  disabled?: boolean;
  destructive?: boolean; // For styling delete/report actions
}

export interface CarouselOptions {
  showDots?: boolean;
  showArrows?: boolean;
  loop?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  enableSwipe?: boolean;
  preloadNext?: boolean;
  transition?: 'slide' | 'fade';
  videoControls?: {
    muted?: boolean;
    autoPlay?: boolean;
    showDuration?: boolean;
  };
}

export interface CardProps {
  variant?: 'default' | 'outline' | 'elevated' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children?: React.ReactNode;
  
  // Enhanced media/component support - backwards compatible
  images?: CardMediaOrComponent | CardMediaOrComponent[];
  
  // Height of the media header (default: '12rem' / 192px)
  mediaHeight?: 'sm' | 'md' | 'lg' | 'xl' | string;
  
  // Actions dropdown for media header
  mediaActions?: CardMediaAction[];
  
  // Map preview card specific props
  title?: string;
  description?: string;
  rating?: number;
  reviewCount?: number;
  price?: string;
  location?: string;
  isSaved?: boolean;
  isDriven?: boolean;
  isClosable?: boolean;
  
  // Enhanced carousel options
  carouselOptions?: CarouselOptions;
  
  // Event handlers
  onSave?: () => void;
  onMarkAsDriven?: () => void;
  onClose?: () => void;
  onClick?: () => void;
  onImageChange?: (currentIndex: number, media: CardMediaOrComponent) => void;
  onVideoPlay?: (currentIndex: number, image: CardImage) => void;
  onVideoPause?: (currentIndex: number, image: CardImage) => void;
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
 * Enhanced Card component with full carousel support
 * 
 * Features:
 * - Multi-image carousel with smooth transitions
 * - Touch/swipe support for mobile
 * - Accessibility with ARIA labels and keyboard navigation
 * - Performance optimizations (lazy loading, preloading)
 * - Auto-play functionality
 * - Map preview integration
 * - Backwards compatibility with single images
 */
export const Card: React.FC<CardProps> = ({
  variant = 'default',
  size = 'md',
  className,
  children,
  images,
  mediaHeight = '12rem', // Default media height for Card
  mediaActions,
  title,
  description,
  rating,
  reviewCount,
  price,
  location,
  isSaved = false,
  isDriven = false,
  isClosable = false,
  carouselOptions,
  onSave,
  onMarkAsDriven,
  onClose,
  onClick,
  onImageChange,
  onVideoPlay,
  onVideoPause,
  ...props
}) => {
  // Normalize images to array format for backwards compatibility
  const imageArray = images ? (Array.isArray(images) ? images : [images]) : [];
  const hasImages = imageArray.length > 0;
  const hasMultipleImages = imageArray.length > 1;
  
  // Helper function to get media height styling
  const getMediaHeightStyle = () => {
    const heightMap = {
      'sm': '10rem',    // 160px
      'md': '12rem',    // 192px (current default)
      'lg': '14rem',    // 224px  
      'xl': '16rem',    // 256px
    };

    if (mediaHeight && mediaHeight in heightMap) {
      return { height: heightMap[mediaHeight as keyof typeof heightMap] };
    }
    
    // If it's a custom value (like '300px', '18rem', '60vh')
    if (mediaHeight && typeof mediaHeight === 'string') {
      return { height: mediaHeight };
    }
    
    // Default height
    return { height: '12rem' };
  };

  const mediaHeightStyle = getMediaHeightStyle();
  
  // Merge carousel options with defaults (inline to ensure bundler includes them)
  const options = { 
    showDots: true,
    showArrows: true,
    loop: true,
    autoPlay: false,
    autoPlayInterval: 5000,
    enableSwipe: true,
    preloadNext: true,
    transition: 'slide',
    videoControls: {
      muted: true,
      autoPlay: false,
      showDuration: true,
    },
    ...carouselOptions 
  };
  
  // State management
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageSaved, setIsImageSaved] = useState(isSaved);
  const [isImageDriven, setIsImageDriven] = useState(isDriven);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([0]));
  const [videoStates, setVideoStates] = useState<{ [key: number]: { isPlaying: boolean } }>({});
  
  // Sync state with props
  useEffect(() => {
    setIsImageSaved(isSaved);
  }, [isSaved]);
  
  useEffect(() => {
    setIsImageDriven(isDriven);
  }, [isDriven]);
  
  // Refs for touch handling, auto-play, and video control
  const carouselRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const autoPlayTimer = useRef<NodeJS.Timeout>();
  const isDragging = useRef<boolean>(false);
  
  // Auto-play functionality
  useEffect(() => {
    if (options.autoPlay && hasMultipleImages && !isTransitioning) {
      autoPlayTimer.current = setInterval(() => {
        handleNextImage();
      }, options.autoPlayInterval);
      
      return () => {
        if (autoPlayTimer.current) {
          clearInterval(autoPlayTimer.current);
        }
      };
    }
  }, [options.autoPlay, options.autoPlayInterval, hasMultipleImages, currentImageIndex, isTransitioning]);
  
  // Preload adjacent images for performance
  useEffect(() => {
    if (options.preloadNext && hasMultipleImages) {
      const preloadImage = (index: number) => {
        if (index >= 0 && index < imageArray.length && !loadedImages.has(index)) {
          const img = new Image();
          img.onload = () => {
            setLoadedImages(prev => new Set([...prev, index]));
          };
          img.src = imageArray[index].src;
        }
      };
      
      // Preload next and previous images
      const nextIndex = options.loop 
        ? (currentImageIndex + 1) % imageArray.length 
        : currentImageIndex + 1;
      const prevIndex = options.loop 
        ? (currentImageIndex - 1 + imageArray.length) % imageArray.length 
        : currentImageIndex - 1;
      
      preloadImage(nextIndex);
      preloadImage(prevIndex);
    }
  }, [currentImageIndex, imageArray, options.preloadNext, options.loop, hasMultipleImages, loadedImages]);
  
  // Video control functions
  const handleVideoToggle = useCallback((index: number, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
    }
    
    const video = videoRefs.current[index];
    if (!video || imageArray[index]?.type !== 'video') return;
    
    const isCurrentlyPlaying = videoStates[index]?.isPlaying || false;
    
    if (isCurrentlyPlaying) {
      video.pause();
      setVideoStates(prev => ({ ...prev, [index]: { isPlaying: false } }));
      onVideoPause?.(index, imageArray[index]);
    } else {
      // Pause all other videos first
      Object.keys(videoRefs.current).forEach(key => {
        const otherVideo = videoRefs.current[parseInt(key)];
        if (otherVideo && parseInt(key) !== index) {
          otherVideo.pause();
          setVideoStates(prev => ({ ...prev, [parseInt(key)]: { isPlaying: false } }));
        }
      });
      
      video.play();
      setVideoStates(prev => ({ ...prev, [index]: { isPlaying: true } }));
      onVideoPlay?.(index, imageArray[index]);
    }
  }, [videoStates, imageArray, onVideoPlay, onVideoPause]);
  
  // Navigation functions
  const goToImage = useCallback((index: number, event?: React.MouseEvent | React.KeyboardEvent) => {
    if (event) {
      event.stopPropagation();
    }
    
    if (index < 0 || index >= imageArray.length || index === currentImageIndex) {
      return;
    }
    
    // Pause any playing videos when switching
    Object.keys(videoRefs.current).forEach(key => {
      const video = videoRefs.current[parseInt(key)];
      if (video) {
        video.pause();
        setVideoStates(prev => ({ ...prev, [parseInt(key)]: { isPlaying: false } }));
      }
    });
    
    setIsTransitioning(true);
    setCurrentImageIndex(index);
    onImageChange?.(index, imageArray[index]);
    
    // Reset transition state after animation
    setTimeout(() => setIsTransitioning(false), 300);
    
    // Reset auto-play timer
    if (autoPlayTimer.current) {
      clearInterval(autoPlayTimer.current);
    }
  }, [currentImageIndex, imageArray, onImageChange]);
  
  const handlePrevImage = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    
    if (!hasMultipleImages) return;
    
    let newIndex;
    if (options.loop) {
      newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : imageArray.length - 1;
    } else {
      newIndex = Math.max(0, currentImageIndex - 1);
    }
    
    goToImage(newIndex);
  }, [currentImageIndex, imageArray.length, hasMultipleImages, options.loop, goToImage]);
  
  const handleNextImage = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    
    if (!hasMultipleImages) return;
    
    let newIndex;
    if (options.loop) {
      newIndex = currentImageIndex < imageArray.length - 1 ? currentImageIndex + 1 : 0;
    } else {
      newIndex = Math.min(imageArray.length - 1, currentImageIndex + 1);
    }
    
    goToImage(newIndex);
  }, [currentImageIndex, imageArray.length, hasMultipleImages, options.loop, goToImage]);
  
  // Touch event handlers for swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!options.enableSwipe || !hasMultipleImages) return;
    
    const touch = e.touches[0];
    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
    isDragging.current = false;
    
    // Pause auto-play during touch
    if (autoPlayTimer.current) {
      clearInterval(autoPlayTimer.current);
    }
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!options.enableSwipe || !hasMultipleImages) return;
    
    const touch = e.touches[0];
    const deltaX = Math.abs(touch.clientX - touchStartX.current);
    const deltaY = Math.abs(touch.clientY - touchStartY.current);
    
    // If horizontal movement is greater than vertical, prevent default scroll
    if (deltaX > deltaY && deltaX > 10) {
      e.preventDefault();
      isDragging.current = true;
    }
  };
  
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!options.enableSwipe || !hasMultipleImages || !isDragging.current) return;
    
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartX.current;
    const deltaY = Math.abs(touch.clientY - touchStartY.current);
    
    // Only trigger swipe if horizontal movement is significant and greater than vertical
    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > deltaY) {
      if (deltaX > 0) {
        handlePrevImage();
      } else {
        handleNextImage();
      }
    }
    
    isDragging.current = false;
  };
  
  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!hasMultipleImages) return;
    
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        handlePrevImage();
        break;
      case 'ArrowRight':
        e.preventDefault();
        handleNextImage();
        break;
      case 'Home':
        e.preventDefault();
        goToImage(0, e);
        break;
      case 'End':
        e.preventDefault();
        goToImage(imageArray.length - 1, e);
        break;
      case ' ':
      case 'Spacebar':
        // Play/pause video if current item is a video
        if (imageArray[currentImageIndex]?.type === 'video') {
          e.preventDefault();
          handleVideoToggle(currentImageIndex);
        }
        break;
    }
  };
  
  // Action handlers
  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsImageSaved(!isImageSaved);
    onSave?.();
  };

  const handleMarkAsDriven = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsImageDriven(!isImageDriven);
    onMarkAsDriven?.();
  };
  
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose?.();
  };
  
  const handleCardClick = () => {
    onClick?.();
  };
  
  // Star rating renderer
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
  if (hasImages || title) {
    const currentImage = imageArray[currentImageIndex];
    
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
        {/* Enhanced Image Carousel Section */}
        {hasImages && (
          <div className="relative">
            <div 
              ref={carouselRef}
              className="relative overflow-hidden rounded-t-brand"
              role="region"
              aria-label="Image carousel"
              aria-describedby={hasMultipleImages ? "carousel-instructions" : undefined}
              tabIndex={hasMultipleImages ? 0 : -1}
              onKeyDown={handleKeyDown}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Main Media Container (Image/Video/Component) */}
              <div className="relative">
                {currentImage && isCardComponentItem(currentImage) ? (
                  /* React Component */
                  <div 
                    className="w-full transition-opacity duration-300"
                    style={{
                      ...mediaHeightStyle,
                      ...(options.transition === 'fade' && isTransitioning && { opacity: 0 })
                    }}
                    role="img"
                    aria-label={currentImage.alt || "Custom component"}
                  >
                    {currentImage.component}
                  </div>
                ) : currentImage && isCardMediaItem(currentImage) && currentImage.type === 'video' ? (
                  <>
                    {/* Video Element */}
                    <video
                      ref={(ref) => { videoRefs.current[currentImageIndex] = ref; }}
                      src={currentImage.src}
                      poster={currentImage.poster}
                      className="w-full object-cover transition-opacity duration-300"
                      style={{
                        ...mediaHeightStyle,
                        ...(options.transition === 'fade' && isTransitioning && { opacity: 0 })
                      }}
                      muted={options.videoControls?.muted !== false}
                      playsInline
                      preload="metadata"
                      onPlay={() => {
                        setVideoStates(prev => ({ ...prev, [currentImageIndex]: { isPlaying: true } }));
                        if (isCardMediaItem(currentImage)) {
                          onVideoPlay?.(currentImageIndex, currentImage);
                        }
                      }}
                      onPause={() => {
                        setVideoStates(prev => ({ ...prev, [currentImageIndex]: { isPlaying: false } }));
                        if (isCardMediaItem(currentImage)) {
                          onVideoPause?.(currentImageIndex, currentImage);
                        }
                      }}
                      onEnded={() => {
                        setVideoStates(prev => ({ ...prev, [currentImageIndex]: { isPlaying: false } }));
                        if (isCardMediaItem(currentImage)) {
                          onVideoPause?.(currentImageIndex, currentImage);
                        }
                      }}
                      onError={(e) => {
                        console.error('Video failed to load:', currentImage.src);
                      }}
                    />
                    
                    {/* Video Play/Pause Button */}
                    <button
                      onClick={(e) => handleVideoToggle(currentImageIndex, e)}
                      className={cn(
                        "absolute inset-0 flex items-center justify-center",
                        "bg-black/20 hover:bg-black/30 transition-all duration-200",
                        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white",
                        videoStates[currentImageIndex]?.isPlaying && "opacity-0 hover:opacity-100"
                      )}
                      aria-label={videoStates[currentImageIndex]?.isPlaying ? "Pause video" : "Play video"}
                    >
                      <div className="bg-white/90 hover:bg-white rounded-full p-3 shadow-lg">
                        {videoStates[currentImageIndex]?.isPlaying ? (
                          <Pause className="h-6 w-6 text-gray-700" />
                        ) : (
                          <Play className="h-6 w-6 text-gray-700 ml-0.5" />
                        )}
                      </div>
                    </button>
                    
                    {/* Video Duration Badge */}
                    {currentImage.duration && options.videoControls?.showDuration && (
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {currentImage.duration}
                      </div>
                    )}
                  </>
                ) : currentImage && isCardMediaItem(currentImage) ? (
                  /* Image Element */
                  <img
                    src={currentImage.src}
                    alt={currentImage.alt}
                    className="w-full object-cover transition-opacity duration-300"
                    style={{
                      ...mediaHeightStyle,
                      ...(options.transition === 'fade' && isTransitioning && { opacity: 0 })
                    }}
                    loading={currentImageIndex === 0 ? "eager" : "lazy"}
                    onLoad={() => {
                      setLoadedImages(prev => new Set([...prev, currentImageIndex]));
                    }}
                    onError={(e) => {
                      // Fallback for broken images
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y5ZmFmYiIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzZiNzI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+Cjwvc3ZnPg==';
                    }}
                  />
                ) : null}
                
                {/* Type Icon Overlays - Only for media items */}
                {currentImage && isCardMediaItem(currentImage) && currentImage.type === 'map' && (
                  <div className="absolute top-2 left-2 bg-white/90 rounded-md px-2 py-1 flex items-center gap-1">
                    <Map className="h-3 w-3 text-gray-700" />
                    <span className="text-xs font-medium text-gray-700">Map</span>
                  </div>
                )}
                
                {currentImage && isCardMediaItem(currentImage) && currentImage.type === 'video' && !videoStates[currentImageIndex]?.isPlaying && (
                  <div className="absolute top-2 left-2 bg-black/70 text-white rounded-md px-2 py-1 flex items-center gap-1">
                    <Play className="h-3 w-3" />
                    <span className="text-xs font-medium">Video</span>
                  </div>
                )}
                
                {/* Component Type Icon Overlay */}
                {currentImage && isCardComponentItem(currentImage) && (
                  <div className="absolute top-2 left-2 bg-white/90 rounded-md px-2 py-1 flex items-center gap-1">
                    <span className="text-xs font-medium text-gray-700">Component</span>
                  </div>
                )}
              </div>
              
              {/* Navigation Arrows */}
              {hasMultipleImages && options.showArrows && (
                <>
                  <button
                    onClick={handlePrevImage}
                    disabled={!options.loop && currentImageIndex === 0}
                    className={cn(
                      "absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 shadow-md transition-all duration-200",
                      "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                      "disabled:opacity-50 disabled:cursor-not-allowed",
                      "touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
                    )}
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-4 w-4 text-gray-700" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    disabled={!options.loop && currentImageIndex === imageArray.length - 1}
                    className={cn(
                      "absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 shadow-md transition-all duration-200",
                      "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                      "disabled:opacity-50 disabled:cursor-not-allowed",
                      "touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
                    )}
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-4 w-4 text-gray-700" />
                  </button>
                </>
              )}
              
              {/* Pagination Dots */}
              {hasMultipleImages && options.showDots && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                  {imageArray.map((item, index) => (
                    <button
                      key={index}
                      onClick={(e) => goToImage(index, e)}
                      className={cn(
                        'transition-all duration-200 touch-manipulation',
                        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
                        'hover:scale-110',
                        item.type === 'video' 
                          ? 'w-3 h-2 rounded-sm' // Rectangle for videos
                          : 'w-2 h-2 rounded-full', // Circle for images
                        index === currentImageIndex 
                          ? 'bg-white scale-110' 
                          : 'bg-white/50'
                      )}
                      aria-label={`Go to ${item.type === 'video' ? 'video' : 'image'} ${index + 1}`}
                    />
                  ))}
                </div>
              )}
              
              {/* Save Button - Now positioned on LEFT */}
              {onSave && (
                <button
                  onClick={handleSave}
                  className={cn(
                    "absolute top-2 left-2 bg-white/80 hover:bg-white rounded-full p-1.5 shadow-md transition-all duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                    "touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
                  )}
                  aria-label={isImageSaved ? "Remove from saved" : "Save"}
                >
                  <Heart
                    className={cn(
                      'h-4 w-4 transition-all duration-200',
                      isImageSaved 
                        ? 'fill-red-500 text-red-500 scale-110' 
                        : 'text-gray-700 hover:text-red-500 hover:scale-110'
                    )}
                  />
                </button>
              )}

              {/* Mark as Driven Button - Positioned in center-left */}
              {onMarkAsDriven && (
                <button
                  onClick={handleMarkAsDriven}
                  className={cn(
                    "absolute top-2 left-14 bg-white/80 hover:bg-white rounded-full p-1.5 shadow-md transition-all duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                    "touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
                  )}
                  aria-label={isImageDriven ? "Remove from driven" : "Mark as driven"}
                >
                  <Check
                    className={cn(
                      'h-4 w-4 transition-all duration-200',
                      isImageDriven 
                        ? 'fill-green-500 text-green-500 scale-110' 
                        : 'text-gray-700 hover:text-green-500 hover:scale-110'
                    )}
                  />
                </button>
              )}
              
              {/* Close Button - Now positioned on RIGHT */}
              {isClosable && onClose && (
                <button
                  onClick={handleClose}
                  className={cn(
                    "absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full p-1.5 shadow-md transition-all duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                    "touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
                  )}
                  aria-label="Close"
                >
                  <X className="h-4 w-4 text-gray-700" />
                </button>
              )}
              
              {/* Screen Reader Instructions */}
              {hasMultipleImages && (
                <div id="carousel-instructions" className="sr-only">
                  {currentImage.type === 'video' ? 'Video' : 'Image'} {currentImageIndex + 1} of {imageArray.length}. 
                  Use arrow keys to navigate, or swipe on touch devices.
                  {currentImage.alt && ` Current ${currentImage.type === 'video' ? 'video' : 'image'}: ${currentImage.alt}`}
                  {currentImage.type === 'video' && ' Press space or click to play/pause video.'}
                </div>
              )}
            </div>
            
            {/* Media Actions Dropdown - Outside media container to prevent clipping */}
            {mediaActions && mediaActions.length > 0 && (
              <CardMediaActionsDropdown
                actions={mediaActions}
                currentMediaIndex={currentImageIndex}
                currentMedia={imageArray[currentImageIndex]}
                className="absolute top-2 left-28 z-50"
              />
            )}
          </div>
        )}
        
        {/* Content Section */}
        <div className="vromm-card-content space-y-2">
          {/* Rating */}
          {rating !== undefined && (
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
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

// Card Media Actions Dropdown Component
const CardMediaActionsDropdown: React.FC<{
  actions: CardMediaAction[];
  currentMediaIndex: number;
  currentMedia: CardMediaOrComponent | null;
  className?: string;
}> = ({ actions, currentMediaIndex, currentMedia, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  const handleActionClick = (action: CardMediaAction, event: React.MouseEvent) => {
    event.stopPropagation();
    
    if (action.disabled || !currentMedia) return;

    // Handle different action types
    switch (action.type) {
      case 'external':
        if (action.url) {
          window.open(action.url, '_blank', 'noopener,noreferrer');
        }
        break;
      case 'maps':
        if (action.coordinates) {
          const { lat, lng } = action.coordinates;
          window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank', 'noopener,noreferrer');
        }
        break;
      default:
        // For edit, delete, share, report, custom actions
        action.onClick(currentMediaIndex, currentMedia);
        break;
    }
    
    setIsOpen(false);
  };

  const getDefaultIcon = (type: CardMediaAction['type']) => {
    switch (type) {
      case 'edit': return Edit;
      case 'delete': return Trash2;
      case 'share': return Share;
      case 'report': return Flag;
      case 'external': return ExternalLink;
      case 'maps': return Map;
      default: return undefined;
    }
  };

  if (!actions.length) return null;

  return (
    <div ref={dropdownRef} className={className}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className={cn(
          "bg-white/80 hover:bg-white rounded-full p-1.5 shadow-md transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
          "touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
        )}
        aria-label="Media actions"
        aria-expanded={isOpen}
      >
        <MoreVertical className="h-4 w-4 text-gray-700" />
      </button>

      {isOpen && (
        <div className={cn(
          "absolute left-0 top-full mt-1 bg-white rounded-lg shadow-lg border z-50 min-w-[180px]",
          "py-1 max-h-64 overflow-y-auto"
        )}>
          {actions.map((action) => {
            const IconComponent = action.icon || getDefaultIcon(action.type);
            
            return (
              <button
                key={action.id}
                onClick={(e) => handleActionClick(action, e)}
                disabled={action.disabled}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-2 text-sm text-left",
                  "hover:bg-gray-50 transition-colors duration-150",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  action.destructive && "text-red-600 hover:bg-red-50",
                  "focus:outline-none focus:bg-gray-50"
                )}
              >
                {IconComponent && (
                  <IconComponent 
                    className={cn(
                      "h-4 w-4 flex-shrink-0",
                      action.destructive ? "text-red-500" : "text-gray-500"
                    )} 
                  />
                )}
                <span className="truncate">{action.label}</span>
                {action.type === 'external' && (
                  <ExternalLink className="h-3 w-3 ml-auto flex-shrink-0 text-gray-400" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

Card.displayName = 'Card';
CardHeader.displayName = 'CardHeader';
CardContent.displayName = 'CardContent';
CardFooter.displayName = 'CardFooter';
CardTitle.displayName = 'CardTitle';
CardDescription.displayName = 'CardDescription'; 