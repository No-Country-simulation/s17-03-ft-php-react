import Image from 'next/image';
import Button from '@/components/core/Button/Button';

const ExternalSignin = () => {
  return (
    <div
      className="flex w-full flex-col gap-y-4 pb-3 pt-2"
      aria-label="Otras formas de iniciar sesion"
      tabIndex={6}>
      <Button
        type="submit"
        disabled
        size="full"
        variant="outline"
        tabIndex={7}
        className="relative flex items-center justify-center border-neutral-99 px-6 py-2">
        <span className="relative w-fit text-center text-sm min-[290px]:text-base">
          <Image
            src="/icons/GoogleIcon.png"
            alt="Google Icon"
            width={24}
            height={24}
            className="absolute -left-8 top-1/2 -translate-y-1/2 border-neutral-99"
          />
          Continuar con Google
        </span>
      </Button>
      <Button
        type="submit"
        disabled
        size="full"
        variant="outline"
        tabIndex={8}
        className="relative flex items-center justify-center border-neutral-99 px-6 py-2">
        <span className="relative w-fit text-center text-sm min-[290px]:text-base">
          <Image
            src="/icons/AppleIcon.png"
            alt="Apple Icon"
            width={24}
            height={24}
            className="absolute -left-8 top-1/2 -translate-y-1/2"
          />
          Continuar con Apple
        </span>
      </Button>
      <Button
        type="submit"
        disabled
        size="full"
        variant="outline"
        tabIndex={9}
        className="relative flex items-center justify-center border-neutral-99 px-6 py-2">
        <span className="relative w-fit text-center text-sm min-[290px]:text-base">
          <Image
            src="/icons/MetaIcon.png"
            alt="Meta Icon"
            width={24}
            height={24}
            className="absolute -left-8 top-1/2 -translate-y-1/2"
          />
          Continuar con Meta
        </span>
      </Button>
    </div>
  );
};

export default ExternalSignin;
