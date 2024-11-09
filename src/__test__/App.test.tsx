import { render, screen, fireEvent } from '../test-utils';
import App from '../App';

describe('App', () => {
  it('renders main components', () => {
    render(<App />);

    expect(screen.getByText('Broccoli & Co.')).toBeInTheDocument();
    expect(screen.getByText('A better way to enjoy every day.')).toBeInTheDocument();
    expect(screen.getByText(/2024 Broccoli & Co. All rights reserved./)).toBeInTheDocument();
  });

  it('opens invite modal when request button is clicked', () => {
    render(<App />);

    const requestButton = screen.getByRole('button', {
      name: /request an invite/i,
    });
    fireEvent.click(requestButton);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('closes invite modal when onClose is triggered', () => {
    render(<App />);

    // Open modal
    const requestButton = screen.getByRole('button', {
      name: /request an invite/i,
    });
    fireEvent.click(requestButton);

    // Close modal
    const closeButton = screen.getByTestId('modal-close-button');
    fireEvent.click(closeButton);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
