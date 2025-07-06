import type { Meta, StoryObj } from '@storybook/react';
import { Button, LinkButton } from '../../src/components';
import { Play, Download, Plus, ArrowRight, Heart, Settings } from 'lucide-react';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Button component with brand colors, multiple variants, sizes, and interactive states. Features uppercase Rubik font, 12px border radius, and semantic color system.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'destructive', 'success'],
      description: 'Button color variant',
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
    fullWidth: {
      control: 'boolean',
      description: 'Whether button should take full width',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    iconOnly: {
      control: 'boolean',
      description: 'Show only icon (no text)',
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Icon position',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story with primary button
export const Default: Story = {
  args: {
    children: 'Get Started',
    variant: 'primary',
    size: 'md',
    fill: 'solid',
  },
};

// Brand Color Variants - Showcasing the new brand colors
export const BrandVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-page-title">Primary - Mint Green (#00ffb6)</h3>
        <div className="flex gap-4 items-center">
          <Button variant="primary" fill="solid">Primary Solid</Button>
          <Button variant="primary" fill="outline">Primary Outline</Button>
          <Button variant="primary" fill="text">Primary Text</Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-page-title">Secondary - Dark Teal (#004847)</h3>
        <div className="flex gap-4 items-center">
          <Button variant="secondary" fill="solid">Secondary Solid</Button>
          <Button variant="secondary" fill="outline">Secondary Outline</Button>
          <Button variant="secondary" fill="text">Secondary Text</Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-page-title">Tertiary - Light Mint (#e6f1ef)</h3>
        <div className="flex gap-4 items-center">
          <Button variant="tertiary" fill="solid">Tertiary Solid</Button>
          <Button variant="tertiary" fill="outline">Tertiary Outline</Button>
          <Button variant="tertiary" fill="text">Tertiary Text</Button>
        </div>
      </div>
    </div>
  ),
};

// All Sizes with brand styling
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 items-center">
        <Button variant="primary" size="xs">Extra Small</Button>
        <Button variant="primary" size="sm">Small</Button>
        <Button variant="primary" size="md">Medium</Button>
        <Button variant="primary" size="lg">Large</Button>
      </div>
      <div className="text-sm text-body-text">
        All buttons use Rubik font with 600 weight, italic style, and uppercase text transformation
      </div>
    </div>
  ),
};

// Icon buttons with brand colors
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-page-title">Icons with Text</h3>
        <div className="flex gap-4 items-center">
          <Button variant="primary" icon={Play} iconPosition="left">Play Video</Button>
          <Button variant="secondary" icon={Download} iconPosition="left">Download</Button>
          <Button variant="tertiary" icon={Plus} iconPosition="left">Add Item</Button>
          <Button variant="primary" icon={ArrowRight} iconPosition="right">Continue</Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-page-title">Icon Only</h3>
        <div className="flex gap-4 items-center">
          <Button variant="primary" icon={Heart} iconOnly tooltip="Like" />
          <Button variant="secondary" icon={Settings} iconOnly tooltip="Settings" />
          <Button variant="tertiary" icon={Plus} iconOnly tooltip="Add" />
        </div>
      </div>
    </div>
  ),
};

// Interactive States
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-page-title">Interactive States</h3>
        <div className="flex gap-4 items-center">
          <Button variant="primary">Normal</Button>
          <Button variant="primary" disabled>Disabled</Button>
          <Button variant="primary" loading>Loading</Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-page-title">Hover & Focus States</h3>
        <div className="text-sm text-body-text space-y-1">
          <p>• Primary: #00ffb6 → #00e1a1 on hover</p>
          <p>• Secondary: #004847 → #003936 on hover</p>
          <p>• Tertiary: #e6f1ef → #d1e7e3 on hover</p>
          <p>• All buttons have 12px border radius (rounded-xl)</p>
        </div>
      </div>
    </div>
  ),
};

// Dark Mode Preview (will work with dark mode toggle)
export const DarkModePreview: Story = {
  render: () => (
    <div className="p-6 bg-neutral-900 text-white rounded-lg">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Dark Mode</h3>
        <div className="flex gap-4 items-center">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="tertiary">Tertiary</Button>
        </div>
        <div className="text-sm text-neutral-300">
          In dark mode, tertiary buttons use dark background (#1a2e2c) with mint text
        </div>
      </div>
    </div>
  ),
};

// Full Width
export const FullWidth: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-4">
      <Button variant="primary" fullWidth>Full Width Primary</Button>
      <Button variant="secondary" fullWidth>Full Width Secondary</Button>
      <Button variant="tertiary" fullWidth>Full Width Tertiary</Button>
    </div>
  ),
};

// Legacy variants (keeping for backward compatibility)
export const LegacyVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-page-title">Legacy Variants (Still Available)</h3>
        <div className="flex gap-4 items-center">
          <Button variant="destructive">Destructive</Button>
          <Button variant="success">Success</Button>
        </div>
      </div>
    </div>
  ),
};

// Link Buttons
export const LinkButtons: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-page-title">Link Buttons</h3>
        <div className="flex gap-4 items-center">
          <LinkButton variant="primary" href="#" icon={ArrowRight} iconPosition="right">
            Learn More
          </LinkButton>
          <LinkButton variant="secondary" href="#">
            Documentation
          </LinkButton>
          <LinkButton variant="tertiary" href="#">
            View Details
          </LinkButton>
        </div>
      </div>
    </div>
  ),
};

// Brand Guidelines
export const BrandGuidelines: Story = {
  render: () => (
    <div className="max-w-4xl space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-page-title">Vromm Button Brand Guidelines</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-page-title">Colors</h3>
            <div className="space-y-2 text-sm text-body-text">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: '#00ffb6' }}></div>
                <span>Primary: #00ffb6 (Mint Green)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: '#004847' }}></div>
                <span>Secondary: #004847 (Dark Teal)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded border" style={{ backgroundColor: '#e6f1ef' }}></div>
                <span>Tertiary: #e6f1ef (Light Mint)</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-page-title">Typography</h3>
            <div className="space-y-1 text-sm text-body-text">
              <p>• Font: Rubik</p>
              <p>• Weight: 600 (Semi-bold)</p>
              <p>• Style: Italic</p>
              <p>• Transform: Uppercase</p>
              <p>• Border Radius: 12px</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-neutral-50 rounded-lg">
          <h4 className="font-semibold text-page-title mb-2">Usage Examples</h4>
          <div className="flex gap-4 items-center">
            <Button variant="primary" icon={Play}>GET STARTED</Button>
            <Button variant="secondary" icon={Download}>DOWNLOAD</Button>
            <Button variant="tertiary" icon={Plus}>ADD ITEM</Button>
          </div>
        </div>
      </div>
    </div>
  ),
}; 