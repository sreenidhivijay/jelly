import React from 'react';
import { Link } from 'react-router-dom';

import './HomePage.css';

const heroStats = [
  { label: 'Signature drops', value: '24', detail: 'live this season' },
  { label: 'Creator looks', value: '8.2k', detail: 'curated profiles' },
  { label: 'Sell-outs', value: '93%', detail: 'per launch' },
];

const studioHighlights = [
  {
    title: 'Creator Lab Capsule',
    subtitle: 'Drop 01 · Mixed media stories',
    image:
      'https://jnkversestore.com/cdn/shop/files/unnamed_29_1c4ef2b7-f571-4bf9-b1a1-6738cd18c665_800x.png?v=1763108309',
    tag: 'Featured',
  },
  {
    title: 'Midnight Social Set',
    subtitle: 'Drop 02 · Afterhours scenes',
    image: 'https://jnkversestore.com/cdn/shop/files/unnamed_30_1_800x.png?v=1763108112',
    tag: 'Limited',
  },
  {
    title: 'Gallery Essentials',
    subtitle: 'Drop 03 · Studio-ready assets',
    image: 'https://jnkversestore.com/cdn/shop/files/image_15_800x.png?v=1762492277',
    tag: 'New',
  },
];

const paletteNotes = [
  {
    label: 'Palette',
    description: 'Blush, pearl, inky black',
  },
  {
    label: 'Creators',
    description: 'Luxe lifestyle, pastel foodies',
  },
  {
    label: 'Deliverables',
    description: '3 reels · 2 carousels · 1 story stack',
  },
];

function HomePage() {
  return (
    <div className="homepage">
      <section className="hero-banner">
        <div className="hero-media">
          <img
            src="https://jnkversestore.com/cdn/shop/files/image_15_1920x.png?v=1762492277"
            alt="Jelly hero drop"
          />
          <div className="hero-media__overlay" />
        </div>
        <div className="hero-copy">
          <p className="eyebrow">jelly</p>
          <h1>You can’t follow what doesn’t lead</h1>
          <p className="hero-copy__body">
            Future-forward silhouettes meet curated creators. Every drop blends campaign strategy, stylized media,
            and ready-to-shop looks your community saves instantly.
          </p>
          <div className="hero-actions">
            <Link to="/signup" className="button primary">
              Start matching
            </Link>
            <Link to="/search" className="button secondary">
              Preview creators
            </Link>
          </div>
          <div className="hero-stat-grid">
            {heroStats.map((stat) => (
              <article key={stat.label}>
                <span className="hero-stat__value">{stat.value}</span>
                <span className="hero-stat__label">{stat.label}</span>
                <small>{stat.detail}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="moodboard-callout">
        <div className="moodboard-copy">
          <p className="eyebrow">Moodboard of the week</p>
          <h2>Midnight High Tea Drop</h2>
          <p>
            Built for neon lounges and rooftop brunches alike. Fluid tailoring hugs the moment while pastel trims
            keep it unapologetically brat.
          </p>
          <div className="moodboard-notes">
            {paletteNotes.map((note) => (
              <div key={note.label}>
                <span>{note.label}</span>
                <p>{note.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="moodboard-card">
          <div className="moodboard-card__body">
            <span>Spots remaining</span>
            <strong>4 creator shoots</strong>
          </div>
          <Link
            to="/login"
            state={{ redirectTo: '/campaigns/midnight-high-tea' }}
            className="button tertiary"
          >
            Request shortlist
          </Link>
        </div>
      </section>

      <section className="runway-grid">
        <div className="section-intro">
          <p className="eyebrow">Featured looks</p>
          <h3>Pick your brat era</h3>
          <p>
            Every piece drops with a styling guide, backstage clips, and collaborative creator kits so campaigns stay
            cohesive across channels.
          </p>
        </div>
        <div className="product-grid">
          {studioHighlights.map((item) => (
            <article className="product-card" key={item.title}>
              <div className="product-tag">{item.tag}</div>
              <img src={item.image} alt={item.title} loading="lazy" />
              <div className="product-card__info">
                <span>{item.subtitle}</span>
                <h4>{item.title}</h4>
                <Link to="/search" className="button ghost">
                  Explore looks
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="newsletter-panel">
        <div className="section-intro">
          <p className="eyebrow">Stay in the loop</p>
          <h3>New drops, backstage invites, and call sheets.</h3>
          <p>Sign up for the studio memo and be the first to know when campaigns open for collaborators.</p>
        </div>
        <form className="newsletter-form">
          <label htmlFor="newsletter-email" className="visually-hidden">
            Email
          </label>
          <div className="newsletter-form__field">
            <input id="newsletter-email" type="email" name="email" placeholder="Enter your email" />
            <button type="submit" className="button primary">
              Be the first to know
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default HomePage;
