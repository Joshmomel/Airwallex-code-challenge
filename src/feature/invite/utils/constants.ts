export const INVITE_FORM_FIELDS = {
  FULL_NAME: 'fullName',
  EMAIL: 'email',
  CONFIRM_EMAIL: 'confirmEmail',
} as const;

export const FIELD_DISPLAY_NAMES = {
  [INVITE_FORM_FIELDS.FULL_NAME]: 'Full name',
  [INVITE_FORM_FIELDS.EMAIL]: 'Email',
  [INVITE_FORM_FIELDS.CONFIRM_EMAIL]: 'Confirm email',
} as const;
