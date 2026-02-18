import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BrandRegistration.css';

function CreatorHowItWorksPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const onboardingState = location.state || {};

  const handleContinue = (event) => {
    event.preventDefault();
    navigate('/signup/creator/curation', { state: onboardingState });
  };

  return (
    <div className="brand-onboarding-container">
      <header className="onboarding-header">
        <span className="eyebrow">How It Works</span>
        <h2>Steady Brand Relations, Steady Work</h2>
        <p>We're building a bridge between creators and businesses.</p>
      </header>

      <div className="how-it-works-steps">
        <div className="step-card">
          <div className="step-number">1</div>
          <div className="step-content">
            <h3>Businesses Subscribe</h3>
            <p>Brands pay a monthly subscription for a guaranteed amount of content.</p>
          </div>
        </div>
        <div className="step-card">
          <div className="step-number">2</div>
          <div className="step-content">
            <h3>You Fulfill Tasks</h3>
            <p>Pick up tasks that fit your niche. You are paid based on how many pieces of content you successfully deliver.</p>
          </div>
        </div>
        <div className="step-card">
          <div className="step-number">3</div>
          <div className="step-content">
            <h3>Get Paid</h3>
            <p>Jelly operates on a tier payment model. Money is released to you immediately after your content is approved and posted. You are paid per piece of content completed. </p>
          </div>
        </div>
      </div>

      <button onClick={handleContinue} className="continue-button">
        Start Curation Process
      </button>
    </div>
  );
}

export default CreatorHowItWorksPage;