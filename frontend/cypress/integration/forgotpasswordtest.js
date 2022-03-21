var baseUrl = "https://tdt4242-g01-frontend.herokuapp.com/";

describe('Integration tests for forgot password page', () => {
    beforeEach(() => {
        cy.visit(baseUrl+"/forgotpassword.html");
        })

  it('Check that forgot password button is visible', () => {
    cy.get('#btn-forgot').should('be.visible');
  })

  it('Check that header text is right', () => {
    cy.get('h2').contains('Forgot Password?');
  })

  it('Check that email field is visible', () => {
    cy.get('[name=email]').should('be.visible');
  })
})