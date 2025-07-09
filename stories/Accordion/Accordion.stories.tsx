import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../../src/components/Accordion';
import { MapPin, Settings, Shield, Car, User, Calendar, Info } from 'lucide-react';
import { Badge } from '../../src/components/Badge';
import { Table, TableBody, TableRow, TableCell } from '../../src/components/Table';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Data Display/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Collapsible accordion component perfect for organizing route modal data into manageable sections.'
      }
    }
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple'],
      description: 'Accordion behavior type'
    },
    collapsible: {
      control: 'boolean',
      description: 'Allow collapsing all items (only for single type)'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {
    type: 'single',
    collapsible: true,
    defaultValue: 'basic-info'
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem value="basic-info">
        <AccordionTrigger icon={<Info className="w-4 h-4" />}>
          Basic Information
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-3">
            <div>
              <strong>Description:</strong> No description
            </div>
            <div>
              <strong>Difficulty:</strong> <Badge variant="outline">Beginner</Badge>
            </div>
            <div>
              <strong>Activity Level:</strong> <Badge variant="secondary">Moderate</Badge>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="location">
        <AccordionTrigger icon={<MapPin className="w-4 h-4" />}>
          Location Details
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-3">
            <div><strong>City:</strong> Svaneke</div>
            <div><strong>Country:</strong> Denmark</div>
            <div><strong>Region:</strong> Capital Region of Denmark</div>
            <div><strong>Full Address:</strong> Havnebryggen 2, 3740 Svaneke, Denmark</div>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="classification">
        <AccordionTrigger icon={<Settings className="w-4 h-4" />}>
          Route Classification
        </AccordionTrigger>
        <AccordionContent>
          <Table variant="minimal">
            <TableBody>
              <TableRow>
                <TableCell className="font-medium w-1/3">Category</TableCell>
                <TableCell>Parking</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Spot Type</TableCell>
                <TableCell>Urban</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Route Type</TableCell>
                <TableCell>Not specified</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
};

export const RouteDataOrganized: Story = {
  render: () => (
    <div className="max-w-2xl">
      <h3 className="text-xl font-semibold mb-6">Route Details - yo</h3>
      
      <Accordion type="multiple" defaultValue={['creator', 'location']}>
        <AccordionItem value="creator">
          <AccordionTrigger icon={<User className="w-4 h-4" />}>
            Creator & Timestamps
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium text-gray-600">Created by</div>
                <div className="mt-1">Daniel Lauding test</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-600">Created</div>
                <div className="mt-1">25/06/2025 11:37:40</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-600">Last Updated</div>
                <div className="mt-1">25/06/2025 11:37:43</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-600">Route ID</div>
                <div className="mt-1 font-mono text-xs">11e5a2ce-8112-42ec-baa7-bd3e211b8706</div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="location">
          <AccordionTrigger icon={<MapPin className="w-4 h-4" />}>
            Location Information
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-gray-600">City</div>
                  <div className="mt-1">Svaneke</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-600">Country</div>
                  <div className="mt-1">Denmark</div>
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-600">Full Address</div>
                <div className="mt-1">Havnebryggen 2, 3740 Svaneke, Denmark</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-600">Region</div>
                <div className="mt-1 text-sm text-gray-700">Capital Region of Denmark</div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="classification">
          <AccordionTrigger icon={<Settings className="w-4 h-4" />}>
            Route Classification
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-sm font-medium text-gray-600">Category</div>
                <div className="mt-1 capitalize">Parking</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-600">Spot Type</div>
                <div className="mt-1 capitalize">Urban</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-600">Route Type</div>
                <div className="mt-1">Not specified</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-600">Spot Subtype</div>
                <div className="mt-1 capitalize">Standard</div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="visibility">
          <AccordionTrigger icon={<Shield className="w-4 h-4" />}>
            Visibility & Status
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Public</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm">Active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm">Verified</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="vehicles">
          <AccordionTrigger icon={<Car className="w-4 h-4" />}>
            Vehicle Types
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="capitalize">
                Passenger Car
              </Badge>
              <div className="text-sm text-gray-600 mt-2">
                <strong>Transmission:</strong> Both
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="waypoints">
          <AccordionTrigger icon={<MapPin className="w-4 h-4" />}>
            Waypoints (1)
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-3 border rounded-lg bg-white">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center font-medium">
                  1
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">Havnebryggen, Svaneke, Denmark</div>
                  <div className="text-xs text-gray-500 mt-1">Current location</div>
                  <div className="text-xs text-gray-500 font-mono">55.136324, 15.144074</div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
};

export const SingleCollapsible: Story = {
  render: () => (
    <Accordion type="single" collapsible defaultValue="details">
      <AccordionItem value="details">
        <AccordionTrigger>Route Details</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-3">
            <div><strong>Difficulty:</strong> Beginner</div>
            <div><strong>Best Times:</strong> Anytime</div>
            <div><strong>Best Season:</strong> All</div>
          </div>
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="advanced">
        <AccordionTrigger>Advanced Settings</AccordionTrigger>
        <AccordionContent>
          <div className="text-gray-600">
            Advanced configuration options would go here.
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
};

export const DisabledItems: Story = {
  render: () => (
    <Accordion type="single" defaultValue="available">
      <AccordionItem value="available">
        <AccordionTrigger>Available Information</AccordionTrigger>
        <AccordionContent>
          This section contains available route information.
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="restricted" disabled>
        <AccordionTrigger>Restricted Content</AccordionTrigger>
        <AccordionContent>
          This content is not available.
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="premium" disabled>
        <AccordionTrigger>Premium Features</AccordionTrigger>
        <AccordionContent>
          Premium features require subscription.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}; 