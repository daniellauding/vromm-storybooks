import type { Meta, StoryObj } from '@storybook/react';
import { Icon, QuickIcon, icons } from '../../src/components/Icon';

const meta = {
  title: 'Components/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    variant: {
      control: 'select',
      options: ['default', 'muted', 'primary', 'secondary', 'success', 'warning', 'error', 'white'],
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'home',
    children: icons.home,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <QuickIcon name="home" size="xs" />
      <QuickIcon name="home" size="sm" />
      <QuickIcon name="home" size="md" />
      <QuickIcon name="home" size="lg" />
      <QuickIcon name="home" size="xl" />
      <QuickIcon name="home" size="2xl" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <QuickIcon name="user" variant="default" />
      <QuickIcon name="user" variant="muted" />
      <QuickIcon name="user" variant="primary" />
      <QuickIcon name="user" variant="secondary" />
      <QuickIcon name="user" variant="success" />
      <QuickIcon name="user" variant="warning" />
      <QuickIcon name="user" variant="error" />
      <div className="bg-gray-900 p-2 rounded">
        <QuickIcon name="user" variant="white" />
      </div>
    </div>
  ),
};



export const AllIcons: Story = {
  render: () => (
    <div className="grid grid-cols-6 gap-6 p-4">
      {Object.entries(icons).map(([name, iconContent]) => (
        <div key={name} className="flex flex-col items-center space-y-2">
          <QuickIcon name={name as keyof typeof icons} size="lg" />
          <span className="text-xs text-gray-600 text-center">{name}</span>
        </div>
      ))}
    </div>
  ),
};

export const WithCustomSVG: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon size="md" name="custom-star">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
      </Icon>
      <Icon size="md" name="custom-heart">
        <path d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.61C2.1283 5.6417 1.5487 7.04097 1.5487 8.5C1.5487 9.95903 2.1283 11.3583 3.16 12.39L12 21.23L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.06211 22.0329 6.39467C21.7563 5.72723 21.351 5.1208 20.84 4.61V4.61Z" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
      </Icon>
    </div>
  ),
};

export const InteractiveExample: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <QuickIcon name="search" size="md" />
        <input 
          type="text" 
          placeholder="Search..." 
          className="border rounded px-3 py-2"
        />
      </div>
      
      <div className="flex items-center gap-2">
        <QuickIcon name="user" size="md" />
        <span>John Doe</span>
      </div>
      
      <div className="flex items-center gap-2">
        <QuickIcon name="mail" size="md" />
        <span>john@example.com</span>
      </div>
      
      <div className="flex items-center gap-2">
        <QuickIcon name="phone" size="md" />
        <span>+1 (555) 123-4567</span>
      </div>
      
      <div className="flex items-center gap-2">
        <QuickIcon name="calendar" size="md" />
        <span>December 15, 2024</span>
      </div>
    </div>
  ),
}; 