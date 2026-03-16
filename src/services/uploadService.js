import api from "./api";
import axios from "axios";

const uploadService = {
  /**
   * Get a presigned URL from the backend, then upload the file directly to R2.
   * Returns the public URL of the uploaded file.
   */
  async uploadFile(file) {
    // 1. Request a presigned URL from our backend
    const { upload_url, file_url } = await api.post("/uploads/video", {
      file_name: file.name,
      file_type: file.type,
    });

    try {
      // 2. Upload the file directly to R2 using the presigned URL
      await axios.put(upload_url, file, {
        headers: {
          "Content-Type": file.type,
        },
      });
    } catch (error) {
      console.error("Upload failed:", error);
      throw new Error("Upload failed. Please try again.");
    }

    // 3. Return the public URL where the file can be accessed
    return file_url;
  },

  async getPortfolio() {
    return api.get("/creators/me/portfolio");
  },
};

export default uploadService;
