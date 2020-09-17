// write tests here
describe('Users app', () => {
    // here are the tests
    beforeEach(() => {
      //arbitrary code to run before each test
      cy.visit('http://localhost:3000');
    })
  
  
    // here are the tests
  
    it('Load page', () => {

    })
  
    it('Check for inputs', () => {
        cy.get('input[name="name"]').should('exist')
        cy.get('input[name="email"]').should('exist')
        cy.get('input[name="password"]').should('exist')
        cy.get('input[name="terms"]').should('exist')
    });
    it('Test Name Input', () => {
      const nameInput = cy.get('input[name="name"]')
      nameInput.should('have.value', '')
      nameInput.type('Clayton Loneman')
      nameInput.should('have.value', 'Clayton Loneman')
    });
    it('Test Email Input', () => {
      const emailInput = cy.get('input[name="email"]')
      emailInput.should('have.value', '')
      emailInput.type('ClaytonLoneman@gmail.com')
      emailInput.should('have.value', 'ClaytonLoneman@gmail.com')
    });
    it('Test Password Input', () => {
        const password = cy.get('input[name="password"]')
        password.should('have.value', '')
        password.type('asdfasdf')
        password.should('have.value', 'asdfasdf') 
    });
    it('Test Checkbox', () => {
        const checkbox = cy.get('input[name="terms"]')
        checkbox.check()
        checkbox.should('be.checked')
        checkbox.uncheck()
        checkbox.should('not.be.checked')
    });
    it('Test form submission', () => {
        cy.get('input[name="name"]').type('Clayton Loneman')
        cy.get('input[name="email"]').type('ClaytonLoneman@gmail.com')
        cy.get('input[name="password"]').type('asdfasdf')
        cy.get('input[name="terms"]').check()
        cy.get('#submitBtn').not('[disabled]').click()
    });
    it('Test form with error', () => {
        cy.get('input[name="name"]').type('Clayton Loneman')
        cy.get('input[name="email"]').type('ClaytonLoneman')
        cy.get('input[name="password"]').type('asdfasdf')
        cy.get('input[name="terms"]').check()
        cy.get('#submitBtn').should('be.disabled')
    });
  })