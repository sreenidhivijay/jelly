import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiUploadCloud } from 'react-icons/fi';
import './BrandRegistration.css';
import './CreatorPortfolioUploadPage.css';
import creatorService from '../services/creatorService';

const MAX_PORTFOLIO_UPLOADS = 50;

function CreatorPortfolioUploadPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const onboardingState = location.state || {};
  const [portfolioFiles, setPortfolioFiles] = useState([]);
  const [message, setMessage] = useState('');

  const handleFileSelection = (event) => {
    const selectedFiles = Array.from(event.target.files || []);
    if (selectedFiles.length === 0) {
      return;
    }

    const remainingSlots = MAX_PORTFOLIO_UPLOADS - portfolioFiles.length;
    if (remainingSlots <= 0) {
      setMessage(`You can upload up to ${MAX_PORTFOLIO_UPLOADS} pieces of content.`);
      event.target.value = '';
      return;
    }

    const acceptedFiles = selectedFiles.slice(0, remainingSlots);
    const rejectedCount = selectedFiles.length - acceptedFiles.length;

    setPortfolioFiles((currentFiles) => [...currentFiles, ...acceptedFiles]);
    setMessage(
      rejectedCount > 0
        ? `Added ${acceptedFiles.length} file(s). ${rejectedCount} file(s) were not added because the limit is ${MAX_PORTFOLIO_UPLOADS}.`
        : ''
    );
    event.target.value = '';
  };

  const handleRemoveFile = (fileIndex) => {
    setPortfolioFiles((currentFiles) => currentFiles.filter((_, index) => index !== fileIndex));
    setMessage('');
  };

  const handleContinue = (event) => {
    event.preventDefault();
    if (portfolioFiles.length === 0) {
      setMessage('Please upload at least one reel or portfolio sample to continue.');
      return;
    }

    creatorService.uploadPortfolio(portfolioFiles);

    navigate('/signup/creator/approval', {
      state: {
        ...onboardingState,
        portfolioCount: portfolioFiles.length,
      },
    });
  };

  return (
    <div className="brand-onboarding-container">
      <header className="onboarding-header">
        <span className="eyebrow">Creator Portfolio</span>
        <h2>Upload your reels and past work</h2>
        <p>Batch upload up to 50 pieces of content so brands can review your style and consistency.</p>
      </header>

      <form className="brand-onboarding-form" onSubmit={handleContinue}>
        <section className="portfolio-upload-card">
          <label className="portfolio-upload-box">
            <input
              type="file"
              accept="video/*,image/*"
              multiple
              onChange={handleFileSelection}
              style={{ display: 'none' }}
            />
            <div className="upload-content">
              <FiUploadCloud className="upload-icon" />
              <span>Click to upload files</span>
              <small>Supports batch upload. MP4, MOV, WebM, JPG, PNG</small>
            </div>
          </label>

          <div className="portfolio-upload-meta">
            <strong>{portfolioFiles.length} / {MAX_PORTFOLIO_UPLOADS} uploaded</strong>
          </div>

          {message && <p className="portfolio-upload-message">{message}</p>}

          {portfolioFiles.length > 0 && (
            <ul className="portfolio-upload-list">
              {portfolioFiles.map((file, index) => (
                <li key={`${file.name}-${index}`}>
                  <span>{file.name}</span>
                  <button type="button" onClick={() => handleRemoveFile(index)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <button type="submit" className="continue-button">
          Continue to review
        </button>
      </form>
    </div>
  );
}

export default CreatorPortfolioUploadPage;
