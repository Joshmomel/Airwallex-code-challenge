import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { useInviteForm } from '../useInviteForm';
import { validateForm } from 'src/feature/invite/utils/formValidation';

// Mock the formValidation module
jest.mock('src/feature/invite/utils/formValidation', () => ({
  validateForm: jest.fn(),
}));

describe('useInviteForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes with default values', () => {
    const { result } = renderHook(() => useInviteForm());

    expect(result.current.successMessage).toBe('');
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.errors).toEqual({});
  });

  it('handles form submission error', async () => {
    // Mock validateForm to return empty errors by default
    (validateForm as jest.Mock).mockReturnValue({});

    global.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ errorMessage: 'Server error' }),
      }),
    );

    const { result } = renderHook(() => useInviteForm());
    const mockEvent = {
      preventDefault: jest.fn(),
      target: {
        fullName: { value: 'user name' },
        email: { value: 'test@example.com' },
        confirmEmail: { value: 'test@example.com' },
      },
    };

    await act(async () => {
      await result.current.handleSubmit(mockEvent as any);
    });

    expect(result.current.errors.server).toBe('Server error');
    expect(result.current.isSubmitting).toBe(false);
  });

  it('handles network error', async () => {
    // Mock validateForm to return empty errors by default
    (validateForm as jest.Mock).mockReturnValue({});

    global.fetch = jest
      .fn()
      .mockImplementationOnce(() => Promise.reject('Network error'));

    const { result } = renderHook(() => useInviteForm());
    const mockEvent = {
      preventDefault: jest.fn(),
      target: {
        fullName: { value: 'user name' },
        email: { value: 'test@example.com' },
        confirmEmail: { value: 'test@example.com' },
      },
    };

    await act(async () => {
      await result.current.handleSubmit(mockEvent as any);
    });

    expect(result.current.errors.server).toBe(
      'Something went wrong. Please try again.',
    );
    expect(result.current.isSubmitting).toBe(false);
  });

  it('should show validation errors when form is invalid', async () => {
    const mockErrors = {
      email: 'Please enter a valid email address',
      fullName: 'Full name is required',
    };
    (validateForm as jest.Mock).mockReturnValue(mockErrors);

    const { result } = renderHook(() => useInviteForm());
    const mockEvent = {
      preventDefault: jest.fn(),
      target: {
        fullName: { value: '' },
        email: { value: 'invalid-email' },
        confirmEmail: { value: 'invalid-email' },
      },
    };

    await act(async () => {
      await result.current.handleSubmit(mockEvent as any);
    });

    expect(validateForm).toHaveBeenCalled();
    expect(result.current.errors).toEqual(mockErrors);
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.successMessage).toBe('');
  });

  it('should return success message when form submission is successful', async () => {
    // Mock validateForm to return no errors
    (validateForm as jest.Mock).mockReturnValue({});

    // Mock successful fetch response
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn(),
    });

    const { result } = renderHook(() => useInviteForm());
    const mockEvent = {
      preventDefault: jest.fn(),
      target: {
        fullName: { value: 'user name' },
        email: { value: 'test@example.com' },
        confirmEmail: { value: 'test@example.com' },
      },
    };

    await act(async () => {
      await result.current.handleSubmit(mockEvent as any);
    });

    expect(result.current.successMessage).toBe(
      'Your request has been sent successfully!',
    );
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.errors).toEqual({});
  });
});
