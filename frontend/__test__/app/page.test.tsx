import { cleanup, render, screen } from '@testing-library/react';
import RootPage from '@/app/page';

describe('Root page test', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllTimers();
  });
  it('should find root-page test id', () => {
    render(<RootPage />);
    const page = screen.getByTestId('root-page');
    expect(page).toBeInTheDocument();
  });
});
