import uploadService from "../uploadService";
import api from "../api";
import axios from "axios";

jest.mock("../api", () => ({
  post: jest.fn(),
}));

jest.mock("axios", () => ({
  put: jest.fn(),
}));

describe("uploadService", () => {
  beforeEach(() => jest.clearAllMocks());

  describe("uploadFile", () => {
    const mockFile = new File(["content"], "test.jpg", {
      type: "image/jpeg",
    });

    it("gets presigned URL, uploads to R2, and returns object_key", async () => {
      api.post.mockResolvedValue({
        presigned_url: "https://r2.example.com/upload?sig=abc",
        object_key: "uploads/test.jpg",
      });
      axios.put.mockResolvedValue({});

      const result = await uploadService.uploadFile(mockFile, "profile-image");

      expect(api.post).toHaveBeenCalledWith("/uploads/profile-image", {
        file_name: "test.jpg",
        file_type: "image/jpeg",
      });
      expect(axios.put).toHaveBeenCalledWith(
        "https://r2.example.com/upload?sig=abc",
        mockFile,
        { headers: { "Content-Type": "image/jpeg" } }
      );
      expect(result).toBe("uploads/test.jpg");
    });

    it("throws user-friendly error when R2 upload fails", async () => {
      api.post.mockResolvedValue({
        presigned_url: "https://r2.example.com/upload",
        object_key: "uploads/test.jpg",
      });
      axios.put.mockRejectedValue(new Error("Network error"));

      await expect(
        uploadService.uploadFile(mockFile, "profile-image")
      ).rejects.toThrow("Upload failed. Please try again.");
    });

    it("propagates error when presigned URL request fails", async () => {
      api.post.mockRejectedValue(new Error("Server error"));

      await expect(
        uploadService.uploadFile(mockFile, "portfolio")
      ).rejects.toThrow("Server error");
    });
  });
});
