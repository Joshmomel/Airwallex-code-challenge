import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 0;
  border-top: 2px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Footer = React.memo(() => {
  return <StyledFooter>2024 Broccoli & Co. All rights reserved.</StyledFooter>;
});

export default Footer;
