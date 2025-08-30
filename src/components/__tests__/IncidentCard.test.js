import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import IncidentCard from '../IncidentCard';

const mockIncident = {
  id: 1,
  title: 'Database Connection Timeout',
  description: 'Users unable to login due to database connectivity issues. The database server is not responding to connection requests.',
  affected_service: 'User Authentication Service',
  ai_severity: 'High',
  ai_category: 'Database',
  created_at: '2024-01-15T10:30:00Z',
  updated_at: '2024-01-15T10:30:00Z',
};

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('IncidentCard', () => {
  it('renders incident title', () => {
    renderWithRouter(<IncidentCard incident={mockIncident} />);
    expect(screen.getByText('Database Connection Timeout')).toBeInTheDocument();
  });

  it('renders incident description', () => {
    renderWithRouter(<IncidentCard incident={mockIncident} />);
    expect(screen.getByText(/Users unable to login due to database connectivity issues/)).toBeInTheDocument();
  });

  it('renders affected service', () => {
    renderWithRouter(<IncidentCard incident={mockIncident} />);
    expect(screen.getByText('Service: User Authentication Service')).toBeInTheDocument();
  });

  it('renders severity badge', () => {
    renderWithRouter(<IncidentCard incident={mockIncident} />);
    expect(screen.getByText('High')).toBeInTheDocument();
  });

  it('renders category badge', () => {
    renderWithRouter(<IncidentCard incident={mockIncident} />);
    expect(screen.getByText('Database')).toBeInTheDocument();
  });

  it('renders formatted date', () => {
    renderWithRouter(<IncidentCard incident={mockIncident} />);
    // The date should be formatted and displayed
    expect(screen.getByText(/Jan 15, 2024/)).toBeInTheDocument();
  });

  it('renders view details link', () => {
    renderWithRouter(<IncidentCard incident={mockIncident} />);
    const link = screen.getByText('View Details →');
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute('href', '/incidents/1');
  });

  it('truncates long descriptions', () => {
    const longDescriptionIncident = {
      ...mockIncident,
      description: 'A'.repeat(150), // Very long description
    };
    renderWithRouter(<IncidentCard incident={longDescriptionIncident} />);
    const description = screen.getByText(/A{100}\.\.\./);
    expect(description).toBeInTheDocument();
  });

  it('renders arrow icon for navigation', () => {
    renderWithRouter(<IncidentCard incident={mockIncident} />);
    const arrowLink = screen.getByText('View Details →').closest('a');
    expect(arrowLink).toBeInTheDocument();
  });

  it('has correct card styling', () => {
    const { container } = renderWithRouter(<IncidentCard incident={mockIncident} />);
    const card = container.firstChild;
    expect(card).toHaveClass('card', 'hover:shadow-md');
  });
});
