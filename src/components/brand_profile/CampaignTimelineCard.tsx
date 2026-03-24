import { useNavigate } from "react-router-dom";

export default function CampaignTimelineCard() {
  const navigate = useNavigate();

  return (
    <div
      className="cursor-pointer rounded-2xl border border-[#f0f0f0] bg-white p-6 transition-all duration-200 hover:border-[#e0e0e0] hover:-translate-y-px hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
      onClick={() => navigate("/brand-timeline")}
    >
      <div className="mb-5 flex items-center justify-between">
        <h3 className="m-0 text-sm font-bold uppercase tracking-[0.06em] text-coquette-soft-black">
          Campaign Timeline
        </h3>
        <span className="text-xs font-semibold tracking-[0.02em] text-coquette-rose">
          View All
        </span>
      </div>
      <div className="mb-4 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#2e7d5b] shadow-[0_0_0_3px_rgba(46,125,91,0.15)]" />
          <div className="flex flex-1 flex-col gap-0.5">
            <span className="text-[13px] font-semibold text-coquette-soft-black">
              Midnight High Tea Drop
            </span>
            <span className="text-[11px] text-[#aaa]">
              2/3 tasks done &bull; Due Dec 05
            </span>
          </div>
          <span className="rounded-full bg-[rgba(46,125,91,0.08)] px-2.5 py-0.75 text-[10px] font-semibold uppercase tracking-[0.04em] text-[#2e7d5b]">
            Accepted
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#ddd] shadow-[0_0_0_3px_rgba(0,0,0,0.04)]" />
          <div className="flex flex-1 flex-col gap-0.5">
            <span className="text-[13px] font-semibold text-coquette-soft-black">
              Noir Glow Capsule
            </span>
            <span className="text-[11px] text-[#aaa]">
              Awaiting shortlist
            </span>
          </div>
          <span className="rounded-full bg-[rgba(199,125,0,0.08)] px-2.5 py-0.75 text-[10px] font-semibold uppercase tracking-[0.04em] text-[#c77d00]">
            Applied
          </span>
        </div>
      </div>
      <div className="border-t border-[#f5f5f5] pt-3 text-center">
        <span className="text-xs font-medium text-[#aaa]">
          2 active campaigns
        </span>
      </div>
    </div>
  );
}
