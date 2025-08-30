describe('Dashboard', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the dashboard header', () => {
    cy.get('h1').should('contain', 'Incident Dashboard');
    cy.get('p').should('contain', 'Manage and monitor all incidents');
  });

  it('should show statistics cards', () => {
    cy.get('[data-testid="stats-total"]').should('be.visible');
    cy.get('[data-testid="stats-critical"]').should('be.visible');
    cy.get('[data-testid="stats-high"]').should('be.visible');
    cy.get('[data-testid="stats-medium"]').should('be.visible');
    cy.get('[data-testid="stats-low"]').should('be.visible');
  });

  it('should have search functionality', () => {
    cy.get('input[placeholder="Search incidents..."]').should('be.visible');
  });

  it('should have severity filter', () => {
    cy.get('select').first().should('contain', 'All Severities');
  });

  it('should have category filter', () => {
    cy.get('select').eq(1).should('contain', 'All Categories');
  });

  it('should have refresh button', () => {
    cy.get('button').should('contain', 'Refresh');
  });

  it('should navigate to create incident page', () => {
    cy.get('a').contains('New Incident').click();
    cy.url().should('include', '/incidents/new');
  });

  it('should show empty state when no incidents', () => {
    // This test assumes the API returns empty array
    cy.intercept('GET', '**/incidents', []).as('getIncidents');
    cy.visit('/');
    cy.wait('@getIncidents');
    
    cy.get('h3').should('contain', 'No incidents yet');
    cy.get('a').should('contain', 'Create First Incident');
  });

  it('should filter incidents by search term', () => {
    cy.get('input[placeholder="Search incidents..."]').type('database');
    // Add assertions for filtered results
  });

  it('should clear filters', () => {
    cy.get('input[placeholder="Search incidents..."]').type('test');
    cy.get('button').contains('Clear Filters').click();
    cy.get('input[placeholder="Search incidents..."]').should('have.value', '');
  });
});
