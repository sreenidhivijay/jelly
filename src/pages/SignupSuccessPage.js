import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BrandRegistration.css'; // Reusing styles

function SignupSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="brand-onboarding-container">
      <header className="onboarding-header">
        <span className="eyebrow">Welcome to Jelly</span>
        <h2>You are all set!</h2>
        <p>Your business account has been created and your subscription is active.</p>
      </header>
      <button onClick={() => navigate('/brand-profile')} className="continue-button">
        Go to Dashboard
      </button>
    </div>
  );
}

export default SignupSuccessPage;