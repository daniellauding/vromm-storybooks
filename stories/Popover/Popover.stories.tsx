import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Popover, PopoverHeader, PopoverContent, PopoverFooter } from '../../src/components/Popover';
import { Button } from '../../src/components/Button';
import { QuickIcon } from '../../src/components/Icon';

const meta = {
  title: 'Components/Popover',
  component: Popover,
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
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    showArrow: {
      control: 'boolean',
    },
    interactive: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Popover
      trigger={<Button variant="primary">Open Popover</Button>}
    >
      <PopoverHeader>
        About this feature
      </PopoverHeader>
      <PopoverContent>
        <p>This is a popover with interactive content. You can click inside it and it won't close automatically.</p>
        <p className="mt-2 text-sm text-gray-600">Perfect for forms, detailed information, or complex interactions.</p>
      </PopoverContent>
      <PopoverFooter>
        <Button variant="outline" size="sm">Cancel</Button>
        <Button variant="primary" size="sm">Continue</Button>
      </PopoverFooter>
    </Popover>
  ),
};

export const Positions: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8 p-16">
      <div className="space-y-4">
        <h3 className="font-semibold">Top Positions</h3>
        <Popover
          side="top"
          trigger={<Button variant="outline">Top</Button>}
        >
          <PopoverContent>
            <p>Popover positioned on top</p>
          </PopoverContent>
        </Popover>
        
        <Popover
          side="top"
          align="start"
          trigger={<Button variant="outline">Top Start</Button>}
        >
          <PopoverContent>
            <p>Top start alignment</p>
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="space-y-4">
        <h3 className="font-semibold">Side Positions</h3>
        <Popover
          side="right"
          trigger={<Button variant="outline">Right</Button>}
        >
          <PopoverContent>
            <p>Popover on the right side</p>
          </PopoverContent>
        </Popover>
        
        <Popover
          side="left"
          trigger={<Button variant="outline">Left</Button>}
        >
          <PopoverContent>
            <p>Popover on the left side</p>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4 p-8">
      <Popover
        size="sm"
        trigger={<Button variant="outline">Small</Button>}
      >
        <PopoverHeader>Small Popover</PopoverHeader>
        <PopoverContent>
          <p>This is a small popover with minimal content.</p>
        </PopoverContent>
      </Popover>
      
      <Popover
        size="md"
        trigger={<Button variant="outline">Medium</Button>}
      >
        <PopoverHeader>Medium Popover</PopoverHeader>
        <PopoverContent>
          <p>This is a medium-sized popover with more content space for additional information and interactions.</p>
        </PopoverContent>
      </Popover>
      
      <Popover
        size="lg"
        trigger={<Button variant="outline">Large</Button>}
      >
        <PopoverHeader>Large Popover</PopoverHeader>
        <PopoverContent>
          <p>This is a large popover that can contain quite a bit of content, forms, or complex layouts.</p>
          <div className="mt-3 p-3 bg-gray-50 rounded">
            <h4 className="font-medium mb-2">Example Content</h4>
            <p className="text-sm text-gray-600">Large popovers are perfect for detailed explanations, forms, or rich content presentations.</p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

export const WithForm: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <Popover
        open={isOpen}
        onOpenChange={setIsOpen}
        trigger={<Button variant="primary">Edit Profile</Button>}
        size="lg"
      >
        <PopoverHeader showCloseButton onClose={() => setIsOpen(false)}>
          Edit Profile
        </PopoverHeader>
        <PopoverContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                defaultValue="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input 
                type="email" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                defaultValue="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Bio</label>
              <textarea 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                rows={3}
                defaultValue="Software developer passionate about creating great user experiences."
              />
            </div>
          </div>
        </PopoverContent>
        <PopoverFooter>
          <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={() => setIsOpen(false)}>
            Save Changes
          </Button>
        </PopoverFooter>
      </Popover>
    );
  },
};

export const HelpPopover: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium">Password</label>
      <Popover
        trigger={
          <button className="text-gray-400 hover:text-gray-600">
            <QuickIcon name="search" size="sm" />
          </button>
        }
        side="top"
        size="md"
      >
        <PopoverHeader>Password Requirements</PopoverHeader>
        <PopoverContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <QuickIcon name="plus" size="xs" className="text-green-500" />
              At least 8 characters long
            </li>
            <li className="flex items-center gap-2">
              <QuickIcon name="plus" size="xs" className="text-green-500" />
              Contains uppercase and lowercase letters
            </li>
            <li className="flex items-center gap-2">
              <QuickIcon name="plus" size="xs" className="text-green-500" />
              Contains at least one number
            </li>
            <li className="flex items-center gap-2">
              <QuickIcon name="plus" size="xs" className="text-green-500" />
              Contains at least one special character
            </li>
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

export const ControlledPopover: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsOpen(true)}>
            Open Popover
          </Button>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Close Popover
          </Button>
        </div>
        
        <Popover
          open={isOpen}
          onOpenChange={setIsOpen}
          trigger={<Button variant="primary">Controlled Popover</Button>}
        >
          <PopoverHeader showCloseButton onClose={() => setIsOpen(false)}>
            Controlled Popover
          </PopoverHeader>
          <PopoverContent>
            <p>This popover's open state is controlled by external buttons.</p>
            <p className="mt-2 text-sm text-gray-600">
              Current state: {isOpen ? 'Open' : 'Closed'}
            </p>
          </PopoverContent>
        </Popover>
      </div>
    );
  },
};

export const NonInteractive: Story = {
  render: () => (
    <Popover
      trigger={<Button variant="outline">Hover for Info</Button>}
      interactive={false}
      showArrow={false}
    >
      <PopoverContent>
        <p className="text-sm">This popover is non-interactive and will close when you move your mouse away.</p>
      </PopoverContent>
    </Popover>
  ),
};

export const RealWorldExamples: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <div>
        <h3 className="font-semibold mb-4">User Settings</h3>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
            JD
          </div>
          <div>
            <div className="font-medium">John Doe</div>
            <div className="text-sm text-gray-500">john@example.com</div>
          </div>
          <Popover
            trigger={
              <Button variant="outline" size="sm">
                <QuickIcon name="user" size="sm" />
              </Button>
            }
            align="end"
          >
            <PopoverHeader>Account Settings</PopoverHeader>
            <PopoverContent>
              <div className="space-y-3">
                <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 flex items-center gap-2">
                  <QuickIcon name="user" size="sm" />
                  Edit Profile
                </button>
                <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 flex items-center gap-2">
                  <QuickIcon name="user" size="sm" />
                  Privacy Settings
                </button>
                <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 flex items-center gap-2">
                  <QuickIcon name="mail" size="sm" />
                  Notifications
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <div>
        <h3 className="font-semibold mb-4">Quick Actions</h3>
        <div className="flex gap-2">
          <Popover
            trigger={
              <Button variant="primary">
                <QuickIcon name="plus" size="sm" />
                New
              </Button>
            }
          >
            <PopoverHeader>Create New</PopoverHeader>
            <PopoverContent>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 flex items-center gap-2">
                  <QuickIcon name="home" size="sm" />
                  New Project
                </button>
                <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 flex items-center gap-2">
                  <QuickIcon name="calendar" size="sm" />
                  New Event
                </button>
                <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 flex items-center gap-2">
                  <QuickIcon name="user" size="sm" />
                  New Team
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  ),
}; 