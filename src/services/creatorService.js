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
    return [
      {
        id: 1,
        sku: "Reel",
        location: "Remote",
        pay: "$150",
        deadline: "2 days",
        skills: "Video Editing, Transitions",
        brand: "Glow Cosmetics",
        description:
          "Create a high-energy reel featuring our new summer palette. Focus on transitions and color popping.",
        referenceImages: [
          {
            id: "glow-ref-1",
            url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80",
          },
          {
            id: "glow-ref-2",
            url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
          },
          {
            id: "glow-ref-3",
            url: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=80",
          },
        ],
        deliverables: [
          {
            id: "glow-del-1",
            title: "Hero Reel",
            description:
              "One 20-30s vertical reel with fast transitions and a final color-pop reveal.",
            requiredType: "video",
          },
          {
            id: "glow-del-2",
            title: "Cutdown Version",
            description:
              "One 8-12s cutdown optimized for paid social placement.",
            requiredType: "video",
          },
        ],
      },
      {
        id: 2,
        sku: "Carousel",
        location: "On-site (NYC)",
        pay: "$300",
        deadline: "5 days",
        skills: "Photography, Lighting",
        brand: "Urban Eats",
        description:
          "We need 5 high-res photos of our new brunch menu. Natural lighting, overhead shots.",
        referenceImages: [
          {
            id: "urban-ref-1",
            url: "https://images.unsplash.com/photo-1494859802809-d069c3b71a8a?auto=format&fit=crop&w=900&q=80",
          },
          {
            id: "urban-ref-2",
            url: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=900&q=80",
          },
        ],
        deliverables: [
          {
            id: "urban-del-1",
            title: "Brunch Carousel",
            description:
              "Five edited stills framed for a single Instagram carousel.",
            requiredType: "image",
          },
        ],
      },
      {
        id: 3,
        sku: "Story Set",
        location: "Remote",
        pay: "$80",
        deadline: "24 hours",
        skills: "Graphic Design",
        brand: "TechNova",
        description:
          "Design a set of 3 stories announcing our flash sale. Use our brand colors (blue/white).",
        referenceImages: [
          {
            id: "tech-ref-1",
            url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
          },
        ],
        deliverables: [
          {
            id: "tech-del-1",
            title: "Story Card Set",
            description:
              "Three linked story cards with clear CTA and sale dates.",
            requiredType: "video",
          },
        ],
      },
    ];
    return api.get("/creators/me/opportunities");
  },
};

export default creatorService;
