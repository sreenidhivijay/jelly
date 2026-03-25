import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./BrandBriefBuilderPage.css";

const STEPS = [
  { id: "welcome", label: "Welcome" },
  { id: "personality", label: "Personality" },
  { id: "voice", label: "Voice & Tone" },
  { id: "vibe", label: "Visual Vibe" },
  { id: "pillars", label: "Content Pillars" },
  { id: "dos-donts", label: "Do's & Don'ts" },
  { id: "story", label: "Brand Story" },
  { id: "review", label: "Review" },
];

const PERSONALITY_SPECTRUMS = [
  { left: "Playful", right: "Serious", icon: { left: "🎈", right: "🏛" } },
  { left: "Minimal", right: "Maximalist", icon: { left: "◻️", right: "🎨" } },
  { left: "Edgy", right: "Soft", icon: { left: "⚡", right: "🌸" } },
  { left: "Luxury", right: "Accessible", icon: { left: "💎", right: "🤝" } },
  { left: "Bold", right: "Subtle", icon: { left: "🔥", right: "🌊" } },
  { left: "Trendy", right: "Timeless", icon: { left: "✨", right: "🕰" } },
];

const TONE_TAGS = [
  "Witty",
  "Warm",
  "Confident",
  "Chill",
  "Empowering",
  "Inspirational",
  "Sarcastic",
  "Poetic",
  "Direct",
  "Conversational",
  "Authoritative",
  "Friendly",
  "Quirky",
  "Elegant",
  "Raw & Real",
  "Motivational",
];

const VIBE_OPTIONS = [
  {
    id: "clean-minimal",
    name: "Clean & Minimal",
    emoji: "🤍",
    desc: "White space, muted tones, intentional simplicity",
    colors: ["#f5f5f5", "#e0e0e0", "#bdbdbd", "#9e9e9e"],
  },
  {
    id: "warm-earthy",
    name: "Warm & Earthy",
    emoji: "🍂",
    desc: "Terracotta, olive, cream — natural and grounded",
    colors: ["#d4a373", "#ccd5ae", "#fefae0", "#e9edc9"],
  },
  {
    id: "bold-vibrant",
    name: "Bold & Vibrant",
    emoji: "🌈",
    desc: "High contrast, saturated colors, eye-catching",
    colors: ["#ff006e", "#8338ec", "#3a86ff", "#ffbe0b"],
  },
  {
    id: "dark-moody",
    name: "Dark & Moody",
    emoji: "🖤",
    desc: "Deep tones, dramatic lighting, cinematic feel",
    colors: ["#1a1a2e", "#16213e", "#0f3460", "#e94560"],
  },
  {
    id: "pastel-dreamy",
    name: "Pastel & Dreamy",
    emoji: "🦋",
    desc: "Soft pastels, whimsical, ethereal and floaty",
    colors: ["#ffc8dd", "#bde0fe", "#a2d2ff", "#cdb4db"],
  },
  {
    id: "streetwear-urban",
    name: "Streetwear & Urban",
    emoji: "🔲",
    desc: "Gritty textures, bold type, street culture energy",
    colors: ["#000000", "#ffffff", "#ff4500", "#333333"],
  },
];

const PILLAR_SUGGESTIONS = [
  { label: "Behind the Scenes", emoji: "🎬" },
  { label: "Product Showcase", emoji: "📦" },
  { label: "Tutorials & How-To", emoji: "📚" },
  { label: "User Stories", emoji: "💬" },
  { label: "Lifestyle & Culture", emoji: "🌿" },
  { label: "Sustainability", emoji: "♻️" },
  { label: "Self-Care & Wellness", emoji: "🧘" },
  { label: "Humor & Memes", emoji: "😂" },
  { label: "Inspiration & Quotes", emoji: "💡" },
  { label: "Community Spotlight", emoji: "🤝" },
  { label: "Seasonal & Trends", emoji: "🔥" },
  { label: "Before & After", emoji: "✨" },
  { label: "Day in the Life", emoji: "☀️" },
  { label: "Unboxing & Reviews", emoji: "📬" },
  { label: "Collabs & Features", emoji: "🤳" },
];

const DOS_SUGGESTIONS = [
  "Show the product in real-life situations",
  "Use natural lighting whenever possible",
  "Include a clear call-to-action",
  "Tag us and use our branded hashtag",
  "Keep it authentic — real > polished",
  "Show diverse faces and body types",
  "Film in vertical (9:16) format",
  "Start with a hook in the first 2 seconds",
];

const DONTS_SUGGESTIONS = [
  "Don't mention competitor brands",
  "Avoid overly filtered or airbrushed looks",
  "Don't use copyrighted music",
  "Avoid controversial political topics",
  "Don't make medical or health claims",
  "Don't post without brand approval",
  "Avoid low-resolution or blurry footage",
  "Don't use a hard-sell tone",
];

const STORAGE_KEY = "jelly_brand_brief";

function loadSavedBrief() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export default function BrandBriefBuilderPage() {
  const navigate = useNavigate();
  const saved = loadSavedBrief();
  const isEditing = !!saved;

  const [currentStep, setCurrentStep] = useState(
    isEditing ? STEPS.length - 1 : 0,
  );
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState("forward");
  const [highestStepReached, setHighestStepReached] = useState(
    isEditing ? STEPS.length - 1 : 0,
  );

  // Step data — restore from localStorage if available
  const [personality, setPersonality] = useState(
    saved
      ? saved.personality.map((p) => p.value)
      : PERSONALITY_SPECTRUMS.map(() => 50),
  );
  const [selectedTones, setSelectedTones] = useState(saved?.tones || []);
  const [toneExamples, setToneExamples] = useState(
    saved?.toneExamples || { weSay: "", notWeSay: "" },
  );
  const [selectedVibe, setSelectedVibe] = useState(saved?.vibe?.id || null);
  const [selectedPillars, setSelectedPillars] = useState(saved?.pillars || []);
  const [customPillar, setCustomPillar] = useState("");
  const [dos, setDos] = useState(saved?.dos || []);
  const [donts, setDonts] = useState(saved?.donts || []);
  const [customDo, setCustomDo] = useState("");
  const [customDont, setCustomDont] = useState("");
  const [story, setStory] = useState(
    saved?.story || { oneLiner: "", mission: "", audience: "", uniqueness: "" },
  );

  const goTo = useCallback(
    (stepIndex, { allowSkip = false } = {}) => {
      if (animating || stepIndex === currentStep) return;
      if (!allowSkip && stepIndex > highestStepReached) return;
      setDirection(stepIndex > currentStep ? "forward" : "backward");
      setAnimating(true);
      setTimeout(() => {
        setCurrentStep(stepIndex);
        setHighestStepReached((prev) => Math.max(prev, stepIndex));
        setAnimating(false);
      }, 300);
    },
    [animating, currentStep, highestStepReached],
  );

  const next = () => goTo(currentStep + 1, { allowSkip: true });
  const prev = () => goTo(currentStep - 1);

  const toggleTone = (tone) => {
    setSelectedTones((prev) =>
      prev.includes(tone) ? prev.filter((t) => t !== tone) : [...prev, tone],
    );
  };

  const togglePillar = (pillar) => {
    setSelectedPillars((prev) =>
      prev.includes(pillar)
        ? prev.filter((p) => p !== pillar)
        : prev.length < 5
          ? [...prev, pillar]
          : prev,
    );
  };

  const addCustomPillar = () => {
    if (customPillar.trim() && selectedPillars.length < 5) {
      setSelectedPillars((prev) => [...prev, customPillar.trim()]);
      setCustomPillar("");
    }
  };

  const toggleDo = (item) => {
    setDos((prev) =>
      prev.includes(item) ? prev.filter((d) => d !== item) : [...prev, item],
    );
  };

  const toggleDont = (item) => {
    setDonts((prev) =>
      prev.includes(item) ? prev.filter((d) => d !== item) : [...prev, item],
    );
  };

  const addCustomDo = () => {
    if (customDo.trim()) {
      setDos((prev) => [...prev, customDo.trim()]);
      setCustomDo("");
    }
  };

  const addCustomDont = () => {
    if (customDont.trim()) {
      setDonts((prev) => [...prev, customDont.trim()]);
      setCustomDont("");
    }
  };

  const getPersonalityLabel = (value, left, right) => {
    if (value < 25) return left;
    if (value < 45) return `Leaning ${left}`;
    if (value <= 55) return "Balanced";
    if (value <= 75) return `Leaning ${right}`;
    return right;
  };

  const buildBriefData = () => ({
    personality: PERSONALITY_SPECTRUMS.map((s, i) => ({
      spectrum: `${s.left} — ${s.right}`,
      value: personality[i],
      label: getPersonalityLabel(personality[i], s.left, s.right),
    })),
    tones: selectedTones,
    toneExamples,
    vibe: VIBE_OPTIONS.find((v) => v.id === selectedVibe) || null,
    pillars: selectedPillars,
    dos,
    donts,
    story,
  });

  const handleFinish = () => {
    const briefData = buildBriefData();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(briefData));
    navigate("/brand-profile");
  };

  // Map review section names to step indices
  const sectionToStep = {
    story: STEPS.findIndex((s) => s.id === "story"),
    personality: STEPS.findIndex((s) => s.id === "personality"),
    voice: STEPS.findIndex((s) => s.id === "voice"),
    vibe: STEPS.findIndex((s) => s.id === "vibe"),
    pillars: STEPS.findIndex((s) => s.id === "pillars"),
    "dos-donts": STEPS.findIndex((s) => s.id === "dos-donts"),
  };

  const renderStep = () => {
    switch (STEPS[currentStep].id) {
      case "welcome":
        return (
          <div className="bb-step bb-welcome">
            <div className="bb-welcome-icon">✦</div>
            <h1>Let's define your brand</h1>
            <p className="bb-welcome-sub">
              Your brand brief is the DNA behind every piece of content.
              It tells creators who you are, how you sound, and what your
              world looks and feels like.
            </p>
            <p className="bb-welcome-time">Takes about 5 minutes</p>
            <button className="bb-btn-primary" onClick={next}>
              Let's Go
            </button>
          </div>
        );

      case "personality":
        return (
          <div className="bb-step bb-personality">
            <div className="bb-step-header">
              <h2>What's your brand's personality?</h2>
              <p>Drag each slider to where your brand sits on the spectrum</p>
            </div>
            <div className="bb-spectrums">
              {PERSONALITY_SPECTRUMS.map((spec, i) => (
                <div key={i} className="bb-spectrum-row">
                  <div className="bb-spectrum-label left">
                    <span className="bb-spectrum-emoji">{spec.icon.left}</span>
                    <span>{spec.left}</span>
                  </div>
                  <div className="bb-slider-track">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={personality[i]}
                      onChange={(e) => {
                        const next = [...personality];
                        next[i] = Number(e.target.value);
                        setPersonality(next);
                      }}
                      className="bb-slider"
                      style={{
                        "--value": `${personality[i]}%`,
                      }}
                    />
                    <div className="bb-slider-marker" />
                  </div>
                  <div className="bb-spectrum-label right">
                    <span>{spec.right}</span>
                    <span className="bb-spectrum-emoji">{spec.icon.right}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "voice":
        return (
          <div className="bb-step bb-voice">
            <div className="bb-step-header">
              <h2>How does your brand sound?</h2>
              <p>Pick 3–5 words that describe your brand's voice</p>
            </div>
            <div className="bb-tag-cloud">
              {TONE_TAGS.map((tone) => (
                <button
                  key={tone}
                  className={`bb-tag ${selectedTones.includes(tone) ? "selected" : ""}`}
                  onClick={() => toggleTone(tone)}
                >
                  {tone}
                </button>
              ))}
            </div>
            {selectedTones.length > 0 && (
              <div className="bb-tone-examples">
                <div className="bb-example-box say">
                  <label>We say things like...</label>
                  <textarea
                    placeholder={`e.g. "Your glow-up starts here" or "No gatekeeping, just good taste"`}
                    value={toneExamples.weSay}
                    onChange={(e) =>
                      setToneExamples((p) => ({ ...p, weSay: e.target.value }))
                    }
                    rows={3}
                  />
                </div>
                <div className="bb-example-box no-say">
                  <label>We'd never say...</label>
                  <textarea
                    placeholder={`e.g. "Buy now before it's gone!!!" or "You NEED this"`}
                    value={toneExamples.notWeSay}
                    onChange={(e) =>
                      setToneExamples((p) => ({
                        ...p,
                        notWeSay: e.target.value,
                      }))
                    }
                    rows={3}
                  />
                </div>
              </div>
            )}
          </div>
        );

      case "vibe":
        return (
          <div className="bb-step bb-vibe">
            <div className="bb-step-header">
              <h2>What's your visual vibe?</h2>
              <p>Pick the aesthetic that feels most like your brand</p>
            </div>
            <div className="bb-vibe-grid">
              {VIBE_OPTIONS.map((vibe) => (
                <button
                  key={vibe.id}
                  className={`bb-vibe-card ${selectedVibe === vibe.id ? "selected" : ""}`}
                  onClick={() => setSelectedVibe(vibe.id)}
                >
                  <div className="bb-vibe-colors">
                    {vibe.colors.map((c, i) => (
                      <div
                        key={i}
                        className="bb-color-swatch"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                  <div className="bb-vibe-emoji">{vibe.emoji}</div>
                  <h3>{vibe.name}</h3>
                  <p>{vibe.desc}</p>
                  {selectedVibe === vibe.id && (
                    <div className="bb-vibe-check">✓</div>
                  )}
                </button>
              ))}
            </div>
          </div>
        );

      case "pillars":
        return (
          <div className="bb-step bb-pillars">
            <div className="bb-step-header">
              <h2>What do you always talk about?</h2>
              <p>
                Pick 3–5 content pillars — the recurring themes across your
                brand
              </p>
            </div>
            <div className="bb-pillar-count">
              {selectedPillars.length}/5 selected
            </div>
            <div className="bb-pillar-grid">
              {PILLAR_SUGGESTIONS.map((p) => (
                <button
                  key={p.label}
                  className={`bb-pillar-chip ${selectedPillars.includes(p.label) ? "selected" : ""}`}
                  onClick={() => togglePillar(p.label)}
                >
                  <span className="bb-pillar-emoji">{p.emoji}</span>
                  {p.label}
                </button>
              ))}
            </div>
            <div className="bb-custom-pillar">
              <input
                type="text"
                placeholder="Add your own pillar..."
                value={customPillar}
                onChange={(e) => setCustomPillar(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addCustomPillar()}
              />
              <button onClick={addCustomPillar} disabled={!customPillar.trim()}>
                +
              </button>
            </div>
            {selectedPillars.length > 0 && (
              <div className="bb-selected-pillars">
                {selectedPillars.map((p) => (
                  <span key={p} className="bb-selected-pill">
                    {p}
                    <button onClick={() => togglePillar(p)}>×</button>
                  </span>
                ))}
              </div>
            )}
          </div>
        );

      case "dos-donts":
        return (
          <div className="bb-step bb-dos-donts">
            <div className="bb-step-header">
              <h2>Set the ground rules</h2>
              <p>What should creators always do — and never do?</p>
            </div>
            <div className="bb-dd-columns">
              <div className="bb-dd-col do-col">
                <h3>Always do</h3>
                <div className="bb-dd-suggestions">
                  {DOS_SUGGESTIONS.map((item) => (
                    <button
                      key={item}
                      className={`bb-dd-chip ${dos.includes(item) ? "selected" : ""}`}
                      onClick={() => toggleDo(item)}
                    >
                      <span className="bb-dd-icon">✓</span>
                      {item}
                    </button>
                  ))}
                </div>
                <div className="bb-dd-custom">
                  <input
                    type="text"
                    placeholder="Add your own..."
                    value={customDo}
                    onChange={(e) => setCustomDo(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addCustomDo()}
                  />
                  <button onClick={addCustomDo} disabled={!customDo.trim()}>
                    +
                  </button>
                </div>
              </div>
              <div className="bb-dd-col dont-col">
                <h3>Never do</h3>
                <div className="bb-dd-suggestions">
                  {DONTS_SUGGESTIONS.map((item) => (
                    <button
                      key={item}
                      className={`bb-dd-chip ${donts.includes(item) ? "selected" : ""}`}
                      onClick={() => toggleDont(item)}
                    >
                      <span className="bb-dd-icon">✗</span>
                      {item}
                    </button>
                  ))}
                </div>
                <div className="bb-dd-custom">
                  <input
                    type="text"
                    placeholder="Add your own..."
                    value={customDont}
                    onChange={(e) => setCustomDont(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addCustomDont()}
                  />
                  <button onClick={addCustomDont} disabled={!customDont.trim()}>
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case "story":
        return (
          <div className="bb-step bb-story">
            <div className="bb-step-header">
              <h2>Tell your brand story</h2>
              <p>Help creators understand who you are</p>
            </div>
            <div className="bb-story-prompts">
              <div className="bb-prompt-card">
                <label>Describe your brand in one sentence</label>
                <textarea
                  placeholder="e.g. We're a luxury tea salon curating high tea rituals for the after-hours crowd."
                  value={story.oneLiner}
                  onChange={(e) =>
                    setStory((p) => ({ ...p, oneLiner: e.target.value }))
                  }
                  rows={2}
                />
              </div>
              <div className="bb-prompt-card">
                <label>What's your mission?</label>
                <textarea
                  placeholder="e.g. To make the ritual of tea cool, accessible, and unapologetically glamorous."
                  value={story.mission}
                  onChange={(e) =>
                    setStory((p) => ({ ...p, mission: e.target.value }))
                  }
                  rows={2}
                />
              </div>
              <div className="bb-prompt-card">
                <label>Who is your dream customer?</label>
                <textarea
                  placeholder="e.g. 20-something city-dwellers who love aesthetics, self-care, and late-night vibes."
                  value={story.audience}
                  onChange={(e) =>
                    setStory((p) => ({ ...p, audience: e.target.value }))
                  }
                  rows={2}
                />
              </div>
              <div className="bb-prompt-card">
                <label>What makes you different from everyone else?</label>
                <textarea
                  placeholder="e.g. We blend old-world tea culture with nightlife energy — think high tea meets speakeasy."
                  value={story.uniqueness}
                  onChange={(e) =>
                    setStory((p) => ({ ...p, uniqueness: e.target.value }))
                  }
                  rows={2}
                />
              </div>
            </div>
          </div>
        );

      case "review":
        return (
          <div className="bb-step bb-review">
            <div className="bb-step-header">
              <h2>Your Brand Brief</h2>
              <p>Here's what creators will see when they work with you</p>
            </div>
            <div className="bb-review-card">
              {/* Story */}
              {(story.oneLiner || story.mission) && (
                <div className="bb-review-section">
                  <div className="bb-review-section-header">
                    <h3>Brand Story</h3>
                    <button className="bb-review-edit-btn" onClick={() => goTo(sectionToStep.story)}>Edit</button>
                  </div>
                  {story.oneLiner && (
                    <p className="bb-review-quote">"{story.oneLiner}"</p>
                  )}
                  {story.mission && (
                    <p>
                      <strong>Mission:</strong> {story.mission}
                    </p>
                  )}
                  {story.audience && (
                    <p>
                      <strong>Dream customer:</strong> {story.audience}
                    </p>
                  )}
                  {story.uniqueness && (
                    <p>
                      <strong>What sets us apart:</strong> {story.uniqueness}
                    </p>
                  )}
                </div>
              )}

              {/* Personality */}
              <div className="bb-review-section">
                <div className="bb-review-section-header">
                  <h3>Brand Personality</h3>
                  <button className="bb-review-edit-btn" onClick={() => goTo(sectionToStep.personality)}>Edit</button>
                </div>
                <div className="bb-review-spectrums">
                  {PERSONALITY_SPECTRUMS.map((spec, i) => (
                    <div key={i} className="bb-review-spectrum">
                      <span className="bb-review-spectrum-labels">
                        {spec.left} — {spec.right}
                      </span>
                      <div className="bb-review-bar">
                        <div
                          className="bb-review-bar-fill"
                          style={{ width: `${personality[i]}%` }}
                        />
                        <div
                          className="bb-review-bar-dot"
                          style={{ left: `${personality[i]}%` }}
                        />
                      </div>
                      <span className="bb-review-spectrum-value">
                        {getPersonalityLabel(
                          personality[i],
                          spec.left,
                          spec.right,
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Voice */}
              {selectedTones.length > 0 && (
                <div className="bb-review-section">
                  <div className="bb-review-section-header">
                    <h3>Voice & Tone</h3>
                    <button className="bb-review-edit-btn" onClick={() => goTo(sectionToStep.voice)}>Edit</button>
                  </div>
                  <div className="bb-review-tags">
                    {selectedTones.map((t) => (
                      <span key={t} className="bb-review-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                  {toneExamples.weSay && (
                    <div className="bb-review-example say">
                      <strong>We say:</strong> "{toneExamples.weSay}"
                    </div>
                  )}
                  {toneExamples.notWeSay && (
                    <div className="bb-review-example no-say">
                      <strong>We'd never say:</strong> "
                      {toneExamples.notWeSay}"
                    </div>
                  )}
                </div>
              )}

              {/* Vibe */}
              {selectedVibe && (
                <div className="bb-review-section">
                  <div className="bb-review-section-header">
                    <h3>Visual Vibe</h3>
                    <button className="bb-review-edit-btn" onClick={() => goTo(sectionToStep.vibe)}>Edit</button>
                  </div>
                  {(() => {
                    const vibe = VIBE_OPTIONS.find(
                      (v) => v.id === selectedVibe,
                    );
                    return (
                      <div className="bb-review-vibe">
                        <div className="bb-review-vibe-colors">
                          {vibe.colors.map((c, i) => (
                            <div
                              key={i}
                              className="bb-review-swatch"
                              style={{ backgroundColor: c }}
                            />
                          ))}
                        </div>
                        <div>
                          <strong>
                            {vibe.emoji} {vibe.name}
                          </strong>
                          <p>{vibe.desc}</p>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* Pillars */}
              {selectedPillars.length > 0 && (
                <div className="bb-review-section">
                  <div className="bb-review-section-header">
                    <h3>Content Pillars</h3>
                    <button className="bb-review-edit-btn" onClick={() => goTo(sectionToStep.pillars)}>Edit</button>
                  </div>
                  <div className="bb-review-pillars">
                    {selectedPillars.map((p, i) => (
                      <div key={p} className="bb-review-pillar">
                        <span className="bb-review-pillar-num">{i + 1}</span>
                        {p}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Do's & Don'ts */}
              {(dos.length > 0 || donts.length > 0) && (
                <div className="bb-review-section">
                  <div className="bb-review-section-header">
                    <h3>Do's & Don'ts</h3>
                    <button className="bb-review-edit-btn" onClick={() => goTo(sectionToStep["dos-donts"])}>Edit</button>
                  </div>
                  <div className="bb-review-dd">
                    {dos.length > 0 && (
                      <div className="bb-review-dd-col">
                        {dos.map((d) => (
                          <div key={d} className="bb-review-do">
                            <span>✓</span> {d}
                          </div>
                        ))}
                      </div>
                    )}
                    {donts.length > 0 && (
                      <div className="bb-review-dd-col">
                        {donts.map((d) => (
                          <div key={d} className="bb-review-dont">
                            <span>✗</span> {d}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <button className="bb-btn-primary" onClick={handleFinish}>
              Save Brand Brief
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bb-builder">
      {/* Progress bar */}
      {currentStep > 0 && (
        <div className="bb-progress-wrapper">
          <div className="bb-progress-bar">
            <div
              className="bb-progress-fill"
              style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
            />
          </div>
          <div className="bb-step-dots">
            {STEPS.slice(1).map((step, i) => (
              <button
                key={step.id}
                className={`bb-step-dot ${i + 1 <= currentStep ? "active" : ""} ${i + 1 === currentStep ? "current" : ""} ${i + 1 > highestStepReached ? "disabled" : ""}`}
                onClick={() => goTo(i + 1)}
                disabled={i + 1 > highestStepReached}
                title={step.label}
              >
                <span className="bb-dot-label">{step.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step content */}
      <div
        className={`bb-step-container ${animating ? `bb-exit-${direction}` : "bb-enter"}`}
      >
        {renderStep()}
      </div>

      {/* Navigation */}
      {currentStep > 0 && currentStep < STEPS.length - 1 && (
        <div className="bb-nav">
          <button className="bb-btn-back" onClick={prev}>
            Back
          </button>
          <button className="bb-btn-primary" onClick={next}>
            Continue
          </button>
        </div>
      )}
      {currentStep === STEPS.length - 1 && (
        <div className="bb-nav">
          <button className="bb-btn-back" onClick={prev}>
            Back to edit
          </button>
        </div>
      )}
    </div>
  );
}
