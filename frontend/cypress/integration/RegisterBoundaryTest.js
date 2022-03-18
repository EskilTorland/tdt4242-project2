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
        cy.registerUser(
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

    it('Check for alert if email is wrong format', ()=>{
        var password = chance.word({length: 10})
        cy.registerUser(
            chance.word({length: 10}),
            "email",
            password,
            chance.phone(),
            chance.country(),
            chance.city(),
            chance.address()
        )
        cy.get('[role=alert]').should('be.visible');
    })


    // Couldnt use the RegisterUser function since cypress.type() cant contain empty string.
    it('Check for alert if password field is empty', ()=>{
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
        cy.registerUser(
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
        cy.registerUser(
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
})