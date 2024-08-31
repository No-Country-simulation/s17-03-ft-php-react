import SignupForm from '../_components/SignupForm/SignupForm';

interface SignupPageStepTwoProps {
  params?: { email: string };
}

export default function SignupPageStepTwo({ params }: SignupPageStepTwoProps) {
  return (
    <div
      data-testid="signup-steptwo-page"
      className="before-bright-white relative flex h-full flex-col items-center justify-center overflow-x-hidden p-3 pt-5">
      <header>
        <h1 className="visually-hidden">Pagina de registro, completar datos para crear cuenta</h1>
      </header>
      <main className="mt-14 size-full max-w-lg">
        <SignupForm email={params?.email} />
      </main>
    </div>
  );
}
