import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import tailwindPlugin from 'tailwindcss/plugin';

const pxToRem = (value: number) => `${value / 16}rem`;

const SHARED_WIDTH_HEIGHT_SPACING = {
  0.25: pxToRem(1),
  0.5: pxToRem(2),
  0.75: pxToRem(3),
  5.5: pxToRem(22),
  8: pxToRem(32),
  12: pxToRem(48),
  16: pxToRem(64),
  18: pxToRem(72),
  28: pxToRem(112),
  30: pxToRem(120),
  33: pxToRem(132),
  36: pxToRem(144),
  42: pxToRem(168),
  44: pxToRem(176),
  47: pxToRem(188),
  50: pxToRem(200),
  52.5: pxToRem(210),
  54: pxToRem(216),
  54.5: pxToRem(218),
  55: pxToRem(220),
  61: pxToRem(244),
  68: pxToRem(272),
  69: pxToRem(276),
  70.5: pxToRem(282),
  72: pxToRem(288),
  80: pxToRem(320),
  82: pxToRem(328),
  101: pxToRem(404),
  108: pxToRem(432),
  134: pxToRem(536),
  142: pxToRem(568),
  146: pxToRem(584),
  164: pxToRem(658),
  192: pxToRem(768),
  208: pxToRem(832),
  228: pxToRem(912),
  236: pxToRem(944),
  252: pxToRem(1008),
  265: pxToRem(1060),
  265.5: pxToRem(1062),
  332: pxToRem(1328),
  360: pxToRem(1440),
  '3/8': '37.5%',
  '41/100': '41%',
  '43/100': '43%',
  '57/100': '57%',
  '72/100': '72%',
  'region-drawer': 'calc(100vh - 32px - 80px)',
  tab: 'calc(100% - 8px)',
  gradient: 'calc(100% + 4px)',
  'overflow-right': 'calc(100% + 16px)',
  'overflow-right-md': 'calc(100% + 32px)',
  'large-overflow-right': 'calc((100vw - 100%) / 2 + 43%)',
  unset: 'unset',
};

const SHARED_SPACING = {
  0.25: pxToRem(1),
  0.5: pxToRem(2),
  0.75: pxToRem(3),
  1.25: pxToRem(5),
  1.5: pxToRem(6),
  1.75: pxToRem(7),
  2.25: pxToRem(9),
  2.5: pxToRem(10),
  2.75: pxToRem(11),
  3.25: pxToRem(13),
  3.5: pxToRem(14),
  3.75: pxToRem(15),
  4.25: pxToRem(17),
  4.5: pxToRem(18),
  4.75: pxToRem(19),
  7.75: pxToRem(31),
  24.25: pxToRem(97),
  15.5: pxToRem(62),
  40.5: pxToRem(162),
  50.5: pxToRem(202),
};

const spacing = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i).reduce(
    (acc: Record<number, string>, val) => {
      acc[val] = `${(val * 4) / 16}rem`;
      return acc;
    },
    {}
  );

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    fontSize: {
      // Display
      d1: [pxToRem(80), { lineHeight: pxToRem(88), fontWeight: 700 }],
      'd1-t': [pxToRem(64), { lineHeight: pxToRem(72), fontWeight: 700 }],
      'd1-m': [pxToRem(44), { lineHeight: pxToRem(48), fontWeight: 700 }],

      d2: [pxToRem(64), { lineHeight: pxToRem(72), fontWeight: 700 }],
      'd2-t': [pxToRem(56), { lineHeight: pxToRem(64), fontWeight: 700 }],
      'd2-m': [pxToRem(36), { lineHeight: pxToRem(40), fontWeight: 700 }],

      // Heading

      h1: [pxToRem(56), { lineHeight: pxToRem(64), fontWeight: 600 }],
      'h1-m': [pxToRem(40), { lineHeight: pxToRem(46), fontWeight: 600 }],

      h2: [pxToRem(48), { lineHeight: pxToRem(56), fontWeight: 600 }],
      'h2-m': [pxToRem(32), { lineHeight: pxToRem(36), fontWeight: 600 }],

      h3: [pxToRem(40), { lineHeight: pxToRem(48), fontWeight: 600 }],
      'h3-m': [pxToRem(28), { lineHeight: pxToRem(36), fontWeight: 600 }],

      h4: [pxToRem(32), { lineHeight: pxToRem(40), fontWeight: 600 }],
      'h4-m': [pxToRem(24), { lineHeight: pxToRem(30), fontWeight: 600 }],

      h5: [pxToRem(24), { lineHeight: pxToRem(32), fontWeight: 600 }],
      'h5-m': [pxToRem(20), { lineHeight: pxToRem(26), fontWeight: 600 }],

      h6: [pxToRem(20), { lineHeight: pxToRem(28), fontWeight: 600 }],
      'h6-m': [pxToRem(18), { lineHeight: pxToRem(24), fontWeight: 600 }],

      // Body Regular

      'p-reg-lg': [pxToRem(24), { lineHeight: pxToRem(32), fontWeight: 400 }],
      'p-reg-lg-m': [pxToRem(20), { lineHeight: pxToRem(28), fontWeight: 400 }],

      'p-reg-md': [pxToRem(20), { lineHeight: pxToRem(28), fontWeight: 400 }],
      'p-reg-base': [pxToRem(16), { lineHeight: pxToRem(22), fontWeight: 400 }],
      'p-reg-sm': [pxToRem(14), { lineHeight: pxToRem(20), fontWeight: 400 }],
      'p-reg-xs': [pxToRem(12), { lineHeight: pxToRem(18), fontWeight: 400 }],

      // Bold Link
      'p-bld-link-sm': [
        pxToRem(14),
        {
          lineHeight: pxToRem(20),
          fontWeight: 600,
        },
      ],
      'p-bld-link-base': [
        pxToRem(16),
        {
          lineHeight: pxToRem(22),
          fontWeight: 600,
        },
      ],
      'p-bld-link-md': [
        pxToRem(20),
        {
          lineHeight: pxToRem(28),
          fontWeight: 600,
        },
      ],

      // Body Bold

      'p-bld-lg': [pxToRem(24), { lineHeight: pxToRem(32), fontWeight: 600 }],
      'p-bld-lg-m': [pxToRem(20), { lineHeight: pxToRem(28), fontWeight: 600 }],

      'p-bld-md': [pxToRem(20), { lineHeight: pxToRem(28), fontWeight: 600 }],
      'p-bld-base': [pxToRem(16), { lineHeight: pxToRem(22), fontWeight: 600 }],
      'p-bld-sm': [pxToRem(14), { lineHeight: pxToRem(20), fontWeight: 600 }],
      'p-bld-xs': [pxToRem(12), { lineHeight: pxToRem(18), fontWeight: 600 }],

      // Caption

      'cap-md': [pxToRem(20), { lineHeight: pxToRem(22), fontWeight: 400 }],
      'cap-base': [pxToRem(16), { lineHeight: pxToRem(18), fontWeight: 400 }],
      'cap-sm': [pxToRem(14), { lineHeight: pxToRem(16), fontWeight: 400 }],
      'cap-xs': [pxToRem(12), { lineHeight: pxToRem(14), fontWeight: 400 }],
      'cap-xxs': [pxToRem(10), { lineHeight: pxToRem(10), fontWeight: 400 }],
    },
    gridTemplateRows: {
      '0fr': '0fr',
      '1fr': '1fr',
    },
    boxShadow: {
      600: `${[
        '0px 20px 15px rgba(16, 24, 64, 0.04)',
        '0px 25px 40px rgba(16, 24, 64, 0.10)',
        '0px -2px 20px rgba(16, 24, 64, 0.03)',
      ].join(', ')};`,
      500: `${[
        '0px 10px 10px rgba(16, 24, 64, 0.04)',
        '0px 20px 25px rgba(16, 24, 64, 0.10)',
        '0px -2px 15px rgba(16, 24, 64, 0.03)',
      ].join(', ')};`,
      400: `${[
        '0px 4px 6px rgba(16, 24, 64, 0.05)',
        '0px 10px 15px rgba(16, 24, 64, 0.10)',
      ].join(', ')};`,
      300: `${[
        '0px 3px 6px 0px rgba(16, 24, 64, 0.05)',
        '0px 1px 15px 0px rgba(16, 24, 64, 0.10)',
      ].join(', ')};`,
      200: '0px 5px 10px rgba(16, 24, 64, 0.06)',
    },
    colors: {
      transparent: 'transparent',
      foreground: {
        DEFAULT: '#808080',
      },
      red: {
        DEFAULT: '#D4121E',
      },
      primary: {
        600: '#960C23',
        500: '#C8102E',
        400: '#D64C62',
        300: '#ECABB6',
        200: '#F7DADE',
      },
      secondary: {
        700: '#001D32',
        600: '#012945',
        500: '#003F69',
        400: '#709AB6',
        300: '#CEE2E8',
        200: '#F1F8FA',
      },
      tertiary: {
        400: '#CEB0A1',
        300: '#EDDAD1',
        200: '#FAF0EB',
      },
      neutral: {
        900: '#000000',
        700: '#767676',
        500: '#C4C4C4',
        300: '#EBEBEB',
        100: '#F7F7F7',
        '000': '#FFFFFF',
      },
      success: {
        text: '#145B3A',
        icon: '#18A165',
        bg: '#EDFDF6',
      },
      warning: {
        text: '#996A13',
        icon: '#FFB020',
        bg: '#FFFAE9',
      },
      error: {
        text: '#981717',
        icon: '#E52727',
        bg: '#FFEEEE',
      },
      info: {
        text: '#2142A6',
        icon: '#3366FF',
        bg: '#EBF0FF',
      },
    },
    fontFamily: {
      assistant: ['var(--font-assistant)', ...defaultTheme.fontFamily.sans],
      barlow: ['var(--font-barlow)', ...defaultTheme.fontFamily.sans],
      barlowSemiCondensed: [
        'var(--font-barlow-semi-condensed)',
        ...defaultTheme.fontFamily.sans,
      ],
    },
    extend: {
      width: SHARED_WIDTH_HEIGHT_SPACING,
      minWidth: SHARED_WIDTH_HEIGHT_SPACING,
      maxWidth: SHARED_WIDTH_HEIGHT_SPACING,
      height: SHARED_WIDTH_HEIGHT_SPACING,
      minHeight: SHARED_WIDTH_HEIGHT_SPACING,
      maxHeight: SHARED_WIDTH_HEIGHT_SPACING,
      gap: SHARED_SPACING,
      padding: SHARED_SPACING,
      margin: SHARED_SPACING,
      spacing: spacing(13, 100),
      aspectRatio: {
        video: '1.774193548387097/1',
        image: '1.501706484641638/1',
        'image-sm': '1.481481481481481/1',
        'page-header': '1.35/1',
        map: '1.041269841269841/1',
      },
      backgroundImage: {
        'pattern-04': "url('/images/image-blurred-bg-04.png')",
      },
      zIndex: {
        '100': '100',
        '55': '55',
      },
      borderRadius: {
        0.5: pxToRem(2),
        1: pxToRem(4),
        1.5: pxToRem(6),
        2: pxToRem(8),
        2.5: pxToRem(10),
        3: pxToRem(12),
        3.5: pxToRem(14),
        4: pxToRem(16),
        4.5: pxToRem(18),
        5: pxToRem(20),
        5.5: pxToRem(22),
        6: pxToRem(24),
        6.5: pxToRem(26),
        7: pxToRem(28),
        7.5: pxToRem(30),
        8: pxToRem(32),
      },
      borderWidth: {
        0.75: pxToRem(3),
        1.5: pxToRem(6),
        1.25: pxToRem(5),
      },
    },
    animation: {
      rotate: 'rotate 1s linear infinite',
      prixClipFix: 'prixClipFix 2s linear infinite',
      spinner: 'spin 1s linear infinite',
      in: 'in 200ms ease-out',
      'jingle-bell-shake': 'jingle-bell-shake 1s ease-in-out infinite',
    },
    keyframes: {
      spin: {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' },
      },
      in: {
        '0%': { opacity: '0' },
        '100%': { opacity: '100%' },
      },
      rotate: {
        '100%': { transform: 'rotate(360deg)' },
      },
      prixClipFix: {
        '0%': { clipPath: 'polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0)' },
        '25%': {
          clipPath: 'polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0)',
        },
        '50%': {
          clipPath:
            'polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%)',
        },
        '75%': {
          clipPath: 'polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%)',
        },
        '100%': {
          clipPath: 'polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0)',
        },
      },
      'jingle-bell-shake': {
        '0%': { transform: 'translate(0, 0)' },
        '10%': { transform: 'translate(-3px, 0)' },
        '20%': { transform: 'translate(3px, 0)' },
        '30%': { transform: 'translate(-3px, 0)' },
        '40%': { transform: 'translate(3px, 0)' },
        '50%': { transform: 'translate(0, 0)' },
        '100%': { transform: 'translate(0, 0)' },
      },
    },
  },
  plugins: [
    tailwindPlugin(({ addUtilities, theme }) => {
      addUtilities({
        '.focus-style-light': {
          outline: 'none',
          boxShadow: `${[
            `0px 0px 0px 1px ${theme('colors.neutral.500')}`,
            `0px 0px 0px 2px ${theme('colors.neutral.900')}`,
            `0px 0px 0px 4px ${theme('colors.secondary.200')}`,
          ].join(', ')};`,
        },
        '.focus-style-dark': {
          outline: 'none',
          boxShadow: `${[
            `0px 0px 0px 1px ${theme('colors.neutral.500')}`,
            `0px 0px 0px 2px ${theme('colors.neutral.000')}`,
            `0px 0px 0px 4px ${theme('colors.info.icon')}`,
          ].join(', ')};`,
        },
        '.full-link': {
          '&:after': {
            display: 'block',
            content: '""',
            position: 'absolute',
            inset: '0',
            zIndex: '1',
          },
        },
      });
    }),
  ],
};
export default config;
