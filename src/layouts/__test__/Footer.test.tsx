import { render, screen } from '../../test-utils';
import Footer from 'src/layouts/Footer';

describe('Footer', () => {
  it('renders copyright text', () => {
    render(<Footer />);

    expect(screen.getByText('2024 Broccoli & Co. All rights reserved.')).toBeInTheDocument();
  });
});
