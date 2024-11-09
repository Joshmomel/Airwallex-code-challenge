import { FIELD_DISPLAY_NAMES, INVITE_FORM_FIELDS } from 'src/feature/invite/utils/constants';

export interface FormErrors {
  [key: string]: string;
}

interface FormValues {
  [INVITE_FORM_FIELDS.FULL_NAME]: string;
  [INVITE_FORM_FIELDS.EMAIL]: string;
  [INVITE_FORM_FIELDS.CONFIRM_EMAIL]: string;
}

const VALIDATION_RULES = {
  MIN_NAME_LENGTH: 3,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;

const VALIDATION_MESSAGES = {
  required: (fieldName: string) => `${fieldName} is required`,
  minLength: (fieldName: string, length: number) => `${fieldName} must be at least ${length} characters long`,
  invalidEmail: 'Please enter a valid email address',
  emailMismatch: 'Email addresses do not match',
} as const;

export const validateForm = (values: FormValues): FormErrors => {
  const newErrors: FormErrors = {};

  // Validate full name
  const fullName = values[INVITE_FORM_FIELDS.FULL_NAME];
  const fullNameDisplay = FIELD_DISPLAY_NAMES[INVITE_FORM_FIELDS.FULL_NAME];
  if (!fullName) {
    newErrors[INVITE_FORM_FIELDS.FULL_NAME] = VALIDATION_MESSAGES.required(fullNameDisplay);
  } else if (fullName.length < VALIDATION_RULES.MIN_NAME_LENGTH) {
    newErrors[INVITE_FORM_FIELDS.FULL_NAME] = VALIDATION_MESSAGES.minLength(
      fullNameDisplay,
      VALIDATION_RULES.MIN_NAME_LENGTH,
    );
  }

  // Validate email
  const email = values[INVITE_FORM_FIELDS.EMAIL];
  const emailDisplay = FIELD_DISPLAY_NAMES[INVITE_FORM_FIELDS.EMAIL];
  if (!email) {
    newErrors[INVITE_FORM_FIELDS.EMAIL] = VALIDATION_MESSAGES.required(emailDisplay);
  } else if (!VALIDATION_RULES.EMAIL_REGEX.test(email)) {
    newErrors[INVITE_FORM_FIELDS.EMAIL] = VALIDATION_MESSAGES.invalidEmail;
  }

  // Validate confirm email
  const confirmEmail = values[INVITE_FORM_FIELDS.CONFIRM_EMAIL];
  const confirmEmailDisplay = FIELD_DISPLAY_NAMES[INVITE_FORM_FIELDS.CONFIRM_EMAIL];
  if (!confirmEmail) {
    newErrors[INVITE_FORM_FIELDS.CONFIRM_EMAIL] = VALIDATION_MESSAGES.required(confirmEmailDisplay);
  } else if (confirmEmail !== email) {
    newErrors[INVITE_FORM_FIELDS.CONFIRM_EMAIL] = VALIDATION_MESSAGES.emailMismatch;
  }

  return newErrors;
};
