import Button from '@/components/core/Button/Button';

const ExternalSignin = () => {
  return (
    <div
      className="flex w-full flex-col gap-y-4 pb-3 pt-2"
      aria-label="Otras formas de iniciar sesion"
      tabIndex={6}>
      <Button type="submit" disabled size="full" variant="outline" tabIndex={7}>
        Continuar con Google
      </Button>
      <Button type="submit" disabled size="full" variant="outline" tabIndex={8}>
        Continuar con Apple
      </Button>
      <Button type="submit" disabled size="full" variant="outline" tabIndex={9}>
        Continuar con Meta
      </Button>
    </div>
  );
};

export default ExternalSignin;
