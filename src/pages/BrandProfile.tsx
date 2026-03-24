import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBrandProfile } from "../hooks/useBrand";
import BrandProfileHeader from "../components/brand_profile/BrandProfileHeader";
import BrandBriefPreview from "../components/brand_profile/BrandBriefPreview";
import BrandBriefModal from "../components/brand_profile/BrandBriefModal";
import CampaignBriefsCard from "../components/brand_profile/CampaignBriefsCard";
import CampaignTimelineCard from "../components/brand_profile/CampaignTimelineCard";
import ActiveCreatorsCard from "../components/brand_profile/ActiveCreatorsCard";
import SubscriptionCard from "../components/brand_profile/SubscriptionCard";

function loadBrief() {
  try {
    const raw = localStorage.getItem("jelly_brand_brief");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function BrandProfile() {
  const [brandBrief, setBrandBrief] = useState(loadBrief);
  const [showBriefModal, setShowBriefModal] = useState(false);
  const navigate = useNavigate();

  const { data: brandProfile, isLoading: loading } = useBrandProfile();

  if (loading || !brandProfile) {
    return (
      <div className="mx-auto mt-15 mb-35 max-w-275 px-6">
        {/* Skeleton header */}
        <div className="mb-9 border-b border-black/8 pb-9">
          <div className="flex items-center gap-6">
            <div className="h-22 w-22 animate-shimmer rounded-[22px] bg-linear-to-r from-[#f0f0f0] via-[#e8e8e8] to-[#f0f0f0] bg-size-[200%_100%]" />
            <div className="flex-1">
              <div className="mb-3 h-3 w-30 animate-shimmer rounded-lg bg-linear-to-r from-[#f0f0f0] via-[#e8e8e8] to-[#f0f0f0] bg-size-[200%_100%]" />
              <div className="mb-2 h-6 w-30 animate-shimmer rounded-lg bg-linear-to-r from-[#f0f0f0] via-[#e8e8e8] to-[#f0f0f0] bg-size-[200%_100%]" />
              <div className="h-3.5 w-75 animate-shimmer rounded-lg bg-linear-to-r from-[#f0f0f0] via-[#e8e8e8] to-[#f0f0f0] bg-size-[200%_100%]" />
            </div>
          </div>
        </div>
        {/* Skeleton grid */}
        <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="min-h-45 rounded-2xl border border-[#f0f0f0] bg-white p-6"
            >
              <div className="mb-4 h-4 w-3/5 animate-shimmer rounded-lg bg-linear-to-r from-[#f0f0f0] via-[#e8e8e8] to-[#f0f0f0] bg-size-[200%_100%]" />
              <div className="mb-3 h-10 w-full animate-shimmer rounded-lg bg-linear-to-r from-[#f0f0f0] via-[#e8e8e8] to-[#f0f0f0] bg-size-[200%_100%]" />
              <div className="h-3.5 w-4/5 animate-shimmer rounded-lg bg-linear-to-r from-[#f0f0f0] via-[#e8e8e8] to-[#f0f0f0] bg-size-[200%_100%]" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-15 mb-35 max-w-275 px-6 max-md:px-4 max-md:pt-6 max-md:pb-15">
      <BrandProfileHeader />

      <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
        <BrandBriefPreview
          brief={brandBrief}
          navigate={navigate}
          onCardClick={() => setShowBriefModal(true)}
          onBriefRemove={() => setBrandBrief(null)}
        />
        <CampaignBriefsCard />
        <CampaignTimelineCard />
        <ActiveCreatorsCard />
        <SubscriptionCard />
      </div>

      {showBriefModal && (
        <BrandBriefModal
          brief={brandBrief}
          onClose={() => setShowBriefModal(false)}
          onEdit={() => {
            setShowBriefModal(false);
            navigate("/brand-profile/brand-brief/builder");
          }}
        />
      )}
    </div>
  );
}

export default BrandProfile;
