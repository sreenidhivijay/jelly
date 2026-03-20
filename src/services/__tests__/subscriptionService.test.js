import subscriptionService from "../subscriptionService";
import api from "../api";

jest.mock("../api", () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
}));

describe("subscriptionService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    delete window.location;
    window.location = { origin: "http://localhost:3000" };
  });

  describe("getTiers", () => {
    it("fetches available subscription tiers", async () => {
      const tiers = [
        { name: "Starter", price: 99 },
        { name: "Pro", price: 199 },
      ];
      api.get.mockResolvedValue(tiers);

      const result = await subscriptionService.getTiers();

      expect(api.get).toHaveBeenCalledWith("/subscriptions/tiers");
      expect(result).toHaveLength(2);
      expect(result[0].name).toBe("Starter");
    });
  });

  describe("subscribe", () => {
    it("creates a subscription with tier and content counts", async () => {
      api.post.mockResolvedValue({ checkout_url: "https://checkout.stripe.com/session" });

      const counts = { Reel: 5, Post: 10, Story: 3 };
      const result = await subscriptionService.subscribe("Pro", counts);

      expect(api.post).toHaveBeenCalledWith("/subscriptions", {
        tier: "Pro",
        reels: 5,
        posts: 10,
        stories: 3,
        success_url: "http://localhost:3000/signup/business/success",
        cancel_url: "http://localhost:3000/signup/business/subscription-tiers",
      });
      expect(result.checkout_url).toBeDefined();
    });

    it("defaults counts to 0 when customCounts is undefined", async () => {
      api.post.mockResolvedValue({});

      await subscriptionService.subscribe("Starter");

      expect(api.post).toHaveBeenCalledWith("/subscriptions", {
        tier: "Starter",
        reels: 0,
        posts: 0,
        stories: 0,
        success_url: "http://localhost:3000/signup/business/success",
        cancel_url: "http://localhost:3000/signup/business/subscription-tiers",
      });
    });
  });

  describe("getMySubscription", () => {
    it("fetches current user subscription", async () => {
      api.get.mockResolvedValue({ tier: "Pro", status: "active" });

      const result = await subscriptionService.getMySubscription();

      expect(api.get).toHaveBeenCalledWith("/subscriptions/me");
      expect(result.status).toBe("active");
    });
  });

  describe("updateSubscription", () => {
    it("updates subscription tier and counts", async () => {
      api.put.mockResolvedValue({ tier: "Enterprise" });

      const counts = { Reel: 10, Post: 20, Story: 5 };
      const result = await subscriptionService.updateSubscription(
        "Enterprise",
        counts
      );

      expect(api.put).toHaveBeenCalledWith("/subscriptions/me", {
        tier: "Enterprise",
        reels: 10,
        posts: 20,
        stories: 5,
      });
      expect(result.tier).toBe("Enterprise");
    });
  });

  describe("cancelSubscription", () => {
    it("cancels the current subscription", async () => {
      api.post.mockResolvedValue({ status: "cancelled" });

      const result = await subscriptionService.cancelSubscription();

      expect(api.post).toHaveBeenCalledWith("/subscriptions/me/cancel");
      expect(result.status).toBe("cancelled");
    });
  });

  describe("reactivateSubscription", () => {
    it("reactivates a cancelled subscription", async () => {
      api.post.mockResolvedValue({ status: "active" });

      const result = await subscriptionService.reactivateSubscription();

      expect(api.post).toHaveBeenCalledWith("/subscriptions/me/reactivate");
      expect(result.status).toBe("active");
    });
  });
});
