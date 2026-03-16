import React, { useEffect, useRef, useState } from 'react';
import './BrandProfile.css';
import profilePic from '../assets/profile-pic.jpg';
// import { BRAND_PROFILE_PHOTO_KEY, BRAND_BIO_KEY } from '../utils/storageKeys';
import BrandBriefSection from '../components/BrandBriefSection';
import brandService from '../services/brandService';

const brandSummary = {
  name: 'Velvet Petal Boutique',
  tagline: 'Luxury tea salon curating high tea rituals for the afterhours crowd.',
  stats: {
    leadCampaign: 'Midnight High Tea Drop',
    budget: '$25k launch',
    needs: 'Reels + Story suites',
  },
};

const progressCampaigns = [
  {
    id: 'midnight-tea',
    title: 'Midnight High Tea Drop',
    brand: 'Velvet Petal Boutique',
    status: 'Accepted',
    due: 'Deliver by Dec 05',
    checklist: [
      { item: 'Concept submitted', done: true },
      { item: 'Shoot scheduled', done: true },
      { item: 'Content upload', done: false },
    ],
  },
  {
    id: 'noir-glow',
    title: 'Noir Glow Capsule',
    brand: 'Glow Cartel',
    status: 'Applied',
    due: 'Awaiting shortlist',
    checklist: [
      { item: 'Application submitted', done: true },
      { item: 'Awaiting response', done: false },
    ],
  },
];

function BrandProfile() {
  const [bio, setBio] = useState(
    'We are sourcing dreamy storytellers who can film neon-lit tea rituals, slow pour shots, and ASMR garnish prep.'
  );
  const [profileImage, setProfileImage] = useState(profilePic);
  const fileInputRef = useRef(null);

  // useEffect(() => {
  //   const storedBio = localStorage.getItem(BRAND_BIO_KEY);
  //   if (storedBio) {
  //     setBio(storedBio);
  //   }
  //   const storedPhoto = localStorage.getItem(BRAND_PROFILE_PHOTO_KEY);
  //   if (storedPhoto) {
  //     setProfileImage(storedPhoto);
  //   }
  // }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await brandService.getProfile();
        if (data.bio) setBio(data.bio);
        if (data.profile_photo_url) setProfileImage(data.profile_photo_url);
      } catch (error) {
        console.error('Failed to load profile:', error);
      }
    };
    fetchProfile();
  }, []);

  // const handleBioChange = (event) => {
  //   const value = event.target.value;
  //   setBio(value);
  //   localStorage.setItem(BRAND_BIO_KEY, value);
  // };

  // const handlePhotoUpload = (event) => {
  //   const file = event.target.files?.[0];
  //   if (!file) return;
  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     if (typeof reader.result === 'string') {
  //       setProfileImage(reader.result);
  //       localStorage.setItem(BRAND_PROFILE_PHOTO_KEY, reader.result);
  //     }
  //   };
  //   reader.readAsDataURL(file);
  //   event.target.value = '';
  // };

  const handleBioChange = async (event) => {
    const value = event.target.value;
    setBio(value);
    try {
      await brandService.updateProfile({ bio: value });
    } catch (error) {
      console.error('Failed to save bio:', error);
    }
  };

  const handlePhotoUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const fileUrl = await brandService.uploadProfilePhoto(file);
      setProfileImage(fileUrl);
    } catch (error) {
      console.error('Failed to upload photo:', error);
    }
    event.target.value = '';
  };

  return (
    <div className="creator-profile-page">
      <header className="creator-profile-header brand-profile-header">
        <div className="brand-header-row">
          <button
            type="button"
            className="brand-avatar-button"
            onClick={() => fileInputRef.current?.click()}
          >
            <img src={profileImage} alt={`${brandSummary.name} profile`} />
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
            <span className="metric-value">{brandSummary.stats.leadCampaign}</span>
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
        style={{ display: 'none' }}
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