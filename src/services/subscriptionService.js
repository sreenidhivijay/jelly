import api from "./api";

const subscriptionService = {
  async getTiers() {
    return api.get("/subscriptions/tiers");
  },

  async subscribe(tierName, customCounts) {
    return api.post("/subscriptions", {
      tier: tierName,
      reels: customCounts?.Reel || 0,
      posts: customCounts?.Post || 0,
      stories: customCounts?.Story || 0,
    });
  },

  async getMySubscription() {
    return api.get("/subscriptions/me");
  },

  async cancelSubscription() {
    return api.delete("/subscriptions/me");
  },
};

export default subscriptionService;
