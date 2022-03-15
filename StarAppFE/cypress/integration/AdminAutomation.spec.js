import { wait } from "@testing-library/user-event/dist/utils";

describe("Login submit", () => {
  it("should be able to do the all admin task", () => {   
    cy.visit("http://localhost:3000/");

    const username = Cypress.env("username");
    const password = Cypress.env("password");

    expect(username, "usermail was set").to.be.a("string").and.not.be.empty;
    expect(password, "password was set").to.be.a("string").and.not.be.empty;

    cy.get(".mt-2 > .form-control").type(username);
    cy.get(":nth-child(3) > .form-control").type(password);
    cy.get("form > .btn").click();

    //page switch
    cy.wait(500);
    cy.get(":nth-child(3) > .page-link").click();
    cy.wait(1000);

    //add user modal
    cy.get('.my-2 > [type="button"]').click();
    // cy.get(":nth-child(4) > .btn").click();
    cy.wait(500);
    cy.get(".modal-footer > .btn").click();

    //searching employee
    cy.get('input[name="search"]').type("mohit");
    cy.get(".input-group > .btn > .fa-solid").click();

    cy.get('[href="/useradmin"]').click();
    //Clicking role
    cy.get(":nth-child(2) > .form-select").select(1);
    cy.wait(1000);
    cy.get(":nth-child(2) > .form-select").select(2);
    cy.wait(1000);
    cy.get(":nth-child(2) > .form-select").select(3);
    cy.wait(1000);

    cy.get('[href="/useradmin"]').click();
    //Clicking active status

    cy.get(":nth-child(3) > .form-select").select(1);
    cy.wait(1000);
    cy.get(":nth-child(3) > .form-select").select(2);
    cy.wait(1000);
    cy.get(":nth-child(3) > .form-select").select(3);
    cy.wait(1000);

    //Edit user modal
    cy.get('[href="/useradmin"]').click();
    cy.get(':nth-child(6) > .d-flex > .btn-toolbar > .btn-secondary > .fa-solid').click();
    cy.wait(500);
    cy.get('.modal-footer > .btn').click();

    //user profile
    cy.visit("http://localhost:3000/UserProfile");
    cy.get(".container-sm > :nth-child(1) > .col-sm-6 > .form-control").focus();
    cy.get(".container-sm > :nth-child(2) > .col-sm-6 > .form-control").focus();
    cy.get(".mb-5 > .col-sm-8 > .w-100").click();
    cy.wait(3000);
    // cy.get(".swal-button").click();
    cy.get(":nth-child(2) > .accordion-header > .accordion-button").click();

    //go to allwance dashboard
    cy.get('[href="/allowancedashboard"]').click();

    //swtiching page in allowance dashboard
    cy.get(":nth-child(3) > .page-link").click();
    cy.wait(500);
    cy.get(":nth-child(4) > .page-link").click();
    cy.wait(500);

    //search in allowance dashboard
    cy.get('[href="/allowancedashboard"]').click();
    cy.get(".input-group > .form-control").type("Roopali Chopra");
    cy.get(".btn > .fa-solid").click();
    cy.wait(500);

    //filter by project
    cy.get("select").select("AssetMark Backoffice");

    //filter by period
    cy.get('[href="/allowancedashboard"]').click();

    //edit compensation
    cy.get(".my-2 > .btn-secondary").click();
    // cy.get(":nth-child(5) > .btn").click();
    cy.wait(500);
    cy.get(".modal-footer > .btn").click();

    //edit allowance
    cy.get(':nth-child(1) > :nth-child(13) > .mx-1').click();
    // cy.get(':nth-child(7) > .btn').click();
    cy.wait(500);
    cy.get('.modal-footer > .btn').click();
    
    //approv and download
    //cy.get(".btn-success").click();

    //Logout
    cy.get("#viewuserprofile").click();
    cy.get('.dropdown-menu > [role="button"]').contains("Logout").click();
  });
});
