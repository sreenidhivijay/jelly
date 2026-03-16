import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../components/UserContext";
import authService from "../services/authService";
import "./LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useUser();
  const redirectTo = location.state?.redirectTo;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const data = await authService.login(email, password);

      setUser({
        isLoggedIn: true,
        role: data.user.role,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        email: data.user.email,
      });

      const defaultRoute = data.user.role === "creator" ? "/creator-dashboard" : "/your-creators";
      navigate(redirectTo || defaultRoute);
    } catch (error) {
      setErrorMessage(error.message || "Invalid email or password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <header className="login-header">
          <span className="eyebrow">Welcome back</span>
          <h2>Sign in to Jelly</h2>
          <p>Preview the baddie-ready experience with our sample creator and brand accounts.</p>
        </header>

        <form onSubmit={handleSubmit} className="login-form">
          {errorMessage && <div className="login-error">{errorMessage}</div>}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              placeholder="creator@demo.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              placeholder="password123!"
              required
            />
          </div>

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="login-hint">
          <p>
            <strong>Demo creator:</strong> creator@demo.com
          </p>
          <p>
            <strong>Demo brand:</strong> brand@demo.com
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
