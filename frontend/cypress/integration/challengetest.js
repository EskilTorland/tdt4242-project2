var baseUrl = "localhost:9090";

describe('Boundary tests for view/edit exercise page', () => {
    before(() => {
        // cy.RegisterDummyUser();
      })

    beforeEach(() => {
        cy.LoginDummyUser();
        cy.wait(500);
        cy.visit(baseUrl+"/index.html");
        })

  it('Check that challenges tab is not visible when user is not logged in', () => {
    cy.get('#btn-logout').click();
    cy.wait(500);
    cy.get('#nav-challenges').should('not.be.visible');
  })

  it('Login user can go to challenges', () => {
    cy.get('#nav-challenges').should('be.visible');
    cy.get('#nav-challenges').click();
  })

  it('Check if challenge 1 is displayed', () => {
    cy.get('#nav-challenges').click();
    cy.get('h2').contains('Challenge 1');
  })
})