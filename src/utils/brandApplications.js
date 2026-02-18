import { BRAND_APPLICATIONS_KEY, BRAND_APPLICATION_ADDED_EVENT } from './storageKeys';
import { demoCreatorApplicant } from '../data/demoCreator';

const readStoredApplications = () => {
  try {
    const stored = localStorage.getItem(BRAND_APPLICATIONS_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const createBrandApplicationEntry = ({ note, projectId }) => ({
  id: Date.now(),
  ...demoCreatorApplicant,
  status: 'applied',
  projectId,
  note,
  isStored: true,
});

export const appendBrandApplication = (application) => {
  const existing = readStoredApplications();
  localStorage.setItem(BRAND_APPLICATIONS_KEY, JSON.stringify([...existing, application]));
  window.dispatchEvent(new CustomEvent(BRAND_APPLICATION_ADDED_EVENT, { detail: application }));
};

export const getStoredBrandApplications = readStoredApplications;
