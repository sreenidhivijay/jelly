import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import brandBriefTemplates from '../data/brandBriefTemplates';
import './BrandRegistration.css';
import './BrandBriefTemplatePage.css';

function BriefDocumentPreview({ brief }) {
  const b = brief;
  return (
    <div className="brief-doc">
      <div className="brief-doc-title">{b.docTitle}</div>
      <div className="brief-doc-meta">
        <span><strong>Campaign:</strong> {b.campaignName}</span>
        <span><strong>Product:</strong> {b.product}</span>
      </div>

      <hr className="brief-doc-divider" />

      <div className="brief-doc-section">
        <div className="brief-doc-heading">Product Reference</div>
        <p className="brief-doc-body">Focus on:</p>
        <ul className="brief-doc-list">
          {b.productReferenceNotes.map((note, i) => <li key={i}>{note}</li>)}
        </ul>
      </div>

      <hr className="brief-doc-divider" />

      <div className="brief-doc-section">
        <div className="brief-doc-heading">1. Campaign Overview</div>
        <p className="brief-doc-body">{b.campaignOverview}</p>
      </div>

      <hr className="brief-doc-divider" />

      <div className="brief-doc-section">
        <div className="brief-doc-heading">2. Objective</div>
        <ul className="brief-doc-list">
          {b.objectives.map((obj, i) => <li key={i}>{obj}</li>)}
        </ul>
      </div>

      <hr className="brief-doc-divider" />

      <div className="brief-doc-section">
        <div className="brief-doc-heading">3. Target Audience</div>
        <p className="brief-doc-body">
          <strong>Age:</strong> {b.targetAudience.ageRange}<br />
          <strong>Style:</strong> {b.targetAudience.style}
        </p>
        <p className="brief-doc-body">Audience interests:</p>
        <ul className="brief-doc-list">
          {b.targetAudience.interests.map((interest, i) => <li key={i}>{interest}</li>)}
        </ul>
      </div>

      <hr className="brief-doc-divider" />

      <div className="brief-doc-section">
        <div className="brief-doc-heading">4. Deliverables</div>
        <p className="brief-doc-body"><strong>{b.deliverables.quantity}</strong></p>
        <p className="brief-doc-body">Specifications:</p>
        <ul className="brief-doc-list">
          <li>{b.deliverables.format} format</li>
          <li>{b.deliverables.duration}</li>
          <li>{b.deliverables.resolution} resolution</li>
          <li>{b.deliverables.fileType}</li>
        </ul>
        {b.deliverables.optional.length > 0 && (
          <>
            <p className="brief-doc-body">Optional:</p>
            <ul className="brief-doc-list">
              {b.deliverables.optional.map((opt, i) => <li key={i}>{opt}</li>)}
            </ul>
          </>
        )}
      </div>

      <hr className="brief-doc-divider" />

      <div className="brief-doc-section">
        <div className="brief-doc-heading">5. Content Concept Ideas</div>
        <p className="brief-doc-body">Creators may follow one of these ideas:</p>
        {b.contentConcepts.map((concept, i) => (
          <div key={i} className="brief-doc-concept">
            <div className="brief-doc-subheading">{concept.title}</div>
            <p className="brief-doc-body">{concept.description}</p>
            {concept.hooks && concept.hooks.length > 0 && (
              <>
                <p className="brief-doc-body">Hook examples:</p>
                <ul className="brief-doc-list">
                  {concept.hooks.map((hook, j) => <li key={j}>"{hook}"</li>)}
                </ul>
              </>
            )}
          </div>
        ))}
      </div>

      <hr className="brief-doc-divider" />

      <div className="brief-doc-section">
        <div className="brief-doc-heading">6. Key Product Features</div>
        <p className="brief-doc-body">Creators should highlight:</p>
        <ul className="brief-doc-list">
          {b.keyFeatures.map((feature, i) => <li key={i}>{feature}</li>)}
        </ul>
      </div>

      <hr className="brief-doc-divider" />

      <div className="brief-doc-section">
        <div className="brief-doc-heading">7. Visual Style</div>
        <p className="brief-doc-body">Recommended filming style:</p>
        <ul className="brief-doc-list">
          {b.visualStyle.map((s, i) => <li key={i}>{s}</li>)}
        </ul>
      </div>

      <hr className="brief-doc-divider" />

      <div className="brief-doc-section">
        <div className="brief-doc-heading">8. Hook Suggestions</div>
        <p className="brief-doc-body">Your hook must grab attention in the <strong>first 2 seconds</strong>.</p>
        <ul className="brief-doc-list">
          {b.hookSuggestions.map((hook, i) => <li key={i}>"{hook}"</li>)}
        </ul>
      </div>

      <hr className="brief-doc-divider" />

      <div className="brief-doc-section brief-doc-dos-donts">
        <div className="brief-doc-col">
          <div className="brief-doc-heading">9. Do's</div>
          <ul className="brief-doc-list brief-doc-list-do">
            {b.dos.map((d, i) => <li key={i}>{d}</li>)}
          </ul>
        </div>
        <div className="brief-doc-col">
          <div className="brief-doc-heading">10. Don'ts</div>
          <ul className="brief-doc-list brief-doc-list-dont">
            {b.donts.map((d, i) => <li key={i}>{d}</li>)}
          </ul>
        </div>
      </div>

      <hr className="brief-doc-divider" />

      <div className="brief-doc-section">
        <div className="brief-doc-heading">11. Call to Action</div>
        <p className="brief-doc-body">End the video with a soft CTA:</p>
        <ul className="brief-doc-list">
          {b.callToAction.map((cta, i) => <li key={i}>"{cta}"</li>)}
        </ul>
      </div>

      <hr className="brief-doc-divider" />

      <div className="brief-doc-section">
        <div className="brief-doc-heading">12. Timeline</div>
        <p className="brief-doc-body">
          <strong>Content Due:</strong> {b.timeline.contentDue}<br />
          <strong>Review Period:</strong> {b.timeline.reviewPeriod}
        </p>
      </div>

      <hr className="brief-doc-divider" />

      <div className="brief-doc-section">
        <div className="brief-doc-heading">13. Usage Rights</div>
        <p className="brief-doc-body">By submitting content, creators grant:</p>
        <ul className="brief-doc-list">
          {b.usageRights.rights.map((r, i) => <li key={i}>{r}</li>)}
        </ul>
        <p className="brief-doc-body"><strong>Usage duration:</strong> {b.usageRights.duration}</p>
      </div>
    </div>
  );
}

function BrandBriefTemplatePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};
  const niche = state.niche || 'Fashion/Lifestyle';

  const templates = brandBriefTemplates[niche] || brandBriefTemplates['Fashion/Lifestyle'];
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleContinue = (e) => {
    e.preventDefault();
    if (selectedIndex === null) return;

    const template = templates[selectedIndex];
    navigate('/brand-profile/brand-brief/customize', {
      state: {
        ...state,
        templateName: template.name,
        brief: template.brief,
      },
    });
  };

  return (
    <div className="brand-onboarding-container brief-template-container">
      <header className="onboarding-header">
        <span className="eyebrow">Brand Brief</span>
        <h2>Choose a Brief Template</h2>
        <p>
          Select a starting point for your {niche} creator brief. You'll customize
          every detail on the next step.
        </p>
      </header>

      <form className="brand-onboarding-form" onSubmit={handleContinue}>
        {/* Template selector tabs */}
        <div className="brief-template-tabs">
          {templates.map((template, idx) => (
            <button
              type="button"
              key={template.name}
              className={`brief-template-tab ${selectedIndex === idx ? 'selected' : ''}`}
              onClick={() => setSelectedIndex(idx)}
            >
              <span className="brief-tab-name">{template.name}</span>
              <span className="brief-tab-desc">{template.description}</span>
            </button>
          ))}
        </div>

        {/* Document preview */}
        {selectedIndex !== null ? (
          <div className="brief-doc-wrapper">
            <BriefDocumentPreview
              brief={templates[selectedIndex].brief}
              templateName={templates[selectedIndex].name}
              templateDescription={templates[selectedIndex].description}
            />
          </div>
        ) : (
          <div className="brief-doc-placeholder">
            <p>Select a template above to preview the full brief</p>
          </div>
        )}

        <button
          type="submit"
          className="continue-button"
          disabled={selectedIndex === null}
          style={{ opacity: selectedIndex === null ? 0.5 : 1 }}
        >
          Customize This Brief
        </button>
      </form>
    </div>
  );
}

export default BrandBriefTemplatePage;
