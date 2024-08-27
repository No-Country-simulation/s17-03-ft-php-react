import { cleanup, render, screen } from '@testing-library/react';
import PetDetailPage from '@/app/adopt/[id]/page';

describe('PetDetail page test', () => {
  const params = { id: '' };
  afterEach(() => {
    cleanup();
    jest.clearAllTimers();
  });

  it('should find adopt-pet-page test id', () => {
    render(<PetDetailPage params={params} />);
    const page = screen.getByTestId('pet-detail-page');
    expect(page).toBeInTheDocument();
  });
});
