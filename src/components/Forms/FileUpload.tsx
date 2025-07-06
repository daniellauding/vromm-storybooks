import React, { useState, useCallback, forwardRef } from 'react';
import { cn } from '../../utils/cn';
import './Forms.scss';

export interface FileUploadProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'dashed';
  label?: string;
  helperText?: string;
  error?: boolean;
  onFileSelect?: (files: FileList | null) => void;
  accept?: string;
  maxFiles?: number;
}

export const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  ({ 
    className,
    size = 'md',
    variant = 'default',
    label,
    helperText,
    error = false,
    onFileSelect,
    id,
    multiple = false,
    accept,
    maxFiles,
    ...props 
  }, ref) => {
    const [isDragOver, setIsDragOver] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    
    const fileUploadId = id || `fileupload-${Math.random().toString(36).substring(2)}`;

    const sizes = {
      sm: 'vromm-file-upload--sm',
      md: 'vromm-file-upload--md',
      lg: 'vromm-file-upload--lg'
    };

    const variants = {
      default: 'vromm-file-upload--default',
      dashed: 'vromm-file-upload--dashed'
    };

    const handleDragOver = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      
      const files = Array.from(e.dataTransfer.files);
      const validFiles = maxFiles ? files.slice(0, maxFiles) : files;
      
      setSelectedFiles(validFiles);
      if (onFileSelect) {
        const fileList = new DataTransfer();
        validFiles.forEach(file => fileList.items.add(file));
        onFileSelect(fileList.files);
      }
    }, [maxFiles, onFileSelect]);

    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files) {
        const fileArray = Array.from(files);
        setSelectedFiles(fileArray);
        if (onFileSelect) {
          onFileSelect(files);
        }
      }
    }, [onFileSelect]);

    const removeFile = useCallback((index: number) => {
      const newFiles = selectedFiles.filter((_, i) => i !== index);
      setSelectedFiles(newFiles);
      
      if (onFileSelect) {
        const fileList = new DataTransfer();
        newFiles.forEach(file => fileList.items.add(file));
        onFileSelect(fileList.files);
      }
    }, [selectedFiles, onFileSelect]);

    const errorStyles = error ? 'vromm-file-upload--error' : '';
    const dragOverStyles = isDragOver ? 'vromm-file-upload--drag' : '';

    return (
      <div className="vromm-form-field">
        {label && (
          <label 
            htmlFor={fileUploadId}
            className="vromm-form-label"
          >
            {label}
          </label>
        )}
        
        <div
          className={cn(
            'vromm-file-upload',
            variants[variant],
            sizes[size],
            errorStyles,
            dragOverStyles,
            className
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            id={fileUploadId}
            type="file"
            multiple={multiple}
            accept={accept}
            onChange={handleFileChange}
            className="vromm-file-upload-input"
            ref={ref}
            {...props}
          />
          
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="mt-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium text-blue-600 hover:text-blue-500">
                  Click to upload
                </span>
                {' '}or drag and drop
              </p>
              {accept && (
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  {accept.split(',').join(', ')}
                </p>
              )}
              {maxFiles && (
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  Max {maxFiles} file{maxFiles > 1 ? 's' : ''}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Selected Files */}
        {selectedFiles.length > 0 && (
          <div className="mt-4 space-y-2">
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="vromm-file-item"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="vromm-file-remove"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
        
        {helperText && (
          <p className={cn(
            'vromm-form-helper',
            error ? 'vromm-form-helper--error' : 'vromm-form-helper--normal'
          )}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

FileUpload.displayName = 'FileUpload'; 