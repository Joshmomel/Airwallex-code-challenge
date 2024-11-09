import React from 'react';
import styled from 'styled-components';

const Hidden = styled.span`
  display: inline-block;
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
`;

interface VisuallyHiddenProps {
  children: React.ReactNode;
}

const VisuallyHidden = React.memo<VisuallyHiddenProps>(({ children }) => {
  return <Hidden>{children}</Hidden>;
});

export default VisuallyHidden;
