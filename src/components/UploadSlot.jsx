import React, { useEffect, useState } from 'react';

function UploadSlot({ deliverable, taskId, taskSku, uploadedContent, onUpload }) {
  const [uploadedFile, setUploadedFile] = useState(uploadedContent?.url || deliverable.contentUrl || null);
  const [uploadedFileType, setUploadedFileType] = useState(uploadedContent?.fileType || '');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  const inferRequiredType = () => {
    if (deliverable.requiredType === 'video' || deliverable.requiredType === 'image') {
      return deliverable.requiredType;
    }

    const label = `${deliverable.title || ''} ${deliverable.description || ''} ${taskSku || ''}`.toLowerCase();
    const videoHints = ['reel', 'video', 'story', 'tiktok', 'short'];
    const imageHints = ['post', 'photo', 'picture', 'still', 'image', 'carousel', 'thumbnail'];

    if (videoHints.some((hint) => label.includes(hint))) {
      return 'video';
    }
    if (imageHints.some((hint) => label.includes(hint))) {
      return 'image';
    }
    return 'any';
  };

  const requiredType = inferRequiredType();
  const acceptedFileTypes =
    requiredType === 'video' ? 'video/*' : requiredType === 'image' ? 'image/*' : 'image/*,video/*';

  useEffect(() => {
    if (uploadedContent?.url) {
      setUploadedFile(uploadedContent.url);
      setUploadedFileType(uploadedContent.fileType || '');
    }
  }, [uploadedContent]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (requiredType === 'video' && !file.type.startsWith('video/')) {
      setError('This deliverable requires a video file.');
      return;
    }

    if (requiredType === 'image' && !file.type.startsWith('image/')) {
      setError('This deliverable requires an image file.');
      return;
    }

    // Basic file type/size validation can happen here
    if (file.size > 10 * 1024 * 1024) { // for example, 10MB limit
      setError('File is too large. Please upload a file smaller than 10MB.');
      return;
    }
    setError('');
    setIsUploading(true);

    try {
      // --- Upload Logic ---
      // Replace this with your actual file upload service call
      // const uploadedUrl = await uploadFileToServer(file, taskId, deliverable.id);

      // For demonstration, we'll just simulate the upload process
      await new Promise(resolve => setTimeout(resolve, 2000));
      const uploadedUrl = URL.createObjectURL(file);
      const content = {
        url: uploadedUrl,
        fileType: file.type,
        fileName: file.name,
      };

      setUploadedFile(content.url);
      setUploadedFileType(content.fileType);
      if (onUpload) {
        onUpload(taskId, deliverable.id, content);
      }

      // You would likely call a function here to notify the backend
      // updateDeliverableOnServer(taskId, deliverable.id, { contentUrl: uploadedUrl });

    } catch (uploadError) {
      setError('Something went wrong during upload. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="upload-slot">
      <h4>{deliverable.title}</h4>
      <p className="deliverable-description">{deliverable.description}</p>
      {requiredType !== 'any' && (
        <p className="deliverable-format-note">
          Required format: {requiredType === 'video' ? 'Video' : 'Image'}
        </p>
      )}

      <div className="upload-area">
        {isUploading ? (
          <div className="spinner">Uploading...</div>
        ) : uploadedFile ? (
          <div className="file-preview">
            {uploadedFileType.startsWith('video/') ? (
              <video src={uploadedFile} controls />
            ) : (
              <img src={uploadedFile} alt={`Uploaded for ${deliverable.title}`} />
            )}
            <label htmlFor={`file-upload-${deliverable.id}`} className="reupload-button">
              Replace File
            </label>
            <input id={`file-upload-${deliverable.id}`} type="file" accept={acceptedFileTypes} onChange={handleFileChange} hidden />
          </div>
        ) : (
          <div className="file-dropzone">
            <label htmlFor={`file-upload-${deliverable.id}`} className="upload-button">
              Upload Content
            </label>
            <input id={`file-upload-${deliverable.id}`} type="file" accept={acceptedFileTypes} onChange={handleFileChange} hidden />
          </div>
        )}
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default UploadSlot;
