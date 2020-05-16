//arrange - get element
//act - simulate user interaction
//assert - test/verify

describe ("Test Pizza Form Sprint Challenge", () => {
    beforeEach(function () {
        cy.visit("http://localhost:3002/order")
    });

    it("text can be added to boxes", () => {
        cy.get('#name')
        .type("Claudia")
        .should("have.value", "Claudia")

        cy.get('#specialInstr')
        .type("Please put garlic dip on side")
        .should("have.value", "Please put garlic dip on side")
    })

    it("can select multiple toppings", () => {
        cy.get('#garlic')
        .check()
        .should("be.checked")

        cy.get('#mushrooms')
        .check()
        .should("be.checked")

        cy.get('#tomatoes')
        .check()
        .should("be.checked")

        cy.get('#jalapenos')
        .check()
        .should("be.checked")
    })

    it("can be submitted", () => {
        cy.get('#name')
        .type("Claudia")
        cy.get('#size')
        .select("Personal")
        cy.get('#garlic')
        .check()
        cy.get('#mushrooms')
        .check()
        cy.get('#tomatoes')
        .check()
        cy.get('#jalapenos')
        .check()

        cy.get('button').click()
    })
})