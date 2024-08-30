import { cleanup, render, screen, waitFor } from '@testing-library/react';
import ExternalSignin from '@/components/ExternalSignin/ExternalSignin';

describe('ExternalSignin component  test', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllTimers();
  });

  it('renders the external sign-in container', () => {
    render(<ExternalSignin />);
    const externalSigninContainer = screen.getByLabelText(/otras formas de iniciar sesion/i);
    expect(externalSigninContainer).toBeInTheDocument();
  });

  it('renders the Google sign-in button with the correct icon and text', async () => {
    render(<ExternalSignin />);
    const googleButton = screen.getByRole('button', { name: /continuar con google/i });
    expect(googleButton).toBeInTheDocument();
    const googleIcon = (await waitFor(() =>
      screen.findByAltText('Google Icon')
    )) as HTMLImageElement;
    expect(googleIcon).toBeInTheDocument();
    expect(googleIcon.src).toContain('%2Ficons%2FGoogleIcon.png');
    expect(googleIcon.width).toBe(24);
    expect(googleIcon.height).toBe(24);
  });

  it('renders the Apple sign-in button with the correct icon and text', async () => {
    render(<ExternalSignin />);
    const appleButton = screen.getByRole('button', { name: /continuar con apple/i });
    expect(appleButton).toBeInTheDocument();
    const appleIcon = (await waitFor(() => screen.findByAltText('Apple Icon'))) as HTMLImageElement;
    expect(appleIcon).toBeInTheDocument();
    expect(appleIcon.src).toContain('%2Ficons%2FAppleIcon.png');
    expect(appleIcon.width).toBe(24);
    expect(appleIcon.height).toBe(24);
  });

  it('renders the Meta sign-in button with the correct icon and text', async () => {
    render(<ExternalSignin />);
    const metaButton = screen.getByRole('button', { name: /continuar con meta/i });
    expect(metaButton).toBeInTheDocument();
    const metaIcon = (await waitFor(() => screen.findByAltText('Meta Icon'))) as HTMLImageElement;
    expect(metaIcon).toBeInTheDocument();
    expect(metaIcon.src).toContain('%2Ficons%2FMetaIcon.png');
    expect(metaIcon.width).toBe(24);
    expect(metaIcon.height).toBe(24);
  });

  it('all sign-in buttons have the correct classes and attributes', () => {
    render(<ExternalSignin />);
    const buttons = screen.getAllByRole('button');
    buttons.forEach((button, index) => {
      expect(button).toHaveClass(
        'relative flex items-center justify-center border-neutral-99 px-6 py-2'
      );
    });
  });
});
