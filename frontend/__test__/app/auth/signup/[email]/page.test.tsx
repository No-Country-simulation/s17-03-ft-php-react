/* eslint-disable react/display-name */
import { cleanup, render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import SignupPageStepTwo from '@/app/(auth)/signup/[email]/page';

jest.mock('next/link', () => {
  return ({ children, href }: { children: ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

jest.mock('@/app/(auth)/signup/_components/SignupForm/SignupForm', () => {
  return function DummySignupEmailForm() {
    return <div data-testid="signup-form">Signup Email Form</div>;
  };
});

describe('SignupPageStepTwo page test', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  it('should find signup-steptwo-page test id', () => {
    render(<SignupPageStepTwo />);
    const page = screen.getByTestId('signup-steptwo-page');
    expect(page).toBeInTheDocument();
  });

  it('renders the logo header with the correct text', () => {
    render(<SignupPageStepTwo />);
    const pageHeader = screen.getByRole('heading', {
      name: /Pagina de registro, completar datos para crear cuenta/i,
    });
    expect(pageHeader).toBeInTheDocument();
  });

  it('renders the signup email form', () => {
    render(<SignupPageStepTwo />);
    const signupEmailForm = screen.getByTestId('signup-form');
    expect(signupEmailForm).toBeInTheDocument();
  });
});
