import React from 'react';
import './NotificationPopup.css';

function NotificationPopup({ message, onClose }) {
  return (
    <div className="notification-popup">
      <div className="popup-content">
        <p>{message}</p>
        <button onClick={onClose} className="close-button">Close</button>
      </div>
    </div>
  );
}

export default NotificationPopup;
