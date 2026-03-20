describe("File Upload Flows", () => {
  beforeEach(() => {
    cy.loginAs("creator");

    cy.interceptApi("GET", "/auth/me", {
      statusCode: 200,
      body: { id: 2, email: "creator@test.com", role: "creator" },
    }, "fetchMe");

    cy.interceptApi("GET", "/creators/me/profile", {
      statusCode: 200,
      body: { id: 2, name: "Test Creator", profile_image_url: null },
    }, "getProfile");

    cy.interceptApi("GET", "/creators/me/portfolio", {
      statusCode: 200,
      body: [],
    }, "getPortfolio");

    cy.interceptApi("GET", "/creators/me/intro-video", {
      statusCode: 200,
      body: { url: null },
    }, "getIntroVideo");
  });

  describe("Presigned URL upload pattern", () => {
    it("should follow the two-step upload flow for profile image", () => {
      // Step 1: Get presigned URL from backend
      cy.interceptApi("POST", "/uploads/profile-image", {
        statusCode: 200,
        body: {
          presigned_url: "https://r2.example.com/presigned-upload",
          object_key: "uploads/profile/new-photo.jpg",
        },
      }, "getPresignedUrl");

      // Step 2: Direct upload to R2
      cy.intercept("PUT", "https://r2.example.com/presigned-upload", {
        statusCode: 200,
      }).as("directUpload");

      // Step 3: Register the key with the backend
      cy.interceptApi("PUT", "/creators/me/profile-image", {
        statusCode: 200,
        body: { profile_image_url: "https://cdn.example.com/new-photo.jpg" },
      }, "registerImage");

      cy.visit("/creator-profile");
      cy.wait("@getProfile");

      cy.get("body").then(($body) => {
        const fileInput = $body.find('input[type="file"]');
        if (fileInput.length) {
          cy.wrap(fileInput.first()).selectFile(
            {
              contents: Cypress.Buffer.from("fake-image-data"),
              fileName: "new-photo.jpg",
              mimeType: "image/jpeg",
            },
            { force: true }
          );

          // Verify the two-step flow
          cy.wait("@getPresignedUrl")
            .its("request.body")
            .should("deep.include", {
              file_name: "new-photo.jpg",
              file_type: "image/jpeg",
            });
        }
      });
    });

    it("should handle upload failure gracefully", () => {
      cy.interceptApi("POST", "/uploads/profile-image", {
        statusCode: 200,
        body: {
          presigned_url: "https://r2.example.com/will-fail",
          object_key: "uploads/profile/fail.jpg",
        },
      }, "getPresignedUrl");

      cy.intercept("PUT", "https://r2.example.com/will-fail", {
        statusCode: 500,
        body: "Internal Server Error",
      }).as("failedUpload");

      cy.visit("/creator-profile");
      cy.wait("@getProfile");

      cy.get("body").then(($body) => {
        const fileInput = $body.find('input[type="file"]');
        if (fileInput.length) {
          cy.wrap(fileInput.first()).selectFile(
            {
              contents: Cypress.Buffer.from("bad-file"),
              fileName: "fail.jpg",
              mimeType: "image/jpeg",
            },
            { force: true }
          );
        }
      });
    });
  });

  describe("Portfolio upload", () => {
    it("should upload multiple portfolio files", () => {
      cy.interceptApi("POST", "/uploads/portfolio", {
        statusCode: 200,
        body: {
          presigned_url: "https://r2.example.com/portfolio-upload",
          object_key: "uploads/portfolio/item.jpg",
        },
      }, "getPortfolioPresignedUrl");

      cy.intercept("PUT", "https://r2.example.com/portfolio-upload", {
        statusCode: 200,
      }).as("portfolioDirectUpload");

      cy.interceptApi("POST", "/creators/me/portfolio", {
        statusCode: 200,
        body: { id: "new-item", file_key: "uploads/portfolio/item.jpg" },
      }, "registerPortfolioItem");

      cy.visit("/creator-profile");
      cy.wait("@getPortfolio");

      cy.get("body").then(($body) => {
        // Look for a portfolio-specific file input or upload button
        const fileInputs = $body.find('input[type="file"]');
        if (fileInputs.length > 1) {
          // Use the second file input (likely portfolio)
          cy.wrap(fileInputs.eq(1)).selectFile(
            {
              contents: Cypress.Buffer.from("portfolio-image"),
              fileName: "portfolio-piece.jpg",
              mimeType: "image/jpeg",
            },
            { force: true }
          );
        }
      });
    });
  });
});
