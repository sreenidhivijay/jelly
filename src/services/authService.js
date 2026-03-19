import api from "./api";

const authService = {
  async login(email, password) {
    const data = await api.post("/auth/login", { email, password });
    if (data.access_token) {
      localStorage.setItem("token", data.access_token);
    }
    return data;
  },

  async signup(userData) {
    const data = await api.post("/auth/register", userData);
    if (data.access_token) {
      localStorage.setItem("token", data.access_token);
    }
    return data;
  },

  async fetchCurrentUser() {
    try {
      const data = await api.get("/auth/me");
      return data;
    } catch (error) {
      return null;
    }
  },

  logout() {
    localStorage.removeItem("token");
  },

  getToken() {
    return localStorage.getItem("token");
  },

  isAuthenticated() {
    return !!localStorage.getItem("token");
  },
};

export default authService;
