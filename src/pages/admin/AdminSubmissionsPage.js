import React, { useEffect, useState } from 'react';
import adminService from '../../services/adminService';
import './AdminPages.css';

const STATUS_FILTERS = ['all', 'pending', 'approved', 'rejected'];

function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('pending');
  const [selected, setSelected] = useState(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const [reviewing, setReviewing] = useState(false);

  useEffect(() => {
    adminService
      .getSubmissions()
      .then(setSubmissions)
      .catch((err) => setError(err.message || 'Failed to load submissions.'))
      .finally(() => setLoading(false));
  }, []);

  const handleReview = async (submissionId, decision) => {
    try {
      setReviewing(true);
      const updated = await adminService.reviewSubmission(submissionId, decision, reviewNotes);
      setSubmissions((prev) =>
        prev.map((s) => (s.id === submissionId ? { ...s, ...updated } : s)),
      );
      setSelected(null);
      setReviewNotes('');
    } catch (err) {
      alert(err.message || 'Review failed.');
    } finally {
      setReviewing(false);
    }
  };

  const filtered =
    filter === 'all' ? submissions : submissions.filter((s) => s.status === filter);

  return (
    <div className="admin-page">
      <header className="admin-header">
        <span className="eyebrow">Admin</span>
        <h2>Submissions</h2>
        <p>Review creator and brand submissions.</p>
      </header>

      <div className="admin-filter-bar">
        {STATUS_FILTERS.map((f) => (
          <button
            key={f}
            className={`admin-filter-btn${filter === f ? ' active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {error && <p className="admin-error">{error}</p>}

      {loading ? (
        <div className="admin-skeleton-list">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="admin-skeleton-row" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="admin-empty">No {filter === 'all' ? '' : filter} submissions found.</div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Submitted</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((sub) => (
                <tr key={sub.id}>
                  <td className="admin-cell-name">{sub.name}</td>
                  <td>
                    <span className="admin-type-badge">{sub.type}</span>
                  </td>
                  <td className="admin-cell-date">
                    {new Date(sub.submitted_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </td>
                  <td>
                    <span className={`admin-status-badge ${sub.status}`}>{sub.status}</span>
                  </td>
                  <td>
                    <button
                      className="admin-review-btn"
                      onClick={() => {
                        setSelected(sub);
                        setReviewNotes('');
                      }}
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selected && (
        <div className="admin-modal-overlay" onClick={() => setSelected(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <button className="admin-modal-close" onClick={() => setSelected(null)}>
              &times;
            </button>
            <h3>Review Submission</h3>

            <div className="admin-modal-details">
              <div className="admin-detail-row">
                <span className="admin-detail-label">Name</span>
                <span className="admin-detail-value">{selected.name}</span>
              </div>
              <div className="admin-detail-row">
                <span className="admin-detail-label">Type</span>
                <span className="admin-detail-value">{selected.type}</span>
              </div>
              <div className="admin-detail-row">
                <span className="admin-detail-label">Email</span>
                <span className="admin-detail-value">{selected.email}</span>
              </div>
              {selected.bio && (
                <div className="admin-detail-row vertical">
                  <span className="admin-detail-label">Bio</span>
                  <p className="admin-detail-value">{selected.bio}</p>
                </div>
              )}
              {selected.portfolio_url && (
                <div className="admin-detail-row">
                  <span className="admin-detail-label">Portfolio</span>
                  <a
                    className="admin-detail-value admin-link"
                    href={selected.portfolio_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View portfolio
                  </a>
                </div>
              )}
            </div>

            <label className="admin-notes-label" htmlFor="review-notes">
              Notes (optional)
            </label>
            <textarea
              id="review-notes"
              className="admin-notes-input"
              placeholder="Add notes about this decision..."
              value={reviewNotes}
              onChange={(e) => setReviewNotes(e.target.value)}
              rows={3}
            />

            <div className="admin-modal-actions">
              <button
                className="admin-action-btn reject"
                disabled={reviewing}
                onClick={() => handleReview(selected.id, 'rejected')}
              >
                {reviewing ? 'Saving...' : 'Reject'}
              </button>
              <button
                className="admin-action-btn approve"
                disabled={reviewing}
                onClick={() => handleReview(selected.id, 'approved')}
              >
                {reviewing ? 'Saving...' : 'Approve'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminSubmissionsPage;
