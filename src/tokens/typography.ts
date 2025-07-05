export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['Fira Code', 'monospace'],
  },
  
  fontSize: {
    xs: {
      size: '0.75rem',
      lineHeight: '1rem',
    },
    sm: {
      size: '0.875rem',
      lineHeight: '1.25rem',
    },
    base: {
      size: '1rem',
      lineHeight: '1.5rem',
    },
    lg: {
      size: '1.125rem',
      lineHeight: '1.75rem',
    },
    xl: {
      size: '1.25rem',
      lineHeight: '1.75rem',
    },
    '2xl': {
      size: '1.5rem',
      lineHeight: '2rem',
    },
    '3xl': {
      size: '1.875rem',
      lineHeight: '2.25rem',
    },
    '4xl': {
      size: '2.25rem',
      lineHeight: '2.5rem',
    },
    '5xl': {
      size: '3rem',
      lineHeight: '1',
    },
    '6xl': {
      size: '3.75rem',
      lineHeight: '1',
    },
    '7xl': {
      size: '4.5rem',
      lineHeight: '1',
    },
    '8xl': {
      size: '6rem',
      lineHeight: '1',
    },
    '9xl': {
      size: '8rem',
      lineHeight: '1',
    },
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
} as const;

export type TypographyToken = typeof typography; 