import Link from 'next/link';
import ExternalSignin from '@/components/ExternalSignin/ExternalSignin';
import LogoHeader from '@/components/LogoHeader/LogoHeader';
import SignupEmailForm from './_components/SignupForm/SignupEmailForm';
import SignupToLogin from './_components/SignupToLogin/SignupToLogin';

export default function SignupStepOnePage() {
  return (
    <div
      data-testid="signup-stepone-page"
      className="before-bright-white relative flex h-full flex-col items-center justify-center overflow-x-hidden p-3 pt-5"
      tabIndex={0}>
      <Link
        href="/"
        className="mt-14 w-fit outline-none focus:outline-none focus-visible:outline-none active:outline-none">
        <LogoHeader h1="Pagina para crear cuenta" />
      </Link>
      <div className="mt-12 w-full max-w-lg">
        <main>
          <SignupEmailForm />
        </main>
        <div className="or-driver-bars mt-2 before:w-full before:max-w-60 after:w-full after:max-w-60">
          O
        </div>
        <ExternalSignin />
        <SignupToLogin />
      </div>
    </div>
  );
}
