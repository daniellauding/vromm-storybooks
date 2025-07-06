import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '../../src/components/Card/Card';
import { Button } from '../../src/components/Button/Button';
import { useState } from 'react';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Versatile card component that supports both regular content and map preview layouts with images, ratings, and interactive features.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'elevated', 'glass'],
      description: 'Visual style variant of the card',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant affecting padding',
    },
    rating: {
      control: { type: 'number', min: 0, max: 5, step: 0.1 },
      description: 'Rating value for map preview cards',
    },
    reviewCount: {
      control: { type: 'number', min: 0 },
      description: 'Number of reviews for map preview cards',
    },
    isSaved: {
      control: 'boolean',
      description: 'Whether the card is saved/favorited',
    },
    isClosable: {
      control: 'boolean',
      description: 'Whether the card can be closed',
    },
    onSave: { action: 'saved' },
    onClose: { action: 'closed' },
    onClick: { action: 'clicked' },
    onImageChange: { action: 'image changed' },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// Light mode wrapper that overrides dark mode CSS
const LightWrapper = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      '--vromm-card-bg': '#ffffff',
      '--vromm-card-text': '#000000',
      '--vromm-card-border': '#e5e7eb',
      backgroundColor: '#ffffff',
      colorScheme: 'light',
    } as React.CSSProperties}
  >
    <style>
      {`
        .vromm-card {
          background-color: #ffffff !important;
          color: #000000 !important;
          border-color: #e5e7eb !important;
        }
        .vromm-card-title {
          color: #072f2d !important;
        }
        .vromm-card-description {
          color: #395857 !important;
        }
        .text-gray-500 {
          color: #6b7280 !important;
        }
        .text-gray-600 {
          color: #4b5563 !important;
        }
        .text-gray-700 {
          color: #374151 !important;
        }
        .text-gray-900 {
          color: #111827 !important;
        }
      `}
    </style>
    {children}
  </div>
);

// Sample images for map preview cards
const sampleImages = [
  {
    src: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop',
    alt: 'Modern house exterior'
  },
  {
    src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    alt: 'House interior living room'
  },
  {
    src: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
    alt: 'House kitchen'
  },
];

// Sample map location data
const sampleLocations = [
  {
    id: 1,
    images: sampleImages,
    title: 'Beautiful Modern House',
    description: 'Stunning 3-bedroom house with garden, perfect for families.',
    location: 'San Francisco, CA',
    rating: 4.8,
    reviewCount: 127,
    price: 'From $2,400/night',
    coordinates: [-122.4194, 37.7749]
  },
  {
    id: 2,
    images: [sampleImages[1], sampleImages[2]],
    title: 'Cozy Downtown Apartment',
    description: 'Modern apartment in the heart of the city.',
    location: 'New York, NY',
    rating: 4.5,
    reviewCount: 89,
    price: 'From $180/night',
    coordinates: [-74.0060, 40.7128]
  },
  {
    id: 3,
    images: [sampleImages[0]],
    title: 'Seaside Villa',
    description: 'Luxurious villa with ocean views.',
    location: 'Miami, FL',
    rating: 4.9,
    reviewCount: 203,
    price: 'From $350/night',
    coordinates: [-80.1918, 25.7617]
  }
];

// Map Integration Example
export const MapIntegrationExample: Story = {
  render: () => {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [savedLocations, setSavedLocations] = useState(new Set());

    const handleMapPinClick = (location) => {
      setSelectedLocation(location);
    };

    const handleSave = (locationId) => {
      setSavedLocations(prev => {
        const newSet = new Set(prev);
        if (newSet.has(locationId)) {
          newSet.delete(locationId);
        } else {
          newSet.add(locationId);
        }
        return newSet;
      });
    };

    const handleClose = () => {
      setSelectedLocation(null);
    };

    const handleCardClick = (location) => {
      alert(`Opening detailed view for: ${location.title}`);
    };

    return (
      <LightWrapper>
        <div className="w-full max-w-4xl mx-auto space-y-6">
          {/* Simulated Map with Pins */}
          <div className="bg-green-100 p-8 rounded-lg relative h-64">
            <h3 className="text-lg font-semibold mb-4">🗺️ Map View (Click pins to see cards)</h3>
            <div className="text-sm text-gray-600 mb-4">
              Click on the location pins below to see the property cards
            </div>
            
            {/* Simulated map pins */}
            <div className="flex justify-around items-center h-32">
              {sampleLocations.map((location) => (
                <button
                  key={location.id}
                  onClick={() => handleMapPinClick(location)}
                  className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-md"
                  title={location.title}
                >
                  📍
                </button>
              ))}
            </div>
          </div>

          {/* Selected Location Card */}
          {selectedLocation && (
            <div className="border-2 border-blue-300 p-4 rounded-lg bg-blue-50">
              <h3 className="text-lg font-semibold mb-3">📌 Selected Location</h3>
              <div className="max-w-sm">
                <Card
                  variant="elevated"
                  images={selectedLocation.images}
                  title={selectedLocation.title}
                  description={selectedLocation.description}
                  location={selectedLocation.location}
                  rating={selectedLocation.rating}
                  reviewCount={selectedLocation.reviewCount}
                  price={selectedLocation.price}
                  isSaved={savedLocations.has(selectedLocation.id)}
                  isClosable={true}
                  onSave={() => handleSave(selectedLocation.id)}
                  onClose={handleClose}
                  onClick={() => handleCardClick(selectedLocation)}
                />
              </div>
            </div>
          )}

          {/* All Locations Grid */}
          <div>
            <h3 className="text-lg font-semibold mb-4">🏠 All Properties</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {sampleLocations.map((location) => (
                <Card
                  key={location.id}
                  variant="default"
                  images={location.images}
                  title={location.title}
                  description={location.description}
                  location={location.location}
                  rating={location.rating}
                  reviewCount={location.reviewCount}
                  price={location.price}
                  isSaved={savedLocations.has(location.id)}
                  onSave={() => handleSave(location.id)}
                  onClick={() => handleCardClick(location)}
                />
              ))}
            </div>
          </div>

          {/* Usage Code Example */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">💻 Integration Code Example:</h4>
            <pre className="text-sm overflow-x-auto">
{`// In your map component, replace hover popups with click handlers:
map.current.on('click', 'location-pins', (e) => {
  const feature = e.features[0];
  const locationData = feature.properties;
  
  // Show card instead of popup
  setSelectedLocation({
    images: locationData.images,
    title: locationData.name,
    description: locationData.description,
    rating: locationData.rating,
    // ... other props
  });
});

// Use the Card component:
<Card
  images={location.images}
  title={location.title}
  description={location.description}
  location={location.address}
  rating={location.rating}
  reviewCount={location.reviewCount}
  price={location.price}
  isSaved={savedLocations.has(location.id)}
  isClosable={true}
  onSave={() => handleSave(location.id)}
  onClose={() => setSelectedLocation(null)}
  onClick={() => openDetailView(location)}
/>`}
            </pre>
          </div>
        </div>
      </LightWrapper>
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
};

// Map Preview Card Stories
export const MapPreviewCard: Story = {
  render: (args) => (
    <LightWrapper>
      <Card {...args} />
    </LightWrapper>
  ),
  args: {
    variant: 'default',
    size: 'md',
    images: sampleImages,
    title: 'Beautiful Modern House',
    description: 'Stunning 3-bedroom house with garden, perfect for families. Located in a quiet neighborhood with easy access to schools and shopping.',
    location: 'San Francisco, CA',
    rating: 4.8,
    reviewCount: 127,
    price: 'From $2,400/night',
    isSaved: false,
    isClosable: true,
  },
};

export const MapPreviewSaved: Story = {
  render: (args) => (
    <LightWrapper>
      <Card {...args} />
    </LightWrapper>
  ),
  args: {
    ...MapPreviewCard.args,
    isSaved: true,
    title: 'Saved Property',
  },
};

export const MapPreviewSingleImage: Story = {
  render: (args) => (
    <LightWrapper>
      <Card {...args} />
    </LightWrapper>
  ),
  args: {
    ...MapPreviewCard.args,
    images: [sampleImages[0]],
    title: 'Property with Single Image',
    isClosable: false,
  },
};

export const MapPreviewNoImage: Story = {
  render: (args) => (
    <LightWrapper>
      <Card {...args} />
    </LightWrapper>
  ),
  args: {
    title: 'Property Without Images',
    description: 'Great location with all amenities nearby.',
    location: 'New York, NY',
    rating: 4.2,
    reviewCount: 45,
    price: 'From $150/night',
    isSaved: false,
  },
};

export const MapPreviewVariants: Story = {
  render: () => (
    <LightWrapper>
      <div className="grid grid-cols-2 gap-4 max-w-4xl">
        <Card
          variant="default"
          images={[sampleImages[0]]}
          title="Default Card"
          location="Location A"
          rating={4.5}
          reviewCount={32}
          price="$200/night"
        />
        <Card
          variant="elevated"
          images={[sampleImages[1]]}
          title="Elevated Card"
          location="Location B"
          rating={4.8}
          reviewCount={89}
          price="$350/night"
        />
        <Card
          variant="outline"
          images={[sampleImages[2]]}
          title="Outline Card"
          location="Location C"
          rating={4.2}
          reviewCount={15}
          price="$180/night"
        />
        <Card
          variant="glass"
          images={[sampleImages[0]]}
          title="Glass Card"
          location="Location D"
          rating={4.9}
          reviewCount={156}
          price="$500/night"
        />
      </div>
    </LightWrapper>
  ),
};

// Regular Card Stories (Original Functionality)
export const Default: Story = {
  render: (args) => (
    <LightWrapper>
      <Card {...args} />
    </LightWrapper>
  ),
  args: {
    variant: 'default',
    size: 'md',
    children: (
      <>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>
            This is a description of the card content.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is the main content area of the card.</p>
        </CardContent>
        <CardFooter>
          <Button variant="primary" size="sm">
            Primary Action
          </Button>
          <Button variant="secondary" size="sm">
            Secondary
          </Button>
        </CardFooter>
      </>
    ),
  },
};

export const Variants: Story = {
  render: () => (
    <LightWrapper>
      <div className="grid grid-cols-2 gap-4 max-w-4xl">
        <Card variant="default">
          <CardHeader>
            <CardTitle>Default Card</CardTitle>
            <CardDescription>Standard card styling</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Content for default card variant.</p>
          </CardContent>
        </Card>
        
        <Card variant="outline">
          <CardHeader>
            <CardTitle>Outline Card</CardTitle>
            <CardDescription>Card with border outline</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Content for outline card variant.</p>
          </CardContent>
        </Card>
        
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Elevated Card</CardTitle>
            <CardDescription>Card with shadow elevation</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Content for elevated card variant.</p>
          </CardContent>
        </Card>
        
        <Card variant="glass">
          <CardHeader>
            <CardTitle>Glass Card</CardTitle>
            <CardDescription>Card with glass morphism effect</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Content for glass card variant.</p>
          </CardContent>
        </Card>
      </div>
    </LightWrapper>
  ),
};

export const Sizes: Story = {
  render: () => (
    <LightWrapper>
      <div className="space-y-4 max-w-md">
        <Card size="sm">
          <CardHeader>
            <CardTitle>Small Card</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Compact card with small padding.</p>
          </CardContent>
        </Card>
        
        <Card size="md">
          <CardHeader>
            <CardTitle>Medium Card</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Standard card with medium padding.</p>
          </CardContent>
        </Card>
        
        <Card size="lg">
          <CardHeader>
            <CardTitle>Large Card</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Spacious card with large padding.</p>
          </CardContent>
        </Card>
      </div>
    </LightWrapper>
  ),
};

export const Interactive: Story = {
  render: (args) => (
    <LightWrapper>
      <Card {...args} />
    </LightWrapper>
  ),
  args: {
    ...Default.args,
    onClick: () => alert('Card clicked!'),
    className: 'cursor-pointer hover:shadow-lg transition-shadow',
  },
};

export const WithActions: Story = {
  render: () => (
    <LightWrapper>
      <Card variant="elevated" className="max-w-md">
        <CardHeader>
          <CardTitle>Project Update</CardTitle>
          <CardDescription>
            New features have been added to the dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>Authentication improvements</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span>New component library</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full" />
              <span>Performance optimizations</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="primary" size="sm">
            View Details
          </Button>
          <Button variant="text" size="sm">
            Dismiss
          </Button>
        </CardFooter>
      </Card>
    </LightWrapper>
  ),
};

// Dark mode demonstration
export const DarkModePreview: Story = {
  render: () => (
    <div style={{ backgroundColor: '#1a1a1a', padding: '2rem', borderRadius: '8px' }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card
          variant="elevated"
          images={sampleImages}
          title="Dark Mode Map Card"
          description="Beautiful property in dark mode styling"
          location="Night City"
          rating={4.7}
          reviewCount={88}
          price="$299/night"
          isSaved={true}
          isClosable={true}
        />
        <Card variant="glass">
          <CardHeader>
            <CardTitle>Dark Mode Card</CardTitle>
            <CardDescription>
              Regular card in dark mode
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>This card adapts to dark mode automatically.</p>
          </CardContent>
          <CardFooter>
            <Button variant="primary" size="sm">Action</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
  },
}; 