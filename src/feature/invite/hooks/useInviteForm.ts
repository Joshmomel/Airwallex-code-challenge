import { useState, useCallback } from 'react';
import {
  FormErrors,
  validateForm,
} from 'src/feature/invite/utils/formValidation';
import { INVITE_FORM_FIELDS } from 'src/feature/invite/utils/constants';
import { INVITATION_REQUEST_URL } from 'src/shared/utils/urls';

interface UseInviteFormReturn {
  successMessage: string;
  isSubmitting: boolean;
  errors: FormErrors;
  handleSubmit: (event: React.FormEvent) => Promise<void>;
}

export const useInviteForm = (): UseInviteFormReturn => {
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const form = event.target as HTMLFormElement;
    const formValues = {
      [INVITE_FORM_FIELDS.FULL_NAME]: form[INVITE_FORM_FIELDS.FULL_NAME].value,
      [INVITE_FORM_FIELDS.EMAIL]: form[INVITE_FORM_FIELDS.EMAIL].value,
      [INVITE_FORM_FIELDS.CONFIRM_EMAIL]:
        form[INVITE_FORM_FIELDS.CONFIRM_EMAIL].value,
    };

    const newErrors = validateForm(formValues);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(INVITATION_REQUEST_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form[INVITE_FORM_FIELDS.FULL_NAME].value,
          email: form[INVITE_FORM_FIELDS.EMAIL].value,
        }),
      });

      if (response.ok) {
        setSuccessMessage('Your request has been sent successfully!');
      } else {
        const errorData = await response.json();
        setErrors({
          server:
            errorData.errorMessage || 'Something went wrong. Please try again.',
        });
      }
    } catch (error) {
      setErrors({
        server: 'Something went wrong. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return {
    successMessage,
    isSubmitting,
    errors,
    handleSubmit,
  };
};
