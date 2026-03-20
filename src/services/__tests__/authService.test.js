import authService from "../authService";
import api from "../api";

jest.mock("../api", () => ({
  post: jest.fn(),
  get: jest.fn(),
}));

describe("authService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  describe("login", () => {
    it("posts credentials and stores token on success", async () => {
      api.post.mockResolvedValue({ access_token: "jwt-123", user: { id: 1 } });

      const result = await authService.login("user@test.com", "password123");

      expect(api.post).toHaveBeenCalledWith("/auth/login", {
        email: "user@test.com",
        password: "password123",
      });
      expect(localStorage.getItem("token")).toBe("jwt-123");
      expect(result).toEqual({ access_token: "jwt-123", user: { id: 1 } });
    });

    it("does not store token when response has no access_token", async () => {
      api.post.mockResolvedValue({ error: "invalid credentials" });

      await authService.login("user@test.com", "wrong");

      expect(localStorage.getItem("token")).toBeNull();
    });

    it("propagates API errors", async () => {
      api.post.mockRejectedValue(new Error("Invalid credentials"));

      await expect(
        authService.login("user@test.com", "wrong")
      ).rejects.toThrow("Invalid credentials");
    });
  });

  describe("signup", () => {
    it("posts user data and stores token on success", async () => {
      const userData = {
        email: "new@test.com",
        password: "pass123",
        name: "New User",
      };
      api.post.mockResolvedValue({ access_token: "new-jwt", user: { id: 2 } });

      const result = await authService.signup(userData);

      expect(api.post).toHaveBeenCalledWith("/auth/register", userData);
      expect(localStorage.getItem("token")).toBe("new-jwt");
      expect(result.user.id).toBe(2);
    });

    it("does not store token when signup response lacks access_token", async () => {
      api.post.mockResolvedValue({ message: "verification required" });

      await authService.signup({ email: "new@test.com" });

      expect(localStorage.getItem("token")).toBeNull();
    });
  });

  describe("fetchCurrentUser", () => {
    it("returns user data on success", async () => {
      api.get.mockResolvedValue({ id: 1, email: "user@test.com" });

      const user = await authService.fetchCurrentUser();

      expect(api.get).toHaveBeenCalledWith("/auth/me");
      expect(user).toEqual({ id: 1, email: "user@test.com" });
    });

    it("returns null on failure", async () => {
      api.get.mockRejectedValue(new Error("Unauthorized"));

      const user = await authService.fetchCurrentUser();

      expect(user).toBeNull();
    });
  });

  describe("logout", () => {
    it("removes token from localStorage", () => {
      localStorage.setItem("token", "some-token");

      authService.logout();

      expect(localStorage.getItem("token")).toBeNull();
    });
  });

  describe("getToken", () => {
    it("returns token when it exists", () => {
      localStorage.setItem("token", "my-token");
      expect(authService.getToken()).toBe("my-token");
    });

    it("returns null when no token", () => {
      expect(authService.getToken()).toBeNull();
    });
  });

  describe("isAuthenticated", () => {
    it("returns true when token exists", () => {
      localStorage.setItem("token", "any-token");
      expect(authService.isAuthenticated()).toBe(true);
    });

    it("returns false when no token", () => {
      expect(authService.isAuthenticated()).toBe(false);
    });
  });
});
