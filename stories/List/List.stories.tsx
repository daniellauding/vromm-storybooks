import type { Meta, StoryObj } from '@storybook/react';
import { List, ListItem, DescriptionList, DescriptionTerm, DescriptionDetails } from '../../src/components/List';
import { MapPin, User, Calendar, Car, Settings, Star, ExternalLink } from 'lucide-react';
import { Badge } from '../../src/components/Badge';
import { Button } from '../../src/components/Button';

const meta: Meta<typeof List> = {
  title: 'Components/Data Display/List',
  component: List,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Flexible list components for displaying structured data, including ordered lists, unordered lists, and description lists.'
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'ordered', 'unstyled', 'spaced', 'divided'],
      description: 'List style variant'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'List size'
    },
    as: {
      control: 'select',
      options: ['ul', 'ol'],
      description: 'HTML element to render'
    }
  }
};

export default meta;
type Story = StoryObj<typeof List>;

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'md',
    as: 'ul'
  },
  render: (args) => (
    <List {...args}>
      <ListItem>Route created successfully</ListItem>
      <ListItem>Media uploaded and processed</ListItem>
      <ListItem>Waypoints validated</ListItem>
      <ListItem>Route published publicly</ListItem>
    </List>
  )
};

export const RouteFeatures: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Route Features</h3>
        <List variant="unstyled">
          <ListItem icon={<MapPin className="w-4 h-4" />}>
            GPS-tracked waypoints with precise coordinates
          </ListItem>
          <ListItem icon={<Car className="w-4 h-4" />}>
            Compatible with all vehicle types
          </ListItem>
          <ListItem icon={<Star className="w-4 h-4" />}>
            Community verified and rated
          </ListItem>
          <ListItem icon={<Settings className="w-4 h-4" />}>
            Customizable difficulty levels
          </ListItem>
        </List>
      </div>
    </div>
  )
};

export const InteractiveList: Story = {
  render: () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">Route Actions</h3>
      <List variant="unstyled">
        <ListItem 
          variant="interactive"
          icon={<MapPin className="w-4 h-4" />}
          action={<ExternalLink className="w-4 h-4" />}
        >
          View on Google Maps
        </ListItem>
        <ListItem 
          variant="interactive"
          icon={<User className="w-4 h-4" />}
          action={<Badge variant="secondary">Creator</Badge>}
        >
          Contact route creator
        </ListItem>
        <ListItem 
          variant="interactive"
          icon={<Star className="w-4 h-4" />}
          action={<Button size="sm" variant="outline">Rate</Button>}
        >
          Rate this route
        </ListItem>
        <ListItem 
          variant="disabled"
          icon={<Settings className="w-4 h-4" />}
        >
          Advanced settings (coming soon)
        </ListItem>
      </List>
    </div>
  )
};

export const DescriptionListExample: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Route Details (Vertical)</h3>
        <DescriptionList orientation="vertical">
          <DescriptionTerm>Created by</DescriptionTerm>
          <DescriptionDetails>Daniel Lauding test</DescriptionDetails>
          
          <DescriptionTerm>Created</DescriptionTerm>
          <DescriptionDetails>25/06/2025 11:37:40</DescriptionDetails>
          
          <DescriptionTerm>Location</DescriptionTerm>
          <DescriptionDetails>Svaneke, Denmark</DescriptionDetails>
          
          <DescriptionTerm>Difficulty</DescriptionTerm>
          <DescriptionDetails>
            <Badge variant="outline">Beginner</Badge>
          </DescriptionDetails>
          
          <DescriptionTerm>Activity Level</DescriptionTerm>
          <DescriptionDetails>
            <Badge variant="secondary">Moderate</Badge>
          </DescriptionDetails>
        </DescriptionList>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Route Details (Horizontal)</h3>
        <DescriptionList orientation="horizontal">
          <DescriptionTerm>Route ID</DescriptionTerm>
          <DescriptionDetails className="col-span-2 font-mono text-sm">
            11e5a2ce-8112-42ec-baa7-bd3e211b8706
          </DescriptionDetails>
          
          <DescriptionTerm>Status</DescriptionTerm>
          <DescriptionDetails className="col-span-2">
            <Badge variant="default">Active</Badge>
          </DescriptionDetails>
          
          <DescriptionTerm>Visibility</DescriptionTerm>
          <DescriptionDetails className="col-span-2">Public</DescriptionDetails>
        </DescriptionList>
      </div>
    </div>
  )
};

export const SpacedAndDivided: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Spaced List</h3>
        <List variant="spaced">
          <ListItem icon={<MapPin className="w-5 h-5" />}>
            <div>
              <div className="font-medium">Starting Point</div>
              <div className="text-sm text-gray-600">Havnebryggen 2, 3740 Svaneke</div>
            </div>
          </ListItem>
          <ListItem icon={<MapPin className="w-5 h-5" />}>
            <div>
              <div className="font-medium">Checkpoint 1</div>
              <div className="text-sm text-gray-600">Scenic overlook with parking</div>
            </div>
          </ListItem>
          <ListItem icon={<MapPin className="w-5 h-5" />}>
            <div>
              <div className="font-medium">End Point</div>
              <div className="text-sm text-gray-600">Return to starting location</div>
            </div>
          </ListItem>
        </List>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Divided List</h3>
        <List variant="divided">
          <ListItem>
            <div className="flex justify-between items-center w-full">
              <span>Distance</span>
              <span className="font-medium">45.2 km</span>
            </div>
          </ListItem>
          <ListItem>
            <div className="flex justify-between items-center w-full">
              <span>Duration</span>
              <span className="font-medium">1h 30m</span>
            </div>
          </ListItem>
          <ListItem>
            <div className="flex justify-between items-center w-full">
              <span>Elevation</span>
              <span className="font-medium">+245m</span>
            </div>
          </ListItem>
        </List>
      </div>
    </div>
  )
};

export const OrderedSteps: Story = {
  render: () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">Route Instructions</h3>
      <List as="ol" variant="ordered">
        <ListItem>Start at the harbor parking area</ListItem>
        <ListItem>Follow the coastal road northeast for 12 km</ListItem>
        <ListItem>Turn right at the scenic overlook sign</ListItem>
        <ListItem>Continue straight for 8 km through the forest</ListItem>
        <ListItem>Take the loop road back to the starting point</ListItem>
      </List>
    </div>
  )
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h4 className="text-md font-medium mb-3">Small</h4>
        <List size="sm" variant="divided">
          <ListItem icon={<User className="w-3 h-3" />}>Daniel Lauding</ListItem>
          <ListItem icon={<Calendar className="w-3 h-3" />}>Jan 15, 2025</ListItem>
          <ListItem icon={<MapPin className="w-3 h-3" />}>Denmark</ListItem>
        </List>
      </div>

      <div>
        <h4 className="text-md font-medium mb-3">Large</h4>
        <List size="lg" variant="spaced">
          <ListItem icon={<User className="w-6 h-6" />}>
            <div>
              <div className="font-semibold">Route Creator</div>
              <div className="text-gray-600">Daniel Lauding test</div>
            </div>
          </ListItem>
          <ListItem icon={<Calendar className="w-6 h-6" />}>
            <div>
              <div className="font-semibold">Created</div>
              <div className="text-gray-600">June 25, 2025 at 11:37 AM</div>
            </div>
          </ListItem>
        </List>
      </div>
    </div>
  )
}; 