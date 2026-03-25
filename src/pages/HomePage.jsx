import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

import './HomePage.css';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

const heroStats = [
  { label: 'Active partnerships', value: '240+', detail: 'running each month' },
  { label: 'Creator opportunities', value: '8.2k', detail: 'briefs shared this year' },
  { label: 'On-time delivery', value: '93%', detail: 'content submitted as planned' },
];

const studioHighlights = [
  {
    title: 'Weekly Content Retainers',
    subtitle: 'Predictable briefs and recurring payouts',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80',
    tag: 'Steady work',
  },
  {
    title: 'Creator-Business Matching',
    subtitle: 'Aligned goals, style, and posting cadence',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
    tag: 'Better fit',
  },
  {
    title: 'Always-On Content Pipeline',
    subtitle: 'Fresh deliverables for every campaign phase',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
    tag: 'Consistent output',
  },
];

const paletteNotes = [
  {
    label: 'For creators',
    description: 'Clear scope, recurring work, and predictable pay cycles',
  },
  {
    label: 'For businesses',
    description: 'Reliable publishing flow and brand-safe creator partners',
  },
  {
    label: 'Deliverables',
    description: 'Short-form video, social posts, and campaign-ready assets',
  },
];

function HomePage() {
  return (
    <div className="homepage">
      <motion.section
        className="hero-banner"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <div className="hero-media">
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1800&q=80"
            alt="Creators and business team planning content"
          />
          <div className="hero-media__overlay" />
        </div>
        <div className="hero-copy">
          <p className="eyebrow">jelly</p>
          <h1>Steady work for creators. Steady content for businesses.</h1>
          <p className="hero-copy__body">
            Jelly connects businesses with creators who can deliver consistently. Creators get repeat opportunities,
            and businesses get a dependable stream of quality content they can publish every week.
          </p>
          <div className="hero-actions">
            <Link to="/signup" className="button primary">
              Start collaborating
            </Link>
            <Link to="/search" className="button secondary">
              Find creators
            </Link>
          </div>
          <motion.div
            className="hero-stat-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {heroStats.map((stat) => (
              <motion.article key={stat.label} variants={staggerItem}>
                <span className="hero-stat__value">{stat.value}</span>
                <span className="hero-stat__label">{stat.label}</span>
                <small>{stat.detail}</small>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="moodboard-callout"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <div className="moodboard-copy">
          <p className="eyebrow">How Jelly helps</p>
          <h2>Build a repeatable content engine</h2>
          <p>
            Instead of one-off collaborations, Jelly supports ongoing partnerships so creators can plan their income
            and businesses can plan their publishing calendar with confidence.
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
            <span>Open this week</span>
            <strong>New creator-business matches</strong>
          </div>
          <Link
            to="/login"
            state={{ redirectTo: '/search' }}
            className="button tertiary"
          >
            Request matches
          </Link>
        </div>
      </motion.section>

      <section className="runway-grid">
        <motion.div
          className="section-intro"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <p className="eyebrow">What you get</p>
          <h3>Consistency without the chaos</h3>
          <p>
            Jelly helps both sides stay consistent with better matching, clearer deliverables, and timelines that keep
            campaigns moving.
          </p>
        </motion.div>
        <motion.div
          className="product-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {studioHighlights.map((item) => (
            <motion.article className="product-card" key={item.title} variants={staggerItem}>
              <div className="product-tag">{item.tag}</div>
              <img src={item.image} alt={item.title} loading="lazy" />
              <div className="product-card__info">
                <span>{item.subtitle}</span>
                <h4>{item.title}</h4>
                <Link to="/search" className="button ghost">
                  Learn more
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <motion.section
        className="newsletter-panel"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <div className="section-intro">
          <p className="eyebrow">Get updates</p>
          <h3>New opportunities for creators and new campaign openings for businesses.</h3>
          <p>Join the Jelly list to hear when fresh partnerships open up.</p>
        </div>
        <form className="newsletter-form">
          <label htmlFor="newsletter-email" className="visually-hidden">
            Email
          </label>
          <div className="newsletter-form__field">
            <input id="newsletter-email" type="email" name="email" placeholder="Enter your email" />
            <button type="submit" className="button primary">
              Get updates
            </button>
          </div>
        </form>
      </motion.section>
    </div>
  );
}

export default HomePage;
