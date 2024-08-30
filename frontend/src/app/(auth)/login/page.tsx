import Link from 'next/link';
import LogoHeader from '@/components/LogoHeader/LogoHeader';
import ExternalSignin from './_components/ExternalSignin/ExternalSignin';
import LoginForm from './_components/LoginForm/LoginForm';

export default function LoginPage() {
  return (
    <div
      data-testid="login-page"
      className="container flex flex-col items-center justify-center p-3 pt-5"
      tabIndex={0}>
      <LogoHeader h1="Pagina de login" />
      <main className="mt-12 w-full max-w-lg">
        <LoginForm />
        <ExternalSignin />
      </main>
      <div className="or-driver-bars before:w-full before:max-w-60 after:w-full after:max-w-60">
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
