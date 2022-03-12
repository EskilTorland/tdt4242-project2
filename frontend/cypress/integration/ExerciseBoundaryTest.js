//const { beforeEach } = require("mocha");
/* import Chance from 'chance'
const chance = new Chance(); */

var baseUrl = "localhost:9090";

describe('Boundary tests for view/edit exercise page', () => {
  beforeEach(() => {
    loginUser();
    cy.visit(baseUrl+"/exercise.html");
  })

/*     it('Check Required Fields', () => {
    cy.get("#inputName").should("have.attr", "readonly");
  }) */

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

  function registerUser(){
    cy.visit(baseUrl+"/register.html");
    cy.get('input[name="username"]').type("user1");
    cy.get('input[name="email"]').type("user1@test.com");
    cy.get('input[name="password"]').type("password1");
    cy.get('input[name="password1"]').type("password1");
    cy.get('#btn-create-account').click();
    cy.wait(1000);
    cy.get('#btn-logout', { timeout: 10000 }).click()
  }

  function loginUser(){
    cy.visit(baseUrl+"/login.html");
    cy.get('input[name="username"]').type("user1");
    cy.get('input[name="password"]').type("password1");
    cy.get('#btn-login').click()
    cy.wait(1000)
  }
})