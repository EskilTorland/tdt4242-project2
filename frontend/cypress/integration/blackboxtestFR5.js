var baseUrl = "localhost:9090";

describe('Black box tests for Functional Requirements 5', () =>{
  before(() => {
    //cy.RegisterDummyUser();
  })

  beforeEach(()=>{
    cy.LoginDummyUser();
    cy.visit(baseUrl+"/workouts.html");
  })

  it('Athlete should see workout in "All Workout" list after logging public workout', () => {
      logWorkout("Public Workout", true);
      cy.url().should('include', "/workouts.html");
      cy.get('h5').contains('Public Workout')
  })

  it('Athlete should see workout in "My Workout" list after logging workout', () => {
    cy.get('#list-my-workouts-list').click();
    cy.get('h5').contains('Public Workout');
  })

  it('Athlete should see workout in "Public Workout" list after logging public workout', () => {
    cy.get('#list-public-workouts-list').click();
    cy.get('h5').contains('Public Workout');
  })

  it('Athlete should see details of workout they have permission to', () => {
    cy.get('#list-public-workouts-list').click();
    cy.get('h5').contains('Public Workout').parent().click();
    cy.get('#inputName').should('be.visible');
    cy.get('#inputNotes').should('be.visible');
    cy.get('#customFile').should('be.visible');
  })

  it('Athlete 2 should not see Athlete 1 private workout', () => {
    logWorkout("Private Workout", false);
    cy.wait(500);
    cy.get('#btn-logout').click();
    cy.wait(500);
    cy.visit(baseUrl+"/register.html");
    //cy.registerUser("athlete2", "athlete2@gmail.com", "password", "123", "country", "city", "address");
    cy.loginUser("athlete2", "password");
    cy.get("#nav-workouts").click();
    cy.get('h5').contains('Private Workout').should('not.exist');
    cy.get('#list-public-workouts-list').click();
    cy.get('h5').contains('Private Workout').should('not.exist'); 
  })

  it('Athlete 2 should see Athelete 1 public workout in "Public Workout" list', () => {
    cy.get('#list-public-workouts-list').click();
    cy.get('h5').contains('Public Workout');
  })

  /**
   * 
   */
  function logWorkout(workoutname, publicbool){
    cy.get("#btn-create-workout").click();
    cy.get('input[name="name"]').type(workoutname);
    if(publicbool){
      cy.get("#inputVisibility").select("Public");
    }else{
      cy.get("#inputVisibility").select("Private")
    }
    cy.get('input[name="date"]').click().then(input => {
        input[0].dispatchEvent(new Event('input', { bubbles: true }))
        input.val('2022-04-30T13:00')
      }).click()
    cy.get('#inputNotes').type('BlaBlaBla')
    cy.get("#btn-ok-workout").click();
  }
})