import React, { forwardRef, useState, useEffect, useRef, useCallback } from 'react';
import { cn } from '../../utils/cn';
import { QuickIcon } from '../Icon';
import './Carousel.scss';

export interface CarouselProps {
  /**
   * Carousel items/slides
   */
  children: React.ReactNode;
  /**
   * Whether to show navigation arrows
   */
  showArrows?: boolean;
  /**
   * Whether to show dot indicators
   */
  showIndicators?: boolean;
  /**
   * Whether to auto-play slides
   */
  autoPlay?: boolean;
  /**
   * Auto-play interval in milliseconds
   */
  autoPlayInterval?: number;
  /**
   * Whether to loop back to first slide
   */
  loop?: boolean;
  /**
   * Current active slide index
   */
  activeIndex?: number;
  /**
   * Default active slide index
   */
  defaultActiveIndex?: number;
  /**
   * Function called when slide changes
   */
  onSlideChange?: (index: number) => void;
  /**
   * Whether to pause auto-play on hover
   */
  pauseOnHover?: boolean;
  /**
   * Carousel variant
   */
  variant?: 'default' | 'fade' | 'slide';
  /**
   * Slide animation duration
   */
  duration?: number;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Whether touch/swipe is enabled
   */
  enableTouch?: boolean;
  /**
   * Custom arrow icons
   */
  prevIcon?: React.ReactNode;
  nextIcon?: React.ReactNode;
  /**
   * Arrow position
   */
  arrowPosition?: 'inside' | 'outside';
  /**
   * Indicator position
   */
  indicatorPosition?: 'bottom' | 'top';
}

/**
 * Carousel component for displaying multiple slides with navigation.
 * 
 * Features:
 * - Touch/swipe support for mobile
 * - Auto-play functionality with pause on hover
 * - Navigation arrows and dot indicators
 * - Slide and fade transition effects
 * - Keyboard navigation support
 * - Responsive design
 * - Customizable styling and positioning
 * - Loop functionality
 * - Controlled and uncontrolled modes
 */
export const Carousel = forwardRef<HTMLDivElement, CarouselProps>(({
  children,
  showArrows = true,
  showIndicators = true,
  autoPlay = false,
  autoPlayInterval = 5000,
  loop = true,
  activeIndex: controlledActiveIndex,
  defaultActiveIndex = 0,
  onSlideChange,
  pauseOnHover = true,
  variant = 'slide',
  duration = 300,
  className,
  enableTouch = true,
  prevIcon,
  nextIcon,
  arrowPosition = 'inside',
  indicatorPosition = 'bottom',
  ...props
}, ref) => {
  const slides = React.Children.toArray(children);
  const [internalActiveIndex, setInternalActiveIndex] = useState(defaultActiveIndex);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Touch/swipe handling
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  
  // Refs
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout>();
  
  // Current active index (controlled or internal)
  const isControlled = controlledActiveIndex !== undefined;
  const activeIndex = isControlled ? controlledActiveIndex : internalActiveIndex;
  
  // Handle slide change
  const handleSlideChange = useCallback((newIndex: number) => {
    if (isTransitioning) return;
    
    let targetIndex = newIndex;
    
    if (loop) {
      if (newIndex < 0) {
        targetIndex = slides.length - 1;
      } else if (newIndex >= slides.length) {
        targetIndex = 0;
      }
    } else {
      targetIndex = Math.max(0, Math.min(slides.length - 1, newIndex));
    }
    
    if (targetIndex === activeIndex) return;
    
    setIsTransitioning(true);
    
    if (!isControlled) {
      setInternalActiveIndex(targetIndex);
    }
    
    onSlideChange?.(targetIndex);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, duration);
  }, [activeIndex, slides.length, loop, isControlled, onSlideChange, duration, isTransitioning]);
  
  // Navigation functions
  const goToPrevious = useCallback(() => {
    handleSlideChange(activeIndex - 1);
  }, [activeIndex, handleSlideChange]);
  
  const goToNext = useCallback(() => {
    handleSlideChange(activeIndex + 1);
  }, [activeIndex, handleSlideChange]);
  
  const goToSlide = useCallback((index: number) => {
    handleSlideChange(index);
  }, [handleSlideChange]);
  
  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && !isPaused) {
      autoPlayRef.current = setInterval(() => {
        goToNext();
      }, autoPlayInterval);
    } else if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [autoPlay, isPaused, autoPlayInterval, goToNext]);
  
  // Touch/swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!enableTouch) return;
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!enableTouch) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (!enableTouch) return;
    
    const touchDistance = touchStart - touchEnd;
    const minSwipeDistance = 50;
    
    if (touchDistance > minSwipeDistance) {
      goToNext();
    } else if (touchDistance < -minSwipeDistance) {
      goToPrevious();
    }
  };
  
  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        goToPrevious();
        break;
      case 'ArrowRight':
        e.preventDefault();
        goToNext();
        break;
      case 'Home':
        e.preventDefault();
        goToSlide(0);
        break;
      case 'End':
        e.preventDefault();
        goToSlide(slides.length - 1);
        break;
    }
  };
  
  const variantClasses = {
    default: 'vromm-carousel--default',
    fade: 'vromm-carousel--fade',
    slide: 'vromm-carousel--slide',
  };
  
  const arrowPositionClasses = {
    inside: 'vromm-carousel--arrows-inside',
    outside: 'vromm-carousel--arrows-outside',
  };
  
  const indicatorPositionClasses = {
    bottom: 'vromm-carousel--indicators-bottom',
    top: 'vromm-carousel--indicators-top',
  };
  
  return (
    <div
      ref={ref || carouselRef}
      className={cn(
        'vromm-carousel',
        variantClasses[variant],
        arrowPositionClasses[arrowPosition],
        indicatorPositionClasses[indicatorPosition],
        className
      )}
      onMouseEnter={pauseOnHover ? () => setIsPaused(true) : undefined}
      onMouseLeave={pauseOnHover ? () => setIsPaused(false) : undefined}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Carousel"
      {...props}
    >
      {/* Slides container */}
      <div className="vromm-carousel-slides">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={cn(
              'vromm-carousel-slide',
              index === activeIndex && 'vromm-carousel-slide--active',
              isTransitioning && 'vromm-carousel-slide--transitioning'
            )}
            style={{
              transform: variant === 'slide' ? `translateX(${(index - activeIndex) * 100}%)` : undefined,
              opacity: variant === 'fade' ? (index === activeIndex ? 1 : 0) : undefined,
              transitionDuration: `${duration}ms`,
            }}
            aria-hidden={index !== activeIndex}
          >
            {slide}
          </div>
        ))}
      </div>
      
      {/* Navigation arrows */}
      {showArrows && slides.length > 1 && (
        <>
          <button
            className={cn(
              'vromm-carousel-arrow',
              'vromm-carousel-arrow--prev',
              (!loop && activeIndex === 0) && 'vromm-carousel-arrow--disabled'
            )}
            onClick={goToPrevious}
            disabled={!loop && activeIndex === 0}
            aria-label="Previous slide"
          >
            {prevIcon || <QuickIcon name="arrow-left" />}
          </button>
          
          <button
            className={cn(
              'vromm-carousel-arrow',
              'vromm-carousel-arrow--next',
              (!loop && activeIndex === slides.length - 1) && 'vromm-carousel-arrow--disabled'
            )}
            onClick={goToNext}
            disabled={!loop && activeIndex === slides.length - 1}
            aria-label="Next slide"
          >
            {nextIcon || <QuickIcon name="arrow-right" />}
          </button>
        </>
      )}
      
      {/* Indicators */}
      {showIndicators && slides.length > 1 && (
        <div className="vromm-carousel-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={cn(
                'vromm-carousel-indicator',
                index === activeIndex && 'vromm-carousel-indicator--active'
              )}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
});

Carousel.displayName = 'Carousel'; 