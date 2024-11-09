import { validateForm } from '../formValidation';
import { INVITE_FORM_FIELDS } from '../constants';

describe('validateForm', () => {
  it('should return errors for empty fields', () => {
    const values = {
      [INVITE_FORM_FIELDS.FULL_NAME]: '',
      [INVITE_FORM_FIELDS.EMAIL]: '',
      [INVITE_FORM_FIELDS.CONFIRM_EMAIL]: '',
    };

    const errors = validateForm(values);

    expect(errors[INVITE_FORM_FIELDS.FULL_NAME]).toContain('is required');
    expect(errors[INVITE_FORM_FIELDS.EMAIL]).toContain('is required');
    expect(errors[INVITE_FORM_FIELDS.CONFIRM_EMAIL]).toContain('is required');
  });

  it('should validate full name length', () => {
    const values = {
      [INVITE_FORM_FIELDS.FULL_NAME]: 'Jo',
      [INVITE_FORM_FIELDS.EMAIL]: 'test@example.com',
      [INVITE_FORM_FIELDS.CONFIRM_EMAIL]: 'test@example.com',
    };

    const errors = validateForm(values);

    expect(errors[INVITE_FORM_FIELDS.FULL_NAME]).toContain(
      'must be at least 3 characters long',
    );
  });

  it('should validate email format', () => {
    const values = {
      [INVITE_FORM_FIELDS.FULL_NAME]: 'Full Name',
      [INVITE_FORM_FIELDS.EMAIL]: 'invalid-email',
      [INVITE_FORM_FIELDS.CONFIRM_EMAIL]: 'invalid-email',
    };

    const errors = validateForm(values);

    expect(errors[INVITE_FORM_FIELDS.EMAIL]).toBe(
      'Please enter a valid email address',
    );
  });

  it('should validate matching emails', () => {
    const values = {
      [INVITE_FORM_FIELDS.FULL_NAME]: 'Josh M',
      [INVITE_FORM_FIELDS.EMAIL]: 'test@example.com',
      [INVITE_FORM_FIELDS.CONFIRM_EMAIL]: 'different@example.com',
    };

    const errors = validateForm(values);

    expect(errors[INVITE_FORM_FIELDS.CONFIRM_EMAIL]).toBe(
      'Email addresses do not match',
    );
  });

  it('should return no errors for valid input', () => {
    const values = {
      [INVITE_FORM_FIELDS.FULL_NAME]: 'John M',
      [INVITE_FORM_FIELDS.EMAIL]: 'test@example.com',
      [INVITE_FORM_FIELDS.CONFIRM_EMAIL]: 'test@example.com',
    };

    const errors = validateForm(values);

    expect(Object.keys(errors)).toHaveLength(0);
  });
});
