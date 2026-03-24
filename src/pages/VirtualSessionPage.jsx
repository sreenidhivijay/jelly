import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./VirtualSessionPage.css";

function VirtualSessionPage() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);

  const handleEndCall = () => {
    setIsModalOpen(true);
  };

  const handleRatingSubmit = () => {
    if (!rating) {
      return;
    }
    setIsModalOpen(false);
    navigate("/brand-profile");
  };

  return (
    <div className="studio-page">
      <header className="studio-header">
        <span className="eyebrow">Creator studio</span>
        <h2>Velvet Petal Boutique × Aurora Blake</h2>
        <p>Share inspiration, refine deliverables, and keep your campaign cadence on track.</p>
      </header>

      <div className="studio-stage">
        <div className="screen brand">
          <span>Brand</span>
        </div>
        <div className="screen creator">
          <span>Creator</span>
        </div>
      </div>

      <div className="studio-actions">
        <button className="action-button" onClick={handleEndCall}>
          End session
        </button>
        <button className="outline-button">Share moodboard</button>
        <button className="outline-button">Drop links</button>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>Session saved beautifully</h3>
            <p>How aligned did the conversation feel?</p>
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${star <= rating ? "selected" : ""}`}
                  onClick={() => setRating(star)}
                >
                  ✶
                </span>
              ))}
            </div>
            <button className="submit-button" onClick={handleRatingSubmit}>
              Submit & return to planner
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VirtualSessionPage;
