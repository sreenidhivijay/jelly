import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./BrandRegistration.css";
import api from "../services/api";

function EmailVerificationPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [status, setStatus] = useState("verifying"); // verifying | success | error
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setErrorMessage("No verification token found.");
      return;
    }

    api
      .post("/auth/verify-email", { token })
      .then(() => {
        setStatus("success");
      })
      .catch((err) => {
        setStatus("error");
        setErrorMessage(err.message || "Verification failed. The link may have expired.");
      });
  }, [token]);

  return (
    <div className="brand-onboarding-container">
      <header className="onboarding-header">
        {status === "verifying" && (
          <>
            <span className="eyebrow">Almost there</span>
            <h2>Verifying your email…</h2>
            <p>Hang tight while we confirm your address.</p>
          </>
        )}
        {status === "success" && (
          <>
            <span className="eyebrow">You're in</span>
            <h2>Email verified</h2>
            <p>Your email has been confirmed. You're all set to get started.</p>
          </>
        )}
        {status === "error" && (
          <>
            <span className="eyebrow">Something went wrong</span>
            <h2>Verification failed</h2>
            <p>{errorMessage}</p>
          </>
        )}
      </header>

      {status === "success" && (
        <button className="continue-button" onClick={() => navigate("/login")}>
          Continue to login
        </button>
      )}
      {status === "error" && (
        <button className="continue-button" onClick={() => navigate("/")}>
          Back to home
        </button>
      )}
    </div>
  );
}

export default EmailVerificationPage;
