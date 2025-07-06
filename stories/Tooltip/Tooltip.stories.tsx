import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from '../../src/components/Tooltip';
import { Button } from '../../src/components/Button';
import { QuickIcon } from '../../src/components/Icon';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
    },
    variant: {
      control: 'select',
      options: ['default', 'dark', 'light', 'error', 'warning', 'success'],
    },
    maxWidth: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    delay: {
      control: 'number',
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: 'This is a helpful tooltip',
    children: <Button variant="primary">Hover me</Button>,
  },
};

export const Positions: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8 p-16">
      <div className="space-y-4">
        <h3 className="font-semibold">Top Positions</h3>
        <Tooltip content="Top tooltip" side="top">
          <Button variant="outline">Top</Button>
        </Tooltip>
        
        <Tooltip content="Top start alignment" side="top" align="start">
          <Button variant="outline">Top Start</Button>
        </Tooltip>
        
        <Tooltip content="Top end alignment" side="top" align="end">
          <Button variant="outline">Top End</Button>
        </Tooltip>
      </div>
      
      <div className="space-y-4">
        <h3 className="font-semibold">Bottom Positions</h3>
        <Tooltip content="Bottom tooltip" side="bottom">
          <Button variant="outline">Bottom</Button>
        </Tooltip>
        
        <Tooltip content="Left side tooltip" side="left">
          <Button variant="outline">Left</Button>
        </Tooltip>
        
        <Tooltip content="Right side tooltip" side="right">
          <Button variant="outline">Right</Button>
        </Tooltip>
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 p-8">
      <Tooltip content="Default variant tooltip" variant="default">
        <Button variant="secondary">Default</Button>
      </Tooltip>
      
      <Tooltip content="Dark variant tooltip" variant="dark">
        <Button variant="secondary">Dark</Button>
      </Tooltip>
      
      <Tooltip content="Light variant tooltip" variant="light">
        <Button variant="secondary">Light</Button>
      </Tooltip>
      
      <Tooltip content="Error variant tooltip" variant="error">
        <Button variant="destructive">Error</Button>
      </Tooltip>
      
      <Tooltip content="Warning variant tooltip" variant="warning">
        <Button variant="secondary">Warning</Button>
      </Tooltip>
      
      <Tooltip content="Success variant tooltip" variant="success">
        <Button variant="success">Success</Button>
      </Tooltip>
    </div>
  ),
};

export const MaxWidths: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 p-8">
      <Tooltip 
        content="This is a very short tooltip"
        maxWidth="xs"
      >
        <Button variant="outline">Extra Small</Button>
      </Tooltip>
      
      <Tooltip 
        content="This is a small tooltip with a bit more content"
        maxWidth="sm"
      >
        <Button variant="outline">Small</Button>
      </Tooltip>
      
      <Tooltip 
        content="This is a medium tooltip with quite a bit more content that should wrap nicely"
        maxWidth="md"
      >
        <Button variant="outline">Medium</Button>
      </Tooltip>
      
      <Tooltip 
        content="This is a large tooltip with a lot of content that demonstrates how the tooltip can contain longer explanations and still look good"
        maxWidth="lg"
      >
        <Button variant="outline">Large</Button>
      </Tooltip>
      
      <Tooltip 
        content="This is an extra large tooltip with extensive content that shows how much text you can include in a tooltip while maintaining readability and good visual hierarchy"
        maxWidth="xl"
      >
        <Button variant="outline">Extra Large</Button>
      </Tooltip>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex gap-4 p-8">
      <Tooltip content="Home page" variant="dark">
        <Button variant="secondary" iconOnly>
          <QuickIcon name="home" />
        </Button>
      </Tooltip>
      
      <Tooltip content="User profile" variant="light">
        <Button variant="secondary" iconOnly>
          <QuickIcon name="user" />
        </Button>
      </Tooltip>
      
      <Tooltip content="Search functionality" variant="default">
        <Button variant="secondary" iconOnly>
          <QuickIcon name="search" />
        </Button>
      </Tooltip>
      
      <Tooltip content="Delete this item" variant="error">
        <Button variant="destructive" iconOnly>
          <QuickIcon name="trash" />
        </Button>
      </Tooltip>
    </div>
  ),
};

export const DelaySettings: Story = {
  render: () => (
    <div className="flex gap-4 p-8">
      <Tooltip content="No delay tooltip" delay={0}>
        <Button variant="outline">No Delay</Button>
      </Tooltip>
      
      <Tooltip content="Fast tooltip" delay={200}>
        <Button variant="outline">Fast (200ms)</Button>
      </Tooltip>
      
      <Tooltip content="Normal tooltip" delay={500}>
        <Button variant="outline">Normal (500ms)</Button>
      </Tooltip>
      
      <Tooltip content="Slow tooltip" delay={1000}>
        <Button variant="outline">Slow (1000ms)</Button>
      </Tooltip>
    </div>
  ),
};

export const TriggerTypes: Story = {
  render: () => (
    <div className="flex gap-4 p-8">
      <Tooltip content="Hover only tooltip" showOnHover={true} showOnFocus={false}>
        <Button variant="outline">Hover Only</Button>
      </Tooltip>
      
      <Tooltip content="Focus only tooltip" showOnHover={false} showOnFocus={true}>
        <Button variant="outline">Focus Only</Button>
      </Tooltip>
      
      <Tooltip content="Both hover and focus" showOnHover={true} showOnFocus={true}>
        <Button variant="outline">Hover & Focus</Button>
      </Tooltip>
      
      <Tooltip content="This tooltip is disabled" disabled={true}>
        <Button variant="outline">Disabled Tooltip</Button>
      </Tooltip>
    </div>
  ),
};

export const CustomContent: Story = {
  render: () => (
    <div className="flex gap-4 p-8">
      <Tooltip 
        content={
          <div>
            <div className="font-semibold">Rich Content</div>
            <div className="text-sm opacity-90">This tooltip contains formatted content</div>
          </div>
        }
        variant="light"
        maxWidth="md"
      >
        <Button variant="primary">Rich Content</Button>
      </Tooltip>
      
      <Tooltip 
        content={
          <div className="flex items-center gap-2">
            <QuickIcon name="calendar" size="sm" />
            <span>Schedule meeting</span>
          </div>
        }
        variant="dark"
      >
        <Button variant="secondary">
          <QuickIcon name="calendar" />
          Calendar
        </Button>
      </Tooltip>
    </div>
  ),
};

export const RealWorldExamples: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <div>
        <h3 className="font-semibold mb-4">Form Field Help</h3>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Password</label>
          <Tooltip 
            content="Password must be at least 8 characters long and contain both letters and numbers"
            variant="light"
            maxWidth="sm"
          >
            <QuickIcon name="search" size="sm" variant="muted" />
          </Tooltip>
        </div>
      </div>
      
      <div>
        <h3 className="font-semibold mb-4">Action Buttons</h3>
        <div className="flex gap-2">
          <Tooltip content="Save changes" variant="success">
            <Button variant="success" size="sm" iconOnly>
              <QuickIcon name="plus" />
            </Button>
          </Tooltip>
          
          <Tooltip content="Cancel without saving" variant="default">
            <Button variant="secondary" size="sm" iconOnly>
              <QuickIcon name="close" />
            </Button>
          </Tooltip>
          
          <Tooltip content="Delete permanently" variant="error">
            <Button variant="destructive" size="sm" iconOnly>
              <QuickIcon name="trash" />
            </Button>
          </Tooltip>
        </div>
      </div>
      
      <div>
        <h3 className="font-semibold mb-4">Status Indicators</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm">Online</span>
            <Tooltip content="User is currently active and available" variant="success">
              <QuickIcon name="search" size="sm" variant="muted" />
            </Tooltip>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-sm">Away</span>
            <Tooltip content="User is idle for more than 10 minutes" variant="warning">
              <QuickIcon name="search" size="sm" variant="muted" />
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  ),
}; 