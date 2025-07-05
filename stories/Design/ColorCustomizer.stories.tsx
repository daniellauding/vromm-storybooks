import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect } from 'react';
import { Button } from '../../src/components/Button/Button';
import { Title, Text } from '../../src/components/Typography';
import { Palette, Download, RotateCcw } from 'lucide-react';

const ColorCustomizer = () => {
  const [colors, setColors] = useState({
    primary: '#0ea5e9',
    secondary: '#64748b', 
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
  });

  // Apply colors to CSS custom properties in real-time
  useEffect(() => {
    const root = document.documentElement;
    
    // Helper to generate color shades
    const generateShades = (baseColor: string) => {
      const hex = baseColor.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      
      const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
      const result: Record<number, string> = {};
      
      shades.forEach((shade) => {
        const factor = shade === 500 ? 1 : shade < 500 ? 1 + (500 - shade) / 500 * 0.9 : 1 - (shade - 500) / 500 * 0.6;
        const newR = Math.round(Math.min(255, Math.max(0, r * factor)));
        const newG = Math.round(Math.min(255, Math.max(0, g * factor)));
        const newB = Math.round(Math.min(255, Math.max(0, b * factor)));
        result[shade] = `${newR}, ${newG}, ${newB}`;
      });
      
      return result;
    };

    // Apply each color family
    Object.entries(colors).forEach(([name, color]) => {
      const shades = generateShades(color);
      Object.entries(shades).forEach(([shade, rgb]) => {
        root.style.setProperty(`--vromm-color-${name}-${shade}`, rgb);
      });
    });
  }, [colors]);

  const handleColorChange = (colorName: string, newColor: string) => {
    setColors(prev => ({
      ...prev,
      [colorName]: newColor
    }));
  };

  const resetToDefaults = () => {
    setColors({
      primary: '#0ea5e9',
      secondary: '#64748b',
      success: '#22c55e', 
      warning: '#f59e0b',
      error: '#ef4444',
    });
  };

  const exportColors = () => {
    const cssExport = Object.entries(colors).map(([name, color]) => {
      return `  /* ${name.charAt(0).toUpperCase() + name.slice(1)} Color Family */
  --vromm-color-${name}-base: ${color};`;
    }).join('\n');

    const fullCSS = `:root {
${cssExport}
}`;

    navigator.clipboard.writeText(fullCSS);
    alert('CSS copied to clipboard!');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <Title level={1} size="3xl" className="flex items-center justify-center gap-3">
          <Palette className="w-8 h-8" />
          Live Color Customizer
        </Title>
        <Text size="lg" variant="weak">
          Customize your design system colors in real-time. Changes apply immediately to all components below.
        </Text>
      </div>

      {/* Color Controls */}
      <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-6 space-y-6">
        <div className="flex justify-between items-center">
          <Title level={3} size="lg">Color Controls</Title>
          <div className="flex gap-2">
            <Button 
              variant="secondary" 
              size="sm" 
              icon={RotateCcw} 
              onClick={resetToDefaults}
            >
              Reset
            </Button>
            <Button 
              variant="primary" 
              size="sm" 
              icon={Download} 
              onClick={exportColors}
            >
              Export CSS
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {Object.entries(colors).map(([name, color]) => (
            <div key={name} className="space-y-3">
              <div className="flex items-center justify-between">
                <Text weight="medium" className="capitalize">{name}</Text>
                <Text size="xs" family="mono" variant="weak">{color}</Text>
              </div>
              
              <div className="relative">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => handleColorChange(name, e.target.value)}
                  className="w-full h-12 rounded-md border-2 border-neutral-300 cursor-pointer"
                />
              </div>
              
              {/* Color preview swatches */}
              <div className="grid grid-cols-5 gap-1">
                {[100, 300, 500, 700, 900].map(shade => {
                  // Generate actual color value instead of CSS variable
                  const hex = color.replace('#', '');
                  const r = parseInt(hex.substring(0, 2), 16);
                  const g = parseInt(hex.substring(2, 4), 16);
                  const b = parseInt(hex.substring(4, 6), 16);
                  
                  const factor = shade === 500 ? 1 : shade < 500 ? 1 + (500 - shade) / 500 * 0.9 : 1 - (shade - 500) / 500 * 0.6;
                  const newR = Math.round(Math.min(255, Math.max(0, r * factor)));
                  const newG = Math.round(Math.min(255, Math.max(0, g * factor)));
                  const newB = Math.round(Math.min(255, Math.max(0, b * factor)));
                  const actualColor = `rgb(${newR}, ${newG}, ${newB})`;
                  
                  return (
                    <div
                      key={shade}
                      className={`w-full h-6 rounded-sm border border-neutral-200`}
                      style={{ backgroundColor: actualColor }}
                      title={`${name}-${shade}`}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Preview */}
      <div className="space-y-6">
        <Title level={3} size="lg">Live Preview</Title>
        
        {/* Button Preview */}
        <div className="space-y-4">
          <Text weight="medium">Buttons</Text>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="success">Success</Button>
            <Button variant="destructive">Error</Button>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" fill="outline">Primary Outline</Button>
            <Button variant="secondary" fill="outline">Secondary Outline</Button>
            <Button variant="success" fill="outline">Success Outline</Button>
            <Button variant="destructive" fill="outline">Error Outline</Button>
          </div>
        </div>

        {/* Text Preview */}
        <div className="space-y-4">
          <Text weight="medium">Text Colors</Text>
          <div className="space-y-2">
            <Text variant="primary">Primary text color</Text>
            <Text variant="secondary">Secondary text color</Text>
            <Text variant="success">Success text color</Text>
            <Text variant="warning">Warning text color</Text>
            <Text variant="error">Error text color</Text>
          </div>
        </div>

        {/* Status Messages Preview */}
        <div className="space-y-4">
          <Text weight="medium">Status Messages</Text>
          <div className="space-y-3">
            <div className="p-4 bg-success-50 border border-success-200 rounded-lg">
              <Text size="sm" variant="success" weight="medium">
                ✓ Success: Your changes have been saved successfully.
              </Text>
            </div>
            
            <div className="p-4 bg-warning-50 border border-warning-200 rounded-lg">
              <Text size="sm" variant="warning" weight="medium">
                ⚠ Warning: This action cannot be undone.
              </Text>
            </div>
            
            <div className="p-4 bg-error-50 border border-error-200 rounded-lg">
              <Text size="sm" variant="error" weight="medium">
                ✗ Error: There was an error processing your request.
              </Text>
            </div>
          </div>
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="bg-primary-50 dark:bg-primary-950 rounded-lg p-6">
        <Title level={4} size="base" className="mb-3">How to Use</Title>
        <div className="space-y-2 text-sm">
          <Text size="sm">1. <strong>Adjust colors</strong> using the color pickers above</Text>
          <Text size="sm">2. <strong>See changes instantly</strong> in the live preview</Text>
          <Text size="sm">3. <strong>Export CSS</strong> when you're happy with the result</Text>
          <Text size="sm">4. <strong>Copy the CSS</strong> to your globals.css file</Text>
        </div>
      </div>
    </div>
  );
};

const meta: Meta = {
  title: 'Design System/Color Customizer',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Interactive color customizer for the Vromm Design System. 

This tool allows you to:
- Customize primary, secondary, and semantic colors in real-time
- See immediate visual feedback on all components
- Export the customized color palette as CSS
- Reset to default colors anytime

Perfect for:
- Brand customization
- Theme exploration  
- Client demonstrations
- Accessibility testing with different color combinations
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  render: () => <ColorCustomizer />,
}; 