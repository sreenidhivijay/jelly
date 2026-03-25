import { Brand } from "src/models/brand";
import api from "./api";
import uploadService from "./uploadService";

const brandService = {
  async getProfile() {
    return api.get<Brand>("/brands/me/profile");
  },

  async updateProfile(fields: Partial<Brand>) {
    return api.patch<Brand>("/brands/me/profile", fields);
  },

  async uploadProfilePhoto(file: File) {
    const objectKey = await uploadService.uploadFile(file, "profile-image");
    const brandData = await api.put<Brand>("/brands/me/profile-image", {
      profile_image_key: objectKey,
    });
    return brandData;
  },
};

export default brandService;
