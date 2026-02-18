export const signaturePackages = [
  {
    slug: 'soft-glam-story-suite',
    title: 'Soft Glam Story Suite',
    description: 'One hero reel, 4 story frames, and a high-res photo set styled with pearl accents.',
    rate: '$1,800',
    turnaround: '48 hours',
    projectId: 'midnight-tea',
    summary:
      'Perfect for boutique skincare launches and cafe collabs needing dreamy product rituals and ASMR textures.',
    deliverables: ['1 hero reel', '4 sequenced story frames', '6 retouched stills'],
    focusAreas: ['Pearl-accent styling', 'Cafe or vanity scenes', 'Soft glam transitions'],
    perks: ['Direction from Aurora on set styling', '48-hour preview edits'],
    timeline: ['Concept call within 3 days', 'Deliverable within 48 hours of booking confirmation'],
  },
  {
    slug: 'boutique-launch-capsule',
    title: 'Boutique Launch Capsule',
    description: 'Store walkthrough vlog, launch-day livestream, and newsletter-ready imagery.',
    rate: '$2,750',
    turnaround: '48 hours',
    projectId: 'midnight-tea',
    summary:
      'Designed for grand openings that need cinematic walkthroughs, staff introductions, and shoppable stills.',
    deliverables: ['1 store walkthrough vlog', 'Launch-day livestream', '8 newsletter-ready stills'],
    focusAreas: ['Clienteling moments', 'Merchandising closeups', 'Voiceover storytelling'],
    perks: ['Content plan template for your team', 'Replay files for paid ads'],
    timeline: ['Scout session within 5 days', 'Launch live coverage within 48 hours of booking confirmation'],
  },
  {
    slug: 'neon-afterhours-reels',
    title: 'Neon Afterhours Reels',
    description: 'Two cinematic reels that blend nightlife glam with slow-motion detail shots.',
    rate: '$3,200',
    turnaround: '6 days',
    projectId: 'midnight-tea',
    summary:
      'Highlight late-night pop-ups or cocktail launches with hyper-gloss transitions, neon gels, and ASMR cuts.',
    deliverables: ['2 cinematic reels', '1 BTS story stack', '6 press-ready stills'],
    focusAreas: ['Motion transitions', 'Neon gel lighting', 'Sound design moments'],
    perks: ['Sound design polish delivered separately', 'Color-graded stills for press kits'],
    timeline: ['Concept board within 2 days', 'Shoot in 4 days', 'Final delivery day 6'],
  },
  {
    slug: 'pastel-pantry-series',
    title: 'Pastel Pantry Series',
    description: 'Recipe-focused story series and carousel featuring dreamy pantry styling.',
    rate: '$1,950',
    turnaround: '5 days',
    projectId: 'midnight-tea',
    summary:
      'Perfect for gourmet pantry brands wanting cozy kitchen rituals, stop-motion transitions, and tactile prep moments.',
    deliverables: ['6-part story sequence', 'Recipe carousel', 'Ingredient flatlay set'],
    focusAreas: ['Stop-motion transitions', 'Ingredient styling', 'Voiceover narration'],
    perks: ['Shot list for products', 'Pinterest pins for inspiration'],
    timeline: ['Prep call within 48 hours', '48 hours', 'Content live by day 5'],
  },
];

export const getSignaturePackageBySlug = (slug) =>
  signaturePackages.find((pkg) => pkg.slug === slug);
