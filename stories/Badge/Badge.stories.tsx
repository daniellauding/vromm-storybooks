import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../../src/components';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Badge component for displaying small pieces of information, status indicators, or labels.'
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
    children: {
      control: 'text',
      description: 'Badge content'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
    variant: 'default',
    size: 'md'
  }
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different visual variants of the Badge component using brand colors.'
      }
    }
  }
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different sizes of badges for various use cases.'
      }
    }
  }
};

export const UseCases: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span>Status:</span>
        <Badge variant="success">Active</Badge>
        <Badge variant="warning">Pending</Badge>
        <Badge variant="destructive">Inactive</Badge>
      </div>
      
      <div className="flex items-center gap-2">
        <span>Priority:</span>
        <Badge variant="destructive">High</Badge>
        <Badge variant="warning">Medium</Badge>
        <Badge variant="secondary">Low</Badge>
      </div>
      
      <div className="flex items-center gap-2">
        <span>Categories:</span>
        <Badge variant="outline">Design</Badge>
        <Badge variant="outline">Development</Badge>
        <Badge variant="outline">Testing</Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common use cases for badges including status indicators, priority levels, and categories.'
      }
    }
  }
};

export const Interactive: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge 
        role="button" 
        tabIndex={0}
        className="cursor-pointer hover:shadow-md transition-shadow"
        variant="outline"
      >
        Clickable Badge
      </Badge>
      <Badge variant="secondary">
        Count: 42
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive badges that can be made clickable or display dynamic content.'
      }
    }
  }
}; 