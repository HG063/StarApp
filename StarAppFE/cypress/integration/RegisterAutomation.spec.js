describe("Login submit", () => {
  it("can go to the request access", () => {
    cy.visit("http://localhost:3000/");
    cy.get(".forgot-password > a").click();
  });
  it("should able to fill the form and able to submit", () => {
    cy.visit("http://localhost:3000/RequestAccess");
    cy.get(":nth-child(1) > .form-control").type("cypress");
    cy.get(":nth-child(2) > .form-control").type("cypress@gmail.com");
    cy.get(".form-select").select(1);
    cy.get(":nth-child(4) > .form-control").type("Aqwer1234?");
    cy.get(":nth-child(5) > .form-control").type("Aqwer1234?");
    cy.get("form > .btn").click();

    cy.on("window:alert", (txt) => {
      //Mocha assertions
      expect(txt).to.contains(
        "Your request has been submitted, you can log in once you are approved"
      );
    });
  });
});
