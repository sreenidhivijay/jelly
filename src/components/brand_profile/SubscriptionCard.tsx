import { useNavigate } from "react-router-dom";
import { useBrandProfile } from "../../hooks/useBrand";

export default function SubscriptionCard() {
  const navigate = useNavigate();
  const { data: brandProfile } = useBrandProfile();

  if (!brandProfile) return null;

  const sub = brandProfile.subscription;

  return (
    <div
      className="cursor-pointer rounded-2xl border border-[#f0f0f0] bg-white p-6 transition-all duration-200 hover:border-[#e0e0e0] hover:-translate-y-px hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
      onClick={() => navigate("/subscription")}
    >
      <div className="mb-5 flex items-center justify-between">
        <h3 className="m-0 text-sm font-bold uppercase tracking-[0.06em] text-coquette-soft-black">
          Subscription
        </h3>
        <span className="text-xs font-semibold tracking-[0.02em] text-coquette-rose">
          Manage
        </span>
      </div>
      <div className="mb-5 flex items-center gap-3">
        <span className="rounded-full bg-coquette-soft-black px-3.5 py-1 text-xs font-bold uppercase tracking-[0.06em] text-white">
          {sub.tier}
        </span>
        <span className="text-2xl font-extrabold text-coquette-soft-black">
          ${sub.price}
          <span className="text-[13px] font-medium text-[#aaa]">/mo</span>
        </span>
      </div>
      <div className="mb-4 flex flex-col gap-2.5">
        {[
          { label: "Posts", used: 0, total: sub.posts },
          { label: "Stories", used: 0, total: sub.stories },
          { label: "Reels", used: 0, total: sub.reels },
        ].map((stat) => (
          <div key={stat.label} className="flex items-center gap-2.5">
            <div className="h-1.5 flex-1 overflow-hidden rounded-md bg-[#f0f0f0]">
              <div
                className="h-full rounded-md bg-coquette-rose transition-[width] duration-400 ease-out"
                style={{
                  width: `${(stat.used / stat.total) * 100}%`,
                }}
              />
            </div>
            <span className="min-w-17.5 text-xs font-medium whitespace-nowrap text-[#888]">
              {stat.used}/{stat.total} {stat.label}
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-[#f5f5f5] pt-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#aaa]">
          Needs
        </span>
        <span className="text-[13px] font-semibold text-coquette-soft-black">
          Reels + Story suites
        </span>
      </div>
    </div>
  );
}
