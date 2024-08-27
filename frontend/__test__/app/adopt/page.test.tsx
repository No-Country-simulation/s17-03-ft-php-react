import { cleanup, render, screen } from '@testing-library/react';
import AdoptPage from '@/app/adopt/page';

describe('Adopt page test', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllTimers();
  });
  it('should find adopt-pet-page test id', () => {
    render(<AdoptPage />);
    const page = screen.getByTestId('adopt-pet-page');
    expect(page).toBeInTheDocument();
  });
});
