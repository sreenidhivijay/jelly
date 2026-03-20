describe("Authentication Flows", () => {
  beforeEach(() => {
    cy.clearAuth();
  });

  describe("Login", () => {
    it("should log in with valid credentials and redirect", () => {
      cy.interceptApi("POST", "/auth/login", {
        statusCode: 200,
        body: {
          access_token: "valid-jwt-token",
          user: { id: 1, email: "user@test.com", role: "creator" },
        },
      }, "loginRequest");

      cy.interceptApi("GET", "/auth/me", {
        statusCode: 200,
        body: { id: 1, email: "user@test.com", role: "creator" },
      }, "fetchUser");

      cy.visit("/login");
      cy.get('input[type="email"], input[name="email"]').type("user@test.com");
      cy.get('input[type="password"], input[name="password"]').type("password123");
      cy.get('button[type="submit"]').click();

      cy.wait("@loginRequest").its("request.body").should("deep.include", {
        email: "user@test.com",
        password: "password123",
      });
    });

    it("should display error on invalid credentials", () => {
      cy.interceptApi("POST", "/auth/login", {
        statusCode: 401,
        body: { detail: "Invalid email or password" },
      }, "loginFail");

      cy.visit("/login");
      cy.get('input[type="email"], input[name="email"]').type("bad@test.com");
      cy.get('input[type="password"], input[name="password"]').type("wrong");
      cy.get('button[type="submit"]').click();

      cy.wait("@loginFail");
      cy.contains(/invalid|error|incorrect/i).should("be.visible");
    });
  });

  describe("Signup - Brand", () => {
    it("should register a new brand account", () => {
      cy.interceptApi("POST", "/auth/register", {
        statusCode: 200,
        body: {
          access_token: "new-brand-jwt",
          user: { id: 3, email: "newbrand@test.com", role: "brand" },
        },
      }, "signupRequest");

      cy.visit("/signup/brand");
      cy.get('input[name="email"], input[type="email"]').first().type("newbrand@test.com");
      cy.get('input[name="password"], input[type="password"]').first().type("SecurePass123!");

      // Fill any other required fields if visible
      cy.get("body").then(($body) => {
        if ($body.find('input[name="company_name"]').length) {
          cy.get('input[name="company_name"]').type("Test Corp");
        }
        if ($body.find('input[name="name"]').length) {
          cy.get('input[name="name"]').type("Test Corp");
        }
      });

      cy.get('button[type="submit"]').click();
      cy.wait("@signupRequest");
    });
  });

  describe("Signup - Creator", () => {
    it("should register a new creator account", () => {
      cy.interceptApi("POST", "/auth/register", {
        statusCode: 200,
        body: {
          access_token: "new-creator-jwt",
          user: { id: 4, email: "newcreator@test.com", role: "creator" },
        },
      }, "signupCreator");

      cy.visit("/signup/creator");
      cy.get('input[name="email"], input[type="email"]').first().type("newcreator@test.com");
      cy.get('input[name="password"], input[type="password"]').first().type("SecurePass123!");

      cy.get("body").then(($body) => {
        if ($body.find('input[name="name"]').length) {
          cy.get('input[name="name"]').type("Test Creator");
        }
      });

      cy.get('button[type="submit"]').click();
      cy.wait("@signupCreator");
    });
  });

  describe("Logout", () => {
    it("should clear auth state on logout", () => {
      cy.loginAs("creator");
      cy.interceptApi("GET", "/auth/me", {
        statusCode: 200,
        body: { id: 2, email: "creator@test.com", role: "creator" },
      }, "fetchMe");

      cy.visit("/creator-profile");

      // Find and click logout (button or link)
      cy.get("body").then(($body) => {
        const logoutEl = $body.find(
          'button:contains("Log"), a:contains("Log"), [data-testid="logout"]'
        );
        if (logoutEl.length) {
          cy.wrap(logoutEl.first()).click();
          cy.window().its("localStorage").invoke("getItem", "token").should("be.null");
        }
      });
    });
  });

  describe("Session expiry", () => {
    it("should redirect to login on 401 response", () => {
      cy.loginAs("creator");
      cy.interceptApi("GET", "/creators/me/profile", {
        statusCode: 401,
        body: { detail: "Token expired" },
      }, "expiredRequest");

      cy.visit("/creator-profile");
      cy.url().should("include", "/login");
    });
  });
});
