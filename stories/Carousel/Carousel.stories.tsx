import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Carousel } from '../../src/components/Carousel';
import { Button } from '../../src/components/Button';
import { QuickIcon } from '../../src/components/Icon';

const meta = {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'fade', 'slide'],
    },
    arrowPosition: {
      control: 'select',
      options: ['inside', 'outside'],
    },
    indicatorPosition: {
      control: 'select',
      options: ['bottom', 'top'],
    },
    showArrows: {
      control: 'boolean',
    },
    showIndicators: {
      control: 'boolean',
    },
    autoPlay: {
      control: 'boolean',
    },
    autoPlayInterval: {
      control: 'number',
    },
    loop: {
      control: 'boolean',
    },
    pauseOnHover: {
      control: 'boolean',
    },
    enableTouch: {
      control: 'boolean',
    },
    duration: {
      control: 'number',
    },
  },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample slides data
const createSlide = (color: string, number: number, title?: string) => (
  <div className={`${color} h-64 flex items-center justify-center text-white text-xl font-bold rounded-lg`}>
    <div className="text-center">
      <div className="text-4xl mb-2">{number}</div>
      {title && <div className="text-lg">{title}</div>}
    </div>
  </div>
);

const imageSlides = [
  {
    id: 1,
    title: "Beautiful Landscape",
    description: "Discover amazing places around the world",
    image: "bg-gradient-to-br from-blue-400 to-purple-600"
  },
  {
    id: 2,
    title: "City Skyline",
    description: "Modern architecture and urban landscapes", 
    image: "bg-gradient-to-br from-green-400 to-blue-600"
  },
  {
    id: 3,
    title: "Natural Wonders",
    description: "Explore the beauty of nature",
    image: "bg-gradient-to-br from-yellow-400 to-red-600"
  },
  {
    id: 4,
    title: "Ocean Views",
    description: "Peaceful coastal scenery",
    image: "bg-gradient-to-br from-cyan-400 to-blue-600"
  }
];

export const Default: Story = {
  render: () => (
    <div className="w-96">
      <Carousel>
        {createSlide('bg-blue-500', 1, 'First Slide')}
        {createSlide('bg-green-500', 2, 'Second Slide')}
        {createSlide('bg-purple-500', 3, 'Third Slide')}
        {createSlide('bg-red-500', 4, 'Fourth Slide')}
      </Carousel>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="w-96">
        <h3 className="font-semibold mb-4">Slide Transition</h3>
        <Carousel variant="slide">
          {createSlide('bg-blue-500', 1)}
          {createSlide('bg-green-500', 2)}
          {createSlide('bg-purple-500', 3)}
        </Carousel>
      </div>
      
      <div className="w-96">
        <h3 className="font-semibold mb-4">Fade Transition</h3>
        <Carousel variant="fade">
          {createSlide('bg-red-500', 1)}
          {createSlide('bg-yellow-500', 2)}
          {createSlide('bg-pink-500', 3)}
        </Carousel>
      </div>
    </div>
  ),
};

export const AutoPlay: Story = {
  render: () => (
    <div className="w-96">
      <p className="text-sm text-gray-600 mb-4">This carousel auto-plays every 3 seconds. Hover to pause.</p>
      <Carousel 
        autoPlay 
        autoPlayInterval={3000}
        pauseOnHover
      >
        {createSlide('bg-indigo-500', 1, 'Auto Play')}
        {createSlide('bg-teal-500', 2, 'Hover to Pause')}
        {createSlide('bg-orange-500', 3, 'Auto Resume')}
      </Carousel>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [activeIndex, setActiveIndex] = useState(0);
    
    return (
      <div className="space-y-4">
        <div className="flex gap-2 justify-center">
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => setActiveIndex(0)}
          >
            Slide 1
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => setActiveIndex(1)}
          >
            Slide 2
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => setActiveIndex(2)}
          >
            Slide 3
          </Button>
        </div>
        
        <div className="w-96">
          <Carousel 
            activeIndex={activeIndex}
            onSlideChange={setActiveIndex}
          >
            {createSlide('bg-violet-500', 1, 'Controlled')}
            {createSlide('bg-rose-500', 2, 'Carousel')}
            {createSlide('bg-emerald-500', 3, 'Example')}
          </Carousel>
        </div>
        
        <div className="text-center text-sm text-gray-600">
          Current slide: {activeIndex + 1}
        </div>
      </div>
    );
  },
};

export const CustomArrows: Story = {
  render: () => (
    <div className="w-96">
      <Carousel 
        prevIcon={<QuickIcon name="arrow-left" />}
        nextIcon={<QuickIcon name="arrow-right" />}
        arrowPosition="outside"
      >
        {createSlide('bg-cyan-500', 1, 'Custom')}
        {createSlide('bg-lime-500', 2, 'Arrow')}
        {createSlide('bg-amber-500', 3, 'Icons')}
      </Carousel>
    </div>
  ),
};

export const NoLoop: Story = {
  render: () => (
    <div className="w-96">
      <p className="text-sm text-gray-600 mb-4">Arrows disable at first/last slide when loop is false.</p>
      <Carousel loop={false}>
        {createSlide('bg-slate-500', 1, 'First')}
        {createSlide('bg-gray-500', 2, 'Middle')}
        {createSlide('bg-zinc-500', 3, 'Last')}
      </Carousel>
    </div>
  ),
};

export const Positioning: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="w-96">
        <h3 className="font-semibold mb-4">Arrows Outside, Indicators Top</h3>
        <Carousel 
          arrowPosition="outside"
          indicatorPosition="top"
        >
          {createSlide('bg-blue-600', 1)}
          {createSlide('bg-purple-600', 2)}
          {createSlide('bg-green-600', 3)}
        </Carousel>
      </div>
      
      <div className="w-96">
        <h3 className="font-semibold mb-4">Arrows Inside, Indicators Bottom</h3>
        <Carousel 
          arrowPosition="inside"
          indicatorPosition="bottom"
        >
          {createSlide('bg-red-600', 1)}
          {createSlide('bg-yellow-600', 2)}
          {createSlide('bg-pink-600', 3)}
        </Carousel>
      </div>
    </div>
  ),
};

export const WithoutControls: Story = {
  render: () => (
    <div className="w-96">
      <p className="text-sm text-gray-600 mb-4">Carousel with no arrows or indicators (touch/swipe only).</p>
      <Carousel 
        showArrows={false}
        showIndicators={false}
        autoPlay
        autoPlayInterval={4000}
      >
        {createSlide('bg-indigo-600', 1, 'Swipe')}
        {createSlide('bg-purple-600', 2, 'Only')}
        {createSlide('bg-pink-600', 3, 'Mode')}
      </Carousel>
    </div>
  ),
};

export const ImageCarousel: Story = {
  render: () => (
    <div className="w-96">
      <Carousel 
        autoPlay
        autoPlayInterval={5000}
        variant="fade"
      >
        {imageSlides.map((slide) => (
          <div key={slide.id} className={`${slide.image} h-64 rounded-lg relative overflow-hidden`}>
            <div className="absolute inset-0 bg-black bg-opacity-30" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-xl font-bold mb-2">{slide.title}</h3>
              <p className="text-sm opacity-90">{slide.description}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  ),
};

export const ProductCarousel: Story = {
  render: () => (
    <div className="w-96">
      <h3 className="font-semibold mb-4">Product Showcase</h3>
      <Carousel showIndicators={false}>
        <div className="bg-white border-2 border-gray-200 rounded-lg p-6 h-80 flex flex-col items-center justify-center">
          <div className="w-24 h-24 bg-blue-100 rounded-full mb-4 flex items-center justify-center">
            <QuickIcon name="home" size="lg" variant="primary" />
          </div>
          <h4 className="font-semibold text-lg mb-2">Smart Home Hub</h4>
          <p className="text-gray-600 text-center text-sm mb-4">Control your entire home with voice commands</p>
          <Button variant="primary" size="sm">Learn More</Button>
        </div>
        
        <div className="bg-white border-2 border-gray-200 rounded-lg p-6 h-80 flex flex-col items-center justify-center">
          <div className="w-24 h-24 bg-green-100 rounded-full mb-4 flex items-center justify-center">
            <QuickIcon name="search" size="lg" variant="success" />
          </div>
          <h4 className="font-semibold text-lg mb-2">Security System</h4>
          <p className="text-gray-600 text-center text-sm mb-4">24/7 monitoring and protection for your family</p>
          <Button variant="success" size="sm">Learn More</Button>
        </div>
        
        <div className="bg-white border-2 border-gray-200 rounded-lg p-6 h-80 flex flex-col items-center justify-center">
          <div className="w-24 h-24 bg-purple-100 rounded-full mb-4 flex items-center justify-center">
            <QuickIcon name="user" size="lg" variant="secondary" />
          </div>
          <h4 className="font-semibold text-lg mb-2">Personal Assistant</h4>
          <p className="text-gray-600 text-center text-sm mb-4">AI-powered help for your daily tasks</p>
          <Button variant="secondary" size="sm">Learn More</Button>
        </div>
      </Carousel>
    </div>
  ),
};

export const TestimonialCarousel: Story = {
  render: () => (
    <div className="w-96">
      <h3 className="font-semibold mb-4">Customer Reviews</h3>
      <Carousel 
        autoPlay
        autoPlayInterval={6000}
        variant="fade"
        showArrows={false}
      >
        <div className="bg-gray-50 rounded-lg p-6 h-48 flex flex-col justify-between">
          <div>
            <p className="text-gray-700 italic">"Amazing product! It completely transformed how we work. Highly recommended to anyone looking for a reliable solution."</p>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
              JS
            </div>
            <div>
              <div className="font-medium">John Smith</div>
              <div className="text-sm text-gray-500">CEO, TechCorp</div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-6 h-48 flex flex-col justify-between">
          <div>
            <p className="text-gray-700 italic">"The customer support is outstanding. They helped us every step of the way and the results exceeded our expectations."</p>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">
              MD
            </div>
            <div>
              <div className="font-medium">Maria Davis</div>
              <div className="text-sm text-gray-500">Marketing Director</div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-6 h-48 flex flex-col justify-between">
          <div>
            <p className="text-gray-700 italic">"Simple to use yet powerful. Our team productivity increased by 40% since we started using this solution."</p>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
              RJ
            </div>
            <div>
              <div className="font-medium">Robert Johnson</div>
              <div className="text-sm text-gray-500">Project Manager</div>
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  ),
}; 