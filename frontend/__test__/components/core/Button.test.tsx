import { cleanup, render, screen } from '@testing-library/react';
import Button from '@/components/core/Button/Button';

describe('Button test', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllTimers();
  });
  it('should render child', () => {
    render(<Button>Test child</Button>);
    expect(screen.getByText('Test child')).toBeInTheDocument();
  });
  it('should find testid', () => {
    render(<Button data-testid="core-button">Test child</Button>);
    expect(screen.getByTestId('core-button')).toBeInTheDocument();
  });
});
