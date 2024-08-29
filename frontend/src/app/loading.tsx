import Image from 'next/image';
import animation from '../styles/animations.module.css';

export default function PageLoader() {
  return (
    <div
      data-testid="page-loader"
      className="flex h-dvh w-dvw items-center justify-center bg-neutral-20">
      <Image
        className={`aspect-square ${animation.shadowPulseAnimation}`}
        src="/images/pet.png"
        alt="Pet loading icon"
        loading="eager"
        width={81}
        height={81}
      />
    </div>
  );
}
