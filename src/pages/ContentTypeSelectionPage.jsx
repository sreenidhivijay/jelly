import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BrandRegistration.css'; // Reusing styles

const contentOptionsByNiche = {
  Food: [
    'IG reel showcasing the restaurant',
    'Slideshow carousel of food in restaurant',
    'Still picture of the creator enjoying the restaurant',
    'A day in the life of a chef (Reel)',
    'Recipe video',
  ],
  Travel: [
    'Travel vlog (Reel)',
    'Top 5 spots in a city (Carousel)',
    'Hotel/resort tour',
    'Travel tips (Story)',
  ],
  Fashion: [
    'Outfit of the day (OOTD) post',
    'Get ready with me (GRWM) Reel',
    'Haul video/reel',
    'Styling a single piece multiple ways (Carousel)',
  ],
  Makeup: [
    'Makeup tutorial (Reel)',
    'Product review (Carousel)',
    'Before and after transformation',
    'Swatches of products (Story)',
  ],
  Tech: [
    'Unboxing video',
    'Product review (Reel)',
    '"How-to" tutorial',
    'Desk setup tour (Carousel)',
  ],
  Lifestyle: [
    'A day in my life (Vlog/Reel)',
    'Morning/evening routine',
    'Q&A Session (Story)',
    'Favorite products (Carousel)',
  ],
};

function ContentTypeSelectionPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { niche } = location.state || { niche: 'Food' }; // Default to food if no state

  const [selectedContentTypes, setSelectedContentTypes] = useState([]);

  const contentOptions = contentOptionsByNiche[niche] || contentOptionsByNiche['Lifestyle'];

  const toggleSelection = (item) => {
    if (selectedContentTypes.includes(item)) {
      setSelectedContentTypes(selectedContentTypes.filter((value) => value !== item));
    } else {
      setSelectedContentTypes([...selectedContentTypes, item]);
    }
  };

  const handleContinue = (event) => {
    event.preventDefault();
    navigate('/signup/business/posting-frequency', { state: { niche, contentTypes: selectedContentTypes } });
  };

  return (
    <div className="brand-onboarding-container">
      <header className="onboarding-header">
        <span className="eyebrow">Business Onboarding</span>
        <h2>Popular types of content for your niche: {niche}</h2>
        <p>Choose as many as you want. This helps us understand your needs.</p>
      </header>

      <form className="brand-onboarding-form" onSubmit={handleContinue}>
        <div className="chip-grid">
          {contentOptions.map((option) => (
            <button type="button" key={option} className={selectedContentTypes.includes(option) ? 'chip selected' : 'chip'} onClick={() => toggleSelection(option)}>
              {option}
            </button>
          ))}
        </div>
        <button type="submit" className="continue-button">Continue</button>
      </form>
    </div>
  );
}

export default ContentTypeSelectionPage;