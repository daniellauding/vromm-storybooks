export const colors = {
  // Primary colors - Updated with new brand palette
  primary: {
    50: '#edfffe',
    100: '#ccfff5',
    200: '#99ffed',
    300: '#5cfce3',
    400: '#1ef4d1',
    500: '#00ffb6', // Main brand color
    600: '#00e1a1',
    700: '#00b881',
    800: '#008f67',
    900: '#006652',
  },
  
  // Secondary colors - Dark teal palette
  secondary: {
    50: '#e6f1f0',
    100: '#ccded1',
    200: '#99bcb4',
    300: '#669a96',
    400: '#337979',
    500: '#004847', // Main secondary color
    600: '#003936',
    700: '#002b2a',
    800: '#001c1c',
    900: '#000e0e',
  },
  
  // Neutral colors
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
  
  // Semantic colors
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  
  // Background colors
  background: {
    primary: '#ffffff',
    secondary: '#f8fafc',
    tertiary: '#f1f5f9',
  },
  
  // Text colors - Updated with brand colors
  text: {
    primary: '#3c5b59',     // Body text
    secondary: '#475569',
    tertiary: '#64748b',
    inverse: '#ffffff',
    pageTitle: '#072f2d',   // Page titles
  },
  
  // Border colors
  border: {
    primary: '#e2e8f0',
    secondary: '#cbd5e1',
    tertiary: '#94a3b8',
  },
  
  // Button semantic colors
  button: {
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
  },
} as const;

export type ColorToken = typeof colors; 