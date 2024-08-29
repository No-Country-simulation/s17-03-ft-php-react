import { cleanup, render } from '@testing-library/react';
import PasswordField from '@/components/core/PasswordFormField/PasswordFormField';

type CryptoType = `${string}-${string}-${string}-${string}-${string}`;

beforeAll(() => {
  const originalCrypto = global.crypto;
  Object.defineProperty(global, 'crypto', {
    value: {
      ...originalCrypto,
      randomUUID: jest.fn(() => '00000000-0000-0000-0000-000000000000' as CryptoType),
    },
  });
});

afterAll(() => {
  jest.restoreAllMocks();
});

afterEach(() => {
  cleanup();
  jest.clearAllTimers();
});

describe('FormField test', () => {
  it('should render with test id', () => {
    const { getByTestId } = render(<PasswordField data-testid="formfield-test-id" />);
    expect(getByTestId('formfield-test-id')).toBeInTheDocument();
  });
  it('renders default type is password', () => {
    const { getByTestId } = render(<PasswordField data-testid="formfield-test-id" />);
    const input = getByTestId('formfield-test-id');
    expect(input).toHaveAttribute('type', 'password');
  });
  it('Should render EyeButton by default', () => {
    const { queryByTestId } = render(<PasswordField data-testid="password-field" />);
    const resetButton = queryByTestId('eye-button', { trim: true });
    expect(resetButton).toBeInTheDocument();
  });
});
