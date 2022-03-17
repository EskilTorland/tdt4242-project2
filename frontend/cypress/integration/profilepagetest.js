var baseUrl = "localhost:9090";

describe('Boundary tests for view/edit exercise page', () => {
    before(() => {
        // cy.RegisterDummyUser();
      })

    beforeEach(() => {
        cy.visit(baseUrl+"/index.html");
        })

  it('Check that profile button is not visible when user is not logged in', () => {
    cy.get('#btn-profile').should('not.be.visible');
  })

  it('Login user can go to their profile', () => {
    cy.LoginDummyUser();
    cy.wait(500);
    cy.get('#btn-profile').should('be.visible');
    cy.get('#btn-profile').click();
  })
})