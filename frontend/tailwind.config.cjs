import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  prefix: '',
  separator: ':',
  content: [
    './index.html',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primario: {
          '0': '#1B1B1B',
          '10': '#432505',
          '20': '#724711',
          '30': '#87570C',
          '40': '#A36E05',
          '50': '#CD9B01',
          '60': '#F2CB05',
          '70': '#FDE112',
          '80': '#FFF145',
          '90': '#FFFA88',
          '95': '#FFFFC2',
          '99': '#FEFEE8',
          '100':'#FFFFFF'
        },
        secundario: {
          '0':  '#1B1B1B',
          '10': '#003134',
          '20': '#0C5455',
          '30': '#086667',
          '40': '#038C8C',
          '50': '#00A4A2',
          '60': '#01CBC5',
          '70': '#19E8DE',
          '80': '#4DFBED',
          '90': '#8EFFF4',
          '95': '#C6FFF8',
          '99': '#EEFFFC',
          '100':'#FDFFFD'
        },
        error: {
          '0': ' #1B1B1B',
          '10': '#410004',
          '20': '#65090E',
          '30': '#852221',
          '40': '#A53A36',
          '50': '#C5524C',
          '60': '#E66A63',
          '70': '#FF8981',
          '80': '#FFB3AD',
          '90': '#FFDAD7',
          '95': '#FFEDEB',
          '99': '#FFFBFF',
          '100':'#FFFFFF'
        },
        neutral: {
          '0':  '#1B1B1B',
          '10': '#1C1B1C',
          '20': '#313030',
          '30': '#484646',
          '40': '#605E5E',
          '50': '#797676',
          '60': '#939090',
          '70': '#ADAAAA',
          '80': '#C9C6C5',
          '90': '#E5E5E1',
          '95': '#F4F0EF',
          '99': '#FCFCFC',
          '100':'#FFFFFF'
        }
      }
      
    },
  },
  plugins: [
    plugin(({ addVariant, e }) => {
      addVariant('before', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`before${separator}${className}`)}::before`;
        });
      });
      addVariant('after', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`after${separator}${className}`)}::after`;
        });
      });
    }),
  ],
  future: {
    hoverOnlyWhenSupported: true,
    removeDeprecatedGapUtilities: true,
    standardFontWeights: true,
  },
};
