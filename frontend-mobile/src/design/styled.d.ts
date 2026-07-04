import 'styled-components';
import { DefaultTheme } from 'styled-components/native';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string;
      surface: string;
      card: string;
      muted: string;
      text: string;
      accent: string;
      accentSoft: string;
      purple: string;
      blue: string;
      goldGlow: string;
      border: string;
      placeholder: string;
      overlay: string;
    };
    radius: {
      large: number;
      medium: number;
      small: number;
    };
    spacing: (value: number) => number;
    shadows: {
      soft: string;
      heavy: string;
    };
  }
}
