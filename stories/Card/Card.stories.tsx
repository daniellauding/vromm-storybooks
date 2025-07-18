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
        component: 'Enhanced Card component with full carousel support, touch/swipe navigation, accessibility features, and performance optimizations.',
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
    isDriven: {
      control: 'boolean',
      description: 'Whether the route has been driven',
    },
    isClosable: {
      control: 'boolean',
      description: 'Whether the card can be closed',
    },
    onSave: { action: 'saved' },
    onMarkAsDriven: { action: 'marked as driven' },
    onClose: { action: 'closed' },
    onClick: { action: 'clicked' },
    onImageChange: { action: 'image changed' },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// Light mode wrapper to force light appearance in Storybook
const LightWrapper = ({ children }: { children: React.ReactNode }) => (
  <div style={{ colorScheme: 'light', backgroundColor: '#ffffff', padding: '1rem' }}>
    <style>{`
      .vromm-card { 
        background-color: #ffffff !important; 
        border-color: #e5e7eb !important;
        color: #000000 !important;
      }
      .vromm-card-title { color: #072f2d !important; }
      .vromm-card-description { color: #395857 !important; }
      .text-gray-500 { color: #6b7280 !important; }
      .text-gray-600 { color: #4b5563 !important; }
      .text-gray-700 { color: #374151 !important; }
      .text-gray-900 { color: #111827 !important; }
    `}</style>
    {children}
  </div>
);

// Sample images for carousel examples
const sampleImages = [
  { src: 'https://picsum.photos/400/300?random=1', alt: 'Mountain landscape' },
  { src: 'https://picsum.photos/400/300?random=2', alt: 'Forest trail' },
  { src: 'https://picsum.photos/400/300?random=3', alt: 'Lake view' },
  { src: 'https://picsum.photos/400/300?random=4', alt: 'Summit vista' },
];

// Sample videos for carousel examples
const sampleVideos = [
  { 
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    alt: 'Adventure video: Mountain biking trail',
    type: 'video' as const,
    poster: 'https://picsum.photos/400/300?random=100',
    duration: '3:24'
  },
  { 
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    alt: 'Adventure video: Rock climbing expedition',
    type: 'video' as const,
    poster: 'https://picsum.photos/400/300?random=101',
    duration: '5:47'
  },
  { 
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    alt: 'Adventure video: Hiking through forests',
    type: 'video' as const,
    poster: 'https://picsum.photos/400/300?random=102',
    duration: '2:15'
  }
];

// Mixed media for comprehensive examples
const mixedMedia = [
  sampleImages[0],
  sampleVideos[0],
  sampleImages[1],
  sampleVideos[1],
  sampleImages[2]
];

const mapImages = [
  { src: 'https://picsum.photos/400/300?random=10', alt: 'Trail overview photo' },
  { src: 'https://picsum.photos/400/300?random=11', alt: 'Scenic viewpoint' },
  { src: 'https://api.mapbox.com/styles/v1/mapbox/outdoors-v12/static/-122.4194,37.7749,12,0/400x300@2x?access_token=pk.example', alt: 'Route map', type: 'map' as const },
];

// Single Image Examples
export const SingleImage: Story = {
  render: () => (
    <LightWrapper>
      <div className="w-80">
        <Card
          images={[sampleImages[0]]}
          title="Mountain Peak Trail"
          description="A challenging but rewarding hike with breathtaking views at the summit."
          rating={4.8}
          reviewCount={127}
          price="Free"
          location="Rocky Mountain National Park"
          onSave={() => console.log('Saved!')}
          onClick={() => console.log('Card clicked!')}
        />
      </div>
    </LightWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Single image card - no carousel controls shown, just the image with all the standard features.',
      },
    },
  },
};

// Multi-Image Carousel
export const MultiImageCarousel: Story = {
  render: () => (
    <LightWrapper>
      <div className="w-80">
        <Card
          images={sampleImages}
          title="Alpine Adventure Trail"
          description="Explore diverse landscapes from dense forests to alpine meadows on this incredible multi-day journey."
          rating={4.9}
          reviewCount={89}
          price="$25/day"
          location="Swiss Alps"
          onSave={() => console.log('Saved!')}
          onClick={() => console.log('Card clicked!')}
          onImageChange={(index, image) => console.log(`Image changed to ${index}: ${image.alt}`)}
        />
      </div>
    </LightWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multi-image carousel with navigation arrows, pagination dots, and full touch/swipe support. Try swiping on mobile or using arrow keys!',
      },
    },
  },
};

// Auto-Play Carousel
export const AutoPlayCarousel: Story = {
  render: () => (
    <LightWrapper>
      <div className="w-80">
        <Card
          images={sampleImages}
          title="Automated Nature Tour"
          description="Sit back and enjoy this automated slideshow of beautiful landscapes."
          rating={4.7}
          reviewCount={203}
          price="$15/person"
          location="Yellowstone National Park"
          carouselOptions={{
            autoPlay: true,
            autoPlayInterval: 3000,
            loop: true,
            showDots: true,
            showArrows: true,
          }}
          onSave={() => console.log('Saved!')}
          onClick={() => console.log('Card clicked!')}
        />
      </div>
    </LightWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Auto-playing carousel that advances every 3 seconds. Auto-play pauses during user interaction.',
      },
    },
  },
};

// Carousel Options Showcase
export const CarouselOptionsShowcase: Story = {
  render: () => (
    <LightWrapper>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Minimal Carousel - No dots, no arrows */}
        <div className="w-80">
          <h3 className="text-lg font-semibold mb-3">Minimal (Swipe Only)</h3>
          <Card
            images={sampleImages.slice(0, 3)}
            title="Minimalist Experience"
            description="Clean design with swipe-only navigation."
            rating={4.5}
            reviewCount={45}
            carouselOptions={{
              showDots: false,
              showArrows: false,
              enableSwipe: true,
              loop: true,
            }}
            onSave={() => console.log('Saved!')}
          />
        </div>

        {/* No Loop */}
        <div className="w-80">
          <h3 className="text-lg font-semibold mb-3">No Loop</h3>
          <Card
            images={sampleImages.slice(0, 3)}
            title="Linear Navigation"
            description="Navigate from first to last without looping."
            rating={4.3}
            reviewCount={67}
            carouselOptions={{
              loop: false,
              showArrows: true,
              showDots: true,
            }}
            onSave={() => console.log('Saved!')}
          />
        </div>

        {/* Fade Transition */}
        <div className="w-80">
          <h3 className="text-lg font-semibold mb-3">Fade Transition</h3>
          <Card
            images={sampleImages.slice(0, 3)}
            title="Smooth Fades"
            description="Images fade in and out smoothly."
            rating={4.6}
            reviewCount={23}
            carouselOptions={{
              transition: 'fade',
              autoPlay: true,
              autoPlayInterval: 4000,
            }}
            onSave={() => console.log('Saved!')}
          />
        </div>

        {/* Performance Optimized */}
        <div className="w-80">
          <h3 className="text-lg font-semibold mb-3">Performance Optimized</h3>
          <Card
            images={sampleImages}
            title="Optimized Loading"
            description="Preloads adjacent images for smooth navigation."
            rating={4.8}
            reviewCount={156}
            carouselOptions={{
              preloadNext: true,
              enableSwipe: true,
              showDots: true,
            }}
            onSave={() => console.log('Saved!')}
          />
        </div>
      </div>
    </LightWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Various carousel configuration options showing different behaviors and optimizations.',
      },
    },
  },
};

// Map Integration Example
export const MapIntegrationExample: Story = {
  render: () => {
    const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
    const [savedItems, setSavedItems] = useState<Set<number>>(new Set());

    const locations = [
      {
        id: 1,
        images: mapImages,
        title: "Scenic Coastal Route",
        description: "Beautiful 15-mile coastal trail with ocean views and wildlife spotting opportunities.",
        rating: 4.9,
        reviewCount: 342,
        price: "Free",
        location: "Big Sur, California",
        position: { x: 20, y: 30 },
      },
      {
        id: 2,
        images: [
          { src: 'https://picsum.photos/400/300?random=20', alt: 'Desert landscape' },
          { src: 'https://picsum.photos/400/300?random=21', alt: 'Cactus garden' },
          { src: 'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/-111.0937,34.8697,11,0/400x300@2x?access_token=pk.example', alt: 'Desert route map', type: 'map' as const },
        ],
        title: "Desert Discovery Trail",
        description: "Explore unique desert ecosystems and geological formations on this moderate trail.",
        rating: 4.6,
        reviewCount: 187,
        price: "$10/vehicle",
        location: "Sedona, Arizona",
        position: { x: 60, y: 50 },
      },
      {
        id: 3,
        images: [
          { src: 'https://picsum.photos/400/300?random=30', alt: 'Forest canopy' },
          { src: 'https://api.mapbox.com/styles/v1/mapbox/outdoors-v12/static/-121.7680,45.3311,13,0/400x300@2x?access_token=pk.example', alt: 'Forest trail map', type: 'map' as const },
        ],
        title: "Enchanted Forest Loop",
        description: "Magical forest trail with ancient trees and hidden waterfalls.",
        rating: 4.7,
        reviewCount: 256,
        price: "Free",
        location: "Olympic National Park",
        position: { x: 80, y: 20 },
      },
    ];

    const handlePinClick = (locationId: number) => {
      setSelectedLocation(selectedLocation === locationId ? null : locationId);
    };

    const handleSave = (locationId: number) => {
      setSavedItems(prev => {
        const newSet = new Set(prev);
        if (newSet.has(locationId)) {
          newSet.delete(locationId);
        } else {
          newSet.add(locationId);
        }
        return newSet;
      });
    };

    return (
      <LightWrapper>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-2">Interactive Map with Card Previews</h3>
            <p className="text-gray-600 mb-4">
              Click on map pins to show/hide location cards. Each card supports full carousel functionality.
            </p>
          </div>

          {/* Mock Map */}
          <div className="relative bg-green-100 rounded-lg h-96 w-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-200 to-blue-200 opacity-50" />
            <div className="absolute inset-0 flex items-center justify-center text-gray-600">
              Interactive Map Area
            </div>
            
            {/* Map Pins */}
            {locations.map((location) => (
              <button
                key={location.id}
                onClick={() => handlePinClick(location.id)}
                className={`absolute w-6 h-6 rounded-full border-2 border-white shadow-lg transition-all duration-200 hover:scale-110 ${
                  selectedLocation === location.id 
                    ? 'bg-red-500 scale-110' 
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
                style={{ 
                  left: `${location.position.x}%`, 
                  top: `${location.position.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                aria-label={`Show details for ${location.title}`}
              />
            ))}

            {/* Selected Location Card */}
            {selectedLocation && (
              <div className="absolute bottom-4 left-4 w-80 z-10">
                {(() => {
                  const location = locations.find(l => l.id === selectedLocation)!;
                  return (
                    <Card
                      images={location.images}
                      title={location.title}
                      description={location.description}
                      rating={location.rating}
                      reviewCount={location.reviewCount}
                      price={location.price}
                      location={location.location}
                      isSaved={savedItems.has(location.id)}
                      isClosable
                      carouselOptions={{
                        showDots: true,
                        showArrows: true,
                        loop: true,
                        enableSwipe: true,
                        preloadNext: true,
                      }}
                      onSave={() => handleSave(location.id)}
                      onClose={() => setSelectedLocation(null)}
                      onClick={() => console.log(`Navigate to ${location.title}`)}
                      onImageChange={(index, image) => 
                        console.log(`${location.title} - Image ${index + 1}: ${image.alt}`)
                      }
                    />
                  );
                })()}
              </div>
            )}
          </div>

          {/* Code Example */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Integration Example:</h4>
            <pre className="text-sm text-gray-700 overflow-auto">
{`// Map integration with carousel cards
const [selectedLocation, setSelectedLocation] = useState(null);

const handlePinClick = (locationId) => {
  setSelectedLocation(selectedLocation === locationId ? null : locationId);
};

// In your map component
{selectedLocation && (
  <Card
    images={[
      { src: "photo1.jpg", alt: "Trail photo" },
      { src: "photo2.jpg", alt: "Scenic view" },
      { src: "mapbox-static-url", alt: "Route map", type: "map" }
    ]}
    title="Trail Name"
    carouselOptions={{
      showDots: true,
      showArrows: true,
      loop: true,
      enableSwipe: true,
      preloadNext: true
    }}
    onClose={() => setSelectedLocation(null)}
  />
)}`}
            </pre>
          </div>
        </div>
      </LightWrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete map integration example showing how to use carousel cards with interactive map pins. Includes mix of photos and map preview images.',
      },
    },
  },
};

// Backwards Compatibility
export const BackwardsCompatibility: Story = {
  render: () => (
    <LightWrapper>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-2">Backwards Compatibility</h3>
          <p className="text-gray-600 mb-4">
            The enhanced card component maintains full backwards compatibility with existing implementations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Old single image format */}
          <div>
            <h4 className="font-semibold mb-2">Single Image Object (Legacy)</h4>
            <Card
              images={{ src: 'https://picsum.photos/400/300?random=50', alt: 'Legacy format' }}
              title="Legacy Format"
              description="Using single image object format"
              rating={4.5}
              reviewCount={89}
            />
          </div>

          {/* New array format */}
          <div>
            <h4 className="font-semibold mb-2">Array Format (Enhanced)</h4>
            <Card
              images={[{ src: 'https://picsum.photos/400/300?random=51', alt: 'Array format' }]}
              title="Array Format"
              description="Using new array format with single image"
              rating={4.5}
              reviewCount={89}
            />
          </div>
        </div>
      </div>
    </LightWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates backwards compatibility - both old single image object and new array formats work identically.',
      },
    },
  },
};

// Accessibility Features
export const AccessibilityFeatures: Story = {
  render: () => (
    <LightWrapper>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-2">Accessibility Features</h3>
          <p className="text-gray-600 mb-4">
            Full keyboard navigation, screen reader support, and ARIA labels. Try using Tab, Arrow keys, Home, and End.
          </p>
        </div>

        <div className="w-80">
          <Card
            images={sampleImages}
            title="Accessible Carousel"
            description="Full keyboard navigation and screen reader support with proper ARIA labels."
            rating={4.9}
            reviewCount={234}
            price="Free"
            location="Accessible Trail"
            carouselOptions={{
              showDots: true,
              showArrows: true,
              loop: true,
              enableSwipe: true,
            }}
            onSave={() => console.log('Saved!')}
            onClick={() => console.log('Card clicked!')}
            onImageChange={(index, image) => console.log(`Screen reader: Image ${index + 1} of ${sampleImages.length}, ${image.alt}`)}
          />
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Accessibility Features:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• <strong>Keyboard Navigation:</strong> Arrow keys, Home, End</li>
            <li>• <strong>Focus Management:</strong> Proper tab order and focus indicators</li>
            <li>• <strong>Screen Reader Support:</strong> ARIA labels and live announcements</li>
            <li>• <strong>Touch Accessibility:</strong> Minimum 44px touch targets</li>
            <li>• <strong>Color Contrast:</strong> WCAG compliant contrast ratios</li>
            <li>• <strong>Motion Preferences:</strong> Respects prefers-reduced-motion</li>
          </ul>
        </div>
      </div>
    </LightWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive accessibility features including keyboard navigation, screen reader support, and proper ARIA labels.',
      },
    },
  },
};

// Edge Cases
export const EdgeCases: Story = {
  render: () => (
    <LightWrapper>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-2">Edge Cases</h3>
          <p className="text-gray-600 mb-4">
            Various edge cases and fallback scenarios handled gracefully.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Empty Images Array */}
          <div>
            <h4 className="font-semibold mb-2">No Images</h4>
            <Card
              title="Text Only Card"
              description="Card without any images, using default layout."
              rating={4.2}
              reviewCount={45}
              price="Free"
              location="Virtual Location"
            />
          </div>

          {/* Broken Image URLs */}
          <div>
            <h4 className="font-semibold mb-2">Broken Image Fallback</h4>
            <Card
              images={[
                { src: 'https://broken-url-that-does-not-exist.jpg', alt: 'Broken image' },
                { src: 'https://picsum.photos/400/300?random=60', alt: 'Working image' },
              ]}
              title="Fallback Demo"
              description="First image is broken, fallback placeholder shown."
              rating={4.0}
              reviewCount={12}
            />
          </div>

          {/* Very Long Content */}
          <div>
            <h4 className="font-semibold mb-2">Long Content</h4>
            <Card
              images={[{ src: 'https://picsum.photos/400/300?random=70', alt: 'Very long description example with lots of text that should be properly truncated and handled gracefully' }]}
              title="Super Extra Long Trail Name That Goes On And On"
              description="This is an extremely long description that should be properly truncated using line-clamp to ensure the card layout remains consistent and doesn't break the design. The text should be cut off after two lines with an ellipsis."
              rating={3.8}
              reviewCount={1234}
              price="$99.99/person"
              location="Really Really Long Location Name That Might Cause Layout Issues"
            />
          </div>

          {/* Different Aspect Ratios */}
          <div>
            <h4 className="font-semibold mb-2">Mixed Aspect Ratios</h4>
            <Card
              images={[
                { src: 'https://picsum.photos/400/600?random=80', alt: 'Portrait image' },
                { src: 'https://picsum.photos/800/300?random=81', alt: 'Wide landscape' },
                { src: 'https://picsum.photos/300/300?random=82', alt: 'Square image' },
              ]}
              title="Mixed Ratios"
              description="Images with different aspect ratios are properly contained."
              rating={4.3}
              reviewCount={67}
            />
          </div>
        </div>
      </div>
    </LightWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Edge cases including empty images, broken URLs, long content, and mixed aspect ratios.',
      },
    },
  },
};

// Performance Optimization Demo
export const PerformanceOptimizations: Story = {
  render: () => {
    const [loadingStats, setLoadingStats] = useState<Record<string, string>>({});
    
    const handleImageChange = (index: number, image: any) => {
      setLoadingStats(prev => ({
        ...prev,
        [`carousel-${Date.now()}`]: `Loaded image ${index + 1}: ${image.alt}`
      }));
    };

    const largeImageSet = Array.from({ length: 10 }, (_, i) => ({
      src: `https://picsum.photos/400/300?random=${90 + i}`,
      alt: `Large set image ${i + 1}`,
    }));

    return (
      <LightWrapper>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-2">Performance Optimizations</h3>
            <p className="text-gray-600 mb-4">
              Lazy loading, preloading, and optimized rendering for large image sets.
            </p>
          </div>

          <div className="w-80">
            <Card
              images={largeImageSet}
              title="Performance Demo"
              description="10 images with lazy loading and smart preloading of adjacent images."
              rating={4.7}
              reviewCount={156}
              price="$20/day"
              location="High Performance Trail"
              carouselOptions={{
                preloadNext: true,
                enableSwipe: true,
                showDots: true,
                showArrows: true,
              }}
              onImageChange={handleImageChange}
              onSave={() => console.log('Saved performance demo!')}
            />
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Performance Features:</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• <strong>Lazy Loading:</strong> Images loaded only when needed</li>
              <li>• <strong>Smart Preloading:</strong> Adjacent images preloaded for smooth navigation</li>
              <li>• <strong>Optimized Transitions:</strong> Hardware-accelerated animations</li>
              <li>• <strong>Efficient Re-renders:</strong> Memoized callbacks and state updates</li>
              <li>• <strong>Touch Optimization:</strong> Debounced touch events</li>
              <li>• <strong>Auto-play Management:</strong> Intelligent timer cleanup</li>
            </ul>
          </div>

          {Object.keys(loadingStats).length > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Loading Activity:</h4>
              <div className="text-sm text-gray-600 space-y-1 max-h-32 overflow-auto">
                {Object.entries(loadingStats).slice(-5).map(([key, value]) => (
                  <div key={key}>{value}</div>
                ))}
              </div>
            </div>
          )}
        </div>
      </LightWrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Performance optimizations including lazy loading, smart preloading, and efficient rendering for large image sets.',
      },
    },
  },
};

// Custom Content Layout (Original functionality)
export const CustomContentLayout: Story = {
  render: () => (
    <LightWrapper>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-2">Custom Content Layout</h3>
          <p className="text-gray-600 mb-4">
            Original Card component functionality for custom layouts using composable sub-components.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card variant="default" className="w-80">
            <CardHeader>
              <CardTitle>Custom Header</CardTitle>
              <CardDescription>
                Using composable sub-components for full layout control.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                This demonstrates the original Card functionality with custom content
                layouts using CardHeader, CardContent, and CardFooter components.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="primary" size="sm">Action Button</Button>
              <Button variant="secondary" size="sm">Secondary</Button>
            </CardFooter>
          </Card>

          <Card variant="elevated" className="w-80">
            <CardContent>
              <div className="space-y-4">
                <div className="h-32 bg-gray-100 rounded-md flex items-center justify-center">
                  <span className="text-gray-500">Custom Content Area</span>
                </div>
                <CardTitle>Flexible Layout</CardTitle>
                <CardDescription>
                  Mix and match any content within the card for complete flexibility.
                </CardDescription>
                <div className="flex gap-2">
                  <Button variant="secondary" fill="outline" size="sm">Learn More</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </LightWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Original Card functionality with composable sub-components for custom layouts.',
      },
    },
  },
};

// Dark Mode Preview
export const DarkModePreview: Story = {
  render: () => (
    <div style={{ colorScheme: 'dark', backgroundColor: '#1f2937', padding: '2rem', minHeight: '100vh' }}>
      <style>{`
        .dark-demo .vromm-card { 
          background-color: #1c1c1c !important; 
          border-color: transparent !important;
          color: #f9fafb !important;
        }
        .dark-demo .vromm-card-title { color: #e6f1ef !important; }
        .dark-demo .vromm-card-description { color: #a8c4c1 !important; }
        .dark-demo .text-gray-500 { color: #9ca3af !important; }
        .dark-demo .text-gray-600 { color: #d1d5db !important; }
        .dark-demo .text-gray-700 { color: #e5e7e9 !important; }
        .dark-demo .text-gray-900 { color: #f3f4f6 !important; }
      `}</style>
      <div className="dark-demo space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-2 text-white">Dark Mode</h3>
          <p className="text-gray-300 mb-4">
            Cards automatically adapt to dark mode with proper contrast and readability.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card
            images={sampleImages.slice(0, 3)}
            title="Dark Mode Carousel"
            description="Fully functional carousel with dark mode styling and automatic contrast adjustment."
            rating={4.8}
            reviewCount={167}
            price="$30/day"
            location="Night Trail Experience"
            carouselOptions={{
              autoPlay: true,
              autoPlayInterval: 4000,
              showDots: true,
              showArrows: true,
            }}
            onSave={() => console.log('Saved in dark mode!')}
            className="w-80"
          />
          
          <Card variant="elevated" className="w-80">
            <CardContent>
              <CardTitle>Custom Dark Card</CardTitle>
              <CardDescription>
                Dark mode styling applies to all card variants and custom layouts.
              </CardDescription>
              <div className="mt-4">
                <Button variant="primary" size="sm">Dark Action</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dark mode preview showing automatic adaptation of all card elements and carousel features.',
      },
    },
  },
};

// Video Support Examples
export const SingleVideo: Story = {
  render: () => (
    <LightWrapper>
      <div className="w-80">
        <Card
          images={[sampleVideos[0]]}
          title="Adventure Video Preview"
          description="Experience the thrill of mountain biking through scenic trails. Click to play/pause the video."
          rating={4.7}
          reviewCount={145}
          price="Free Preview"
          location="Rocky Mountain Trails"
          carouselOptions={{
            videoControls: {
              muted: true,
              autoPlay: false,
              showDuration: true,
            }
          }}
          onVideoPlay={(index, video) => console.log('Video started playing:', video.alt)}
          onVideoPause={(index, video) => console.log('Video paused:', video.alt)}
          onSave={() => console.log('Video saved!')}
          onClick={() => console.log('Video card clicked!')}
        />
      </div>
    </LightWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Single video card with play/pause controls. Videos are muted by default with no timeline or volume controls for a clean experience. Use spacebar or click to control playback.',
      },
    },
  },
};

export const VideoCarousel: Story = {
  render: () => (
    <LightWrapper>
      <div className="w-80">
        <Card
          images={sampleVideos}
          title="Adventure Video Collection"
          description="Browse through our collection of exciting adventure videos. Each video can be played independently."
          rating={4.8}
          reviewCount={267}
          price="$12.99/month"
          location="Premium Content"
          carouselOptions={{
            showDots: true,
            showArrows: true,
            loop: true,
            videoControls: {
              muted: true,
              autoPlay: false,
              showDuration: true,
            }
          }}
          onVideoPlay={(index, video) => console.log(`▶️ Playing video ${index + 1}:`, video.alt)}
          onVideoPause={(index, video) => console.log(`⏸️ Paused video ${index + 1}:`, video.alt)}
          onImageChange={(index, media) => console.log(`Switched to video ${index + 1}:`, media.alt)}
          onSave={() => console.log('Video collection saved!')}
        />
      </div>
    </LightWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Video carousel with multiple videos. Notice the rectangular pagination dots for videos. Navigation automatically pauses any currently playing video.',
      },
    },
  },
};

export const MixedMediaCarousel: Story = {
  render: () => (
    <LightWrapper>
      <div className="w-80">
        <Card
          images={mixedMedia}
          title="Complete Adventure Experience"
          description="Explore both stunning photos and exciting videos showcasing the full adventure experience."
          rating={4.9}
          reviewCount={189}
          price="$299/experience"
          location="Adventure Package"
          carouselOptions={{
            showDots: true,
            showArrows: true,
            loop: true,
            enableSwipe: true,
            videoControls: {
              muted: true,
              autoPlay: false,
              showDuration: true,
            }
          }}
          onImageChange={(index, media) => {
            console.log(`Switched to ${media.type || 'photo'} ${index + 1}:`, media.alt);
          }}
          onVideoPlay={(index, video) => console.log(`▶️ Playing video:`, video.alt)}
          onVideoPause={(index, video) => console.log(`⏸️ Paused video:`, video.alt)}
          onSave={() => console.log('Mixed media experience saved!')}
        />
      </div>
    </LightWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Mixed media carousel combining photos and videos. Notice different pagination dot styles: circles for photos, rectangles for videos. Perfect for showcasing comprehensive content.',
      },
    },
  },
};

export const VideoInteractionDemo: Story = {
  render: () => (
    <LightWrapper>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-2">Video Interaction Demo</h3>
          <p className="text-gray-600 mb-4">
            Try different ways to interact with videos: spacebar, click, arrow keys for navigation.
          </p>
        </div>

        <div className="w-80">
          <Card
            images={mixedMedia}
            title="Interactive Video Experience"
            description="🎮 Controls: Spacebar/Click = Play/Pause • Arrow Keys = Navigate • Swipe = Mobile Navigation"
            rating={5.0}
            reviewCount={99}
            price="Interactive Demo"
            location="Feature Showcase"
            isSaved={false}
            isClosable={true}
            carouselOptions={{
              showDots: true,
              showArrows: true,
              loop: true,
              enableSwipe: true,
              videoControls: {
                muted: true,
                autoPlay: false,
                showDuration: true,
              }
            }}
            onImageChange={(index, media) => {
              const mediaType = media.type === 'video' ? '🎥 Video' : '📷 Photo';
              console.log(`${mediaType} ${index + 1}:`, media.alt);
            }}
            onVideoPlay={(index, video) => {
              console.log(`▶️ Video Playing: ${video.alt}`);
            }}
            onVideoPause={(index, video) => {
              console.log(`⏸️ Video Paused: ${video.alt}`);
            }}
            onSave={() => {
              alert('Demo saved! 💾');
            }}
            onClose={() => {
              alert('Demo closed! ❌');
            }}
            onClick={() => {
              console.log('Card clicked for more details');
            }}
          />
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">💡 Interaction Tips:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• <strong>Spacebar:</strong> Play/pause current video</li>
            <li>• <strong>Click video:</strong> Toggle play/pause</li>
            <li>• <strong>Arrow keys:</strong> Navigate between media</li>
            <li>• <strong>Touch/swipe:</strong> Mobile navigation</li>
            <li>• <strong>Auto-pause:</strong> Videos pause when navigating away</li>
          </ul>
        </div>
      </div>
    </LightWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive demo of video interaction features including keyboard controls, touch gestures, and automatic pause behavior.',
      },
    },
  },
};

export const UserDataFormatExample: Story = {
  render: () => {
    // User's actual data format (like from mobile app or API)
    const userMediaData = [
      {
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        type: "video" as const,
        description: "Adventure video from mobile upload"
      },
      {
        url: "https://picsum.photos/400/300?random=300",
        type: "image" as const,
        description: "Photo from camera roll"
      },
      {
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        type: "video" as const,
        description: ""
      },
      {
        url: "https://picsum.photos/400/300?random=301",
        type: "image" as const,
        description: "Another photo"
      }
    ];

    // Transform user data to Card format
    const transformMediaForCard = (mediaItems: typeof userMediaData) => {
      return mediaItems.map((item, index) => ({
        src: item.url,
        alt: item.description || `Media item ${index + 1}`,
        type: item.type === 'image' ? 'photo' as const : 'video' as const,
        // Add video duration for demo (in real app, you might extract this)
        ...(item.type === 'video' && { duration: '2:30' })
      }));
    };

    const transformedMedia = transformMediaForCard(userMediaData);

    return (
      <LightWrapper>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-2">User Data Format Integration</h3>
            <p className="text-gray-600 mb-4">
              Example showing how to use your actual data format with the Card component.
            </p>
          </div>

          <div className="w-80">
            <Card
              images={transformedMedia}
              title="Mixed Media from User Upload"
              description="This card uses your actual data format (url, type, description) transformed to work with the Card component."
              rating={4.8}
              reviewCount={234}
              price="User Generated Content"
              location="Mobile App"
              carouselOptions={{
                showDots: true,
                showArrows: true,
                loop: true,
                videoControls: {
                  muted: true,
                  autoPlay: false,
                  showDuration: true,
                }
              }}
              onImageChange={(index, media) => {
                console.log(`User media ${index + 1}:`, media.alt);
              }}
              onVideoPlay={(index, video) => {
                console.log(`Playing user video: ${video.alt}`);
              }}
              onVideoPause={(index, video) => {
                console.log(`Paused user video: ${video.alt}`);
              }}
            />
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 mb-2">📱 Your Data Format:</h4>
            <pre className="text-sm text-green-700 bg-green-100 p-3 rounded overflow-auto">
{JSON.stringify(userMediaData, null, 2)}
            </pre>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">🔄 Transformation Code:</h4>
            <pre className="text-sm text-blue-700 bg-blue-100 p-3 rounded overflow-auto">
{`// Simple transformation function
const transformMediaForCard = (mediaItems) => {
  return mediaItems.map((item, index) => ({
    src: item.url,  // url → src
    alt: item.description || \`Media item \${index + 1}\`,
    type: item.type === 'image' ? 'photo' : 'video',
    ...(item.type === 'video' && { duration: '2:30' })
  }));
};

// Usage
const transformedMedia = transformMediaForCard(userMediaData);
<Card images={transformedMedia} ... />`}
            </pre>
          </div>
        </div>
      </LightWrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Example showing how to transform your actual data format (with url, type, description properties) to work seamlessly with the Card component. Includes local file support for mobile apps.'
      }
    }
  }
};

// Button Positioning and Mark as Driven Demo
export const ButtonPositioningDemo: Story = {
  render: () => {
    const [isSaved, setIsSaved] = useState(false);
    const [isDriven, setIsDriven] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    const handleSave = () => {
      setIsSaved(!isSaved);
      console.log(`Route ${isSaved ? 'removed from' : 'added to'} saved list`);
    };

    const handleMarkAsDriven = () => {
      setIsDriven(!isDriven);
      console.log(`Route ${isDriven ? 'removed from' : 'marked as'} driven`);
    };

    const handleClose = () => {
      setIsVisible(false);
      setTimeout(() => setIsVisible(true), 2000); // Reappear after 2 seconds for demo
      console.log('Route card closed');
    };

    if (!isVisible) {
      return (
        <LightWrapper>
          <div className="w-80 h-80 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
            <div className="text-center text-gray-500">
              <p>Card closed - will reappear in 2 seconds</p>
              <p className="text-sm mt-2">(Demo auto-reopen)</p>
            </div>
          </div>
        </LightWrapper>
      );
    }

    return (
      <LightWrapper>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-2">Fixed Button Positioning & Mark as Driven</h3>
            <p className="text-gray-600 mb-4">
              <strong>Fixed:</strong> Heart button now on LEFT, X button on RIGHT, plus new check button for "Mark as Driven" functionality.
            </p>
          </div>

          <div className="w-80">
            <Card
              images={sampleImages}
              title="Scenic Mountain Route"
              description="Beautiful winding road through mountain valleys with stunning viewpoints. Perfect for a day trip!"
              rating={4.8}
              reviewCount={342}
              price="Free"
              location="Rocky Mountain National Park"
              isSaved={isSaved}
              isDriven={isDriven}
              isClosable={true}
              carouselOptions={{
                showDots: true,
                showArrows: true,
                loop: true,
                enableSwipe: true,
              }}
              onSave={handleSave}
              onMarkAsDriven={handleMarkAsDriven}
              onClose={handleClose}
              onClick={() => console.log('Route card clicked for details')}
              onImageChange={(index, image) => console.log(`Image ${index + 1}: ${image.alt}`)}
            />
          </div>

          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">✅ Button Layout (Fixed):</h4>
              <div className="grid grid-cols-3 gap-4 text-sm text-blue-700">
                <div className="text-center">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-1">
                    ❤️
                  </div>
                  <strong>LEFT:</strong> Save/Unsave<br />
                  <span className="text-xs">({isSaved ? 'Saved' : 'Not Saved'})</span>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-1">
                    ✅
                  </div>
                  <strong>CENTER:</strong> Mark as Driven<br />
                  <span className="text-xs">({isDriven ? 'Driven' : 'Not Driven'})</span>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-1">
                    ❌
                  </div>
                  <strong>RIGHT:</strong> Close<br />
                  <span className="text-xs">(Closes card)</span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">🚗 Usage in Your Route App:</h4>
              <pre className="text-sm text-green-700 bg-green-100 p-3 rounded overflow-auto">
{`<Card 
  images={route.media_attachments}
  title={route.name}
  description={route.description}
  isSaved={selectedLocation.isSaved}
  isDriven={selectedLocation.isDriven}  // NEW
  isClosable={true}
  onSave={handleCardSave}               // Now properly called!
  onMarkAsDriven={handleMarkAsDriven}   // NEW callback
  onClose={handleCardClose}             // Now positioned RIGHT
/>`}
              </pre>
            </div>

            <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Current States:</h4>
              <div className="text-sm space-y-1">
                <div>💾 <strong>Saved:</strong> {isSaved ? '✅ Yes' : '❌ No'}</div>
                <div>🚗 <strong>Driven:</strong> {isDriven ? '✅ Yes' : '❌ No'}</div>
                <div>👁️ <strong>Visible:</strong> {isVisible ? '✅ Yes' : '❌ No'}</div>
              </div>
            </div>
          </div>
        </div>
      </LightWrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the fixed button positioning (Heart LEFT, X RIGHT) and new "Mark as Driven" functionality. This solves the original issue where the design system Card component was not calling onSave and had wrong button positions.',
      },
    },
  },
}; 

export const ComponentSupportDemo: Story = {
  render: () => (
    <LightWrapper>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-2">React Component Support</h3>
          <p className="text-gray-600 mb-4">
            Cards now support React components as media items! Mix traditional media with custom components like MapPreview.
          </p>
        </div>

        <div className="w-80">
          <Card
            images={[
              {
                src: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
                alt: 'Beautiful landscape',
                type: 'photo'
              },
              {
                component: (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
                    <div className="text-center">
                      <h3 className="text-xl font-bold mb-2">Route Preview</h3>
                      <p className="text-sm opacity-90">Custom MapPreview Component</p>
                      <div className="mt-4 bg-white/20 rounded-lg p-3">
                        <div className="flex items-center justify-between text-xs">
                          <span>Distance: 45 km</span>
                          <span>Duration: 2h 30min</span>
                        </div>
                        <div className="mt-2 bg-white/20 rounded h-1">
                          <div className="bg-white rounded h-1 w-3/4"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ),
                type: 'component',
                alt: 'Route preview component'
              },
              {
                component: (
                  <div className="w-full h-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white">
                    <div className="text-center">
                      <h3 className="text-lg font-bold mb-2">Weather Widget</h3>
                      <div className="text-4xl mb-2">🌤️</div>
                      <p className="text-sm opacity-90">Partly Cloudy</p>
                      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <div className="font-semibold">22°C</div>
                          <div className="opacity-75">Now</div>
                        </div>
                        <div>
                          <div className="font-semibold">18°C</div>
                          <div className="opacity-75">Low</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ),
                type: 'component',
                alt: 'Weather widget component'
              },
              {
                src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
                alt: 'Mountain view',
                type: 'map'
              }
            ]}
            title="Mixed Media with Components"
            description="This card demonstrates mixing traditional images with custom React components like MapPreview and WeatherWidget."
            rating={4.9}
            reviewCount={156}
            price="Demo"
            location="Component Showcase"
            carouselOptions={{
              showDots: true,
              showArrows: true,
              loop: true,
              enableSwipe: true
            }}
            onImageChange={(index, media) => {
              if (media.type === 'component') {
                console.log(`Switched to component ${index + 1}: ${media.alt}`);
              } else {
                console.log(`Switched to ${media.type} ${index + 1}: ${media.alt}`);
              }
            }}
            onSave={() => console.log('Mixed media card saved!')}
          />
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h4 className="font-semibold text-purple-800 mb-2">🧩 Component Usage:</h4>
          <pre className="text-sm text-purple-700 bg-purple-100 p-3 rounded overflow-auto">
{`// Mix traditional media with React components
const media = [
  {
    src: 'photo.jpg',
    alt: 'Photo',
    type: 'photo'
  },
  {
    component: (
      <MapPreview 
        route={route}
        waypointDetails={waypointDetails}
        className="w-full"
      />
    ),
    type: 'component',
    alt: 'Route preview'
  },
  {
    src: 'video.mp4',
    alt: 'Video',
    type: 'video'
  }
];

<Card images={media} ... />`}
          </pre>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">✨ Component Features:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Components get the full carousel container size (w-full h-48)</li>
            <li>• Automatic accessibility with proper ARIA labels</li>
            <li>• Smooth transitions between components and traditional media</li>
            <li>• Component type indicator in carousel dots</li>
            <li>• Perfect for MapPreview, charts, widgets, or any custom content</li>
          </ul>
        </div>
      </div>
    </LightWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the new React component support in Card carousels. Perfect for integrating MapPreview components, weather widgets, or any custom React content alongside traditional images and videos.',
      },
    },
  },
}; 

export const MediaHeightDemo: Story = {
  render: () => (
    <LightWrapper>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-2">Configurable Media Height</h3>
          <p className="text-gray-600 mb-4">
            Control the height of card media with predefined sizes or custom CSS values.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Small */}
          <div className="space-y-2">
            <h4 className="font-semibold">Small (sm)</h4>
            <p className="text-xs text-gray-500">10rem / 160px</p>
            <Card
              images={[{
                component: (
                  <div className="w-full h-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white">
                    <div className="text-center">
                      <h4 className="font-bold">Small</h4>
                      <p className="text-xs">10rem</p>
                    </div>
                  </div>
                ),
                type: 'component',
                alt: 'Small height demo'
              }]}
              mediaHeight="sm"
              title="Compact Card"
              description="Perfect for lists and grids"
              rating={4.5}
              reviewCount={23}
              onSave={() => console.log('Small card saved')}
            />
          </div>

          {/* Medium */}
          <div className="space-y-2">
            <h4 className="font-semibold">Medium (md)</h4>
            <p className="text-xs text-gray-500">12rem / 192px - Default</p>
            <Card
              images={[{
                component: (
                  <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white">
                    <div className="text-center">
                      <h4 className="font-bold">Medium</h4>
                      <p className="text-xs">12rem (default)</p>
                    </div>
                  </div>
                ),
                type: 'component',
                alt: 'Medium height demo'
              }]}
              mediaHeight="md"
              title="Standard Card"
              description="The default card height"
              rating={4.7}
              reviewCount={156}
              onSave={() => console.log('Medium card saved')}
            />
          </div>

          {/* Large */}
          <div className="space-y-2">
            <h4 className="font-semibold">Large (lg)</h4>
            <p className="text-xs text-gray-500">14rem / 224px</p>
            <Card
              images={[{
                component: (
                  <div className="w-full h-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white">
                    <div className="text-center">
                      <h4 className="font-bold">Large</h4>
                      <p className="text-xs">14rem</p>
                    </div>
                  </div>
                ),
                type: 'component',
                alt: 'Large height demo'
              }]}
              mediaHeight="lg"
              title="Large Card"
              description="More space for content"
              rating={4.9}
              reviewCount={89}
              onSave={() => console.log('Large card saved')}
            />
          </div>

          {/* Extra Large */}
          <div className="space-y-2">
            <h4 className="font-semibold">Extra Large (xl)</h4>
            <p className="text-xs text-gray-500">16rem / 256px</p>
            <Card
              images={[{
                component: (
                  <div className="w-full h-full bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center text-white">
                    <div className="text-center">
                      <h4 className="font-bold">Extra Large</h4>
                      <p className="text-xs">16rem</p>
                    </div>
                  </div>
                ),
                type: 'component',
                alt: 'Extra large height demo'
              }]}
              mediaHeight="xl"
              title="XL Card"
              description="Maximum preset height"
              rating={5.0}
              reviewCount={234}
              onSave={() => console.log('XL card saved')}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Custom Height Examples</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Custom pixel height */}
            <Card
              images={[{
                component: (
                  <div className="w-full h-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white">
                    <div className="text-center">
                      <h4 className="font-bold">Custom Pixels</h4>
                      <p className="text-xs">250px</p>
                    </div>
                  </div>
                ),
                type: 'component',
                alt: 'Custom pixel height demo'
              }]}
              mediaHeight="250px"
              title="Custom Pixel Height"
              description="Using 250px custom height"
              onSave={() => console.log('Custom pixel card saved')}
            />

            {/* Custom rem height */}
            <Card
              images={[{
                component: (
                  <div className="w-full h-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white">
                    <div className="text-center">
                      <h4 className="font-bold">Custom Rem</h4>
                      <p className="text-xs">18rem</p>
                    </div>
                  </div>
                ),
                type: 'component',
                alt: 'Custom rem height demo'
              }]}
              mediaHeight="18rem"
              title="Custom Rem Height"
              description="Using 18rem custom height"
              onSave={() => console.log('Custom rem card saved')}
            />

            {/* Custom viewport height */}
            <Card
              images={[{
                component: (
                  <div className="w-full h-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white">
                    <div className="text-center">
                      <h4 className="font-bold">Viewport Height</h4>
                      <p className="text-xs">25vh</p>
                    </div>
                  </div>
                ),
                type: 'component',
                alt: 'Viewport height demo'
              }]}
              mediaHeight="25vh"
              title="Viewport Height"
              description="Using 25vh for responsive height"
              onSave={() => console.log('Viewport height card saved')}
            />
          </div>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
          <h4 className="font-semibold text-emerald-800 mb-2">📏 Usage Examples:</h4>
          <pre className="text-sm text-emerald-700 bg-emerald-100 p-3 rounded overflow-auto">
{`// Predefined sizes
<Card mediaHeight="sm" ... />     // 10rem (160px)
<Card mediaHeight="md" ... />     // 12rem (192px) - default
<Card mediaHeight="lg" ... />     // 14rem (224px)
<Card mediaHeight="xl" ... />     // 16rem (256px)

// Custom values
<Card mediaHeight="250px" ... />  // Exact pixels
<Card mediaHeight="18rem" ... />  // Custom rem
<Card mediaHeight="25vh" ... />   // Viewport height
<Card mediaHeight="300px" ... />  // Any CSS value

// Modal uses same API
<Modal mediaHeight="xl" ... />    // 20rem for Modal (bigger default)`}
          </pre>
        </div>
      </div>
    </LightWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the new mediaHeight prop for Cards. Supports predefined sizes (sm, md, lg, xl) and any custom CSS value (px, rem, vh, etc.). Modal component uses the same API with different default values.',
      },
    },
  },
}; 

export const MediaActionsDemo: Story = {
  render: () => {
    const [notifications, setNotifications] = useState<string[]>([]);

    const addNotification = (message: string) => {
      setNotifications(prev => [...prev, message]);
      setTimeout(() => {
        setNotifications(prev => prev.slice(1));
      }, 3000);
    };

    const createActions = (cardName: string) => [
      {
        id: 'edit',
        label: 'Edit Card',
        type: 'edit' as const,
        onClick: (mediaIndex: number, media: any) => {
          addNotification(`Edit ${cardName}: ${media.alt || `media ${mediaIndex + 1}`}`);
        }
      },
      {
        id: 'share',
        label: 'Share',
        type: 'share' as const,
        onClick: (mediaIndex: number, media: any) => {
          addNotification(`Share ${cardName}`);
        }
      },
      {
        id: 'external',
        label: 'View Details',
        type: 'external' as const,
        url: 'https://example.com/details',
        onClick: () => {
          addNotification(`Opening details for ${cardName}...`);
        }
      },
      {
        id: 'report',
        label: 'Report',
        type: 'report' as const,
        destructive: true,
        onClick: (mediaIndex: number, media: any) => {
          addNotification(`Report ${cardName}`);
        }
      }
    ];

    return (
      <LightWrapper>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-2">Card Media Actions</h3>
            <p className="text-gray-600 mb-4">
              Cards with configurable action dropdowns in the media header. Click the three-dot menu to see available actions.
            </p>
          </div>

          {/* Notifications */}
          {notifications.length > 0 && (
            <div className="fixed top-4 right-4 space-y-2 z-50">
              {notifications.map((notification, index) => (
                <div
                  key={index}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg"
                >
                  {notification}
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Route Card with Actions */}
            <Card
              images={[{
                component: (
                  <div className="w-full h-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white">
                    <div className="text-center">
                      <h4 className="font-bold mb-1">Route #1</h4>
                      <p className="text-xs opacity-90">Stockholm → Oslo</p>
                      <div className="mt-2 text-xs bg-white/20 rounded px-2 py-1">
                        485 km • 5h 20m
                      </div>
                    </div>
                  </div>
                ),
                type: 'component',
                alt: 'Stockholm to Oslo route'
              }]}
              mediaHeight="md"
              mediaActions={createActions('Stockholm Route')}
              title="Nordic Adventure"
              description="Beautiful scenic route through Sweden and Norway"
              rating={4.8}
              reviewCount={127}
              onSave={() => addNotification('Route saved!')}
            />

            {/* Landscape Card with Actions */}
            <Card
              images={[
                {
                  src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
                  alt: 'Mountain landscape',
                  type: 'photo'
                },
                {
                  src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop',
                  alt: 'Forest road',
                  type: 'photo'
                }
              ]}
              mediaHeight="md"
              mediaActions={[
                ...createActions('Mountain Card'),
                {
                  id: 'maps',
                  label: 'Open in Maps',
                  type: 'maps' as const,
                  coordinates: { lat: 68.7604, lng: 15.1484 },
                  onClick: () => {
                    addNotification('Opening location in Google Maps...');
                  }
                }
              ]}
              title="Mountain Views"
              description="Stunning mountain landscapes from northern Sweden"
              rating={4.9}
              reviewCount={89}
              price="Free"
              onSave={() => addNotification('Mountain view saved!')}
            />

            {/* Custom Component Card */}
            <Card
              images={[{
                component: (
                  <div className="w-full h-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white">
                    <div className="text-center">
                      <h4 className="font-bold mb-1">Custom Widget</h4>
                      <p className="text-xs opacity-90">Interactive Component</p>
                      <div className="mt-2 grid grid-cols-2 gap-1 text-xs">
                        <div className="bg-white/20 rounded px-1 py-1">Data A</div>
                        <div className="bg-white/20 rounded px-1 py-1">Data B</div>
                      </div>
                    </div>
                  </div>
                ),
                type: 'component',
                alt: 'Custom dashboard widget'
              }]}
              mediaHeight="md"
              mediaActions={[
                {
                  id: 'configure',
                  label: 'Configure Widget',
                  type: 'custom' as const,
                  icon: ({ className }) => (
                    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                  onClick: () => {
                    addNotification('Widget configuration opened');
                  }
                },
                {
                  id: 'refresh',
                  label: 'Refresh Data',
                  type: 'custom' as const,
                  icon: ({ className }) => (
                    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  ),
                  onClick: () => {
                    addNotification('Data refreshed');
                  }
                },
                ...createActions('Widget Card').slice(1) // Skip edit, add others
              ]}
              title="Dashboard Widget"
              description="Interactive component with custom actions"
              onSave={() => addNotification('Widget saved!')}
            />
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 className="font-semibold text-purple-800 mb-2">🎯 Action Types Available:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-purple-700">
              <div>
                <p className="font-medium mb-1">Built-in Actions:</p>
                <ul className="space-y-0.5">
                  <li>• <strong>edit:</strong> Edit functionality</li>
                  <li>• <strong>share:</strong> Share content</li>
                  <li>• <strong>external:</strong> Open URLs</li>
                  <li>• <strong>maps:</strong> Google Maps integration</li>
                </ul>
              </div>
              <div>
                <p className="font-medium mb-1">Destructive Actions:</p>
                <ul className="space-y-0.5">
                  <li>• <strong>report:</strong> Report/flag content</li>
                  <li>• <strong>delete:</strong> Delete content</li>
                  <li>• <strong>custom:</strong> Any custom action</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </LightWrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the new mediaActions prop for Cards. Adds a three-dot dropdown menu to card media headers with support for various action types including edit, share, external links, Google Maps, and custom actions with custom icons.',
      },
    },
  },
}; 