import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ApplicationSuccessPage.css';

function ApplicationSuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const campaignTitle = location.state?.campaignTitle || 'this drop';

  return (
    <div className="application-success-page">
      <div className="application-success-card">
        <span className="eyebrow">Application sent</span>
        <h1>Pitch successfully submitted</h1>
        <p>
          We shared your treatment for <strong>{campaignTitle}</strong> with the brand team. Expect a follow-up in your
          inbox soon.
        </p>
        <div className="success-actions">
          <button className="start-button" onClick={() => navigate('/creator-dashboard')}>
            View creator dashboard
          </button>
          <button className="outline-button" onClick={() => navigate('/campaigns/midnight-high-tea')}>
            Back to brief
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApplicationSuccessPage;
