import { render, screen } from '@testing-library/react';
import App from '../src/pages/index';

describe('App', () => {
  it('renders heading page', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { name: 'Toyota DeepFake' })
    ).toBeInTheDocument();
  });

  it('renders footer coypright', () => {
    render(<App />);
    expect(
      screen.getByRole('contentinfo', { text: 'Copyright Toyota' })
    ).toBeInTheDocument();
  });
});
