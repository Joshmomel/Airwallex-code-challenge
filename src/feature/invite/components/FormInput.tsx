import React from 'react';
import styled from 'styled-components';
import { FIELD_DISPLAY_NAMES } from 'src/feature/invite/utils/constants';
import { ErrorMessage } from 'src/feature/invite/components/ErrorMessage';

const StyledInput = styled.input<{ $hasError: boolean }>`
  padding: ${({ theme }) => `${theme.spacing.unit} ${theme.spacing.xl}`};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  border: ${({ theme, $hasError }) =>
    `${theme.borders.width.base} solid ${$hasError ? theme.colors.error : theme.colors.border}`};
  border-radius: ${({ theme }) => theme.borders.radius.base};

  &:focus {
    outline: ${({ theme }) => `${theme.borders.width.base} dotted ${theme.colors.text}`};
    outline-offset: ${({ theme }) => theme.borders.width.base};
    border-color: ${({ theme, $hasError }) => ($hasError ? theme.colors.error : theme.colors.text)};
  }
`;

interface FormInputProps {
  type: 'text' | 'email';
  name: string;
  error?: string;
}

const FormInput = React.memo<FormInputProps>(({ type, name, error }) => {
  return (
    <>
      <StyledInput
        type={type}
        name={name}
        placeholder={FIELD_DISPLAY_NAMES[name as keyof typeof FIELD_DISPLAY_NAMES]}
        $hasError={Boolean(error)}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </>
  );
});

FormInput.displayName = 'FormInput';

export default FormInput;
