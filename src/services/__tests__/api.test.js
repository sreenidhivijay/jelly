describe("api module", () => {
  let requestInterceptor;
  let responseSuccessInterceptor;
  let responseErrorInterceptor;
  let mockCreate;

  beforeAll(() => {
    const requestHandlers = [];
    const responseHandlers = [];
    const instance = {
      interceptors: {
        request: { use: jest.fn((fn) => requestHandlers.push(fn)) },
        response: {
          use: jest.fn((success, error) =>
            responseHandlers.push({ success, error })
          ),
        },
      },
    };
    mockCreate = jest.fn(() => instance);

    jest.doMock("axios", () => ({
      __esModule: true,
      default: { create: mockCreate },
    }));

    require("../api");

    requestInterceptor = requestHandlers[0];
    responseSuccessInterceptor = responseHandlers[0].success;
    responseErrorInterceptor = responseHandlers[0].error;
  });

  beforeEach(() => {
    localStorage.clear();
    delete window.location;
    window.location = { href: "" };
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe("request interceptor", () => {
    it("attaches Authorization header when token exists", () => {
      localStorage.setItem("token", "test-token-123");
      const config = { headers: {} };
      const result = requestInterceptor(config);
      expect(result.headers.Authorization).toBe("Bearer test-token-123");
    });

    it("does not attach Authorization header when no token", () => {
      const config = { headers: {} };
      const result = requestInterceptor(config);
      expect(result.headers.Authorization).toBeUndefined();
    });
  });

  describe("response interceptor", () => {
    it("unwraps response.data on success", () => {
      const response = { data: { id: 1, name: "test" } };
      expect(responseSuccessInterceptor(response)).toEqual({
        id: 1,
        name: "test",
      });
    });

    it("clears auth and redirects on 401", async () => {
      localStorage.setItem("token", "expired-token");
      localStorage.setItem("user", '{"id":1}');

      const error = { response: { status: 401 } };
      await expect(responseErrorInterceptor(error)).rejects.toThrow(
        "Session expired"
      );
      expect(localStorage.getItem("token")).toBeNull();
      expect(localStorage.getItem("user")).toBeNull();
      expect(window.location.href).toBe("/login");
    });

    it("extracts detail message from error response", async () => {
      const error = {
        response: { status: 400, data: { detail: "Invalid email" } },
      };
      await expect(responseErrorInterceptor(error)).rejects.toThrow(
        "Invalid email"
      );
    });

    it("falls back to generic message when no detail", async () => {
      const error = { response: { status: 500, data: {} } };
      await expect(responseErrorInterceptor(error)).rejects.toThrow(
        "Something went wrong"
      );
    });

    it("handles network error with no response", async () => {
      const error = {};
      await expect(responseErrorInterceptor(error)).rejects.toThrow(
        "Something went wrong"
      );
    });
  });
});
