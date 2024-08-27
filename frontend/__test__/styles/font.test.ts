import { montserratConfig } from '@/styles/font';

const FONT_SRC_VERIFIED = [
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
];
const FONT_VARIABLE_VERIFIED = '--font-montserrat';
const FONT_FALLBACK_VERIFIED = ['sans-serif', 'system-ui', 'Apple Color Emoji'];
const FONT_DISPLAY_VERIFIED = 'swap';

describe('montserrat font configuration tests', () => {
  it('should correctly set the montserrat font variable', () => {
    expect(montserratConfig.variable).toEqual(FONT_VARIABLE_VERIFIED);
  });

  it('should have the correct src fonts', () => {
    expect(montserratConfig.src).toEqual(FONT_SRC_VERIFIED);
  });

  it('should have the correct fallback fonts', () => {
    expect(montserratConfig.fallback).toEqual(FONT_FALLBACK_VERIFIED);
  });

  it('should set display property to swap', () => {
    expect(montserratConfig.display).toEqual(FONT_DISPLAY_VERIFIED);
  });
});
