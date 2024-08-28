import { cleanup, render, screen } from '@testing-library/react';
import PetDetailPage from '@/app/(pets)/pet/[id]/page';

describe('PetDetail page test', () => {
  const params = { id: '' };
  afterEach(() => {
    cleanup();
    jest.clearAllTimers();
  });

  it('should find pet-detail-page test id', () => {
    render(<PetDetailPage params={params} />);
    const page = screen.getByTestId('pet-detail-page');
    expect(page).toBeInTheDocument();
  });
});
