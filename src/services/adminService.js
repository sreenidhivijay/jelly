import api from './api';

const adminService = {
  getSubmissions() {
    return api.get('/admin/submissions');
  },

  reviewSubmission(submissionId, decision, notes) {
    return api.post(`/admin/submissions/${submissionId}/review`, { decision, notes });
  },

  getEvents() {
    return api.get('/admin/events');
  },

  createEvent(eventData) {
    return api.post('/admin/events', eventData);
  },

  updateEvent(eventId, eventData) {
    return api.put(`/admin/events/${eventId}`, eventData);
  },

  publishEvent(eventId) {
    return api.post(`/admin/events/${eventId}/publish`);
  },

  unpublishEvent(eventId) {
    return api.post(`/admin/events/${eventId}/unpublish`);
  },

  deleteEvent(eventId) {
    return api.delete(`/admin/events/${eventId}`);
  },

  getDashboardStats() {
    return api.get('/admin/stats');
  },
};

export default adminService;
