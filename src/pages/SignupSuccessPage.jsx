import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './BrandRegistration.css';

function SignupSuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};
  const tier = state.tier;

  return (
    <div className="brand-onboarding-container">
      <header className="onboarding-header">
        <span className="eyebrow">Congrats</span>
        <h2>Welcome to the Jelly family</h2>
        {tier ? (
          <>
            <p>You have successfully subscribed to the <strong>{tier?.name}</strong> plan.</p>
            <p>Your recurring total will be <strong>{tier?.price}/mo</strong>.</p>
          </>
        ) : (
          <p>Your account has been created successfully.</p>
        )}
        <p style={{ marginTop: '16px' }}>Click here to access your brand dashboard.</p>
      </header>

      <button onClick={() => navigate('/brand-profile')} className="continue-button">Go to Dashboard</button>
    </div>
  );
}

export default SignupSuccessPage;