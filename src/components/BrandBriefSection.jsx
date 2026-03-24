import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './BrandBriefSection.css';

const NICHE_OPTIONS = [
  'Fashion/Lifestyle',
  'Wellness',
  'Food',
  'Tech',
  'Beauty/Makeup',
];

const BrandBriefSection = () => {
  const location = useLocation();
  const [brandBrief, setBrandBrief] = useState(
    location.state?.brandBrief || null
  );
  const [showNichePicker, setShowNichePicker] = useState(false);
  const navigate = useNavigate();

  const handleNicheSelect = (niche) => {
    navigate('/brand-profile/brand-brief', { state: { niche } });
  };

  return (
    <div className="brand-brief-container">
      <div className="brand-brief-header">
        <h3>Brand brief</h3>
        <p>Define your brand's identity, voice, and visual style so creators know exactly how to represent you.</p>
      </div>

      {!brandBrief ? (
        <div className="brand-brief-options">
          <div className="brief-option-card highlight">
            <div className="icon">✦</div>
            <h4>Build Your Brand Brief</h4>
            <p>Interactive guided experience to define your brand's personality, voice, vibe, and content guidelines</p>
            <button
              onClick={() => navigate('/brand-profile/brand-brief/builder')}
              className="brief-button build"
            >
              Get Started
            </button>
          </div>
        </div>
      ) : (
        <div className="active-brief-card built">
          <div className="brief-icon">✦</div>
          <div className="brief-details">
            <h4>Brand Brief</h4>
            <p>
              {brandBrief.tones?.join(', ')}
              {brandBrief.vibe ? ` • ${brandBrief.vibe.name}` : ''}
            </p>
          </div>
          <button
            className="brief-button-edit"
            onClick={() => navigate('/brand-profile/brand-brief/builder')}
          >
            Edit
          </button>
          <button className="remove-brief" onClick={() => setBrandBrief(null)}>
            Remove
          </button>
        </div>
      )}

      {/* SKU Kit / Campaign Brief - secondary option */}
      {brandBrief && (
        <div className="sku-kit-section">
          <div className="sku-kit-header">
            <h4>Campaign Briefs (SKU Kits)</h4>
            <p>Create product-specific briefs for individual campaigns</p>
          </div>
          {!showNichePicker ? (
            <button
              onClick={() => setShowNichePicker(true)}
              className="brief-button build sku-kit-btn"
            >
              Create Campaign Brief
            </button>
          ) : (
            <div className="niche-picker">
              {NICHE_OPTIONS.map((niche) => (
                <button
                  key={niche}
                  className="niche-picker-option"
                  onClick={() => handleNicheSelect(niche)}
                >
                  {niche}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BrandBriefSection;
