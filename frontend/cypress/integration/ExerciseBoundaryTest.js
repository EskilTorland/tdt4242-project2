//const { beforeEach } = require("mocha");
/* import Chance from 'chance'
const chance = new Chance(); */

var baseUrl = "localhost:9090";

describe('Boundary tests for view/edit exercise page', () => {

  before(() => {
    cy.RegisterDummyUser();
  })

  beforeEach(() => {
    cy.LoginDummyUser();
    cy.visit(baseUrl+"/exercise.html");
  })

  it('Check for alert if negative values for Duration', () => {
    insertValues("Leg Press", "Bla Bla Bla", "Reps", "-30", "50");
    cy.get("#btn-ok-exercise").click();
    cy.get('[role=alert]').should('be.visible');
  })

  it('Check for alert if negative values for Calories Burned', () => {
    insertValues("Leg Press", "Bla Bla Bla", "Reps", "30", "-50");
    cy.get("#btn-ok-exercise").click();
    cy.get('[role=alert]').should('be.visible');
  })

  it('Check for alert when name is empty', () => {
    insertValues(null, "Bla Bla Bla", "Reps", "30", "30");
    cy.get("#btn-ok-exercise").click();
    cy.get('[role=alert]').should('be.visible');
  })

  it('Check for alert when description is empty', () => {
    insertValues("Workout 1", null, "Reps", "30", "50");
    cy.get("#btn-ok-exercise").click();
    cy.get('[role=alert]').should('be.visible');
  })

  it('Check for alert when unit is empty', () => {
    insertValues("Workout 1", "bla bla", null, "30", "50");
    cy.get("#btn-ok-exercise").click();
    cy.get('[role=alert]').should('be.visible');
  })

  it('Check for alert when duration is empty', () => {
    insertValues("Workout 1", "bla bla", "Reps", null, "50");
    cy.get("#btn-ok-exercise").click();
    cy.get('[role=alert]').should('be.visible');
  })

  it('Check for alert when calories is empty', () => {
    insertValues("Workout 1", "bla bla", "Reps", "30", null);
    cy.get("#btn-ok-exercise").click();
    cy.get('[role=alert]').should('be.visible');
  })

  function insertValues(name, description, unit, duration, calories) {
    if(name != null){
      cy.get('#inputName').type(name);
    }
    if(description != null){
      cy.get('#inputDescription').type(description);
    }
    if(unit != null){
      cy.get('#inputUnit').type(unit);
    }
    if(duration != null){
      cy.get('#inputDuration').type(duration);
    }
    if(calories != null){
      cy.get('#inputCalories').type(calories);
    }
  }
})