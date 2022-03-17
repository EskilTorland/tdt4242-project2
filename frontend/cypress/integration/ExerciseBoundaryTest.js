//const { beforeEach } = require("mocha");
/* import Chance from 'chance'
const chance = new Chance(); */

var baseUrl = "localhost:9090";

describe('Boundary tests for view/edit exercise page', () => {

  before(() => {
    // cy.RegisterDummyUser();
  })

  beforeEach(() => {
    cy.LoginDummyUser();
    cy.visit(baseUrl+"/exercise.html");
  })

  it('Check negative values for Duration', () => {
    insertValues("Leg Press", "Bla Bla Bla", "Reps", "-30", "50");
    cy.get("#btn-ok-exercise").click();
    cy.url().should("include", "/exercises.html");
  })

  it('Check negative values for Calories Burned', () => {
    insertValues("Leg Press", "Bla Bla Bla", "Reps", "30", "-50");
    cy.get("#btn-ok-exercise").click();
    cy.url().should("include", "/exercises.html");
  })

  function insertValues(name, description, unit, duration, calories) {
    cy.get('#inputName').type(name);
    cy.get('#inputDescription').type(description);
    cy.get('#inputUnit').type(unit);
    cy.get('#inputDuration').type(duration);
    cy.get('#inputCalories').type(calories);
  }
})