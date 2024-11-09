import { render, screen } from 'src/test-utils';
import InviteModal from '../index';
import { useInviteForm } from '../hooks/useInviteForm';
import { INVITE_FORM_FIELDS } from '../utils/constants';

jest.mock('../hooks/useInviteForm');

const mockOnClose = jest.fn();

describe('InviteModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the invite form', () => {
    (useInviteForm as jest.Mock).mockReturnValue({
      successMessage: '',
      isSubmitting: false,
      errors: {},
      handleSubmit: jest.fn(),
    });
    render(<InviteModal onClose={mockOnClose} />);

    expect(screen.getByPlaceholderText('Full name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm email')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument();
  });

  it('displays validation errors for empty fields', async () => {
    // Mock specific implementation for this test
    (useInviteForm as jest.Mock).mockReturnValue({
      successMessage: '',
      isSubmitting: false,
      errors: {
        [INVITE_FORM_FIELDS.FULL_NAME]: 'Full name is required',
        [INVITE_FORM_FIELDS.EMAIL]: 'Email is required',
        [INVITE_FORM_FIELDS.CONFIRM_EMAIL]: 'Confirm email is required',
      },
      handleSubmit: jest.fn(),
    });
    render(<InviteModal onClose={mockOnClose} />);

    expect(screen.getByText('Full name is required')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Confirm email is required')).toBeInTheDocument();
  });

  it('displays error when emails do not match', async () => {
    // Mock specific implementation for this test
    (useInviteForm as jest.Mock).mockReturnValue({
      successMessage: '',
      isSubmitting: false,
      errors: {
        [INVITE_FORM_FIELDS.CONFIRM_EMAIL]: 'Email addresses do not match',
      },
      handleSubmit: jest.fn(),
    });
    render(<InviteModal onClose={mockOnClose} />);

    expect(await screen.findByText('Email addresses do not match')).toBeInTheDocument();
  });

  it('submits form successfully', async () => {
    // Initial state without success message
    const mockHandleSubmit = jest.fn();

    const mockUseInviteForm = {
      successMessage: `successMessage: "All done! You'll be the first to experience Broccoli & Co. when we launch.",`,
      isSubmitting: false,
      errors: {},
      handleSubmit: mockHandleSubmit,
    };

    (useInviteForm as jest.Mock).mockReturnValue(mockUseInviteForm);

    render(<InviteModal onClose={mockOnClose} />);

    expect(screen.getByText('All done!')).toBeInTheDocument();
  });
});
