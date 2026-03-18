import React, { useEffect, useRef, useState } from "react";
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

function BrandProfile() {
  const [bio, setBio] = useState(
    "We are sourcing dreamy storytellers who can film neon-lit tea rituals, slow pour shots, and ASMR garnish prep.",
  );
  const [brandProfile, setBrandProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef(null);

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
            <span className="metric-label">Ongoing campaign</span>
            <span className="metric-value">
              {brandSummary.stats.leadCampaign}
            </span>
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

      <BrandBriefSection />

      {/* <section className="campaign-progress-section">
        <div className="section-heading">
          <h2>Campaign progress</h2>
          <p>Track invites you have accepted and applications you are waiting on.</p>
        </div>
        <div className="campaign-progress-grid">
          {progressCampaigns.map((campaign) => (
            <article key={campaign.id} className="campaign-progress-card">
              <div className="campaign-top">
                <h3>{campaign.title}</h3>
                <span>{campaign.brand}</span>
              </div>
              <span className={`status-pill ${campaign.status === 'Accepted' ? 'accepted' : 'pending'}`}>
                {campaign.status}
              </span>
              <small>{campaign.due}</small>
              <ul className="checklist">
                {campaign.checklist.map((step, index) => (
                  <li key={index} className={step.done ? 'done' : ''}>
                    {step.item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section> */}
    </div>
  );
}

export default BrandProfile;
