import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarImage, AvatarFallback, AvatarGroup } from '../../src/components/Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Data Display/Avatar',
  component: Avatar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Avatar component for displaying user profile pictures with fallback support for cases without avatars.'
      }
    }
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Avatar size'
    },
    variant: {
      control: 'select',
      options: ['circular', 'rounded', 'square'],
      description: 'Avatar shape'
    },
    status: {
      control: 'select',
      options: ['online', 'offline', 'away', 'busy'],
      description: 'Status indicator'
    },
    statusPosition: {
      control: 'select',
      options: ['top-right', 'bottom-right', 'top-left', 'bottom-left'],
      description: 'Status indicator position'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    alt: 'John Doe',
    size: 'md',
    variant: 'circular'
  }
};

export const WithoutAvatar: Story = {
  args: {
    fallback: 'Daniel Lauding test',
    size: 'md',
    variant: 'circular'
  },
  render: (args) => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Fallback with Initials</h4>
        <Avatar {...args} />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Fallback with Icon</h4>
        <Avatar size={args.size} variant={args.variant} showFallbackIcon />
      </div>
    </div>
  )
};

export const RouteCreators: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Route Creators</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Avatar 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
              fallback="Daniel Lauding test"
              size="lg"
              status="online"
            />
            <div>
              <div className="font-semibold">Daniel Lauding test</div>
              <div className="text-sm text-gray-600">Route Creator • Active</div>
              <div className="text-xs text-gray-500">Created 15 routes</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Avatar 
              fallback="Sarah Johnson"
              size="lg"
              status="away"
            />
            <div>
              <div className="font-semibold">Sarah Johnson</div>
              <div className="text-sm text-gray-600">Route Creator • Away</div>
              <div className="text-xs text-gray-500">Created 8 routes</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Avatar 
              fallback="Mike Wilson"
              size="lg"
              status="offline"
            />
            <div>
              <div className="font-semibold">Mike Wilson</div>
              <div className="text-sm text-gray-600">Route Creator • Offline</div>
              <div className="text-xs text-gray-500">Created 23 routes</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-md font-medium mb-3">With Images</h4>
        <div className="flex items-end gap-4">
          <div className="text-center">
            <Avatar 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
              size="xs"
            />
            <div className="text-xs mt-1">xs</div>
          </div>
          <div className="text-center">
            <Avatar 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
              size="sm"
            />
            <div className="text-xs mt-1">sm</div>
          </div>
          <div className="text-center">
            <Avatar 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
              size="md"
            />
            <div className="text-xs mt-1">md</div>
          </div>
          <div className="text-center">
            <Avatar 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
              size="lg"
            />
            <div className="text-xs mt-1">lg</div>
          </div>
          <div className="text-center">
            <Avatar 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
              size="xl"
            />
            <div className="text-xs mt-1">xl</div>
          </div>
          <div className="text-center">
            <Avatar 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
              size="2xl"
            />
            <div className="text-xs mt-1">2xl</div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium mb-3">Without Images (Fallbacks)</h4>
        <div className="flex items-end gap-4">
          <div className="text-center">
            <Avatar fallback="DL" size="xs" />
            <div className="text-xs mt-1">xs</div>
          </div>
          <div className="text-center">
            <Avatar fallback="DL" size="sm" />
            <div className="text-xs mt-1">sm</div>
          </div>
          <div className="text-center">
            <Avatar fallback="DL" size="md" />
            <div className="text-xs mt-1">md</div>
          </div>
          <div className="text-center">
            <Avatar fallback="DL" size="lg" />
            <div className="text-xs mt-1">lg</div>
          </div>
          <div className="text-center">
            <Avatar fallback="DL" size="xl" />
            <div className="text-xs mt-1">xl</div>
          </div>
          <div className="text-center">
            <Avatar fallback="DL" size="2xl" />
            <div className="text-xs mt-1">2xl</div>
          </div>
        </div>
      </div>
    </div>
  )
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-md font-medium mb-3">Shape Variants</h4>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <Avatar 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
              variant="circular"
              size="lg"
            />
            <div className="text-xs mt-2">Circular</div>
          </div>
          <div className="text-center">
            <Avatar 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
              variant="rounded"
              size="lg"
            />
            <div className="text-xs mt-2">Rounded</div>
          </div>
          <div className="text-center">
            <Avatar 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
              variant="square"
              size="lg"
            />
            <div className="text-xs mt-2">Square</div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium mb-3">Without Images</h4>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <Avatar fallback="DL" variant="circular" size="lg" />
            <div className="text-xs mt-2">Circular</div>
          </div>
          <div className="text-center">
            <Avatar fallback="DL" variant="rounded" size="lg" />
            <div className="text-xs mt-2">Rounded</div>
          </div>
          <div className="text-center">
            <Avatar fallback="DL" variant="square" size="lg" />
            <div className="text-xs mt-2">Square</div>
          </div>
        </div>
      </div>
    </div>
  )
};

export const StatusIndicators: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-md font-medium mb-3">Status Types</h4>
        <div className="flex items-center gap-6">
          <div className="text-center">
            <Avatar 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
              status="online"
              size="lg"
            />
            <div className="text-xs mt-2">Online</div>
          </div>
          <div className="text-center">
            <Avatar 
              fallback="SJ"
              status="away"
              size="lg"
            />
            <div className="text-xs mt-2">Away</div>
          </div>
          <div className="text-center">
            <Avatar 
              fallback="MW"
              status="busy"
              size="lg"
            />
            <div className="text-xs mt-2">Busy</div>
          </div>
          <div className="text-center">
            <Avatar 
              fallback="JD"
              status="offline"
              size="lg"
            />
            <div className="text-xs mt-2">Offline</div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium mb-3">Status Positions</h4>
        <div className="flex items-center gap-6">
          <div className="text-center">
            <Avatar 
              fallback="TR"
              status="online"
              statusPosition="top-right"
              size="lg"
            />
            <div className="text-xs mt-2">Top Right</div>
          </div>
          <div className="text-center">
            <Avatar 
              fallback="BR"
              status="online"
              statusPosition="bottom-right"
              size="lg"
            />
            <div className="text-xs mt-2">Bottom Right</div>
          </div>
          <div className="text-center">
            <Avatar 
              fallback="TL"
              status="online"
              statusPosition="top-left"
              size="lg"
            />
            <div className="text-xs mt-2">Top Left</div>
          </div>
          <div className="text-center">
            <Avatar 
              fallback="BL"
              status="online"
              statusPosition="bottom-left"
              size="lg"
            />
            <div className="text-xs mt-2">Bottom Left</div>
          </div>
        </div>
      </div>
    </div>
  )
};

export const AvatarGroups: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-md font-medium mb-3">Route Contributors</h4>
        <AvatarGroup max={4} size="md">
          <Avatar 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
            fallback="DL"
          />
          <Avatar fallback="SJ" />
          <Avatar fallback="MW" />
          <Avatar fallback="JD" />
          <Avatar fallback="AB" />
          <Avatar fallback="CD" />
          <Avatar fallback="EF" />
        </AvatarGroup>
        <div className="text-sm text-gray-600 mt-2">7 route contributors</div>
      </div>

      <div>
        <h4 className="text-md font-medium mb-3">Route Reviewers (Small)</h4>
        <AvatarGroup max={3} size="sm" spacing="tight">
          <Avatar fallback="R1" />
          <Avatar fallback="R2" />
          <Avatar fallback="R3" />
          <Avatar fallback="R4" />
          <Avatar fallback="R5" />
        </AvatarGroup>
        <div className="text-sm text-gray-600 mt-2">5 recent reviewers</div>
      </div>

      <div>
        <h4 className="text-md font-medium mb-3">Route Moderators (Large)</h4>
        <AvatarGroup max={3} size="lg" spacing="loose">
          <Avatar 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
            status="online"
          />
          <Avatar fallback="M1" status="away" />
          <Avatar fallback="M2" status="online" />
        </AvatarGroup>
        <div className="text-sm text-gray-600 mt-2">3 active moderators</div>
      </div>
    </div>
  )
};

export const LoadingStates: Story = {
  render: () => (
    <div className="space-y-4">
      <h4 className="text-md font-medium">Loading & Error States</h4>
      <div className="flex items-center gap-4">
        <div className="text-center">
          <Avatar 
            src="invalid-url"
            fallback="Error"
            size="lg"
          />
          <div className="text-xs mt-2">Image Error</div>
        </div>
        <div className="text-center">
          <Avatar 
            fallback="No Image"
            size="lg"
          />
          <div className="text-xs mt-2">No Image</div>
        </div>
        <div className="text-center">
          <Avatar 
            showFallbackIcon
            size="lg"
          />
          <div className="text-xs mt-2">Icon Fallback</div>
        </div>
      </div>
    </div>
  )
};

export const UseCaseExamples: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h4 className="text-md font-medium mb-4">User Profile Card</h4>
        <div className="p-4 border rounded-lg max-w-sm">
          <div className="flex items-center gap-3">
            <Avatar 
              fallback="Daniel Lauding test"
              size="lg"
              status="online"
            />
            <div>
              <div className="font-semibold">Daniel Lauding test</div>
              <div className="text-sm text-gray-600">Route Creator</div>
              <div className="text-xs text-gray-500">Created 5 routes</div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium mb-4">Comment Thread</h4>
        <div className="space-y-3">
          <div className="flex gap-3">
            <Avatar fallback="DL" size="sm" />
            <div>
              <div className="text-sm font-medium">Daniel Lauding</div>
              <div className="text-sm text-gray-600">Great route! Really enjoyed the scenic views.</div>
              <div className="text-xs text-gray-500 mt-1">2 hours ago</div>
            </div>
          </div>
          <div className="flex gap-3">
            <Avatar fallback="SJ" size="sm" />
            <div>
              <div className="text-sm font-medium">Sarah Johnson</div>
              <div className="text-sm text-gray-600">Thanks for sharing! Will definitely try this one.</div>
              <div className="text-xs text-gray-500 mt-1">1 hour ago</div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium mb-4">Navigation Header</h4>
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="font-semibold">Vromm Routes</div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Daniel Lauding test</span>
            <Avatar 
              fallback="Daniel Lauding test"
              size="sm"
              status="online"
            />
          </div>
        </div>
      </div>
    </div>
  )
}; 