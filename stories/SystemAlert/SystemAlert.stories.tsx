import type { Meta, StoryObj } from '@storybook/react';
import { SystemAlert } from '../../src/components/SystemAlert/SystemAlert';
import { Info, CheckCircle, AlertTriangle, XCircle, Megaphone, Sparkles } from 'lucide-react';

const meta: Meta<typeof SystemAlert> = {
  title: 'Components/SystemAlert',
  component: SystemAlert,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'System alert/banner component for displaying important messages, announcements, and system status updates.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error', 'announcement'],
      description: 'Alert variant style',
    },
    position: {
      control: 'select',
      options: ['top', 'bottom'],
      description: 'Alert positioning',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Alert size',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Layout orientation',
    },
    dismissible: {
      control: 'boolean',
      description: 'Whether the alert can be dismissed',
    },
    sticky: {
      control: 'boolean',
      description: 'Whether the alert is sticky positioned',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SystemAlert>;

// Early Access Banner (like in Vromm's design)
export const EarlyAccessBanner: Story = {
  args: {
    variant: 'announcement',
    message: 'Vromm is now in early access',
    description: 'Join our beta program and be among the first to experience the future of driver education.',
    action: {
      label: 'Join Beta',
      variant: 'primary',
      onClick: () => console.log('Join beta clicked'),
    },
    position: 'top',
    sticky: true,
    size: 'md',
    dismissible: true,
    className: 'vromm-system-alert--vromm-style',
  },
};

// Info Alert
export const InfoAlert: Story = {
  args: {
    variant: 'info',
    message: 'System maintenance scheduled',
    description: 'We will be performing scheduled maintenance on Sunday at 2:00 AM UTC.',
    icon: Info,
    action: {
      label: 'Learn More',
      variant: 'secondary',
      onClick: () => console.log('Learn more clicked'),
    },
    dismissible: true,
  },
};

// Success Alert
export const SuccessAlert: Story = {
  args: {
    variant: 'success',
    message: 'Update completed successfully',
    description: 'All systems are now running the latest version.',
    icon: CheckCircle,
    dismissible: true,
    autoHide: 5000,
  },
};

// Warning Alert
export const WarningAlert: Story = {
  args: {
    variant: 'warning',
    message: 'Limited functionality',
    description: 'Some features may be temporarily unavailable due to high traffic.',
    icon: AlertTriangle,
    action: {
      label: 'Status Page',
      variant: 'secondary',
      href: '/status',
    },
    dismissible: true,
  },
};

// Error Alert
export const ErrorAlert: Story = {
  args: {
    variant: 'error',
    message: 'Service unavailable',
    description: 'We are experiencing technical difficulties. Please try again later.',
    icon: XCircle,
    action: {
      label: 'Retry',
      variant: 'primary',
      onClick: () => console.log('Retry clicked'),
    },
    dismissible: false,
  },
};

// Announcement with Custom Styling
export const ProductLaunch: Story = {
  args: {
    variant: 'announcement',
    message: '🚗 New Feature: Route Analytics',
    description: 'Discover insights about your driving progress with our new analytics dashboard.',
    icon: Sparkles,
    action: {
      label: 'Explore Now',
      variant: 'primary',
      onClick: () => console.log('Explore clicked'),
    },
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    textColor: 'white',
    size: 'lg',
    dismissible: true,
  },
};

// Compact Alert
export const CompactAlert: Story = {
  args: {
    variant: 'info',
    message: 'New routes available in your area',
    size: 'sm',
    action: {
      label: 'View',
      variant: 'tertiary',
      onClick: () => console.log('View clicked'),
    },
    dismissible: true,
  },
};

// Bottom Positioned
export const BottomAlert: Story = {
  args: {
    variant: 'success',
    message: 'Changes saved automatically',
    position: 'bottom',
    size: 'sm',
    dismissible: false,
    autoHide: 3000,
  },
};

// Vertical Layout
export const VerticalLayout: Story = {
  args: {
    variant: 'announcement',
    message: 'Special Offer: Premium Features',
    description: 'Upgrade to Premium and get access to advanced route planning, detailed analytics, and priority support.',
    orientation: 'vertical',
    action: {
      label: 'Upgrade Now',
      variant: 'primary',
      onClick: () => console.log('Upgrade clicked'),
    },
    icon: Megaphone,
    size: 'lg',
    dismissible: true,
  },
};

// Custom Content
export const WithCustomContent: Story = {
  args: {
    variant: 'info',
    message: 'Multiple updates available',
    description: 'Several new features and improvements are ready to install.',
    dismissible: true,
    children: (
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
        <button
          onClick={() => console.log('Update all')}
          style={{
            padding: '0.25rem 0.75rem',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '0.375rem',
            color: 'white',
            fontSize: '0.875rem',
            cursor: 'pointer',
          }}
        >
          Update All
        </button>
        <button
          onClick={() => console.log('View details')}
          style={{
            padding: '0.25rem 0.75rem',
            backgroundColor: 'transparent',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '0.375rem',
            color: 'white',
            fontSize: '0.875rem',
            cursor: 'pointer',
          }}
        >
          Details
        </button>
      </div>
    ),
  },
};

// Controlled Alert (for testing show/hide)
export const ControlledAlert: Story = {
  args: {
    variant: 'warning',
    message: 'This alert is controlled externally',
    description: 'Use the controls below to show/hide this alert.',
    show: true,
    onDismiss: () => console.log('Alert dismissed'),
    dismissible: true,
  },
  argTypes: {
    show: {
      control: 'boolean',
      description: 'Control alert visibility',
    },
  },
}; 