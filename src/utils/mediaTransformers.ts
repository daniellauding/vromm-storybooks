import { CardImage } from '../components/Card/Card';

// User's media format
export interface UserMediaItem {
  url: string;
  type: 'image' | 'video';
  description?: string;
}

/**
 * Transform user media items to Card component format
 * @param mediaItems - Array of user media items
 * @param options - Optional configuration for transformation
 * @returns Array of CardImage objects
 */
export const transformMediaForCard = (
  mediaItems: UserMediaItem[],
  options?: {
    defaultAlt?: string;
    generatePoster?: (videoUrl: string) => string;
    extractDuration?: (videoUrl: string) => string;
  }
): CardImage[] => {
  return mediaItems.map((item, index) => {
    const baseTransform: CardImage = {
      src: item.url,
      alt: item.description || options?.defaultAlt || `Media item ${index + 1}`,
      type: item.type === 'image' ? 'photo' : item.type,
    };

    // Add video-specific properties if it's a video
    if (item.type === 'video') {
      return {
        ...baseTransform,
        type: 'video',
        // Generate poster from video URL if function provided
        poster: options?.generatePoster?.(item.url),
        // Extract duration if function provided
        duration: options?.extractDuration?.(item.url),
      };
    }

    return baseTransform;
  });
};

/**
 * Helper to detect if URL is a local file (mobile app scenario)
 * @param url - The media URL
 * @returns boolean indicating if it's a local file
 */
export const isLocalFile = (url: string): boolean => {
  return url.startsWith('file://') || url.startsWith('content://');
};

/**
 * Helper to get file extension from URL
 * @param url - The media URL
 * @returns file extension or null
 */
export const getFileExtension = (url: string): string | null => {
  const match = url.match(/\.([^.?]+)(\?|$)/);
  return match ? match[1].toLowerCase() : null;
};

/**
 * Helper to determine if file is video based on extension
 * @param url - The media URL
 * @returns boolean indicating if it's likely a video file
 */
export const isVideoFile = (url: string): boolean => {
  const videoExtensions = ['mp4', 'mov', 'avi', 'mkv', 'webm', 'm4v', '3gp'];
  const extension = getFileExtension(url);
  return extension ? videoExtensions.includes(extension) : false;
};

/**
 * Enhanced transformation with automatic type detection
 * Useful when type might be missing or incorrect
 */
export const transformMediaWithDetection = (
  mediaItems: Omit<UserMediaItem, 'type'>[]
): CardImage[] => {
  return mediaItems.map((item, index) => {
    const detectedType = isVideoFile(item.url) ? 'video' : 'photo';
    
    return {
      src: item.url,
      alt: item.description || `Media item ${index + 1}`,
      type: detectedType,
    };
  });
}; 