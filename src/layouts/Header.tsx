import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  height: 0;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.xl};
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
`;

const HeaderLogo = styled.a`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  text-align: center;
  text-decoration: none;
`;

const Header = React.memo(() => {
  return (
    <StyledHeader>
      <HeaderLogo href="/">Broccoli &amp; Co.</HeaderLogo>
    </StyledHeader>
  );
});

export default Header;
