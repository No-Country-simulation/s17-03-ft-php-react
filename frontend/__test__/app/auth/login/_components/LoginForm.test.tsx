import { cleanup, render, screen } from '@testing-library/react';
import LoginForm from '@/app/(auth)/login/_components/LoginForm/LoginForm';

describe('LoginForm component test', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllTimers();
  });

  it('should find login-page test id', () => {
    render(<LoginForm />);
    const page = screen.getByTestId('form-login');
    expect(page).toBeInTheDocument();
  });

  it('renders the form title with correct text', () => {
    render(<LoginForm />);
    const title = screen.getByRole('heading', { level: 2 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Iniciar Sesion');
  });

  it('renders the email input field', () => {
    render(<LoginForm />);
    const emailField = screen.getByLabelText('Correo Electronico');
    expect(emailField).toBeInTheDocument();
    expect(emailField).toHaveAttribute('type', 'email');
    expect(emailField).toHaveAttribute('autoComplete', 'email');
    expect(emailField).toHaveAttribute('tabIndex', '3');
    expect(emailField).toHaveAttribute('id', 'email-field');
  });

  it('renders the password input field', () => {
    render(<LoginForm />);
    const passwordField = screen.getByLabelText('Contraseña');
    expect(passwordField).toBeInTheDocument();
    expect(passwordField).toHaveAttribute('type', 'password');
    expect(passwordField).toHaveAttribute('autoComplete', 'off');
    expect(passwordField).toHaveAttribute('tabIndex', '4');
    expect(passwordField).toHaveAttribute('id', 'password-field');
  });

  it('renders the submit button with correct text', () => {
    render(<LoginForm />);
    const submitButton = screen.getByRole('button', { name: /continuar/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveAttribute('type', 'submit');
  });
});
