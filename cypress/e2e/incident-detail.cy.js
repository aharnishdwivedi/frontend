describe('Incident Detail', () => {
  const mockIncident = {
    id: 1,
    title: 'Database Connection Timeout',
    description: 'Users unable to login due to database connectivity issues. The database server is not responding to connection requests.',
    affected_service: 'User Authentication Service',
    ai_severity: 'High',
    ai_category: 'Database',
    created_at: '2024-01-15T10:30:00Z',
    updated_at: '2024-01-15T10:30:00Z'
  };

  beforeEach(() => {
    cy.intercept('GET', '**/incidents/1', {
      statusCode: 200,
      body: { data: mockIncident }
    }).as('getIncident');
    
    cy.visit('/incidents/1');
    cy.wait('@getIncident');
  });

  it('should display incident details', () => {
    cy.get('h1').should('contain', 'Incident Details');
    cy.get('p').should('contain', 'ID: #1');
  });

  it('should show incident title and description', () => {
    cy.get('h2').should('contain', 'Database Connection Timeout');
    cy.get('p').should('contain', 'Users unable to login due to database connectivity issues');
  });

  it('should display AI analysis section', () => {
    cy.get('h2').should('contain', 'AI Analysis');
    cy.get('span').should('contain', 'High'); // Severity
    cy.get('span').should('contain', 'Database'); // Category
  });

  it('should show incident metadata', () => {
    cy.get('p').should('contain', 'Affected Service');
    cy.get('p').should('contain', 'User Authentication Service');
    cy.get('p').should('contain', 'Created');
  });

  it('should have edit button', () => {
    cy.get('a').contains('Edit').should('be.visible');
  });

  it('should have refresh button', () => {
    cy.get('button').contains('Refresh').should('be.visible');
  });

  it('should have delete button', () => {
    cy.get('button').contains('Delete').should('be.visible');
  });

  it('should navigate back to dashboard', () => {
    cy.get('button').first().click(); // Back button
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });

  it('should show delete confirmation modal', () => {
    cy.get('button').contains('Delete').click();
    
    cy.get('h3').should('contain', 'Delete Incident');
    cy.get('p').should('contain', 'Are you sure you want to delete this incident?');
    
    cy.get('button').contains('Cancel').should('be.visible');
    cy.get('button').contains('Delete').should('be.visible');
  });

  it('should cancel delete operation', () => {
    cy.get('button').contains('Delete').click();
    cy.get('button').contains('Cancel').click();
    
    // Modal should be closed
    cy.get('h3').should('not.contain', 'Delete Incident');
  });

  it('should delete incident successfully', () => {
    cy.intercept('DELETE', '**/incidents/1', {
      statusCode: 204
    }).as('deleteIncident');

    cy.get('button').contains('Delete').click();
    cy.get('button').contains('Delete').last().click();
    
    cy.wait('@deleteIncident');
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });

  it('should show loading state during delete', () => {
    cy.intercept('DELETE', '**/incidents/1', {
      delay: 1000,
      statusCode: 204
    }).as('deleteIncident');

    cy.get('button').contains('Delete').click();
    cy.get('button').contains('Delete').last().click();
    
    cy.get('button').should('contain', 'Deleting...');
    cy.get('button').should('be.disabled');
  });

  it('should handle error when incident not found', () => {
    cy.intercept('GET', '**/incidents/999', {
      statusCode: 404,
      body: { message: 'Incident not found' }
    }).as('getIncidentNotFound');
    
    cy.visit('/incidents/999');
    cy.wait('@getIncidentNotFound');
    
    cy.get('h3').should('contain', 'Error Loading Incident');
    cy.get('button').contains('Try Again').should('be.visible');
  });

  it('should show quick actions', () => {
    cy.get('h3').should('contain', 'Quick Actions');
    cy.get('a').should('contain', 'Create Similar Incident');
    cy.get('button').should('contain', 'Export Details');
  });

  it('should navigate to create similar incident', () => {
    cy.get('a').contains('Create Similar Incident').click();
    cy.url().should('include', '/incidents/new');
  });

  it('should refresh incident data', () => {
    cy.intercept('GET', '**/incidents/1', {
      statusCode: 200,
      body: { 
        data: { 
          ...mockIncident, 
          title: 'Updated Title' 
        } 
      }
    }).as('getUpdatedIncident');

    cy.get('button').contains('Refresh').click();
    cy.wait('@getUpdatedIncident');
    
    cy.get('h2').should('contain', 'Updated Title');
  });
});
