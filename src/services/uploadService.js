import api from "./api";
import axios from "axios";

const uploadService = {
  /**
   * Get a presigned URL from the backend, then upload the file directly to R2.
   * Returns the public URL of the uploaded file.
   */
  async uploadFile(file, type) {
    // 1. Request a presigned URL from our backend
    const { presigned_url, object_key } = await api.post(`/uploads/${type}`, {
      file_name: file.name,
      file_type: file.type,
    });

    try {
      // 2. Upload the file directly to R2 using the presigned URL
      await axios.put(presigned_url, file, {
        headers: {
          "Content-Type": file.type,
        },
      });
    } catch (error) {
      throw new Error("Upload failed. Please try again.");
    }

    // 3. Return the public URL where the file can be accessed
    return object_key;
  },
};

export default uploadService;
