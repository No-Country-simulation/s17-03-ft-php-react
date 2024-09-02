/* eslint-disable react/display-name */
import { cleanup, render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import SignupStepOnePage from '@/app/(auth)/signup/page';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useTransition: jest.fn(() => [false, jest.fn()]),
}));

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  useFormState: jest.fn(() => [undefined, jest.fn()]),
}));

jest.mock('next/link', () => {
  return ({ children, href }: { children: ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});
jest.mock('@/app/(auth)/signup/_components/SignupForm/SignupEmailForm', () => {
  return function DummySignupEmailForm() {
    return <div data-testid="signup-email-form">Signup Email Form</div>;
  };
});

describe('SignupStepOnePage page test', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  it('should find signup-stepone-page test id and tabindex', () => {
    render(<SignupStepOnePage />);
    const page = screen.getByTestId('signup-stepone-page');
    expect(page).toBeInTheDocument();
    expect(page).toHaveAttribute('tabindex', '0');
  });

  it('renders the logo header with the correct text', () => {
    render(<SignupStepOnePage />);
    const logoHeader = screen.getByRole('heading', { name: /pagina para crear cuenta/i });
    expect(logoHeader).toBeInTheDocument();
  });

  it('contains a link to the home page', () => {
    render(<SignupStepOnePage />);
    const homeLink = screen.getByRole('link', { name: /pagina para crear cuenta/i });
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('renders the signup email form', () => {
    render(<SignupStepOnePage />);
    const signupEmailForm = screen.getByTestId('signup-email-form');
    expect(signupEmailForm).toBeInTheDocument();
  });

  it('renders the "O" divider with correct classes', () => {
    render(<SignupStepOnePage />);
    const divider = screen.getByText('O');
    expect(divider).toBeInTheDocument();
    expect(divider).toHaveClass('or-driver-bars');
  });

  it('contains a link to the signin page', () => {
    render(<SignupStepOnePage />);
    const signupLink = screen.getByRole('link', { name: /iniciar sesion/i });
    expect(signupLink).toHaveAttribute('href', '/login');
  });
});
