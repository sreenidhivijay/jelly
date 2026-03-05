import React from 'react';
import UploadSlot from './UploadSlot';

function CreatorUploads({
  deliverables,
  taskId,
  taskSku,
  uploadedContent,
  onUpload,
  onSave,
  onSubmit,
  saveState,
}) {
  return (
    <div className="creator-uploads-section">
      <h3>Your Content</h3>
      {deliverables && deliverables.length > 0 ? (
        <>
          <div className="upload-slots-container">
            {deliverables.map((deliverable) => (
              <UploadSlot
                key={deliverable.id}
                deliverable={deliverable}
                taskId={taskId}
                taskSku={taskSku}
                uploadedContent={uploadedContent?.[deliverable.id]}
                onUpload={onUpload}
              />
            ))}
          </div>

          <div className="uploads-actions-row">
            <button type="button" className="uploads-save-btn" onClick={() => onSave && onSave(taskId)}>
              Save
            </button>
            <button type="button" className="uploads-submit-btn" onClick={() => onSubmit && onSubmit(taskId)}>
              Submit
            </button>
          </div>
          {saveState?.message && (
            <p className={saveState.type === 'error' ? 'uploads-feedback error' : 'uploads-feedback success'}>
              {saveState.message}
            </p>
          )}
        </>
      ) : (
        <p>Once deliverables are added, you will be able to upload your content here.</p>
      )}
    </div>
  );
}

export default CreatorUploads;
