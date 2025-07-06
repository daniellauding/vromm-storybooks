import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Title, Text } from '../../src/components';

const meta: Meta = {
  title: 'Design System/Tokens',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Design tokens are the visual design atoms of the design system — specifically, they are named entities that store visual design attributes.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Token display component
const TokenDisplay = ({ 
  name, 
  value, 
  cssVar, 
  scssVar, 
  jsVar, 
  colorValue, 
  description 
}: {
  name: string;
  value?: string;
  cssVar: string;
  scssVar: string;
  jsVar: string;
  colorValue?: string;
  description?: string;
}) => {
  const [copied, setCopied] = useState('');

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg bg-card">
      {colorValue && (
        <div 
          className="w-16 h-16 rounded-lg border shadow-sm flex-shrink-0"
          style={{ backgroundColor: colorValue }}
        />
      )}
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Text weight="semibold">{name}</Text>
          {value && (
            <Text size="sm" family="mono" variant="weak">
              {value}
            </Text>
          )}
        </div>
        
        {description && (
          <Text size="sm" variant="weak" className="mb-2">
            {description}
          </Text>
        )}
        
        <div className="space-y-1">
          <button
            onClick={() => copyToClipboard(cssVar, 'css')}
            className="flex items-center gap-2 text-left text-sm hover:bg-muted p-1 rounded transition-colors w-full"
          >
            <Text size="xs" variant="weak" className="w-8">CSS</Text>
            <Text size="xs" family="mono">{cssVar}</Text>
            {copied === 'css' && <Text size="xs" variant="success">✓</Text>}
          </button>
          
          <button
            onClick={() => copyToClipboard(scssVar, 'scss')}
            className="flex items-center gap-2 text-left text-sm hover:bg-muted p-1 rounded transition-colors w-full"
          >
            <Text size="xs" variant="weak" className="w-8">SCSS</Text>
            <Text size="xs" family="mono">{scssVar}</Text>
            {copied === 'scss' && <Text size="xs" variant="success">✓</Text>}
          </button>
          
          <button
            onClick={() => copyToClipboard(jsVar, 'js')}
            className="flex items-center gap-2 text-left text-sm hover:bg-muted p-1 rounded transition-colors w-full"
          >
            <Text size="xs" variant="weak" className="w-8">JS</Text>
            <Text size="xs" family="mono">{jsVar}</Text>
            {copied === 'js' && <Text size="xs" variant="success">✓</Text>}
          </button>
        </div>
      </div>
    </div>
  );
};

const ColorSection = ({ title, tokens }: { title: string; tokens: any[] }) => (
  <div className="space-y-4">
    <Title level={3} size="lg" weight="semibold">{title}</Title>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {tokens.map((token) => (
        <TokenDisplay key={token.name} {...token} />
      ))}
    </div>
  </div>
);

export const Colors: Story = {
  render: () => {
    const [activeCategory, setActiveCategory] = useState('neutral');
    
    const categories = [
      { id: 'neutral', label: 'Neutral' },
      { id: 'primary', label: 'Primary' },
      { id: 'secondary', label: 'Secondary' },
      { id: 'success', label: 'Success' },
      { id: 'warning', label: 'Warning' },
      { id: 'error', label: 'Error' },
      { id: 'semantic', label: 'Semantic' },
    ];

    const neutralTokens = [
      {
        name: 'neutral/text',
        colorValue: '#171717',
        cssVar: 'var(--vromm-color-text)',
        scssVar: '$vromm-color-text',
        jsVar: 'tokens.vrommColorText',
        description: 'Primary text color'
      },
      {
        name: 'neutral/text-weak',
        colorValue: '#525252',
        cssVar: 'var(--vromm-color-text-weak)',
        scssVar: '$vromm-color-text-weak',
        jsVar: 'tokens.vrommColorTextWeak',
        description: 'Secondary text color'
      },
      {
        name: 'neutral/text-disabled',
        colorValue: '#a3a3a3',
        cssVar: 'var(--vromm-color-text-disabled)',
        scssVar: '$vromm-color-text-disabled',
        jsVar: 'tokens.vrommColorTextDisabled',
        description: 'Disabled text color'
      },
      {
        name: 'neutral/text-inverted',
        colorValue: '#fafafa',
        cssVar: 'var(--vromm-color-text-inverted)',
        scssVar: '$vromm-color-text-inverted',
        jsVar: 'tokens.vrommColorTextInverted',
        description: 'Inverted text color for dark backgrounds'
      },
      {
        name: 'neutral/background',
        colorValue: '#ffffff',
        cssVar: 'var(--vromm-color-background)',
        scssVar: '$vromm-color-background',
        jsVar: 'tokens.vrommColorBackground',
        description: 'Primary background color'
      },
      {
        name: 'neutral/background-medium',
        colorValue: '#fafafa',
        cssVar: 'var(--vromm-color-background-medium)',
        scssVar: '$vromm-color-background-medium',
        jsVar: 'tokens.vrommColorBackgroundMedium',
        description: 'Medium background color'
      },
      {
        name: 'neutral/border',
        colorValue: '#d4d4d4',
        cssVar: 'var(--vromm-color-border)',
        scssVar: '$vromm-color-border',
        jsVar: 'tokens.vrommColorBorder',
        description: 'Primary border color'
      },
    ];

    const primaryTokens = [
      {
        name: 'primary/50',
        colorValue: '#f0f9ff',
        cssVar: 'var(--vromm-color-primary-50)',
        scssVar: '$vromm-color-primary-50',
        jsVar: 'tokens.vrommColorPrimary50',
      },
      {
        name: 'primary/500',
        colorValue: '#0ea5e9',
        cssVar: 'var(--vromm-color-primary-500)',
        scssVar: '$vromm-color-primary-500',
        jsVar: 'tokens.vrommColorPrimary500',
      },
      {
        name: 'primary/900',
        colorValue: '#0c4a6e',
        cssVar: 'var(--vromm-color-primary-900)',
        scssVar: '$vromm-color-primary-900',
        jsVar: 'tokens.vrommColorPrimary900',
      },
    ];

    const getCurrentTokens = () => {
      switch (activeCategory) {
        case 'neutral': return neutralTokens;
        case 'primary': return primaryTokens;
        case 'secondary': return [];
        case 'success': return [];
        case 'warning': return [];
        case 'error': return [];
        case 'semantic': return [];
        default: return neutralTokens;
      }
    };

    return (
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        <div className="space-y-4">
          <Title level={1} size="4xl" weight="bold">Colors</Title>
          <Text size="lg" variant="weak">
            Color tokens define the color palette for the Vromm design system. They provide semantic meaning and ensure consistency across all platforms.
          </Text>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 border-b pb-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeCategory === category.id
                  ? 'bg-primary-100 text-primary-700 border border-primary-200'
                  : 'hover:bg-muted text-muted-foreground'
              }`}
            >
              <Text size="sm" weight="medium">{category.label}</Text>
            </button>
          ))}
        </div>

        {/* Token Display */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {getCurrentTokens().map((token) => (
              <TokenDisplay key={token.name} {...token} />
            ))}
          </div>
        </div>


      </div>
    );
  }
};

// Icons data based on Untitled UI
const iconCategories = {
  'General': [
    {
      name: 'add-user',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 15.5H7.5C6.10444 15.5 5.40665 15.5 4.83886 15.6722C3.56045 16.06 2.56004 17.0605 2.17224 18.3389C2 18.9067 2 19.6044 2 21M19 21V15M16 18H22M14.5 7.5C14.5 9.98528 12.4853 12 10 12C7.51472 12 5.5 9.98528 5.5 7.5C5.5 5.01472 7.51472 3 10 3C12.4853 3 14.5 5.01472 14.5 7.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
    },
    {
      name: 'plus',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
    },
    {
      name: 'close',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
    },
    {
      name: 'trash',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 6H5H21M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
    },
    {
      name: 'user',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
    },
    {
      name: 'home',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9 22V12H15V22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
    },
    {
      name: 'grid',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 3H10V10H3V3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14 3H21V10H14V3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14 14H21V21H14V14Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3 14H10V21H3V14Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
    },
    {
      name: 'menu',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
    },
    {
      name: 'more-dots',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5 13C5.5523 13 6 12.5523 6 12C6 11.4477 5.5523 11 5 11C4.4477 11 4 11.4477 4 12C4 12.5523 4.4477 13 5 13Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
    },
    {
      name: 'library',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
    },
    {
      name: 'search',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
    },
    {
      name: 'calendar',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16 1V5M8 1V5M3 9H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
    }
  ],
  'Arrows': [
    {
      name: 'arrow-left',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
    },
    {
      name: 'arrow-right',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 12H19M12 5L19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
    },
    {
      name: 'arrow-up',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 19V5M5 12L12 5L19 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
    },
    {
      name: 'arrow-down',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 5V19M19 12L12 19L5 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
    },
    {
      name: 'chevron-up',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 15L12 9L6 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
    },
    {
      name: 'chevron-down',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
    },
    {
      name: 'chevron-left',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
    },
    {
      name: 'chevron-right',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
    },
    {
      name: 'angle-double-down',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 7L12 12L17 7M7 13L12 18L17 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
    },
    {
      name: 'angle-double-left',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17 7L12 12L17 17M11 7L6 12L11 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
    },
    {
      name: 'angle-double-right',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 17L12 12L7 7M13 17L18 12L13 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
    },
    {
      name: 'angle-double-up',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17 17L12 12L7 17M17 11L12 6L7 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
    }
  ],
  'Layout': [
    {
      name: 'align-left',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 10H3M20 6H3M11 14H3M15 18H3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
    },
    {
      name: 'align-right',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21 10H8M21 6H4M21 14H13M21 18H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
    },
    {
      name: 'anchor',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 8C13.1046 8 14 7.10457 14 6C14 4.89543 13.1046 4 12 4C10.8954 4 10 4.89543 10 6C10 7.10457 10.8954 8 12 8ZM12 8V19M19 13C19 16.866 15.866 20 12 20C8.13401 20 5 16.866 5 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
    }
  ],
  'Communications': [
    {
      name: 'mail',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M22 6L12 13L2 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
    },
    {
      name: 'phone',
      svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.18C2.095 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85669 2.63476 2.65162C2.82196 2.44655 3.0498 2.28271 3.30379 2.17052C3.55777 2.05833 3.83233 2.00026 4.10999 2H7.10999C7.59531 1.99522 8.06266 2.16708 8.43237 2.48353C8.80208 2.79999 9.04214 3.23945 9.10999 3.72C9.23662 4.68007 9.47144 5.62273 9.80999 6.53C9.94454 6.88792 9.97366 7.27691 9.8939 7.65088C9.81415 8.02485 9.62886 8.36811 9.35999 8.64L8.08999 9.91C9.51355 12.4135 11.5865 14.4865 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9751 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
    }
  ]
};

// Icon component for display
const IconDisplay = ({ name, svg }: { name: string; svg: string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(svg);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      onClick={copyToClipboard}
      className="relative group p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
    >
      <div className="flex flex-col items-center space-y-2">
        <div 
          className="w-8 h-8 text-gray-700 dark:text-gray-300"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
        <Text size="xs" variant="weak" className="text-center break-all">
          {name}
        </Text>
      </div>
      
      {copied && (
        <div className="absolute inset-0 bg-green-500/10 border border-green-500 rounded-lg flex items-center justify-center">
          <Text size="xs" variant="success" weight="medium">
            Copied!
          </Text>
        </div>
      )}
      
      <div className="absolute inset-0 bg-primary-500/5 border border-primary-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <Text size="xs" variant="weak" weight="medium">
          Click to copy SVG
        </Text>
      </div>
    </div>
  );
};

export const Icons: Story = {
  render: () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('General');

    // Filter icons based on search term
    const filteredIcons = Object.entries(iconCategories).reduce((acc, [category, icons]) => {
      const filtered = icons.filter(icon => 
        icon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (filtered.length > 0 && (searchTerm || category === selectedCategory)) {
        acc[category] = filtered;
      }
      return acc;
    }, {} as Record<string, typeof iconCategories.General>);

    const allIcons = Object.values(iconCategories).flat();
    const totalIcons = allIcons.length;

    return (
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        <div className="space-y-4">
          <Title level={1} size="4xl" weight="bold">Icons</Title>
          <Text size="lg" variant="weak">
            A collection of {totalIcons} beautiful icons from Untitled UI. Click any icon to copy its SVG code.
          </Text>
        </div>

        {/* Search and Filter */}
        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search icons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {!searchTerm && (
            <div className="flex flex-wrap gap-2">
              {Object.keys(iconCategories).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary-100 text-primary-700 border border-primary-200'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <Text size="sm" weight="medium">{category}</Text>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Icons Grid */}
        <div className="space-y-8">
          {Object.entries(filteredIcons).map(([category, icons]) => (
            <div key={category} className="space-y-4">
              <div className="flex items-center justify-between">
                <Title level={2} size="xl" weight="semibold">{category}</Title>
                <Text size="sm" variant="weak">{icons.length} icons</Text>
              </div>
              
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-4">
                {icons.map((icon) => (
                  <IconDisplay key={icon.name} name={icon.name} svg={icon.svg} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {Object.keys(filteredIcons).length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-600 mb-4">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <Title level={3} size="lg" weight="medium" variant="weak">
              No icons found
            </Title>
            <Text size="sm" variant="weak" className="mt-2">
              Try adjusting your search term or browse different categories.
            </Text>
          </div>
        )}

        
      </div>
    );
  }
};

export const Typography: Story = {
  render: () => (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="space-y-4">
        <Title level={1} size="4xl" weight="bold">Typography</Title>
        <Text size="lg" variant="weak">
          Typography tokens define font families, sizes, weights, and line heights for consistent text styling.
        </Text>
      </div>

      <div className="space-y-8">
        {/* Font Families */}
        <div className="space-y-4">
          <Title level={2} size="2xl" weight="semibold">Font Families</Title>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TokenDisplay
              name="font-family-sans (Title)"
              value="Rubrik, system-ui, sans-serif"
              cssVar="var(--vromm-font-family-sans)"
              scssVar="$vromm-font-family-sans"
              jsVar="tokens.vrommFontFamilySans"
              description="Primary font family for titles and headers"
            />
            <TokenDisplay
              name="font-family-text"
              value="Rubrik, system-ui, sans-serif"
              cssVar="var(--vromm-font-family-text)"
              scssVar="$vromm-font-family-text"
              jsVar="tokens.vrommFontFamilyText"
              description="Font family for body text and UI elements"
            />
            <TokenDisplay
              name="font-family-mono"
              value="Fira Code, monospace"
              cssVar="var(--vromm-font-family-mono)"
              scssVar="$vromm-font-family-mono"
              jsVar="tokens.vrommFontFamilyMono"
              description="Monospace font for code and data"
            />
          </div>
        </div>

        {/* Header Examples */}
        <div className="space-y-4">
          <Title level={2} size="2xl" weight="semibold">Header Examples</Title>
          <div className="space-y-6 p-6 border rounded-lg bg-card">
            <div style={{ fontFamily: 'Rubrik, system-ui, sans-serif' }}>
              <div className="space-y-4">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    Heading 1 - 36px Bold
                  </h1>
                  <Text size="sm" variant="weak" family="mono">font-size: 2.25rem; font-weight: 700;</Text>
                </div>
                
                <div>
                  <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Heading 2 - 30px Semibold
                  </h2>
                  <Text size="sm" variant="weak" family="mono">font-size: 1.875rem; font-weight: 600;</Text>
                </div>
                
                <div>
                  <h3 className="text-2xl font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Heading 3 - 24px Medium
                  </h3>
                  <Text size="sm" variant="weak" family="mono">font-size: 1.5rem; font-weight: 500;</Text>
                </div>
                
                <div>
                  <h4 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Heading 4 - 20px Medium
                  </h4>
                  <Text size="sm" variant="weak" family="mono">font-size: 1.25rem; font-weight: 500;</Text>
                </div>
                
                <div>
                  <h5 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Heading 5 - 18px Medium
                  </h5>
                  <Text size="sm" variant="weak" family="mono">font-size: 1.125rem; font-weight: 500;</Text>
                </div>
                
                <div>
                  <h6 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Heading 6 - 16px Medium
                  </h6>
                  <Text size="sm" variant="weak" family="mono">font-size: 1rem; font-weight: 500;</Text>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Font Sizes */}
        <div className="space-y-4">
          <Title level={2} size="2xl" weight="semibold">Font Sizes</Title>
          <div className="space-y-4">
            {[
              { name: 'text-xs', size: '0.75rem', px: '12px' },
              { name: 'text-sm', size: '0.875rem', px: '14px' },
              { name: 'text-base', size: '1rem', px: '16px' },
              { name: 'text-lg', size: '1.125rem', px: '18px' },
              { name: 'text-xl', size: '1.25rem', px: '20px' },
              { name: 'text-2xl', size: '1.5rem', px: '24px' },
              { name: 'text-3xl', size: '1.875rem', px: '30px' },
              { name: 'text-4xl', size: '2.25rem', px: '36px' },
            ].map((token) => (
              <div key={token.name} className="flex items-center gap-4 p-4 border rounded-lg">
                <div className="flex-1">
                  <Text weight="semibold">{token.name}</Text>
                  <Text size="sm" variant="weak" family="mono">{token.size} ({token.px})</Text>
                </div>
                <div className="flex-1">
                  <Text style={{ fontSize: token.size }}>
                    The quick brown fox jumps over the lazy dog
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
};

export const Spacing: Story = {
  render: () => (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="space-y-4">
        <Title level={1} size="4xl" weight="bold">Spacing</Title>
        <Text size="lg" variant="weak">
          Spacing tokens provide consistent spacing values throughout the design system.
        </Text>
      </div>

      <div className="space-y-6">
        {[
          { name: 'spacing-xs', value: '0.25rem', px: '4px' },
          { name: 'spacing-sm', value: '0.5rem', px: '8px' },
          { name: 'spacing-md', value: '1rem', px: '16px' },
          { name: 'spacing-lg', value: '1.5rem', px: '24px' },
          { name: 'spacing-xl', value: '2rem', px: '32px' },
          { name: 'spacing-2xl', value: '3rem', px: '48px' },
        ].map((token) => (
          <div key={token.name} className="flex items-center gap-4 p-4 border rounded-lg">
            <div className="flex-1">
              <TokenDisplay
                name={token.name}
                value={`${token.value} (${token.px})`}
                cssVar={`var(--vromm-${token.name})`}
                scssVar={`$vromm-${token.name}`}
                jsVar={`tokens.vromm${token.name.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('')}`}
              />
            </div>
            <div className="flex items-center gap-2">
              <div 
                className="bg-primary-500 h-4"
                style={{ width: token.value }}
              />
              <Text size="sm" variant="weak">{token.value}</Text>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
};

// Brand Assets Component
const BrandAsset = ({ title, description, svgContent, filename }: {
  title: string;
  description: string;
  svgContent: string;
  filename: string;
}) => {
  const [copied, setCopied] = useState(false);

  const downloadSVG = () => {
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copySVG = () => {
    navigator.clipboard.writeText(svgContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 border rounded-lg bg-card space-y-4">
      <div className="text-center">
        <div 
          className="flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg mb-4"
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
        <Title level={3} size="lg" weight="semibold">{title}</Title>
        <Text size="sm" variant="weak" className="mt-1">{description}</Text>
      </div>
      
      <div className="flex gap-2 justify-center">
        <button
          onClick={downloadSVG}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
        >
          Download SVG
        </button>
        <button
          onClick={copySVG}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
        >
          {copied ? 'Copied!' : 'Copy SVG'}
        </button>
      </div>
    </div>
  );
};

export const Branding: Story = {
  render: () => {
    const logoSVG = `<svg width="125" height="112" viewBox="0 0 125 112" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M123.165 67.7463C116.184 92.2631 99.7014 106.225 75.256 110.717C56.811 114.106 39.9631 109.616 25.2779 97.7999C19.0393 92.7799 14.1144 86.6024 10.5329 79.413C9.93651 78.2159 9.20443 77.5068 7.87734 77.0841C1.77141 75.139 -1.31926 69.3613 0.534918 63.2718C2.04953 58.2975 3.86142 53.4138 5.38568 48.4422C6.21643 45.7326 6.51451 42.854 7.40959 40.1706C13.1579 22.9376 24.891 11.3433 41.5095 4.50365C49.3075 1.29426 57.5263 -0.370099 65.9096 0.0695534C90.0885 1.3376 108.741 11.7905 119.62 34.0595C124.815 44.6948 125.76 56.0031 123.165 67.7463ZM96.291 19.4267C96.3512 19.3936 96.4113 19.3605 96.4715 19.3274C96.4047 19.2185 96.3379 19.1096 96.1097 18.7831C95.7223 18.552 95.3349 18.3209 94.7757 17.8797C63.5508 -2.78283 23.5154 14.3932 15.9277 42.9442C21.3403 42.9442 26.7447 43.104 32.1273 42.8322C33.4785 42.7639 35.0769 41.5752 36.0187 40.4479C40.3357 35.2808 44.4439 29.9396 48.6592 24.6869C51.4299 21.2343 55.0411 19.4354 59.494 19.4074C61.5079 19.3948 63.5219 19.4098 65.5359 19.4032C75.3251 19.371 85.1144 19.3358 95.1947 19.3706C95.4936 19.3721 95.7925 19.3737 96.291 19.4267ZM105.421 43.3009C109.007 41.1842 110.59 37.7932 109.65 34.2427C108.649 30.4639 105.549 28.1414 101.25 28.1314C87.7079 28.0998 74.1657 28.1365 60.6236 28.1041C58.2205 28.0983 56.3986 28.9276 54.8981 30.8638C50.9431 35.9672 46.8522 40.965 42.8508 46.0328C39.8012 49.8952 35.8488 51.808 30.9341 51.7582C29.8231 51.7469 28.7113 51.7404 27.6008 51.7669C19.5011 51.9604 12.0709 57.1763 9.25836 64.6324C8.13345 67.6146 8.93521 68.8302 12.0839 68.8438C16.3895 68.8624 20.6963 68.7945 25.0004 68.8791C26.4223 68.907 27.1551 68.4519 27.9027 67.1832C30.8773 62.1354 35.3747 59.444 41.2828 59.453C47.1996 59.462 51.6703 62.1885 54.5986 67.2705C55.3481 68.5713 56.1483 68.9074 57.5335 68.8994C66.7002 68.8464 75.8681 68.806 85.0337 68.9175C87.3536 68.9457 88.7816 68.4722 90.141 66.275C94.0925 59.8884 102.225 57.7125 109.202 60.7984C111.028 61.6055 112.732 61.6322 114.241 60.2758C115.695 58.969 115.916 57.2483 115.252 55.4944C114.479 53.4515 112.778 52.8889 110.726 52.8928C98.7816 52.9155 86.8367 52.9047 74.8918 52.9036C71.0723 52.9033 67.2523 52.9342 63.4334 52.8815C61.1241 52.8497 59.6101 51.7181 59.0215 49.7737C58.0714 46.6349 60.2471 44.1131 63.9686 44.1089C76.2607 44.0952 88.5529 44.1252 100.845 44.0746C102.274 44.0687 103.701 43.6637 105.421 43.3009ZM32.3697 92.258C54.3368 108.982 84.2931 104.473 99.5113 90.0515C99.1814 89.8905 98.8936 89.7025 98.578 89.603C93.2088 87.9109 89.6483 84.3872 88.0711 78.9914C87.6469 77.5402 86.7103 77.6919 85.6789 77.6921C76.5843 77.6937 67.4894 77.7305 58.3954 77.6568C56.8575 77.6444 56.2947 78.1755 55.8326 79.6036C53.4614 86.9323 46.3189 91.2722 38.7318 89.9764C32.6514 88.9379 28.6962 85.2929 26.5625 79.5506C26.3096 78.8698 25.7574 77.8625 25.2427 77.7965C23.5176 77.5755 21.7466 77.7126 19.5867 77.7126C23.0108 83.6447 27.1219 88.2504 32.3697 92.258ZM39.6338 81.315C45.0696 82.2753 49.2772 77.7111 47.5519 72.7256C46.4852 69.6432 43.7182 67.8988 40.4395 68.2417C37.5004 68.5491 35.0844 70.8714 34.5922 73.8621C34.0746 77.0067 35.9021 79.8652 39.6338 81.315ZM108.723 78.0294C110.502 73.9231 108.922 69.8818 105.012 68.5367C101.335 67.2716 97.4402 69.36 96.3775 73.1671C95.5459 76.1461 97.0359 79.4098 99.8781 80.8347C102.952 82.3759 106.219 81.4303 108.723 78.0294Z" fill="#145251"/>
<path d="M105.276 43.3722C103.701 43.6636 102.274 44.0687 100.845 44.0746C88.5529 44.1252 76.2607 44.0952 63.9686 44.1089C60.2471 44.1131 58.0714 46.6349 59.0215 49.7737C59.6101 51.7181 61.1241 52.8497 63.4334 52.8815C67.2523 52.9342 71.0723 52.9033 74.8918 52.9036C86.8367 52.9047 98.7816 52.9155 110.726 52.8928C112.778 52.8889 114.479 53.4515 115.252 55.4944C115.916 57.2483 115.695 58.969 114.241 60.2758C112.732 61.6322 111.028 61.6055 109.202 60.7984C102.225 57.7125 94.0925 59.8884 90.141 66.275C88.7816 68.4722 87.3536 68.9457 85.0337 68.9175C75.8681 68.806 66.7002 68.8464 57.5335 68.8994C56.1483 68.9074 55.3481 68.5713 54.5986 67.2705C51.6703 62.1885 47.1996 59.462 41.2828 59.453C35.3747 59.444 30.8773 62.1354 27.9027 67.1832C27.1551 68.4519 26.4223 68.907 25.0004 68.8791C20.6963 68.7945 16.3895 68.8624 12.0839 68.8438C8.93521 68.8302 8.13345 67.6146 9.25836 64.6324C12.0709 57.1763 19.5011 51.9604 27.6008 51.7669C28.7113 51.7404 29.8231 51.7469 30.9341 51.7582C35.8488 51.808 39.8012 49.8952 42.8508 46.0328C46.8522 40.965 50.9431 35.9672 54.8981 30.8638C56.3986 28.9276 58.2205 28.0983 60.6236 28.1041C74.1657 28.1365 87.7079 28.0998 101.25 28.1314C105.549 28.1414 108.649 30.4639 109.65 34.2427C110.59 37.7932 109.007 41.184 105.276 43.3722Z" fill="#00FFBC"/>
<path d="M105.276 43.3722C103.701 43.6636 102.274 44.0687 100.845 44.0746C88.5529 44.1252 76.2607 44.0952 63.9686 44.1089C60.2471 44.1131 58.0714 46.6349 59.0215 49.7737C59.6101 51.7181 61.1241 52.8497 63.4334 52.8815C67.2523 52.9342 71.0723 52.9033 74.8918 52.9036C86.8367 52.9047 98.7816 52.9155 110.726 52.8928C112.778 52.8889 114.479 53.4515 115.252 55.4944C115.916 57.2483 115.695 58.969 114.241 60.2758C112.732 61.6322 111.028 61.6055 109.202 60.7984C102.225 57.7125 94.0925 59.8884 90.141 66.275C88.7816 68.4722 87.3536 68.9457 85.0337 68.9175C75.8681 68.806 66.7002 68.8464 57.5335 68.8994C56.1483 68.9074 55.3481 68.5713 54.5986 67.2705C51.6703 62.1885 47.1996 59.462 41.2828 59.453C35.3747 59.444 30.8773 62.1354 27.9027 67.1832C27.1551 68.4519 26.4223 68.907 25.0004 68.8791C20.6963 68.7945 16.3895 68.8624 12.0839 68.8438C8.93521 68.8302 8.13345 67.6146 9.25836 64.6324C12.0709 57.1763 19.5011 51.9604 27.6008 51.7669C28.7113 51.7404 29.8231 51.7469 30.9341 51.7582C35.8488 51.808 39.8012 49.8952 42.8508 46.0328C46.8522 40.965 50.9431 35.9672 54.8981 30.8638C56.3986 28.9276 58.2205 28.0983 60.6236 28.1041C74.1657 28.1365 87.7079 28.0998 101.25 28.1314C105.549 28.1414 108.649 30.4639 109.65 34.2427C110.59 37.7932 109.007 41.184 105.276 43.3722Z" fill="#00FFBC"/>
<path d="M32.2527 92.1659C27.1219 88.2504 23.0108 83.6447 19.5867 77.7126C21.7466 77.7126 23.5176 77.5755 25.2427 77.7965C25.7574 77.8625 26.3096 78.8698 26.5625 79.5506C28.6962 85.2929 32.6514 88.9379 38.7318 89.9764C46.3189 91.2722 53.4614 86.9323 55.8326 79.6036C56.2947 78.1755 56.8575 77.6444 58.3954 77.6568C67.4894 77.7305 76.5843 77.6937 85.6789 77.6921C86.7103 77.6919 87.6469 77.5402 88.0711 78.9914C89.6483 84.3872 93.2088 87.9109 98.578 89.603C98.8936 89.7025 99.1814 89.8905 99.5113 90.0515C84.2931 104.473 54.3368 108.982 32.2527 92.1659Z" fill="#ACD7CC"/>
<path d="M94.9037 19.3017C85.1144 19.3358 75.3251 19.371 65.5359 19.4032C63.5219 19.4098 61.5079 19.3948 59.494 19.4074C55.0411 19.4354 51.4299 21.2343 48.6592 24.6869C44.4439 29.9396 40.3357 35.2808 36.0187 40.4479C35.0769 41.5752 33.4785 42.7639 32.1273 42.8322C26.7447 43.104 21.3403 42.9442 15.9277 42.9442C23.5154 14.3932 63.5508 -2.78283 94.8502 18.1364C94.9177 18.6959 94.9107 18.9988 94.9037 19.3017Z" fill="#ACD7CC"/>
<path d="M39.4714 81.2776C35.9021 79.8653 34.0746 77.0067 34.5922 73.8621C35.0844 70.8714 37.5004 68.5491 40.4395 68.2417C43.7182 67.8988 46.4852 69.6432 47.5519 72.7256C49.2772 77.7111 45.0696 82.2753 39.4714 81.2776Z" fill="#00FFBC"/>
<path d="M108.653 78.1721C106.219 81.4303 102.952 82.3759 99.8781 80.8347C97.0359 79.4098 95.5459 76.1461 96.3775 73.1671C97.4402 69.36 101.335 67.2716 105.012 68.5367C108.922 69.8818 110.502 73.9231 108.653 78.1721Z" fill="#00FFBC"/>
<path d="M95.0492 19.3361C94.9107 18.9988 94.9177 18.6959 94.9361 18.2415C95.3349 18.3209 95.7223 18.552 96.1288 18.9777C96.129 19.2399 96.1102 19.3076 96.0914 19.3752C95.7925 19.3737 95.4936 19.3721 95.0492 19.3361Z" fill="#ACD7CC"/>
<path d="M96.1912 19.4009C96.1102 19.3076 96.1291 19.2399 96.2095 19.0865C96.3379 19.1096 96.4047 19.2185 96.4715 19.3274C96.4113 19.3605 96.3512 19.3936 96.1912 19.4009Z" fill="#ACD7CC"/>
</svg>`;

    const wordmarkSVG = `<svg width="205" height="38" viewBox="0 0 205 38" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.176 24.0555C10.1755 24.8028 10.1752 25.5151 10.1751 26.2164C10.175 27.2864 11.1321 28.4063 11.5376 27.4162C11.5716 27.3333 11.604 27.2453 11.636 27.1531C14.5292 18.7975 17.4583 10.4544 20.3354 2.09325C20.6239 1.25477 20.9953 0.963175 21.8942 0.984554C24.2442 1.04044 26.5961 1.01911 29.0211 1.01117C29.687 1.00899 30.1997 1.66571 29.9637 2.28844C25.734 13.4454 21.4921 24.5977 17.283 35.7625C16.9939 36.5293 16.6623 36.8401 15.7908 36.8311C11.7942 36.7899 7.79714 36.7997 3.71 36.8047C2.16059 36.8066 0.899849 35.5595 0.883137 34.0102C0.77497 23.9828 0.667114 13.9842 0.558762 3.93971C0.541792 2.36657 1.81238 1.08217 3.38561 1.08217C4.70578 1.08217 6.02322 1.08217 7.34986 1.08217C8.91117 1.08217 10.1769 2.34786 10.1769 3.90917C10.1769 10.5717 10.1768 17.2684 10.176 24.0555Z" fill="#145251"/>
<path d="M41.7785 14.8781C42.4702 10.9316 43.155 7.05806 43.8498 3.13307C44.0647 1.91932 45.1197 1.02283 46.3522 1.03577C51.2562 1.08728 56.1604 1.12941 61.0639 1.20951C61.7215 1.22025 62.3866 1.3852 63.0299 1.55027C66.8161 2.52178 68.7667 5.05466 68.4103 8.95081C68.1868 11.3945 67.6853 13.8327 67.0838 16.2166C66.6006 18.1316 65.6342 19.7415 64.1768 21.0179C63.1697 21.8999 62.5804 23.2466 62.9777 24.525C63.8636 27.3761 64.7519 30.2349 65.6464 33.1138C66.2118 34.9333 64.8521 36.7797 62.9468 36.7797C61.574 36.7797 60.2027 36.7797 58.819 36.7797C57.583 36.7797 56.4903 35.9768 56.121 34.7972C55.0904 31.5047 54.0533 28.1917 53.0086 24.8545C52.7556 24.0463 52.0516 23.4961 51.2047 23.4961C50.2487 23.4961 49.3909 24.1935 49.2455 25.1384C48.7736 28.2036 48.2988 31.2875 47.8219 34.3857C47.6096 35.7647 46.423 36.7826 45.0278 36.7826C43.7762 36.7826 42.5282 36.7826 41.273 36.7826C39.5141 36.7826 38.1822 35.1935 38.4894 33.4616C39.5876 27.2718 40.6796 21.1114 41.7785 14.8781ZM58.3695 15.2389C58.4718 15.0445 58.5343 14.8325 58.582 14.618C58.7113 14.0363 58.8715 13.4561 58.8978 12.8698C59.0006 10.5751 58.0008 9.05423 56.1435 8.86761C55.5056 8.80351 54.8625 8.79104 54.2135 8.79684C52.8142 8.80934 51.6258 9.86288 51.4182 11.2468C51.2728 12.2164 51.1281 13.1809 50.9837 14.144C50.7273 15.8532 52.0511 17.4371 53.7793 17.4139C54.1852 17.4085 54.5896 17.3956 54.9933 17.3704C56.4336 17.2807 57.6156 16.6728 58.3695 15.2389Z" fill="#145251"/>
<path d="M105.028 4.91547C106.393 7.44813 106.565 10.0769 106.105 12.7587C105.364 17.0779 104.744 21.4301 103.735 25.6885C101.97 33.1412 97.1346 36.9423 89.4805 37.2482C86.6473 37.3614 83.8261 37.2686 81.1401 36.2293C77.9359 34.9894 76.0728 32.5938 75.9967 29.1898C75.9394 26.6294 76.289 24.0398 76.6686 21.4947C77.1593 18.2054 77.6678 14.897 78.5101 11.6864C80.3461 4.68802 85.061 0.899106 92.288 0.558789C94.6138 0.449271 96.9925 0.652715 99.2928 1.03725C101.674 1.43534 103.675 2.69008 105.028 4.91547ZM93.3595 28.0351C93.6493 27.7661 93.8447 27.414 93.9762 27.041C94.4647 25.6558 95.0273 24.2859 95.3233 22.8607C95.9992 19.6075 96.5513 16.3248 97.0351 13.0366C97.5337 9.64878 95.6013 7.76243 92.2347 8.20318C89.3954 8.57489 87.6755 10.2079 87.0422 13.3084C86.502 15.953 86.057 18.618 85.6141 21.2813C85.364 22.7851 85.119 24.2985 85.0235 25.8171C84.9031 27.7309 85.6272 28.9169 87.2941 29.3117C89.4656 29.8258 91.5627 29.7029 93.3595 28.0351Z" fill="#145251"/>
<path d="M119.349 5.72974C119.492 4.92701 119.631 4.14985 119.772 3.37402C120.015 2.02967 121.186 1.05219 122.552 1.0503C124.735 1.04728 126.895 1.04729 129.054 1.09068C129.304 1.0957 129.664 1.59612 129.77 1.93063C131.422 7.15662 133.041 12.3932 134.669 17.6271C134.733 17.8337 135.015 17.8756 135.154 17.7103C135.255 17.5916 135.345 17.4801 135.424 17.3613C138.865 12.2124 142.31 7.06598 145.728 1.90168C146.133 1.28975 146.548 1.01186 147.326 1.02895C148.987 1.06543 150.648 1.06631 152.345 1.06133C154.103 1.05618 155.435 2.63965 155.129 4.37075C153.354 14.4258 151.59 24.4219 149.82 34.4509C149.581 35.8018 148.408 36.7866 147.036 36.7866C145.95 36.7866 144.865 36.7866 143.777 36.7866C142.02 36.7866 140.689 35.2017 140.992 33.4716C141.907 28.2512 142.817 23.0532 143.728 17.8554C143.748 17.7403 143.677 17.6289 143.564 17.5994C143.469 17.5748 143.37 17.6138 143.318 17.6958C141.309 20.8394 139.234 23.9441 137.333 27.1516C136.592 28.4003 135.771 28.8692 134.357 28.7481C133.558 28.6797 132.753 28.6769 131.931 28.6889C130.666 28.7073 129.554 27.8786 129.211 26.6604C128.327 23.5275 127.447 20.4086 126.567 17.2898C126.552 17.2359 126.506 17.1961 126.45 17.1885C126.376 17.1784 126.306 17.229 126.293 17.3034C125.278 23.005 124.263 28.7069 123.241 34.4526C123.001 35.8016 121.828 36.7843 120.457 36.7843C119.395 36.7843 118.326 36.7843 117.243 36.7843C115.485 36.7843 114.153 35.1969 114.459 33.4658C116.087 24.2446 117.713 15.0275 119.349 5.72974Z" fill="#145251"/>
<path d="M190.251 34.1793C191.237 28.567 192.21 23.0544 193.183 17.5425C193.195 17.4738 193.158 17.4058 193.094 17.3787C193.03 17.3518 192.956 17.3724 192.914 17.428C192.748 17.6509 192.575 17.8694 192.426 18.1034C190.342 21.3746 188.285 24.663 186.156 27.904C185.896 28.2994 185.269 28.6413 184.791 28.6706C183.227 28.7667 181.652 28.6633 180.084 28.7261C179.341 28.7559 179.093 28.4955 178.906 27.7969C178.026 24.5086 177.074 21.2396 176.145 17.9644C176.057 17.6547 175.605 17.6862 175.549 18.0031C174.547 23.6358 173.583 29.0566 172.622 34.4589C172.383 35.8081 171.209 36.7909 169.839 36.7909C168.763 36.7909 167.694 36.7909 166.623 36.7909C164.865 36.7909 163.534 35.2035 163.839 33.4723C165.611 23.4381 167.377 13.4378 169.146 3.41823C169.384 2.06744 170.558 1.08276 171.93 1.08276C173.558 1.08276 175.185 1.08276 176.838 1.08276C178.075 1.08276 179.169 1.88779 179.537 3.06951C180.954 7.62261 182.383 12.2116 183.84 16.8921C184 17.4074 184.695 17.5309 184.995 17.0821C188.369 12.0325 191.756 6.99175 195.091 1.91691C195.541 1.23358 196.007 1.00831 196.794 1.02134C198.434 1.04846 200.074 1.04942 201.731 1.0458C203.489 1.04196 204.82 2.62632 204.515 4.35749C202.736 14.4276 200.969 24.4352 199.199 34.4586C198.961 35.8093 197.787 36.794 196.415 36.794C195.095 36.794 193.778 36.794 192.446 36.794C191.061 36.794 190.015 35.5435 190.251 34.1793Z" fill="#145251"/>
</svg>`;

    const symbolSVG = logoSVG; // Same as logo for symbol

    return (
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        <div className="space-y-4">
          <Title level={1} size="4xl" weight="bold">Branding</Title>
          <Text size="lg" variant="weak">
            Download and use official Vromm brand assets including logos, wordmarks, and symbols.
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <BrandAsset
            title="Logo"
            description="Primary logo with symbol and wordmark"
            svgContent={logoSVG}
            filename="vromm-logo.svg"
          />
          
          <BrandAsset
            title="Wordmark"
            description="Text-only wordmark for space-constrained layouts"
            svgContent={wordmarkSVG}
            filename="vromm-wordmark.svg"
          />
          
          <BrandAsset
            title="Symbol"
            description="Standalone symbol for icons and favicons"
            svgContent={symbolSVG}
            filename="vromm-symbol.svg"
          />
        </div>


      </div>
    );
  }
}; 