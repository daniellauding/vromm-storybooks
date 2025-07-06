import React, { forwardRef, useState, useCallback, useRef, useEffect } from 'react';
import { cn } from '../../../utils/cn';
import './Slider.scss';

export interface SliderProps {
  /**
   * Current value (single value mode)
   */
  value?: number;
  /**
   * Current values (range mode)
   */
  values?: number[];
  /**
   * Default value (single value mode)
   */
  defaultValue?: number;
  /**
   * Default values (range mode)
   */
  defaultValues?: number[];
  /**
   * Minimum value
   */
  min?: number;
  /**
   * Maximum value
   */
  max?: number;
  /**
   * Step increment
   */
  step?: number;
  /**
   * Whether the slider is disabled
   */
  disabled?: boolean;
  /**
   * Slider orientation
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Slider size
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Slider variant
   */
  variant?: 'default' | 'success' | 'warning' | 'error';
  /**
   * Whether to show value labels
   */
  showValues?: boolean;
  /**
   * Whether to show tick marks
   */
  showTicks?: boolean;
  /**
   * Custom tick marks
   */
  ticks?: number[];
  /**
   * Value formatter function
   */
  formatValue?: (value: number) => string;
  /**
   * Function called when value changes
   */
  onValueChange?: (value: number) => void;
  /**
   * Function called when values change (range mode)
   */
  onValuesChange?: (values: number[]) => void;
  /**
   * Function called when slider loses focus
   */
  onValueCommit?: (value: number | number[]) => void;
  /**
   * Slider label
   */
  label?: string;
  /**
   * Helper text
   */
  helperText?: string;
  /**
   * Error message
   */
  error?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * ARIA label
   */
  ariaLabel?: string;
  /**
   * ARIA label for minimum value (range mode)
   */
  ariaLabelMin?: string;
  /**
   * ARIA label for maximum value (range mode)
   */
  ariaLabelMax?: string;
}

/**
 * Slider component for selecting numerical values within a range.
 * 
 * Features:
 * - Single value and range modes
 * - Customizable min/max/step values
 * - Multiple sizes and variants
 * - Tick marks and value labels
 * - Keyboard navigation support
 * - Accessibility with ARIA attributes
 * - Custom value formatting
 * - Error states and validation
 * - Both horizontal and vertical orientations
 */
export const Slider = forwardRef<HTMLDivElement, SliderProps>(({
  value: controlledValue,
  values: controlledValues,
  defaultValue = 0,
  defaultValues,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  orientation = 'horizontal',
  size = 'md',
  variant = 'default',
  showValues = false,
  showTicks = false,
  ticks,
  formatValue = (value) => value.toString(),
  onValueChange,
  onValuesChange,
  onValueCommit,
  label,
  helperText,
  error,
  className,
  ariaLabel,
  ariaLabelMin = 'Minimum value',
  ariaLabelMax = 'Maximum value',
  ...props
}, ref) => {
  // Determine if we're in range mode
  const isRangeMode = controlledValues !== undefined || defaultValues !== undefined;
  
  // Internal state
  const [internalValue, setInternalValue] = useState(controlledValue ?? defaultValue);
  const [internalValues, setInternalValues] = useState(controlledValues ?? defaultValues ?? [min, max]);
  const [isDragging, setIsDragging] = useState(false);
  const [activeThumb, setActiveThumb] = useState<number | null>(null);
  
  // Refs
  const sliderRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  // Current values (controlled or internal)
  const isControlled = isRangeMode ? controlledValues !== undefined : controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;
  const currentValues = isControlled ? controlledValues : internalValues;
  
  // Normalize value to percentage
  const valueToPercent = useCallback((value: number) => {
    return ((value - min) / (max - min)) * 100;
  }, [min, max]);
  
  // Convert percentage to value
  const percentToValue = useCallback((percent: number) => {
    const value = min + (percent / 100) * (max - min);
    return Math.round(value / step) * step;
  }, [min, max, step]);
  
  // Get value from mouse/touch position
  const getValueFromPosition = useCallback((clientX: number, clientY: number) => {
    if (!trackRef.current) return min;
    
    const rect = trackRef.current.getBoundingClientRect();
    const isHorizontal = orientation === 'horizontal';
    
    let percent;
    if (isHorizontal) {
      percent = ((clientX - rect.left) / rect.width) * 100;
    } else {
      percent = ((rect.bottom - clientY) / rect.height) * 100;
    }
    
    return Math.max(min, Math.min(max, percentToValue(percent)));
  }, [orientation, min, max, percentToValue]);
  
  // Handle value change
  const handleValueChange = useCallback((newValue: number | number[]) => {
    if (disabled) return;
    
    if (isRangeMode && Array.isArray(newValue)) {
      if (!isControlled) {
        setInternalValues(newValue);
      }
      onValuesChange?.(newValue);
    } else if (!isRangeMode && typeof newValue === 'number') {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    }
  }, [disabled, isRangeMode, isControlled, onValueChange, onValuesChange]);
  
  // Handle mouse/touch events
  const handlePointerDown = useCallback((event: React.PointerEvent, thumbIndex?: number) => {
    if (disabled) return;
    
    event.preventDefault();
    setIsDragging(true);
    setActiveThumb(thumbIndex ?? 0);
    
    const newValue = getValueFromPosition(event.clientX, event.clientY);
    
    if (isRangeMode && currentValues) {
      const newValues = [...currentValues];
      if (thumbIndex !== undefined) {
        newValues[thumbIndex] = newValue;
      } else {
        // Determine which thumb is closer
        const distances = currentValues.map(v => Math.abs(v - newValue));
        const closestIndex = distances.indexOf(Math.min(...distances));
        newValues[closestIndex] = newValue;
      }
      handleValueChange(newValues);
    } else {
      handleValueChange(newValue);
    }
  }, [disabled, getValueFromPosition, isRangeMode, currentValues, handleValueChange]);
  
  // Handle keyboard navigation
  const handleKeyDown = useCallback((event: React.KeyboardEvent, thumbIndex?: number) => {
    if (disabled) return;
    
    let delta = 0;
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        delta = -step;
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        delta = step;
        break;
      case 'PageDown':
        delta = -step * 10;
        break;
      case 'PageUp':
        delta = step * 10;
        break;
      case 'Home':
        delta = min - (isRangeMode ? (currentValues?.[thumbIndex || 0] || min) : (currentValue || min));
        break;
      case 'End':
        delta = max - (isRangeMode ? (currentValues?.[thumbIndex || 0] || max) : (currentValue || max));
        break;
      default:
        return;
    }
    
    event.preventDefault();
    
    if (isRangeMode && currentValues) {
      const newValues = [...currentValues];
      const index = thumbIndex || 0;
      newValues[index] = Math.max(min, Math.min(max, newValues[index] + delta));
      handleValueChange(newValues);
    } else if (currentValue !== undefined) {
      const newValue = Math.max(min, Math.min(max, currentValue + delta));
      handleValueChange(newValue);
    }
  }, [disabled, step, min, max, isRangeMode, currentValues, currentValue, handleValueChange]);
  
  // Generate tick marks
  const generateTicks = useCallback(() => {
    if (ticks) return ticks;
    
    const tickCount = Math.min(11, Math.floor((max - min) / step) + 1);
    const tickStep = (max - min) / (tickCount - 1);
    
    return Array.from({ length: tickCount }, (_, i) => min + i * tickStep);
  }, [ticks, min, max, step]);
  
  const sizeClasses = {
    sm: 'vromm-slider--sm',
    md: 'vromm-slider--md',
    lg: 'vromm-slider--lg',
  };
  
  const variantClasses = {
    default: 'vromm-slider--default',
    success: 'vromm-slider--success',
    warning: 'vromm-slider--warning',
    error: 'vromm-slider--error',
  };
  
  const orientationClasses = {
    horizontal: 'vromm-slider--horizontal',
    vertical: 'vromm-slider--vertical',
  };
  
  return (
    <div className={cn('vromm-slider-container', className)}>
      {/* Label */}
      {label && (
        <label className="vromm-slider-label">
          {label}
        </label>
      )}
      
      {/* Slider */}
      <div
        ref={ref || sliderRef}
        className={cn(
          'vromm-slider',
          sizeClasses[size],
          variantClasses[variant],
          orientationClasses[orientation],
          disabled && 'vromm-slider--disabled',
          error && 'vromm-slider--error',
          isDragging && 'vromm-slider--dragging'
        )}
        data-orientation={orientation}
        {...props}
      >
        {/* Track */}
        <div
          ref={trackRef}
          className="vromm-slider-track"
          onPointerDown={handlePointerDown}
        >
          {/* Progress/Range */}
          {isRangeMode && currentValues ? (
            <div
              className="vromm-slider-range"
              style={{
                [orientation === 'horizontal' ? 'left' : 'bottom']: `${valueToPercent(Math.min(...currentValues))}%`,
                [orientation === 'horizontal' ? 'width' : 'height']: `${valueToPercent(Math.max(...currentValues)) - valueToPercent(Math.min(...currentValues))}%`,
              }}
            />
          ) : (
            <div
              className="vromm-slider-progress"
              style={{
                [orientation === 'horizontal' ? 'width' : 'height']: `${valueToPercent(currentValue || 0)}%`,
              }}
            />
          )}
          
          {/* Ticks */}
          {showTicks && (
            <div className="vromm-slider-ticks">
              {generateTicks().map((tick, index) => (
                <div
                  key={index}
                  className="vromm-slider-tick"
                  style={{
                    [orientation === 'horizontal' ? 'left' : 'bottom']: `${valueToPercent(tick)}%`,
                  }}
                />
              ))}
            </div>
          )}
          
          {/* Thumbs */}
          {isRangeMode && currentValues ? (
            currentValues.map((value, index) => (
              <div
                key={index}
                className={cn(
                  'vromm-slider-thumb',
                  activeThumb === index && 'vromm-slider-thumb--active'
                )}
                style={{
                  [orientation === 'horizontal' ? 'left' : 'bottom']: `${valueToPercent(value)}%`,
                }}
                onPointerDown={(e) => handlePointerDown(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                tabIndex={disabled ? -1 : 0}
                role="slider"
                aria-label={index === 0 ? ariaLabelMin : ariaLabelMax}
                aria-valuemin={min}
                aria-valuemax={max}
                aria-valuenow={value}
                aria-valuetext={formatValue(value)}
                aria-orientation={orientation}
                aria-disabled={disabled}
              />
            ))
          ) : (
            <div
              className={cn(
                'vromm-slider-thumb',
                activeThumb === 0 && 'vromm-slider-thumb--active'
              )}
              style={{
                [orientation === 'horizontal' ? 'left' : 'bottom']: `${valueToPercent(currentValue || 0)}%`,
              }}
              onPointerDown={(e) => handlePointerDown(e, 0)}
              onKeyDown={(e) => handleKeyDown(e, 0)}
              tabIndex={disabled ? -1 : 0}
              role="slider"
              aria-label={ariaLabel}
              aria-valuemin={min}
              aria-valuemax={max}
              aria-valuenow={currentValue}
              aria-valuetext={formatValue(currentValue || 0)}
              aria-orientation={orientation}
              aria-disabled={disabled}
            />
          )}
        </div>
        
        {/* Values */}
        {showValues && (
          <div className="vromm-slider-values">
            {isRangeMode && currentValues ? (
              currentValues.map((value, index) => (
                <div
                  key={index}
                  className="vromm-slider-value"
                  style={{
                    [orientation === 'horizontal' ? 'left' : 'bottom']: `${valueToPercent(value)}%`,
                  }}
                >
                  {formatValue(value)}
                </div>
              ))
            ) : (
              <div
                className="vromm-slider-value"
                style={{
                  [orientation === 'horizontal' ? 'left' : 'bottom']: `${valueToPercent(currentValue || 0)}%`,
                }}
              >
                {formatValue(currentValue || 0)}
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Helper text and error */}
      {(helperText || error) && (
        <div className="vromm-slider-helper">
          {error ? (
            <span className="vromm-slider-error">{error}</span>
          ) : (
            <span className="vromm-slider-helper-text">{helperText}</span>
          )}
        </div>
      )}
    </div>
  );
});

Slider.displayName = 'Slider'; 