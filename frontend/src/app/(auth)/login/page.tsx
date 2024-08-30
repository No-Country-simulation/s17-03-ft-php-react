import Link from 'next/link';
import LogoHeader from '@/components/LogoHeader/LogoHeader';
import LoginForm from './_components/LoginForm/LoginForm';
import LoginToSignup from './_components/LoginToSignup/LoginToSignup';
import ExternalSignin from '../../../components/ExternalSignin/ExternalSignin';

export default function LoginPage() {
  return (
    <div
      data-testid="login-page"
      className="before-bright-white relative flex h-full flex-col items-center justify-center overflow-x-hidden p-3 pt-5"
      tabIndex={0}>
      <Link
        href="/"
        className="mt-14 w-fit outline-none focus:outline-none focus-visible:outline-none active:outline-none">
        <LogoHeader h1="Pagina de login" />
      </Link>
      <main className="mt-12 w-full max-w-lg">
        <LoginForm />
        <ExternalSignin />
      </main>
      <div className="or-driver-bars mt-2 before:w-full before:max-w-60 after:w-full after:max-w-60">
        O
      </div>
      <LoginToSignup />
    </div>
  );
}
