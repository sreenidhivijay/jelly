import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BrandRegistration.css';
import './CreatorCurationPage.css';
import { FiUploadCloud } from "react-icons/fi";

function CreatorCurationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { niche } = location.state || { niche: 'General' };
  const [file, setFile] = useState(null);

  const handleContinue = (event) => {
    event.preventDefault();
    if (!file) {
      alert("Please upload a video to continue.");
      return;
    }
    // In a real app, upload logic goes here
    navigate('/signup/creator/approval');
  };

  const getPrompt = (niche) => {
    if (niche.includes('Food')) return "Create a 15s Reel showcasing a morning coffee run with ASMR voiceover.";
    if (niche.includes('Fashion')) return "Create a transition video styling one white shirt in three different ways.";
    return "Create a 30s video introducing yourself and your creative process.";
  }

  return (
    <div className="brand-onboarding-container">
      <header className="onboarding-header">
        <span className="eyebrow">Curation Process</span>
        <h2>Show us what you've got</h2>
        <p>To ensure quality for our brands, please complete the following prompt.</p>
      </header>

      <form className="brand-onboarding-form" onSubmit={handleContinue}>
        <section style={{ background: '#fff', padding: '24px', borderRadius: '16px', border: '1px dashed #ccc', textAlign: 'center' }}>
          <h3 style={{ marginBottom: '10px' }}>Your Prompt: {niche}</h3>
          <p style={{ fontStyle: 'italic', fontSize: '16px', color: '#555' }}>"{getPrompt(niche)}"</p>
        </section>

        <section className="upload-section">
          <label className="file-upload-box">
            <input 
              type="file" 
              accept="video/*" 
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: 'none' }}
            />
            <div className="upload-content">
              <FiUploadCloud className="upload-icon" />
              {file ? (
                <span className="file-name">{file.name}</span>
              ) : (
                <>
                  <span>Click to upload video</span>
                  <small>MP4, MOV or WebM (Max 50MB)</small>
                </>
              )}
            </div>
          </label>
        </section>

        <button type="submit" className="continue-button">
          Submit for Review
        </button>
      </form>
    </div>
  );
}

export default CreatorCurationPage;