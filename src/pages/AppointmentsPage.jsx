import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MeetingContext } from '../providers/MeetingContext';
import './AppointmentsPage.css';

const pastCampaignSessions = [
  { name: 'Maison Lumiere', date: 'Oct 28', time: '5:00 PM', recap: 'Launch recap + feedback' },
  { name: 'Opaline Atelier', date: 'Oct 19', time: '7:30 PM', recap: 'Shot list alignment' },
];

function AppointmentsPage() {
  const { appointments } = useContext(MeetingContext);

  return (
    <div className="campaign-planner-page">
      <header className="planner-header">
        <span className="eyebrow">Campaign planner</span>
        <h2>Upcoming collaboration touchpoints</h2>
        <p>Stay on top of each creator meeting and glide through approvals with a single glance.</p>
      </header>

      <section>
        <h3>Upcoming</h3>
        {appointments.length > 0 ? (
          appointments.map((appointment, index) => (
            <article key={`${appointment.name}-${index}`} className="session-card">
              <div className="session-meta">
                <strong>{appointment.name}</strong>
                <span>
                  {appointment.date} · {appointment.time}
                </span>
              </div>
              <span className={`status-pill ${appointment.status.toLowerCase()}`}>
                {appointment.status}
              </span>
              {appointment.status === 'CONFIRMED' && (
                <Link to={appointment.zoomLink} className="join-button">
                  Open creator studio
                </Link>
              )}
            </article>
          ))
        ) : (
          <div className="empty-state">No upcoming sessions yet. Book a creator to fill the calendar.</div>
        )}
      </section>

      <section>
        <h3>Wrapped sessions</h3>
        {pastCampaignSessions.map((session) => (
          <article key={session.name} className="session-card past">
            <div className="session-meta">
              <strong>{session.name}</strong>
              <span>
                {session.date} · {session.time}
              </span>
            </div>
            <p>{session.recap}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

export default AppointmentsPage;
