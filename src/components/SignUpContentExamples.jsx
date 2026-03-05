import React, { useState } from 'react';
import CreatorUploads from './CreatorUploads';

// These deliverables are specific to the sign-up process
const exampleDeliverables = [
  {
    id: 'example-video-lighting',
    title: 'Lighting & Video Quality Example',
    description: 'Upload a short video (15-30 seconds) that showcases your typical lighting and video quality for an indoor scene.',
    requiredType: 'video',
  },
  {
    id: 'example-video-dialogue',
    title: 'Dialogue & Audio Example',
    description: 'Upload a short video (15-30 seconds) where you are speaking to the camera. We want to check your audio quality and clarity.',
    requiredType: 'video',
  },
  {
    id: 'example-image-style',
    title: 'Photography Style Example',
    description: 'Upload one high-quality image that best represents your photography style.',
    requiredType: 'image',
  },
];

function SignUpContentExamples({ userId, onComplete }) {
  const [uploadedContent, setUploadedContent] = useState({});
  const [saveState, setSaveState] = useState(null);

  const handleUpload = (taskId, deliverableId, content) => {
    setUploadedContent((prev) => ({
      ...prev,
      [deliverableId]: content,
    }));
    setSaveState(null); // Clear save state on new upload
  };

  const handleSubmit = async (taskId) => {
    // Here, you could add validation to ensure all required examples are uploaded.
    const uploadedCount = Object.keys(uploadedContent).length;
    if (uploadedCount < exampleDeliverables.length) {
      setSaveState({ type: 'error', message: 'Please upload all content examples before submitting.' });
      return;
    }

    console.log('Submitting application for user:', taskId, uploadedContent);
    setSaveState({ type: 'info', message: 'Submitting...' });

    try {
      // In a real app, you would send the content to your backend.
      // await api.submitContentExamples(taskId, uploadedContent);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call

      setSaveState({ type: 'success', message: 'Application submitted successfully!' });

      if (onComplete) {
        onComplete(); // Callback to move to the next step in sign-up
      }
    } catch (error) {
      setSaveState({ type: 'error', message: 'Could not submit application. Please try again.' });
    }
  };

  return (
    <div className="sign-up-content-examples">
      <h2>Show Us What You've Got</h2>
      <p>
        To ensure you're a great fit for the brands on our platform, we need to see a few examples of your work.
        Please upload content that best represents your skills in lighting, audio, and overall production quality.
      </p>
      <CreatorUploads
        deliverables={exampleDeliverables}
        taskId={userId} // Using userId as the taskId for this context
        uploadedContent={uploadedContent}
        onUpload={handleUpload}
        onSubmit={handleSubmit} // We only need submit for the sign-up flow
        saveState={saveState}
      />
    </div>
  );
}

export default SignUpContentExamples;