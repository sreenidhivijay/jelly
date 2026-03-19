describe("Brand Flows", () => {
  beforeEach(() => {
    cy.loginAs("brand");

    cy.interceptApi("GET", "/auth/me", {
      statusCode: 200,
      body: { id: 1, email: "brand@test.com", role: "brand", company_name: "Acme Corp" },
    }, "fetchMe");

    cy.interceptApi("GET", "/brands/me/profile", {
      statusCode: 200,
      body: {
        id: 1,
        company_name: "Acme Corp",
        website: "https://acme.co",
        profile_image_url: null,
      },
    }, "getBrandProfile");
  });

  describe("Profile", () => {
    it("should load brand profile page", () => {
      cy.visit("/brand-profile");
      cy.wait("@getBrandProfile");
      cy.contains(/brand|profile|acme/i).should("exist");
    });

    it("should update brand profile", () => {
      cy.interceptApi("PATCH", "/brands/me/profile", {
        statusCode: 200,
        body: {
          id: 1,
          company_name: "Acme Corp Updated",
          website: "https://acme.co",
        },
      }, "updateBrandProfile");

      cy.visit("/brand-profile");
      cy.wait("@getBrandProfile");

      cy.get("body").then(($body) => {
        const nameField = $body.find(
          'input[name="company_name"], input[name="name"], [data-testid="company-name"]'
        );
        if (nameField.length) {
          cy.wrap(nameField.first()).clear().type("Acme Corp Updated");
          cy.get('button:contains("Save"), button:contains("Update"), button[type="submit"]')
            .first()
            .click();
          cy.wait("@updateBrandProfile");
        }
      });
    });

    it("should upload brand profile photo", () => {
      cy.interceptApi("POST", "/uploads/profile-image", {
        statusCode: 200,
        body: {
          presigned_url: "https://r2.example.com/upload-brand",
          object_key: "uploads/brand-logo.png",
        },
      }, "getPresignedUrl");

      cy.intercept("PUT", "https://r2.example.com/upload-brand", {
        statusCode: 200,
      }).as("uploadToR2");

      cy.interceptApi("PUT", "/brands/me/profile-image", {
        statusCode: 200,
        body: { profile_image_url: "https://cdn.example.com/brand-logo.png" },
      }, "updateBrandImage");

      cy.visit("/brand-profile");
      cy.wait("@getBrandProfile");

      cy.get("body").then(($body) => {
        const fileInput = $body.find('input[type="file"]');
        if (fileInput.length) {
          cy.wrap(fileInput.first()).selectFile(
            {
              contents: Cypress.Buffer.from("fake-logo"),
              fileName: "logo.png",
              mimeType: "image/png",
            },
            { force: true }
          );
        }
      });
    });
  });
});
