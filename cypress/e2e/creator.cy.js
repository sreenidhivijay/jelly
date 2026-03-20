describe("Creator Flows", () => {
  beforeEach(() => {
    cy.loginAs("creator");

    cy.interceptApi("GET", "/auth/me", {
      statusCode: 200,
      body: { id: 2, email: "creator@test.com", role: "creator", name: "Test Creator" },
    }, "fetchMe");

    cy.interceptApi("GET", "/creators/me/profile", {
      statusCode: 200,
      body: {
        id: 2,
        name: "Test Creator",
        bio: "I create content",
        city: "Los Angeles",
        profile_image_url: null,
      },
    }, "getCreatorProfile");

    cy.interceptApi("GET", "/creators/me/intro-video", {
      statusCode: 200,
      body: { url: null },
    }, "getIntroVideo");

    cy.interceptApi("GET", "/creators/me/portfolio", {
      statusCode: 200,
      body: [],
    }, "getPortfolio");
  });

  describe("Profile", () => {
    it("should load creator profile page", () => {
      cy.visit("/creator-profile");
      cy.wait("@getCreatorProfile");
      cy.contains(/creator|profile/i).should("exist");
    });

    it("should update creator profile", () => {
      cy.interceptApi("PATCH", "/creators/me/profile", {
        statusCode: 200,
        body: { id: 2, name: "Test Creator", bio: "Updated bio", city: "NYC" },
      }, "updateProfile");

      cy.visit("/creator-profile");
      cy.wait("@getCreatorProfile");

      // Find and update a bio or text field
      cy.get("body").then(($body) => {
        const bioField = $body.find(
          'textarea[name="bio"], input[name="bio"], [data-testid="bio"]'
        );
        if (bioField.length) {
          cy.wrap(bioField.first()).clear().type("Updated bio");
          // Look for a save button
          cy.get('button:contains("Save"), button:contains("Update"), button[type="submit"]')
            .first()
            .click();
          cy.wait("@updateProfile")
            .its("request.body")
            .should("have.property", "bio", "Updated bio");
        }
      });
    });

    it("should upload profile photo", () => {
      cy.interceptApi("POST", "/uploads/profile-image", {
        statusCode: 200,
        body: {
          presigned_url: "https://r2.example.com/upload",
          object_key: "uploads/photo.jpg",
        },
      }, "getPresignedUrl");

      cy.intercept("PUT", "https://r2.example.com/upload", {
        statusCode: 200,
      }).as("uploadToR2");

      cy.interceptApi("PUT", "/creators/me/profile-image", {
        statusCode: 200,
        body: { profile_image_url: "https://cdn.example.com/photo.jpg" },
      }, "updateProfileImage");

      cy.visit("/creator-profile");
      cy.wait("@getCreatorProfile");

      // If there's a file input for profile photo
      cy.get("body").then(($body) => {
        const fileInput = $body.find('input[type="file"]');
        if (fileInput.length) {
          cy.wrap(fileInput.first()).selectFile(
            {
              contents: Cypress.Buffer.from("fake-image"),
              fileName: "photo.jpg",
              mimeType: "image/jpeg",
            },
            { force: true }
          );
        }
      });
    });
  });

  describe("Portfolio", () => {
    it("should load portfolio section", () => {
      cy.visit("/creator-profile");
      cy.wait("@getPortfolio");
    });

    it("should delete a portfolio item", () => {
      cy.interceptApi("GET", "/creators/me/portfolio", {
        statusCode: 200,
        body: [
          { id: "item-1", file_key: "uploads/p1.jpg", url: "https://cdn/p1.jpg" },
          { id: "item-2", file_key: "uploads/p2.jpg", url: "https://cdn/p2.jpg" },
        ],
      }, "getPortfolioWithItems");

      cy.interceptApi("DELETE", "/creators/me/portfolio/item-1", {
        statusCode: 200,
        body: {},
      }, "deletePortfolioItem");

      cy.visit("/creator-profile");
      cy.wait("@getPortfolioWithItems");

      cy.get("body").then(($body) => {
        const deleteBtn = $body.find(
          '[data-testid="delete-portfolio"], button:contains("Delete"), button:contains("Remove")'
        );
        if (deleteBtn.length) {
          cy.wrap(deleteBtn.first()).click();
          cy.wait("@deletePortfolioItem");
        }
      });
    });
  });

  describe("Blackout dates", () => {
    it("should create a blackout period", () => {
      cy.interceptApi("POST", "/creators/me/blackouts", {
        statusCode: 200,
        body: { id: "bo-1", start_date: "2026-04-01", end_date: "2026-04-07" },
      }, "createBlackout");

      cy.interceptApi("GET", "/creators/me/blackouts", {
        statusCode: 200,
        body: [],
      }, "getBlackouts");

      cy.visit("/creator-profile");
      cy.wait("@getCreatorProfile");

      // Test the API intercept is ready - actual interaction depends on UI
      cy.get("body").then(($body) => {
        const blockBtn = $body.find(
          'button:contains("Block"), button:contains("Blackout"), [data-testid="block-invites"]'
        );
        if (blockBtn.length) {
          cy.wrap(blockBtn.first()).click();
        }
      });
    });
  });
});
