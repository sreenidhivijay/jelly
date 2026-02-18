import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./YourCreators.css";
import profilePic from "../assets/profile-pic.jpg";
import { BRAND_APPLICATIONS_KEY, BRAND_APPLICATION_ADDED_EVENT } from "../utils/storageKeys";
import { getStoredBrandApplications } from "../utils/brandApplications";

const projectsData = [
  {
    id: "midnight-tea",
    name: "Midnight High Tea Drop",
    goal: "Launch a limited-edition high tea experience with dreamy storytelling, glowy visuals, and product reveal. Push to sell out 500 limited-edition boxes",
    metric: "Lift D2C sales 25%",
    timeline: "Launch window Dec 1-10",
    applicants: [
      {
        id: 1,
        name: "Aurora Blake",
        vibe: "Soft glam rituals",
        expertise: ["Soft glam reels", "Mini-vlog campaigns", "Pinterest-ready stills"],
        availability: "Ready to shoot next week",
        status: "applied",
        profilePic,
      },
      {
        id: 2,
        name: "Maison Hart",
        vibe: "Romantic café tours",
        expertise: ["Stop-motion stories", "Editorial flatlays", "Interview segments"],
        availability: "Can deliver in 12 days",
        status: "shortlisted",
        profilePic,
      },
    ],
    recommendations: [
      {
        id: 5,
        name: "Noir Atelier",
        vibe: "Moody editorial beauty",
        expertise: ["TikTok videos", "High-res stills"],
        availability: "Needs 7-day prep",
        status: "ready",
        profilePic,
      },
    ],
  },
  {
    id: "velvet-baddie",
    name: "Velvet Baddie Capsule",
    goal: "Drive 3k qualified site visits",
    metric: "Increase IG followers 15%",
    timeline: "Rolling content Dec-Jan",
    applicants: [
      {
        id: 3,
        name: "Luna Sloane",
        vibe: "Whimsical cottage luxury",
        expertise: ["Story sequences", "Pinterest carousels", "Blog features"],
        availability: "Accepting projects mid-Dec",
        status: "invited",
        profilePic,
      },
    ],
    recommendations: [
      {
        id: 6,
        name: "Babe Studio",
        vibe: "Clean girl ASMR",
        expertise: ["Story takeovers", "ASMR reels"],
        availability: "Ready in 5 days",
        status: "ready",
        profilePic,
      },
      {
        id: 7,
        name: "Glow Cartel",
        vibe: "Glass-skin editorial",
        expertise: ["High-res stills", "UGC reviews"],
        availability: "Needs concept call",
        status: "invited-to-apply",
        profilePic,
      },
    ],
  },
];

const applicantStatusCopy = {
  applied: { label: "Applied", tone: "neutral" },
  shortlisted: { label: "Shortlisted", tone: "pending" },
  invited: { label: "Collab invite sent", tone: "pending" },
  accepted: { label: "Accepted · schedule kickoff", tone: "accepted" },
};

const recommendationStatusCopy = {
  ready: "Ready to invite",
  "invited-to-apply": "Invite sent by you",
};

const YourCreators = () => {
  const navigate = useNavigate();
  const [activeProjectId, setActiveProjectId] = useState(projectsData[0].id);
  const [projectState, setProjectState] = useState(projectsData);

  const updateProject = (projectId, updater) => {
    setProjectState((prev) =>
      prev.map((project) => (project.id === projectId ? updater(project) : project))
    );
  };

  const activeProject = projectState.find((project) => project.id === activeProjectId);

  const handleViewProfile = (creatorId) => {
    navigate(`/creator-profile/${creatorId}`);
  };

  const handleShortlistApplicant = (projectId, creatorId) => {
    updateProject(projectId, (project) => ({
      ...project,
      applicants: project.applicants.map((creator) =>
        creator.id === creatorId ? { ...creator, status: "shortlisted" } : creator
      ),
    }));
  };

  const handleInviteApplicant = (projectId, creatorId) => {
    updateProject(projectId, (project) => ({
      ...project,
      applicants: project.applicants.map((creator) =>
        creator.id === creatorId ? { ...creator, status: "invited" } : creator
      ),
    }));
  };

  const handleUnshortlistApplicant = (projectId, creatorId) => {
    updateProject(projectId, (project) => ({
      ...project,
      applicants: project.applicants.map((creator) =>
        creator.id === creatorId ? { ...creator, status: "applied" } : creator
      ),
    }));
  };

  const handleMarkAccepted = (projectId, creatorId) => {
    updateProject(projectId, (project) => ({
      ...project,
      applicants: project.applicants.map((creator) =>
        creator.id === creatorId ? { ...creator, status: "accepted" } : creator
      ),
    }));
  };

  const handleInviteToApply = (projectId, creatorId) => {
    updateProject(projectId, (project) => ({
      ...project,
      recommendations: project.recommendations.map((creator) =>
        creator.id === creatorId ? { ...creator, status: "invited-to-apply" } : creator
      ),
    }));
  };

  const handleMarkAppliedFromInvite = (projectId, creatorId) => {
    updateProject(projectId, (project) => {
      const creator = project.recommendations.find((item) => item.id === creatorId);
      if (!creator) return project;
      return {
        ...project,
        recommendations: project.recommendations.filter((item) => item.id !== creatorId),
        applicants: [
          ...project.applicants,
          { ...creator, status: "applied" },
        ],
      };
    });
  };

  const renderApplicantActions = (projectId, creator) => {
    if (creator.status === "applied") {
      return (
        <>
          <button className="outline-button" onClick={() => handleShortlistApplicant(projectId, creator.id)}>
            Shortlist
          </button>
          {/* <button className="start-collab-button" onClick={() => handleInviteApplicant(projectId, creator.id)}>
            Invite to collab
          </button> */}
        </>
      );
    }

    if (creator.status === "shortlisted") {
      return (
        <>
          <button
            className="outline-button active-outline"
            onClick={() => handleUnshortlistApplicant(projectId, creator.id)}
          >
            Shortlisted
          </button>
          {/* <button className="start-collab-button" onClick={() => handleInviteApplicant(projectId, creator.id)}>
            Invite to collab
          </button> */}
        </>
      );
    }

    if (creator.status === "invited") {
      return (
        <button className="outline-button" onClick={() => handleMarkAccepted(projectId, creator.id)}>
          Mark as accepted
        </button>
      );
    }

    if (creator.status === "accepted") {
      return (
        <button
          className="start-collab-button"
          onClick={() => navigate(`/schedule/${creator.id}`, { state: { creator } })}
        >
          Schedule kickoff
        </button>
      );
    }

    return null;
  };

  const renderRecommendationActions = (projectId, creator) => {
    if (creator.status === "ready") {
      return (
        <button className="start-collab-button" onClick={() => handleInviteToApply(projectId, creator.id)}>
          Invite to apply
        </button>
      );
    }

    if (creator.status === "invited-to-apply") {
      return (
        <button className="outline-button" onClick={() => handleMarkAppliedFromInvite(projectId, creator.id)}>
          Mark as application received
        </button>
      );
    }

    return null;
  };

  return (
    <div className="saved-creators-page">
      <header className="page-header">
        <span className="header-eyebrow">Campaign control center</span>
        <h2>Manage applicants & boosted invites</h2>
        <p>
          Creators apply to each campaign. Invite them to your shortlist, or tap a Jelly boost if applications are
          running low.
        </p>
      </header>

      <div className="project-tabs">
        {projectState.map((project) => (
          <button
            key={project.id}
            className={`project-tab ${project.id === activeProjectId ? "active" : ""}`}
            onClick={() => setActiveProjectId(project.id)}
          >
            <span>{project.name}</span>
            <small>{project.metric}</small>
          </button>
        ))}
      </div>

      <div className="project-brief card-dark">
        <div>
          <h3>{activeProject.name}</h3>
          <p>{activeProject.goal}</p>
        </div>
        <div className="brief-meta">
          <span>Primary KPI: {activeProject.metric}</span>
          <span>Timeline: {activeProject.timeline}</span>
        </div>
      </div>

      <div className="project-columns">
        <div className="column-card card-dark">
          <div className="column-header">
            <h4>Creator applications ({activeProject.applicants.length})</h4>
            <small>Creators applied directly to this campaign.</small>
          </div>
          {activeProject.applicants.length ? (
            activeProject.applicants.map((creator) => {
              const status = applicantStatusCopy[creator.status] || applicantStatusCopy.applied;
              return (
                <div className="creator-card applicant-card" key={`${activeProject.id}-applicant-${creator.id}`}>
                  <div className="profile-section">
                    <img src={creator.profilePic} alt={`${creator.name} profile`} className="profile-image" />
                    <div className="creator-info">
                      <h3>{creator.name}</h3>
                      <p>
                        <strong>Signature vibe:</strong> {creator.vibe}
                      </p>
                      <div>
                        <strong>Deliverables:</strong>
                        {creator.expertise.map((item, index) => (
                          <span key={index} className="expertise-tag">
                            {item}
                          </span>
                        ))}
                      </div>
                      <p className="availability">{creator.availability}</p>
                      <span className={`status-pill ${status.tone}`}>{status.label}</span>
                    </div>
                  </div>
                  <div className="creator-actions">
                    <button className="view-profile-button" onClick={() => handleViewProfile(creator.id)}>
                      View profile
                    </button>
                    {renderApplicantActions(activeProject.id, creator)}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="empty-state-card">
              <p>No creators have applied yet. Jelly is sending a boost of invites for you.</p>
            </div>
          )}
        </div>

        <div className="column-card card-dark">
          <div className="column-header">
            <h4>Creators recommended for you ({activeProject.recommendations.length})</h4>
            <small>Tap to invite curated creators to apply.</small>
          </div>
          {activeProject.recommendations.length ? (
            activeProject.recommendations.map((creator) => (
              <div className="creator-card recommendation-card" key={`${activeProject.id}-rec-${creator.id}`}>
                <div className="profile-section">
                  <img src={creator.profilePic} alt={`${creator.name} profile`} className="profile-image" />
                  <div className="creator-info">
                    <h3>{creator.name}</h3>
                    <p>
                      <strong>Signature vibe:</strong> {creator.vibe}
                    </p>
                    <div>
                      <strong>Deliverables:</strong>
                      {creator.expertise.map((item, index) => (
                        <span key={index} className="expertise-tag">
                          {item}
                        </span>
                      ))}
                    </div>
                    <p className="availability">{creator.availability}</p>
                    <span className="status-subtle">{recommendationStatusCopy[creator.status]}</span>
                  </div>
                </div>
                <div className="creator-actions">
                  <button className="view-profile-button" onClick={() => handleViewProfile(creator.id)}>
                    View profile
                  </button>
                  {renderRecommendationActions(activeProject.id, creator)}
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state-card">
              <p>
                You have invited everyone in this boost. Request another round if you need more applicants.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default YourCreators;