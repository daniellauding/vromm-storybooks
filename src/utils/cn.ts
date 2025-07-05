import { type ClassValue, clsx } from 'clsx';

/**
 * Utility function to combine class names with clsx
 * @param inputs - Class names to combine
 * @returns Combined class names
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
} 