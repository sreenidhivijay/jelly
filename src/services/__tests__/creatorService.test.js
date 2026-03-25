import creatorService from "../creatorService";
import api from "../api";
import uploadService from "../uploadService";

jest.mock("../api", () => ({
  get: jest.fn(),
  patch: jest.fn(),
  put: jest.fn(),
  post: jest.fn(),
  delete: jest.fn(),
}));

jest.mock("../uploadService", () => ({
  uploadFile: jest.fn(),
}));

describe("creatorService", () => {
  beforeEach(() => jest.clearAllMocks());

  describe("getProfile", () => {
    it("fetches creator profile", async () => {
      api.get.mockResolvedValue({ id: 1, name: "Creator" });
      const result = await creatorService.getProfile();
      expect(api.get).toHaveBeenCalledWith("/creators/me/profile");
      expect(result).toEqual({ id: 1, name: "Creator" });
    });
  });

  describe("getIntroVideo", () => {
    it("fetches intro video data", async () => {
      api.get.mockResolvedValue({ url: "https://cdn.example.com/video.mp4" });
      const result = await creatorService.getIntroVideo();
      expect(api.get).toHaveBeenCalledWith("/creators/me/intro-video");
      expect(result.url).toBeDefined();
    });
  });

  describe("getPortfolio", () => {
    it("fetches portfolio items", async () => {
      api.get.mockResolvedValue([{ id: 1, file_key: "img1.jpg" }]);
      const result = await creatorService.getPortfolio();
      expect(api.get).toHaveBeenCalledWith("/creators/me/portfolio");
      expect(result).toHaveLength(1);
    });
  });

  describe("updateProfile", () => {
    it("patches profile with provided fields", async () => {
      const fields = { bio: "Updated bio", city: "LA" };
      api.patch.mockResolvedValue({ ...fields, id: 1 });

      const result = await creatorService.updateProfile(fields);

      expect(api.patch).toHaveBeenCalledWith("/creators/me/profile", fields);
      expect(result.bio).toBe("Updated bio");
    });
  });

  describe("uploadProfilePhoto", () => {
    it("uploads file then updates profile image key", async () => {
      const file = new File(["img"], "photo.jpg", { type: "image/jpeg" });
      uploadService.uploadFile.mockResolvedValue("uploads/photo.jpg");
      api.put.mockResolvedValue({ profile_image_url: "https://cdn/photo.jpg" });

      const result = await creatorService.uploadProfilePhoto(file);

      expect(uploadService.uploadFile).toHaveBeenCalledWith(
        file,
        "profile-image"
      );
      expect(api.put).toHaveBeenCalledWith("/creators/me/profile-image", {
        profile_image_key: "uploads/photo.jpg",
      });
      expect(result.profile_image_url).toBeDefined();
    });
  });

  describe("uploadIntroVideo", () => {
    it("uploads video file then updates intro video key", async () => {
      const file = new File(["vid"], "intro.mp4", { type: "video/mp4" });
      uploadService.uploadFile.mockResolvedValue("uploads/intro.mp4");
      api.put.mockResolvedValue({});

      const result = await creatorService.uploadIntroVideo(file);

      expect(uploadService.uploadFile).toHaveBeenCalledWith(
        file,
        "intro-video"
      );
      expect(api.put).toHaveBeenCalledWith("/creators/me/intro-video", {
        intro_vid_key: "uploads/intro.mp4",
      });
      expect(result).toBe("uploads/intro.mp4");
    });
  });

  describe("uploadPortfolio", () => {
    it("uploads multiple files and registers each", async () => {
      const files = [
        new File(["a"], "a.jpg", { type: "image/jpeg" }),
        new File(["b"], "b.jpg", { type: "image/jpeg" }),
      ];
      uploadService.uploadFile
        .mockResolvedValueOnce("uploads/a.jpg")
        .mockResolvedValueOnce("uploads/b.jpg");
      api.post.mockResolvedValue({});

      const result = await creatorService.uploadPortfolio(files);

      expect(uploadService.uploadFile).toHaveBeenCalledTimes(2);
      expect(api.post).toHaveBeenCalledTimes(2);
      expect(api.post).toHaveBeenCalledWith("/creators/me/portfolio", {
        file_key: "uploads/a.jpg",
      });
      expect(result).toEqual(["uploads/a.jpg", "uploads/b.jpg"]);
    });
  });

  describe("deletePortfolioItem", () => {
    it("deletes portfolio item by ID", async () => {
      api.delete.mockResolvedValue({});
      await creatorService.deletePortfolioItem("item-42");
      expect(api.delete).toHaveBeenCalledWith(
        "/creators/me/portfolio/item-42"
      );
    });
  });

  describe("blockInvites", () => {
    it("creates a blackout period", async () => {
      api.post.mockResolvedValue({ id: 1, start_date: "2026-04-01" });

      const result = await creatorService.blockInvites(
        "2026-04-01",
        "2026-04-07"
      );

      expect(api.post).toHaveBeenCalledWith("/creators/me/blackouts", {
        start_date: "2026-04-01",
        end_date: "2026-04-07",
      });
      expect(result.id).toBe(1);
    });
  });

  describe("clearBlockInvites", () => {
    it("deletes a blackout by ID", async () => {
      api.delete.mockResolvedValue({});
      await creatorService.clearBlockInvites("blackout-99");
      expect(api.delete).toHaveBeenCalledWith(
        "/creators/me/blackouts/blackout-99"
      );
    });
  });

  describe("getOpportunities", () => {
    const originalEnv = process.env;

    beforeEach(() => {
      process.env = { ...originalEnv };
    });

    afterAll(() => {
      process.env = originalEnv;
    });

    it("fetches creator opportunities from default endpoint", async () => {
      api.get.mockResolvedValue([{ id: 1 }]);

      const result = await creatorService.getOpportunities();

      expect(api.get).toHaveBeenCalledWith("/creators/me/opportunities");
      expect(result).toEqual([{ id: 1 }]);
    });

    it("uses custom opportunities endpoint when configured", async () => {
      process.env.REACT_APP_CREATOR_OPPORTUNITIES_PATH =
        "/creator-account/me/new-opportunities";
      api.get.mockResolvedValue([{ id: 2 }]);

      const result = await creatorService.getOpportunities();

      expect(api.get).toHaveBeenCalledWith(
        "/creator-account/me/new-opportunities"
      );
      expect(result).toEqual([{ id: 2 }]);
    });
  });
});
