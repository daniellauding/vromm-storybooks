/**
 * Brand Color Configuration
 * 
 * Customize these values to match your brand colors.
 * All components will automatically use these colors.
 */

export interface BrandColors {
  primary: string;
  secondary?: string;
  success?: string;
  warning?: string;
  error?: string;
}

/**
 * Vromm Brand Colors - Updated with new brand palette
 */
export const vrommBrandColors: BrandColors = {
  primary: '#00ffb6',     // Bright mint green - main brand color
  secondary: '#004847',   // Dark teal - secondary actions
  success: '#22c55e',     // Green - success states
  warning: '#f59e0b',     // Amber - warning states
  error: '#ef4444',       // Red - error states
};

/**
 * Semantic Button Colors
 * Define specific colors for button variants
 */
export const buttonColors = {
  primary: {
    bg: '#00ffb6',
    hover: '#00e1a1',
    text: '#145251',
    border: '#00ffb6',
  },
  secondary: {
    bg: '#004847',
    hover: '#003936',
    text: '#ffffff',
    border: '#004847',
  },
  tertiary: {
    bg: '#e6f1ef',
    hover: '#d1e7e3',
    text: '#004847',
    border: 'transparent',
  },
  // Dark mode variants
  dark: {
    primary: {
      bg: '#00ffb6',
      hover: '#00e1a1',
      text: '#145251',
      border: '#00ffb6',
    },
    secondary: {
      bg: '#004847',
      hover: '#006662',
      text: '#ffffff',
      border: '#004847',
    },
    tertiary: {
      bg: '#1a2e2c',
      hover: '#243432',
      text: '#00ffb6',
      border: 'transparent',
    },
  }
};

/**
 * Semantic Text Colors
 */
export const textColors = {
  pageTitle: '#072f2d',
  body: '#3c5b59',
  // Dark mode variants
  dark: {
    pageTitle: '#e6f1ef',
    body: '#a8c4c1',
  }
};

/**
 * Alternative Brand Color Presets
 * 
 * Uncomment and use any of these, or create your own:
 */

// Purple Brand
export const purpleBrand: BrandColors = {
  primary: '#8b5cf6',     // Purple
  secondary: '#64748b',
  success: '#10b981',
  warning: '#f59e0b', 
  error: '#ef4444',
};

// Green Brand
export const greenBrand: BrandColors = {
  primary: '#059669',     // Emerald
  secondary: '#64748b',
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
};

// Orange Brand
export const orangeBrand: BrandColors = {
  primary: '#ea580c',     // Orange
  secondary: '#64748b',
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
};

// Pink Brand
export const pinkBrand: BrandColors = {
  primary: '#ec4899',     // Pink
  secondary: '#64748b',
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
};

/**
 * Generate CSS Custom Properties from Brand Colors
 * 
 * Call this function to generate CSS variables for your brand colors.
 */
export function generateBrandCSS(colors: BrandColors): string {
  const generateShades = (hex: string, name: string): string => {
    // Remove # from hex
    const cleanHex = hex.replace('#', '');
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);  
    const b = parseInt(cleanHex.substring(4, 6), 16);

    const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
    
    return shades.map(shade => {
      const factor = shade === 500 ? 1 : 
                    shade < 500 ? 1 + (500 - shade) / 500 * 0.9 : 
                    1 - (shade - 500) / 500 * 0.6;
      
      const newR = Math.round(Math.min(255, Math.max(0, r * factor)));
      const newG = Math.round(Math.min(255, Math.max(0, g * factor)));  
      const newB = Math.round(Math.min(255, Math.max(0, b * factor)));
      
      return `  --vromm-color-${name}-${shade}: ${newR}, ${newG}, ${newB};`;
    }).join('\n');
  };

  let css = ':root {\n';
  
  if (colors.primary) {
    css += generateShades(colors.primary, 'primary') + '\n';
  }
  if (colors.secondary) {
    css += generateShades(colors.secondary, 'secondary') + '\n'; 
  }
  if (colors.success) {
    css += generateShades(colors.success, 'success') + '\n';
  }
  if (colors.warning) {
    css += generateShades(colors.warning, 'warning') + '\n';
  }
  if (colors.error) {
    css += generateShades(colors.error, 'error') + '\n';
  }
  
  css += '}';
  return css;
}

/**
 * Usage Examples:
 * 
 * 1. Use default colors:
 *    No action needed - components use default colors
 * 
 * 2. Use a preset:
 *    Copy the CSS from generateBrandCSS(purpleBrand) to your globals.css
 * 
 * 3. Custom brand colors:
 *    const myBrand = { primary: '#ff6b35', secondary: '#2d3748' };
 *    Copy the CSS from generateBrandCSS(myBrand) to your globals.css
 * 
 * 4. React Native:
 *    Colors work automatically - no CSS needed!
 */ 