import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/core/Button/Button';
import FormField from '@/components/core/FormField/FormField';
import PasswordFormField from '@/components/core/PasswordFormField/PasswordFormField';

export default function LoginPage() {
  return (
    <div
      data-testid="login-page"
      className="container flex flex-col items-center justify-center p-3 pt-5"
      tabIndex={0}>
      <header className="flex w-full items-center justify-center p-2 pt-14">
        <Image
          className={`aspect-square drop-shadow-[0px_0px_12px_#fde112]`}
          src="/images/pet.png"
          alt="Pet loading icon"
          loading="eager"
          width={81}
          height={81}
          tabIndex={1}
        />
        <h1 className="absolute left-0 top-0 size-px select-none overflow-hidden whitespace-nowrap">
          Pagina de login
        </h1>
      </header>
      <main className="mt-12 flex w-full max-w-lg flex-col items-start justify-center gap-y-5">
        <h2 className="text-3xl font-semibold leading-10" tabIndex={2}>
          Iniciar Sesion
        </h2>
        <FormField
          id="email-field"
          data-testid="email-field"
          onAction="clean"
          type="email"
          label="Correo Electronico"
          tabIndex={3}
        />
        <PasswordFormField
          tabIndex={4}
          id="password-field"
          data-testid="email-field"
          label="Contraseña"
        />
        <Button tabIndex={5} type="submit" size="full">
          Continuar
        </Button>
        <div
          className="flex w-full flex-col gap-y-4 pb-3 pt-2"
          aria-label="Otras formas de iniciar sesion"
          tabIndex={6}>
          <Button type="submit" size="full" variant="outline" tabIndex={7}>
            Continuar con Google
          </Button>
          <Button type="submit" size="full" variant="outline" tabIndex={8}>
            Continuar con Apple
          </Button>
          <Button type="submit" size="full" variant="outline" tabIndex={9}>
            Continuar con Meta
          </Button>
        </div>
      </main>
      <div className="relative mt-3 flex w-full max-w-full select-none items-center justify-center gap-x-3 text-center text-xl text-neutral-99 before:h-px before:w-full before:max-w-60 before:border before:border-neutral-99 before:content-[''] after:h-px after:w-full after:max-w-60 after:border after:border-neutral-99 after:content-['']">
        O
      </div>
      <div className="mt-2 flex w-full max-w-full items-center justify-center">
        <Link className="w-fit text-base font-medium text-secundario-90" href="/signup">
          Crea una cuenta
        </Link>
      </div>
    </div>
  );
}
