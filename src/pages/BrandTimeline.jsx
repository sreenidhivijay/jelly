import { useState } from "react";
import { useNavigate } from "react-router-dom";

const progressCampaigns = [
  {
    id: "midnight-tea",
    title: "Midnight High Tea Drop",
    brand: "Velvet Petal Boutique",
    status: "Accepted",
    due: "Deliver by Dec 05",
    checklist: [
      { item: "Concept submitted", done: true },
      { item: "Shoot scheduled", done: true },
      { item: "Content upload", done: false },
    ],
  },
  {
    id: "noir-glow",
    title: "Noir Glow Capsule",
    brand: "Glow Cartel",
    status: "Applied",
    due: "Awaiting shortlist",
    checklist: [
      { item: "Application submitted", done: true },
      { item: "Awaiting response", done: false },
    ],
  },
];

const getRelativeMonth = (offset) => {
  const d = new Date();
  d.setDate(1);
  d.setMonth(d.getMonth() - offset);
  return d.toLocaleString("default", { month: "long", year: "numeric" });
};

const subscriptionHistory = [
  {
    month: getRelativeMonth(0),
    status: "Active",
    isActive: true,
    stats: [
      { type: "Reels", used: 0, total: 4 },
      { type: "Posts", used: 0, total: 8 },
      { type: "Stories", used: 4, total: 12 },
    ],
    details: {
      Reels: [
        {
          title: "Spring Launch Teaser",
          creator: "Aurora Blake",
          status: "In Progress",
        },
        { title: "Pending Reel 1", creator: "TBD", status: "Pending" },
        { title: "Pending Reel 2", creator: "TBD", status: "Pending" },
        { title: "Pending Reel 3", creator: "TBD", status: "Pending" },
      ],
      Posts: [
        {
          title: "Pastel Palette Reveal",
          creator: "Luna Sloane",
          status: "Drafting",
        },
        { title: "Moodboard Share", creator: "Luna Sloane", status: "Pending" },
        { title: "Pending Post 1", creator: "TBD", status: "Pending" },
        { title: "Pending Post 2", creator: "TBD", status: "Pending" },
        { title: "Pending Post 3", creator: "TBD", status: "Pending" },
        { title: "Pending Post 4", creator: "TBD", status: "Pending" },
        { title: "Pending Post 5", creator: "TBD", status: "Pending" },
        { title: "Pending Post 6", creator: "TBD", status: "Pending" },
      ],
      Stories: [
        { title: "Morning Coffee", creator: "Aurora Blake", status: "Posted" },
        { title: "Outfit Check", creator: "Aurora Blake", status: "Posted" },
        {
          title: "Poll: Pink or Blue?",
          creator: "Aurora Blake",
          status: "Posted",
        },
        { title: "Studio Tour", creator: "Aurora Blake", status: "Posted" },
        { title: "Pending Story 1", creator: "TBD", status: "Pending" },
        { title: "Pending Story 2", creator: "TBD", status: "Pending" },
        { title: "Pending Story 3", creator: "TBD", status: "Pending" },
        { title: "Pending Story 4", creator: "TBD", status: "Pending" },
        { title: "Pending Story 5", creator: "TBD", status: "Pending" },
        { title: "Pending Story 6", creator: "TBD", status: "Pending" },
        { title: "Pending Story 7", creator: "TBD", status: "Pending" },
        { title: "Pending Story 8", creator: "TBD", status: "Pending" },
      ],
    },
  },
  {
    month: getRelativeMonth(1),
    status: "Completed",
    isActive: false,
    stats: [
      { type: "Reels", used: 4, total: 4 },
      { type: "Posts", used: 8, total: 8 },
      { type: "Stories", used: 12, total: 12 },
    ],
    details: {
      Reels: [
        {
          title: "Valentine's Day Campaign",
          creator: "Rose Red",
          status: "Posted",
        },
        {
          title: "Winter Skincare Routine",
          creator: "Glow Up",
          status: "Posted",
        },
        { title: "Cozy Home Tour", creator: "Homebody", status: "Posted" },
        {
          title: "February Favorites",
          creator: "Trend Setter",
          status: "Posted",
        },
      ],
      Posts: [
        { title: "Love is in the Air", creator: "Rose Red", status: "Posted" },
        {
          title: "Galentine's Brunch",
          creator: "Social Bee",
          status: "Posted",
        },
        {
          title: "Product Flatlay",
          creator: "Aesthetic Lens",
          status: "Posted",
        },
        { title: "Quote of the Day", creator: "Mindful", status: "Posted" },
        {
          title: "Outfit of the Night",
          creator: "Fashion Fwd",
          status: "Posted",
        },
        { title: "Coffee Art", creator: "Barista Vibes", status: "Posted" },
        { title: "Weekend Plans", creator: "Adventurer", status: "Posted" },
        { title: "Month in Review", creator: "Planner", status: "Posted" },
      ],
      Stories: [
        {
          title: "Flash Sale Countdown",
          creator: "Aurora Blake",
          status: "Posted",
        },
        {
          title: "Behind the Scenes",
          creator: "Aurora Blake",
          status: "Posted",
        },
        { title: "Q&A Session", creator: "Glow Up", status: "Posted" },
        {
          title: "Poll: Chocolate or Flowers?",
          creator: "Social Bee",
          status: "Posted",
        },
        { title: "Unboxing", creator: "Trend Setter", status: "Posted" },
        { title: "Daily Vlog", creator: "Vlogger Life", status: "Posted" },
        { title: "Flash Sale Alert", creator: "Brand Brand", status: "Posted" },
        {
          title: "Customer Repost",
          creator: "Community Mgr",
          status: "Posted",
        },
        { title: "Team Lunch", creator: "Office Life", status: "Posted" },
        { title: "Morning Routine", creator: "Early Bird", status: "Posted" },
        { title: "Gym Fit", creator: "Fit Fam", status: "Posted" },
        { title: "Recipe Share", creator: "Foodie", status: "Posted" },
        { title: "Goodnight", creator: "Sleepy", status: "Posted" },
      ],
    },
  },
  {
    month: getRelativeMonth(2),
    status: "Completed",
    isActive: false,
    stats: [],
    details: {},
  },
];

export default function BrandTimeline() {
  const navigate = useNavigate();
  const [expandedMonth, setExpandedMonth] = useState(
    subscriptionHistory[0]?.month,
  );
  const [filter, setFilter] = useState("All");
  return (
    <div className="mx-auto mt-15 mb-35 max-w-[1100px] px-6 max-md:px-4 max-md:pt-6 max-md:pb-15">
      {/* Header */}
      <div className="mb-9 border-b border-black/8 pb-9">
        <div className="flex items-center gap-6 max-md:gap-3.5">
          <div className="flex-1">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#666]">
              Campaign Timeline
            </span>
            <h1 className="my-4 text-[32px] font-extrabold tracking-tight text-coquette-soft-black max-md:text-xl">
              Velvet Petal Boutique
            </h1>
            <p className="m-0 py-1.5 text-base leading-relaxed text-black">
              Track your campaign progress and content delivery across months.
            </p>
          </div>
        </div>
      </div>

      {/* Timeline content */}
      <div className="flex flex-col gap-5">
        {(() => {
          const historyByYear = subscriptionHistory.reduce((acc, period) => {
            const year = Number(period.month.split(" ").pop());
            if (!year) return acc;
            if (!acc[year]) acc[year] = [];
            acc[year].push(period);
            return acc;
          }, {});

          return Object.keys(historyByYear)
            .sort((a, b) => b - a)
            .map((year) => (
              <div key={year}>
                <h3 className="mt-8 mb-4 text-xl font-bold text-[#333] first:mt-0">
                  {year}
                </h3>
                <div className="flex flex-col gap-5">
                  {historyByYear[year].map((period) => (
                    <div
                      key={period.month}
                      className={`cursor-pointer overflow-hidden rounded-xl border bg-white ${
                        period.isActive
                          ? "border-black shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
                          : "border-[#eee]"
                      }`}
                      onClick={() =>
                        setExpandedMonth(
                          expandedMonth === period.month ? null : period.month,
                        )
                      }
                    >
                      {/* Month header */}
                      <div className="flex items-center justify-between border-b border-[#eee] bg-[#f9f9f9] px-6 py-4">
                        <div>
                          <h3 className="m-0 text-[1.1rem] font-semibold">
                            {period.month}
                          </h3>
                          <span
                            className={`text-[0.85rem] font-semibold uppercase tracking-[0.05em] ${
                              period.isActive ? "text-[#267060]" : "text-[#888]"
                            }`}
                          >
                            {period.status}
                          </span>
                        </div>
                        {period.stats && (
                          <div className="flex items-center gap-2">
                            {period.stats.map((stat, i) => (
                              <span
                                key={i}
                                className="rounded-full border border-black/10 bg-white px-2.5 py-1 text-[0.8rem] text-[#666]"
                              >
                                <strong className="text-black">
                                  {stat.used}/{stat.total}
                                </strong>{" "}
                                {stat.type}
                              </span>
                            ))}
                            <span className="ml-2 w-5 text-center text-[1.2rem] text-[#999]">
                              {expandedMonth === period.month ? "−" : "+"}
                            </span>
                          </div>
                        )}
                      </div>

                      {expandedMonth === period.month && period.details && (
                        <div onClick={(e) => e.stopPropagation()}>
                          {/* Filters */}
                          <div className="flex gap-2 bg-white px-6 pt-3">
                            {["All", "Completed", "Pending"].map((f) => (
                              <button
                                key={f}
                                className={`cursor-pointer rounded-[20px] border px-3.5 py-1.5 text-[0.8rem] transition-all duration-200 ${
                                  filter === f
                                    ? "border-black bg-black text-white"
                                    : "border-[#eee] bg-white text-[#666]"
                                }`}
                                onClick={() => setFilter(f)}
                              >
                                {f}
                              </button>
                            ))}
                          </div>

                          {/* Details grid */}
                          <div className="grid grid-cols-3 gap-px border-t border-[#eee] bg-[#eee]">
                            {["Reels", "Posts", "Stories"].map((type) => {
                              const items = (
                                period.details[type] || []
                              ).filter((item) => {
                                if (filter === "All") return true;
                                const isCompleted = [
                                  "Posted",
                                  "Completed",
                                  "Delivered",
                                ].includes(item.status);
                                return filter === "Completed"
                                  ? isCompleted
                                  : !isCompleted;
                              });

                              return (
                                <div key={type} className="bg-white p-4">
                                  <h4 className="m-0 mb-3 text-[0.9rem] uppercase tracking-[0.05em] text-[#888]">
                                    {type}
                                  </h4>
                                  <div className="flex flex-col gap-3">
                                    {items.length > 0 ? (
                                      items.map((item, i) => (
                                        <div
                                          key={i}
                                          className="rounded-lg bg-[#fafafa] p-3"
                                        >
                                          <h5 className="m-0 mb-1 text-[0.95rem]">
                                            {item.title}
                                          </h5>
                                          <p className="m-0 mb-2 text-[0.85rem] text-[#666]">
                                            with {item.creator}
                                          </p>
                                          <span className="text-xs font-semibold text-[#267060]">
                                            {item.status}
                                          </span>
                                        </div>
                                      ))
                                    ) : (
                                      <div className="text-[0.85rem] italic text-[#ccc]">
                                        No {filter.toLowerCase()} content
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ));
        })()}
      </div>
    </div>
  );
}
