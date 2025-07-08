import React, { forwardRef, useEffect, useMemo, useState, useRef, useCallback } from 'react';
import { cn } from '../../utils/cn';
import { X, ChevronLeft, ChevronRight, Play, Pause, MapPin, Heart, Check, MoreVertical, Edit, Trash2, Share, Flag, ExternalLink, Map } from 'lucide-react';
import { Button } from '../Button/Button';
import { zIndex } from '../../tokens';
import './Modal.scss';

export interface ModalMediaItem {
  src: string;
  alt: string;
  type?: 'photo' | 'map' | 'video';
  poster?: string; // For video thumbnail
  duration?: string; // For video duration display
}

export interface ModalComponentItem {
  component: React.ReactNode;
  type: 'component';
  alt?: string; // Optional alt text for accessibility
}

export type ModalMediaOrComponent = ModalMediaItem | ModalComponentItem;

// Type guard functions
const isModalMediaItem = (item: ModalMediaOrComponent): item is ModalMediaItem => {
  return item.type !== 'component';
};

const isModalComponentItem = (item: ModalMediaOrComponent): item is ModalComponentItem => {
  return item.type === 'component';
};

// Media Actions Dropdown Types
export interface ModalMediaAction {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  type: 'edit' | 'delete' | 'share' | 'report' | 'external' | 'maps' | 'custom';
  onClick: (mediaIndex: number, media: ModalMediaOrComponent) => void;
  url?: string; // For external links
  coordinates?: { lat: number; lng: number }; // For Google Maps
  disabled?: boolean;
  destructive?: boolean; // For styling delete/report actions
}

export interface ModalCarouselOptions {
  showDots?: boolean;
  showArrows?: boolean;
  loop?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  enableSwipe?: boolean;
  transition?: 'slide' | 'fade';
  videoControls?: {
    muted?: boolean;
    autoPlay?: boolean;
    showDuration?: boolean;
  };
}

export interface ModalProps {
  /**
   * Whether the modal is open
   */
  isOpen: boolean;
  /**
   * Function called when modal should close
   */
  onClose: () => void;
  /**
   * Modal title
   */
  title?: string;
  /**
   * Modal description
   */
  description?: string;
  /**
   * Modal size
   */
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | 'full';
  /**
   * Whether to show close button
   */
  showCloseButton?: boolean;
  /**
   * Whether clicking overlay closes modal
   */
  closeOnOverlayClick?: boolean;
  /**
   * Whether pressing escape closes modal
   */
  closeOnEscape?: boolean;
  /**
   * Enable mobile bottom sheet behavior
   */
  mobileBottomSheet?: boolean;
  /**
   * Height for mobile bottom sheet (e.g., '60vh', '70vh', '80vh')
   */
  mobileHeight?: string;
  /**
   * Z-index override for custom stacking (optional)
   */
  zIndexOverride?: number;
  /**
   * Custom header content
   */
  header?: React.ReactNode;
  /**
   * Modal content
   */
  children: React.ReactNode;
  /**
   * Footer content
   */
  footer?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Additional CSS classes for content
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for overlay
   */
  overlayClassName?: string;
  
  // Media header props (similar to Card component)
  /**
   * Media items for header carousel
   */
  media?: ModalMediaOrComponent | ModalMediaOrComponent[];
  /**
   * Height of the media header (default: '16rem' / 256px)
   */
  mediaHeight?: 'sm' | 'md' | 'lg' | 'xl' | string;
  /**
   * Actions dropdown for media header
   */
  mediaActions?: ModalMediaAction[];
  /**
   * Carousel options for media header
   */
  carouselOptions?: ModalCarouselOptions;
  /**
   * Show save button in media header
   */
  showSaveButton?: boolean;
  /**
   * Show mark as driven button in media header
   */
  showDrivenButton?: boolean;
  /**
   * Whether item is saved
   */
  isSaved?: boolean;
  /**
   * Whether item is driven
   */
  isDriven?: boolean;
  /**
   * Save button callback
   */
  onSave?: () => void;
  /**
   * Mark as driven callback
   */
  onMarkAsDriven?: () => void;
  /**
   * Media change callback
   */
  onMediaChange?: (currentIndex: number, media: ModalMediaOrComponent) => void;
  /**
   * Video play callback
   */
  onVideoPlay?: (currentIndex: number, media: ModalMediaItem) => void;
  /**
   * Video pause callback
   */
  onVideoPause?: (currentIndex: number, media: ModalMediaItem) => void;
}

const sizeClasses = {
  sm: 'vromm-modal--sm',
  md: 'vromm-modal--md',
  lg: 'vromm-modal--lg',
  xl: 'vromm-modal--xl',
  '2xl': 'vromm-modal--2xl',
  '3xl': 'vromm-modal--3xl',
  '4xl': 'vromm-modal--4xl',
  full: 'vromm-modal--full',
};

// Track open modals for automatic z-index stacking
let openModalCount = 0;
const getNextZIndex = () => {
  openModalCount++;
  // Base modal z-index + stacking increment
  return zIndex.modal + (openModalCount - 1) * 100;
};

const releaseZIndex = () => {
  openModalCount = Math.max(0, openModalCount - 1);
};

// Media Actions Dropdown Component
const MediaActionsDropdown: React.FC<{
  actions: ModalMediaAction[];
  currentMediaIndex: number;
  currentMedia: ModalMediaOrComponent | null;
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

  const handleActionClick = (action: ModalMediaAction, event: React.MouseEvent) => {
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

  const getDefaultIcon = (type: ModalMediaAction['type']) => {
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

/**
 * Modal component for displaying content in an overlay.
 * 
 * Features:
 * - Multiple sizes (sm, md, lg, xl, 2xl, 3xl, 4xl, full)
 * - Media header with carousel support (images, videos, maps)
 * - Mobile bottom sheet behavior
 * - Automatic z-index management for stacked modals
 * - Customizable header, content, and footer
 * - Overlay and escape key closing
 * - Accessible with focus management
 * - Mobile responsive
 * - Dark mode support
 */
export const Modal = forwardRef<HTMLDivElement, ModalProps>(({
  isOpen,
  onClose,
  title,
  description,
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  mobileBottomSheet = false,
  mobileHeight = '70vh',
  zIndexOverride,
  header,
  children,
  footer,
  className,
  contentClassName,
  overlayClassName,
  // Media header props
  media,
  mediaHeight = '16rem', // Default media height
  mediaActions,
  carouselOptions,
  showSaveButton = false,
  showDrivenButton = false,
  isSaved = false,
  isDriven = false,
  onSave,
  onMarkAsDriven,
  onMediaChange,
  onVideoPlay,
  onVideoPause,
}, ref) => {
  // Normalize media to array format
  const mediaArray = media ? (Array.isArray(media) ? media : [media]) : [];
  const hasMedia = mediaArray.length > 0;
  const hasMultipleMedia = mediaArray.length > 1;
  
  // Merge carousel options with defaults
  const options = { 
    showDots: true,
    showArrows: true,
    loop: true,
    autoPlay: false,
    autoPlayInterval: 5000,
    enableSwipe: true,
    transition: 'slide',
    videoControls: {
      muted: true,
      autoPlay: false,
      showDuration: true,
    },
    ...carouselOptions 
  };
  
  // Media state management
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isMediaSaved, setIsMediaSaved] = useState(isSaved);
  const [isMediaDriven, setIsMediaDriven] = useState(isDriven);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [videoStates, setVideoStates] = useState<{ [key: number]: { isPlaying: boolean } }>({});
  
  // Sync state with props
  useEffect(() => {
    setIsMediaSaved(isSaved);
  }, [isSaved]);
  
  useEffect(() => {
    setIsMediaDriven(isDriven);
  }, [isDriven]);
  
  // Refs for touch handling and video control
  const carouselRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const autoPlayTimer = useRef<NodeJS.Timeout>();
  const isDragging = useRef<boolean>(false);

  // Calculate z-index for this modal instance
  const modalZIndex = useMemo(() => {
    if (zIndexOverride) return zIndexOverride;
    if (!isOpen) return zIndex.modal;
    return getNextZIndex();
  }, [isOpen, zIndexOverride]);

  // Auto-play functionality for media
  useEffect(() => {
    if (options.autoPlay && hasMultipleMedia && !isTransitioning) {
      autoPlayTimer.current = setInterval(() => {
        handleNextMedia();
      }, options.autoPlayInterval);
      
      return () => {
        if (autoPlayTimer.current) {
          clearInterval(autoPlayTimer.current);
        }
      };
    }
  }, [options.autoPlay, options.autoPlayInterval, hasMultipleMedia, currentMediaIndex, isTransitioning]);

  // Video control functions
  const handleVideoToggle = useCallback((index: number, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
    }
    
    const video = videoRefs.current[index];
    if (!video || mediaArray[index]?.type !== 'video') return;
    
    const isCurrentlyPlaying = videoStates[index]?.isPlaying || false;
    
    if (isCurrentlyPlaying) {
      video.pause();
      setVideoStates(prev => ({ ...prev, [index]: { isPlaying: false } }));
      onVideoPause?.(index, mediaArray[index]);
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
      onVideoPlay?.(index, mediaArray[index]);
    }
  }, [videoStates, mediaArray, onVideoPlay, onVideoPause]);

  // Navigation functions
  const goToMedia = useCallback((index: number, event?: React.MouseEvent | React.KeyboardEvent) => {
    if (event) {
      event.stopPropagation();
    }
    
    if (index < 0 || index >= mediaArray.length || index === currentMediaIndex) {
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
    setCurrentMediaIndex(index);
    onMediaChange?.(index, mediaArray[index]);
    
    // Reset transition state after animation
    setTimeout(() => setIsTransitioning(false), 300);
    
    // Reset auto-play timer
    if (autoPlayTimer.current) {
      clearInterval(autoPlayTimer.current);
    }
  }, [currentMediaIndex, mediaArray, onMediaChange]);
  
  const handlePrevMedia = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    
    if (!hasMultipleMedia) return;
    
    let newIndex;
    if (options.loop) {
      newIndex = currentMediaIndex > 0 ? currentMediaIndex - 1 : mediaArray.length - 1;
    } else {
      newIndex = Math.max(0, currentMediaIndex - 1);
    }
    
    goToMedia(newIndex);
  }, [currentMediaIndex, mediaArray.length, hasMultipleMedia, options.loop, goToMedia]);
  
  const handleNextMedia = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    
    if (!hasMultipleMedia) return;
    
    let newIndex;
    if (options.loop) {
      newIndex = currentMediaIndex < mediaArray.length - 1 ? currentMediaIndex + 1 : 0;
    } else {
      newIndex = Math.min(mediaArray.length - 1, currentMediaIndex + 1);
    }
    
    goToMedia(newIndex);
  }, [currentMediaIndex, mediaArray.length, hasMultipleMedia, options.loop, goToMedia]);

  // Touch event handlers for swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!options.enableSwipe || !hasMultipleMedia) return;
    
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
    if (!options.enableSwipe || !hasMultipleMedia) return;
    
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
    if (!options.enableSwipe || !hasMultipleMedia || !isDragging.current) return;
    
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartX.current;
    const deltaY = Math.abs(touch.clientY - touchStartY.current);
    
    // Only trigger swipe if horizontal movement is significant and greater than vertical
    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > deltaY) {
      if (deltaX > 0) {
        handlePrevMedia();
      } else {
        handleNextMedia();
      }
    }
    
    isDragging.current = false;
  };

  // Action handlers
  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMediaSaved(!isMediaSaved);
    onSave?.();
  };

  const handleMarkAsDriven = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMediaDriven(!isMediaDriven);
    onMarkAsDriven?.();
  };

  // Handle escape key
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscape, onClose]);

  // Prevent body scroll when modal is open and manage z-index count
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Z-index is already calculated in useMemo
    } else {
      document.body.style.overflow = 'unset';
      if (!zIndexOverride) {
        releaseZIndex();
      }
    }

    return () => {
      document.body.style.overflow = 'unset';
      if (isOpen && !zIndexOverride) {
        releaseZIndex();
      }
    };
  }, [isOpen, zIndexOverride]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  const currentMedia = hasMedia ? mediaArray[currentMediaIndex] : null;

  // Helper function to get media height styling
  const getMediaHeightStyle = () => {
    const heightMap = {
      'sm': '12rem',    // 192px
      'md': '14rem',    // 224px  
      'lg': '16rem',    // 256px (current default)
      'xl': '20rem',    // 320px
    };

    if (mediaHeight && mediaHeight in heightMap) {
      return { height: heightMap[mediaHeight as keyof typeof heightMap] };
    }
    
    // If it's a custom value (like '300px', '18rem', '60vh')
    if (mediaHeight && typeof mediaHeight === 'string') {
      return { height: mediaHeight };
    }
    
    // Default height
    return { height: '16rem' };
  };

  const mediaHeightStyle = getMediaHeightStyle();

  return (
    <div
      className={cn(
        'vromm-modal-overlay',
        mobileBottomSheet && 'vromm-modal-overlay--mobile',
        overlayClassName
      )}
      style={{ zIndex: modalZIndex }}
      onClick={handleOverlayClick}
    >
      <div 
        className={cn(
          'vromm-modal-container',
          mobileBottomSheet && 'vromm-modal-container--mobile'
        )}
        onClick={handleOverlayClick}
      >
        {!mobileBottomSheet && <span className="vromm-modal-spacer" aria-hidden="true">&#8203;</span>}
        <div
          ref={ref}
          className={cn(
            'vromm-modal-content',
            !mobileBottomSheet && sizeClasses[size],
            mobileBottomSheet && 'vromm-modal-content--mobile',
            hasMedia && 'vromm-modal-content--with-media',
            className
          )}
          style={mobileBottomSheet ? { height: mobileHeight } : undefined}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'modal-title' : undefined}
          aria-describedby={description ? 'modal-description' : undefined}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Media Header */}
          {hasMedia && (
            <div className="relative">
              <div 
                ref={carouselRef}
                className="vromm-modal-media-header"
                role="region"
                aria-label="Media carousel"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* Main Media Container (Image/Video/Component) */}
                <div className="relative">
                  {currentMedia && isModalComponentItem(currentMedia) ? (
                    /* React Component */
                    <div 
                      className="w-full transition-opacity duration-300"
                      style={{
                        ...mediaHeightStyle,
                        ...(options.transition === 'fade' && isTransitioning && { opacity: 0 })
                      }}
                      role="img"
                      aria-label={currentMedia.alt || "Custom component"}
                    >
                      {currentMedia.component}
                    </div>
                  ) : currentMedia && isModalMediaItem(currentMedia) && currentMedia.type === 'video' ? (
                    <>
                      {/* Video Element */}
                      <video
                        ref={(ref) => { videoRefs.current[currentMediaIndex] = ref; }}
                        src={currentMedia.src}
                        poster={currentMedia.poster}
                        className="w-full object-cover transition-opacity duration-300"
                        style={{
                          ...mediaHeightStyle,
                          ...(options.transition === 'fade' && isTransitioning && { opacity: 0 })
                        }}
                        muted={options.videoControls?.muted !== false}
                        playsInline
                        preload="metadata"
                        onPlay={() => {
                          setVideoStates(prev => ({ ...prev, [currentMediaIndex]: { isPlaying: true } }));
                          if (isModalMediaItem(currentMedia)) {
                            onVideoPlay?.(currentMediaIndex, currentMedia);
                          }
                        }}
                        onPause={() => {
                          setVideoStates(prev => ({ ...prev, [currentMediaIndex]: { isPlaying: false } }));
                          if (isModalMediaItem(currentMedia)) {
                            onVideoPause?.(currentMediaIndex, currentMedia);
                          }
                        }}
                        onEnded={() => {
                          setVideoStates(prev => ({ ...prev, [currentMediaIndex]: { isPlaying: false } }));
                          if (isModalMediaItem(currentMedia)) {
                            onVideoPause?.(currentMediaIndex, currentMedia);
                          }
                        }}
                      />
                      
                      {/* Video Play/Pause Button */}
                      <button
                        onClick={(e) => handleVideoToggle(currentMediaIndex, e)}
                        className={cn(
                          "absolute inset-0 flex items-center justify-center",
                          "bg-black/20 hover:bg-black/30 transition-all duration-200",
                          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white",
                          videoStates[currentMediaIndex]?.isPlaying && "opacity-0 hover:opacity-100"
                        )}
                        aria-label={videoStates[currentMediaIndex]?.isPlaying ? "Pause video" : "Play video"}
                      >
                        <div className="bg-white/90 hover:bg-white rounded-full p-3 shadow-lg">
                          {videoStates[currentMediaIndex]?.isPlaying ? (
                            <Pause className="h-6 w-6 text-gray-700" />
                          ) : (
                            <Play className="h-6 w-6 text-gray-700 ml-0.5" />
                          )}
                        </div>
                      </button>
                      
                      {/* Video Duration Badge */}
                      {currentMedia.duration && options.videoControls?.showDuration && (
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {currentMedia.duration}
                        </div>
                      )}
                    </>
                  ) : currentMedia && isModalMediaItem(currentMedia) ? (
                    /* Image Element */
                    <img
                      src={currentMedia.src}
                      alt={currentMedia.alt}
                      className="w-full object-cover transition-opacity duration-300"
                      style={{
                        ...mediaHeightStyle,
                        ...(options.transition === 'fade' && isTransitioning && { opacity: 0 })
                      }}
                      loading="eager"
                    />
                  ) : null}
                  
                  {/* Type Icon Overlays - Only for media items */}
                  {currentMedia && isModalMediaItem(currentMedia) && currentMedia.type === 'map' && (
                    <div className="absolute top-2 left-2 bg-white/90 rounded-md px-2 py-1 flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-gray-700" />
                      <span className="text-xs font-medium text-gray-700">Map</span>
                    </div>
                  )}
                  
                  {/* Component Type Icon Overlay */}
                  {currentMedia && isModalComponentItem(currentMedia) && (
                    <div className="absolute top-2 left-2 bg-white/90 rounded-md px-2 py-1 flex items-center gap-1">
                      <span className="text-xs font-medium text-gray-700">Component</span>
                    </div>
                  )}
                </div>
                
                {/* Navigation Arrows */}
                {hasMultipleMedia && options.showArrows && (
                  <>
                    <button
                      onClick={handlePrevMedia}
                      disabled={!options.loop && currentMediaIndex === 0}
                      className={cn(
                        "absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 shadow-md transition-all duration-200",
                        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                        "disabled:opacity-50 disabled:cursor-not-allowed",
                        "touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
                      )}
                      aria-label="Previous media"
                    >
                      <ChevronLeft className="h-4 w-4 text-gray-700" />
                    </button>
                    <button
                      onClick={handleNextMedia}
                      disabled={!options.loop && currentMediaIndex === mediaArray.length - 1}
                      className={cn(
                        "absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 shadow-md transition-all duration-200",
                        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                        "disabled:opacity-50 disabled:cursor-not-allowed",
                        "touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
                      )}
                      aria-label="Next media"
                    >
                      <ChevronRight className="h-4 w-4 text-gray-700" />
                    </button>
                  </>
                )}
                
                {/* Pagination Dots */}
                {hasMultipleMedia && options.showDots && (
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                    {mediaArray.map((item, index) => (
                      <button
                        key={index}
                        onClick={(e) => goToMedia(index, e)}
                        className={cn(
                          'transition-all duration-200 touch-manipulation',
                          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
                          'hover:scale-110',
                          item.type === 'video' 
                            ? 'w-3 h-2 rounded-sm' // Rectangle for videos
                            : 'w-2 h-2 rounded-full', // Circle for images
                          index === currentMediaIndex 
                            ? 'bg-white scale-110' 
                            : 'bg-white/50'
                        )}
                        aria-label={`Go to ${item.type === 'video' ? 'video' : 'image'} ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
                
                {/* Save Button */}
                {showSaveButton && onSave && (
                  <button
                    onClick={handleSave}
                    className={cn(
                      "absolute top-2 left-2 bg-white/80 hover:bg-white rounded-full p-1.5 shadow-md transition-all duration-200",
                      "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                      "touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
                    )}
                    aria-label={isMediaSaved ? "Remove from saved" : "Save"}
                  >
                    <Heart
                      className={cn(
                        'h-4 w-4 transition-all duration-200',
                        isMediaSaved 
                          ? 'fill-red-500 text-red-500 scale-110' 
                          : 'text-gray-700 hover:text-red-500 hover:scale-110'
                      )}
                    />
                  </button>
                )}

                {/* Mark as Driven Button */}
                {showDrivenButton && onMarkAsDriven && (
                  <button
                    onClick={handleMarkAsDriven}
                    className={cn(
                      "absolute top-2 left-14 bg-white/80 hover:bg-white rounded-full p-1.5 shadow-md transition-all duration-200",
                      "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                      "touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
                    )}
                    aria-label={isMediaDriven ? "Remove from driven" : "Mark as driven"}
                  >
                    <Check
                      className={cn(
                        'h-4 w-4 transition-all duration-200',
                        isMediaDriven 
                          ? 'fill-green-500 text-green-500 scale-110' 
                          : 'text-gray-700 hover:text-green-500 hover:scale-110'
                      )}
                    />
                  </button>
                )}
                
                {/* Close Button - Always on right */}
                {showCloseButton && (
                  <button
                    onClick={onClose}
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
              </div>
              
              {/* Media Actions Dropdown - Outside media header to prevent clipping */}
              {mediaActions && mediaActions.length > 0 && (
                <MediaActionsDropdown
                  actions={mediaActions}
                  currentMediaIndex={currentMediaIndex}
                  currentMedia={currentMedia}
                  className="absolute top-2 left-28 z-50"
                />
              )}
            </div>
          )}

          {/* Header (only shown if no media or there's additional header content) */}
          {(!hasMedia && (header || title || showCloseButton)) && (
            <div className="vromm-modal-header">
              <div className="flex-1">
                {header || (
                  <div>
                    {title && (
                      <h2
                        id="modal-title"
                        className="vromm-modal-title"
                      >
                        {title}
                      </h2>
                    )}
                    {description && (
                      <p
                        id="modal-description"
                        className="mt-1 text-sm text-gray-600 dark:text-gray-400"
                      >
                        {description}
                      </p>
                    )}
                  </div>
                )}
              </div>
              
              {showCloseButton && (
                <Button
                  variant="secondary"
                  size="sm"
                  iconOnly
                  icon={X}
                  onClick={onClose}
                  className="vromm-modal-close"
                  aria-label="Close modal"
                />
              )}
            </div>
          )}

          {/* Content */}
          <div
            className={cn(
              'vromm-modal-body',
              mobileBottomSheet && 'vromm-modal-body--mobile',
              contentClassName
            )}
          >
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className="vromm-modal-footer">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

Modal.displayName = 'Modal'; 