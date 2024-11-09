import { render, screen, fireEvent } from 'src/test-utils';
import Modal from '../Modal';

describe('Modal', () => {
  const mockHandleDismiss = jest.fn();
  const modalTitle = 'Test Modal';
  const modalContent = 'Modal Content';

  beforeEach(() => {
    mockHandleDismiss.mockClear();
  });

  it('renders modal with correct content and accessibility attributes', () => {
    render(
      <Modal title={modalTitle} handleDismiss={mockHandleDismiss}>
        {modalContent}
      </Modal>,
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-label', modalTitle);
    expect(screen.getByText(modalContent)).toBeInTheDocument();
  });

  it('calls handleDismiss when close button is clicked', () => {
    render(
      <Modal title={modalTitle} handleDismiss={mockHandleDismiss}>
        {modalContent}
      </Modal>,
    );

    fireEvent.click(screen.getByTestId('modal-close-button'));
    expect(mockHandleDismiss).toHaveBeenCalledTimes(1);
  });

  it('calls handleDismiss when Escape key is pressed', () => {
    render(
      <Modal title={modalTitle} handleDismiss={mockHandleDismiss}>
        {modalContent}
      </Modal>,
    );

    fireEvent.keyDown(window, { code: 'Escape' });
    expect(mockHandleDismiss).toHaveBeenCalledTimes(1);
  });

  it('does not call handleDismiss for other key presses', () => {
    render(
      <Modal title={modalTitle} handleDismiss={mockHandleDismiss}>
        {modalContent}
      </Modal>,
    );

    fireEvent.keyDown(window, { code: 'Enter' });
    expect(mockHandleDismiss).not.toHaveBeenCalled();
  });
});
