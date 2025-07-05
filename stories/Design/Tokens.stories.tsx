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

        {/* Usage Guidelines */}
        <div className="mt-12 space-y-6">
          <Title level={2} size="2xl" weight="semibold">Usage Guidelines</Title>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border rounded-lg bg-success-50">
              <Title level={3} size="lg" weight="medium" variant="success" className="mb-3">
                ✓ Do
              </Title>
              <ul className="space-y-2">
                <li>
                  <Text size="sm">Use semantic color names (primary, success, error) rather than specific colors</Text>
                </li>
                <li>
                  <Text size="sm">Reference colors through CSS custom properties for theme support</Text>
                </li>
                <li>
                  <Text size="sm">Test color combinations for proper contrast ratios</Text>
                </li>
              </ul>
            </div>
            
            <div className="p-6 border rounded-lg bg-error-50">
              <Title level={3} size="lg" weight="medium" variant="error" className="mb-3">
                ✗ Don't
              </Title>
              <ul className="space-y-2">
                <li>
                  <Text size="sm">Use hardcoded hex values in components</Text>
                </li>
                <li>
                  <Text size="sm">Create custom colors outside the design system</Text>
                </li>
                <li>
                  <Text size="sm">Use colors that don't meet accessibility requirements</Text>
                </li>
              </ul>
            </div>
          </div>
        </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TokenDisplay
              name="font-family-sans"
              value="Inter, system-ui, sans-serif"
              cssVar="var(--vromm-font-family-sans)"
              scssVar="$vromm-font-family-sans"
              jsVar="tokens.vrommFontFamilySans"
              description="Primary font family for UI text"
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