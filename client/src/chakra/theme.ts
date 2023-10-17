import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  // useSystemColorMode: false,
};

export const theme = extendTheme(
  { config },
  {
    colors: {
      brand: {
        100: '#fabb18',
        200: '#ffcc00',
        300: '#f9f9f9',
      },
    },
    styles: {
      global: () => ({
        body: {
          bg: 'gray.50',
        },
      }),
    },
  },
);
