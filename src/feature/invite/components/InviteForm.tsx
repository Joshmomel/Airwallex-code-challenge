import React from 'react';
import styled from 'styled-components';
import { INVITE_FORM_FIELDS } from 'src/feature/invite/utils/constants';
import FormInput from 'src/feature/invite/components/FormInput';
import { ErrorMessage } from 'src/feature/invite/components/ErrorMessage';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => `${theme.spacing.lg}`};
  width: 100%;
`;

const SubmitButton = styled.button`
  padding: ${({ theme }) => theme.spacing.unit};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  cursor: pointer;
  border: none;
  background-color: ${({ theme }) => theme.colors.text};
  color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borders.width.base};
  margin-top: ${({ theme }) => theme.spacing.xl};

  &:hover,
  &:focus-visible {
    outline: ${({ theme }) =>
      `${theme.borders.width.base} dotted ${theme.colors.text}`};
    outline-offset: ${({ theme }) => theme.borders.width.base};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    &:hover {
      outline: none;
    }
  }
`;

const Title = styled.h2`
  text-align: center;
  font-size: ${({ theme }) => theme.typography.fontSize.xxl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

interface InviteFormProps {
  errors: Record<string, string>;
  isSubmitting: boolean;
  handleSubmit: (e: React.FormEvent) => void;
}

const InviteForm = React.memo<InviteFormProps>(
  ({ errors, isSubmitting, handleSubmit }) => {
    return (
      <Form onSubmit={handleSubmit} noValidate data-testid="invite-form">
        <Title>Request an invite</Title>
        {errors.server && <ErrorMessage>{errors.server}</ErrorMessage>}

        <FormInput
          type="text"
          name={INVITE_FORM_FIELDS.FULL_NAME}
          error={errors[INVITE_FORM_FIELDS.FULL_NAME]}
        />

        <FormInput
          type="email"
          name={INVITE_FORM_FIELDS.EMAIL}
          error={errors[INVITE_FORM_FIELDS.EMAIL]}
        />

        <FormInput
          type="email"
          name={INVITE_FORM_FIELDS.CONFIRM_EMAIL}
          error={errors[INVITE_FORM_FIELDS.CONFIRM_EMAIL]}
        />

        <SubmitButton
          type="submit"
          disabled={isSubmitting}
          data-testid="submit-invitation-button"
        >
          {isSubmitting ? 'Sending...' : 'Send'}
        </SubmitButton>
      </Form>
    );
  },
);

export default InviteForm;
