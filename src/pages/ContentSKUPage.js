import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BrandRegistration.css'; // Reusing styles
import './ContentSKUPage.css';
import exampleVideo from '../assets/6003994-uhd_2160_3840_30fps.mp4';

const skuOptionsByNiche = {
  Fashion: {
    Reel: ['GRWM (Get Ready With Me)', 'Outfit Showcase', 'Styling Tips', 'Unboxing', 'Behind the Scenes', 'Trend Alert', 'Day in Life'],
    Post: ['Flat Lay', 'OOTD (Outfit of the Day)', 'Product Close-up', 'Mood Board', 'Street Style', 'Detail Shot'],
    Story: ['Poll: This or That?', 'Q&A', 'Quick Tip', 'Link to New Product', 'Countdown', 'Behind the Scenes (Raw)'],
  },
  Food: {
    Reel: ['Recipe Walkthrough', 'Restaurant Tour', 'Taste Test', 'Plating Technique', 'Chef Interview', 'Ingredient Focus'],
    Post: ['Final Dish Photo', 'Ingredient Spotlight', 'Menu Highlight', 'Interior Shot', 'Staff Feature'],
    Story: ['Cooking Process', 'Ask me anything', 'Poll on favorite dish', 'Reservation Link', 'Special of the Day'],
  },
  Travel: {
    Reel: ['City Guide', 'Hotel Tour', 'Hidden Gems', 'Packing Tips', 'Travel Vlog'],
    Post: ['Landscape Shot', 'Local Cuisine', 'Architecture', 'Selfie at Landmark'],
    Story: ['Travel Q&A', 'Location Tag', 'Packing List', 'Flight Updates']
  },
  Makeup: {
    Reel: ['Tutorial', 'Swatches', 'Review', 'Full Face', 'Hack'],
    Post: ['Product Shot', 'Before/After', 'Texture Shot', 'Look of the Day'],
    Story: ['GRWM', 'Product Link', 'Q&A', 'Poll']
  },
  Tech: {
    Reel: ['Unboxing', 'Review', 'Setup Tour', 'Tips & Tricks', 'Comparison'],
    Post: ['Desk Setup', 'Gadget Shot', 'Specs Sheet', 'Workspace'],
    Story: ['Poll', 'Q&A', 'Link', 'Behind the Scenes']
  },
  Lifestyle: {
    Reel: ['Morning Routine', 'Vlog', 'Organization', 'Wellness', 'Motivation'],
    Post: ['Aesthetic Shot', 'Quote', 'Home Decor', 'Self Care'],
    Story: ['Daily Affirmation', 'Poll', 'Q&A', 'Routine Checklist']
  }
};

function ContentSKUPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};
  const niche = state.niche || 'Fashion';

  // State to track counts: { Reel: { 'SKU1': 2 }, Post: { 'SKU2': 1 } }
  const [selections, setSelections] = useState({ Reel: {}, Post: {}, Story: {} });

  const skuOptions = skuOptionsByNiche[niche] || skuOptionsByNiche['Lifestyle'];
  const contentTypes = ['Reel', 'Post', 'Story'];

  const updateSelection = (type, sku, delta) => {
    const currentTypeSelections = selections[type] || {};
    const currentCount = currentTypeSelections[sku] || 0;
    const newCount = currentCount + delta;

    if (newCount < 0) return;

    setSelections({
      ...selections,
      [type]: {
        ...currentTypeSelections,
        [sku]: newCount
      }
    });
  };

  const handleContinue = (event) => {
    event.preventDefault();
    // Navigate to subscription tiers, passing the selections along with existing state
    navigate('/signup/business/subscription-tiers', { state: { ...state, selections } });
  };

  return (
    <div className="brand-onboarding-container">
      <header className="onboarding-header">
        <span className="eyebrow">Customize Your Plan</span>
        <h2>Choose Your Content Mix</h2>
        <p>Select the types and styles of content you need for the {niche} niche. This will create a custom plan for you.</p>
      </header>

      <form className="brand-onboarding-form" onSubmit={handleContinue}>
        {contentTypes.map((type) => {
          const currentTypeSelections = selections[type] || {};
          const currentTotal = Object.values(currentTypeSelections).reduce((a, b) => a + b, 0);
          const options = skuOptions[type] || [];

          return (
            <section key={type}>
              <h3>{type} Options ({currentTotal} selected)</h3>
              <p>Choose the {type.toLowerCase()}s you want this month. You can select multiple of the same style.</p>

              <div className="sku-grid">
                {options.map((option) => {
                  const count = currentTypeSelections[option] || 0;
                  return (
                    <div key={option} className={`sku-card ${count > 0 ? 'selected' : ''}`}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', minHeight: '40px' }}>
                        <div className="sku-info">
                          <span className="sku-name" style={{ fontWeight: '600' }}>{option}</span>
                        </div>
                        <div className="sku-controls">
                          <button type="button" className="sku-btn" onClick={() => updateSelection(type, option, -1)}>-</button>
                          <span className="sku-count">{count}</span>
                          <button type="button" className="sku-btn" onClick={() => updateSelection(type, option, 1)}>+</button>
                        </div>
                      </div>
                      <div>
                        <video 
                          src={exampleVideo} 
                          controls 
                          style={{ width: '100%', height: '350px', borderRadius: '8px', objectFit: 'cover', backgroundColor: '#f0f0f0' }} 
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
        
        <button type="submit" className="continue-button">Continue</button>
      </form>
    </div>
  );
}

export default ContentSKUPage;