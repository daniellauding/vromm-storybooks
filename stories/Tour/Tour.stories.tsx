import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TourProvider, Tour, useTour, TourStep } from '../../src/components/Tour';
import { Button } from '../../src/components/Button/Button';
import { Card } from '../../src/components/Card/Card';

// Sample tour steps for different scenarios
const sampleTourSteps: TourStep[] = [
  {
    id: '1',
    title_en: 'Welcome to the Tour!',
    title_sv: 'Välkommen till rundturen!',
    text_en: 'This is your first step in our interactive tour. Click "Next" to continue.',
    text_sv: 'Detta är ditt första steg i vår interaktiva rundtur. Klicka på "Nästa" för att fortsätta.',
    target: '.tour-step-1',
    placement: 'bottom',
    icon: '👋',
    icon_color: '#3498db',
    order: 1,
    active: true,
    tour_type: 'storybook',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    title_en: 'Interactive Elements',
    title_sv: 'Interaktiva element',
    text_en: 'Here you can interact with different components. Try clicking buttons and exploring features.',
    text_sv: 'Här kan du interagera med olika komponenter. Prova att klicka på knappar och utforska funktioner.',
    target: '.tour-step-2',
    placement: 'top',
    icon: '🎯',
    icon_color: '#e74c3c',
    order: 2,
    active: true,
    tour_type: 'storybook',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    title_en: 'Card Components',
    title_sv: 'Kortkomponenter',
    text_en: 'This card component supports images, videos, and carousel functionality with full accessibility.',
    text_sv: 'Denna kortkomponent stöder bilder, videor och karussellfunktionalitet med full tillgänglighet.',
    target: '.tour-step-3',
    placement: 'left',
    icon: '🎴',
    icon_color: '#2ecc71',
    order: 3,
    active: true,
    tour_type: 'storybook',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    title_en: 'Theme & Language',
    title_sv: 'Tema och språk',
    text_en: 'You can switch between light/dark themes and English/Swedish languages dynamically.',
    text_sv: 'Du kan växla mellan ljusa/mörka teman och engelska/svenska språk dynamiskt.',
    target: '.tour-step-4',
    placement: 'right',
    icon: '🌙',
    icon_color: '#9b59b6',
    order: 4,
    active: true,
    tour_type: 'storybook',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '5',
    title_en: 'Tour Complete!',
    title_sv: 'Rundtur klar!',
    text_en: 'Congratulations! You\'ve completed the tour. You can now explore all features independently.',
    text_sv: 'Grattis! Du har slutfört rundturen. Du kan nu utforska alla funktioner självständigt.',
    target: 'body',
    placement: 'auto',
    icon: '🎉',
    icon_color: '#f39c12',
    order: 5,
    active: true,
    tour_type: 'storybook',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const componentTourSteps: TourStep[] = [
  {
    id: 'comp-1',
    title_en: 'Component Overview',
    title_sv: 'Komponentöversikt',
    text_en: 'This tour focuses specifically on component features and interactions.',
    text_sv: 'Denna rundtur fokuserar specifikt på komponentfunktioner och interaktioner.',
    target: '.component-demo',
    placement: 'top',
    icon: '⚡',
    icon_color: '#3498db',
    order: 1,
    active: true,
    tour_type: 'component',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'comp-2',
    title_en: 'Advanced Features',
    title_sv: 'Avancerade funktioner',
    text_en: 'Explore advanced features like video support, touch gestures, and keyboard navigation.',
    text_sv: 'Utforska avancerade funktioner som videostöd, touchgester och tangentbordsnavigering.',
    target: '.advanced-features',
    placement: 'bottom',
    icon: '🚀',
    icon_color: '#e74c3c',
    order: 2,
    active: true,
    tour_type: 'component',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// Demo component to showcase tour functionality
const TourDemoComponent = () => {
  const { 
    startTour, 
    stopTour, 
    isRunning, 
    setTheme, 
    setLanguage, 
    theme, 
    currentLanguage,
    setTourOptions 
  } = useTour();

  const [demoContent, setDemoContent] = useState('Welcome to the interactive demo!');

  const handleStartBasicTour = () => {
    startTour('basic-demo', sampleTourSteps);
  };

  const handleStartComponentTour = () => {
    startTour('component-demo', componentTourSteps);
  };

  const handleThemeToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleLanguageToggle = () => {
    setLanguage(currentLanguage === 'en' ? 'sv' : 'en');
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      theme === 'dark' 
        ? 'bg-gray-900 text-white' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">
            {currentLanguage === 'sv' ? 'Interaktiv rundtur demo' : 'Interactive Tour Demo'}
          </h1>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            {currentLanguage === 'sv' 
              ? 'Utforska vår guidefunktionalitet med teman och språkstöd'
              : 'Explore our tour functionality with theme and language support'
            }
          </p>
        </div>

        {/* Tour Controls */}
        <div className="tour-step-1 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">
            {currentLanguage === 'sv' ? 'Rundturkontroller' : 'Tour Controls'}
          </h2>
          <div className="flex flex-wrap gap-4">
            <Button 
              onClick={handleStartBasicTour}
              disabled={isRunning}
              variant="primary"
            >
              {currentLanguage === 'sv' ? 'Starta grundläggande rundtur' : 'Start Basic Tour'}
            </Button>
            <Button 
              onClick={handleStartComponentTour}
              disabled={isRunning}
              variant="outline"
            >
              {currentLanguage === 'sv' ? 'Komponentrundtur' : 'Component Tour'}
            </Button>
            <Button 
              onClick={stopTour}
              disabled={!isRunning}
              variant="secondary"
            >
              {currentLanguage === 'sv' ? 'Stoppa rundtur' : 'Stop Tour'}
            </Button>
          </div>
        </div>

        {/* Interactive Elements */}
        <div className="tour-step-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          } rounded-lg p-6 shadow-lg`}>
            <h3 className="text-lg font-semibold mb-4">
              {currentLanguage === 'sv' ? 'Interaktiva element' : 'Interactive Elements'}
            </h3>
            <div className="space-y-4">
              <Button 
                onClick={() => setDemoContent(
                  currentLanguage === 'sv' ? 'Knapp klickad!' : 'Button clicked!'
                )}
                variant="primary"
                size="sm"
              >
                {currentLanguage === 'sv' ? 'Klicka mig' : 'Click Me'}
              </Button>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                {demoContent}
              </p>
            </div>
          </div>

          <div className={`${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          } rounded-lg p-6 shadow-lg component-demo`}>
            <h3 className="text-lg font-semibold mb-4">
              {currentLanguage === 'sv' ? 'Komponentdemo' : 'Component Demo'}
            </h3>
            <div className="space-y-2">
              <div className="flex gap-2">
                <span className="w-4 h-4 bg-blue-500 rounded-full"></span>
                <span className="w-4 h-4 bg-green-500 rounded-full"></span>
                <span className="w-4 h-4 bg-red-500 rounded-full"></span>
              </div>
              <p className="text-sm">
                {currentLanguage === 'sv' ? 'Visuella komponenter' : 'Visual components'}
              </p>
            </div>
          </div>
        </div>

        {/* Card Component Demo */}
        <div className="tour-step-3">
          <h3 className="text-xl font-semibold mb-4">
            {currentLanguage === 'sv' ? 'Kortkomponent med video' : 'Card Component with Video'}
          </h3>
          <div className="max-w-sm">
            <Card
              images={[{
                src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                alt: 'Demo video',
                type: 'video' as const,
                poster: 'https://picsum.photos/400/300?random=200',
                duration: '3:24'
              }]}
              title={currentLanguage === 'sv' ? 'Video demo kort' : 'Video Demo Card'}
              description={
                currentLanguage === 'sv' 
                  ? 'Detta kort stöder videouppspelning med kontroller'
                  : 'This card supports video playback with controls'
              }
              rating={4.8}
              reviewCount={156}
              price={currentLanguage === 'sv' ? 'Gratis demo' : 'Free Demo'}
              carouselOptions={{
                videoControls: {
                  muted: true,
                  autoPlay: false,
                  showDuration: true,
                }
              }}
            />
          </div>
        </div>

        {/* Theme & Language Controls */}
        <div className="tour-step-4 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg advanced-features">
          <h3 className="text-xl font-semibold mb-4">
            {currentLanguage === 'sv' ? 'Tema och språkinställningar' : 'Theme & Language Settings'}
          </h3>
          <div className="flex flex-wrap gap-4">
            <Button onClick={handleThemeToggle} variant="outline">
              {theme === 'light' ? '🌙' : '☀️'} {
                currentLanguage === 'sv' 
                  ? `Växla till ${theme === 'light' ? 'mörkt' : 'ljust'} tema`
                  : `Switch to ${theme === 'light' ? 'dark' : 'light'} theme`
              }
            </Button>
            <Button onClick={handleLanguageToggle} variant="outline">
              🌐 {
                currentLanguage === 'en' 
                  ? 'Växla till svenska'
                  : 'Switch to English'
              }
            </Button>
          </div>
          <p className={`mt-4 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            {currentLanguage === 'sv'
              ? 'Aktuellt tema: ' + (theme === 'light' ? 'Ljust' : 'Mörkt') + ' | Aktuellt språk: Svenska'
              : 'Current theme: ' + (theme === 'light' ? 'Light' : 'Dark') + ' | Current language: English'
            }
          </p>
        </div>

        {/* Status */}
        {isRunning && (
          <div className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg">
            {currentLanguage === 'sv' ? '🎯 Rundtur aktiv' : '🎯 Tour Active'}
          </div>
        )}
      </div>
    </div>
  );
};

const meta: Meta<typeof Tour> = {
  title: 'Components/Tour',
  component: Tour,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Interactive tour system with multi-language support, theme switching, and comprehensive navigation controls. Built on react-joyride with enhanced features for Storybook integration.'
      }
    }
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes for the tour component'
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic tour example
export const BasicTour: Story = {
  render: () => (
    <TourProvider defaultTheme="light" defaultLanguage="en">
      <TourDemoComponent />
      <Tour />
    </TourProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic tour implementation with light theme and English language. Click "Start Basic Tour" to begin the interactive experience.'
      }
    }
  }
};

// Dark theme tour
export const DarkThemeTour: Story = {
  render: () => (
    <TourProvider defaultTheme="dark" defaultLanguage="en">
      <TourDemoComponent />
      <Tour />
    </TourProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tour with dark theme styling. All tooltips and UI elements automatically adapt to the dark theme.'
      }
    }
  }
};

// Swedish language tour
export const SwedishLanguageTour: Story = {
  render: () => (
    <TourProvider defaultTheme="light" defaultLanguage="sv">
      <TourDemoComponent />
      <Tour />
    </TourProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tour with Swedish language interface. Both tour content and UI controls are localized.'
      }
    }
  }
};

// Auto theme detection
export const AutoThemeTour: Story = {
  render: () => (
    <TourProvider defaultTheme="auto" defaultLanguage="en">
      <TourDemoComponent />
      <Tour />
    </TourProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tour with automatic theme detection based on system preferences. Try changing your system theme to see it adapt.'
      }
    }
  }
};

// Custom options tour
export const CustomOptionsTour: Story = {
  render: () => (
    <TourProvider 
      defaultTheme="light" 
      defaultLanguage="en"
      defaultOptions={{
        showProgress: true,
        showSkipButton: true,
        continuous: true,
        debug: false,
        styles: {
          options: {
            primaryColor: '#e74c3c',
          },
          tooltip: {
            backgroundColor: '#2c3e50',
            color: '#ecf0f1',
          }
        }
      }}
    >
      <TourDemoComponent />
      <Tour />
    </TourProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tour with custom styling options including custom primary color and tooltip appearance.'
      }
    }
  }
};

// Component-specific tour
export const ComponentTour: Story = {
  render: () => {
    const ComponentDemo = () => {
      const { startTour } = useTour();

      const handleStartComponentTour = () => {
        startTour('component-demo', componentTourSteps);
      };

      return (
        <div className="p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Component-Specific Tour</h2>
            <Button onClick={handleStartComponentTour} variant="primary">
              Start Component Tour
            </Button>
          </div>

          <div className="component-demo bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Target Component</h3>
            <p className="text-gray-600">This is the main component being demonstrated in the tour.</p>
          </div>

          <div className="advanced-features bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Advanced Features</h3>
            <p className="text-gray-600">Additional features and capabilities are highlighted here.</p>
          </div>
        </div>
      );
    };

    return (
      <TourProvider defaultTheme="light" defaultLanguage="en">
        <ComponentDemo />
        <Tour />
      </TourProvider>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Focused tour for specific component features. Demonstrates how to create targeted tours for individual components or features.'
      }
    }
  }
}; 