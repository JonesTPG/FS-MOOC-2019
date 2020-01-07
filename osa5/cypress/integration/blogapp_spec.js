describe("BlogApp ", function() {
  beforeEach(function() {
    // reset the database
    cy.request("POST", "http://localhost:3003/api/testing/reset");

    const user = {
      username: "joonas",
      password: "joonas"
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });
  it("login page can be opened", function() {
    cy.contains("BLOGLIST APPLICATION");
  });

  describe("when logged in", function() {
    beforeEach(function() {
      cy.contains("login to the application");
      cy.get("[data-cy=username]").type("joonas");
      cy.get("[data-cy=password]").type("joonas");
      cy.get("[data-cy=login]").click();
    });

    it("name of the user is shown", function() {
      cy.contains("joonas has logged in");
    });

    it("create blog page is rendered correctly", function() {
      cy.get("[data-cy=new-blog]").click();
      cy.contains("create new");
      cy.contains("title:");
      cy.contains("author");
    });

    it("new blog can be created", function() {
      cy.get("[data-cy=new-blog]").click();
      cy.get("[data-cy=blog-title]").type("new blog");
      cy.get("[data-cy=blog-author]").type("joonas");
      cy.get("[data-cy=blog-url]").type("www.kooditaiturit.fi");
      cy.get("[data-cy=post-blog]").click();
      cy.contains("new blog joonas");
    });

    it("log out is succesfull", function() {
      cy.get("[data-cy=log-out]").click();
      cy.contains("login to the application");
    });
  });
});
