import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

// follow the theme object used by Garden compoent
// reference: https://garden.zendesk.com/components/theme-object#default_theme
const theme = {
  colors: {
    secondary: '#6c757d',
    background: '#ffffff',
    text: '#333333',
    border: '#eee',
    hover: '#dbdeff',
    error: '#ff0000',
    success: '#008000',
    black: '#000000',
  },
  spacing: {
    xs: '7px',
    sm: '10px',
    unit: '14px', // 1rem
    lg: '18px',
    xl: '28px',
    xxl: '56px',
  },
  borders: {
    radius: {
      sm: '2px',
      base: '4px',
      lg: '8px',
    },
    width: {
      thin: '1px',
      base: '2px',
      thick: '4px',
    },
  },
  typography: {
    fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif`,
    codeFontFamily: `source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace`,
    fontSize: {
      xs: '10px',
      sm: '12px',
      md: '14px',
      lg: '18px',
      xl: '22px',
      xxl: '26px',
      xxxl: '36px',
      huge: '48px',
    },
    lineHeight: {
      base: 1.6,
      heading: 1.2,
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      bold: 700,
    },
  },
  breakpoints: {
    md: '768px',
    lg: '992px',
  },
};

export type Theme = typeof theme;

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>;
};
