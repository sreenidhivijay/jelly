import stripeConnectService from "../stripeConnectService";
import api from "../api";

jest.mock("../api", () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

describe("stripeConnectService", () => {
  beforeEach(() => jest.clearAllMocks());

  describe("getStatus", () => {
    it("fetches Stripe Connect status", async () => {
      api.get.mockResolvedValue({
        is_onboarded: true,
        payouts_enabled: true,
      });

      const result = await stripeConnectService.getStatus();

      expect(api.get).toHaveBeenCalledWith("/connect/status");
      expect(result.is_onboarded).toBe(true);
      expect(result.payouts_enabled).toBe(true);
    });

    it("handles not-yet-onboarded status", async () => {
      api.get.mockResolvedValue({
        is_onboarded: false,
        payouts_enabled: false,
      });

      const result = await stripeConnectService.getStatus();
      expect(result.is_onboarded).toBe(false);
    });
  });

  describe("startOnboarding", () => {
    it("starts onboarding with return and refresh URLs", async () => {
      api.post.mockResolvedValue({
        onboarding_url: "https://connect.stripe.com/setup/abc",
      });

      const result = await stripeConnectService.startOnboarding(
        "https://app.com/dashboard",
        "https://app.com/retry"
      );

      expect(api.post).toHaveBeenCalledWith("/connect/onboard", null, {
        params: {
          return_url: "https://app.com/dashboard",
          refresh_url: "https://app.com/retry",
        },
      });
      expect(result.onboarding_url).toContain("stripe.com");
    });
  });
});
