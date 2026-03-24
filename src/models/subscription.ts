export type Subscription = {
  tier: "basic" | "mid" | "pro" | "custom";
  status: "pending" | "active" | "past_due" | "canceled" | "expired";
  price: number;
  content_count: number;
  reels: number;
  posts: number;
  stories: number;
};
