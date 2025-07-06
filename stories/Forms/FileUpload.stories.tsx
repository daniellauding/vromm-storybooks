import type { Meta, StoryObj } from '@storybook/react';
import { FileUpload } from '../../src/components/Forms/FileUpload';

const meta = {
  title: 'Components/Forms/FileUpload',
  component: FileUpload,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'dashed'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    multiple: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    error: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof FileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Upload documents',
    helperText: 'PNG, JPG, PDF up to 10MB',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      <FileUpload
        label="Default variant"
        variant="default"
        helperText="Standard file upload area"
      />
      <FileUpload
        label="Dashed variant"
        variant="dashed"
        helperText="Dashed border file upload area"
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      <FileUpload
        label="Small size"
        size="sm"
        helperText="Small file upload area"
      />
      <FileUpload
        label="Medium size"
        size="md"
        helperText="Medium file upload area (default)"
      />
      <FileUpload
        label="Large size"
        size="lg"
        helperText="Large file upload area"
      />
    </div>
  ),
};

export const MultipleFiles: Story = {
  args: {
    label: 'Upload multiple files',
    multiple: true,
    helperText: 'You can select multiple files at once',
  },
};

export const WithAcceptedTypes: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      <FileUpload
        label="Images only"
        accept="image/*"
        helperText="Only image files are accepted"
      />
      <FileUpload
        label="Documents only"
        accept=".pdf,.doc,.docx"
        helperText="Only PDF and Word documents are accepted"
      />
      <FileUpload
        label="Specific file types"
        accept=".jpg,.jpeg,.png,.pdf,.txt"
        helperText="JPG, PNG, PDF, and TXT files only"
      />
    </div>
  ),
};

export const WithMaxFileSize: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      <FileUpload
        label="Small file limit"
        maxSize={1024 * 1024} // 1MB
        helperText="Maximum file size: 1MB"
      />
      <FileUpload
        label="Medium file limit"
        maxSize={5 * 1024 * 1024} // 5MB
        helperText="Maximum file size: 5MB"
      />
      <FileUpload
        label="Large file limit"
        maxSize={10 * 1024 * 1024} // 10MB
        helperText="Maximum file size: 10MB"
      />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      <FileUpload
        label="Normal state"
        helperText="This is a normal file upload"
      />
      <FileUpload
        label="Error state"
        error={true}
        helperText="Please select a valid file"
      />
      <FileUpload
        label="Disabled state"
        disabled={true}
        helperText="This file upload is disabled"
      />
    </div>
  ),
};

export const WithCustomText: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      <FileUpload
        label="Custom upload text"
        uploadText="Click to upload or drag and drop"
        helperText="Custom upload instruction text"
      />
      <FileUpload
        label="Different upload text"
        uploadText="Select files from your device"
        helperText="Different upload instruction text"
      />
    </div>
  ),
};

export const ImageUpload: Story = {
  args: {
    label: 'Profile picture',
    accept: 'image/*',
    maxSize: 2 * 1024 * 1024, // 2MB
    helperText: 'PNG, JPG up to 2MB',
  },
};

export const DocumentUpload: Story = {
  args: {
    label: 'Upload resume',
    accept: '.pdf,.doc,.docx',
    maxSize: 5 * 1024 * 1024, // 5MB
    helperText: 'PDF, DOC, DOCX up to 5MB',
  },
};

export const MultipleImages: Story = {
  args: {
    label: 'Gallery photos',
    accept: 'image/*',
    multiple: true,
    maxSize: 5 * 1024 * 1024, // 5MB per file
    helperText: 'Select multiple images for your gallery',
  },
};

export const ErrorState: Story = {
  args: {
    label: 'Required upload',
    error: true,
    helperText: 'Please select a file to upload',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled file upload',
    disabled: true,
    helperText: 'File upload is currently disabled',
  },
};

export const DragAndDrop: Story = {
  args: {
    label: 'Drag and drop files',
    variant: 'dashed',
    uploadText: 'Drag files here or click to browse',
    helperText: 'Supports drag and drop functionality',
  },
}; 