import Link from 'next/link';
import Button from '@/components/core/Button/Button';

const LoginToSignup = () => (
  <div className="mt-3 flex w-full max-w-lg items-center justify-center">
    <Button variant="outline" size="full" asChild>
      <Link
        className="font-semibold outline-none focus:outline-none focus-visible:outline-none active:outline-none"
        href="/signup">
        Crea una cuenta
      </Link>
    </Button>
  </div>
);

export default LoginToSignup;
