import type { Preview } from '@storybook/react';
import { createElement } from 'react';
import '../src/styles/globals.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      theme: {
        base: 'light',
        brandTitle: 'Vromm Design System',
        brandUrl: '/',
        brandImage: undefined,
      },
    },
    viewport: {
      viewports: {
        // Web viewports
        desktop: {
          name: '🖥️ Desktop',
          styles: {
            width: '1440px',
            height: '1024px',
          },
        },
        desktopLarge: {
          name: '🖥️ Desktop Large',
          styles: {
            width: '1920px',
            height: '1080px',
          },
        },
        laptop: {
          name: '💻 Laptop',
          styles: {
            width: '1024px',
            height: '768px',
          },
        },
        // Mobile viewports
        iphone12: {
          name: '📱 iPhone 12',
          styles: {
            width: '390px',
            height: '844px',
          },
        },
        iphone12Pro: {
          name: '📱 iPhone 12 Pro',
          styles: {
            width: '390px',
            height: '844px',
          },
        },
        iphone14Pro: {
          name: '📱 iPhone 14 Pro',
          styles: {
            width: '393px',
            height: '852px',
          },
        },
        androidPixel: {
          name: '📱 Pixel 6',
          styles: {
            width: '412px',
            height: '915px',
          },
        },
        // Tablet viewports
        ipadMini: {
          name: '📱 iPad Mini',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        ipadPro: {
          name: '📱 iPad Pro',
          styles: {
            width: '1024px',
            height: '1366px',
          },
        },
        // React Native testing
        reactNativeMobile: {
          name: '📱 RN Mobile',
          styles: {
            width: '375px',
            height: '812px',
          },
        },
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#0f172a',
        },
        {
          name: 'gray',
          value: '#f8fafc',
        },
        {
          name: 'neutral-50',
          value: '#fafafa',
        },
        {
          name: 'primary-50',
          value: '#f0f9ff',
        },
      ],
    },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'circlehollow', title: 'Light' },
          { value: 'dark', icon: 'circle', title: 'Dark' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
    locale: {
      name: 'Locale',
      description: 'Internationalization locale',
      defaultValue: 'en',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'en', right: '🇺🇸', title: 'English' },
          { value: 'sv', right: '🇸🇪', title: 'Svenska' },
          { value: 'es', right: '🇪🇸', title: 'Español' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
    platform: {
      name: 'Platform',
      description: 'Target platform for component testing',
      defaultValue: 'web',
      toolbar: {
        icon: 'component',
        items: [
          { value: 'web', title: '🌐 Web', right: 'Web' },
          { value: 'mobile', title: '📱 Mobile Web', right: 'Mobile' },
          { value: 'react-native', title: '📱 React Native', right: 'RN' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
    textDirection: {
      name: 'Text Direction',
      description: 'Text direction for RTL testing',
      defaultValue: 'ltr',
      toolbar: {
        icon: 'transfer',
        items: [
          { value: 'ltr', title: 'Left to Right' },
          { value: 'rtl', title: 'Right to Left' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
    accessibility: {
      name: 'A11y',
      description: 'Accessibility testing mode',
      defaultValue: 'normal',
      toolbar: {
        icon: 'accessibility',
        items: [
          { value: 'normal', title: 'Normal' },
          { value: 'reduced-motion', title: 'Reduced Motion' },
          { value: 'high-contrast', title: 'High Contrast' },
          { value: 'focus-visible', title: 'Focus Indicators' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const { theme, platform, textDirection, accessibility } = context.globals;
      
      // Apply theme to document
      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        document.documentElement.setAttribute('dir', textDirection);
        
        // Platform-specific classes
        document.documentElement.classList.remove('platform-web', 'platform-mobile', 'platform-react-native');
        document.documentElement.classList.add(`platform-${platform}`);
        
        // Accessibility classes
        document.documentElement.classList.remove(
          'reduce-motion', 
          'high-contrast', 
          'focus-visible-always'
        );
        
        if (accessibility === 'reduced-motion') {
          document.documentElement.classList.add('reduce-motion');
        }
        if (accessibility === 'high-contrast') {
          document.documentElement.classList.add('high-contrast');
        }
        if (accessibility === 'focus-visible') {
          document.documentElement.classList.add('focus-visible-always');
        }
      }
      
      // Platform-specific wrapper styling
      const platformStyles = {
        web: {},
        mobile: {
          maxWidth: '390px',
          margin: '0 auto',
          padding: '16px',
        },
        'react-native': {
          maxWidth: '375px',
          margin: '0 auto',
          padding: '16px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        },
      };

      return createElement(
        'div',
        {
          style: {
            minHeight: '100vh',
            ...platformStyles[platform as keyof typeof platformStyles],
          },
          'data-platform': platform,
          'data-theme': theme,
          'data-locale': context.globals.locale,
        },
        createElement(Story)
      );
    },
  ],
};

export default preview; 