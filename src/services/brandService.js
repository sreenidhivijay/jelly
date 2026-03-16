import api from "./api";
import uploadService from "./uploadService";

const brandService = {
  async getProfile() {
    return api.get("/brands/me/profile");
  },

  async updateProfile(fields) {
    return api.patch("/brands/me/profile", fields);
  },

  async uploadProfilePhoto(file) {
    const fileUrl = await uploadService.uploadFile(file);
    await api.patch("/brands/me/profile", { profile_photo_url: fileUrl });
    return fileUrl;
  },
};

export default brandService;
