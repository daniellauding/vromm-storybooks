import type { Meta, StoryObj } from '@storybook/react';
import { SystemMessage } from '../../src/components/SystemMessage/SystemMessage';
import { Button } from '../../src/components/Button/Button';
import { 
  AlertCircle, 
  CheckCircle, 
  Info, 
  AlertTriangle,
  Star,
  Gift,
  Bell
} from 'lucide-react';

const meta: Meta<typeof SystemMessage> = {
  title: 'Components/SystemMessage',
  component: SystemMessage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A flexible system message component for displaying promotional banners, alerts, and notifications with various styles and positioning options.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error', 'promotional', 'announcement'],
      description: 'Message variant/type',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Message size',
    },
    background: {
      control: 'select',
      options: ['solid', 'gradient', 'subtle'],
      description: 'Background style',
    },
    animation: {
      control: 'select',
      options: ['slide', 'fade', 'bounce', 'none'],
      description: 'Animation type',
    },
    sticky: {
      control: 'select',
      options: [false, 'top', 'bottom'],
      description: 'Sticky positioning',
    },
    dismissible: {
      control: 'boolean',
      description: 'Whether message can be dismissed',
    },
    showIcon: {
      control: 'boolean',
      description: 'Whether to show icon',
    },
    autoHide: {
      control: { type: 'number', min: 0, max: 10000, step: 1000 },
      description: 'Auto-hide delay in milliseconds (0 to disable)',
    },
    visible: {
      control: 'boolean',
      description: 'Whether message is visible',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SystemMessage>;

export const InfoMessage: Story = {
  args: {
    variant: 'info',
    message: 'System maintenance scheduled',
    description: 'We will be performing scheduled maintenance on Sunday at 2:00 AM UTC. Expected downtime is 30 minutes.',
    dismissible: true,
  },
};

export const SuccessMessage: Story = {
  args: {
    variant: 'success',
    message: 'Profile updated successfully',
    description: 'Your profile information has been saved and is now visible to other users.',
    dismissible: true,
  },
};

export const WarningMessage: Story = {
  args: {
    variant: 'warning',
    message: 'Your session will expire soon',
    description: 'Please save your work. Your session will expire in 5 minutes due to inactivity.',
    actions: [
      { id: 'extend', label: 'Extend Session', variant: 'primary' },
      { id: 'save', label: 'Save Now', variant: 'secondary' },
    ],
    dismissible: true,
  },
};

export const ErrorMessage: Story = {
  args: {
    variant: 'error',
    message: 'Failed to save changes',
    description: 'There was an error saving your changes. Please try again or contact support if the problem persists.',
    actions: [
      { id: 'retry', label: 'Try Again', variant: 'primary' },
      { id: 'contact', label: 'Contact Support', variant: 'secondary', external: true },
    ],
    dismissible: true,
  },
};

export const PromotionalMessage: Story = {
  args: {
    variant: 'promotional',
    message: 'Get early access',
    description: 'Be among the first to try Vromm and help shape the future of driver training.',
    actions: [
      { id: 'join', label: 'GET EARLY ACCESS', variant: 'primary' },
    ],
    showIcon: false,
    dismissible: true,
  },
};

export const AnnouncementMessage: Story = {
  args: {
    variant: 'announcement',
    message: 'New features available!',
    description: 'Check out our latest updates including improved route recommendations and better mobile experience.',
    actions: [
      { id: 'learn', label: 'Learn More', variant: 'primary' },
    ],
    icon: Bell,
    dismissible: true,
  },
};

export const StickyTop: Story = {
  args: {
    variant: 'promotional',
    message: 'Limited Time Offer',
    description: 'Get 50% off your first month. Offer expires in 48 hours.',
    actions: [
      { id: 'claim', label: 'Claim Offer', variant: 'primary' },
    ],
    sticky: 'top',
    showIcon: false,
    dismissible: true,
  },
};

export const StickyBottom: Story = {
  args: {
    variant: 'info',
    message: 'We use cookies to improve your experience',
    description: 'By continuing to use our site, you agree to our cookie policy.',
    actions: [
      { id: 'accept', label: 'Accept All', variant: 'primary' },
      { id: 'settings', label: 'Cookie Settings', variant: 'secondary' },
    ],
    sticky: 'bottom',
    dismissible: true,
  },
};

export const SmallSize: Story = {
  args: {
    variant: 'success',
    message: 'Settings saved',
    size: 'sm',
    dismissible: true,
  },
};

export const LargeSize: Story = {
  args: {
    variant: 'announcement',
    message: 'Welcome to Vromm 2.0!',
    description: 'We have completely redesigned the experience with new features, better performance, and an intuitive interface that makes learning to drive more enjoyable than ever.',
    actions: [
      { id: 'tour', label: 'Take a Tour', variant: 'primary' },
      { id: 'skip', label: 'Skip for Now', variant: 'secondary' },
    ],
    size: 'lg',
    icon: Star,
    dismissible: true,
  },
};

export const SubtleBackground: Story = {
  args: {
    variant: 'info',
    message: 'New version available',
    description: 'Version 2.1.0 is now available with bug fixes and performance improvements.',
    background: 'subtle',
    actions: [
      { id: 'update', label: 'Update Now', variant: 'primary' },
    ],
    dismissible: true,
  },
};

export const GradientBackground: Story = {
  args: {
    variant: 'promotional',
    message: 'Special Holiday Offer',
    description: 'Enjoy premium features at 40% off during our holiday sale.',
    background: 'gradient',
    actions: [
      { id: 'upgrade', label: 'Upgrade Now', variant: 'primary' },
    ],
    showIcon: false,
    dismissible: true,
  },
};

export const CustomIcon: Story = {
  args: {
    variant: 'promotional',
    message: 'Black Friday Sale',
    description: 'Huge discounts on all premium plans. Limited time only!',
    icon: Gift,
    actions: [
      { id: 'shop', label: 'Shop Now', variant: 'primary' },
    ],
    dismissible: true,
  },
};

export const NoIcon: Story = {
  args: {
    variant: 'info',
    message: 'System update completed',
    description: 'All systems are now running the latest version with improved security and performance.',
    showIcon: false,
    dismissible: true,
  },
};

export const NotDismissible: Story = {
  args: {
    variant: 'warning',
    message: 'Critical security update required',
    description: 'Please update your password to continue using the service.',
    actions: [
      { id: 'update', label: 'Update Password', variant: 'primary' },
    ],
    dismissible: false,
  },
};

export const AutoHide: Story = {
  args: {
    variant: 'success',
    message: 'File uploaded successfully',
    description: 'Your document has been uploaded and processed.',
    autoHide: 5000,
    dismissible: false,
  },
};

export const MultipleActions: Story = {
  args: {
    variant: 'announcement',
    message: 'New driver training program available',
    description: 'Discover our comprehensive training program designed for new drivers.',
    actions: [
      { id: 'enroll', label: 'Enroll Now', variant: 'primary' },
      { id: 'demo', label: 'Watch Demo', variant: 'secondary' },
      { id: 'info', label: 'More Info', variant: 'tertiary' },
    ],
    dismissible: true,
  },
};

export const FadeAnimation: Story = {
  args: {
    variant: 'info',
    message: 'New feature spotlight',
    description: 'Discover route recommendations powered by machine learning.',
    animation: 'fade',
    actions: [
      { id: 'try', label: 'Try It Now', variant: 'primary' },
    ],
    dismissible: true,
  },
};

export const BounceAnimation: Story = {
  args: {
    variant: 'success',
    message: 'Achievement unlocked!',
    description: 'You have completed your first practice route. Keep up the great work!',
    animation: 'bounce',
    icon: Star,
    actions: [
      { id: 'next', label: 'Next Route', variant: 'primary' },
    ],
    dismissible: true,
  },
};

export const NoAnimation: Story = {
  args: {
    variant: 'warning',
    message: 'Connection unstable',
    description: 'Your internet connection is unstable. Some features may not work properly.',
    animation: 'none',
    dismissible: true,
  },
};

export const InteractiveDemo: Story = {
  args: {
    variant: 'promotional',
    message: 'Get early access',
    description: 'Be among the first to try Vromm and help shape the future of driver training.',
    actions: [
      { id: 'join', label: 'GET EARLY ACCESS', variant: 'primary' },
    ],
    showIcon: false,
    dismissible: true,
  },
  render: (args) => {
    return (
      <div className="space-y-4 p-4">
        <h3 className="text-lg font-semibold">Interactive Demo</h3>
        <p className="text-gray-600">
          Try different variants and configurations:
        </p>
        <SystemMessage {...args} />
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-6">
          <Button 
            variant="secondary" 
            size="sm"
            onClick={() => window.location.reload()}
          >
            Reset Demo
          </Button>
        </div>
      </div>
    );
  },
}; 