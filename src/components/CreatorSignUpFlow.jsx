import React, { useState } from 'react';
import ApplicationPreamble from './ApplicationPreamble';
import DescribeYourNiche from './DescribeYourNiche';
import SignUpContentExamples from './SignUpContentExamples';

function CreatorSignUpFlow() {
  const [step, setStep] = useState(1);
  const [userId] = useState('new-creator-123'); // Example user ID

  const handleNext = () => {
    setStep(prevStep => prevStep + 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <ApplicationPreamble onNext={handleNext} />;
      case 2:
        return <DescribeYourNiche userId={userId} onNext={handleNext} />;
      case 3:
        return <SignUpContentExamples userId={userId} onComplete={handleNext} />;
      case 4:
        return (
          <div className="signup-complete">
            <h2>Application Submitted!</h2>
            <p>Thank you for applying. We will review your application and get back to you soon.</p>
          </div>
        );
      default:
        return <ApplicationPreamble onNext={handleNext} />;
    }
  };

  return (
    <div className="creator-signup-flow">
      {renderStep()}
    </div>
  );
}

export default CreatorSignUpFlow;