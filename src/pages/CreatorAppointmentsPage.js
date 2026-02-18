import React from 'react';
import { Link } from 'react-router-dom';
import './CreatorAppointmentsPage.css';

const upcomingSessions = [
  {
    brand: 'Velvet Petal Boutique',
    focus: 'Holiday High Tea concept review',
    date: 'Nov 18',
    time: '2:00 PM',
    status: 'CONFIRMED',
    link: '/virtual-session',
  },
  {
    brand: 'Orchid Atelier Events',
    focus: 'Rehearsal dinner storyboard',
    date: 'Dec 02',
    time: '4:00 PM',
    status: 'PENDING',
  },
];

const wrappedSessions = [
  { brand: 'Maison Lumiere', recap: 'Launch day wrap-up', score: '⭐️⭐️⭐️⭐️' },
  { brand: 'Petite Bloom Florals', recap: 'Evergreen content ideation', score: '⭐️⭐️⭐️⭐️⭐️' },
];

function CreatorAppointmentsPage() {
  return (
    <div className="creator-calendar-page">
      <header className="calendar-header">
        <span className="eyebrow">Creator calendar</span>
        <h2>Your upcoming brand syncs</h2>
        <p>Confirm deliverables, share inspo, and stay on schedule with every dreamy partner.</p>
      </header>

      <section>
        <h3>Upcoming</h3>
        {upcomingSessions.length ? (
          upcomingSessions.map((session) => (
            <article key={session.brand} className="calendar-card">
              <div className="card-top">
                <div>
                  <strong>{session.brand}</strong>
                  <p>{session.focus}</p>
                </div>
                <span className={`status ${session.status.toLowerCase()}`}>{session.status}</span>
              </div>
              <div className="card-bottom">
                <span>
                  {session.date} · {session.time}
                </span>
                {session.link && session.status === 'CONFIRMED' && (
                  <Link to={session.link} className="join-link">
                    Enter creator studio
                  </Link>
                )}
              </div>
            </article>
          ))
        ) : (
          <div className="empty-state">No sessions on the books yet.</div>
        )}
      </section>

      <section>
        <h3>Recently wrapped</h3>
        <div className="wrapped-grid">
          {wrappedSessions.map((session) => (
            <div key={session.brand} className="wrapped-card">
              <strong>{session.brand}</strong>
              <span>{session.recap}</span>
              <small>{session.score}</small>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default CreatorAppointmentsPage;