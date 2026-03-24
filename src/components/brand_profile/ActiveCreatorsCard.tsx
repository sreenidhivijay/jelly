import { useNavigate } from "react-router-dom";

const activeCreators = [
  {
    name: "Aurora Blake",
    role: "Reels + Stories",
    status: "Active",
    color: "#f5a6c9",
  },
  { name: "Luna Sloane", role: "Posts", status: "Drafting", color: "#a2d2ff" },
  { name: "Rose Red", role: "Reels", status: "Pending", color: "#cdb4db" },
];

const statusClasses: Record<string, string> = {
  active: "bg-[rgba(46,125,91,0.08)] text-[#2e7d5b]",
  drafting: "bg-[rgba(199,125,0,0.08)] text-[#c77d00]",
  pending: "bg-[#f5f5f5] text-[#888]",
};

export default function ActiveCreatorsCard() {
  const navigate = useNavigate();

  return (
    <div
      className="cursor-pointer rounded-2xl border border-[#f0f0f0] bg-white p-6 transition-all duration-200 hover:border-[#e0e0e0] hover:-translate-y-px hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
      onClick={() => navigate("/your-creators")}
    >
      <div className="mb-5 flex items-center justify-between">
        <h3 className="m-0 text-sm font-bold uppercase tracking-[0.06em] text-coquette-soft-black">
          Active Creators
        </h3>
        <span className="text-xs font-semibold tracking-[0.02em] text-coquette-rose">
          View All
        </span>
      </div>
      <div className="flex flex-col gap-3">
        {activeCreators.map((c) => (
          <div key={c.name} className="flex items-center gap-3">
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] text-xs font-bold text-white"
              style={{ background: c.color }}
            >
              {c.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div className="flex flex-1 flex-col">
              <span className="text-[13px] font-semibold text-coquette-soft-black">
                {c.name}
              </span>
              <span className="text-[11px] text-[#aaa]">{c.role}</span>
            </div>
            <span
              className={`rounded-full px-2.5 py-0.75 text-[11px] font-semibold uppercase tracking-[0.04em] ${statusClasses[c.status.toLowerCase()]}`}
            >
              {c.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
