import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./BrandDetails.css";
import profilePic from "../assets/profile-pic.jpg";

const brandBriefs = [
  {
    id: 1,
    name: "Velvet Petal Boutique",
    profilePic,
    industry: "Luxury florals & gifting",
    audience: "Romantic shoppers, brides, and milestone celebrations",
    deliverables: ["1 hero reel", "2 carousel posts", "15 story frames"],
    talkingPoints: [
      "Highlight hand-tied bouquets and pearl-detailed packaging.",
      "Feature the in-store tea room experience.",
      "Mention same-day delivery within downtown neighborhoods.",
    ],
    timeline: "Shoot between Nov 24 - Dec 2. Launch during Holiday High Tea campaign.",
    perks: ["Custom floral install worth $550", "Dedicated co-branded landing page"],
  },
  {
    id: 2,
    name: "Maison Lumiere",
    profilePic,
    industry: "Hand-poured candles",
    audience: "Design-savvy millennials, gifting shoppers",
    deliverables: ["2 ASMR reels", "1 blog feature"],
    talkingPoints: [
      "Focus on scent storytelling and candle-care rituals.",
      "Showcase black and blush packaging details.",
    ],
    timeline: "Content window Jan 4 - Jan 16.",
    perks: ["Monthly product drops", "Revenue-sharing affiliate link"],
  },
];

const BrandDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const brief = brandBriefs.find((brand) => brand.id === parseInt(id, 10));

  if (!brief) {
    return <div className="brand-brief-missing">Brand brief not found.</div>;
  }

  return (
    <div className="brand-brief-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back to matches
      </button>
      <div className="brand-brief-card">
        <div className="brand-hero">
          <img src={brief.profilePic} alt={`${brief.name} logo`} />
          <div>
            <h2>{brief.name}</h2>
            <p className="brand-tag">{brief.industry}</p>
            <p className="brand-audience">
              <strong>Audience focus:</strong> {brief.audience}
            </p>
          </div>
        </div>

        <section>
          <h3>Deliverables</h3>
          <div className="chip-list">
            {brief.deliverables.map((item) => (
              <span key={item} className="chip">
                {item}
              </span>
            ))}
          </div>
        </section>

        <section>
          <h3>Creative direction</h3>
          <ul>
            {brief.talkingPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </section>

        <section>
          <h3>Timeline</h3>
          <p>{brief.timeline}</p>
        </section>

        <section>
          <h3>Perks & support</h3>
          <div className="chip-list">
            {brief.perks.map((perk) => (
              <span key={perk} className="chip">
                {perk}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default BrandDetails;