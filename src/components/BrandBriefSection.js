import React, { useState } from 'react';
import './BrandBriefSection.css';
import sampleBrief from '../assets/UGC CREATOR BRIEF EXAMPLE.pdf';

const BrandBriefSection = () => {
  const [brandBrief, setBrandBrief] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBrandBrief({
        name: file.name,
        type: 'file',
        file: file
      });
    }
  };

  const handleBuildBrief = () => {
    // Logic to upload/set a sample brief as requested
    setBrandBrief({
      name: 'UGC CREATOR BRIEF EXAMPLE.pdf',
      type: 'generated',
      url: sampleBrief,
      date: new Date().toLocaleDateString()
    });
    // In the future, this can navigate to a builder page
  };

  return (
    <div className="brand-brief-container">
      <div className="brand-brief-header">
        <h3>Brand brief</h3>
        <p>Describe what you are scouting creators for so the right talent applies.</p>
      </div>

      {!brandBrief ? (
        <div className="brand-brief-options">
          <div className="brief-option-card">
            <div className="icon">📄</div>
            <h4>Upload PDF</h4>
            <p>Upload your brand brief PDF</p>
            <input
              type="file"
              id="brief-upload"
              accept=".pdf"
              onChange={handleFileUpload}
              hidden
            />
            <label htmlFor="brief-upload" className="brief-button upload">
              Upload Brief
            </label>
          </div>

          <div className="brief-option-card highlight">
            <div className="icon">✨</div>
            <h4>Build Your Brief</h4>
            <p>Build your own brand brief using our brand brief builder</p>
            <button onClick={handleBuildBrief} className="brief-button build">
              Build Now
            </button>
          </div>
        </div>
      ) : (
        <div className="active-brief-card">
          <div className="brief-icon">
             {brandBrief.type === 'generated' ? '✨' : '📄'}
          </div>
          <div className="brief-details">
            <h4>
              {brandBrief.url ? (
                <a href={brandBrief.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                  {brandBrief.name}
                </a>
              ) : brandBrief.name}
            </h4>
            <p>{brandBrief.type === 'generated' ? 'Auto-generated Sample' : 'Uploaded PDF'} • Added on {brandBrief.date || 'today'}</p>
          </div>
          <button className="remove-brief" onClick={() => setBrandBrief(null)}>
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default BrandBriefSection;