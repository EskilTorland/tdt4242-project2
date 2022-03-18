// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

var baseUrl = "localhost:9090";

/**
 * Register a dummy user to the database
 * If dummyuser already added the site will return an error and tests will stop
 */
Cypress.Commands.add('RegisterDummyUser', () => {
    cy.visit(baseUrl+"/register.html");
    cy.get('input[name="username"]').type("user1");
    cy.get('input[name="email"]').type("user1@test.com");
    cy.get('input[name="password"]').type("password1");
    cy.get('input[name="password1"]').type("password1");
    cy.get('[name=phone_number]').type('1234');
    cy.get('[name=country]').type('Norge');
    cy.get('[name=city]').type('Oslo');
    cy.get('[name=street_address]').type('Bjørnlia 4');
    cy.get('#btn-create-account').click();
    cy.wait(1000);
    cy.get('#btn-logout', { timeout: 10000 }).click()
})

/**
 * Login the dummy user
 */
Cypress.Commands.add('LoginDummyUser', () => {
    cy.visit(baseUrl+"/login.html");
    cy.get('input[name="username"]').type("user1");
    cy.get('input[name="password"]').type("password1");
    cy.get('#btn-login').click()
    cy.wait(1000)
})

/**
 * Register a new user to the database
 * @param {*} username to add 
 * @param {*} email to add 
 * @param {*} password to add
 * @param {*} phone to add
 * @param {*} country to add
 * @param {*} city to add
 * @param {*} address to add
 */
Cypress.Commands.add('registerUser', (username, email, password, phone, country, city, address) => {
    cy.get('[name=username]').type(username);
    cy.get('[name=email]').type(email);
    cy.get('[name=password]').type(password);
    cy.get('[name=password1]').type(password);
    cy.get('[name=phone_number]').type(phone);
    cy.get('[name=country]').type(country);
    cy.get('[name=city]').type(city);
    cy.get('[name=street_address]').type(address);
    cy.get('#btn-create-account').click();
})

/**
 * Login the dummy user
 */
 Cypress.Commands.add('loginUser', (username, password) => {
    cy.visit(baseUrl+"/login.html");
    cy.get('input[name="username"]').type(username);
    cy.get('input[name="password"]').type(password);
    cy.get('#btn-login').click()
    cy.wait(1000)
})