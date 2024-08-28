import { cleanup, render, screen } from '@testing-library/react';
import SignUpPage from '@/app/(auth)/signup/page';

describe('SignUp page test', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllTimers();
  });

  it('should find signup-page test id', () => {
    render(<SignUpPage />);
    const page = screen.getByTestId('signup-page');
    expect(page).toBeInTheDocument();
  });
});
