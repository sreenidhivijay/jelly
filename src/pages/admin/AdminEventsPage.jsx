import React, { useState } from "react";
import {
  useAdminEvents,
  useCreateEvent,
  useUpdateEvent,
  usePublishEvent,
  useUnpublishEvent,
  useDeleteEvent,
} from "../../hooks/useAdmin";
import "./AdminPages.css";

const EMPTY_EVENT = { title: "", body: "" };

function AdminEventsPage() {
  const { data: events = [], isLoading: loading, error } = useAdminEvents();
  const createEvent = useCreateEvent();
  const updateEvent = useUpdateEvent();
  const publishEvent = usePublishEvent();
  const unpublishEvent = useUnpublishEvent();
  const deleteEvent = useDeleteEvent();

  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [form, setForm] = useState(EMPTY_EVENT);

  const saving = createEvent.isPending || updateEvent.isPending;

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

  const handleSave = () => {
    if (!form.title.trim()) return;
    const options = {
      onSuccess: () => closeForm(),
      onError: (err) => alert(err.message || "Failed to save event."),
    };
    if (editingEvent) {
      updateEvent.mutate({ eventId: editingEvent.id, eventData: form }, options);
    } else {
      createEvent.mutate(form, options);
    }
  };

  const handlePublishToggle = (event) => {
    const mutation = event.status === "published" ? unpublishEvent : publishEvent;
    mutation.mutate(event.id, {
      onError: (err) => alert(err.message || "Failed to update event."),
    });
  };

  const handleDelete = (eventId) => {
    if (!window.confirm("Delete this event? This cannot be undone.")) return;
    deleteEvent.mutate(eventId, {
      onError: (err) => alert(err.message || "Failed to delete event."),
    });
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

      {error && <p className="admin-error">{error.message}</p>}

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
