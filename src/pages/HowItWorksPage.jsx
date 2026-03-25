import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./BrandRegistration.css"; // Reusing styles

function HowItWorksPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const onboardingState = location.state || {};

  const handleContinue = (event) => {
    event.preventDefault();
    navigate("/signup/business/content-sku", { state: onboardingState });
  };

  return (
    <div className="brand-onboarding-container">
      <header className="onboarding-header">
        <span className="eyebrow">How It Works</span>
        <h2>Our Subscription Model</h2>
        <p>
          We believe in simplicity and value. A flat monthly fee guarantees you
          high-quality content.
        </p>
      </header>

      <div className="how-it-works-steps">
        <div className="step-card">
          <div className="step-number">1</div>
          <div className="step-content">
            <h3>Select Your Plan</h3>
            <p>
              Choose a tier based on the volume of content you need. We have
              options for every budget.
            </p>
          </div>
        </div>
        <div className="step-card">
          <div className="step-number">2</div>
          <div className="step-content">
            <h3>Get Matched</h3>
            <p>
              We pair you with creators in your niche who align with your
              brand's style and goals.
            </p>
          </div>
        </div>
        <div className="step-card">
          <div className="step-number">3</div>
          <div className="step-content">
            <h3>Receive Content</h3>
            <p>
              Get a steady stream of photos and videos every month, ready for
              your feed.
            </p>
          </div>
        </div>
      </div>

      <button onClick={handleContinue} className="continue-button">
        Continue
      </button>
    </div>
  );
}

export default HowItWorksPage;
