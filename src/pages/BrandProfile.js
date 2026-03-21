import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BrandProfile.css";
import profilePic from "../assets/profile-pic.jpg";
import BrandBriefSection from "../components/BrandBriefSection";
import brandService from "../services/brandService";

const brandSummary = {
  name: "Velvet Petal Boutique",
  tagline:
    "Luxury tea salon curating high tea rituals for the afterhours crowd.",
  stats: {
    leadCampaign: "Midnight High Tea Drop",
    budget: "$25k launch",
    needs: "Reels + Story suites",
  },
};

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

function BrandProfile() {
  const [bio, setBio] = useState(
    "We are sourcing dreamy storytellers who can film neon-lit tea rituals, slow pour shots, and ASMR garnish prep.",
  );
  const [brandProfile, setBrandProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedMonth, setExpandedMonth] = useState(
    subscriptionHistory[0]?.month,
  );
  const [filter, setFilter] = useState("All");

  const tier = {
    name: "Mid",
    price: "$999",
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await brandService.getProfile();
        setBrandProfile(data);
        if (data.bio) setBio(data.bio);
      } catch (error) {
        console.error("Failed to load profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const bioTimerRef = useRef(null);

  const handleBioChange = (event) => {
    const value = event.target.value;
    setBio(value);
    clearTimeout(bioTimerRef.current);
    bioTimerRef.current = setTimeout(async () => {
      try {
        await brandService.updateProfile({ bio: value });
      } catch (error) {
        console.error("Failed to save bio:", error);
      }
    }, 500);
  };

  const handlePhotoUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const brandData = await brandService.uploadProfilePhoto(file);
      setBrandProfile((prev) => ({
        ...prev,
        profile_image_url: brandData.profile_image_url,
      }));
    } catch (error) {
      console.error("Failed to upload photo:", error);
    }
    event.target.value = "";
  };

  if (loading) {
    return (
      <div className="creator-profile-page">
        <header className="creator-profile-header brand-profile-header">
          <div className="brand-header-row">
            <div
              className="skeleton skeleton-avatar"
              style={{ width: 100, height: 100, borderRadius: 24 }}
            />
            <div>
              <div
                className="skeleton skeleton-line"
                style={{ width: 100, height: 12 }}
              />
              <div
                className="skeleton skeleton-line"
                style={{ width: 200, height: 24, marginTop: 16 }}
              />
              <div
                className="skeleton skeleton-line"
                style={{ width: 280, height: 14, marginTop: 12 }}
              />
            </div>
          </div>
          <div className="stats-grid">
            {[1, 2, 3].map((i) => (
              <div key={i}>
                <div
                  className="skeleton skeleton-line"
                  style={{ width: 100, height: 11 }}
                />
                <div
                  className="skeleton skeleton-line"
                  style={{ width: 140, height: 16, marginTop: 6 }}
                />
              </div>
            ))}
          </div>
        </header>
        <section className="signature-packages">
          <div className="section-heading">
            <div
              className="skeleton skeleton-line"
              style={{ width: 200, height: 28 }}
            />
            <div
              className="skeleton skeleton-line"
              style={{ width: "70%", height: 14 }}
            />
          </div>
          <div className="package-grid">
            {[1, 2, 3].map((i) => (
              <div key={i} className="package-card">
                <div
                  className="skeleton skeleton-line"
                  style={{ width: "70%", height: 18 }}
                />
                <div
                  className="skeleton skeleton-line"
                  style={{ width: "100%", height: 14 }}
                />
                <div
                  className="skeleton skeleton-line"
                  style={{ width: "50%", height: 14 }}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="creator-profile-page">
      {/* {!isVerified && (
        <div className="verification-banner">
          <span className="verification-banner-icon">⚠</span>
          <div className="verification-banner-text">
            <strong>Your account is not verified</strong>
            <p>Please verify your account to unlock all features and start collaborating with creators.</p>
          </div>
        </div>
      )} */}
      <header className="creator-profile-header brand-profile-header">
        <div className="brand-header-row">
          <button
            type="button"
            className="brand-avatar-button"
            onClick={() => fileInputRef.current?.click()}
          >
            <img
              src={brandProfile?.profile_image_url || profilePic}
              alt={`${brandSummary.name} profile`}
            />
          </button>
          <div>
            <span className="eyebrow">Brand profile</span>
            <h1>{brandSummary.name}</h1>
            <p>{brandSummary.tagline}</p>
          </div>
        </div>
        <div className="stats-grid">
          <div>
            <span className="metric-label">Current Subscription</span>
            <span className="metric-value">
              {tier.name} ({tier.price}/mo)
            </span>
            <button
              onClick={() => navigate("/subscription")}
              style={{
                background: "none",
                border: "none",
                color: "#666",
                textDecoration: "underline",
                fontSize: "11px",
                cursor: "pointer",
                padding: 0,
                display: "block",
                marginTop: "4px",
              }}
            >
              Manage Subscription
            </button>
          </div>
          <div>
            <span className="metric-label">Budget</span>
            <span className="metric-value">{brandSummary.stats.budget}</span>
          </div>
          <div>
            <span className="metric-label">Needs</span>
            <span className="metric-value">{brandSummary.stats.needs}</span>
          </div>
        </div>
      </header>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handlePhotoUpload}
      />

      <div className="profile-tabs">
        <button
          className={`profile-tab ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className={`profile-tab ${activeTab === "timeline" ? "active" : ""}`}
          onClick={() => setActiveTab("timeline")}
        >
          Campaign Timeline
        </button>
      </div>

      <div className="profile-content">
        {activeTab === "overview" && <BrandBriefSection />}

        {activeTab === "timeline" && (
          <section className="timeline-section">
            <div className="timeline-container">
              {(() => {
                const historyByYear = subscriptionHistory.reduce(
                  (acc, period) => {
                    const year = period.month.split(" ").pop();
                    if (!acc[year]) acc[year] = [];
                    acc[year].push(period);
                    return acc;
                  },
                  {},
                );

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
                                expandedMonth === period.month
                                  ? null
                                  : period.month,
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

                            {expandedMonth === period.month &&
                              period.details && (
                                <div
                                  className="month-details-wrapper"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <div className="timeline-filters">
                                    {["All", "Completed", "Pending"].map(
                                      (f) => (
                                        <button
                                          key={f}
                                          className={`filter-pill ${filter === f ? "active" : ""}`}
                                          onClick={() => setFilter(f)}
                                        >
                                          {f}
                                        </button>
                                      ),
                                    )}
                                  </div>
                                  <div className="month-details-grid">
                                    {["Reels", "Posts", "Stories"].map(
                                      (type) => (
                                        <div
                                          key={type}
                                          className="detail-column"
                                        >
                                          <h4>{type}</h4>
                                          <div className="detail-list">
                                            {(
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
                                            }).length > 0 ? (
                                              (period.details[type] || [])
                                                .filter((item) => {
                                                  if (filter === "All")
                                                    return true;
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
                                                  <div
                                                    key={i}
                                                    className="detail-card"
                                                  >
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
                                                No {filter.toLowerCase()}{" "}
                                                content
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      ),
                                    )}
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
          </section>
        )}
      </div>
    </div>
  );
}

export default BrandProfile;
