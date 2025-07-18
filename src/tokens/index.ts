export * from './colors';
export * from './typography';
export * from './spacing';
export * from './brand-colors';

// Combined tokens for easy access
export const tokens = {
  colors: {
    primary: {
      50: '#edfffe',
      100: '#ccfff5',
      200: '#99ffed',
      300: '#5cfce3',
      400: '#1ef4d1',
      500: '#00ffb6',
      600: '#00e1a1',
      700: '#00b881',
      800: '#008f67',
      900: '#006652',
    },
    secondary: {
      50: '#e6f1f0',
      100: '#ccded1',
      200: '#99bcb4',
      300: '#669a96',
      400: '#337979',
      500: '#004847',
      600: '#003936',
      700: '#002b2a',
      800: '#001c1c',
      900: '#000e0e',
    },
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
    background: {
      primary: '#ffffff',
      secondary: '#f8fafc',
      tertiary: '#f1f5f9',
    },
    text: {
      primary: '#3c5b59',
      secondary: '#475569',
      tertiary: '#64748b',
      inverse: '#ffffff',
      pageTitle: '#072f2d',
    },
    border: {
      primary: '#e2e8f0',
      secondary: '#cbd5e1',
      tertiary: '#94a3b8',
    },
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
  },
  spacing: {
    0: '0px',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    11: '2.75rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
    52: '13rem',
    56: '14rem',
    60: '15rem',
    64: '16rem',
    72: '18rem',
    80: '20rem',
    96: '24rem',
  },
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['Fira Code', 'monospace'],
      title: ['Rubik', 'sans-serif'],
    },
    fontSize: {
      xs: { size: '0.75rem', lineHeight: '1rem' },
      sm: { size: '0.875rem', lineHeight: '1.25rem' },
      base: { size: '1rem', lineHeight: '1.5rem' },
      lg: { size: '1.125rem', lineHeight: '1.75rem' },
      xl: { size: '1.25rem', lineHeight: '1.75rem' },
      '2xl': { size: '1.5rem', lineHeight: '2rem' },
      '3xl': { size: '1.875rem', lineHeight: '2.25rem' },
      '4xl': { size: '2.25rem', lineHeight: '2.5rem' },
      '5xl': { size: '3rem', lineHeight: '1' },
      '6xl': { size: '3.75rem', lineHeight: '1' },
      '7xl': { size: '4.5rem', lineHeight: '1' },
      '8xl': { size: '6rem', lineHeight: '1' },
      '9xl': { size: '8rem', lineHeight: '1' },
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    letterSpacing: {
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
      loose: '2',
    },
  },
  brand: {
    borderRadius: '0.75rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    fontStyle: 'italic',
  },
} as const;

// Z-Index Scale for Design System
export const zIndex = {
  // Base content layers
  base: 1,
  dropdown: 1000,
  sticky: 1010,
  fixed: 1020,
  
  // Modal layers - high enough to be above most app content
  modalBackdrop: 9000,
  modal: 9100,
  modalStacked1: 9200,  // Second modal layer
  modalStacked2: 9300,  // Third modal layer
  modalStacked3: 9400,  // Fourth modal layer
  modalStacked4: 9500,  // Fifth modal layer
  
  // UI layers that should be above modals
  toast: 9800,
  tooltip: 9900,
  skipLink: 9999,
} as const;

export type ZIndex = typeof zIndex; 