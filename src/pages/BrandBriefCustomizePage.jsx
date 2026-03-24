import { useState, useRef, useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BrandRegistration.css';
import './BrandBriefCustomizePage.css';

/* ── helpers ── */
let _uid = 0;
const uid = () => `s-${++_uid}-${Date.now()}`;

/* ── Inline editable text ── */
function InlineText({ value, onChange, className = '', placeholder = 'Click to edit...' }) {
  return (
    <input
      className={`inline-edit inline-edit-text ${className}`}
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

/* ── Inline editable paragraph ── */
function InlineParagraph({ value, onChange, className = '', placeholder = 'Click to edit...' }) {
  return (
    <textarea
      className={`inline-edit inline-edit-paragraph ${className}`}
      value={value}
      placeholder={placeholder}
      rows={2}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

/* ── Draggable list item ── */
function DraggableItem({ item, index, onDragStart, onDragOver, onDrop, onDragEnd, onChange, onRemove, prefix, draggedIndex }) {
  return (
    <li
      className={`inline-list-item ${draggedIndex === index ? 'dragging' : ''}`}
      draggable
      onDragStart={(e) => { e.stopPropagation(); onDragStart(e, index); }}
      onDragOver={(e) => { e.stopPropagation(); onDragOver(e, index); }}
      onDrop={(e) => { e.stopPropagation(); onDrop(e, index); }}
      onDragEnd={(e) => { e.stopPropagation(); onDragEnd(); }}
    >
      <span className="drag-handle" title="Drag to reorder">&#x2630;</span>
      {prefix && <span className="inline-list-prefix">{prefix}</span>}
      <input className="inline-edit inline-edit-list" type="text" value={item} placeholder="New item..." onChange={(e) => onChange(index, e.target.value)} />
      <button type="button" className="inline-list-remove" onClick={() => onRemove(index)} title="Remove">&times;</button>
    </li>
  );
}

/* ── Editable bullet list with drag & drop ── */
function EditableList({ items, onChange, prefix, addLabel = '+ Add item' }) {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const handleDragStart = (e, i) => { setDraggedIndex(i); e.dataTransfer.effectAllowed = 'move'; };
  const handleDragOver = (e, i) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === i) return;
    const r = [...items]; const [m] = r.splice(draggedIndex, 1); r.splice(i, 0, m);
    onChange(r); setDraggedIndex(i);
  };
  const handleDrop = (e) => { e.preventDefault(); setDraggedIndex(null); };
  const handleDragEnd = () => setDraggedIndex(null);
  const updateItem = (i, v) => { const u = [...items]; u[i] = v; onChange(u); };
  const removeItem = (i) => onChange(items.filter((_, j) => j !== i));
  return (
    <div className="inline-list-wrapper">
      <ul className="inline-list">
        {items.map((item, idx) => (
          <DraggableItem key={idx} item={item} index={idx} onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={handleDrop} onDragEnd={handleDragEnd} onChange={updateItem} onRemove={removeItem} prefix={prefix} draggedIndex={draggedIndex} />
        ))}
      </ul>
      <button type="button" className="inline-list-add" onClick={() => onChange([...items, ''])}>{addLabel}</button>
    </div>
  );
}

/* ── Concept card (draggable within concepts section) ── */
function ConceptCard({ concept, index, total, onDragStart, onDragOver, onDrop, onDragEnd, onUpdate, onRemove, draggedIndex }) {
  return (
    <div
      className={`inline-concept ${draggedIndex === index ? 'dragging' : ''}`}
      draggable
      onDragStart={(e) => { e.stopPropagation(); onDragStart(e, index); }}
      onDragOver={(e) => { e.stopPropagation(); onDragOver(e, index); }}
      onDrop={(e) => { e.stopPropagation(); onDrop(e, index); }}
      onDragEnd={(e) => { e.stopPropagation(); onDragEnd(); }}
    >
      <div className="inline-concept-head">
        <span className="drag-handle" title="Drag to reorder">&#x2630;</span>
        <InlineText className="inline-concept-title" value={concept.title} placeholder="Concept title..." onChange={(v) => onUpdate(index, 'title', v)} />
        {total > 1 && <button type="button" className="inline-list-remove" onClick={() => onRemove(index)} title="Remove">&times;</button>}
      </div>
      <InlineParagraph value={concept.description} placeholder="Describe this concept..." onChange={(v) => onUpdate(index, 'description', v)} />
      {concept.hooks.length > 0 ? (
        <div className="inline-concept-hooks">
          <span className="inline-concept-hooks-label">Hook examples:</span>
          <EditableList items={concept.hooks} onChange={(hooks) => onUpdate(index, 'hooks', hooks)} addLabel="+ Add hook" />
        </div>
      ) : (
        <button type="button" className="inline-list-add" onClick={() => onUpdate(index, 'hooks', [''])}>+ Add hooks</button>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Section renderers — one per section type
   ═══════════════════════════════════════════════ */

function SectionList({ data, onDataChange }) {
  return (
    <>
      {data.subtitle && <p className="inline-doc-body">{data.subtitle}</p>}
      <EditableList items={data.items} onChange={(items) => onDataChange({ ...data, items })} addLabel={data.addLabel || '+ Add item'} prefix={data.prefix} />
    </>
  );
}

function SectionParagraph({ data, onDataChange }) {
  return <InlineParagraph value={data.text} onChange={(text) => onDataChange({ ...data, text })} placeholder="Click to edit..." />;
}

function SectionTargetAudience({ data, onDataChange }) {
  const set = (k, v) => onDataChange({ ...data, [k]: v });
  return (
    <>
      <div className="inline-doc-kv">
        <span className="inline-doc-kv-label">Age:</span>
        <InlineText value={data.ageRange} onChange={(v) => set('ageRange', v)} placeholder="e.g. 18–30" />
      </div>
      <div className="inline-doc-kv">
        <span className="inline-doc-kv-label">Style:</span>
        <InlineText value={data.style} onChange={(v) => set('style', v)} placeholder="e.g. Streetwear / casual" />
      </div>
      <p className="inline-doc-body">Audience interests:</p>
      <EditableList items={data.interests} onChange={(items) => set('interests', items)} addLabel="+ Add interest" />
    </>
  );
}

function SectionDeliverables({ data, onDataChange }) {
  const set = (k, v) => onDataChange({ ...data, [k]: v });
  return (
    <>
      <div className="inline-doc-kv">
        <strong>Quantity:</strong>
        <InlineText value={data.quantity} onChange={(v) => set('quantity', v)} placeholder="e.g. 1 x Vertical Video" />
      </div>
      <p className="inline-doc-body">Specifications:</p>
      <div className="inline-doc-specs">
        <div className="inline-doc-kv">
          <span className="inline-doc-kv-label">Format:</span>
          <select className="inline-edit inline-edit-select" value={data.format} onChange={(e) => set('format', e.target.value)}>
            <option value="9:16">9:16 (Vertical)</option>
            <option value="1:1">1:1 (Square)</option>
            <option value="16:9">16:9 (Landscape)</option>
          </select>
        </div>
        <div className="inline-doc-kv">
          <span className="inline-doc-kv-label">Duration:</span>
          <InlineText value={data.duration} onChange={(v) => set('duration', v)} placeholder="e.g. 15–30 seconds" />
        </div>
        <div className="inline-doc-kv">
          <span className="inline-doc-kv-label">Resolution:</span>
          <InlineText value={data.resolution} onChange={(v) => set('resolution', v)} placeholder="e.g. 1080x1920" />
        </div>
        <div className="inline-doc-kv">
          <span className="inline-doc-kv-label">File Type:</span>
          <InlineText value={data.fileType} onChange={(v) => set('fileType', v)} placeholder="e.g. .mp4 or .mov" />
        </div>
      </div>
      <p className="inline-doc-body">Optional:</p>
      <EditableList items={data.optional} onChange={(items) => set('optional', items)} addLabel="+ Add optional" />
    </>
  );
}

function SectionConcepts({ data, onDataChange }) {
  const dragRef = useRef(null);
  const [dragged, setDragged] = useState(null);
  const concepts = data.concepts;

  const dragStart = (e, i) => { dragRef.current = i; setDragged(i); e.dataTransfer.effectAllowed = 'move'; };
  const dragOver = (e, i) => {
    e.preventDefault();
    if (dragRef.current === null || dragRef.current === i) return;
    const c = [...concepts]; const [m] = c.splice(dragRef.current, 1); c.splice(i, 0, m);
    dragRef.current = i; setDragged(i);
    onDataChange({ ...data, concepts: c });
  };
  const drop = (e) => { e.preventDefault(); setDragged(null); };
  const dragEnd = () => { dragRef.current = null; setDragged(null); };

  const update = (i, field, val) => {
    const c = [...concepts]; c[i] = { ...c[i], [field]: val };
    onDataChange({ ...data, concepts: c });
  };
  const remove = (i) => onDataChange({ ...data, concepts: concepts.filter((_, j) => j !== i) });
  const add = () => onDataChange({ ...data, concepts: [...concepts, { title: '', description: '', hooks: [] }] });

  return (
    <>
      <p className="inline-doc-body">Creators may follow one of these ideas:</p>
      <div className="inline-concepts">
        {concepts.map((c, i) => (
          <ConceptCard key={i} concept={c} index={i} total={concepts.length} onDragStart={dragStart} onDragOver={dragOver} onDrop={drop} onDragEnd={dragEnd} onUpdate={update} onRemove={remove} draggedIndex={dragged} />
        ))}
        <button type="button" className="inline-list-add" onClick={add}>+ Add Concept</button>
      </div>
    </>
  );
}

function SectionDosDonts({ data, onDataChange }) {
  const set = (k, v) => onDataChange({ ...data, [k]: v });
  return (
    <div className="inline-doc-dos-donts">
      <div className="inline-doc-col">
        <div className="inline-doc-subheading">Do's</div>
        <EditableList items={data.dos} onChange={(items) => set('dos', items)} prefix="&#x2714;" addLabel="+ Add do" />
      </div>
      <div className="inline-doc-col">
        <div className="inline-doc-subheading">Don'ts</div>
        <EditableList items={data.donts} onChange={(items) => set('donts', items)} prefix="&#x2716;" addLabel="+ Add don't" />
      </div>
    </div>
  );
}

function SectionTimeline({ data, onDataChange }) {
  const set = (k, v) => onDataChange({ ...data, [k]: v });
  return (
    <>
      <div className="inline-doc-kv">
        <span className="inline-doc-kv-label">Content Due:</span>
        <InlineText value={data.contentDue} onChange={(v) => set('contentDue', v)} placeholder="e.g. 5 days after receiving the product" />
      </div>
      <div className="inline-doc-kv">
        <span className="inline-doc-kv-label">Review Period:</span>
        <InlineText value={data.reviewPeriod} onChange={(v) => set('reviewPeriod', v)} placeholder="e.g. 2–3 days" />
      </div>
    </>
  );
}

function SectionUsageRights({ data, onDataChange }) {
  const set = (k, v) => onDataChange({ ...data, [k]: v });
  return (
    <>
      <p className="inline-doc-body">By submitting content, creators grant:</p>
      <EditableList items={data.rights} onChange={(items) => set('rights', items)} addLabel="+ Add right" />
      <div className="inline-doc-kv" style={{ marginTop: 8 }}>
        <span className="inline-doc-kv-label">Usage duration:</span>
        <InlineText value={data.duration} onChange={(v) => set('duration', v)} placeholder="e.g. 6 months" />
      </div>
    </>
  );
}

function SectionCustom({ data, onDataChange }) {
  return (
    <>
      <InlineParagraph value={data.text} onChange={(text) => onDataChange({ ...data, text })} placeholder="Write section content..." />
      {data.items && data.items.length > 0 && (
        <EditableList items={data.items} onChange={(items) => onDataChange({ ...data, items })} addLabel="+ Add item" />
      )}
      {(!data.items || data.items.length === 0) && (
        <button type="button" className="inline-list-add" onClick={() => onDataChange({ ...data, items: [''] })}>+ Add bullet list</button>
      )}
    </>
  );
}

const SECTION_RENDERERS = {
  paragraph: SectionParagraph,
  list: SectionList,
  'target-audience': SectionTargetAudience,
  deliverables: SectionDeliverables,
  concepts: SectionConcepts,
  'dos-donts': SectionDosDonts,
  timeline: SectionTimeline,
  'usage-rights': SectionUsageRights,
  custom: SectionCustom,
};

/* ── Build initial sections from brief data ── */
function buildSections(b) {
  return [
    { id: uid(), title: 'Product Reference', type: 'list', data: { subtitle: 'Focus on:', items: b.productReferenceNotes || [], addLabel: '+ Add reference note' } },
    { id: uid(), title: 'Campaign Overview', type: 'paragraph', data: { text: b.campaignOverview || '' } },
    { id: uid(), title: 'Objective', type: 'list', data: { subtitle: 'The goals of this campaign are:', items: b.objectives || [], addLabel: '+ Add objective' } },
    { id: uid(), title: 'Target Audience', type: 'target-audience', data: { ageRange: b.targetAudience?.ageRange || '', style: b.targetAudience?.style || '', interests: b.targetAudience?.interests || [] } },
    { id: uid(), title: 'Deliverables', type: 'deliverables', data: { quantity: b.deliverables?.quantity || '', format: b.deliverables?.format || '9:16', duration: b.deliverables?.duration || '', resolution: b.deliverables?.resolution || '1080x1920', fileType: b.deliverables?.fileType || '.mp4 or .mov', optional: b.deliverables?.optional || [] } },
    { id: uid(), title: 'Content Concept Ideas', type: 'concepts', data: { concepts: (b.contentConcepts || []).map((c) => ({ title: c.title, description: c.description, hooks: c.hooks || [] })) } },
    { id: uid(), title: 'Key Product Features', type: 'list', data: { subtitle: 'Creators should highlight:', items: b.keyFeatures || [], addLabel: '+ Add feature' } },
    { id: uid(), title: 'Visual Style', type: 'list', data: { subtitle: 'Recommended filming style:', items: b.visualStyle || [], addLabel: '+ Add style note' } },
    { id: uid(), title: 'Hook Suggestions', type: 'list', data: { subtitle: 'Your hook must grab attention in the first 2 seconds.', items: b.hookSuggestions || [], addLabel: '+ Add hook' } },
    { id: uid(), title: "Do's & Don'ts", type: 'dos-donts', data: { dos: b.dos || [], donts: b.donts || [] } },
    { id: uid(), title: 'Call to Action', type: 'list', data: { subtitle: 'End the video with a soft CTA:', items: b.callToAction || [], addLabel: '+ Add CTA' } },
    { id: uid(), title: 'Timeline', type: 'timeline', data: { contentDue: b.timeline?.contentDue || '', reviewPeriod: b.timeline?.reviewPeriod || '' } },
    { id: uid(), title: 'Usage Rights', type: 'usage-rights', data: { rights: b.usageRights?.rights || [], duration: b.usageRights?.duration || '' } },
  ];
}

/* ── New section templates ── */
const ADD_SECTION_OPTIONS = [
  { label: 'Text Section', type: 'custom', data: { text: '', items: null } },
  { label: 'Bullet List', type: 'list', data: { subtitle: '', items: [''], addLabel: '+ Add item' } },
  { label: "Do's & Don'ts", type: 'dos-donts', data: { dos: [''], donts: [''] } },
  { label: 'Timeline', type: 'timeline', data: { contentDue: '', reviewPeriod: '' } },
];

/* ═══════════════════════════════════
   Main page
   ═══════════════════════════════════ */
function BrandBriefCustomizePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const navState = location.state || {};
  const niche = navState.niche || 'Fashion/Lifestyle';
  const templateName = navState.templateName || 'Custom Brief';
  const initialBrief = navState.brief || {};

  const [docTitle, setDocTitle] = useState(initialBrief.docTitle || 'UGC CREATOR BRIEF');
  const [campaignName, setCampaignName] = useState(initialBrief.campaignName || '');
  const [product, setProduct] = useState(initialBrief.product || '');
  const [sections, setSections] = useState(() => buildSections(initialBrief));
  const [addMenuAt, setAddMenuAt] = useState(null); // index where to insert, null = closed
  const addMenuRef = useRef(null);

  // Close menu on outside click
  useEffect(() => {
    if (addMenuAt === null) return;
    const handler = (e) => {
      if (addMenuRef.current && !addMenuRef.current.contains(e.target)) {
        setAddMenuAt(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [addMenuAt]);

  /* section drag & drop */
  const sectionDragRef = useRef(null);
  const [sectionDragged, setSectionDragged] = useState(null);

  const sectionDragStart = useCallback((e, i) => {
    sectionDragRef.current = i;
    setSectionDragged(i);
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  const sectionDragOver = useCallback((e, i) => {
    e.preventDefault();
    if (sectionDragRef.current === null || sectionDragRef.current === i) return;
    setSections((prev) => {
      const s = [...prev];
      const [moved] = s.splice(sectionDragRef.current, 1);
      s.splice(i, 0, moved);
      sectionDragRef.current = i;
      return s;
    });
    setSectionDragged(i);
  }, []);

  const sectionDrop = useCallback((e) => { e.preventDefault(); setSectionDragged(null); }, []);
  const sectionDragEnd = useCallback(() => { sectionDragRef.current = null; setSectionDragged(null); }, []);

  /* section CRUD */
  const updateSectionTitle = useCallback((i, title) => {
    setSections((prev) => { const s = [...prev]; s[i] = { ...s[i], title }; return s; });
  }, []);

  const updateSectionData = useCallback((i, data) => {
    setSections((prev) => { const s = [...prev]; s[i] = { ...s[i], data }; return s; });
  }, []);

  const removeSection = useCallback((i) => {
    setSections((prev) => prev.filter((_, j) => j !== i));
  }, []);

  const insertSection = useCallback((atIndex, option) => {
    setSections((prev) => {
      const s = [...prev];
      s.splice(atIndex, 0, { id: uid(), title: 'New Section', type: option.type, data: JSON.parse(JSON.stringify(option.data)) });
      return s;
    });
    setAddMenuAt(null);
  }, []);

  /* submit */
  const handleContinue = (e) => {
    e.preventDefault();
    const brief = { campaignName, product };
    sections.forEach((s) => {
      switch (s.type) {
        case 'paragraph': brief[s.id] = { title: s.title, text: s.data.text }; break;
        case 'list': brief[s.id] = { title: s.title, items: s.data.items }; break;
        default: brief[s.id] = { title: s.title, ...s.data }; break;
      }
    });
    navigate('/brand-profile', {
      state: { ...navState, brandBrief: { templateName, niche, campaignName, product, sections } },
    });
  };

  return (
    <div className="brand-onboarding-container brief-customize-container">
      <header className="onboarding-header">
        <span className="eyebrow">Customize Brief</span>
        <h2>{templateName}</h2>
        <p>Click any text to edit inline. Drag sections or items to reorder. Remove or add sections as needed.</p>
      </header>

      <form onSubmit={handleContinue}>
        <div className="inline-doc">
          {/* Fixed header */}
          <InlineText className="inline-doc-title" value={docTitle} onChange={setDocTitle} placeholder="Document title..." />
          <div className="inline-doc-meta">
            <span className="inline-doc-meta-row">
              <strong>Campaign:</strong>
              <InlineText value={campaignName} onChange={setCampaignName} placeholder="Campaign name..." />
            </span>
            <span className="inline-doc-meta-row">
              <strong>Product:</strong>
              <InlineText value={product} onChange={setProduct} placeholder="Product name..." />
            </span>
          </div>

          {/* Dynamic sections with insert points between each */}
          {sections.map((section, idx) => {
            const Renderer = SECTION_RENDERERS[section.type];
            if (!Renderer) return null;
            return (
              <div key={section.id}>
                {/* Insert point above this section */}
                <div className="inline-insert-zone">
                  <div className="inline-insert-line" />
                  <button
                    type="button"
                    className="inline-insert-btn"
                    onClick={() => setAddMenuAt(addMenuAt === idx ? null : idx)}
                    title="Insert section here"
                  >+</button>
                  <div className="inline-insert-line" />
                </div>
                {addMenuAt === idx && (
                  <div ref={addMenuRef} className="inline-add-section-menu inline-add-section-menu-inline">
                    {ADD_SECTION_OPTIONS.map((opt) => (
                      <button type="button" key={opt.label} className="inline-add-section-option" onClick={() => insertSection(idx, opt)}>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
                <section
                  className={`inline-doc-section inline-doc-section-draggable ${sectionDragged === idx ? 'section-dragging' : ''}`}
                  draggable
                  onDragStart={(e) => sectionDragStart(e, idx)}
                  onDragOver={(e) => sectionDragOver(e, idx)}
                  onDrop={sectionDrop}
                  onDragEnd={sectionDragEnd}
                >
                  <div className="inline-section-header">
                    <span className="section-drag-handle" title="Drag to reorder section">&#x2630;</span>
                    <span className="inline-section-number">{idx + 1}.</span>
                    <InlineText
                      className="inline-section-title-input"
                      value={section.title}
                      onChange={(v) => updateSectionTitle(idx, v)}
                      placeholder="Section title..."
                    />
                    <button type="button" className="inline-section-remove" onClick={() => removeSection(idx)} title="Remove section">&times;</button>
                  </div>
                  <Renderer data={section.data} onDataChange={(data) => updateSectionData(idx, data)} />
                </section>
              </div>
            );
          })}

          {/* Insert point at the very end */}
          <div className="inline-insert-zone">
            <div className="inline-insert-line" />
            <button
              type="button"
              className="inline-insert-btn"
              onClick={() => setAddMenuAt(addMenuAt === sections.length ? null : sections.length)}
              title="Add section at end"
            >+</button>
            <div className="inline-insert-line" />
          </div>
          {addMenuAt === sections.length && (
            <div ref={addMenuRef} className="inline-add-section-menu inline-add-section-menu-inline">
              {ADD_SECTION_OPTIONS.map((opt) => (
                <button type="button" key={opt.label} className="inline-add-section-option" onClick={() => insertSection(sections.length, opt)}>
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <button type="submit" className="continue-button">
          Continue to Content Mix
        </button>
      </form>
    </div>
  );
}

export default BrandBriefCustomizePage;
