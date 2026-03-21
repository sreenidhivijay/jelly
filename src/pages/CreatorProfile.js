import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './CreatorProfile.css';
import profilePic from '../assets/profile-pic.jpg';
import {
  MENTOR_INCOMING_REQUESTS_KEY as CREATOR_INCOMING_REQUESTS_KEY,
  NEW_INCOMING_REQUEST_EVENT,
  MENTOR_PROFILE_PHOTO_KEY as CREATOR_PROFILE_PHOTO_KEY,
} from '../utils/storageKeys';

const initialIncomingRequests = [
  { id: 'opaline', brand: 'Opaline Atelier', note: 'Interested in doing series for Valentine drop', date: 'Nov 19' },
  { id: 'fable-fig', brand: 'Fable & Fig', note: 'Looking for modeling for the baking collab', date: 'Nov 21' },
  { id: 'desi-glam', brand: 'Desi Glam', note: 'Want to do stories for holiday celebrations', date: 'Nov 22' },
];

function CreatorProfile() {
  const [acceptingCollabs, setAcceptingCollabs] = useState(true);
  const [mediaKitLink, setMediaKitLink] = useState('');
  const [rateCardLink, setRateCardLink] = useState('');
  const [blockInvites, setBlockInvites] = useState(false);
  const [blockStart, setBlockStart] = useState('');
  const [blockEnd, setBlockEnd] = useState('');
  const [incomingRequests, setIncomingRequests] = useState(initialIncomingRequests);
  const [bio, setBio] = useState(
    'Soft glam storyteller creating dreamy vlogs, cafe rituals, and ASMR unboxings for boutique brands.'
  );
  const [profileImage, setProfileImage] = useState(profilePic);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const fileInputRef = useRef(null);

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

  const handleToggleBlock = () => {
    if (!blockStart || !blockEnd) {
      return;
    }
    setBlockInvites(true);
  };

  const handleClearBlock = () => {
    setBlockInvites(false);
    setBlockStart('');
    setBlockEnd('');
  };

  const handleProfileClick = () => {
    setIsPhotoModalOpen(true);
  };

  const handleCloseModal = () => setIsPhotoModalOpen(false);

  const handlePhotoUpload = (event) => {
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
              className={acceptingCollabs ? 'active' : ''}
              onClick={() => setAcceptingCollabs(true)}
            >
              Yes
            </button>
            <button
              type="button"
              className={!acceptingCollabs ? 'active' : ''}
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
        <button className="save-button">Save links</button>
      </section>

      <section className="invite-availability">
        <div className="section-heading">
          <h2>Invite availability</h2>
          <p>
            Need a break? Set a timeframe to pause new invitations. We will let brands know you are heads-down
            until you are back.
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
              Blocking new invites from {blockStart || '—'} to {blockEnd || '—'}. You will still finish existing
              campaigns.
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