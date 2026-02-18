import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreatorRegistration.css";

const contentPillars = [
  "Soft glam rituals",
  "Boutique travel",
  "Cafe culture",
  "Floral styling",
  "Beauty routines",
  "Home vignettes",
];

const deliverableOptions = [
  "Instagram Reels",
  "TikTok videos",
  "Story sequences",
  "High-res stills",
  "Livestream events",
  "Newsletter content",
];

const CreatorRegistration = () => {
  const [selectedPillars, setSelectedPillars] = useState([]);
  const [selectedDeliverables, setSelectedDeliverables] = useState([]);
  const [portfolioLink, setPortfolioLink] = useState("");
  const [mediaKitFile, setMediaKitFile] = useState(null);
  const navigate = useNavigate();

  const toggleSelection = (item, selected, setSelected) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((value) => value !== item));
    } else {
      setSelected([...selected, item]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/signup/creator/terms");
  };

  return (
    <div className="creator-registration-container">
      <header className="registration-header">
        <span className="eyebrow">Creator onboarding</span>
        <h2>Shape your Jelly profile</h2>
        <p>
          Tell us what you adore creating and how baddie-approved brands can collaborate with you. We use this to craft
          bespoke matches.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="creator-registration-form">
        <section>
          <h3>Content pillars</h3>
          <p>Select the aesthetics and storylines that feel the most you.</p>
          <div className="tag-grid">
            {contentPillars.map((pillar) => (
              <button
                type="button"
                key={pillar}
                className={selectedPillars.includes(pillar) ? "tag selected" : "tag"}
                onClick={() => toggleSelection(pillar, selectedPillars, setSelectedPillars)}
              >
                {pillar}
              </button>
            ))}
          </div>
        </section>

        <section>
          <h3>Deliverables you offer</h3>
          <p>Choose everything you are comfortable producing for dreamy brand partners.</p>
          <div className="tag-grid">
            {deliverableOptions.map((deliverable) => (
              <button
                type="button"
                key={deliverable}
                className={selectedDeliverables.includes(deliverable) ? "tag selected" : "tag"}
                onClick={() =>
                  toggleSelection(deliverable, selectedDeliverables, setSelectedDeliverables)
                }
              >
                {deliverable}
              </button>
            ))}
          </div>
        </section>

        <section className="input-grid">
          <label>
            Portfolio or channel link
            <input
              type="url"
              value={portfolioLink}
              onChange={(event) => setPortfolioLink(event.target.value)}
              placeholder="https://"
              required
            />
          </label>

          <label className="upload-field">
            Media kit upload
            <input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={(event) => setMediaKitFile(event.target.files?.[0] || null)}
              required
            />
            <span>{mediaKitFile ? mediaKitFile.name : "Attach PDF or image"}</span>
          </label>
        </section>

        <button type="submit" className="submit-button">
          Continue to terms
        </button>
      </form>
    </div>
  );
};

export default CreatorRegistration;