import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./CreatorProfile.css";
import profilePic from "../assets/profile-pic.jpg";
import {
  MENTOR_INCOMING_REQUESTS_KEY as CREATOR_INCOMING_REQUESTS_KEY,
  NEW_INCOMING_REQUEST_EVENT,
  MENTOR_PROFILE_PHOTO_KEY as CREATOR_PROFILE_PHOTO_KEY,
  MENTOR_COMPLETED_PACKAGES_KEY as CREATOR_COMPLETED_PACKAGES_KEY,
  SIGNATURE_PACKAGE_APPLIED_EVENT,
} from "../utils/storageKeys";
import { signaturePackages } from "../data/signaturePackages";
import creatorService from "../services/creatorService";

const recentCollaborations = [
  {
    brand: "Velvet Petal Boutique",
    deliverable: "Holiday launch",
    status: "Awaiting feedback",
    due: "Deliver by Nov 28",
    checklist: [
      { item: "Concept board sent", done: true },
      { item: "Shoot day wrap", done: true },
      { item: "Edits uploaded", done: false },
    ],
  },
  {
    brand: "Maison Lumiere",
    deliverable: "Winter scent storytelling",
    status: "Approved",
    due: "Live on Dec 01",
    checklist: [
      { item: "Outline shared", done: true },
      { item: "Shoot scheduled", done: true },
      { item: "Final delivery", done: true },
    ],
  },
];

const initialIncomingRequests = [
  {
    id: "opaline",
    brand: "Opaline Atelier",
    note: "Interested in doing series for Valentine drop",
    date: "Nov 19",
  },
  {
    id: "fable-fig",
    brand: "Fable & Fig",
    note: "Looking for modeling for the baking collab",
    date: "Nov 21",
  },
  {
    id: "desi-glam",
    brand: "Desi Glam",
    note: "Want to do stories for holiday celebrations",
    date: "Nov 22",
  },
];

const getCompletedPackageSlugs = () => {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(CREATOR_COMPLETED_PACKAGES_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const getAvailableSignaturePackages = () => {
  const completed = getCompletedPackageSlugs();
  return signaturePackages.filter((pkg) => !completed.includes(pkg.slug));
};

function CreatorProfile() {
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [acceptingCollabs, setAcceptingCollabs] = useState(true);
  const [mediaKitLink, setMediaKitLink] = useState("");
  const [rateCardLink, setRateCardLink] = useState("");
  const [blockInvites, setBlockInvites] = useState(false);
  const [blockStart, setBlockStart] = useState("");
  const [blockEnd, setBlockEnd] = useState("");
  const [incomingRequests, setIncomingRequests] = useState(
    initialIncomingRequests,
  );
  const [availablePackages, setAvailablePackages] = useState(
    getAvailableSignaturePackages(),
  );
  const [bio, setBio] = useState(
    "Soft glam storyteller creating dreamy vlogs, cafe rituals, and ASMR unboxings for boutique brands.",
  );
  const [profileImage, setProfileImage] = useState(profilePic);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [introVideoUrl, setIntroVideoUrl] = useState(null);
  const [portfolioUrls, setPortfolioUrls] = useState([]);

  useEffect(() => {
    Promise.all([
      creatorService.getProfile().then(setCreator),
      creatorService.getIntroVideo().then(({ presigned_url }) => {
        setIntroVideoUrl(presigned_url);
      }),
      creatorService.getPortfolio().then((data) => {
        setPortfolioUrls(data.files || []);
      }),
    ]).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem(CREATOR_INCOMING_REQUESTS_KEY);
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length) {
        setIncomingRequests([...initialIncomingRequests, ...parsed]);
      }
    } catch {
      setIncomingRequests(initialIncomingRequests);
    }
  }, []);

  useEffect(() => {
    const storedPhoto = localStorage.getItem(CREATOR_PROFILE_PHOTO_KEY);
    if (storedPhoto) {
      setProfileImage(storedPhoto);
    }
  }, []);

  useEffect(() => {
    const handleNewRequest = (event) => {
      if (!event.detail) return;
      setIncomingRequests((prev) => [...prev, event.detail]);
    };
    window.addEventListener(NEW_INCOMING_REQUEST_EVENT, handleNewRequest);
    return () => {
      window.removeEventListener(NEW_INCOMING_REQUEST_EVENT, handleNewRequest);
    };
  }, []);

  useEffect(() => {
    const refreshPackages = () => {
      setAvailablePackages(getAvailableSignaturePackages());
    };
    window.addEventListener(SIGNATURE_PACKAGE_APPLIED_EVENT, refreshPackages);
    return () => {
      window.removeEventListener(
        SIGNATURE_PACKAGE_APPLIED_EVENT,
        refreshPackages,
      );
    };
  }, []);

  const handleToggleBlock = () => {
    if (!blockStart || !blockEnd) {
      return;
    }
    setBlockInvites(true);
  };

  const handleClearBlock = () => {
    setBlockInvites(false);
    setBlockStart("");
    setBlockEnd("");
  };

  const handleProfileClick = () => {
    setIsPhotoModalOpen(true);
  };

  const handleCloseModal = () => setIsPhotoModalOpen(false);

  const handlePhotoUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const brandData = await creatorService.uploadProfilePhoto(file);
      setProfileImage(brandData.profile_image_url);
      setCreator((prev) => ({
        ...prev,
        profile_image_url: brandData.profile_image_url,
      }));
      setIsPhotoModalOpen(false);
    } catch (error) {
      console.error("Failed to upload photo:", error);
    }
    event.target.value = "";
  };

  const renderIncomingCard = (item) => {
    const content = (
      <>
        <div className="campaign-top">
          <h3>{item.brand}</h3>
          <span>{item.note}</span>
        </div>
        <span className="status-pill pending">New inquiry</span>
        <small>Requested {item.date}</small>
      </>
    );

    if (item.linkPath) {
      return (
        <Link
          key={item.id || item.brand}
          to={item.linkPath}
          className="campaign-progress-card card-link"
        >
          {content}
        </Link>
      );
    }

    return (
      <article key={item.id || item.brand} className="campaign-progress-card">
        {content}
      </article>
    );
  };

  if (loading) {
    return (
      <div className="creator-profile-page">
        <header className="creator-header">
          <div className="creator-identity">
            <div className="skeleton skeleton-avatar" />
            <div>
              <div
                className="skeleton skeleton-line"
                style={{ width: 120, height: 12 }}
              />
              <div
                className="skeleton skeleton-line"
                style={{ width: 200, height: 24, marginTop: 20 }}
              />
              <div
                className="skeleton skeleton-line"
                style={{ width: 280, height: 14, marginTop: 20 }}
              />
            </div>
          </div>
        </header>
        <section className="metrics-grid">
          {[1, 2, 3, 4].map((i) => (
            <article key={i} className="metric-card">
              <div
                className="skeleton skeleton-line"
                style={{ width: 100, height: 11 }}
              />
              <div
                className="skeleton skeleton-line"
                style={{ width: 60, height: 30, marginTop: 6 }}
              />
            </article>
          ))}
        </section>
        <section className="signature-packages">
          <div className="section-heading">
            <div
              className="skeleton skeleton-line"
              style={{ width: 240, height: 28 }}
            />
            <div
              className="skeleton skeleton-line"
              style={{ width: "80%", height: 14 }}
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
      <header className="creator-header">
        <div className="creator-identity">
          <button
            type="button"
            className="profile-image-button"
            onClick={handleProfileClick}
          >
            <img
              src={creator?.profile_image_url || profileImage}
              alt="Creator profile"
            />
          </button>
          <div>
            <span className="eyebrow">Creator dashboard</span>
            <h1>{creator?.display_name || "Aurora Blake"}</h1>
            <p>
              Lifestyle storyteller · Instagram @aurorablake · TikTok @aublake
            </p>
          </div>
        </div>
        <div className="availability-toggle">
          <span>Accepting new collaborations</span>
          <div className="availability-buttons">
            <button
              type="button"
              className={acceptingCollabs ? "active" : ""}
              onClick={() => setAcceptingCollabs(true)}
            >
              Yes
            </button>
            <button
              type="button"
              className={!acceptingCollabs ? "active" : ""}
              onClick={() => setAcceptingCollabs(false)}
            >
              No
            </button>
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

      <section className="creator-bio-section">
        <div className="section-heading">
          <h2>Bio & pitch</h2>
          <p>
            Refresh your origin story or feature current obsessions so brands
            know how you will show up.
          </p>
        </div>
        <textarea
          value={bio}
          onChange={(event) => setBio(event.target.value)}
        />
      </section>

      <section className="metrics-grid">
        {[
          { label: "Pending requests", value: "03" },
          { label: "Campaigns in progress", value: "05" },
          { label: "Next shoot", value: "Nov 21 @ 10:30am" },
          { label: "Avg turnaround", value: "28 hours" },
        ].map((metric) => (
          <article key={metric.label} className="metric-card">
            <span className="metric-label">{metric.label}</span>
            <span className="metric-value">{metric.value}</span>
            <small>{metric.detail}</small>
          </article>
        ))}
      </section>

      <section className="signature-packages">
        <div className="section-heading">
          <h2>Collabs recommended for you</h2>
          <p>
            Curated collabs which we (and brands) think you will suit. Apply to
            them with a proposal that reflects your content creator mood.
          </p>
        </div>
        {availablePackages.length ? (
          <div className="package-grid">
            {availablePackages.map((pkg) => (
              <article key={pkg.title} className="package-card">
                <h3>{pkg.title}</h3>
                <p>{pkg.description}</p>
                <div className="package-meta">
                  <span>{pkg.rate}</span>
                  <span>{pkg.turnaround} left to apply</span>
                </div>
                <Link
                  to={`/signature-packages/${pkg.slug}`}
                  className="package-share-link"
                >
                  Share proposal
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="no-packages">
            All signature packages have been applied to. New proposals will be
            uploaded here.
          </div>
        )}
      </section>

      <section className="collaboration-tracker">
        <div className="section-heading">
          <h2>Collaboration tracker</h2>
          <p>See what is in motion and what needs your sparkle next.</p>
        </div>
        <div className="collab-subsection">
          <h3>Recent collabs</h3>
          <div className="campaign-progress-grid">
            {recentCollaborations.map((item) => (
              <article key={item.brand} className="campaign-progress-card">
                <div className="campaign-top">
                  <h3>{item.brand}</h3>
                  <span>{item.deliverable}</span>
                </div>
                <span
                  className={`status-pill ${item.status === "Approved" ? "accepted" : "pending"}`}
                >
                  {item.status}
                </span>
                <small>{item.due}</small>
                <ul className="checklist">
                  {item.checklist.map((step, index) => (
                    <li key={index} className={step.done ? "done" : ""}>
                      {step.item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
        <div className="collab-subsection">
          <h3>Ongoing applications</h3>
          <div className="campaign-progress-grid">
            {incomingRequests.map((item) => renderIncomingCard(item))}
          </div>
        </div>
      </section>

      <section className="resource-upload">
        <div className="section-heading">
          <h2>Share resources</h2>
          <p>
            Provide one-click access to your latest media kit and rate card.
          </p>
        </div>
        <div className="resource-inputs">
          <label>
            Media kit link
            <input
              type="url"
              value={mediaKitLink}
              onChange={(event) => setMediaKitLink(event.target.value)}
              placeholder="https://"
            />
          </label>
          <label>
            Rate card link
            <input
              type="url"
              value={rateCardLink}
              onChange={(event) => setRateCardLink(event.target.value)}
              placeholder="https://"
            />
          </label>
        </div>
        <button className="save-button">Save links</button>
      </section>

      <section className="invite-availability">
        <div className="section-heading">
          <h2>Invite availability</h2>
          <p>
            Need a break? Set a timeframe to pause new invitations. We will let
            brands know you are heads-down until you are back.
          </p>
        </div>
        <div className="availability-grid">
          <label>
            Block from
            <input
              type="date"
              value={blockStart}
              onChange={(event) => setBlockStart(event.target.value)}
            />
          </label>
          <label>
            Through
            <input
              type="date"
              value={blockEnd}
              onChange={(event) => setBlockEnd(event.target.value)}
            />
          </label>
        </div>
        {!blockInvites ? (
          <button
            className="outline-button"
            onClick={handleToggleBlock}
            disabled={!blockStart || !blockEnd}
          >
            Pause invites for these dates
          </button>
        ) : (
          <div className="active-block">
            <span>
              Blocking new invites from {blockStart || "—"} to {blockEnd || "—"}
              . You will still finish existing campaigns.
            </span>
            <button className="start-collab-button" onClick={handleClearBlock}>
              Resume invites
            </button>
          </div>
        )}
      </section>
      {isPhotoModalOpen && (
        <div className="profile-photo-modal" role="dialog" aria-modal="true">
          <div className="profile-photo-dialog">
            <button
              className="close-photo-modal"
              onClick={handleCloseModal}
              aria-label="Close photo viewer"
            >
              ×
            </button>
            <img
              src={profileImage}
              alt="Creator profile preview"
              className="profile-photo-large"
            />
            <div className="photo-actions">
              <button
                className="start-collab-button"
                onClick={() => fileInputRef.current?.click()}
              >
                Upload new photo
              </button>
              <button className="outline-button" onClick={handleCloseModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreatorProfile;
