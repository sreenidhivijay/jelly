import React from 'react';

function ApplicationPreamble({ onNext }) {
  return (
    <div className="application-preamble">
      <h2>Application Process</h2>
      <p>
        Welcome! To complete your creator application, we need to gather some information and see examples of your work.
        Here is what you will need to complete the process:
      </p>
      
      <ul className="requirements-list">
        <li><strong>Personal Details:</strong> Your nationality, address, and social media links.</li>
        <li><strong>Content Examples:</strong> You will be asked to upload specific content to demonstrate your production quality:
          <ul>
            <li>A short video (15-30s) showcasing your <strong>lighting</strong> setup.</li>
            <li>A short video (15-30s) showcasing your <strong>dialogue and audio</strong> clarity.</li>
            <li>A high-quality image showcasing your <strong>photography style</strong>.</li>
          </ul>
        </li>
      </ul>

      <p>Please ensure you have these files ready before proceeding.</p>
      
      <button className="start-btn" onClick={onNext}>I'm Ready</button>
    </div>
  );
}

export default ApplicationPreamble;