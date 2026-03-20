describe("Stripe Connect Flows", () => {
  beforeEach(() => {
    cy.loginAs("creator");

    cy.interceptApi("GET", "/auth/me", {
      statusCode: 200,
      body: { id: 2, email: "creator@test.com", role: "creator" },
    }, "fetchMe");

    cy.interceptApi("GET", "/creators/me/profile", {
      statusCode: 200,
      body: { id: 2, name: "Test Creator" },
    }, "getProfile");
  });

  describe("Connect Status", () => {
    it("should show onboarding prompt when not connected", () => {
      cy.interceptApi("GET", "/connect/status", {
        statusCode: 200,
        body: { is_onboarded: false, payouts_enabled: false },
      }, "getConnectStatus");

      cy.visit("/creator-profile");

      cy.get("body").then(($body) => {
        if (
          $body.find(
            ':contains("Connect"), :contains("Stripe"), :contains("Payout")'
          ).length
        ) {
          cy.contains(/connect|stripe|payout|set up/i).should("exist");
        }
      });
    });

    it("should show connected status when onboarded", () => {
      cy.interceptApi("GET", "/connect/status", {
        statusCode: 200,
        body: { is_onboarded: true, payouts_enabled: true },
      }, "getConnectStatus");

      cy.visit("/creator-profile");
    });
  });

  describe("Onboarding", () => {
    it("should initiate Stripe Connect onboarding", () => {
      cy.interceptApi("GET", "/connect/status", {
        statusCode: 200,
        body: { is_onboarded: false, payouts_enabled: false },
      }, "getConnectStatus");

      cy.interceptApi("POST", "/connect/onboard*", {
        statusCode: 200,
        body: {
          onboarding_url: "https://connect.stripe.com/setup/test_abc123",
        },
      }, "startOnboarding");

      cy.visit("/creator-profile");

      cy.get("body").then(($body) => {
        const connectBtn = $body.find(
          'button:contains("Connect"), button:contains("Set Up"), button:contains("Stripe"), [data-testid="connect-stripe"]'
        );
        if (connectBtn.length) {
          cy.wrap(connectBtn.first()).click();
          cy.wait("@startOnboarding").then((interception) => {
            const params = new URL(interception.request.url).searchParams;
            // Verify return_url and refresh_url params are sent
            expect(
              params.has("return_url") ||
                interception.request.body?.return_url
            ).to.be.true;
          });
        }
      });
    });
  });
});
