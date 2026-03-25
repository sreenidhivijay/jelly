export default function BrandBriefModal({ brief, onClose, onEdit }) {
  if (!brief) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex animate-fade-in items-center justify-center bg-black/40 p-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="flex max-h-[80vh] w-full max-w-[600px] animate-slide-up flex-col rounded-[20px] bg-white shadow-[0_24px_48px_rgba(0,0,0,0.12)] max-md:max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-[#f0f0f0] px-7 pt-6 pb-4">
          <h2 className="m-0 text-lg font-extrabold text-coquette-soft-black">
            Brand Brief
          </h2>
          <div className="flex items-center gap-2">
            <button
              className="cursor-pointer rounded-full border-[1.5px] border-[#e0e0e0] bg-none px-4 py-[5px] text-xs font-semibold text-coquette-rose transition-all duration-200 hover:border-coquette-rose hover:bg-coquette-rose/6"
              onClick={onEdit}
            >
              Edit
            </button>
            <button
              className="cursor-pointer border-none bg-none px-1 text-2xl leading-none text-[#bbb] transition-colors duration-150 hover:text-[#666]"
              onClick={onClose}
            >
              ×
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="overflow-y-auto px-7 pt-2 pb-7">
          {/* Story */}
          {(brief.story?.oneLiner || brief.story?.mission) && (
            <div className="border-b border-[#f5f5f5] py-5 last:border-b-0 last:pb-0">
              <h3 className="m-0 mb-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-coquette-rose">
                Brand Story
              </h3>
              {brief.story.oneLiner && (
                <p className="mb-3 text-base font-semibold italic text-coquette-soft-black">
                  "{brief.story.oneLiner}"
                </p>
              )}
              {brief.story.mission && (
                <p className="my-1 text-sm leading-relaxed text-[#555]">
                  <strong>Mission:</strong> {brief.story.mission}
                </p>
              )}
              {brief.story.audience && (
                <p className="my-1 text-sm leading-relaxed text-[#555]">
                  <strong>Dream customer:</strong> {brief.story.audience}
                </p>
              )}
              {brief.story.uniqueness && (
                <p className="my-1 text-sm leading-relaxed text-[#555]">
                  <strong>What sets us apart:</strong> {brief.story.uniqueness}
                </p>
              )}
            </div>
          )}

          {/* Personality */}
          {brief.personality?.length > 0 && (
            <div className="border-b border-[#f5f5f5] py-5 last:border-b-0 last:pb-0">
              <h3 className="m-0 mb-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-coquette-rose">
                Brand Personality
              </h3>
              <div className="flex flex-col gap-3">
                {brief.personality.map((p: any, i: number) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 max-md:flex-wrap"
                  >
                    <span className="min-w-30 text-right text-[11px] text-[#999] whitespace-nowrap max-md:min-w-auto max-md:w-full max-md:text-left">
                      {p.spectrum}
                    </span>
                    <div className="relative h-[5px] flex-1 rounded-[5px] bg-[#f0f0f0]">
                      <div
                        className="h-full rounded-[5px] bg-linear-to-r from-coquette-rose to-coquette-rose/30"
                        style={{ width: `${p.value}%` }}
                      />
                      <div
                        className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-coquette-rose shadow-[0_1px_4px_rgba(245,166,201,0.4)]"
                        style={{ left: `${p.value}%` }}
                      />
                    </div>
                    <span className="min-w-[90px] text-[11px] font-semibold text-coquette-soft-black">
                      {p.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Voice & Tone */}
          {brief.tones?.length > 0 && (
            <div className="border-b border-[#f5f5f5] py-5 last:border-b-0 last:pb-0">
              <h3 className="m-0 mb-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-coquette-rose">
                Voice & Tone
              </h3>
              <div className="mb-3.5 flex flex-wrap gap-1.5">
                {brief.tones.map((t: string) => (
                  <span
                    key={t}
                    className="rounded-full bg-coquette-soft-black px-3.5 py-[5px] text-xs font-semibold text-white"
                  >
                    {t}
                  </span>
                ))}
              </div>
              {brief.toneExamples?.weSay && (
                <div className="mt-2 rounded-[10px] border-l-[3px] border-[#4caf50] bg-[rgba(76,175,80,0.06)] px-3.5 py-2.5 text-[13px] leading-relaxed">
                  <strong>We say:</strong> "{brief.toneExamples.weSay}"
                </div>
              )}
              {brief.toneExamples?.notWeSay && (
                <div className="mt-2 rounded-[10px] border-l-[3px] border-[#e57373] bg-[rgba(229,115,115,0.06)] px-3.5 py-2.5 text-[13px] leading-relaxed">
                  <strong>We'd never say:</strong> "
                  {brief.toneExamples.notWeSay}"
                </div>
              )}
            </div>
          )}

          {/* Visual Vibe */}
          {brief.vibe && (
            <div className="border-b border-[#f5f5f5] py-5 last:border-b-0 last:pb-0">
              <h3 className="m-0 mb-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-coquette-rose">
                Visual Vibe
              </h3>
              <div className="flex items-center gap-3.5">
                <div className="flex h-9 w-20 shrink-0 overflow-hidden rounded-lg">
                  {brief.vibe.colors.map((c: string, i: number) => (
                    <div key={i} style={{ backgroundColor: c, flex: 1 }} />
                  ))}
                </div>
                <div>
                  <strong className="text-sm text-coquette-soft-black">
                    {brief.vibe.emoji} {brief.vibe.name}
                  </strong>
                  <p className="mt-0.5 text-xs text-[#999]">
                    {brief.vibe.desc}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Content Pillars */}
          {brief.pillars?.length > 0 && (
            <div className="border-b border-[#f5f5f5] py-5 last:border-b-0 last:pb-0">
              <h3 className="m-0 mb-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-coquette-rose">
                Content Pillars
              </h3>
              <div className="flex flex-col gap-2">
                {brief.pillars.map((p: string, i: number) => (
                  <div
                    key={p}
                    className="flex items-center gap-2.5 text-[13px] text-[#555]"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-coquette-rose/15 text-xs font-bold text-coquette-rose">
                      {i + 1}
                    </span>
                    {p}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Do's & Don'ts */}
          {(brief.dos?.length > 0 || brief.donts?.length > 0) && (
            <div className="border-b border-[#f5f5f5] py-5 last:border-b-0 last:pb-0">
              <h3 className="m-0 mb-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-coquette-rose">
                Do's & Don'ts
              </h3>
              <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                {brief.dos?.length > 0 && (
                  <div>
                    {brief.dos.map((d: string) => (
                      <div
                        key={d}
                        className="flex items-start gap-2 py-1 text-[13px] leading-relaxed text-[#555]"
                      >
                        <span className="shrink-0 font-bold text-[#4caf50]">
                          ✓
                        </span>{" "}
                        {d}
                      </div>
                    ))}
                  </div>
                )}
                {brief.donts?.length > 0 && (
                  <div>
                    {brief.donts.map((d: string) => (
                      <div
                        key={d}
                        className="flex items-start gap-2 py-1 text-[13px] leading-relaxed text-[#555]"
                      >
                        <span className="shrink-0 font-bold text-[#e57373]">
                          ✗
                        </span>{" "}
                        {d}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
