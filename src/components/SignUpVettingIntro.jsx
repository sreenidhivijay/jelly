import React from 'react';

function SignUpVettingIntro({ onContinue }) {
  return (
    <div className="sign-up-vetting-intro">
      <h2>Vetting Process Overview</h2>
      <p>
        Before you upload your content, here is what you need to know about our sign-up and vetting process:
      </p>
      <ul>
        <li>
          <strong>Demo Interview Video:</strong> You will need to make a demo video, similar to an interview, which we will use to vet your communication style and presence.
        </li>
        <li>
          <strong>Portfolio Uploads:</strong> You will also need to upload items from your portfolio so we can get a whole picture of you as a creator.
        </li>
      </ul>
      <div style={{ marginTop: '20px' }}>
        <button onClick={onContinue}>Continue</button>
      </div>
    </div>
  );
}

export default SignUpVettingIntro;