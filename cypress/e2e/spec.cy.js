describe('empty spec', () => {
  beforeEach(() => {
    cy.intercept('GET', 'urlhere')
      .as('getData')

    cy.visit('http://localhost:3000/')
  })

  it('should show the page title and exising shortened urls', () => {
    cy.get('header')
      .should('be.visible')

    cy.get('h1')
      .contains('URL Shortener')
    
    cy.get('.url')
      .should('be.visible')
  })

  it('should display input fields for a title and url to shorten', () => {
    cy.get('form')
      .children().should('have.length', 3)

    cy.get('form > input')
      .should('be.visible')
    
    cy.get('form')
      .get('input[name="title"]')

    cy.get('form')
      .get('input[name="urlToShorten"]')

  })


  it('should be able to fill out the form and the information is reflected in the input fields', () => {

    cy.get('input[name="title"]')
      .type('NEW TITLE')

    cy.get('input[name="title"]')
      .should('have.value', 'NEW TITLE')

    cy.get('input[name="urlToShorten"]')
      .type('LONG URL HERE')

    cy.get('input[name="urlToShorten"]')
      .should('have.value', 'LONG URL HERE')

  })
})