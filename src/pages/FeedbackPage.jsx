import React from 'react';
import './FeedbackPage.css';

const collabNotes = [
  {
    date: 'Nov 14, 2024',
    creator: 'Aurora Blake',
    highlight: 'Loved the pearl detail shots. Let’s add a quick unboxing clip for day two.',
  },
  {
    date: 'Nov 05, 2024',
    creator: 'Maison Hart',
    highlight: 'Travel vlog draft is perfect. Swap the outro text overlay for our holiday CTA.',
  },
  {
    date: 'Oct 27, 2024',
    creator: 'Luna Sloane',
    highlight: 'Story sequence performed above benchmark. Adding to evergreen library.',
  },
];

function FeedbackPage() {
  return (
    <div className="collab-notes-page">
      <header className="notes-header">
        <span className="eyebrow">Collab notes</span>
        <h2>Keep every partner in sync</h2>
        <p>Log feedback and follow-up ideas while everything is still sparkling in your mind.</p>
      </header>

      <div className="notes-grid">
        {collabNotes.map((note) => (
          <article key={note.date + note.creator} className="note-card">
            <span className="note-date">{note.date}</span>
            <h3>{note.creator}</h3>
            <p>{note.highlight}</p>
            <button>Schedule follow-up</button>
          </article>
        ))}
      </div>
    </div>
  );
}

export default FeedbackPage;
