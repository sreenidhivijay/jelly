import React, { useState } from 'react';
import './CreatorRequestsPage.css';
import NotificationPopup from './NotificationPopup';

const initialRequests = [
  {
    id: 1,
    brand: 'Velvet Petal Boutique',
    date: 'Nov 20',
    time: '10:30 AM',
    campaign: 'Holiday High Tea',
    focus: 'Hero reel concept share',
  },
  {
    id: 2,
    brand: 'Fable & Fig',
    date: 'Nov 24',
    time: '3:00 PM',
    campaign: 'Winter recipe collab',
    focus: 'Storyboard walkthrough',
  },
];

function CreatorRequestsPage() {
  const [requests, setRequests] = useState(initialRequests);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleAction = (requestId, action) => {
    const actionCopy =
      action === 'accepted'
        ? 'Accepted collaboration request'
        : action === 'declined'
        ? 'Declined collaboration request'
        : 'Asked to reschedule collaboration request';

    setNotificationMessage(`${actionCopy} #${requestId}`);
    setShowPopup(true);
    if (action !== 'reschedule') {
      setRequests(requests.filter((request) => request.id !== requestId));
    }
  };

  return (
    <div className="collab-requests-page">
      <header className="requests-header">
        <span className="eyebrow">Inbox</span>
        <h2>Brand collaboration requests</h2>
        <p>Review new invitations and keep your calendar curated with projects you adore.</p>
      </header>

      {requests.length > 0 ? (
        requests.map((request) => (
          <article key={request.id} className="request-card">
            <div className="card-top">
              <span className="request-id">Request #{request.id}</span>
              <span className="request-date">
                {request.date} · {request.time}
              </span>
            </div>
            <div className="card-body">
              <div>
                <h3>{request.brand}</h3>
                <p>
                  <strong>Campaign:</strong> {request.campaign}
                </p>
                <p>{request.focus}</p>
              </div>
            </div>
            <div className="card-actions">
              <button onClick={() => handleAction(request.id, 'accepted')} className="accept">
                Accept
              </button>
              <button onClick={() => handleAction(request.id, 'declined')} className="decline">
                Decline
              </button>
              <button onClick={() => handleAction(request.id, 'reschedule')} className="reschedule">
                Request new time
              </button>
            </div>
          </article>
        ))
      ) : (
        <div className="empty-state">You have answered every request. Time to create magic!</div>
      )}

      {showPopup && (
        <NotificationPopup message={notificationMessage} onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
}

export default CreatorRequestsPage;