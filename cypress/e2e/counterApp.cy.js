/// <reference types="cypress" />

describe('Tests for counter app', () => {
    it.only('End to end test', () => {
        cy.visit('http://localhost:3001/');

        function upValueOfHeader(numberOfClick) {
            let clickOnIncrementBtn = cy.get('button').eq(0);
            let headerValue = 0;

            while(headerValue < numberOfClick) {
                clickOnIncrementBtn.click();
                headerValue++;
            }
        }

        function downValueOfHeader(numberOfClick) {
            let clickOnDecrementBtn = cy.get('button').eq(2);
            let headerValue = 0;

            while(headerValue < numberOfClick) {
                clickOnDecrementBtn.click();
                headerValue++;
            }
        }

        // Check text of UI
        cy.get('div').then( counterApp => {
            let logs;
            const header = counterApp.find('h1');
            const headerValue = counterApp.find('h2').text();
            const increamentBtn = counterApp.find('button').eq(0);
            const decreamentBtn = counterApp.find('button').eq(2);
            const resetBtn = counterApp.find('button').eq(1);
        
            expect(header.text()).to.equal('CounterApp');
            expect(headerValue).to.equal(' 10 ');
            expect(increamentBtn.text()).to.equal('+1');
            expect(decreamentBtn.text()).to.equal('-1');
            expect(resetBtn.text()).to.equal('Reset');

            //Check ability to increase value of header
            cy.wrap(increamentBtn).click();
            cy.wrap(counterApp).find('h2').should('contain', ' 11 ');

            //Check ability to decrease value of header
            downValueOfHeader(2);
            cy.wrap(counterApp).find('h2').should('contain', ' 9 ');

            //Reset to default value
            cy.wrap(resetBtn).click();
            cy.wrap(counterApp).find('h2').should('contain', ' 10 ');

            // Check ability to increase value of header better then 100
            upValueOfHeader(91);
            cy.wrap(counterApp).find('h2').should('contain', ' 101 ');

            //Reset to default value
            cy.wrap(resetBtn).click();
            cy.wrap(counterApp).find('h2').should('contain', ' 10 ');

            //Check ability to decrease value to negative values
            downValueOfHeader(119);
            cy.wrap(counterApp).find('h2').should('contain', ' -109 ');

            //Reset to default value
            cy.wrap(resetBtn).click();
            cy.wrap(counterApp).find('h2').should('contain', ' 10 ');
            
        })
    })
})