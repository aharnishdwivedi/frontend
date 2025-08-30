import React from 'react';
import { render, screen } from '@testing-library/react';
import CategoryBadge from '../CategoryBadge';

describe('CategoryBadge', () => {
  it('renders with correct category text', () => {
    render(<CategoryBadge category="Network" />);
    expect(screen.getByText('Network')).toBeInTheDocument();
  });

  it('applies correct CSS classes for different categories', () => {
    const { rerender } = render(<CategoryBadge category="Network" />);
    expect(screen.getByText('Network')).toHaveClass('bg-blue-100', 'text-blue-800');

    rerender(<CategoryBadge category="Software" />);
    expect(screen.getByText('Software')).toHaveClass('bg-purple-100', 'text-purple-800');

    rerender(<CategoryBadge category="Hardware" />);
    expect(screen.getByText('Hardware')).toHaveClass('bg-gray-100', 'text-gray-800');

    rerender(<CategoryBadge category="Security" />);
    expect(screen.getByText('Security')).toHaveClass('bg-red-100', 'text-red-800');

    rerender(<CategoryBadge category="Database" />);
    expect(screen.getByText('Database')).toHaveClass('bg-green-100', 'text-green-800');

    rerender(<CategoryBadge category="Application" />);
    expect(screen.getByText('Application')).toHaveClass('bg-indigo-100', 'text-indigo-800');

    rerender(<CategoryBadge category="Infrastructure" />);
    expect(screen.getByText('Infrastructure')).toHaveClass('bg-orange-100', 'text-orange-800');
  });

  it('capitalizes category text', () => {
    render(<CategoryBadge category="network" />);
    expect(screen.getByText('Network')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<CategoryBadge category="Network" className="custom-class" />);
    const badge = screen.getByText('Network').closest('span');
    expect(badge).toHaveClass('custom-class');
  });

  it('defaults to application category for unknown values', () => {
    render(<CategoryBadge category="Unknown" />);
    expect(screen.getByText('Unknown')).toHaveClass('bg-indigo-100', 'text-indigo-800');
  });

  it('renders with icon', () => {
    render(<CategoryBadge category="Network" />);
    const icon = screen.getByText('Network').previousElementSibling;
    expect(icon).toBeInTheDocument();
    expect(icon.tagName).toBe('svg');
  });
});
