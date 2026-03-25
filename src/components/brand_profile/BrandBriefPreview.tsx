import { NavigateFunction } from "react-router-dom";

interface BrandBriefPreviewProps {
  brief: any;
  navigate: NavigateFunction;
  onCardClick: () => void;
  onBriefRemove: () => void;
}

export default function BrandBriefPreview({
  brief,
  navigate,
  onCardClick,
  onBriefRemove,
}: BrandBriefPreviewProps) {
  if (!brief) {
    return (
      <div className="cursor-default rounded-2xl border border-dashed border-[#e0e0e0] bg-white p-6 transition-all duration-200 hover:border-coquette-rose hover:shadow-none">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="m-0 text-sm font-bold uppercase tracking-[0.06em] text-coquette-soft-black">
            Brand Brief
          </h3>
        </div>
        <div className="flex flex-col items-center gap-2 py-5 text-center">
          <span className="text-[32px] opacity-60">✦</span>
          <p className="m-0 text-[13px] leading-relaxed text-[#999]">
            Define your brand's voice, vibe, and personality
          </p>
          <button
            className="mt-2 cursor-pointer rounded-full border-none bg-coquette-soft-black px-6 py-2 text-[13px] font-semibold text-white transition-all duration-200 hover:-translate-y-px hover:bg-[#3a2533] hover:shadow-[0_4px_12px_rgba(35,22,31,0.2)]"
            onClick={() => navigate("/brand-profile/brand-brief/builder")}
          >
            Get Started
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="cursor-pointer rounded-2xl border border-[#f0f0f0] bg-white p-6 transition-all duration-250 hover:border-coquette-rose hover:shadow-[0_0_0_3px_rgba(245,166,201,0.12)]"
      onClick={onCardClick}
    >
      <div className="mb-5 flex items-center justify-between">
        <h3 className="m-0 text-sm font-bold uppercase tracking-[0.06em] text-coquette-soft-black">
          Brand Brief
        </h3>
        <div className="flex items-center gap-2">
          <button
            className="cursor-pointer rounded-full border-[1.5px] border-[#e0e0e0] bg-none px-3.5 py-1 text-xs font-semibold text-coquette-rose transition-all duration-200 hover:border-coquette-rose hover:bg-coquette-rose/6"
            onClick={(e) => {
              e.stopPropagation();
              navigate("/brand-profile/brand-brief/builder");
            }}
          >
            Edit
          </button>
          <button
            className="cursor-pointer rounded-full border-[1.5px] border-[#e57373] bg-none px-3.5 py-1 text-xs font-semibold text-[#e57373] transition-all duration-200 hover:border-[#e57373] hover:bg-[rgba(229,115,115,0.06)]"
            onClick={(e) => {
              e.stopPropagation();
              if (
                window.confirm(
                  "Are you sure you want to remove the brand brief? This action cannot be undone.",
                )
              ) {
                localStorage.removeItem("jelly_brand_brief");
                onBriefRemove();
              }
            }}
          >
            Remove
          </button>
        </div>
      </div>

      {brief.story?.oneLiner && (
        <p className="m-0 mb-4 text-[15px] font-medium italic leading-relaxed text-coquette-soft-black">
          "{brief.story.oneLiner}"
        </p>
      )}

      {brief.vibe?.colors && (
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-6 w-20 shrink-0 overflow-hidden rounded-md">
            {brief.vibe.colors.map((c: string, i: number) => (
              <div
                key={i}
                className="flex-1"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
          <span className="text-[13px] font-semibold text-[#555]">
            {brief.vibe.emoji} {brief.vibe.name}
          </span>
        </div>
      )}

      {brief.tones?.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-1.5">
          {brief.tones.map((t: string) => (
            <span
              key={t}
              className="rounded-full bg-coquette-soft-black px-3 py-1 text-[11px] font-semibold tracking-[0.02em] text-white"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      {brief.personality?.length > 0 && (
        <div className="mb-4 flex flex-col gap-2">
          {brief.personality.slice(0, 3).map((p: any, i: number) => (
            <div key={i} className="flex items-center gap-2.5">
              <span className="min-w-25 text-right text-[11px] whitespace-nowrap text-[#999] max-md:min-w-20 max-md:text-[10px]">
                {p.spectrum}
              </span>
              <div className="h-1 flex-1 overflow-hidden rounded bg-[#f0f0f0]">
                <div
                  className="h-full rounded bg-linear-to-r from-coquette-rose to-coquette-rose/35 transition-[width] duration-400 ease-out"
                  style={{ width: `${p.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {brief.pillars?.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {brief.pillars.map((p: string) => (
            <span
              key={p}
              className="rounded-full bg-coquette-rose/10 px-3 py-1 text-[11px] font-semibold text-coquette-soft-black"
            >
              {p}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
