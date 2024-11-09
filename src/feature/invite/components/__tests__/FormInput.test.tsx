import { render, screen } from 'src/test-utils';
import FormInput from '../FormInput';
import { FIELD_DISPLAY_NAMES } from '../../utils/constants';

describe('FormInput', () => {
  const defaultProps = {
    type: 'text' as const,
    name: 'fullName',
  };

  it('renders text input correctly', () => {
    render(<FormInput type="text" name="fullName" />);

    const input = screen.getByPlaceholderText(FIELD_DISPLAY_NAMES.fullName);
    expect(input).toHaveAttribute('type', 'text');
  });

  it('renders email input correctly', () => {
    render(<FormInput type="email" name="email" />);

    const input = screen.getByPlaceholderText(FIELD_DISPLAY_NAMES.email);
    expect(input).toHaveAttribute('type', 'email');
  });

  it('displays error message when error prop is provided', () => {
    const error = 'This field is required';
    render(<FormInput {...defaultProps} error={error} />);

    expect(screen.getByText(error)).toBeInTheDocument();
  });
});
