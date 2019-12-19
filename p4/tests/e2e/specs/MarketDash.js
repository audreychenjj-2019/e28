import { not } from "vuelidate/lib/validators";

describe("MarketDash", () => {
    it("Visits the homepage", () => {
        cy.visit("/");
        cy.contains("p", "Top Gainers");
    });

    it("On homepage shows top Indexes, Gainers, Losers, Actives, and News Headlines", () => {
        cy.visit("/");
        cy.contains("p", "Top US Indexes");
        cy.get('[data-test="quote-one-page"]').should("have.length", 18);
        cy.get('[data-test="news-article"]').should("have.length", 20);
        cy.contains("p", "%");
        cy.get('[data-test="router-link-index-or-stock"]')
            .first()
            .click({ force: true });
        cy.contains("h2", "Company profile");
    });

    it("On homepage shows top Indexes", () => {
        cy.visit("/");
        cy.contains("p", "Top US Indexes");
        cy.contains("p", "%");
    });

    it("Visits the Research page and can research a company", () => {
        cy.visit("/research");
        cy.get('[data-test="input-autocomplete"]').should("have.attr", "placeholder", "Company Name/Symbol");
        cy.get('[data-test="input-autocomplete"]')
            .type("amaz")
            .should("have.value", "Amazon.com Inc.");
    });

    it("Research page for named route with prop shows profile, metrics and charts", () => {
        cy.visit("/research/MSFT");
        cy.contains("h2", "Company profile");
        cy.contains("th", "Latest");
        cy.get('[data-test="input-autocomplete"]').should("have.attr", "placeholder", "Company Name/Symbol");
        cy.get('[data-test="button-add-to-profile"]').click();
        cy.get('[data-test="input-shares"]')
            .type("30")
            .should("have.value", "030");
        cy.get('[data-test="input-cost"]')
            .type("100")
            .should("have.value", "0100");
        cy.get('[data-test="button-confirm-add"]').click();
        cy.contains("label", "3000.00");
        cy.contains("div", "MSFT");
    });

    it("Research page can be used to add stock to portfolio", () => {
        cy.visit("/research/MSFT");
        cy.contains("h2", "Company profile");
        cy.contains("div", "Latest");
        cy.get('[data-test="input-autocomplete"]').should("have.attr", "placeholder", "Company Name/Symbol");
        cy.get('[data-test="button-add-to-profile"]').click();
        cy.get('[data-test="input-shares"]')
            .type("30")
            .should("have.value", "030");
        cy.get('[data-test="input-cost"]')
            .type("100")
            .should("have.value", "0100");
        cy.get('[data-test="button-confirm-add"]').click();
        cy.contains("label", "3000.00");
        cy.contains("div", "MSFT");
    });

    it("Portfolio page can be used to add, cancel, delete, edit holdings", () => {
        cy.visit("/portfolio");
        cy.contains("div", "Portfolio Holdings");
        cy.get('[data-test="button-add"]').click();
        cy.get('[data-test="button-cancel"]').click();
        cy.get('[data-test="button-add"]').click();
        cy.get('[data-test="input-autocomplete"]')
            .type("MSFT")
            .should("have.value", "Microsoft Corporation");
        cy.get('[data-test="input-shares"]')
            .type("10")
            .should("have.value", "010");
        cy.get('[data-test="input-cost"]')
            .type("100")
            .should("have.value", "0100");
        cy.get('[data-test="button-confirm-add"]').click();
        cy.contains("label", "1000.00");
        cy.get('[data-test="button-edit"]').click();
        cy.get('[data-test="input-edit-shares"]')
            .type("0")
            .should("have.value", "100");
        cy.get('[data-test="button-edit"]').click();
        cy.contains("div", "MSFT");
        cy.contains("label", "10000.00");
        cy.get('[data-test="button-add"]').click();
        cy.get('[data-test="input-autocomplete"]')
            .type("amaz")
            .should("have.value", "Amazon.com Inc.");
        cy.get('[data-test="input-shares"]')
            .type("20")
            .should("have.value", "020");
        cy.get('[data-test="input-cost"]')
            .type("200")
            .should("have.value", "0200");
        cy.get('[data-test="button-confirm-add"]').click();
        cy.get('[data-test="button-delete"]')
            .first()
            .click();
        cy.contains("label", "4000.00");
        cy.contains("div", "AMZN");
        cy.contains("div", "MSFT").should(not);
        cy.get('[data-test="router-portfolio-to-research"]')
            .first()
            .click();
        cy.contains("td", "Technology > Online Media > Amazon.com Inc.");
        cy.visit("/portfolio");
        cy.contains("div", "AMZN");
    });

    it("Account page allows SignUp & SignIn, and shows Logged In status", () => {
        cy.visit("/portfolio");
        cy.contains("div", "Portfolio Holdings");
        cy.get('[data-test="button-add"]').click();
        cy.get('[data-test="input-autocomplete"]')
            .type("kello")
            .should("have.value", "Kellogg Company");
        cy.get('[data-test="input-shares"]')
            .type("50")
            .should("have.value", "050");
        cy.get('[data-test="input-cost"]')
            .type("100")
            .should("have.value", "0100");
        cy.get('[data-test="button-confirm-add"]').click();
        cy.contains("div", "K");
        cy.contains("label", "5000.00");
        cy.get('[data-test="button-add"]').click();
        cy.get('[data-test="input-autocomplete"]')
            .type("macy'")
            .should("have.value", "Macy's Inc");
        cy.get('[data-test="input-shares"]')
            .type("20")
            .should("have.value", "020");
        cy.get('[data-test="input-cost"]')
            .type("100")
            .should("have.value", "0100");
        cy.get('[data-test="button-confirm-add"]').click();
        cy.contains("div", "M");
        cy.contains("label", "2000.00");
        cy.get('[data-test="button-save-to-account"]').click();
        cy.get('[data-test="input-name-signup"]')
            .type("CyTester")
            .should("have.value", "CyTester");
        cy.get('[data-test="input-email-signup"]')
            .type("cytester@cytesting.com")
            .should("have.value", "cytester@cytesting.com");
        cy.get('[data-test="input-password-signup"]')
            .type("cytests")
            .should("have.value", "cytests");
        cy.get('[data-test="input-password-confirm-signup"]')
            .type("cytests")
            .should("have.value", "cytests");
        cy.get('[data-test="button-signup"]').click();
        cy.contains("div", "You are logged in!");
        cy.contains("body", "K");
        cy.contains("body", "M");
        cy.get('[data-test="button-signout"]').click();
        cy.contains("h3", "SignIn");
        cy.get('[data-test="input-email-signin"]')
            .type("cytester@cytesting.com")
            .should("have.value", "cytester@cytesting.com");
        cy.get('[data-test="input-password-signin"]')
            .type("cytests")
            .should("have.value", "cytests");
        cy.get('[data-test="button-signin"]').click();
        cy.contains("div", "You are logged in!");
        cy.contains("body", "K");
        cy.contains("body", "M");
        cy.get('[data-test="button-delete-account"]').click();
        cy.contains("h3", "SignIn");
        cy.get('[data-test="input-email-signin"]')
            .type("cytester@cytesting.com")
            .should("have.value", "cytester@cytesting.com");
        cy.get('[data-test="input-password-signin"]')
            .type("cytests")
            .should("have.value", "cytests");
        cy.get('[data-test="button-signin"]').click();
        cy.contains("body", "There is no user record corresponding to this identifier. The user may have been deleted.");
    });
});
