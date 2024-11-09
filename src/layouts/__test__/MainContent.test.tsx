import { render, screen, fireEvent } from 'src/test-utils';
import MainContent from 'src/layouts/MainContent';

describe('MainContent', () => {
  const mockOnRequestInvite = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all text content correctly', () => {
    render(<MainContent onRequestInvite={mockOnRequestInvite} />);

    expect(screen.getByText('A better way to enjoy every day.')).toBeInTheDocument();
    expect(screen.getByText('Join our waitlist for early access.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /request an invite/i })).toBeInTheDocument();
  });

  it('calls onRequestInvite when button is clicked', () => {
    render(<MainContent onRequestInvite={mockOnRequestInvite} />);

    const requestButton = screen.getByRole('button', {
      name: /request an invite/i,
    });
    fireEvent.click(requestButton);

    expect(mockOnRequestInvite).toHaveBeenCalledTimes(1);
  });
});
