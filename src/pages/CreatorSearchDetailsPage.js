import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import './CreatorSearchDetailsPage.css';
import profileIcon from '../assets/profile-pic.jpg';

function CreatorSearchDetailsPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const creator = location.state?.creator;

  if (!creator) {
    return <div className="creator-missing">Creator profile not found.</div>;
  }

  const handleStartCollab = () => {
    navigate(`/schedule/${id}`, { state: { creator } });
  };

  return (
    <div className="creator-details-container">
      <div className="creator-hero">
        <img src={profileIcon} alt={`${creator.name} profile`} />
        <div>
          <h1>{creator.name}</h1>
          <p className="creator-rating">{'✶'.repeat(creator.rating)}</p>
          <p className="creator-bio">{creator.bio}</p>
        </div>
      </div>

      <section>
        <h3>Aesthetic palette</h3>
        <div className="chip-list">
          {creator.aesthetics.map((item) => (
            <span key={item} className="chip">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section>
        <h3>Campaign sweet spots</h3>
        <div className="chip-list">
          {creator.goals.map((item) => (
            <span key={item} className="chip">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section>
        <h3>Deliverables offered</h3>
        <div className="chip-list">
          {creator.deliverables.map((item) => (
            <span key={item} className="chip">
              {item}
            </span>
          ))}
        </div>
      </section>

      <button className="start-collab-button" onClick={handleStartCollab}>
        Start collaboration
      </button>
    </div>
  );
}

export default CreatorSearchDetailsPage;