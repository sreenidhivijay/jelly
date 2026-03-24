import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BrandProfile.css";

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
    <div className="bp-page">
      {/* Header */}
      <div className="bp-header">
        <div className="bp-header-row">
          <div className="bp-header-info">
            <span className="bp-eyebrow">Campaign Timeline</span>
            <h1>Velvet Petal Boutique</h1>
            <p>Track your campaign progress and content delivery across months.</p>
          </div>
        </div>
      </div>

      {/* Timeline content */}
      <div className="timeline-container">
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
              <div key={year} className="timeline-year-group">
                <h3 className="timeline-year-title">{year}</h3>
                <div className="timeline-year-cards">
                  {historyByYear[year].map((period) => (
                    <div
                      key={period.month}
                      className={`timeline-month-card ${period.isActive ? "active-month" : ""}`}
                      onClick={() =>
                        setExpandedMonth(
                          expandedMonth === period.month ? null : period.month,
                        )
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <div className="month-header">
                        <div>
                          <h3>{period.month}</h3>
                          <span
                            className={`month-status ${period.isActive ? "current" : ""}`}
                          >
                            {period.status}
                          </span>
                        </div>
                        {period.stats && (
                          <div className="month-summary-pills">
                            {period.stats.map((stat, i) => (
                              <span key={i} className="summary-pill">
                                <strong>
                                  {stat.used}/{stat.total}
                                </strong>{" "}
                                {stat.type}
                              </span>
                            ))}
                            <span className="expand-icon">
                              {expandedMonth === period.month ? "−" : "+"}
                            </span>
                          </div>
                        )}
                      </div>

                      {expandedMonth === period.month && period.details && (
                        <div
                          className="month-details-wrapper"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="timeline-filters">
                            {["All", "Completed", "Pending"].map((f) => (
                              <button
                                key={f}
                                className={`filter-pill ${filter === f ? "active" : ""}`}
                                onClick={() => setFilter(f)}
                              >
                                {f}
                              </button>
                            ))}
                          </div>
                          <div className="month-details-grid">
                            {["Reels", "Posts", "Stories"].map((type) => (
                              <div key={type} className="detail-column">
                                <h4>{type}</h4>
                                <div className="detail-list">
                                  {(period.details[type] || []).filter(
                                    (item) => {
                                      if (filter === "All") return true;
                                      const isCompleted = [
                                        "Posted",
                                        "Completed",
                                        "Delivered",
                                      ].includes(item.status);
                                      return filter === "Completed"
                                        ? isCompleted
                                        : !isCompleted;
                                    },
                                  ).length > 0 ? (
                                    (period.details[type] || [])
                                      .filter((item) => {
                                        if (filter === "All") return true;
                                        const isCompleted = [
                                          "Posted",
                                          "Completed",
                                          "Delivered",
                                        ].includes(item.status);
                                        return filter === "Completed"
                                          ? isCompleted
                                          : !isCompleted;
                                      })
                                      .map((item, i) => (
                                        <div key={i} className="detail-card">
                                          <h5>{item.title}</h5>
                                          <p>with {item.creator}</p>
                                          <span
                                            className={`status-text ${item.status.toLowerCase().replace(" ", "-")}`}
                                          >
                                            {item.status}
                                          </span>
                                        </div>
                                      ))
                                  ) : (
                                    <div className="empty-category">
                                      No {filter.toLowerCase()} content
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
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
