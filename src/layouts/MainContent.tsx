import React from 'react';
import styled from 'styled-components';

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-grow: 1;
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.xxl};
`;

const Content = styled.div`
  max-width: 500px;
  padding: ${({ theme }) => theme.spacing.unit};
`;

const Heading = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSize.xxl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: ${({ theme }) => theme.typography.lineHeight.heading};
  text-align: center;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize.huge};
  }
`;

const SubHeading = styled.div`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  line-height: ${({ theme }) => theme.typography.lineHeight.base};
  margin: ${({ theme }) => theme.spacing.unit} 0;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
  }
`;

const RequestButton = styled.button`
  border: 2px solid ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.black};
  background-color: ${({ theme }) => theme.colors.background};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  padding: ${({ theme }) => theme.spacing.unit}
    ${({ theme }) => theme.spacing.xl};
  transition: background-color 0.3s;

  &:focus {
    outline: 2px dotted ${({ theme }) => theme.colors.black};
    outline-offset: 2px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.background};
  }
`;

interface MainContentProps {
  onRequestInvite: () => void;
}

const MainContent = React.memo<MainContentProps>(({ onRequestInvite }) => {
  return (
    <ContentWrapper>
      <Content>
        <Heading>A better way to enjoy every day.</Heading>
        <SubHeading>Join our waitlist for early access.</SubHeading>
        <RequestButton onClick={onRequestInvite}>
          Request an Invite
        </RequestButton>
      </Content>
    </ContentWrapper>
  );
});

export default MainContent;
