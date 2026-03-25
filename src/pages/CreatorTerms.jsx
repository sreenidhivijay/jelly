import React from "react";
import { useNavigate } from "react-router-dom";
import "./CreatorTerms.css";

function CreatorTerms() {
  const navigate = useNavigate();

  const handleAccept = () => {
    navigate("/creator-dashboard");
  };

  const handleDecline = () => {
    navigate("/signup/creator");
  };

  return (
    <div className="terms-container">
      <div className="terms-card">
        <span className="eyebrow">Creator agreement</span>
        <h2>Jelly creator pledge</h2>
        <p className="terms-intro">
          Thanks for bringing your artistry to Jelly. Review the highlights of our baddie-minded
          creator agreement before publishing your profile.
        </p>
        <div className="terms-box">
          <ol>
            <li>
              Deliverables must match the scope you confirmed with each brand. Share drafts ahead of
              launch so feedback feels collaborative, not rushed.
            </li>
            <li>
              Disclose paid partnerships per FTC guidelines in every caption and story frame. We provide
              suggested language if you need it.
            </li>
            <li>
              Respect brand embargoes and do not repurpose their assets outside the agreed campaign
              window without explicit written approval.
            </li>
            <li>
              Communicate delays within 24 hours. We are here to help troubleshoot edits, reshoots, or
              scheduling conflicts.
            </li>
            <li>
              Payments are released within seven business days of completed deliverables once the
              partner signs off.
            </li>
          </ol>
        </div>
        <div className="terms-actions">
          <button className="secondary" onClick={handleDecline}>
            Decline
          </button>
          <button className="primary" onClick={handleAccept}>
            Accept & publish profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatorTerms;