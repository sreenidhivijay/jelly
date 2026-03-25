import React, { useEffect, useState } from 'react';
import './CompletedTasksPage.css';
import { loadCompletedTasks } from '../utils/creatorTasksStorage';

function CompletedTasksPage() {
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    setCompletedTasks(loadCompletedTasks());
  }, []);

  return (
    <div className="completed-tasks-page">
      <div className="completed-tasks-header">
        <h1>Completed Tasks</h1>
        <p>All old and completed creator deliverables in one place.</p>
      </div>

      {completedTasks.length === 0 ? (
        <div className="completed-empty-state">
          <p>No completed tasks yet.</p>
        </div>
      ) : (
        <div className="completed-tasks-grid">
          {completedTasks.map((task) => (
            <article key={task.id} className="completed-task-card">
              <div className="completed-task-top">
                <h3>{task.brand}</h3>
                <span className="completed-pill">{task.sku}</span>
              </div>
              <p className="completed-description">{task.description}</p>
              <p className="completed-meta">
                Completed: {task.completedAt ? new Date(task.completedAt).toLocaleString() : 'N/A'}
              </p>

              <div className="completed-deliverables">
                {(task.deliverables || []).map((deliverable) => {
                  const uploaded = task.uploadedContent?.[deliverable.id];
                  return (
                    <div key={deliverable.id} className="completed-deliverable">
                      <h4>{deliverable.title}</h4>
                      <p>{deliverable.description}</p>
                      {uploaded?.url ? (
                        uploaded.fileType?.startsWith('video/') ? (
                          <video src={uploaded.url} controls />
                        ) : (
                          <img src={uploaded.url} alt={`${deliverable.title} submission`} />
                        )
                      ) : (
                        <span className="missing-upload">No upload found</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default CompletedTasksPage;
