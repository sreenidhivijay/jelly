import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './CreatorProfile.css';
import profilePic from '../assets/profile-pic.jpg';
import {
  MENTOR_INCOMING_REQUESTS_KEY as CREATOR_INCOMING_REQUESTS_KEY,
  NEW_INCOMING_REQUEST_EVENT,
  MENTOR_PROFILE_PHOTO_KEY as CREATOR_PROFILE_PHOTO_KEY,
  MENTOR_COMPLETED_PACKAGES_KEY as CREATOR_COMPLETED_PACKAGES_KEY,
  SIGNATURE_PACKAGE_APPLIED_EVENT,
} from "../utils/storageKeys";
import { signaturePackages } from "../data/signaturePackages";
import {
  useCreatorProfile,
  useUpdateCreatorProfile,
  useBlockInvites,
  useClearBlockInvites,
} from "../hooks/useCreator";
import { useStripeStatus, useStartStripeOnboarding } from "../hooks/useStripeConnect";

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
  { id: 'opaline', brand: 'Opaline Atelier', note: 'Interested in doing series for Valentine drop', date: 'Nov 19' },
  { id: 'fable-fig', brand: 'Fable & Fig', note: 'Looking for modeling for the baking collab', date: 'Nov 21' },
  { id: 'desi-glam', brand: 'Desi Glam', note: 'Want to do stories for holiday celebrations', date: 'Nov 22' },
];

function CreatorProfile() {
  const { data: creator } = useCreatorProfile();
  const updateProfile = useUpdateCreatorProfile();
  const blockInvitesMutation = useBlockInvites();
  const clearBlockMutation = useClearBlockInvites();
  const { data: stripeStatus } = useStripeStatus();
  const startOnboarding = useStartStripeOnboarding();

  const [mediaKitLink, setMediaKitLink] = useState("");
  const [rateCardLink, setRateCardLink] = useState("");
  const [blockStart, setBlockStart] = useState("");
  const [blockEnd, setBlockEnd] = useState("");
  const [acceptingCollabs, setAcceptingCollabs] = useState(true);
  const [incomingRequests, setIncomingRequests] = useState(
    initialIncomingRequests,
  );
  const [profileImage, setProfileImage] = useState(profilePic);
  const [bio, setBio] = useState("");
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const fileInputRef = useRef(null);

  const stripeConnected = stripeStatus?.connected ?? true;
  const blockInvites = creator?.blackouts?.length > 0;

  useEffect(() => {
    if (!creator) return;
    if (creator.bio) setBio(creator.bio);
    if (creator.media_kit_url) setMediaKitLink(creator.media_kit_url);
    if (creator.rate_card_url) setRateCardLink(creator.rate_card_url);
    if (creator.open_to_collab !== undefined)
      setAcceptingCollabs(creator.open_to_collab);
  }, [creator]);

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

  const bioTimerRef = useRef(null);

  const handleConnectStripe = () => {
    startOnboarding.mutate(
      {
        returnUrl: window.location.origin + "/creator-profile",
        refreshUrl: window.location.origin + "/creator-profile",
      },
      {
        onSuccess: (data) => {
          window.location.href = data.onboarding_url;
        },
        onError: (error) => {
          alert(error.message || "Failed to start Stripe onboarding.");
        },
      },
    );
  };

  const handleAcceptingCollabs = (accepting) => {
    setAcceptingCollabs(accepting);
    updateProfile.mutate(
      { open_to_collab: accepting },
      {
        onError: () => {
          setAcceptingCollabs((prev) => !prev);
        },
      },
    );
  };

  const handleToggleBlock = () => {
    if (!blockStart || !blockEnd) return;
    blockInvitesMutation.mutate({ blockStart, blockEnd });
  };

  const handleClearBlock = () => {
    clearBlockMutation.mutate(creator.blackouts[0].id, {
      onSuccess: () => {
        setBlockStart("");
        setBlockEnd("");
      },
    });
  };

  const handleProfileClick = () => {
    setIsPhotoModalOpen(true);
  };

  const handleCloseModal = () => setIsPhotoModalOpen(false);

  const handleSaveLinks = () => {
    updateProfile.mutate({
      media_kit_url: mediaKitLink,
      rate_card_url: rateCardLink,
    });
  };

  const handlePhotoUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setProfileImage(reader.result);
        localStorage.setItem(CREATOR_PROFILE_PHOTO_KEY, reader.result);
        setIsPhotoModalOpen(false);
      }
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  return (
    <div className="creator-profile-page">
      <header className="creator-header">
        <div className="creator-identity">
          <button type="button" className="profile-image-button" onClick={handleProfileClick}>
            <img src={profileImage} alt="Creator profile" />
          </button>
          <div>
            <span className="eyebrow">Creator dashboard</span>
            <h1>Aurora Blake</h1>
            <p>Lifestyle storyteller · Instagram @aurorablake · TikTok @aublake</p>
          </div>
        </div>
        <div className="availability-toggle">
          <span>Accepting new collaborations</span>
          <div className="availability-buttons">
            <button
              type="button"
              className={acceptingCollabs ? "active" : ""}
              onClick={() => handleAcceptingCollabs(true)}
            >
              Yes
            </button>
            <button
              type="button"
              className={!acceptingCollabs ? "active" : ""}
              onClick={() => handleAcceptingCollabs(false)}
            >
              No
            </button>
          </div>
        </div>
      </header>
      {!stripeConnected && (
        <div className="stripe-connect-banner">
          <span>
            Connect your Stripe account to start receiving payments for
            collaborations.
          </span>
          <button
            className="start-collab-button"
            disabled={startOnboarding.isPending}
            onClick={handleConnectStripe}
          >
            {startOnboarding.isPending ? "Connecting..." : "Connect Stripe"}
          </button>
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handlePhotoUpload}
      />

      <section className="creator-bio-section">
        <div className="section-heading">
          <h2>Bio & pitch</h2>
          <p>Refresh your origin story or feature current obsessions so brands know how you will show up.</p>
        </div>
        <textarea value={bio} onChange={(event) => setBio(event.target.value)} />
      </section>

      <section className="metrics-grid">
        {[
          { label: 'Pending requests', value: '03'},
          { label: 'Campaigns in progress', value: '05'},
          { label: 'Next shoot', value: 'Nov 21 @ 10:30am'},
          { label: 'Avg turnaround', value: '28 hours'},
        ].map((metric) => (
          <article key={metric.label} className="metric-card">
            <span className="metric-label">{metric.label}</span>
            <span className="metric-value">{metric.value}</span>
            <small>{metric.detail}</small>
          </article>
        ))}
      </section>

      <section className="resource-upload">
        <div className="section-heading">
          <h2>Share resources</h2>
          <p>Provide one-click access to your latest media kit and rate card.</p>
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
        <button className="save-button" onClick={handleSaveLinks}>
          Save links
        </button>
      </section>

      <section className="invite-availability">
        <div className="section-heading">
          <h2>Invite availability</h2>
          <p>
            Need a break? Set a timeframe to pause new invitations. We will let brands know you are heads-down
            until you are back.
          </p>
        </div>
        {!blockInvites ? (
          <>
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
            <button
              className="outline-button"
              onClick={handleToggleBlock}
              disabled={!blockStart || !blockEnd}
            >
              Pause invites for these dates
            </button>
          </>
        ) : (
          <div className="active-block">
            <span>
              Blocking new invites from{" "}
              {creator.blackouts[0]?.start_date || "—"} to{" "}
              {creator.blackouts[0]?.end_date || "—"}. You will still finish
              existing campaigns.
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
            <button className="close-photo-modal" onClick={handleCloseModal} aria-label="Close photo viewer">
              ×
            </button>
            <img src={profileImage} alt="Creator profile preview" className="profile-photo-large" />
            <div className="photo-actions">
              <button className="start-collab-button" onClick={() => fileInputRef.current?.click()}>
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