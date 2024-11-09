import { render, screen } from 'src/test-utils';
import InviteForm from '../InviteForm';
import { INVITE_FORM_FIELDS, FIELD_DISPLAY_NAMES } from '../../utils/constants';

describe('InviteForm', () => {
  const mockHandleSubmit = jest.fn();
  const defaultProps = {
    errors: {},
    isSubmitting: false,
    handleSubmit: mockHandleSubmit,
  };

  it('renders all form fields', () => {
    render(<InviteForm {...defaultProps} />);

    expect(screen.getByPlaceholderText(FIELD_DISPLAY_NAMES.fullName)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(FIELD_DISPLAY_NAMES.email)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(FIELD_DISPLAY_NAMES.confirmEmail)).toBeInTheDocument();
  });

  it('displays error messages when present', () => {
    const errors = {
      [INVITE_FORM_FIELDS.FULL_NAME]: 'Name is required',
      [INVITE_FORM_FIELDS.EMAIL]: 'Invalid email',
    };

    render(<InviteForm {...defaultProps} errors={errors} />);

    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });

  it('disables submit button when form is submitting', () => {
    render(<InviteForm {...defaultProps} isSubmitting={true} />);

    const submitButton = screen.getByTestId('submit-invitation-button');
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent('Sending...');
  });
});
