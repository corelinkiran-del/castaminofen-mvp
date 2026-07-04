import { DefaultTheme } from 'styled-components/native';

export const spacing = (multiplier: number) => 8 * multiplier;

const theme: DefaultTheme = {
  colors: {
    background: '#0b0b0d',
    surface: '#101216',
    card: '#131417',
    muted: '#9aa0a6',
    text: '#ffffff',
    accent: '#c8962e',
    accentSoft: '#b88924',
    purple: '#8b6bd8',
    blue: '#6ea8ff',
    goldGlow: 'rgba(200,150,60,0.12)'
  },
  radius: {
    large: 28,
    medium: 16,
    small: 8,
  },
  spacing,
  shadows: {
    soft: '0px 8px 20px rgba(0,0,0,0.6)'
  }
};

export default theme;
