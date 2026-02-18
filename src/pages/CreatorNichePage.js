import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BrandRegistration.css"; // Reusing onboarding styles

const nicheOptions = [
  "Food & Dining",
  "Travel & Adventure",
  "Fashion & Style",
  "Beauty & Makeup",
  "Tech & Gadgets",
  "Home & Lifestyle",
  "Fitness & Health",
  "Gaming",
];

function CreatorNichePage() {
  const [selectedNiche, setSelectedNiche] = useState("Fashion & Style");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleContinue = (event) => {
    event.preventDefault();
    navigate("/signup/creator/how-it-works", { state: { niche: selectedNiche, description } });
  };

  return (
    <div className="brand-onboarding-container">
      <header className="onboarding-header">
        <span className="eyebrow">Creator Onboarding</span>
        <h2>Define your Niche</h2>
        <p>Tell us what kind of content you specialize in.</p>
      </header>

      <form className="brand-onboarding-form" onSubmit={handleContinue}>
        <section>
          <h3>Select your primary niche</h3>
          <div className="chip-grid">
            {nicheOptions.map((niche) => (
              <button
                type="button"
                key={niche}
                className={selectedNiche === niche ? "chip selected" : "chip"}
                onClick={() => setSelectedNiche(niche)}
              >
                {niche}
              </button>
            ))}
          </div>
        </section>

        <section className="input-section">
          <label>
            Describe your style & capabilities
            <textarea
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., I specialize in high-energy transitions and cinematic food b-roll. I shoot on a Sony A7IV..."
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '12px',
                border: '1px solid rgba(58, 39, 53, 0.16)',
                background: 'rgba(255, 255, 255, 0.92)',
                fontFamily: 'inherit',
                resize: 'vertical'
              }}
            />
          </label>
        </section>

        <button type="submit" className="continue-button">
          Continue
        </button>
      </form>
    </div>
  );
}

export default CreatorNichePage;