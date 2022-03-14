const { describe } = require("mocha");

var baseUrl = "localhost:9090";

describe('Black box tests for Functional Requirements 5', () =>{
    before(()=>{
        registerUser();
    })

    beforeEach(() => {
        loginUser();
        cy.visit(baseUrl+"/workouts.html");
      })

    it('Check negative values for Duration', () => {
    insertValues("Leg Press", "Bla Bla Bla", "Reps", "-30", "50");
    cy.get("#btn-ok-exercise").click();
    cy.url().should("include", "/exercises.html");
    })

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