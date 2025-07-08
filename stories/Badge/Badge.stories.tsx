import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../../src/components';
import { Heart, Star, User, Bell, MapPin, Wifi } from 'lucide-react';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Badge component for displaying small status indicators, notifications, or labels. **This is NOT a button** - it\'s a visual indicator only. Perfect for showing notification counts, status dots, or small labels.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline', 'success', 'warning'],
      description: 'Visual style variant'
    },
    size: {
      control: 'select', 
      options: ['sm', 'md', 'lg'],
      description: 'Size of the badge'
    },
    shape: {
      control: 'select',
      options: ['rounded', 'circular', 'dot'],
      description: 'Shape variant: rounded for text, circular for numbers/icons, dot for status indicators'
    },
    count: {
      control: 'text',
      description: 'Number or text to display (primarily for circular badges)'
    },
    children: {
      control: 'text',
      description: 'Content to display inside the badge'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default rounded badge for text labels
export const Default: Story = {
  args: {
    children: 'New',
    variant: 'default'
  }
};

// Notification counts (circular badges)
export const NotificationCounts: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2">
        <Bell className="w-6 h-6 text-gray-600" />
        <Badge shape="circular" count="3" variant="destructive" size="sm" />
      </div>
      <div className="flex items-center gap-2">
        <User className="w-6 h-6 text-gray-600" />
        <Badge shape="circular" count="12" variant="default" size="md" />
      </div>
      <div className="flex items-center gap-2">
        <Heart className="w-6 h-6 text-gray-600" />
        <Badge shape="circular" count="99+" variant="warning" size="lg" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Circular badges perfect for showing notification counts next to icons. Use `count` prop for numbers.'
      }
    }
  }
};

// Status dots for indicating states
export const StatusDots: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Badge shape="dot" variant="success" size="md" />
        <span className="text-sm text-gray-700">Online</span>
      </div>
      <div className="flex items-center gap-3">
        <Badge shape="dot" variant="warning" size="md" />
        <span className="text-sm text-gray-700">Away</span>
      </div>
      <div className="flex items-center gap-3">
        <Badge shape="dot" variant="destructive" size="md" />
        <span className="text-sm text-gray-700">Offline</span>
      </div>
      <div className="flex items-center gap-3">
        <Badge shape="dot" variant="outline" size="md" />
        <span className="text-sm text-gray-700">Unknown</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Small status dots perfect for indicating presence, connection status, or simple state indicators.'
      }
    }
  }
};

// Text labels (rounded badges)
export const TextLabels: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge variant="default">New</Badge>
      <Badge variant="success">Verified</Badge>
      <Badge variant="warning">Pending</Badge>
      <Badge variant="destructive">Error</Badge>
      <Badge variant="secondary">Draft</Badge>
      <Badge variant="outline">Beta</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Traditional pill-shaped badges for text labels, tags, or status messages.'
      }
    }
  }
};

// Icon indicators (circular with icons)
export const IconIndicators: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge shape="circular" variant="success" size="lg">
        <Wifi className="w-4 h-4" />
      </Badge>
      <Badge shape="circular" variant="warning" size="lg">
        <MapPin className="w-4 h-4" />
      </Badge>
      <Badge shape="circular" variant="destructive" size="lg">
        <Heart className="w-4 h-4" />
      </Badge>
      <Badge shape="circular" variant="outline" size="lg">
        <Star className="w-4 h-4" />
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Circular badges can contain single icons for visual indicators.'
      }
    }
  }
};

// Size variations
export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Text Labels (Rounded)</h4>
        <div className="flex items-center gap-3">
          <Badge size="sm">Small</Badge>
          <Badge size="md">Medium</Badge>
          <Badge size="lg">Large</Badge>
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Number Counts (Circular)</h4>
        <div className="flex items-center gap-3">
          <Badge shape="circular" count="5" size="sm" />
          <Badge shape="circular" count="12" size="md" />
          <Badge shape="circular" count="99+" size="lg" />
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Status Dots</h4>
        <div className="flex items-center gap-3">
          <Badge shape="dot" variant="success" size="sm" />
          <Badge shape="dot" variant="success" size="md" />
          <Badge shape="dot" variant="success" size="lg" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All badge shapes available in three sizes: small, medium, and large.'
      }
    }
  }
};

// Real-world usage examples
export const UsageExamples: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      {/* Navigation with notification count */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Navigation with Notifications</h4>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="text-sm">Notifications</span>
            <Badge shape="circular" count="5" variant="destructive" size="sm" />
          </div>
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-gray-600" />
            <span className="text-sm">Messages</span>
            <Badge shape="circular" count="2" variant="default" size="sm" />
          </div>
        </div>
      </div>

      {/* User status */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-gray-700 mb-3">User Status</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <span className="text-sm">John Doe</span>
            <Badge shape="dot" variant="success" size="sm" />
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <span className="text-sm">Jane Smith</span>
            <Badge shape="dot" variant="warning" size="sm" />
          </div>
        </div>
      </div>

      {/* Content tags */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Content Tags</h4>
        <div className="space-y-3">
          <div>
            <h5 className="text-sm font-medium">How to use React Hooks</h5>
            <div className="flex gap-2 mt-1">
              <Badge variant="default" size="sm">React</Badge>
              <Badge variant="secondary" size="sm">Tutorial</Badge>
              <Badge variant="success" size="sm">Beginner</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world examples showing how badges work as indicators in common UI patterns. Notice how they provide visual feedback without being interactive elements.'
      }
    }
  }
};

// Playground for testing
export const Playground: Story = {
  args: {
    children: 'Badge',
    variant: 'default',
    size: 'md',
    shape: 'rounded'
  }
}; 