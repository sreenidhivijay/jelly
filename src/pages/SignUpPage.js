import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../components/UserContext";
import authService from "../services/authService";
import "./SignUpPage.css";

// New component for the initial role selection
const RoleSelection = ({ onSelectRole }) => (
  <div className="signup-page">
    <div className="role-selection-container">
      <header className="signup-header">
        <span className="eyebrow">Welcome to Jelly</span>
        <h2>Create your account</h2>
        <p>First, let us know if you're a creator or a business.</p>
      </header>
      <div className="role-options">
        <div className="role-card" onClick={() => onSelectRole('creator')}>
          <h3>Creator</h3>
          <p>Build partnerships and grow your portfolio.</p>
          <button type="button" className="role-button">I'm a Creator</button>
        </div>
        <div className="role-card" onClick={() => onSelectRole('business')}>
          <h3>Business</h3>
          <p>Find creators to generate content for your business.</p>
          <button type="button" className="role-button">I'm a Business</button>
        </div>
      </div>
    </div>
  </div>
);


function SignUpPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [role, setRole] = useState(""); // This now controls the view
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useUser();
  const navigate = useNavigate();

  const passwordRequirements = [
    { label: "At least 8 characters long", isValid: password.length >= 8 },
    { label: "At least one uppercase letter", isValid: /[A-Z]/.test(password) },
    { label: "At least one number", isValid: /\d/.test(password) },
    { label: "At least one special character (!@#$%^&*(),.?\":{}|<>)", isValid: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
    { label: "Passwords match", isValid: password === confirmPassword && password.length > 0 },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRequirements.some((req) => !req.isValid)) {
      setErrorMessage("Please meet all password requirements.");
      return;
    }

    setErrorMessage("");
    setIsLoading(true);

    try {
      const data = await authService.signup({
        firstName,
        lastName,
        email,
        password,
        role: role === "business" ? "brand" : role,
      });

      setUser({
        isLoggedIn: true,
        role: data.user.role,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        email: data.user.email,
      });

      if (role === "brand" || role === "business") {
        navigate("/signup/business/how-it-works");
      } else if (role === "creator") {
        navigate("/signup/creator/niche");
      }
    } catch (error) {
      setErrorMessage(error.message || "Sign up failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // If no role is selected, show the role selection screen
  if (!role) {
    return <RoleSelection onSelectRole={setRole} />;
  }

  // Once a role is selected, show the details form
  return (
    <div className="signup-page">
      <div className="signup-card">
        <header className="signup-header">
          <span className="eyebrow">Create Your Account</span>
          <h2>Sign up as a {role.charAt(0).toUpperCase() + role.slice(1)}</h2>
          <p>
            <a href="#" onClick={(e) => { e.preventDefault(); setRole(''); }}>&larr; Back to role selection</a>
          </p>
        </header>
        <form onSubmit={handleSubmit} className="form">
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <div className="form-group">
            <label>First name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input"
              placeholder="Luna"
              required
            />
          </div>
          <div className="form-group">
            <label>Last name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input"
              placeholder="Bloom"
              required
            />
          </div>
          <div className="form-group">
            <label>Work email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              placeholder="luna@atelierstudio.com"
              required
            />
          </div>
          <div className="form-group password-field">
            <label>Password</label>
            <input
              type={showPasswords ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              placeholder="Min. 8 characters"
              required
            />
            <label style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "8px", fontSize: "14px" }}>
              <input
                type="checkbox"
                checked={showPasswords}
                onChange={(e) => setShowPasswords(e.target.checked)}
              />
              Show password
            </label>
            <ul className="password-requirements">
              {passwordRequirements.map((req, index) => (
                <li key={index} className={req.isValid ? "valid" : "invalid"}>
                  {req.isValid ? "✶" : "○"} {req.label}
                </li>
              ))}
            </ul>
          </div>
          <div className="form-group">
            <label>Confirm password</label>
            <input
              type={showPasswords ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input"
              placeholder="Re-enter password"
              required
            />
          </div>
          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
