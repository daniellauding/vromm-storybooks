import type { Meta, StoryObj } from '@storybook/react';
import { Button, LinkButton } from '../../src/components/Button/Button';
import { Play, Download, Trash2, Settings, ExternalLink } from 'lucide-react';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Button component following accessibility guidelines and design system patterns.

## Features
- Multiple variants: primary, secondary, destructive, success
- Multiple sizes: xs, sm, md, lg  
- Multiple fills: solid, outline, text
- Icon support with positioning
- Loading states
- Full width option
- Tooltip support
- Keyboard navigation
- Screen reader friendly
- Dark mode support

## Usage Guidelines

### Primary
Used for "call to action", i.e. triggering the main action. There should never be more than one on a page.

### Secondary  
The default button style for various actions. When next to primary, can be used for "Cancel" or "Abort".

### Destructive
Used for removing or deleting actions. Use sparingly due to dominant coloring.

### Success
Used for positive confirmation actions.
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'destructive', 'success'],
      description: 'Button variant',
    },
    size: {
      control: 'select', 
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Button size',
    },
    fill: {
      control: 'select',
      options: ['solid', 'outline', 'text'],
      description: 'Button fill style',
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Icon position',
    },
    iconOnly: {
      control: 'boolean',
      description: 'Show only icon (no text)',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width button',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'secondary',
    size: 'md',
    fill: 'solid',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <div className="space-y-4">
        <h3 className="font-medium text-sm text-neutral-600">Solid</h3>
        <div className="flex gap-2">
          <Button variant="primary" fill="solid">Primary</Button>
          <Button variant="secondary" fill="solid">Secondary</Button>
          <Button variant="destructive" fill="solid">Destructive</Button>
          <Button variant="success" fill="solid">Success</Button>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="font-medium text-sm text-neutral-600">Outline</h3>
        <div className="flex gap-2">
          <Button variant="primary" fill="outline">Primary</Button>
          <Button variant="secondary" fill="outline">Secondary</Button>
          <Button variant="destructive" fill="outline">Destructive</Button>
          <Button variant="success" fill="outline">Success</Button>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="font-medium text-sm text-neutral-600">Text</h3>
        <div className="flex gap-2">
          <Button variant="primary" fill="text">Primary</Button>
          <Button variant="secondary" fill="text">Secondary</Button>
          <Button variant="destructive" fill="text">Destructive</Button>
          <Button variant="success" fill="text">Success</Button>
        </div>
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button size="xs">Extra Small</Button>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
      
      <div className="flex items-center gap-2">
        <Button size="xs" iconOnly icon={Settings} tooltip="Settings" />
        <Button size="sm" iconOnly icon={Settings} tooltip="Settings" />
        <Button size="md" iconOnly icon={Settings} tooltip="Settings" />
        <Button size="lg" iconOnly icon={Settings} tooltip="Settings" />
      </div>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="font-medium text-sm text-neutral-600">Left Icons</h3>
        <div className="flex gap-2">
          <Button icon={Play} iconPosition="left">Play Video</Button>
          <Button icon={Download} iconPosition="left" variant="secondary">Download</Button>
          <Button icon={Trash2} iconPosition="left" variant="destructive">Delete</Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="font-medium text-sm text-neutral-600">Right Icons</h3>
        <div className="flex gap-2">
          <Button icon={ExternalLink} iconPosition="right">Open External</Button>
          <Button icon={Settings} iconPosition="right" variant="secondary">Settings</Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="font-medium text-sm text-neutral-600">Icon Only</h3>
        <div className="flex gap-2">
          <Button icon={Play} iconOnly tooltip="Play" />
          <Button icon={Download} iconOnly variant="secondary" tooltip="Download" />
          <Button icon={Settings} iconOnly variant="secondary" tooltip="Settings" />
          <Button icon={Trash2} iconOnly variant="destructive" tooltip="Delete" />
        </div>
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="font-medium text-sm text-neutral-600">States</h3>
        <div className="flex gap-2">
          <Button>Normal</Button>
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="font-medium text-sm text-neutral-600">Full Width</h3>
        <Button fullWidth>Full Width Button</Button>
      </div>
      
      <div className="space-y-2">
        <h3 className="font-medium text-sm text-neutral-600">Link Buttons</h3>
        <div className="flex gap-2">
          <LinkButton href="https://example.com">Link as Button</LinkButton>
          <LinkButton href="https://example.com" icon={ExternalLink} iconPosition="right">
            External Link
          </LinkButton>
        </div>
      </div>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    children: 'Button Text',
    variant: 'primary',
    size: 'md',
    fill: 'solid',
    iconPosition: 'left',
    iconOnly: false,
    fullWidth: false,
    loading: false,
    disabled: false,
  },
}; 