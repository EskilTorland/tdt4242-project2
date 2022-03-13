/// <reference types="cypress"/>
import Chance from "chance";
const chance = new Chance();

var baseUrl = "localhost:9090";

describe('Boundary tests for register page', ()=>{
    beforeEach(()=> {
        cy.visit(baseUrl+'/register.html')
    })
    it('Check for alert if username over 150 characters', ()=>{
        var password = chance.word({length: 10})
        registerUser(
            chance.word({length: 160}),
            chance.email(),
            password,
            chance.phone(),
            chance.country(),
            chance.city(),
            chance.address()
        )
        cy.get('[role=alert]').should('be.visible');
    })

    // Couldnt use the RegisterUser function since cypress.type() cant contain empty string.
    it('Alert should be visible if no password is set', ()=>{
        cy.get('[name=username]').type(chance.word({length: 10}));
        cy.get('[name=email]').type(chance.email());
        cy.get('[name=phone_number]').type(chance.phone());
        cy.get('[name=country]').type(chance.country());
        cy.get('[name=city]').type(chance.city());
        cy.get('[name=street_address]').type(chance.address());
        cy.get('#btn-create-account').click();
        cy.get('[role=alert]').should('be.visible');
    })

    it('Check for alert if username already in database', ()=>{
        // set random username to test.
        var username = chance.word({length: 8})
        var password = chance.word({length: 10})
        // Add first user with username 
        registerUser(
            username,
            chance.email(),
            password,
            chance.phone(),
            chance.country(),
            chance.city(),
            chance.address()
        )
        cy.wait(1000)
        
        cy.visit(baseUrl+'/register.html');
    
        // Add second user with username 
        registerUser(
            username,
            chance.email(),
            password,
            chance.phone(),
            chance.country(),
            chance.city(),
            chance.address()
        )
        cy.get('[role=alert]').should('be.visible');
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
    function registerUser(username, email, password, phone, country, city, address){
        cy.get('[name=username]').type(username);
        cy.get('[name=email]').type(email);
        cy.get('[name=password]').type(password);
        cy.get('[name=password1]').type(password);
        cy.get('[name=phone_number]').type(phone);
        cy.get('[name=country]').type(country);
        cy.get('[name=city]').type(city);
        cy.get('[name=street_address]').type(address);
        cy.get('#btn-create-account').click();
    }
})