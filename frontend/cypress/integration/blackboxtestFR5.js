var baseUrl = "localhost:9090";

describe('Black box tests for Functional Requirements 5', () =>{

    before(() => {
      // cy.RegisterDummyUser();
    })

    beforeEach(()=>{
      cy.LoginDummyUser();
      cy.visit(baseUrl+"/workouts.html");
    })

    it('Athlete should see workout in "All Workout" list after logging public workout', () => {
        logPublicWorkout();
        cy.url().should('include', "/workouts.html");
        cy.get('h5').contains('Workout test')
    })

    it('Athlete should see workout in "My Workout" list after logging workout', () => {
      cy.get('#list-my-workouts-list').click();
      cy.get('h5').contains('Workout test');
    })

    it('Athlete should see workout in "Public Workout" list after logging public workout', () => {
      cy.get('#list-public-workouts-list').click();
      cy.get('h5').contains('Workout test');
    })

      function logPublicWorkout(){
        cy.get("#btn-create-workout").click();
        cy.get('input[name="name"]').type("Workout test");
        cy.get('input[name="date"]').click().then(input => {
            input[0].dispatchEvent(new Event('input', { bubbles: true }))
            input.val('2022-04-30T13:00')
          }).click()
        cy.get('#inputNotes').type('BlaBlaBla')
        cy.get("#btn-ok-workout").click();
      }
})