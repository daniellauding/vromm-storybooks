import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from '../../src/components';
import { Star, User, X } from 'lucide-react';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Chip component for displaying tags, filters, or removable items.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'outline', 'filled']
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'error']
    },
    removable: {
      control: 'boolean'
    },
    disabled: {
      control: 'boolean'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Chip',
    variant: 'default',
    size: 'md'
  }
};

export const WithIcon: Story = {
  args: {
    children: 'User',
    icon: <User className="w-4 h-4" />,
    variant: 'outline'
  }
};

export const Removable: Story = {
  args: {
    children: 'Remove me',
    removable: true,
    onRemove: () => alert('Chip removed!')
  }
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Chip color="default">Default</Chip>
      <Chip color="primary">Primary</Chip>
      <Chip color="secondary">Secondary</Chip>
      <Chip color="success">Success</Chip>
      <Chip color="warning">Warning</Chip>
      <Chip color="error">Error</Chip>
    </div>
  )
}; 