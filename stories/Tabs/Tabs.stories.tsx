import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../src/components/Tabs';
import { MapPin, Settings, Shield, Car, User, Star, MessageCircle } from 'lucide-react';
import { Badge } from '../../src/components/Badge';
import { Table, TableBody, TableRow, TableCell } from '../../src/components/Table';
import { Avatar } from '../../src/components/Avatar';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Data Display/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Tabs component for organizing route modal content into logical sections with different visual styles.'
      }
    }
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Tab orientation'
    },
    variant: {
      control: 'select',
      options: ['default', 'pills', 'underline', 'minimal'],
      description: 'Visual style variant'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  args: {
    orientation: 'horizontal',
    variant: 'default',
    defaultValue: 'overview'
  },
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value="overview" icon={<MapPin className="w-4 h-4" />}>
          Overview
        </TabsTrigger>
        <TabsTrigger value="details" icon={<Settings className="w-4 h-4" />}>
          Details
        </TabsTrigger>
        <TabsTrigger value="reviews" icon={<Star className="w-4 h-4" />} badge={<Badge variant="secondary" className="text-xs">3</Badge>}>
          Reviews
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Route Overview</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium text-gray-600">City</div>
              <div className="mt-1">Svaneke, Denmark</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-600">Difficulty</div>
              <div className="mt-1">
                <Badge variant="outline">Beginner</Badge>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="details">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Detailed Information</h3>
          <Table variant="minimal">
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Category</TableCell>
                <TableCell>Parking</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Spot Type</TableCell>
                <TableCell>Urban</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </TabsContent>

      <TabsContent value="reviews">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">User Reviews</h3>
          <div className="text-gray-600">No reviews yet. Be the first to review this route!</div>
        </div>
      </TabsContent>
    </Tabs>
  )
};

export const RouteModalTabs: Story = {
  render: () => (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <MapPin className="w-6 h-6" />
          Route: yo
        </h2>
        <p className="text-gray-600 mt-1">Route details for yo</p>
      </div>

      <Tabs defaultValue="basic" variant="underline">
        <TabsList>
          <TabsTrigger value="basic" icon={<User className="w-4 h-4" />}>
            Basic Info
          </TabsTrigger>
          <TabsTrigger value="location" icon={<MapPin className="w-4 h-4" />}>
            Location
          </TabsTrigger>
          <TabsTrigger value="classification" icon={<Settings className="w-4 h-4" />}>
            Classification
          </TabsTrigger>
          <TabsTrigger value="security" icon={<Shield className="w-4 h-4" />}>
            Security
          </TabsTrigger>
          <TabsTrigger value="vehicles" icon={<Car className="w-4 h-4" />}>
            Vehicles
          </TabsTrigger>
          <TabsTrigger value="reviews" icon={<MessageCircle className="w-4 h-4" />} badge={<span className="text-xs">0</span>}>
            Reviews
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="text-sm font-medium flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Created by
                </div>
                <div className="mt-1">Daniel Lauding test</div>
              </div>
              <div>
                <div className="text-sm font-medium">Created</div>
                <div className="mt-1">25/06/2025 11:37:40</div>
              </div>
              <div>
                <div className="text-sm font-medium">Last Updated</div>
                <div className="mt-1">25/06/2025 11:37:43</div>
              </div>
              <div>
                <div className="text-sm font-medium">Route ID</div>
                <div className="mt-1 font-mono text-xs">11e5a2ce-8112-42ec-baa7-bd3e211b8706</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium">Difficulty</div>
                <div className="mt-1">
                  <Badge variant="outline">Beginner</Badge>
                </div>
              </div>
              <div>
                <div className="text-sm font-medium">Activity Level</div>
                <div className="mt-1">
                  <Badge variant="secondary">Moderate</Badge>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="location">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium">City</div>
                <div className="mt-1">Svaneke</div>
              </div>
              <div>
                <div className="text-sm font-medium">Country</div>
                <div className="mt-1">Denmark</div>
              </div>
            </div>
            <div>
              <div className="text-sm font-medium">Full Address</div>
              <div className="mt-1">Havnebryggen 2, 3740 Svaneke, Denmark</div>
            </div>
            <div>
              <div className="text-sm font-medium">Region</div>
              <div className="mt-1 text-sm text-gray-700">Capital Region of Denmark</div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="classification">
          <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-sm font-medium">Category</div>
                <div className="mt-1 capitalize">Parking</div>
              </div>
              <div>
                <div className="text-sm font-medium">Spot Type</div>
                <div className="mt-1 capitalize">Urban</div>
              </div>
              <div>
                <div className="text-sm font-medium">Route Type</div>
                <div className="mt-1">Not specified</div>
              </div>
              <div>
                <div className="text-sm font-medium">Spot Subtype</div>
                <div className="mt-1 capitalize">Standard</div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">Public</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm">Active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-sm">Verified</span>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="vehicles">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="capitalize">
                Passenger Car
              </Badge>
            </div>
            <div className="text-sm">
              <strong>Transmission:</strong> Both
            </div>
          </div>
        </TabsContent>

        <TabsContent value="reviews">
          <div className="text-center py-8 text-gray-600">
            <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium mb-2">No Reviews Yet</h3>
            <p>Be the first to review this route and help other travelers!</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
};

export const PillsVariant: Story = {
  render: () => (
    <Tabs defaultValue="info" variant="pills">
      <TabsList>
        <TabsTrigger value="info">Route Info</TabsTrigger>
        <TabsTrigger value="stats">Statistics</TabsTrigger>
        <TabsTrigger value="media">Media</TabsTrigger>
      </TabsList>

      <TabsContent value="info">
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Route Information</h3>
          <p className="text-gray-600">Basic route details and metadata.</p>
        </div>
      </TabsContent>

      <TabsContent value="stats">
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Route Statistics</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">45.2</div>
              <div className="text-sm text-gray-600">km</div>
            </div>
            <div>
              <div className="text-2xl font-bold">1.5</div>
              <div className="text-sm text-gray-600">hours</div>
            </div>
            <div>
              <div className="text-2xl font-bold">245</div>
              <div className="text-sm text-gray-600">elevation</div>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="media">
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Media Gallery</h3>
          <p className="text-gray-600">Photos and videos from this route.</p>
        </div>
      </TabsContent>
    </Tabs>
  )
};

export const MinimalVariant: Story = {
  render: () => (
    <Tabs defaultValue="summary" variant="minimal">
      <TabsList>
        <TabsTrigger value="summary">Summary</TabsTrigger>
        <TabsTrigger value="waypoints">Waypoints</TabsTrigger>
        <TabsTrigger value="notes">Notes</TabsTrigger>
      </TabsList>

      <TabsContent value="summary">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-sm font-medium text-blue-900">Distance</div>
              <div className="text-lg font-bold text-blue-800">45.2 km</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="text-sm font-medium text-green-900">Duration</div>
              <div className="text-lg font-bold text-green-800">1h 30m</div>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="waypoints">
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 border rounded-lg">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center font-medium">
              1
            </div>
            <div>
              <div className="font-medium text-sm">Havnebryggen, Svaneke</div>
              <div className="text-xs text-gray-500">Starting point</div>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="notes">
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-medium text-yellow-800 mb-2">Route Notes</h4>
          <p className="text-sm text-yellow-700">
            Beautiful coastal route with scenic views. Best enjoyed during sunrise or sunset.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  )
};

export const VerticalOrientation: Story = {
  render: () => (
    <div className="flex h-96">
      <Tabs defaultValue="creator" orientation="vertical" variant="default" className="w-full">
        <TabsList className="h-full w-48">
          <TabsTrigger value="creator" icon={<User className="w-4 h-4" />}>
            Creator Info
          </TabsTrigger>
          <TabsTrigger value="location" icon={<MapPin className="w-4 h-4" />}>
            Location
          </TabsTrigger>
          <TabsTrigger value="settings" icon={<Settings className="w-4 h-4" />}>
            Settings
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 ml-4">
          <TabsContent value="creator">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar fallback="DL" size="lg" />
                <div>
                  <div className="font-semibold">Daniel Lauding test</div>
                  <div className="text-sm text-gray-600">Route Creator</div>
                </div>
              </div>
              <div className="text-sm text-gray-700">
                Created on June 25, 2025 at 11:37 AM
              </div>
            </div>
          </TabsContent>

          <TabsContent value="location">
            <div className="space-y-3">
              <div><strong>City:</strong> Svaneke</div>
              <div><strong>Country:</strong> Denmark</div>
              <div><strong>Region:</strong> Capital Region of Denmark</div>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-3">
              <div><strong>Visibility:</strong> Public</div>
              <div><strong>Status:</strong> Active</div>
              <div><strong>Category:</strong> Parking</div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}; 