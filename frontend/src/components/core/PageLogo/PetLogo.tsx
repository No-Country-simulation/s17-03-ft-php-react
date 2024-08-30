import { cva } from 'class-variance-authority';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import animation from '@styles/animations.module.css';

type LogoType = 'loader' | 'bright' | 'normal';

const petLogoCVA = cva('aspect-square max-w-full object-center', {
  variants: {
    type: {
      loader: `${animation.shadowPulseAnimation}`,
      bright: 'drop-shadow-[0px_0px_12px_#fde112]',
      normal: '',
    },
  },
  defaultVariants: { type: 'normal' },
});

interface PetLogoProps {
  type?: LogoType;
  width?: number;
  height?: number;
  tabIndex?: number;
}

const PetLogo = ({ type = 'normal', width = 81, height = 81, tabIndex = 1 }: PetLogoProps) => (
  <Image
    className={cn(petLogoCVA({ type }))}
    src="/images/pet.png"
    alt="Logo Pet icon"
    loading="eager"
    width={width}
    height={height}
    tabIndex={tabIndex}
  />
);

export default PetLogo;
