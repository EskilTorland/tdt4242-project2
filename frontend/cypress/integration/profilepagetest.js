var baseUrl = "localhost:9090";

describe('Boundary tests for view/edit exercise page', () => {
    beforeEach(() => {
        //cy.RegisterDummyUser();
        cy.LoginDummyUser();
        cy.visit(baseUrl+"/index.html");
        })

  it('Check that profile button is not visible when user is not logged in', () => {
    cy.get('#btn-logout').click();
    cy.wait(500);
    cy.get('#btn-profile').should('not.exist');
  })

  it('Login user and check that information is displayed', () => {
    cy.get('#btn-profile').should('be.visible');
    cy.get('#btn-profile').click();
    cy.url().contains('/profile.html');

    cy.get('#form-phone').contains('1234')
    cy.get('#form-country').contains('Norge')
    cy.get('#form-city').contains('Oslo')
    cy.get('#form-address').contains('Bjørnlia 4')
  })
})