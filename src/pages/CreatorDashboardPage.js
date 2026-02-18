import React, { useState, useEffect } from 'react';
import './CreatorDashboardPage.css';

const initialPotentialTasks = [
  { id: 1, sku: 'Reel', location: 'Remote', pay: '$150', deadline: '2 days', skills: 'Video Editing, Transitions', brand: 'Glow Cosmetics', description: 'Create a high-energy reel featuring our new summer palette. Focus on transitions and color popping.' },
  { id: 2, sku: 'Carousel', location: 'On-site (NYC)', pay: '$300', deadline: '5 days', skills: 'Photography, Lighting', brand: 'Urban Eats', description: 'We need 5 high-res photos of our new brunch menu. Natural lighting, overhead shots.' },
  { id: 3, sku: 'Story Set', location: 'Remote', pay: '$80', deadline: '24 hours', skills: 'Graphic Design', brand: 'TechNova', description: 'Design a set of 3 stories announcing our flash sale. Use our brand colors (blue/white).' },
];

const initialCurrentTasks = [
  { id: 101, sku: 'Reel', brand: 'Luxe Apparel', status: 'In Progress', deadline: 'Tomorrow, 5 PM', location: 'Remote', pay: '$200', skills: 'Fashion Styling', description: 'Fashion haul reel. 3 outfits. Upbeat music.' },
  { id: 102, sku: 'Post', brand: 'Bean & Brew', status: 'Pending Approval', deadline: 'Completed', location: 'On-site (SF)', pay: '$120', skills: 'Photography', description: 'Coffee shop vibe photo. Laptop and latte.' },
];

function CreatorDashboardPage() {
  const [potentialTasks, setPotentialTasks] = useState(initialPotentialTasks);
  const [currentTasks, setCurrentTasks] = useState(initialCurrentTasks);
  const [moneyEarned] = useState(1250);
  const [moneyPending] = useState(450);
  const [timeLeft, setTimeLeft] = useState(228010); // 2 days, 15h, 20m, 10s in seconds
  const [selectedTask, setSelectedTask] = useState(null);
  const [modalType, setModalType] = useState(null); // 'opportunity' or 'pending'

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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

  return (
    <div className="creator-dashboard">
      <div className="dashboard-main">
        <header>
          <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Welcome back, Creator</h1>
          <p style={{ color: '#666' }}>Here is what's happening with your content.</p>
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
        {potentialTasks.length === 0 && <p style={{ color: '#888', fontStyle: 'italic' }}>No new tasks available right now.</p>}
        {potentialTasks.map(task => (
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

            {modalType === 'opportunity' && (
              <div className="modal-actions">
                <button className="modal-btn-decline" onClick={() => handleDecline(selectedTask.id)}>Decline</button>
                <button className="modal-btn-accept" onClick={() => handleAccept(selectedTask)}>Accept Job</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CreatorDashboardPage;