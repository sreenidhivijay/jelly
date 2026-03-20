import api from "./api";

const stripeConnectService = {
  async getStatus() {
    return api.get("/connect/status");
  },

  async startOnboarding(returnUrl, refreshUrl) {
    return api.post("/connect/onboard", null, {
      params: {
        return_url: returnUrl,
        refresh_url: refreshUrl,
      },
    });
  },
};

export default stripeConnectService;
