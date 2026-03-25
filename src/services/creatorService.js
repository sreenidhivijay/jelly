import api from "./api";
import uploadService from "./uploadService";

const creatorService = {
  async getProfile() {
    return api.get("/creators/me/profile");
  },

  async getIntroVideo() {
    return api.get("/creators/me/intro-video");
  },

  async getPortfolio() {
    return api.get("/creators/me/portfolio");
  },

  async updateProfile(fields) {
    return api.patch("/creators/me/profile", fields);
  },

  async uploadProfilePhoto(file) {
    const objectKey = await uploadService.uploadFile(file, "profile-image");
    const brandData = await api.put("/creators/me/profile-image", {
      profile_image_key: objectKey,
    });
    return brandData;
  },

  async uploadIntroVideo(file) {
    const objectKey = await uploadService.uploadFile(file, "intro-video");
    await api.put("/creators/me/intro-video", { intro_vid_key: objectKey });
    return objectKey;
  },

  async uploadPortfolio(files) {
    const uploadPromises = files.map(async (file) => {
      const objectKey = await uploadService.uploadFile(file, "portfolio");
      await api.post("/creators/me/portfolio", { file_key: objectKey });
      return objectKey;
    });
    return Promise.all(uploadPromises);
  },

  async deletePortfolioItem(itemId) {
    return api.delete(`/creators/me/portfolio/${itemId}`);
  },
  
  async blockInvites(blockStart, blockEnd) {
    const blockout = api.post("/creators/me/blackouts", {
      start_date: blockStart,
      end_date: blockEnd,
    });
    return blockout;
  },
  async clearBlockInvites(blockoutId) {
    return api.delete(`/creators/me/blackouts/${blockoutId}`);
  },

  async getOpportunities() {
    const opportunitiesPath =
      process.env.REACT_APP_CREATOR_OPPORTUNITIES_PATH ||
      "/creators/me/opportunities";
    return api.get(opportunitiesPath);
  },
};

export default creatorService;
