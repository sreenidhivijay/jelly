import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchCriteriaPage.css';
import profileIcon from '../assets/profile-pic.jpg';

const availableAesthetics = [
  'Soft glam',
  'Pastel editorial',
  'Moody noir',
  'Vintage diaries',
  'Whimsical cottage',
  'Clean girl',
];

const availableGoals = [
  'Product reveal',
  'Store opening',
  'Seasonal launch',
  'Brand storytelling',
  'Evergreen content',
  'Affiliate push',
];

const availableDeliverables = [
  'Instagram Reels',
  'TikTok videos',
  'Story sequences',
  'Pinterest carousels',
  'Blog feature',
  'Email content',
];

const creators = [
  {
    name: 'Aurora Blake',
    bio: 'Soft-glow reels, dreamy café tours, and romantic product styling. 112k followers with 4.8% engagement.',
    rating: 5,
    aesthetics: ['Soft glam', 'Vintage diaries'],
    goals: ['Product reveal', 'Brand storytelling'],
    deliverables: ['Instagram Reels', 'Story sequences', 'Pinterest carousels'],
    tone: 'Romantic',
    profilePic: profileIcon,
  },
  {
    name: 'Maison Hart',
    bio: 'Boutique travel diaries and moody espresso moments. 86k followers, hero on TikTok for cozy luxury.',
    rating: 4,
    aesthetics: ['Moody noir', 'Pastel editorial'],
    goals: ['Store opening', 'Seasonal launch'],
    deliverables: ['TikTok videos', 'Instagram Reels'],
    tone: 'Elegant',
    profilePic: profileIcon,
  },
  {
    name: 'Luna Sloane',
    bio: 'Slow mornings, atelier walkthroughs, and softly lit product flatlays perfect for elevated gifting.',
    rating: 5,
    aesthetics: ['Soft glam', 'Whimsical cottage'],
    goals: ['Evergreen content', 'Brand storytelling'],
    deliverables: ['Blog feature', 'Pinterest carousels', 'Story sequences'],
    tone: 'Calming',
    profilePic: profileIcon,
  },
];

function SearchCriteriaPage() {
  const [aesthetics, setAesthetics] = useState(['Soft glam']);
  const [campaignGoals, setCampaignGoals] = useState(['Product reveal']);
  const [deliverables, setDeliverables] = useState(['Instagram Reels']);
  const [tonePreference, setTonePreference] = useState('Any');
  const [showAestheticDropdown, setShowAestheticDropdown] = useState(false);
  const [showGoalDropdown, setShowGoalDropdown] = useState(false);
  const [showDeliverableDropdown, setShowDeliverableDropdown] = useState(false);
  const navigate = useNavigate();

  const addItem = (value, list, setList, toggle) => {
    if (value && !list.includes(value)) {
      setList([...list, value]);
    }
    toggle(false);
  };

  const removeItem = (index, list, setList) =>
    setList(list.filter((_, i) => i !== index));

  const handleSearch = () => {
    const filteredResults = creators.filter((creator) => {
      const matchesAesthetic = aesthetics.every((aesthetic) =>
        creator.aesthetics.includes(aesthetic)
      );
      const matchesGoals = campaignGoals.every((goal) =>
        creator.goals.includes(goal)
      );
      const matchesDeliverables = deliverables.every((deliverable) =>
        creator.deliverables.includes(deliverable)
      );
      const matchesTone =
        tonePreference === 'Any' || creator.tone === tonePreference;

      return matchesAesthetic && matchesGoals && matchesDeliverables && matchesTone;
    });

    navigate('/search/results', { state: { results: filteredResults } });
  };

  return (
    <div className="search-criteria">
      <header className="criteria-header">
        <span className="eyebrow">Matchmaking</span>
        <h2>Design your ideal creator shortlist</h2>
        <p>
          Layer in the vibes, campaign goals, and deliverables you need. We will surface creators who
          feel bespoke to your brief.
        </p>
      </header>

      <section>
        <h3>Aesthetic moodboard</h3>
        <p className="supporting-copy">Add every descriptor that captures the look and feel of your campaign.</p>
        <div className="item-row">
          {aesthetics.map((item, index) => (
            <div key={item} className="item-pill">
              <span>{item}</span>
              <button onClick={() => removeItem(index, aesthetics, setAesthetics)}>✕</button>
            </div>
          ))}
          <button
            className="add-new-button"
            onClick={() => setShowAestheticDropdown(!showAestheticDropdown)}
          >
            + Add aesthetic
          </button>
          {showAestheticDropdown && (
            <select
              onChange={(event) =>
                addItem(event.target.value, aesthetics, setAesthetics, setShowAestheticDropdown)
              }
              className="dropdown"
            >
              <option value="">Select an aesthetic</option>
              {availableAesthetics
                .filter((item) => !aesthetics.includes(item))
                .map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
            </select>
          )}
        </div>
      </section>

      <section>
        <h3>Campaign goals</h3>
        <p className="supporting-copy">Tell us what success looks like so we can align deliverables and creator skillsets.</p>
        <div className="item-row">
          {campaignGoals.map((item, index) => (
            <div key={item} className="item-pill">
              <span>{item}</span>
              <button onClick={() => removeItem(index, campaignGoals, setCampaignGoals)}>✕</button>
            </div>
          ))}
          <button
            className="add-new-button"
            onClick={() => setShowGoalDropdown(!showGoalDropdown)}
          >
            + Add goal
          </button>
          {showGoalDropdown && (
            <select
              onChange={(event) =>
                addItem(event.target.value, campaignGoals, setCampaignGoals, setShowGoalDropdown)
              }
              className="dropdown"
            >
              <option value="">Select a goal</option>
              {availableGoals
                .filter((item) => !campaignGoals.includes(item))
                .map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
            </select>
          )}
        </div>
      </section>

      <section>
        <h3>Deliverables needed</h3>
        <p className="supporting-copy">Mix and match the content types you want in this collaboration.</p>
        <div className="item-row">
          {deliverables.map((item, index) => (
            <div key={item} className="item-pill">
              <span>{item}</span>
              <button onClick={() => removeItem(index, deliverables, setDeliverables)}>✕</button>
            </div>
          ))}
          <button
            className="add-new-button"
            onClick={() => setShowDeliverableDropdown(!showDeliverableDropdown)}
          >
            + Add deliverable
          </button>
          {showDeliverableDropdown && (
            <select
              onChange={(event) =>
                addItem(event.target.value, deliverables, setDeliverables, setShowDeliverableDropdown)
              }
              className="dropdown"
            >
              <option value="">Select a deliverable</option>
              {availableDeliverables
                .filter((item) => !deliverables.includes(item))
                .map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
            </select>
          )}
        </div>
      </section>

      <section>
        <h3>Content tone</h3>
        <div className="tone-selector">
          {['Romantic', 'Elegant', 'Calming', 'Playful', 'Any'].map((tone) => (
            <label key={tone} className={tonePreference === tone ? 'active' : ''}>
              <input
                type="radio"
                value={tone}
                checked={tonePreference === tone}
                onChange={(event) => setTonePreference(event.target.value)}
              />
              <span>{tone}</span>
            </label>
          ))}
        </div>
      </section>

      <button onClick={handleSearch} className="search-button">
        Show curated creators
      </button>
    </div>
  );
}

export default SearchCriteriaPage;
