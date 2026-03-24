import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./BrandProfile.css";
import profilePic from "../assets/profile-pic.jpg";
import {
  useBrandProfile,
  useUpdateBrandProfile,
  useUploadBrandPhoto,
} from "../hooks/useBrand";

const NICHE_OPTIONS = [
  "Fashion/Lifestyle",
  "Wellness",
  "Food",
  "Tech",
  "Beauty/Makeup",
];

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

const currentMonthStats = [
  { type: "Reels", used: 1, total: 4 },
  { type: "Posts", used: 2, total: 8 },
  { type: "Stories", used: 4, total: 12 },
];

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

const skuKits = [
  { id: 1, name: "Midnight High Tea Drop", niche: "Food", status: "Active" },
  { id: 2, name: "Noir Glow Capsule", niche: "Beauty/Makeup", status: "Draft" },
];

function BrandBriefModal({ brief, onClose, onEdit }) {
  if (!brief) return null;

  return (
    <div className="bp-modal-overlay" onClick={onClose}>
      <div className="bp-modal" onClick={(e) => e.stopPropagation()}>
        <div className="bp-modal-header">
          <h2>Brand Brief</h2>
          <div className="bp-modal-actions">
            <button className="bp-modal-edit-btn" onClick={onEdit}>
              Edit
            </button>
            <button className="bp-modal-close" onClick={onClose}>
              ×
            </button>
          </div>
        </div>
        <div className="bp-modal-body">
          {/* Story */}
          {(brief.story?.oneLiner || brief.story?.mission) && (
            <div className="bp-modal-section">
              <h3>Brand Story</h3>
              {brief.story.oneLiner && (
                <p className="bp-modal-quote">"{brief.story.oneLiner}"</p>
              )}
              {brief.story.mission && (
                <p>
                  <strong>Mission:</strong> {brief.story.mission}
                </p>
              )}
              {brief.story.audience && (
                <p>
                  <strong>Dream customer:</strong> {brief.story.audience}
                </p>
              )}
              {brief.story.uniqueness && (
                <p>
                  <strong>What sets us apart:</strong> {brief.story.uniqueness}
                </p>
              )}
            </div>
          )}

          {/* Personality */}
          {brief.personality?.length > 0 && (
            <div className="bp-modal-section">
              <h3>Brand Personality</h3>
              <div className="bp-modal-spectrums">
                {brief.personality.map((p, i) => (
                  <div key={i} className="bp-modal-spectrum">
                    <span className="bp-modal-spectrum-label">
                      {p.spectrum}
                    </span>
                    <div className="bp-modal-bar-track">
                      <div
                        className="bp-modal-bar-fill"
                        style={{ width: `${p.value}%` }}
                      />
                      <div
                        className="bp-modal-bar-dot"
                        style={{ left: `${p.value}%` }}
                      />
                    </div>
                    <span className="bp-modal-spectrum-value">{p.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Voice & Tone */}
          {brief.tones?.length > 0 && (
            <div className="bp-modal-section">
              <h3>Voice & Tone</h3>
              <div className="bp-modal-tags">
                {brief.tones.map((t) => (
                  <span key={t} className="bp-modal-tag">
                    {t}
                  </span>
                ))}
              </div>
              {brief.toneExamples?.weSay && (
                <div className="bp-modal-example say">
                  <strong>We say:</strong> "{brief.toneExamples.weSay}"
                </div>
              )}
              {brief.toneExamples?.notWeSay && (
                <div className="bp-modal-example no-say">
                  <strong>We'd never say:</strong> "
                  {brief.toneExamples.notWeSay}"
                </div>
              )}
            </div>
          )}

          {/* Visual Vibe */}
          {brief.vibe && (
            <div className="bp-modal-section">
              <h3>Visual Vibe</h3>
              <div className="bp-modal-vibe">
                <div className="bp-modal-vibe-colors">
                  {brief.vibe.colors.map((c, i) => (
                    <div key={i} style={{ backgroundColor: c, flex: 1 }} />
                  ))}
                </div>
                <div>
                  <strong>
                    {brief.vibe.emoji} {brief.vibe.name}
                  </strong>
                  <p>{brief.vibe.desc}</p>
                </div>
              </div>
            </div>
          )}

          {/* Content Pillars */}
          {brief.pillars?.length > 0 && (
            <div className="bp-modal-section">
              <h3>Content Pillars</h3>
              <div className="bp-modal-pillars">
                {brief.pillars.map((p, i) => (
                  <div key={p} className="bp-modal-pillar">
                    <span className="bp-modal-pillar-num">{i + 1}</span>
                    {p}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Do's & Don'ts */}
          {(brief.dos?.length > 0 || brief.donts?.length > 0) && (
            <div className="bp-modal-section">
              <h3>Do's & Don'ts</h3>
              <div className="bp-modal-dd">
                {brief.dos?.length > 0 && (
                  <div className="bp-modal-dd-col">
                    {brief.dos.map((d) => (
                      <div key={d} className="bp-modal-do">
                        <span>✓</span> {d}
                      </div>
                    ))}
                  </div>
                )}
                {brief.donts?.length > 0 && (
                  <div className="bp-modal-dd-col">
                    {brief.donts.map((d) => (
                      <div key={d} className="bp-modal-dont">
                        <span>✗</span> {d}
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

function BrandBriefPreview({ brief, navigate, onCardClick, onBriefRemove }) {
  if (!brief) {
    return (
      <div className="bp-card bp-card-brief bp-card-empty">
        <div className="bp-card-header">
          <h3>Brand Brief</h3>
        </div>
        <div className="bp-empty-state">
          <span className="bp-empty-icon">✦</span>
          <p>Define your brand's voice, vibe, and personality</p>
          <button
            className="bp-empty-cta"
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
      className="bp-card bp-card-brief bp-card-brief-filled"
      onClick={onCardClick}
    >
      <div className="bp-card-header">
        <h3>Brand Brief</h3>
        <button
          className="bp-card-action-btn ml-auto"
          onClick={(e) => {
            e.stopPropagation();
            navigate("/brand-profile/brand-brief/builder");
          }}
        >
          Edit
        </button>
        <button
          className="bp-card-action-btn error ml-2"
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

      {brief.story?.oneLiner && (
        <p className="bp-brief-quote">"{brief.story.oneLiner}"</p>
      )}

      {brief.vibe?.colors && (
        <div className="bp-brief-vibe">
          <div className="bp-vibe-strip">
            {brief.vibe.colors.map((c, i) => (
              <div
                key={i}
                className="bp-vibe-swatch"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
          <span className="bp-vibe-name">
            {brief.vibe.emoji} {brief.vibe.name}
          </span>
        </div>
      )}

      {brief.tones?.length > 0 && (
        <div className="bp-brief-tones">
          {brief.tones.map((t) => (
            <span key={t} className="bp-tone-tag">
              {t}
            </span>
          ))}
        </div>
      )}

      {brief.personality?.length > 0 && (
        <div className="bp-brief-bars">
          {brief.personality.slice(0, 3).map((p, i) => (
            <div key={i} className="bp-mini-bar-row">
              <span className="bp-mini-bar-label">{p.spectrum}</span>
              <div className="bp-mini-bar-track">
                <div
                  className="bp-mini-bar-fill"
                  style={{ width: `${p.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {brief.pillars?.length > 0 && (
        <div className="bp-brief-pillars">
          {brief.pillars.map((p) => (
            <span key={p} className="bp-pillar-chip">
              {p}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

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
  const [showNichePicker, setShowNichePicker] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [editingDesc, setEditingDesc] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [descValue, setDescValue] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const descInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const { data: brandProfile, isLoading: loading } = useBrandProfile();
  const updateProfile = useUpdateBrandProfile();
  const uploadPhoto = useUploadBrandPhoto();

  const startEditingName = () => {
    setNameValue(brandProfile?.company_name || "");
    setEditingName(true);
    setTimeout(() => nameInputRef.current?.focus(), 0);
  };

  const saveName = () => {
    const trimmed = nameValue.trim();
    if (trimmed && trimmed !== brandProfile?.company_name) {
      updateProfile.mutate({ company_name: trimmed });
    }
    setEditingName(false);
  };

  const startEditingDesc = () => {
    setDescValue(brandProfile?.description || "");
    setEditingDesc(true);
    setTimeout(() => descInputRef.current?.focus(), 0);
  };

  const saveDesc = () => {
    const trimmed = descValue.trim();
    if (trimmed !== (brandProfile?.description || "")) {
      updateProfile.mutate({ description: trimmed || null });
    }
    setEditingDesc(false);
  };

  const handlePhotoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    uploadPhoto.mutate(file);
    event.target.value = "";
  };

  if (loading || !brandProfile) {
    return (
      <div className="bp-page">
        <div className="bp-header">
          <div className="bp-header-row">
            <div
              className="skeleton"
              style={{ width: 88, height: 88, borderRadius: 22 }}
            />
            <div style={{ flex: 1 }}>
              <div
                className="skeleton"
                style={{ width: 120, height: 12, marginBottom: 12 }}
              />
              <div
                className="skeleton"
                style={{ width: 220, height: 24, marginBottom: 8 }}
              />
              <div className="skeleton" style={{ width: 300, height: 14 }} />
            </div>
          </div>
        </div>
        <div className="bp-grid">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bp-card" style={{ minHeight: 180 }}>
              <div
                className="skeleton"
                style={{ width: "60%", height: 16, marginBottom: 16 }}
              />
              <div
                className="skeleton"
                style={{ width: "100%", height: 40, marginBottom: 12 }}
              />
              <div className="skeleton" style={{ width: "80%", height: 14 }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bp-page">
      {/* Header */}
      <div className="bp-header">
        <div className="bp-header-row">
          <button
            type="button"
            className="bp-avatar-btn"
            onClick={() => fileInputRef.current?.click()}
          >
            <img
              src={brandProfile?.profile_image_url || profilePic}
              alt={brandProfile?.company_name || "Brand Avatar"}
            />
          </button>
          <div className="bp-header-info">
            <span className="bp-eyebrow">Brand profile</span>
            {editingName ? (
              <input
                ref={nameInputRef}
                className="bp-inline-edit bp-inline-edit-name"
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
                onBlur={saveName}
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveName();
                  if (e.key === "Escape") setEditingName(false);
                }}
              />
            ) : (
              <h1 onClick={startEditingName} className="bp-editable">
                {brandProfile?.company_name || "Brand Name"}
              </h1>
            )}
            {editingDesc ? (
              <input
                ref={descInputRef}
                className="bp-inline-edit bp-inline-edit-desc"
                value={descValue}
                onChange={(e) => setDescValue(e.target.value)}
                onBlur={saveDesc}
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveDesc();
                  if (e.key === "Escape") setEditingDesc(false);
                }}
                placeholder="Add a description..."
              />
            ) : (
              <p onClick={startEditingDesc} className="bp-editable">
                {brandProfile?.description || "Add a description..."}
              </p>
            )}
          </div>
        </div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handlePhotoUpload}
        />
      </div>

      {/* Dashboard grid */}
      <div className="bp-grid">
        {/* Brand Brief Preview */}
        <BrandBriefPreview
          brief={brandBrief}
          navigate={navigate}
          onCardClick={() => setShowBriefModal(true)}
          onBriefRemove={() => setBrandBrief(null)}
        />

        {/* SKU Kits / Campaign Briefs */}
        <div className="bp-card bp-card-sku">
          <div className="bp-card-header">
            <h3>Campaign Briefs</h3>
            <span className="bp-card-subtitle">SKU Kits</span>
          </div>
          {skuKits.length > 0 ? (
            <div className="bp-sku-list">
              {skuKits.map((kit) => (
                <div
                  key={kit.id}
                  className="bp-sku-row"
                  onClick={() =>
                    navigate("/brand-profile/brand-brief", {
                      state: { niche: kit.niche },
                    })
                  }
                >
                  <div className="bp-sku-info">
                    <span className="bp-sku-name">{kit.name}</span>
                    <span className="bp-sku-niche">{kit.niche}</span>
                  </div>
                  <span className={`bp-sku-status ${kit.status.toLowerCase()}`}>
                    {kit.status}
                  </span>
                </div>
              ))}
            </div>
          ) : null}
          <div className="bp-sku-create">
            {!showNichePicker ? (
              <button
                className="bp-sku-create-btn"
                onClick={() => setShowNichePicker(true)}
              >
                + New Campaign Brief
              </button>
            ) : (
              <div className="bp-niche-picker">
                {NICHE_OPTIONS.map((niche) => (
                  <button
                    key={niche}
                    className="bp-niche-option"
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

        {/* Campaign Timeline */}
        <div
          className="bp-card bp-card-timeline"
          onClick={() => navigate("/brand-timeline")}
        >
          <div className="bp-card-header">
            <h3>Campaign Timeline</h3>
            <span className="bp-card-action">View All</span>
          </div>
          <div className="bp-timeline-list">
            <div className="bp-timeline-item">
              <div className="bp-timeline-dot active" />
              <div className="bp-timeline-item-info">
                <span className="bp-timeline-item-name">
                  Midnight High Tea Drop
                </span>
                <span className="bp-timeline-item-meta">
                  2/3 tasks done • Due Dec 05
                </span>
              </div>
              <span className="bp-timeline-item-status accepted">Accepted</span>
            </div>
            <div className="bp-timeline-item">
              <div className="bp-timeline-dot pending" />
              <div className="bp-timeline-item-info">
                <span className="bp-timeline-item-name">Noir Glow Capsule</span>
                <span className="bp-timeline-item-meta">
                  Awaiting shortlist
                </span>
              </div>
              <span className="bp-timeline-item-status applied">Applied</span>
            </div>
          </div>
          <div className="bp-timeline-summary">
            <span>2 active campaigns</span>
          </div>
        </div>

        {/* Active Creators */}
        <div
          className="bp-card bp-card-creators"
          onClick={() => navigate("/your-creators")}
        >
          <div className="bp-card-header">
            <h3>Active Creators</h3>
            <span className="bp-card-action">View All</span>
          </div>
          <div className="bp-creators-list">
            {activeCreators.map((c) => (
              <div key={c.name} className="bp-creator-row">
                <div
                  className="bp-creator-avatar"
                  style={{ background: c.color }}
                >
                  {c.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="bp-creator-info">
                  <span className="bp-creator-name">{c.name}</span>
                  <span className="bp-creator-role">{c.role}</span>
                </div>
                <span className={`bp-creator-status ${c.status.toLowerCase()}`}>
                  {c.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Subscription */}
        <div
          className="bp-card bp-card-sub"
          onClick={() => navigate("/subscription")}
        >
          <div className="bp-card-header">
            <h3>Subscription</h3>
            <span className="bp-card-action">Manage</span>
          </div>
          <div className="bp-sub-tier">
            <span className="bp-tier-badge">
              {brandProfile.subscription.tier}
            </span>
            <span className="bp-tier-price">
              ${brandProfile.subscription.price}
              <span>/mo</span>
            </span>
          </div>
          <div className="bp-sub-stats">
            <div className="bp-sub-stat">
              <div className="bp-sub-bar-track">
                <div
                  className="bp-sub-bar-fill"
                  style={{
                    width: `${(0 / brandProfile.subscription.posts) * 100}%`,
                  }}
                />
              </div>
              <span className="bp-sub-stat-label">
                {0}/{brandProfile.subscription.posts} Posts
              </span>
            </div>
            <div className="bp-sub-stat">
              <div className="bp-sub-bar-track">
                <div
                  className="bp-sub-bar-fill"
                  style={{
                    width: `${(0 / brandProfile.subscription.stories) * 100}%`,
                  }}
                />
              </div>
              <span className="bp-sub-stat-label">
                {0}/{brandProfile.subscription.stories} Stories
              </span>
            </div>
            <div className="bp-sub-stat">
              <div className="bp-sub-bar-track">
                <div
                  className="bp-sub-bar-fill"
                  style={{
                    width: `${(0 / brandProfile.subscription.reels) * 100}%`,
                  }}
                />
              </div>
              <span className="bp-sub-stat-label">
                {0}/{brandProfile.subscription.reels} Reels
              </span>
            </div>
          </div>
          <div className="bp-sub-needs">
            <span className="bp-needs-label">Needs</span>
            <span className="bp-needs-value">{brandSummary.stats.needs}</span>
          </div>
        </div>
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
