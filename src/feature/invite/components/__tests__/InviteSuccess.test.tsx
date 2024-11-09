import { render, screen, fireEvent } from 'src/test-utils';
import InviteSuccess from '../InviteSuccess';

describe('InviteSuccess', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders success message and button', () => {
    render(<InviteSuccess onClose={mockOnClose} />);

    expect(screen.getByText('All done!')).toBeInTheDocument();
    expect(screen.getByText("You're on the exclusive list for early access to Broccoli & Co.")).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'OK' })).toBeInTheDocument();
  });

  it('calls onClose when OK button is clicked', () => {
    render(<InviteSuccess onClose={mockOnClose} />);

    fireEvent.click(screen.getByRole('button', { name: 'OK' }));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
