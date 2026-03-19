import brandService from "../brandService";
import api from "../api";
import uploadService from "../uploadService";

jest.mock("../api", () => ({
  get: jest.fn(),
  patch: jest.fn(),
  put: jest.fn(),
}));

jest.mock("../uploadService", () => ({
  uploadFile: jest.fn(),
}));

describe("brandService", () => {
  beforeEach(() => jest.clearAllMocks());

  describe("getProfile", () => {
    it("fetches brand profile", async () => {
      api.get.mockResolvedValue({ id: 1, company_name: "Acme" });
      const result = await brandService.getProfile();
      expect(api.get).toHaveBeenCalledWith("/brands/me/profile");
      expect(result.company_name).toBe("Acme");
    });
  });

  describe("updateProfile", () => {
    it("patches brand profile with fields", async () => {
      const fields = { company_name: "Acme Corp", website: "https://acme.co" };
      api.patch.mockResolvedValue({ ...fields, id: 1 });

      const result = await brandService.updateProfile(fields);

      expect(api.patch).toHaveBeenCalledWith("/brands/me/profile", fields);
      expect(result.company_name).toBe("Acme Corp");
    });
  });

  describe("uploadProfilePhoto", () => {
    it("uploads file then updates brand profile image", async () => {
      const file = new File(["logo"], "logo.png", { type: "image/png" });
      uploadService.uploadFile.mockResolvedValue("uploads/logo.png");
      api.put.mockResolvedValue({
        profile_image_url: "https://cdn/logo.png",
      });

      const result = await brandService.uploadProfilePhoto(file);

      expect(uploadService.uploadFile).toHaveBeenCalledWith(
        file,
        "profile-image"
      );
      expect(api.put).toHaveBeenCalledWith("/brands/me/profile-image", {
        profile_image_key: "uploads/logo.png",
      });
      expect(result.profile_image_url).toBeDefined();
    });
  });
});
