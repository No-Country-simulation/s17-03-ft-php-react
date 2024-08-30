import { cleanup, render, screen } from '@testing-library/react';
import LoginPage from '@/app/(auth)/login/page';

describe('Login page test', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllTimers();
  });

  it('should find login-page test id', () => {
    render(<LoginPage />);
    const page = screen.getByTestId('login-page');
    expect(page).toBeInTheDocument();
  });

  it('renders the logo header with the correct text', () => {
    render(<LoginPage />);
    const logoHeader = screen.getByRole('heading', { name: /pagina de login/i });
    expect(logoHeader).toBeInTheDocument();
  });

  it('contains a link to the home page', () => {
    render(<LoginPage />);
    const homeLink = screen.getByRole('link', { name: /pagina de login/i });
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('renders the login form', () => {
    render(<LoginPage />);
    const loginForm = screen.getByTestId('form-login');
    expect(loginForm).toBeInTheDocument();
  });
  it('renders the "O" divider with correct classes', () => {
    render(<LoginPage />);
    const divider = screen.getByText('O');
    expect(divider).toBeInTheDocument();
    expect(divider).toHaveClass('or-driver-bars');
  });

  it('contains a link to the signup page', () => {
    render(<LoginPage />);
    const signupLink = screen.getByRole('link', { name: /crea una cuenta/i });
    expect(signupLink).toHaveAttribute('href', '/signup');
  });
  it('focuses on the login page container when tab key is pressed', async () => {
    render(<LoginPage />);
    const loginPageContainer = screen.getByTestId('login-page');
    loginPageContainer.focus();
    expect(loginPageContainer).toHaveFocus();
  });
});
