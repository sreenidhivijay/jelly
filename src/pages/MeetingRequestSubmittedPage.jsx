import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import './MeetingRequestSubmittedPage.css';

function MeetingRequestSubmittedPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { date, time, name, isRepeating, repeatFrequency, repeatDay } = location.state || {};
  const creatorName = name || location.state?.creatorName || 'your creator';

  return (
    <div className="request-submitted-container">
      <span className="eyebrow">All set</span>
      <h2>Jelly collab request sent</h2>

      {isRepeating ? (
        <p className="confirmation-copy">
          You asked <strong>{creatorName}</strong> for a recurring baddie touchpoint every{' '}
            <strong>{repeatFrequency}</strong> on <strong>{repeatDay}</strong> at <strong>{time}</strong>. We will nudge
            them to confirm within 24 hours.
        </p>
      ) : (
        <p className="confirmation-copy">
          Your kickoff session for <strong>{time}</strong> on{' '}
          <strong>
            {date
              ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
              : 'the selected date'}
          </strong>{' '}
          with <strong>{creatorName}</strong> is in review. Expect a response shortly.
        </p>
      )}

      <div className="request-submitted-buttons">
        <button onClick={() => navigate('/')}>Return home</button>
        <button onClick={() => navigate('/appointments')}>View planner</button>
      </div>
    </div>
  );
}

export default MeetingRequestSubmittedPage;
