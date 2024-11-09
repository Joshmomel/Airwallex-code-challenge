import { render, screen } from 'src/test-utils';
import VisuallyHidden from '../VisuallyHidden';

describe('VisuallyHidden', () => {
  it('is hidden visually but accessible to screen readers', () => {
    const content = 'Hidden content';
    render(<VisuallyHidden>{content}</VisuallyHidden>);

    // Should be accessible to screen readers
    expect(screen.getByText(content)).toBeInTheDocument();

    // Should be visually hidden
    const element = screen.getByText(content);
    const boundingRect = element.getBoundingClientRect();
    expect(boundingRect.width).toBeLessThanOrEqual(1);
    expect(boundingRect.height).toBeLessThanOrEqual(1);
  });
});
