import { cleanup, render, waitFor } from '@testing-library/react';
import PageLoader from '@/app/loading';

describe('PageLoader test', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllTimers();
  });
  it('should find page-loader test id', () => {
    const { getByTestId } = render(<PageLoader />);
    expect(getByTestId('page-loader')).toBeInTheDocument();
  });

  it('loads the image correctly', async () => {
    const { findByAltText } = render(<PageLoader />);
    const image = await waitFor(() => findByAltText('Pet loading icon'));
    expect(image).toBeInTheDocument();
  });

  it('applies the animation correctly', async () => {
    const { findByAltText } = render(<PageLoader />);
    const image = await waitFor(() => findByAltText('Pet loading icon'));
    expect(image).toHaveClass('shadowPulseAnimation');
  });
});
