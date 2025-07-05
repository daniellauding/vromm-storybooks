import { ReactNode } from 'react';

export type Size = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl';
export type Weight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
export type Variant = 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'error';
export type Theme = 'light' | 'dark';

export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
  'data-testid'?: string;
}

export interface TypographyProps extends BaseComponentProps {
  as?: keyof JSX.IntrinsicElements;
  size?: Size;
  weight?: Weight;
  variant?: Variant;
  align?: 'left' | 'center' | 'right' | 'justify';
  transform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  italic?: boolean;
  underline?: boolean;
  truncate?: boolean;
  balance?: boolean;
}

export interface TranslationKeys {
  [key: string]: string;
}

export interface TranslationProps {
  t?: (key: string, options?: any) => string;
  i18n?: {
    language: string;
    changeLanguage: (lang: string) => void;
  };
} 