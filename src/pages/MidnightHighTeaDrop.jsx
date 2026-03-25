import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MidnightHighTeaDrop.css';
import { MENTOR_INCOMING_REQUESTS_KEY, NEW_INCOMING_REQUEST_EVENT } from '../utils/storageKeys';
import { appendBrandApplication, createBrandApplicationEntry } from '../utils/brandApplications';

const campaign = {
  title: 'Midnight High Tea Drop',
  brand: 'Velvet Petal Boutique',
  summary:
    'Velvet Petal is taking tea time after dark with a neon-lit tasting set. They need dreamy storytellers who can mix luxe rituals with brat energy and sell out 500 limited boxes.',
  needs: [
    'Behind-the-scenes vlog that captures steeping rituals, garnish prep, and the limited-edition set in use.',
    'Hero reel with transitions between neon lounges and rooftop brunch vignettes.',
    'Story stack that drops key talking points (price, flavors, preorder date).',
  ],
  deliverables: ['2 reels or short-form videos', '1 photo carousel', '4 story frames', 'Optional: newsletter-ready still'],
  perks: [
    'Paid package starting at $4,500 + deluxe tasting kit',
    'Creative direction support from Jelly studio',
    'Priority consideration for upcoming Velvet Petal experiences',
  ],
  timeline: {
    milestones: ['Concept treatments due Nov 16', 'Shoot window Nov 19–22', 'Launch goes live Nov 25'],
    vibe: 'Soft glam, pastel trims, pearlescent highlights, confident narration',
  },
};

function MidnightHighTeaDrop() {
  const [pitch, setPitch] = useState('');
  const [applied, setApplied] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedPitch = pitch.trim();
    if (trimmedPitch.length < 10) {
      return;
    }

    const stored = localStorage.getItem(MENTOR_INCOMING_REQUESTS_KEY);
    let existing = [];
    try {
      const parsed = stored ? JSON.parse(stored) : [];
      existing = Array.isArray(parsed) ? parsed : [];
    } catch {
      existing = [];
    }
    const newRequest = {
      id: `midnight-${Date.now()}`,
      brand: campaign.brand,
      note: trimmedPitch,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      linkPath: '/campaigns/midnight-high-tea',
    };
    localStorage.setItem(MENTOR_INCOMING_REQUESTS_KEY, JSON.stringify([...existing, newRequest]));
    window.dispatchEvent(new CustomEvent(NEW_INCOMING_REQUEST_EVENT, { detail: newRequest }));
    const newApplication = createBrandApplicationEntry({ note: trimmedPitch, projectId: 'midnight-tea' });
    appendBrandApplication(newApplication);
    setApplied(true);
    navigate('/application-success', { state: { campaignTitle: campaign.title } });
  };

  return (
    <div className="campaign-apply-page">
      <section className="campaign-apply-hero">
        <span className="eyebrow">Featured drop</span>
        <h1>{campaign.title}</h1>
        <p className="campaign-brand">{campaign.brand}</p>
        <p className="campaign-summary">{campaign.summary}</p>
        <div className="campaign-meta">
          <div>
            <span>Timeline</span>
            <strong>Concepts due Nov 16</strong>
            <small>Shoots Nov 19-22</small>
          </div>
          <div>
            <span>Budget</span>
            <strong>$4.5K+</strong>
            <small>Paid + product</small>
          </div>
          <div>
            <span>Slots</span>
            <strong>4 creators</strong>
            <small>Spots still open</small>
          </div>
        </div>
      </section>

      {/* <section className="campaign-apply-details">
        <article>
          <h3>What the brand needs</h3>
          <ul>
            {campaign.needs.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article>
          <h3>Deliverables</h3>
          <ul>
            {campaign.deliverables.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article>
          <h3>Perks & support</h3>
          <ul>
            {campaign.perks.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article>
          <h3>Creative direction</h3>
          <p>{campaign.timeline.vibe}</p>
          <div className="campaign-milestones">
            {campaign.timeline.milestones.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </article>
      </section> */}

      <section className="campaign-apply-form">
        <div>
          <h3>Ready to apply?</h3>
          <p>Share a quick pitch so Velvet Petal sees how you would bring this drop to life.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="campaign-pitch">Why you are the perfect fit</label>
          <textarea
            id="campaign-pitch"
            value={pitch}
            onChange={(event) => setPitch(event.target.value)}
            placeholder="Drop your concept hook, past collab wins, or how you would style the shoot."
            disabled={applied}
            required
          />
          <button type="submit" className="apply-button" disabled={applied}>
            {applied ? 'Application submitted' : 'Apply to this drop'}
          </button>
        </form>
      </section>
    </div>
  );
}

export default MidnightHighTeaDrop;
