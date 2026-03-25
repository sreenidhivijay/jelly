import React, { useEffect, useState } from "react";
import "./YourCampaigns.css";

const dayMs = 24 * 60 * 60 * 1000;
const relativeDate = (offsetDays) => new Date(Date.now() + offsetDays * dayMs).toISOString();

const availableCampaigns = [
  {
    id: "moonlit-latte",
    brand: "Velvet Petal Boutique",
    title: "Moonlit Latte Pop-Up Campaign",
    payout: "$1,400 + product",
    deliverables: ["1 reel", "3 story frames"],
    deadline: "Apply by Nov 20",
    vibe: "Soft glam, cafe moments",
    status: "open",
  },
  {
    id: "noir-skin",
    brand: "Glow Cartel",
    title: "Noir Skin Collection Launch",
    payout: "$900 flat",
    deliverables: ["UGC review", "High-res stills"],
    deadline: "Apply by Nov 18",
    vibe: "Glass skin, luxe baddie",
    status: "open",
  },
];

const shortlistedCampaignsData = [
  {
    id: "tea-baddie",
    brand: "Maison Lumiere",
    title: "Tea Baddie Capsule Collaboration",
    payout: "$1,600 + revenue share",
    deliverables: ["Hero reel", "Story set"],
    inviteExpiresIn: "44h",
    status: "invited",
  },
  {
    id: "midnight-tea",
    brand: "Velvet Petal Boutique",
    title: "Midnight High Tea Campaign",
    payout: "$2,300",
    deliverables: ["2 reels", "Carousel"],
    inviteExpiresIn: "12h",
    status: "accepted",
    acceptedAt: relativeDate(-1),
    dueAt: relativeDate(4),
    assets: [],
  },
];

const YourCampaigns = () => {
  const [shortlistedCampaigns, setShortlistedCampaigns] = useState(shortlistedCampaignsData);
  const [selectedCampaignId, setSelectedCampaignId] = useState(shortlistedCampaignsData[0].id);
  const [applications, setApplications] = useState([]);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(id);
  }, []);

  const handleApply = (campaignId) => {
    if (!applications.includes(campaignId)) {
      setApplications((prev) => [...prev, campaignId]);
    }
  };

  const handleAcceptInvite = (campaignId) => {
    setShortlistedCampaigns((prev) =>
      prev.map((campaign) =>
        campaign.id === campaignId
          ? {
              ...campaign,
              status: "accepted",
              acceptedAt: new Date().toISOString(),
              dueAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
              assets: [],
            }
          : campaign
      )
    );
  };

  const handleUploadAsset = (campaignId, file) => {
    setShortlistedCampaigns((prev) =>
      prev.map((campaign) =>
        campaign.id === campaignId
          ? {
              ...campaign,
              assets: [...(campaign.assets || []), file],
              status: "delivered",
            }
          : campaign
      )
    );
  };

  const formatDate = (isoString) => {
    if (!isoString) return "—";
    return new Date(isoString).toLocaleDateString(undefined, { month: "short", day: "numeric" });
  };

  const formatCountdown = (isoString) => {
    if (!isoString) return "—";
    const diff = new Date(isoString) - now;
    if (diff <= 0) return "0d 0h";
    const dayMs = 24 * 60 * 60 * 1000;
    const hourMs = 60 * 60 * 1000;
    const days = Math.floor(diff / dayMs);
    const hours = Math.floor((diff % dayMs) / hourMs);
    return `${days}d ${hours}h`;
  };

  const getTabMeta = (campaign) => {
    if (campaign.status === "accepted") {
      return `Due in ${formatCountdown(campaign.dueAt)}`;
    }
    if (campaign.status === "delivered") {
      return "Delivered";
    }
    return `${campaign.inviteExpiresIn} left`;
  };

  const selectedCampaign = shortlistedCampaigns.find((campaign) => campaign.id === selectedCampaignId);

  return (
    <div className="creator-campaigns-page">
      <header className="page-header">
        <span className="header-eyebrow">Creator workspace</span>
        <h2>Campaign applications & invites</h2>
        <p>Apply to open campaigns, accept shortlist invites within 48 hours, and upload deliverables when you’re done.</p>
      </header>

      <section className="campaign-section">
        <div className="section-heading">
          <span className="section-eyebrow">Open opportunities</span>
          <h3>Apply to campaigns</h3>
          <p>Campaigns you can apply to right now. We’ll notify you if the brand shortlists you.</p>
        </div>
        <div className="campaign-grid">
          {availableCampaigns.map((campaign) => (
            <article key={campaign.id} className="campaign-card">
              <div className="campaign-top">
                <h4>{campaign.title}</h4>
                <span className="campaign-brand">{campaign.brand}</span>
              </div>
              <p className="campaign-payout">{campaign.payout}</p>
              <p className="campaign-deliverables">{campaign.deliverables.join(" • ")}</p>
              <p className="campaign-vibe">{campaign.vibe}</p>
              <div className="campaign-meta">
                <span>{campaign.deadline}</span>
              </div>
              <button
                className="apply-button"
                onClick={() => handleApply(campaign.id)}
                disabled={applications.includes(campaign.id)}
              >
                {applications.includes(campaign.id) ? "Applied" : "Apply"}
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="campaign-section">
        <div className="section-heading">
          <span className="section-eyebrow">Shortlist</span>
          <h3>Invitations & deliveries</h3>
          <p>Invites expire in 48 hours. Accept to confirm, then upload deliverables within 5 days.</p>
        </div>
        <div className="shortlist-layout">
          <div className="shortlist-tabs">
            {shortlistedCampaigns.map((campaign) => (
              <button
                key={campaign.id}
                className={`shortlist-tab ${campaign.id === selectedCampaignId ? "active" : ""}`}
                onClick={() => setSelectedCampaignId(campaign.id)}
              >
                <span>{campaign.title}</span>
                <small>{getTabMeta(campaign)}</small>
              </button>
            ))}
          </div>
          {selectedCampaign && (
            <div className="shortlist-detail">
              <div className="detail-top">
                <h4>{selectedCampaign.title}</h4>
                <span>{selectedCampaign.brand}</span>
              </div>
              <p className="campaign-payout">{selectedCampaign.payout}</p>
              <p className="campaign-deliverables">{selectedCampaign.deliverables.join(" • ")}</p>
              {selectedCampaign.status !== "accepted" && selectedCampaign.status !== "delivered" ? (
                <div className="invite-actions">
                  <span className="status-pill pending">Invite expires in {selectedCampaign.inviteExpiresIn}</span>
                  <button className="start-collab-button" onClick={() => handleAcceptInvite(selectedCampaign.id)}>
                    Accept invite
                  </button>
                </div>
              ) : selectedCampaign.status === "accepted" ? (
                <div className="delivery-block">
                  <span className="status-pill accepted">
                    Accepted on {formatDate(selectedCampaign.acceptedAt)} · Due in {formatCountdown(selectedCampaign.dueAt)}
                  </span>
                  <span className="accepted-meta">
                    Deliverables must be uploaded within 5 days of acceptance.
                  </span>
                  <label className="upload-field">
                    <span>Upload proof of delivery</span>
                    <input
                      type="file"
                      accept="video/*,image/*"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (file) {
                          handleUploadAsset(selectedCampaign.id, file.name);
                        }
                      }}
                    />
                  </label>
                  {selectedCampaign.assets && selectedCampaign.assets.length > 0 && (
                    <ul className="asset-list">
                      {selectedCampaign.assets.map((asset, index) => (
                        <li key={index}>{asset}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <div className="delivery-block delivered">
                  <span className="status-pill accepted">
                    Accepted on {formatDate(selectedCampaign.acceptedAt)}
                  </span>
                  <span className="accepted-meta">Delivered · awaiting brand review</span>
                  {selectedCampaign.assets && selectedCampaign.assets.length > 0 && (
                    <ul className="asset-list">
                      {selectedCampaign.assets.map((asset, index) => (
                        <li key={index}>{asset}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default YourCampaigns;