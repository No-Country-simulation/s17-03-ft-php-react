import { cleanup, render, screen } from '@testing-library/react';
import FormField from '@/components/core/FormField/FormField';

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
    const { getByTestId } = render(<FormField data-testid="formfield-test-id" />);
    expect(getByTestId('formfield-test-id')).toBeInTheDocument();
  });
  it('renders correctly with label', () => {
    render(<FormField label="Label" />);
    const label = screen.getByLabelText('Label');
    expect(label).toBeInTheDocument();
  });
  it('renders correctly with placeholder', () => {
    render(<FormField placeholder="Enter text" />);
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
  });
  it('renders correctly with initial value', () => {
    const { getByDisplayValue } = render(<FormField defaultValue="Initial Value" />);
    const input = getByDisplayValue('Initial Value');
    expect(input).toBeInTheDocument();
  });
  it('renders correctly when disabled', () => {
    render(<FormField disabled data-testid="disabled-field" />);

    const input = screen.getByTestId('disabled-field');
    expect(input).toBeDisabled();
  });
  it('Should not render ResetButton when onAction is disabled', () => {
    render(<FormField data-testid="disabled-field" onAction="disabled" />);
    const resetButton = screen.queryByTestId('reset-button', { trim: true });
    expect(resetButton).not.toBeInTheDocument();
  });
  it('Should render ResetButton when onAction is clean', () => {
    render(<FormField onAction="clean" />);
    const resetButton = screen.queryByTestId('reset-button', { trim: true });
    expect(resetButton).toBeInTheDocument();
  });
});
