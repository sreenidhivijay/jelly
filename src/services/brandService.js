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
    const objectKey = await uploadService.uploadFile(file, "profile-image");
    const brandData = await api.put("/brands/me/profile-image", { profile_image_key: objectKey });
    return brandData;
  },
};

export default brandService;
