import { Subscription } from "./subscription";

export type Brand = {
  id: string;
  user_id: string;
  company_name: string;
  description: string | null;
  bio: string | null;
  website: string | null;
  profile_image_key: string | null;
  profile_image_url: string | null;
  subscription: Subscription;
  is_verified: Boolean;
  created_at: Date;
};
