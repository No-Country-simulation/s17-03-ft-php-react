import { cleanup, render, screen, waitFor } from '@testing-library/react';
import LogoHeader from '@/components/LogoHeader/LogoHeader';

describe('LoginHeader component test', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllTimers();
  });

  it('renders the PetLogo component', async () => {
    render(<LogoHeader />);
    const petLogo = (await waitFor(() =>
      screen.findByAltText('Logo Pet icon')
    )) as HTMLImageElement;
    expect(petLogo).toBeInTheDocument();
  });

  it('renders the h1 element with the correct text when h1 prop is provided', () => {
    const h1Text = 'Página de login';
    render(<LogoHeader h1={h1Text} />);
    const h1Element = screen.getByText(h1Text);
    expect(h1Element).toBeInTheDocument();
    expect(h1Element).toHaveClass('visually-hidden');
  });

  it('does not render an h1 element when h1 prop is not provided', () => {
    render(<LogoHeader />);
    const h1Element = screen.queryByRole('heading', { level: 1 });
    expect(h1Element).not.toBeInTheDocument();
  });
});
