import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './CreatorDashboardPage.css';
import BusinessReferenceImages from '../components/BusinessReferenceImages';
import CreatorUploads from '../components/CreatorUploads';
import creatorService from '../services/creatorService';
import { useUser } from '../providers/UserContext';
import {
  loadCompletedTasks,
  loadUploadDrafts,
  saveCompletedTasks,
  saveUploadDrafts,
} from '../utils/creatorTasksStorage';

const initialCurrentTasks = [
  {
    id: 101,
    sku: 'Reel',
    brand: 'Luxe Apparel',
    status: 'In Progress',
    deadline: 'Tomorrow, 5 PM',
    location: 'Remote',
    pay: '$200',
    skills: 'Fashion Styling',
    description: 'Fashion haul reel. 3 outfits. Upbeat music.',
    referenceImages: [
      { id: 'luxe-ref-1', url: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80' },
      { id: 'luxe-ref-2', url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80' },
    ],
    deliverables: [
      {
        id: 'luxe-del-1',
        title: 'Summer Outfit Reel',
        description: 'One 30s reel featuring 3 transitions between complete outfit looks.',
        requiredType: 'video',
      },
      {
        id: 'luxe-del-2',
        title: 'Thumbnail Cover',
        description: 'One still image for cover art, centered composition and warm grade.',
        requiredType: 'image',
      },
    ],
  },
  {
    id: 102,
    sku: 'Post',
    brand: 'Bean & Brew',
    status: 'In Progress',
    deadline: '2 days',
    location: 'On-site (SF)',
    pay: '$120',
    skills: 'Photography',
    description: 'Coffee shop vibe photo. Laptop and latte.',
    referenceImages: [
      { id: 'bean-ref-1', url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80' },
      { id: 'bean-ref-2', url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80' },
    ],
    deliverables: [
      {
        id: 'bean-del-1',
        title: 'Cafe Hero Post',
        description: 'One high-resolution still image with laptop + latte styling.',
        requiredType: 'image',
      },
      {
        id: 'bean-del-2',
        title: 'Counter B-Roll Story',
        description: 'One short vertical story clip showing pour and ambience.',
        requiredType: 'video',
      },
    ],
  },
];

function CreatorDashboardPage() {
  const { user } = useUser();
  const [potentialTasks, setPotentialTasks] = useState([]);
  const [currentTasks, setCurrentTasks] = useState(initialCurrentTasks);
  const [moneyEarned] = useState(1250);
  const [moneyPending] = useState(450);
  const [timeLeft, setTimeLeft] = useState(228010); // 2 days, 15h, 20m, 10s in seconds
  const [selectedTask, setSelectedTask] = useState(null);
  const [modalType, setModalType] = useState(null); // 'opportunity' or 'pending'
  const [uploadedContentByTask, setUploadedContentByTask] = useState(() => loadUploadDrafts());
  const [completedTasks, setCompletedTasks] = useState(() => loadCompletedTasks());
  const [saveStateByTask, setSaveStateByTask] = useState({});
  const [opportunitiesLoading, setOpportunitiesLoading] = useState(true);
  const [opportunitiesError, setOpportunitiesError] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    saveCompletedTasks(completedTasks);
  }, [completedTasks]);

  useEffect(() => {
    saveUploadDrafts(uploadedContentByTask);
  }, [uploadedContentByTask]);

  const formatMoney = (amount) => {
    if (amount === null || amount === undefined || amount === '') {
      return 'Compensation TBD';
    }

    if (typeof amount === 'number') {
      return `$${amount}`;
    }

    if (typeof amount === 'string') {
      return amount.startsWith('$') ? amount : `$${amount}`;
    }

    return 'Compensation TBD';
  };

  const normalizeImages = (images) => {
    if (!Array.isArray(images)) {
      return [];
    }

    return images
      .map((img, index) => {
        if (typeof img === 'string') {
          return { id: `img-${index}`, url: img };
        }

        const url = img?.url || img?.image_url || img?.src;
        if (!url) {
          return null;
        }

        return { id: img?.id || `img-${index}`, url };
      })
      .filter(Boolean);
  };

  const normalizeDeliverables = (deliverables) => {
    if (!Array.isArray(deliverables)) {
      return [];
    }

    return deliverables.map((deliverable, index) => ({
      id: deliverable?.id || `deliverable-${index}`,
      title: deliverable?.title || deliverable?.name || `Deliverable ${index + 1}`,
      description: deliverable?.description || 'Complete the requested deliverable.',
      requiredType: deliverable?.required_type || deliverable?.requiredType || 'image',
    }));
  };

  const normalizeOpportunity = (opportunity, index) => {
    const skillValue = opportunity?.skills || opportunity?.skill_tags || opportunity?.tags;
    const skills = Array.isArray(skillValue) ? skillValue.join(', ') : (skillValue || 'General');

    return {
      id: opportunity?.id || opportunity?.opportunity_id || opportunity?.campaign_id || `opportunity-${index}`,
      sku: opportunity?.sku || opportunity?.content_type || opportunity?.deliverable_type || 'Opportunity',
      location: opportunity?.location || opportunity?.location_label || 'Remote',
      pay: formatMoney(opportunity?.pay || opportunity?.payout || opportunity?.rate || opportunity?.compensation),
      deadline: opportunity?.deadline || opportunity?.due_date || opportunity?.submission_deadline || 'TBD',
      skills,
      brand: opportunity?.brand_name || opportunity?.brand?.name || opportunity?.campaign_name || opportunity?.title || 'Brand',
      description: opportunity?.description || opportunity?.summary || 'No additional details provided.',
      referenceImages: normalizeImages(
        opportunity?.reference_images || opportunity?.inspiration_images || opportunity?.images
      ),
      deliverables: normalizeDeliverables(opportunity?.deliverables),
    };
  };

  const loadOpportunities = useCallback(async () => {
    setOpportunitiesLoading(true);
    setOpportunitiesError('');

    try {
      const response = await creatorService.getOpportunities();
      const opportunities =
        (Array.isArray(response) && response) ||
        response?.opportunities ||
        response?.new_opportunities ||
        response?.items ||
        [];

      setPotentialTasks(opportunities.map((opportunity, index) => normalizeOpportunity(opportunity, index)));
    } catch (error) {
      setPotentialTasks([]);
      setOpportunitiesError(error.message || 'Unable to load opportunities.');
    } finally {
      setOpportunitiesLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOpportunities();
  }, [loadOpportunities]);

  const formatTime = (seconds) => {
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${d} days : ${h} hrs : ${m} min : ${s} s`;
  };

  const handleAccept = (task) => {
    setPotentialTasks(potentialTasks.filter(t => t.id !== task.id));
    setCurrentTasks([...currentTasks, { ...task, status: 'In Progress', deadline: task.deadline }]);
    closeModal();
  };

  const handleDeliverableUpload = (taskId, deliverableId, uploadedContent) => {
    setUploadedContentByTask((prev) => {
      const updatedUploads = {
        ...prev,
        [taskId]: {
          ...(prev[taskId] || {}),
          [deliverableId]: uploadedContent,
        },
      };
      return updatedUploads;
    });
    setSaveStateByTask((prev) => ({
      ...prev,
      [taskId]: { type: '', message: '' },
    }));
  };

  const handleSaveUploads = (taskId) => {
    saveUploadDrafts(uploadedContentByTask);
    setSaveStateByTask((prev) => ({
      ...prev,
      [taskId]: { type: 'success', message: 'Draft saved.' },
    }));
  };

  const handleSubmitTask = (taskId) => {
    const task = currentTasks.find((item) => item.id === taskId);
    if (!task) {
      return;
    }

    const deliverables = task.deliverables || [];
    const uploads = uploadedContentByTask[taskId] || {};
    const isTaskComplete =
      deliverables.length > 0 &&
      deliverables.every((deliverable) => Boolean(uploads[deliverable.id]?.url));

    if (!isTaskComplete) {
      setSaveStateByTask((prev) => ({
        ...prev,
        [taskId]: { type: 'error', message: 'Please upload all required deliverables before submitting.' },
      }));
      return;
    }

    setCurrentTasks((prevTasks) => prevTasks.filter((item) => item.id !== taskId));
    setCompletedTasks((prevCompleted) => {
      if (prevCompleted.some((item) => item.id === taskId)) {
        return prevCompleted;
      }
      return [
        {
          ...task,
          completedAt: new Date().toISOString(),
          uploadedContent: uploads,
        },
        ...prevCompleted,
      ];
    });
    setUploadedContentByTask((prev) => {
      const next = { ...prev };
      delete next[taskId];
      return next;
    });
    setSaveStateByTask((prev) => ({
      ...prev,
      [taskId]: { type: 'success', message: 'Submitted successfully.' },
    }));
    if (selectedTask?.id === taskId) {
      closeModal();
    }
  };

  const handleDecline = (id) => {
    setPotentialTasks(potentialTasks.filter(t => t.id !== id));
    closeModal();
  };

  const handleTaskClick = (task, type) => {
    setSelectedTask(task);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setModalType(null);
  };

  const isAcceptedTask = (task) => task && task.status === 'In Progress';

  return (
    <div className="creator-dashboard">
      <div className="dashboard-main">
        <header>
          <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>
            Welcome back, {user?.firstName || 'Creator'}
          </h1>
          <p style={{ color: '#666' }}>Here is what's happening with your content.</p>
          <div style={{ marginTop: '14px' }}>
            <Link className="view-completed-link" to="/creator-completed-tasks">
              View Old & Completed Tasks ({completedTasks.length})
            </Link>
          </div>
        </header>

        <div className="stats-row">
          <div className="stat-card">
            <span className="stat-label">Total Earned</span>
            <span className="stat-value">${moneyEarned}</span>
            <span className="stat-sub">Lifetime earnings</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Pending Payout</span>
            <span className="stat-value">${moneyPending}</span>
            <span className="stat-sub">Releasing soon</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Win Rate</span>
            <span className="stat-value">92%</span>
            <span className="stat-sub">Top 5% of creators</span>
          </div>
        </div>

        <div className="countdown-card">
          <div>
            <h3 style={{ margin: 0, fontSize: '20px' }}>Next Deadline</h3>
            <p style={{ margin: '4px 0 0', opacity: 0.8 }}>Luxe Apparel - Summer Reel</p>
            <p style={{ margin: '4px 0 0', fontSize: '14px', opacity: 0.8 }}>📍 Remote</p>
          </div>
          <div className="countdown-timer" style={{ fontSize: '24px' }}>
            {formatTime(timeLeft)}
          </div>
        </div>

        <section>
          <h3 style={{ marginBottom: '16px' }}>Pending Tasks</h3>
          <div className="task-list">
            {currentTasks.map(task => (
              <div key={task.id} className="task-card" onClick={() => handleTaskClick(task, 'pending')} style={{ cursor: 'pointer' }}>
                <div className="task-info">
                  <h4>{task.brand}</h4>
                  <div className="task-meta">
                    <span style={{ fontWeight: '600' }}>{task.sku}</span>
                    <span>•</span>
                    <span>{task.deadline}</span>
                    {task.location && (
                      <>
                        <span>•</span>
                        <span>{task.location}</span>
                      </>
                    )}
                  </div>
                </div>
                <span className={`status-pill ${task.status === 'In Progress' ? 'pending' : 'accepted'}`}>
                  {task.status}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <aside className="dashboard-sidebar">
        <h3 style={{ fontSize: '20px' }}>New Opportunities</h3>
        {opportunitiesLoading && <p style={{ color: '#888', fontStyle: 'italic' }}>Loading opportunities...</p>}
        {!opportunitiesLoading && opportunitiesError && (
          <div className="opportunities-error-card">
            <p>{opportunitiesError}</p>
            <button type="button" className="btn-retry" onClick={loadOpportunities}>
              Retry
            </button>
          </div>
        )}
        {!opportunitiesLoading && !opportunitiesError && potentialTasks.length === 0 && (
          <p style={{ color: '#888', fontStyle: 'italic' }}>No new tasks available right now.</p>
        )}
        {!opportunitiesLoading && !opportunitiesError && potentialTasks.map(task => (
          <div key={task.id} className="potential-task-card" onClick={() => handleTaskClick(task, 'opportunity')} style={{ cursor: 'pointer' }}>
            <div className="pt-header">
              <span className="sku-badge">{task.sku}</span>
              <span className="pt-pay">{task.pay}</span>
            </div>
            <h4 style={{ margin: '0 0 8px 0' }}>{task.brand}</h4>
            <div className="pt-details">
              <div>📍 {task.location}</div>
              <div>⏰ {task.deadline}</div>
              <div style={{ marginTop: '6px', color: '#888' }}>✨ {task.skills}</div>
            </div>
            {task.referenceImages && task.referenceImages.length > 0 && (
              <div className="pt-inspo-row">
                {task.referenceImages.map((img) => (
                  <img key={img.id} src={img.url} alt="Inspiration" />
                ))}
              </div>
            )}
            <div className="pt-actions">
              <button className="btn-decline" onClick={(e) => { e.stopPropagation(); handleDecline(task.id); }}>Decline</button>
              <button className="btn-accept" onClick={(e) => { e.stopPropagation(); handleAccept(task); }}>Accept</button>
            </div>
          </div>
        ))}
      </aside>

      {selectedTask && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content-inner">
            <button className="modal-close" onClick={closeModal}>×</button>

            <div className="modal-header">
              <span className="sku-badge" style={{ marginBottom: '8px', display: 'inline-block' }}>{selectedTask.sku}</span>
              <h2>{selectedTask.brand}</h2>
              <span className="modal-brand">{selectedTask.location}</span>
            </div>

            <div className="modal-details">
              <div className="detail-row">
                <span className="detail-label">Pay</span>
                <span className="detail-value" style={{ fontWeight: 'bold', color: '#267060' }}>{selectedTask.pay || 'N/A'}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Deadline</span>
                <span className="detail-value">{selectedTask.deadline}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Skills</span>
                <span className="detail-value">{selectedTask.skills || 'General'}</span>
              </div>
            </div>

            <div className="modal-description">
              <strong>Job Description:</strong>
              <p style={{ marginTop: '4px' }}>{selectedTask.description || 'No additional details provided.'}</p>
            </div>

            {!isAcceptedTask(selectedTask) && selectedTask.referenceImages && selectedTask.referenceImages.length > 0 && (
              <div style={{ marginTop: '24px' }}>
                <BusinessReferenceImages
                  images={selectedTask.referenceImages}
                  brandName={selectedTask.brand}
                />
              </div>
            )}

            {isAcceptedTask(selectedTask) && (
              <div className="accepted-task-sections">
                <BusinessReferenceImages
                  images={selectedTask.referenceImages}
                  brandName={selectedTask.brand}
                />
                <CreatorUploads
                  deliverables={selectedTask.deliverables}
                  taskId={selectedTask.id}
                  taskSku={selectedTask.sku}
                  uploadedContent={uploadedContentByTask[selectedTask.id]}
                  onUpload={handleDeliverableUpload}
                  onSave={handleSaveUploads}
                  onSubmit={handleSubmitTask}
                  saveState={saveStateByTask[selectedTask.id]}
                />
              </div>
            )}

            {modalType === 'opportunity' && (
              <div className="modal-actions">
                <button className="modal-btn-decline" onClick={() => handleDecline(selectedTask.id)}>Decline</button>
                <button className="modal-btn-accept" onClick={() => handleAccept(selectedTask)}>Accept Job</button>
              </div>
            )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreatorDashboardPage;
