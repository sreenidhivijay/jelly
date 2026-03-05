import React from 'react';
import BusinessReferenceImages from './BusinessReferenceImages';
import CreatorUploads from './CreatorUploads';

function TaskDetail({ task }) {
  if (!task) {
    return <div>Please select a task to view details.</div>;
  }

  const canUpload = task.status === 'accepted' || task.status === 'pending';

  return (
    <div className="task-detail-card">
      <h2>{task.title}</h2>
      <p><strong>Brand:</strong> {task.brand}</p>

      <h3>Job Description:</h3>
      <p>{task.description}</p>

      {/* --- NEW SECTIONS --- */}
      {canUpload && (
        <>
          <BusinessReferenceImages images={task.referenceImages} brandName={task.brand} />
          <CreatorUploads deliverables={task.deliverables} taskId={task.id} />
        </>
      )}
    </div>
  );
}

export default TaskDetail;