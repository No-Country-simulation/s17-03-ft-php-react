import { cleanup, render, screen } from '@testing-library/react';
import SignupToLogin from '@/app/(auth)/signup/_components/SignupToLogin/SignupToLogin';

describe('SignupToLogin Component', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  it('should render the link with correct href and text', () => {
    render(<SignupToLogin />);
    const link = screen.getByRole('link', { name: /iniciar sesion/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/login');
  });

  it('should render the link with correct style', () => {
    render(<SignupToLogin />);
    const link = screen.getByRole('link', { name: /iniciar sesion/i });
    expect(link).toHaveClass(
      'font-semibold outline-none focus:outline-none focus-visible:outline-none active:outline-none w-full max-w-[100cqw] bg-transparent text-primario-60'
    );
  });

  it('should render the container with correct classes', () => {
    render(<SignupToLogin />);
    const container = screen.getByTestId('signup-to-login-container');
    expect(container).toHaveClass('mt-3 flex w-full max-w-lg items-center justify-center');
  });
});
