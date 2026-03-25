import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function CreatorApprovalPage() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/signup/creator/approved', {
      replace: true,
      state: location.state || {},
    });
  }, [navigate, location.state]);

  return null;
}

export default CreatorApprovalPage;