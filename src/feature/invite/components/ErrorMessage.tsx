import styled from 'styled-components';

export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.error};
  margin-top: ${({ theme }) => `-${theme.spacing.lg}`};
  font-size: ${({ theme }) => `${theme.typography.fontSize.sm}`};
`;
