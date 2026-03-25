import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './RequestConfirmationPage.css';

function RequestConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, date, time } = location.state || {};

  return (
    <div className="request-confirmation">
      <div className="confirmation-card">
        <span className="eyebrow">Request sent</span>
        <h2>Jelly pinged {name || 'your creator'}</h2>
        <p>
          Collaboration kickoff requested for <strong>{time || 'TBD'}</strong> on{' '}
          <strong>{date || 'your selected date'}</strong>.
        </p>
        <p>We will nudge them gently if you do not hear back within 24 hours.</p>
        <div className="confirmation-actions">
          <button onClick={() => navigate('/')}>Return home</button>
          <button onClick={() => navigate('/appointments')}>View planner</button>
        </div>
      </div>
    </div>
  );
}

export default RequestConfirmationPage;
