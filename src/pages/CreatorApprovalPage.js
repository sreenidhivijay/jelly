import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BrandRegistration.css';

function CreatorApprovalPage() {
  const navigate = useNavigate();

  return (
    <div className="brand-onboarding-container">
      <header className="onboarding-header">
        <span className="eyebrow">Welcome to Jelly</span>
        <h2>Congrats, you've been approved!</h2>
        <p>Your submission has been reviewed and accepted.</p>
      </header>
      <button onClick={() => navigate('/creator-dashboard')} className="continue-button">
        Access your creator dashboard now
      </button>
    </div>
  );
}

export default CreatorApprovalPage;