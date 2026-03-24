import React from "react";
import { useNavigate } from "react-router-dom";
import "./BrandTerms.css";

function BrandTerms() {
  const navigate = useNavigate();

  const handleAccept = () => {
    navigate("/brand-profile");
  };

  const handleDecline = () => {
    navigate("/signup/brand");
  };

  return (
    <div className="terms-container">
      <div className="terms-card">
        <span className="eyebrow">Brand agreement</span>
        <h2>Jelly partnership promise</h2>
        <p className="terms-intro">
          We are committed to thoughtful, respectful collaborations with major baddie energy. Review these guidelines before
          inviting creators to work with your brand.
        </p>
        <div className="terms-box">
          <ol>
            <li>
              Provide clear briefs with timelines, deliverables, and creative guardrails. Honoring the
              creator’s style keeps content authentic and aligned.
            </li>
            <li>
              Fees must be paid in full per the agreed schedule. Rush edits or scope changes may incur
              additional costs.
            </li>
            <li>
              Credit creators prominently across all repurposed assets and tag them when content is
              posted on brand channels.
            </li>
            <li>
              Share performance insights post-campaign. Collaborative transparency fuels repeat magic.
            </li>
            <li>
              Treat all creator data (rates, media kits, analytics) as confidential, using it solely for
              partnership planning.
            </li>
          </ol>
        </div>
        <div className="terms-actions">
          <button className="secondary" onClick={handleDecline}>
            Decline
          </button>
          <button className="primary" onClick={handleAccept}>
            Agree & continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default BrandTerms;