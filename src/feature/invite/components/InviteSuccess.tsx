import React from 'react';
import styled from 'styled-components';

const SuccessTitle = styled.h2`
  text-align: center;
  font-size: ${({ theme }) => theme.typography.fontSize.xxl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const SuccessMessage = styled.p`
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  line-height: ${({ theme }) => theme.typography.lineHeight.heading};
  margin: ${({ theme }) => theme.spacing.xl} 0;
  padding: 0 ${({ theme }) => theme.spacing.lg};
`;

const OkButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.unit};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  border: ${({ theme }) => theme.borders.width.base} solid
    ${({ theme }) => theme.colors.text};
  background: transparent;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borders.radius.base};

  &:hover,
  &:focus-visible {
    outline: ${({ theme }) =>
      `${theme.borders.width.base} dotted ${theme.colors.text}`};
    outline-offset: ${({ theme }) => theme.borders.width.base};
  }
`;

interface InviteSuccessProps {
  onClose: () => void;
}

const InviteSuccess = React.memo<InviteSuccessProps>(({ onClose }) => {
  return (
    <>
      <SuccessTitle>All done!</SuccessTitle>
      <SuccessMessage>
        You're on the exclusive list for early access to Broccoli & Co.
      </SuccessMessage>
      <OkButton onClick={onClose}>OK</OkButton>
    </>
  );
});

export default InviteSuccess;
