import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './SearchResultsPage.css';

function SearchResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const results = location.state?.results || [];

  const handleSearchAgain = () => {
    navigate('/search');
  };

  return (
    <div className="search-results">
      <header className="results-header">
        <div>
          <span className="eyebrow">Curated matches</span>
          <h2>
            {results.length
              ? `We found ${results.length} creator${results.length > 1 ? 's' : ''} for your brief`
              : 'No creators match all of your filters yet'}
          </h2>
        </div>
        <button onClick={handleSearchAgain} className="search-again-button">
          Refine filters
        </button>
      </header>

      {results.length > 0 ? (
        results.map((creator) => (
          <div key={creator.name} className="result-card">
            <div className="result-main">
              <div className="creator-meta">
                <span className="creator-name">{creator.name}</span>
                <span className="creator-bio">{creator.bio}</span>
              </div>
              <div className="creator-pill-row">
                <strong>Aesthetics:</strong>
                {creator.aesthetics.map((tag) => (
                  <span key={tag} className="pill">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="creator-pill-row">
                <strong>Goals supported:</strong>
                {creator.goals.map((goal) => (
                  <span key={goal} className="pill">
                    {goal}
                  </span>
                ))}
              </div>
              <div className="creator-pill-row">
                <strong>Deliverables:</strong>
                {creator.deliverables.map((item) => (
                  <span key={item} className="pill">
                    {item}
                  </span>
                ))}
              </div>
              <span className="creator-rating">{'✶'.repeat(creator.rating)}</span>
            </div>
            <Link to={`/creator/${creator.name}`} state={{ creator }}>
              <button className="select-button">Preview profile</button>
            </Link>
          </div>
        ))
      ) : (
        <div className="empty-state">
          <p>
            Try loosening one of your filters or invite our concierge team to scout bespoke talent for
            you.
          </p>
        </div>
      )}
    </div>
  );
}

export default SearchResultsPage;
