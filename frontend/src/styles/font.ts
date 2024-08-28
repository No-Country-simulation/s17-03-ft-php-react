import type { CssVariable } from 'next/dist/compiled/@next/font';
import localFont from 'next/font/local';

export const montserrat = localFont<CssVariable>({
  src: [
    {
      path: '../../public/fonts/Montserrat-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Montserrat-RegularItalic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Montserrat-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Montserrat-MediumItalic.ttf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Montserrat-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Montserrat-SemiBoldItalic.ttf',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Montserrat-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Montserrat-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-montserrat',
  fallback: ['sans-serif', 'system-ui', 'Apple Color Emoji'],
  display: 'swap',
});
