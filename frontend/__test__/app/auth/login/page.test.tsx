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
});
