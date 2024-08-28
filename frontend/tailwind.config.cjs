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
          0: 'var(--color-primario-0)',
          10: 'var(--color-primario-10)',
          20: 'var(--color-primario-20)',
          30: 'var(--color-primario-30)',
          40: 'var(--color-primario-40)',
          50: 'var(--color-primario-50)',
          60: 'var(--color-primario-60)',
          70: 'var(--color-primario-70)',
          80: 'var(--color-primario-80)',
          90: 'var(--color-primario-90)',
          95: 'var(--color-primario-95)',
          99: 'var(--color-primario-99)',
          100: 'var(--color-primario-100)',
        },
        secundario: {
          0: 'var(--color-secundario-0)',
          10: 'var(--color-secundario-10)',
          20: 'var(--color-secundario-20)',
          30: 'var(--color-secundario-30)',
          40: 'var(--color-secundario-40)',
          50: 'var(--color-secundario-50)',
          60: 'var(--color-secundario-60)',
          70: 'var(--color-secundario-70)',
          80: 'var(--color-secundario-80)',
          90: 'var(--color-secundario-90)',
          95: 'var(--color-secundario-95)',
          99: 'var(--color-secundario-99)',
          100: 'var(--color-secundario-100)',
        },
        error: {
          0: 'var(--color-error-0)',
          10: 'var(--color-error-10)',
          20: 'var(--color-error-20)',
          30: 'var(--color-error-30)',
          40: 'var(--color-error-40)',
          50: 'var(--color-error-50)',
          60: 'var(--color-error-60)',
          70: 'var(--color-error-70)',
          80: 'var(--color-error-80)',
          90: 'var(--color-error-90)',
          95: 'var(--color-error-95)',
          99: 'var(--color-error-99)',
          100: 'var(--color-error-100)',
        },
        neutral: {
          0: 'var(--color-neutral-0)',
          10: 'var(--color-neutral-10)',
          20: 'var(--color-neutral-20)',
          30: 'var(--color-neutral-30)',
          40: 'var(--color-neutral-40)',
          50: 'var(--color-neutral-50)',
          60: 'var(--color-neutral-60)',
          70: 'var(--color-neutral-70)',
          80: 'var(--color-neutral-80)',
          90: 'var(--color-neutral-90)',
          95: 'var(--color-neutral-95)',
          99: 'var(--color-neutral-99)',
          100: 'var(--color-neutral-100)',
        },
      },
      fontFamily: {
        montserrat: 'var(--font-montserrat)',
      },
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
