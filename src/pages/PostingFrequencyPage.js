import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BrandRegistration.css'; // Reusing styles

const frequencyOptions = [
  '3 times a week',
  '6 times a week',
  'More than 7 times a week',
];

function PostingFrequencyPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { niche, contentTypes } = location.state || {};

  const [selectedFrequency, setSelectedFrequency] = useState(frequencyOptions[0]);

  const handleContinue = (event) => {
    event.preventDefault();
    navigate('/signup/business/how-it-works', {
      state: { niche, contentTypes, frequency: selectedFrequency },
    });
  };

  return (
    <div className="brand-onboarding-container">
      <header className="onboarding-header">
        <span className="eyebrow">Business Onboarding</span>
        <h2>How many times do you want to post?</h2>
        <p>This will help us determine the right subscription plan for you.</p>
      </header>

      <form className="brand-onboarding-form" onSubmit={handleContinue}>
        <div className="chip-grid">
          {frequencyOptions.map((option) => (
            <button
              type="button"
              key={option}
              className={selectedFrequency === option ? 'chip selected' : 'chip'}
              onClick={() => setSelectedFrequency(option)}
            >
              {option}
            </button>
          ))}
        </div>
        <button type="submit" className="continue-button">Continue</button>
      </form>
    </div>
  );
}

export default PostingFrequencyPage;