import React, { useState } from "react";
import "./CampaignPage.css";
import profilePic from "../assets/profile-pic.jpg";

const campaignBrief = {
  title: "Midnight High Tea Campaign",
  brand: "Velvet Petal Boutique",
  summary:
    "Launch a limited-edition high tea experience with dreamy storytelling, soft-glow visuals, and baddie-approved product reveals.",
  objectives: [
    "Sell out 500 boxes in 10 days",
    "Lift Instagram followers 15%",
    "Generate 3,000 qualified site visits",
  ],
  deliverables: ["2 hero reels", "1 carousel", "4 story frames"],
  tone: "Soft glam, dreamy rituals, cafe aesthetic",
  targetAudience: "Luxury seekers, Gen Z baddies, city floral lovers",
  timeline: "Shoot window Nov 18-22 · Launch Nov 25",
};

const creatorsPool = [
  {
    id: 1,
    name: "Aurora Blake",
    vibe: "Soft glam rituals",
    reach: "112k / 4.8%",
    status: "applied",
    profilePic,
  },
  {
    id: 2,
    name: "Maison Hart",
    vibe: "Romantic cafe tours",
    reach: "86k / 4.2%",
    status: "shortlisted",
    profilePic,
  },
  {
    id: 3,
    name: "Luna Sloane",
    vibe: "Whimsical cottage",
    reach: "64k / 5.1%",
    status: "invited",
    profilePic,
  },
  {
    id: 4,
    name: "Noir Atelier",
    vibe: "Moody editorial beauty",
    reach: "48k / 3.9%",
    status: "ready",
    profilePic,
  },
];

const CampaignPage = () => {
  const [creators, setCreators] = useState(creatorsPool);

  const updateCreatorStatus = (creatorId, status) => {
    setCreators((prev) => prev.map((creator) => (creator.id === creatorId ? { ...creator, status } : creator)));
  };

  const handleShortlist = (creatorId) => updateCreatorStatus(creatorId, "shortlisted");
  const handleInvite = (creatorId) => updateCreatorStatus(creatorId, "invited");
  const handleAccept = (creatorId) => updateCreatorStatus(creatorId, "accepted");

  return (
    <div className="campaign-page">
      <section className="public-brief">
        <header>
          <span className="eyebrow">Campaign brief</span>
          <h1>{campaignBrief.title}</h1>
          <p>{campaignBrief.brand}</p>
        </header>
        <p className="summary">{campaignBrief.summary}</p>
        <div className="brief-grid">
          <div>
            <h4>Objectives</h4>
            <ul>
              {campaignBrief.objectives.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Deliverables</h4>
            <ul>
              {campaignBrief.deliverables.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Creative direction</h4>
            <p>{campaignBrief.tone}</p>
          </div>
          <div>
            <h4>Audience</h4>
            <p>{campaignBrief.targetAudience}</p>
          </div>
        </div>
        <span className="timeline">Timeline · {campaignBrief.timeline}</span>
      </section>

      <section className="creator-pool">
        <div className="section-heading">
          <span className="eyebrow">Applicants & boosts</span>
          <h2>Shortlist creators for this campaign</h2>
          <p>Select creators to invite or accept. They see the same brief above.</p>
        </div>
        <div className="creator-grid">
          {creators.map((creator) => (
            <article key={creator.id} className="creator-card">
              <div className="creator-top">
                <img src={creator.profilePic} alt={creator.name} />
                <div>
                  <h3>{creator.name}</h3>
                  <span>{creator.vibe}</span>
                  <small>{creator.reach}</small>
                </div>
              </div>
              <div className="creator-actions">
                {creator.status === "applied" && (
                  <>
                    <button className="outline-button" onClick={() => handleShortlist(creator.id)}>
                      Shortlist
                    </button>
                    <button className="start-button" onClick={() => handleInvite(creator.id)}>
                      Invite
                    </button>
                  </>
                )}
                {creator.status === "shortlisted" && (
                  <button className="start-button" onClick={() => handleInvite(creator.id)}>
                    Send invite
                  </button>
                )}
                {creator.status === "invited" && (
                  <button className="outline-button" onClick={() => handleAccept(creator.id)}>
                    Mark accepted
                  </button>
                )}
                {creator.status === "accepted" && <span className="status-pill accepted">Accepted</span>}
                {creator.status === "ready" && (
                  <button className="start-button" onClick={() => handleInvite(creator.id)}>
                    Invite to apply
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CampaignPage;
