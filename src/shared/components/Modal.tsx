import React, { useEffect } from 'react';
import { X as Close } from 'react-feather';
import FocusLock from 'react-focus-lock';
import { RemoveScroll } from 'react-remove-scroll';
import styled from 'styled-components';
import VisuallyHidden from 'src/shared/components/VisuallyHidden';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.5);
`;

const Dialog = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.background};
  padding: calc(${({ theme }) => theme.spacing.unit} * 2);
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  z-index: 1001;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: ${({ theme }) => theme.typography.fontFamily};
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.unit};
  right: ${({ theme }) => theme.spacing.unit};
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};

  &:focus,
  &:hover {
    outline: ${({ theme }) =>
      `${theme.borders.width.base} dotted ${theme.colors.text}`};
    outline-offset: ${({ theme }) => theme.borders.width.base};
  }
`;

interface ModalProps {
  title: string;
  handleDismiss: () => void;
  children: React.ReactNode;
}

// React Modal component that follows WAI-ARIA guidelines for accessible modals/dialogs
// Refernce https://codesandbox.io/p/sandbox/v3lz5l?file=%2FModal.js
const Modal = React.memo<ModalProps>(({ title, handleDismiss, children }) => {
  const handleKeyDown = React.useCallback(
    (event: KeyboardEvent) => {
      if (event.code === 'Escape') {
        handleDismiss();
      }
    },
    [handleDismiss],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <FocusLock returnFocus={true}>
      <RemoveScroll>
        <Wrapper>
          <Dialog role="dialog" aria-modal="true" aria-label={title}>
            <CloseButton
              onClick={handleDismiss}
              data-testid="modal-close-button"
            >
              <Close />
              <VisuallyHidden>Dismiss modal</VisuallyHidden>
            </CloseButton>
            {children}
          </Dialog>
        </Wrapper>
      </RemoveScroll>
    </FocusLock>
  );
});

export default Modal;
