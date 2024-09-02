import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useTransition } from 'react';
import { useFormState } from 'react-dom';
import SignupEmailForm from '@/app/(auth)/signup/_components/SignupForm/SignupEmailForm';
import { ResultCodes } from '@/types/enums/resultCodes';

const VALID_EMAIL = 'test@example.com';
const INVALID_EMAIL = 'invalid-email';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useTransition: jest.fn(() => [false, jest.fn()]),
}));

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  useFormState: jest.fn(() => [undefined, jest.fn()]),
}));

jest.mock('@/app/(auth)/signup/actions', () => ({
  signupStepOne: jest.fn(),
}));

describe('SignupEmailForm component test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    jest.clearAllTimers();
  });

  it('renders the form correctly', () => {
    render(<SignupEmailForm />);

    expect(screen.getByTestId('form-signup-email')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Crea tu cuenta/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Correo Electronico/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Crear cuenta/i })).toBeInTheDocument();
  });

  it('has correct accessibility attributes in form', () => {
    render(<SignupEmailForm />);

    expect(screen.getByRole('heading', { name: /Crea tu cuenta/i })).toHaveAttribute(
      'tabIndex',
      '2'
    );
    expect(screen.getByTestId('email-field')).toHaveAttribute('tabIndex', '4');
    expect(screen.getByRole('button', { name: /Crear cuenta/i })).toHaveAttribute('tabIndex', '6');
  });

  it('submits the form with valid email', async () => {
    const mockDispatch = jest.fn();
    const mockStartTransition = jest.fn(callback => callback());
    (useTransition as jest.Mock).mockReturnValue([false, mockStartTransition]);
    (useFormState as jest.Mock).mockReturnValue([undefined, mockDispatch]);

    render(<SignupEmailForm />);

    fireEvent.change(screen.getByLabelText(/Correo Electronico/i), {
      target: { value: VALID_EMAIL },
    });

    fireEvent.click(screen.getByRole('button', { name: /Crear cuenta/i }));

    await waitFor(() => {
      expect(mockStartTransition).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalled();
    });

    const formData = mockDispatch.mock.calls[0][0];
    expect(formData.get('emailField')).toBe(VALID_EMAIL);
  });

  it('handles form submission error', async () => {
    const mockDispatch = jest.fn();
    const mockStartTransition = jest.fn(callback => callback());
    (useTransition as jest.Mock).mockReturnValue([false, mockStartTransition]);
    (useFormState as jest.Mock).mockReturnValue([
      { type: 'error', resultCode: ResultCodes.INVALID_DATA },
      mockDispatch,
    ]);

    render(<SignupEmailForm />);

    fireEvent.change(screen.getByLabelText(/Correo Electronico/i), {
      target: { value: INVALID_EMAIL },
    });

    fireEvent.click(screen.getByRole('button', { name: /Crear cuenta/i }));

    await waitFor(() => {
      expect(mockStartTransition).not.toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(mockDispatch).not.toHaveBeenCalled();
    });
  });
});
