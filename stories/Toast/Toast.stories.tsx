import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Toast, ToastProvider, useToast } from '../../src/components/Toast';
import { Button } from '../../src/components/Button';
import { QuickIcon } from '../../src/components/Icon';

const meta = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'error', 'warning', 'info'],
    },
    position: {
      control: 'select',
      options: ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'],
    },
    duration: {
      control: 'number',
    },
    showCloseButton: {
      control: 'boolean',
    },
    showIcon: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Toast variant="default">
      This is a default toast message
    </Toast>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <Toast variant="default">
        Default toast message
      </Toast>
      
      <Toast variant="success" title="Success!">
        Your changes have been saved successfully.
      </Toast>
      
      <Toast variant="error" title="Error">
        Something went wrong. Please try again.
      </Toast>
      
      <Toast variant="warning" title="Warning">
        Please review your settings before continuing.
      </Toast>
      
      <Toast variant="info" title="Information">
        New features are now available in your dashboard.
      </Toast>
    </div>
  ),
};

export const WithActions: Story = {
  render: () => (
    <div className="space-y-4">
      <Toast 
        variant="success" 
        title="File uploaded"
        action={<Button variant="outline" size="sm">View</Button>}
      >
        Your file has been uploaded successfully.
      </Toast>
      
      <Toast 
        variant="info" 
        title="Update available"
        action={<Button variant="primary" size="sm">Update</Button>}
      >
        A new version is available for download.
      </Toast>
    </div>
  ),
};

const ToastDemo = () => {
  const { addToast, clearAllToasts } = useToast();
  
  const showToast = (variant: 'default' | 'success' | 'error' | 'warning' | 'info') => {
    const messages = {
      default: 'This is a default message',
      success: 'Operation completed successfully!',
      error: 'An error occurred while processing',
      warning: 'Please check your input',
      info: 'Here is some useful information',
    };
    
    addToast({
      variant,
      title: variant.charAt(0).toUpperCase() + variant.slice(1),
      children: messages[variant],
      duration: 5000,
    });
  };
  
  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        <Button onClick={() => showToast('default')} variant="outline">
          Default Toast
        </Button>
        <Button onClick={() => showToast('success')} variant="success">
          Success Toast
        </Button>
        <Button onClick={() => showToast('error')} variant="destructive">
          Error Toast
        </Button>
        <Button onClick={() => showToast('warning')} variant="secondary">
          Warning Toast
        </Button>
        <Button onClick={() => showToast('info')} variant="outline">
          Info Toast
        </Button>
      </div>
      
      <div className="flex gap-2">
        <Button onClick={clearAllToasts} variant="outline" size="sm">
          Clear All
        </Button>
      </div>
    </div>
  );
};

export const Interactive: Story = {
  render: () => (
    <ToastProvider>
      <ToastDemo />
    </ToastProvider>
  ),
};

export const Positions: Story = {
  render: () => {
    const [position, setPosition] = useState<'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'>('top-right');
    
    return (
      <ToastProvider defaultPosition={position}>
        <div className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            <Button 
              onClick={() => setPosition('top-right')}
              variant={position === 'top-right' ? 'primary' : 'outline'}
              size="sm"
            >
              Top Right
            </Button>
            <Button 
              onClick={() => setPosition('top-left')}
              variant={position === 'top-left' ? 'primary' : 'outline'}
              size="sm"
            >
              Top Left
            </Button>
            <Button 
              onClick={() => setPosition('bottom-right')}
              variant={position === 'bottom-right' ? 'primary' : 'outline'}
              size="sm"
            >
              Bottom Right
            </Button>
            <Button 
              onClick={() => setPosition('bottom-left')}
              variant={position === 'bottom-left' ? 'primary' : 'outline'}
              size="sm"
            >
              Bottom Left
            </Button>
          </div>
          
          <ToastDemo />
        </div>
      </ToastProvider>
    );
  },
};

export const CustomIcons: Story = {
  render: () => (
    <div className="space-y-4">
      <Toast 
        variant="success" 
        icon={<QuickIcon name="plus" className="text-green-500" />}
        title="Custom Icon"
      >
        This toast uses a custom icon instead of the default.
      </Toast>
      
      <Toast 
        variant="info" 
        showIcon={false}
        title="No Icon"
      >
        This toast has no icon at all.
      </Toast>
    </div>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Toast 
      variant="info" 
      title="Detailed Information"
      action={<Button variant="outline" size="sm">Learn More</Button>}
    >
      This is a longer toast message that demonstrates how the component handles multiple lines of text. 
      It can contain quite a bit of information while still maintaining good readability and visual hierarchy.
    </Toast>
  ),
};

export const RealWorldExamples: Story = {
  render: () => (
    <ToastProvider>
      <div className="space-y-8 p-8">
        <div>
          <h3 className="font-semibold mb-4">Form Submission</h3>
          <Button 
            onClick={() => {
              const { addToast } = useToast();
              addToast({
                variant: 'success',
                title: 'Profile updated',
                children: 'Your profile information has been saved.',
                action: <Button variant="outline" size="sm">View Profile</Button>,
              });
            }}
          >
            Save Profile
          </Button>
        </div>
        
        <div>
          <h3 className="font-semibold mb-4">File Operations</h3>
          <div className="flex gap-2">
            <Button 
              variant="primary"
              onClick={() => {
                const { addToast } = useToast();
                addToast({
                  variant: 'info',
                  title: 'Upload started',
                  children: 'Your file is being uploaded...',
                  duration: 2000,
                });
                
                setTimeout(() => {
                  addToast({
                    variant: 'success',
                    title: 'Upload complete',
                    children: 'File uploaded successfully!',
                    action: <Button variant="outline" size="sm">View File</Button>,
                  });
                }, 2500);
              }}
            >
              Upload File
            </Button>
          </div>
        </div>
      </div>
    </ToastProvider>
  ),
}; 