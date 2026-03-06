import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BrandRegistration.css';

function CreatorApprovalPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [secondsRemaining, setSecondsRemaining] = useState(60);

  const portfolioCount = useMemo(() => {
    const value = location.state?.portfolioCount;
    return typeof value === 'number' ? value : 0;
  }, [location.state]);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setSecondsRemaining((currentSeconds) => {
        if (currentSeconds <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return currentSeconds - 1;
      });
    }, 1000);

    const reviewTimer = setTimeout(() => {
      navigate('/signup/creator/approved', {
        replace: true,
        state: location.state || {},
      });
    }, 60000);

    return () => {
      clearInterval(countdownInterval);
      clearTimeout(reviewTimer);
    };
  }, [navigate, location.state]);

  return (
    <div className="brand-onboarding-container">
      <header className="onboarding-header">
        <span className="eyebrow">Application Review</span>
        <h2>Please wait while your application is being reviewed</h2>
        <p>
          {portfolioCount > 0
            ? `We received ${portfolioCount} portfolio upload${portfolioCount === 1 ? '' : 's'}.`
            : 'We received your portfolio.'}
        </p>
        <p>Estimated decision time: {secondsRemaining}s</p>
      </header>
    </div>
  );
}

export default CreatorApprovalPage;