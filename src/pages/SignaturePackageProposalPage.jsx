import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './SignaturePackageProposalPage.css';
import { getSignaturePackageBySlug } from '../data/signaturePackages';
import {
  MENTOR_INCOMING_REQUESTS_KEY,
  NEW_INCOMING_REQUEST_EVENT,
  MENTOR_COMPLETED_PACKAGES_KEY,
  SIGNATURE_PACKAGE_APPLIED_EVENT,
} from '../utils/storageKeys';
import { appendBrandApplication, createBrandApplicationEntry } from '../utils/brandApplications';

function SignaturePackageProposalPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const pkg = getSignaturePackageBySlug(slug);
  const [pitch, setPitch] = useState('');

  if (!pkg) {
    return (
      <div className="campaign-apply-page">
        <div className="package-missing">
          This signature package is not available. Head back to your dashboard to choose another concept.
        </div>
      </div>
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedPitch = pitch.trim();
    if (trimmedPitch.length < 10) return;

    let existing = [];
    try {
      const stored = localStorage.getItem(MENTOR_INCOMING_REQUESTS_KEY);
      const parsed = stored ? JSON.parse(stored) : [];
      existing = Array.isArray(parsed) ? parsed : [];
    } catch {
      existing = [];
    }

    const newRequest = {
      id: `${pkg.slug}-${Date.now()}`,
      brand: pkg.title,
      note: trimmedPitch,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      linkPath: `/signature-packages/${pkg.slug}`,
    };

    localStorage.setItem(MENTOR_INCOMING_REQUESTS_KEY, JSON.stringify([...existing, newRequest]));
    window.dispatchEvent(new CustomEvent(NEW_INCOMING_REQUEST_EVENT, { detail: newRequest }));
    const brandApplication = createBrandApplicationEntry({ note: trimmedPitch, projectId: pkg.projectId });
    appendBrandApplication(brandApplication);
    let completedPackages = [];
    try {
      const storedCompleted = localStorage.getItem(MENTOR_COMPLETED_PACKAGES_KEY);
      const parsedCompleted = storedCompleted ? JSON.parse(storedCompleted) : [];
      completedPackages = Array.isArray(parsedCompleted) ? parsedCompleted : [];
    } catch {
      completedPackages = [];
    }
    if (!completedPackages.includes(pkg.slug)) {
      completedPackages.push(pkg.slug);
      localStorage.setItem(MENTOR_COMPLETED_PACKAGES_KEY, JSON.stringify(completedPackages));
    }
    window.dispatchEvent(new CustomEvent(SIGNATURE_PACKAGE_APPLIED_EVENT, { detail: pkg.slug }));
    navigate('/application-success', { state: { campaignTitle: pkg.title } });
  };

  return (
    <div className="campaign-apply-page">
      <section className="campaign-apply-hero">
        <span className="eyebrow">Signature package</span>
        <h1>{pkg.title}</h1>
        <p className="campaign-brand">{pkg.rate} · {pkg.turnaround}</p>
        <p className="campaign-summary">{pkg.summary}</p>
        <div className="campaign-meta">
          <div>
            <span>Deliverables</span>
            <strong>{pkg.deliverables.length}</strong>
            <small>Pieces included</small>
          </div>
          <div>
            <span>Focus</span>
            <strong>{pkg.focusAreas[0]}</strong>
            <small>Primary angle</small>
          </div>
          <div>
            <span>Timeline</span>
            <strong>{pkg.timeline[1] || pkg.timeline[0]}</strong>
            <small>The jelly promise</small>
          </div>
        </div>
      </section>

      {/* <section className="campaign-apply-details">
        <article>
          <h3>Deliverables</h3>
          <ul>
            {pkg.deliverables.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article>
          <h3>Focus areas</h3>
          <ul>
            {pkg.focusAreas.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article>
          <h3>Campaign Directions</h3>
          <ul>
            {pkg.perks.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article>
          <h3>Timeline</h3>
          <div className="campaign-milestones">
            {pkg.timeline.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </article>
      </section> */}

      <section className="campaign-apply-form">
        <div>
          <h3>Share your proposal</h3>
          <p>Explain how you would tailor {pkg.title.toLowerCase()} for a potential brand booking.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="package-pitch">Pitch details</label>
          <textarea
            id="package-pitch"
            value={pitch}
            onChange={(event) => setPitch(event.target.value)}
            placeholder="Share your hook, set styling ideas, or notable past collabs."
            required
          />
          <button type="submit" className="apply-button">Send proposal</button>
        </form>
      </section>
    </div>
  );
}

export default SignaturePackageProposalPage;
