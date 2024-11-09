import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      background: 'var(--background)',
      foreground: 'var(--foreground)',
      primary: {
        DEFAULT: '#3E5660',
        light: '#6B7C83',
        dark: '#2A3B44',
      },
      secondary: {
        DEFAULT: '#F5F7F8',
        dark: '#E5E9EB',
      },
      accent: {
        blue: '#007AC9',
        green: '#00A870',
        red: '#d4121e',
      },
      neutral: {
        white: '#FFFFFF',
        black: '#000000',
        gray: {
          100: '#F8F9FA',
          200: '#E9ECEF',
          300: '#DEE2E6',
          400: '#CED4DA',
          500: '#ADB5BD',
          600: '#6C757D',
          700: '#495057',
          800: '#343A40',
          900: '#212529',
        },
      },
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;
