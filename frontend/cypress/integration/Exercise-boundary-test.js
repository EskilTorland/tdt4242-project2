describe('My First Test', () => {
    it('Has a title', () => {
      cy.visit('http://localhost:9090/');

      cy.contains("Welcome to SecFit");
    })
  })