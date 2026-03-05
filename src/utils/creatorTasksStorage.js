export const CREATOR_COMPLETED_TASKS_KEY = 'creator_completed_tasks';
export const CREATOR_UPLOAD_DRAFTS_KEY = 'creator_upload_drafts';

export const DEMO_COMPLETED_TASKS = [
  {
    id: 901,
    sku: 'Reel',
    brand: 'Sunkissed Skin',
    description: 'Launch reel for SPF serum with fast cuts and texture closeups.',
    completedAt: '2026-02-20T15:30:00.000Z',
    deliverables: [
      {
        id: 'sunkissed-del-1',
        title: 'Hero Reel',
        description: 'One 20-30s vertical hero edit.',
      },
    ],
    uploadedContent: {
      'sunkissed-del-1': {
        url: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
        fileType: 'video/mp4',
        fileName: 'sunkissed-hero-reel.mp4',
      },
    },
  },
  {
    id: 902,
    sku: 'Post',
    brand: 'Maple & Main Cafe',
    description: 'Still-life product photo set for seasonal menu announcement.',
    completedAt: '2026-02-18T11:00:00.000Z',
    deliverables: [
      {
        id: 'maple-del-1',
        title: 'Cafe Hero Post',
        description: 'One high-resolution still with latte art and pastry styling.',
      },
    ],
    uploadedContent: {
      'maple-del-1': {
        url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80',
        fileType: 'image/jpeg',
        fileName: 'maple-hero-post.jpg',
      },
    },
  },
];

export function loadCompletedTasks() {
  try {
    return [...DEMO_COMPLETED_TASKS];
  } catch (error) {
    return [...DEMO_COMPLETED_TASKS];
  }
}

export function saveCompletedTasks(tasks) {
  try {
    localStorage.setItem(CREATOR_COMPLETED_TASKS_KEY, JSON.stringify(tasks));
  } catch (error) {
    // Ignore storage write failures in local/dev environments.
  }
}

export function loadUploadDrafts() {
  try {
    const raw = localStorage.getItem(CREATOR_UPLOAD_DRAFTS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (error) {
    return {};
  }
}

export function saveUploadDrafts(drafts) {
  try {
    localStorage.setItem(CREATOR_UPLOAD_DRAFTS_KEY, JSON.stringify(drafts));
  } catch (error) {
    // Ignore storage write failures in local/dev environments.
  }
}
