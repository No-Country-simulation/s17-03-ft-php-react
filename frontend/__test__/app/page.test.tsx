import { cleanup, render, screen } from '@testing-library/react';
import RootPage from '@/app/page';

describe('Root page test', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllTimers();
  });
  it('should find root-page id', () => {
    render(<RootPage />);
    expect(screen.getByTestId('root-page')).toBeInTheDocument();
  });
});
