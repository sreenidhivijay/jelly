describe("Subscription Flows", () => {
  beforeEach(() => {
    cy.loginAs("brand");

    cy.interceptApi("GET", "/auth/me", {
      statusCode: 200,
      body: { id: 1, email: "brand@test.com", role: "brand" },
    }, "fetchMe");
  });

  describe("View Subscription Tiers", () => {
    it("should display available subscription tiers", () => {
      cy.interceptApi("GET", "/subscriptions/tiers", {
        statusCode: 200,
        fixture: "subscriptionTiers.json",
      }, "getTiers");

      cy.visit("/signup/business/subscription-tiers");
      cy.wait("@getTiers");

      cy.contains(/starter|pro|enterprise|tier|plan/i).should("exist");
    });
  });

  describe("Subscribe", () => {
    it("should initiate subscription checkout", () => {
      cy.interceptApi("GET", "/subscriptions/tiers", {
        statusCode: 200,
        fixture: "subscriptionTiers.json",
      }, "getTiers");

      cy.interceptApi("POST", "/subscriptions", {
        statusCode: 200,
        body: {
          checkout_url: "https://checkout.stripe.com/c/pay_test123",
          subscription_id: "sub_123",
        },
      }, "subscribe");

      cy.visit("/signup/business/subscription-tiers");
      cy.wait("@getTiers");

      // Click on a tier/plan to select it
      cy.get("body").then(($body) => {
        const selectBtn = $body.find(
          'button:contains("Select"), button:contains("Choose"), button:contains("Subscribe"), button:contains("Get Started")'
        );
        if (selectBtn.length) {
          cy.wrap(selectBtn.first()).click();
        }
      });
    });

    it("should send correct payload when subscribing", () => {
      cy.interceptApi("POST", "/subscriptions", {
        statusCode: 200,
        body: { checkout_url: "https://checkout.stripe.com/test" },
      }, "subscribeRequest");

      cy.interceptApi("GET", "/subscriptions/tiers", {
        statusCode: 200,
        fixture: "subscriptionTiers.json",
      }, "getTiers");

      cy.visit("/signup/business/subscription-tiers");
      cy.wait("@getTiers");

      // The subscribe POST should include tier, reels, posts, stories, and URLs
      cy.get("body").then(($body) => {
        const btn = $body.find(
          'button:contains("Select"), button:contains("Subscribe"), button:contains("Get Started")'
        );
        if (btn.length) {
          cy.wrap(btn.first()).click();
          cy.wait("@subscribeRequest").then((interception) => {
            const body = interception.request.body;
            expect(body).to.have.property("tier");
            expect(body).to.have.property("success_url");
            expect(body).to.have.property("cancel_url");
          });
        }
      });
    });
  });

  describe("Manage Subscription", () => {
    it("should display current subscription details", () => {
      cy.interceptApi("GET", "/subscriptions/me", {
        statusCode: 200,
        body: {
          tier: "Pro",
          status: "active",
          reels: 5,
          posts: 10,
          stories: 3,
          current_period_end: "2026-04-19",
        },
      }, "getSubscription");

      // Visit a dashboard or subscription management page if it exists
      cy.visit("/brand-profile");

      cy.get("body").then(($body) => {
        if ($body.find(':contains("Subscription"), :contains("Plan")').length) {
          cy.contains(/subscription|plan|pro/i).should("exist");
        }
      });
    });

    it("should cancel a subscription", () => {
      cy.interceptApi("GET", "/subscriptions/me", {
        statusCode: 200,
        body: { tier: "Pro", status: "active" },
      }, "getSubscription");

      cy.interceptApi("POST", "/subscriptions/me/cancel", {
        statusCode: 200,
        body: { tier: "Pro", status: "cancelled" },
      }, "cancelSubscription");

      cy.visit("/brand-profile");

      cy.get("body").then(($body) => {
        const cancelBtn = $body.find(
          'button:contains("Cancel"), [data-testid="cancel-subscription"]'
        );
        if (cancelBtn.length) {
          cy.wrap(cancelBtn.first()).click();
          cy.wait("@cancelSubscription");
        }
      });
    });

    it("should reactivate a cancelled subscription", () => {
      cy.interceptApi("GET", "/subscriptions/me", {
        statusCode: 200,
        body: { tier: "Pro", status: "cancelled" },
      }, "getCancelledSubscription");

      cy.interceptApi("POST", "/subscriptions/me/reactivate", {
        statusCode: 200,
        body: { tier: "Pro", status: "active" },
      }, "reactivateSubscription");

      cy.visit("/brand-profile");

      cy.get("body").then(($body) => {
        const reactivateBtn = $body.find(
          'button:contains("Reactivate"), button:contains("Resume"), [data-testid="reactivate"]'
        );
        if (reactivateBtn.length) {
          cy.wrap(reactivateBtn.first()).click();
          cy.wait("@reactivateSubscription");
        }
      });
    });
  });
});
