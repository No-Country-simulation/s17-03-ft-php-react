import { cleanup, render, screen } from '@testing-library/react';
import LoginToSignup from '@/app/(auth)/login/_components/LoginToSignup/LoginToSignup';

describe('LoginToSignup component test', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllTimers();
  });

  it('renders the "Crea una cuenta" link inside the button', () => {
    render(<LoginToSignup />);

    const linkElement = screen.getByRole('link', { name: /crea una cuenta/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/signup');
  });
});
