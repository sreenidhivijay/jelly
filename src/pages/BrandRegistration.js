import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BrandRegistration.css";

const nicheOptions = [
  "Food",
  "Travel",
  "Fashion",
  "Makeup",
  "Tech",
  "Lifestyle",
];

function BrandRegistration() {
  const [selectedNiche, setSelectedNiche] = useState("Food");
  const navigate = useNavigate();

  const handleContinue = (event) => {
    event.preventDefault();
    // Navigate to the next step, passing the selected niche
    navigate("/signup/business/content-types", { state: { niche: selectedNiche } });
  };

  return (
    <div className="brand-onboarding-container">
      <header className="onboarding-header">
        <span className="eyebrow">Business Onboarding</span>
        <h2>Select your business niche</h2>
        <p>This will help us tailor content suggestions for you.</p>
      </header>

      <form className="brand-onboarding-form" onSubmit={handleContinue}>
        <section>
          <h3>Business Niche</h3>
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

        <button type="submit" className="continue-button">
          Continue
        </button>
      </form>
    </div>
  );
}

export default BrandRegistration;