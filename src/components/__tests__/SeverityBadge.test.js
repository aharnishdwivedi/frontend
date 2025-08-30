import React from 'react';
import { render, screen } from '@testing-library/react';
import SeverityBadge from '../SeverityBadge';

describe('SeverityBadge', () => {
  it('renders with correct severity text', () => {
    render(<SeverityBadge severity="High" />);
    expect(screen.getByText('High')).toBeInTheDocument();
  });

  it('applies correct CSS classes for different severities', () => {
    const { rerender } = render(<SeverityBadge severity="Low" />);
    expect(screen.getByText('Low')).toHaveClass('bg-green-100', 'text-green-800');

    rerender(<SeverityBadge severity="Medium" />);
    expect(screen.getByText('Medium')).toHaveClass('bg-yellow-100', 'text-yellow-800');

    rerender(<SeverityBadge severity="High" />);
    expect(screen.getByText('High')).toHaveClass('bg-red-100', 'text-red-800');

    rerender(<SeverityBadge severity="Critical" />);
    expect(screen.getByText('Critical')).toHaveClass('bg-red-900', 'text-white');
  });

  it('capitalizes severity text', () => {
    render(<SeverityBadge severity="low" />);
    expect(screen.getByText('Low')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<SeverityBadge severity="High" className="custom-class" />);
    const badge = screen.getByText('High').closest('span');
    expect(badge).toHaveClass('custom-class');
  });

  it('defaults to low severity for unknown values', () => {
    render(<SeverityBadge severity="Unknown" />);
    expect(screen.getByText('Unknown')).toHaveClass('bg-green-100', 'text-green-800');
  });

  it('renders with icon', () => {
    render(<SeverityBadge severity="High" />);
    const icon = screen.getByText('High').previousElementSibling;
    expect(icon).toBeInTheDocument();
    expect(icon.tagName).toBe('svg');
  });
});
