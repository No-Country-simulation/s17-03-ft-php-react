import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useTransition } from 'react';
import { useFormState } from 'react-dom';
import SignupForm from '@/app/(auth)/signup/_components/SignupForm/SignupForm';
import { ResultCodes } from '@/types/enums/resultCodes';

const VALID_EMAIL = 'test@example.com';
const VALID_NAME = 'Test Name';
const VALID_PASSWORD = '123456780';
const VALID_BIRTHDATE = '2000-10-10';
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
  signupStepTwo: jest.fn(),
}));

describe('SignupForm component test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    jest.clearAllTimers();
  });

  it('renders the form correctly', () => {
    render(<SignupForm />);

    expect(screen.getByTestId('form-signup')).toBeInTheDocument();

    expect(screen.getByLabelText(/Nombre y Apellido/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Fecha de nacimiento/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Correo Electronico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Estoy de acuerdo, continuar/i })
    ).toBeInTheDocument();
  });

  it('has correct accessibility attributes in form', () => {
    render(<SignupForm />);

    expect(screen.getByTestId('name-field')).toHaveAttribute('tabIndex', '2');
    expect(screen.getByTestId('brithdate-field')).toHaveAttribute('tabIndex', '3');
    expect(screen.getByTestId('email-field')).toHaveAttribute('tabIndex', '4');
    expect(screen.getByTestId('password-field')).toHaveAttribute('tabIndex', '5');
    expect(screen.getByRole('button', { name: /Estoy de acuerdo, continuar/i })).toHaveAttribute(
      'tabIndex',
      '6'
    );
  });

  it('submits the form with valid email', async () => {
    const mockDispatch = jest.fn();
    const mockStartTransition = jest.fn(callback => callback());
    (useTransition as jest.Mock).mockReturnValue([false, mockStartTransition]);
    (useFormState as jest.Mock).mockReturnValue([undefined, mockDispatch]);

    render(<SignupForm />);

    fireEvent.change(screen.getByTestId('name-field'), {
      target: { value: VALID_NAME },
    });
    fireEvent.change(screen.getByTestId('brithdate-field'), {
      target: { value: VALID_BIRTHDATE },
    });
    fireEvent.change(screen.getByTestId('email-field'), {
      target: { value: VALID_EMAIL },
    });
    fireEvent.change(screen.getByTestId('password-field'), {
      target: { value: VALID_PASSWORD },
    });

    fireEvent.submit(screen.getByTestId('form-signup'));

    await waitFor(() => {
      expect(mockStartTransition).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalled();
    });

    const formData = mockDispatch.mock.calls[0][0];
    expect(formData.get('nameField')).toBe(VALID_NAME);
    expect(formData.get('brithdateField')).toBe(VALID_BIRTHDATE);
    expect(formData.get('emailField')).toBe(VALID_EMAIL);
    expect(formData.get('passwordField')).toBe(VALID_PASSWORD);
  });

  it('handles form submission error', async () => {
    const mockDispatch = jest.fn();
    const mockStartTransition = jest.fn(callback => callback());
    (useTransition as jest.Mock).mockReturnValue([false, mockStartTransition]);
    (useFormState as jest.Mock).mockReturnValue([
      { type: 'error', resultCode: ResultCodes.INVALID_DATA },
      mockDispatch,
    ]);

    render(<SignupForm />);

    fireEvent.change(screen.getByTestId('name-field'), {
      target: { value: VALID_NAME },
    });
    fireEvent.change(screen.getByTestId('brithdate-field'), {
      target: { value: VALID_BIRTHDATE },
    });
    fireEvent.change(screen.getByTestId('email-field'), {
      target: { value: INVALID_EMAIL },
    });
    fireEvent.change(screen.getByTestId('password-field'), {
      target: { value: VALID_PASSWORD },
    });

    fireEvent.click(screen.getByRole('button', { name: /Estoy de acuerdo, continuar/i }));

    await waitFor(() => {
      expect(mockStartTransition).not.toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(mockDispatch).not.toHaveBeenCalled();
    });
  });
});
