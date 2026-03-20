import React, { useEffect, useState } from "react";
import adminService from "../../services/adminService";
import "./AdminPages.css";

const EMPTY_EVENT = { title: "", body: "" };

function AdminEventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [form, setForm] = useState(EMPTY_EVENT);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    adminService
      .getEvents()
      .then(setEvents)
      .catch((err) => setError(err.message || "Failed to load events."))
      .finally(() => setLoading(false));
  }, []);

  const openCreate = () => {
    setEditingEvent(null);
    setForm(EMPTY_EVENT);
    setShowForm(true);
  };

  const openEdit = (event) => {
    setEditingEvent(event);
    setForm({
      title: event.title,
      body: event.body || "",
    });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingEvent(null);
    setForm(EMPTY_EVENT);
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    if (!form.title.trim()) return;
    try {
      setSaving(true);
      if (editingEvent) {
        const updated = await adminService.updateEvent(editingEvent.id, form);
        setEvents((prev) =>
          prev.map((ev) =>
            ev.id === editingEvent.id ? { ...ev, ...updated } : ev,
          ),
        );
      } else {
        const created = await adminService.createEvent(form);
        setEvents((prev) => [created, ...prev]);
      }
      closeForm();
    } catch (err) {
      alert(err.message || "Failed to save event.");
    } finally {
      setSaving(false);
    }
  };

  const handlePublishToggle = async (event) => {
    try {
      const updated =
        event.status === "published"
          ? await adminService.unpublishEvent(event.id)
          : await adminService.publishEvent(event.id);
      setEvents((prev) =>
        prev.map((ev) => (ev.id === event.id ? { ...ev, ...updated } : ev)),
      );
    } catch (err) {
      alert(err.message || "Failed to update event.");
    }
  };

  const handleDelete = async (eventId) => {
    if (!window.confirm("Delete this event? This cannot be undone.")) return;
    try {
      await adminService.deleteEvent(eventId);
      setEvents((prev) => prev.filter((ev) => ev.id !== eventId));
    } catch (err) {
      alert(err.message || "Failed to delete event.");
    }
  };

  return (
    <div className="admin-page">
      <header className="admin-header">
        <span className="eyebrow">Admin</span>
        <h2>Events</h2>
        <p>Create, manage, and publish events.</p>
      </header>

      <div className="admin-toolbar">
        <button className="admin-primary-btn" onClick={openCreate}>
          + New Event
        </button>
      </div>

      {error && <p className="admin-error">{error}</p>}

      {loading ? (
        <div className="admin-skeleton-list">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="admin-skeleton-row" />
          ))}
        </div>
      ) : events.length === 0 ? (
        <div className="admin-empty">
          No events yet. Create your first event above.
        </div>
      ) : (
        <div className="admin-events-grid">
          {events.map((event) => (
            <div className="admin-event-card" key={event.id}>
              <div className="admin-event-card-header">
                <h3>{event.title}</h3>
                <span className={`admin-status-badge ${event.status}`}>
                  {event.status}
                </span>
              </div>
              {event.body && <p className="admin-event-desc">{event.body}</p>}
              <div className="admin-event-actions">
                <button
                  className="admin-ghost-btn"
                  onClick={() => openEdit(event)}
                >
                  Edit
                </button>
                <button
                  className={`admin-ghost-btn ${event.status === "published" ? "unpublish" : "publish"}`}
                  onClick={() => handlePublishToggle(event)}
                >
                  {event.status === "published" ? "Unpublish" : "Publish"}
                </button>
                <button
                  className="admin-ghost-btn danger"
                  onClick={() => handleDelete(event.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="admin-modal-overlay" onClick={closeForm}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <button className="admin-modal-close" onClick={closeForm}>
              &times;
            </button>
            <h3>{editingEvent ? "Edit Event" : "New Event"}</h3>

            <div className="admin-form">
              <label className="admin-form-label" htmlFor="event-title">
                Title
              </label>
              <input
                id="event-title"
                className="admin-form-input"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Event title"
              />

              <label className="admin-form-label" htmlFor="event-description">
                Description
              </label>
              <textarea
                id="event-description"
                className="admin-notes-input"
                name="body"
                value={form.body}
                onChange={handleChange}
                placeholder="What is this event about?"
                rows={3}
              />
            </div>

            <div className="admin-modal-actions">
              <button className="admin-ghost-btn" onClick={closeForm}>
                Cancel
              </button>
              <button
                className="admin-action-btn approve"
                disabled={saving || !form.title.trim()}
                onClick={handleSave}
              >
                {saving
                  ? "Saving..."
                  : editingEvent
                    ? "Save Changes"
                    : "Create Event"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminEventsPage;
