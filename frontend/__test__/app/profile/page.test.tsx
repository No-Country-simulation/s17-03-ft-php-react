import { cleanup, render, screen } from '@testing-library/react';
import ProfilePage from '@/app/profile/page';

describe('Profile page test', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllTimers();
  });
  it('should find user-profile-page test id', () => {
    render(<ProfilePage />);
    const page = screen.getByTestId('user-profile-page');
    expect(page).toBeInTheDocument();
  });
});
