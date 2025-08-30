describe('Create Incident', () => {
  beforeEach(() => {
    cy.visit('/incidents/new');
  });

  it('should display the create incident form', () => {
    cy.get('h1').should('contain', 'Create New Incident');
    cy.get('form').should('be.visible');
  });

  it('should have all required form fields', () => {
    cy.get('input[name="title"]').should('be.visible');
    cy.get('textarea[name="description"]').should('be.visible');
    cy.get('input[name="affected_service"]').should('be.visible');
  });

  it('should show validation errors for empty fields', () => {
    cy.get('button[type="submit"]').click();
    
    cy.get('p').should('contain', 'Title is required');
    cy.get('p').should('contain', 'Description is required');
    cy.get('p').should('contain', 'Affected service is required');
  });

  it('should show validation error for short title', () => {
    cy.get('input[name="title"]').type('Test');
    cy.get('input[name="title"]').blur();
    
    cy.get('p').should('contain', 'Title must be at least 5 characters');
  });

  it('should show validation error for short description', () => {
    cy.get('textarea[name="description"]').type('Short desc');
    cy.get('textarea[name="description"]').blur();
    
    cy.get('p').should('contain', 'Description must be at least 20 characters');
  });

  it('should clear validation errors when user types', () => {
    cy.get('button[type="submit"]').click();
    cy.get('p').should('contain', 'Title is required');
    
    cy.get('input[name="title"]').type('Valid Title');
    cy.get('p').should('not.contain', 'Title is required');
  });

  it('should show character count for description', () => {
    cy.get('textarea[name="description"]').type('This is a test description');
    cy.get('p').should('contain', '25/1000 characters');
  });

  it('should show AI processing notice', () => {
    cy.get('h3').should('contain', 'AI-Powered Analysis');
    cy.get('li').should('contain', 'Severity classification');
    cy.get('li').should('contain', 'Category identification');
  });

  it('should have cancel button that navigates back', () => {
    cy.get('button').contains('Cancel').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });

  it('should submit form with valid data', () => {
    const incidentData = {
      title: 'Database Connection Timeout',
      description: 'Users unable to login due to database connectivity issues. The database server is not responding to connection requests.',
      affected_service: 'User Authentication Service'
    };

    cy.intercept('POST', '**/incidents', {
      statusCode: 201,
      body: {
        data: {
          id: 1,
          ...incidentData,
          ai_severity: 'High',
          ai_category: 'Database',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      }
    }).as('createIncident');

    cy.get('input[name="title"]').type(incidentData.title);
    cy.get('textarea[name="description"]').type(incidentData.description);
    cy.get('input[name="affected_service"]').type(incidentData.affected_service);
    
    cy.get('button[type="submit"]').click();
    
    cy.wait('@createIncident');
    cy.url().should('include', '/incidents/1');
  });

  it('should show loading state during submission', () => {
    cy.intercept('POST', '**/incidents', {
      delay: 1000,
      statusCode: 201,
      body: { data: { id: 1 } }
    }).as('createIncident');

    cy.get('input[name="title"]').type('Test Incident');
    cy.get('textarea[name="description"]').type('This is a test description for the incident.');
    cy.get('input[name="affected_service"]').type('Test Service');
    
    cy.get('button[type="submit"]').click();
    
    cy.get('button[type="submit"]').should('contain', 'Processing...');
    cy.get('button[type="submit"]').should('be.disabled');
  });
});
