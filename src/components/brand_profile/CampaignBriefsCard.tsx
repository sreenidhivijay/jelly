import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NICHE_OPTIONS = [
  "Fashion/Lifestyle",
  "Wellness",
  "Food",
  "Tech",
  "Beauty/Makeup",
];

const skuKits = [
  { id: 1, name: "Midnight High Tea Drop", niche: "Food", status: "Active" },
  { id: 2, name: "Noir Glow Capsule", niche: "Beauty/Makeup", status: "Draft" },
];

export default function CampaignBriefsCard() {
  const [showNichePicker, setShowNichePicker] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="cursor-default rounded-2xl border border-[#f0f0f0] bg-white p-6 transition-all duration-200 hover:border-[#e0e0e0] hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="m-0 text-sm font-bold uppercase tracking-[0.06em] text-coquette-soft-black">
          Campaign Briefs
        </h3>
        <span className="text-[11px] font-medium tracking-[0.02em] text-[#bbb]">
          SKU Kits
        </span>
      </div>
      {skuKits.length > 0 && (
        <div className="mb-4 flex flex-col gap-2">
          {skuKits.map((kit) => (
            <div
              key={kit.id}
              className="flex cursor-pointer items-center justify-between rounded-[10px] border border-[#f0f0f0] px-3.5 py-2.5 transition-all duration-200 hover:border-[#e0e0e0] hover:bg-[#fafafa]"
              onClick={() =>
                navigate("/brand-profile/brand-brief", {
                  state: { niche: kit.niche },
                })
              }
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-[13px] font-semibold text-coquette-soft-black">
                  {kit.name}
                </span>
                <span className="text-[11px] text-[#aaa]">{kit.niche}</span>
              </div>
              <span
                className={`rounded-full px-2.5 py-0.75 text-[10px] font-semibold uppercase tracking-[0.04em] ${
                  kit.status === "Active"
                    ? "bg-[rgba(46,125,91,0.08)] text-[#2e7d5b]"
                    : "bg-[#f5f5f5] text-[#888]"
                }`}
              >
                {kit.status}
              </span>
            </div>
          ))}
        </div>
      )}
      <div className="pt-1">
        {!showNichePicker ? (
          <button
            className="w-full cursor-pointer rounded-[10px] border-[1.5px] border-dashed border-[#e0e0e0] bg-none p-2.5 text-[13px] font-semibold text-[#999] transition-all duration-200 hover:border-coquette-rose hover:bg-coquette-rose/3 hover:text-coquette-rose"
            onClick={() => setShowNichePicker(true)}
          >
            + New Campaign Brief
          </button>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {NICHE_OPTIONS.map((niche) => (
              <button
                key={niche}
                className="cursor-pointer rounded-full border border-[#e0e0e0] bg-white px-3.5 py-1.5 text-xs font-medium text-[#555] transition-all duration-200 hover:border-coquette-soft-black hover:bg-coquette-soft-black hover:text-white"
                onClick={() => {
                  setShowNichePicker(false);
                  navigate("/brand-profile/brand-brief", {
                    state: { niche },
                  });
                }}
              >
                {niche}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
