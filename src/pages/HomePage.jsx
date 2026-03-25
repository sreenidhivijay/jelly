import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

import './HomePage.css';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const reveal = {
  hidden: { opacity: 0, y: 24, scale: 0.985, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
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
    title: 'Weekly cadence, made simple',
    subtitle: 'Plan deliverables ahead and keep shipping on schedule',
    video: 'https://assets.mixkit.co/videos/preview/group-of-colleagues-working-together-in-the-office-45958.mp4',
    poster: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
    tag: 'Cadence',
  },
  {
    title: 'Clear briefs, faster reviews',
    subtitle: 'Keep scope, timelines, and feedback organized',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-woman-typing-on-a-laptop-2606-large.mp4',
    poster: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
    tag: 'Clarity',
  },
  {
    title: 'A repeatable content pipeline',
    subtitle: 'Build momentum with partnerships that stick',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-video-editor-working-on-a-project-1187-large.mp4',
    poster: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    tag: 'Momentum',
  },
];

const logoStrip = [
  'Suno',
  'Amazon',
  'Netflix',
  'Hulu',
  'NYCFC',
  'Disney',
  'Walmart',
  'Sony Music',
  'UMG',
  'WMG',
  'Bondi Sands',
  'Belmont',
];

const capabilities = [
  'Set a weekly cadence',
  'Define deliverables once',
  'Keep briefs & approvals simple',
  'Track what’s shipping this week',
  'Stay consistent without the chaos',
  'Make repeat partnerships easy',
];

const howItWorks = [
  { step: '01', title: 'Create', body: 'Set up your Jelly workspace in minutes.' },
  { step: '02', title: 'Customize', body: 'Make briefs, cadence, and deliverables crystal clear.' },
  { step: '03', title: 'Share', body: 'Share your workflow with your team — and keep everyone aligned.' },
  { step: '04', title: 'Publish', body: 'Stay on a steady schedule across campaigns.' },
  { step: '05', title: 'Improve', body: 'Track what’s working and refine your pipeline over time.' },
];

const testimonials = [
  {
    name: '@kellanandkevin',
    meta: 'TikTok | 1.5M Followers',
    quote:
      'Jelly gives us consistent opportunities. We were able to plan content weeks ahead instead of scrambling last-minute.',
  },
  {
    name: '@milkfriendly',
    meta: 'TikTok | 53.7K Followers',
    quote:
      'The briefs are clear and approvals are fast. It’s easy to keep partnerships feeling natural with my usual content.',
  },
  {
    name: '@ellietindall',
    meta: 'Instagram | 12.3K Followers',
    quote:
      'Jelly makes ongoing partnerships simple — less chaos, more consistency, and way better organization.',
  },
];

function HomePage() {
  return (
    <div className="homepage">
      <motion.section
        className="hero-banner"
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
      >
        <div className="hero-fun" aria-hidden="true">
          <div className="hero-blob hero-blob--one" />
          <div className="hero-blob hero-blob--two" />
          <div className="hero-blob hero-blob--three" />
          <div className="hero-sparkle hero-sparkle--one" />
          <div className="hero-sparkle hero-sparkle--two" />
          <div className="hero-sticker hero-sticker--one">briefs</div>
          <div className="hero-sticker hero-sticker--two">collabs</div>
        </div>

        <div className="hero-copy">
          <p className="eyebrow">jelly</p>
          <h1>A smarter home for repeat creator partnerships.</h1>
          <p className="hero-copy__body">
            Jelly helps you set a weekly cadence, keep briefs simple, and ship predictable deliverables — so creators can plan and
            businesses can post consistently.
          </p>
          <div className="hero-actions">
            <Link to="/signup/creator" className="button primary">
              I’m a creator
            </Link>
            <Link to="/signup/brand" className="button secondary">
              I’m a business
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
        className="logo-band"
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        aria-label="Brands and communities we work with"
      >
        <p className="logo-band__kicker">Trusted by creators who have worked with</p>
        <div className="logo-marquee" role="presentation">
          <div className="logo-marquee__track">
            {[...logoStrip, ...logoStrip].map((name, idx) => (
              <span className="logo-pill" key={`${name}-${idx}`}>
                {name}
              </span>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        className="hello-panel"
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.28 }}
      >
        <div className="hello-panel__copy">
          <p className="eyebrow">Create & customize</p>
          <h2>Create a repeatable content pipeline in minutes.</h2>
          <p>
            Make your cadence, deliverables, and workflow obvious — so collaboration feels simple and publishing stays consistent.
          </p>
        </div>
        <motion.div
          className="cap-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {capabilities.map((cap) => (
            <motion.div className="cap-card" key={cap} variants={staggerItem}>
              {cap}
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <motion.section
        className="testimonials-panel"
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        <div className="section-intro">
          <p className="eyebrow">Testimonials</p>
          <h3>Creators earn with Jelly</h3>
          <p>Repeat work, clearer briefs, and a smoother workflow.</p>
        </div>
        <motion.div
          className="testimonial-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {testimonials.map((t) => (
            <motion.article className="testimonial" key={t.name} variants={staggerItem}>
              <p className="testimonial__quote">“{t.quote}”</p>
              <div className="testimonial__meta">
                <strong>{t.name}</strong>
                <span>{t.meta}</span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </motion.section>

      <motion.section
        className="how-panel"
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        <div className="section-intro">
          <p className="eyebrow">Share anywhere</p>
          <h3>Keep everyone aligned.</h3>
          <p>Clear briefs and steady cadence — easy to share, easy to follow.</p>
        </div>
        <motion.ol
          className="how-steps"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {howItWorks.map((s) => (
            <motion.li className="how-step" key={s.step} variants={staggerItem}>
              <div className="how-step__num">{s.step}</div>
              <div className="how-step__body">
                <h4>{s.title}</h4>
                <p>{s.body}</p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </motion.section>

      {/* <motion.section
        className="runway-grid"
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div
          className="section-intro"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <p className="eyebrow">What you get</p>
          <h3>Measure, improve, repeat.</h3>
          <p>
            Track what’s shipping and tighten your workflow over time — so your partnerships get smoother every week.
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
              <video
                className="product-media"
                src={item.video}
                poster=""
                muted
                loop
                playsInline
                autoPlay
                preload="auto"
                disablePictureInPicture
              />
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
      </motion.section> */}

      <motion.section
        className="newsletter-panel"
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
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
