import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import adminService from '../../services/adminService';
import './AdminPages.css';

function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService
      .getDashboardStats()
      .then(setStats)
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="admin-page">
      <header className="admin-header">
        <span className="eyebrow">Admin</span>
        <h2>Dashboard</h2>
        <p>Overview of submissions and events.</p>
      </header>

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <span className="admin-stat-value">{loading ? '—' : stats?.pending_submissions ?? 0}</span>
          <span className="admin-stat-label">Pending Submissions</span>
        </div>
        <div className="admin-stat-card">
          <span className="admin-stat-value">{loading ? '—' : stats?.approved_submissions ?? 0}</span>
          <span className="admin-stat-label">Approved</span>
        </div>
        <div className="admin-stat-card">
          <span className="admin-stat-value">{loading ? '—' : stats?.published_events ?? 0}</span>
          <span className="admin-stat-label">Published Events</span>
        </div>
        <div className="admin-stat-card">
          <span className="admin-stat-value">{loading ? '—' : stats?.draft_events ?? 0}</span>
          <span className="admin-stat-label">Draft Events</span>
        </div>
      </div>

      <div className="admin-quick-links">
        <Link to="/admin/submissions" className="admin-link-card">
          <h3>Review Submissions</h3>
          <p>Approve or reject creator and brand submissions.</p>
          <span className="admin-link-arrow">&rarr;</span>
        </Link>
        <Link to="/admin/events" className="admin-link-card">
          <h3>Manage Events</h3>
          <p>Create, edit, and publish events.</p>
          <span className="admin-link-arrow">&rarr;</span>
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
