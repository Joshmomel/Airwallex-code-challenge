import { render, screen } from 'src/test-utils';
import Header from 'src/layouts/Header';

describe('Header', () => {
  it('renders logo with correct link', () => {
    render(<Header />);

    const logo = screen.getByText('Broccoli & Co.');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('href', '/');
  });
});
