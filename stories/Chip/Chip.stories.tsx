import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from '../../src/components/Chip/Chip';
import { X, Star, Check, Plus, Settings, User, Heart, Tag, Filter } from 'lucide-react';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile chip component for tags, filters, selections, and more. Features neutral colors by default with gray hover states and dark mode support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['neutral', 'primary', 'secondary', 'success', 'warning', 'error'],
      description: 'Chip color variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Chip size',
    },
    removable: {
      control: 'boolean',
      description: 'Show remove button',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    selected: {
      control: 'boolean',
      description: 'Selected state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

// Basic Examples
export const DefaultChip: Story = {
  args: {
    children: 'Default Chip',
  },
};

export const WithIcon: Story = {
  args: {
    children: 'With Icon',
    icon: Tag,
  },
};

export const Removable: Story = {
  args: {
    children: 'Removable',
    removable: true,
    onRemove: () => alert('Remove clicked'),
  },
};

// Variants
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Chip variant="neutral">Neutral</Chip>
      <Chip variant="primary">Primary</Chip>
      <Chip variant="secondary">Secondary</Chip>
      <Chip variant="success">Success</Chip>
      <Chip variant="warning">Warning</Chip>
      <Chip variant="error">Error</Chip>
    </div>
  ),
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Chip size="sm">Small</Chip>
      <Chip size="md">Medium</Chip>
      <Chip size="lg">Large</Chip>
    </div>
  ),
};

// With Icons
export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Chip icon={User} variant="primary">User</Chip>
      <Chip icon={Settings} variant="secondary">Settings</Chip>
      <Chip icon={Heart} variant="error">Favorite</Chip>
      <Chip icon={Star} variant="warning">Featured</Chip>
      <Chip icon={Check} variant="success">Completed</Chip>
      <Chip icon={Filter} variant="neutral">Filter</Chip>
    </div>
  ),
};

// Removable Chips
export const RemovableChips: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Chip removable onRemove={() => alert('Tag 1 removed')}>Tag 1</Chip>
      <Chip removable onRemove={() => alert('Tag 2 removed')} variant="primary">Tag 2</Chip>
      <Chip removable onRemove={() => alert('Tag 3 removed')} variant="success" icon={Check}>
        Completed
      </Chip>
    </div>
  ),
};

// States
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Chip>Default</Chip>
      <Chip selected>Selected</Chip>
      <Chip disabled>Disabled</Chip>
      <Chip disabled removable>Disabled + Removable</Chip>
    </div>
  ),
};

// Tag Filter Example
export const TagFilter: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Chip icon={Plus} variant="neutral">Add Filter</Chip>
      <Chip removable selected icon={User}>Team: Frontend</Chip>
      <Chip removable selected icon={Tag}>Status: Active</Chip>
      <Chip removable icon={Star}>Priority: High</Chip>
    </div>
  ),
};

// Dark Mode Preview
export const DarkModePreview: Story = {
  render: () => (
    <div 
      style={{ 
        padding: '20px', 
        backgroundColor: '#1a1a1a', 
        borderRadius: '8px',
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap'
      }}
      className="dark"
    >
      <Chip variant="neutral">Neutral</Chip>
      <Chip variant="primary">Primary</Chip>
      <Chip variant="success" icon={Check}>Success</Chip>
      <Chip variant="warning" removable>Warning</Chip>
      <Chip variant="error" selected>Error</Chip>
    </div>
  ),
}; 