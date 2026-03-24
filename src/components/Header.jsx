import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../providers/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";

function Header() {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(e.target)
      ) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false); // Close the mobile menu when an option is selected
  };

  const handleLogoutAndCloseMenu = () => {
    handleLogout(); // Log out the user
    closeMobileMenu(); // Close the mobile menu
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" className="brand-mark" onClick={closeMobileMenu}>
              <span className="brand-text">JELLY</span>
            </Link>
          </li>
          {user.isLoggedIn && user.role === "creator" && (
            <>
              <li className="nav-item">
                <Link
                  to="/your-collabs"
                  className="nav-link"
                  onClick={closeMobileMenu}
                >
                  Discover
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/collab-requests"
                  className="nav-link"
                  onClick={closeMobileMenu}
                >
                  Collab Requests
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/collab-appointments"
                  className="nav-link"
                  onClick={closeMobileMenu}
                >
                  Content Calendar
                </Link>
              </li>
            </>
          )}
          {user.isLoggedIn && user.role === "brand" && (
            <>
              <li className="nav-item">
                <Link
                  to="/your-creators"
                  className="nav-link"
                  onClick={closeMobileMenu}
                >
                  Campaign & Creator
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/appointments"
                  className="nav-link"
                  onClick={closeMobileMenu}
                >
                  Campaign Planner
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/feedback"
                  className="nav-link"
                  onClick={closeMobileMenu}
                >
                  Collab Notes
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/search"
                  className="nav-link"
                  onClick={closeMobileMenu}
                >
                  <i className="fas fa-search"></i> Discover Creators
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      <ul className="nav-right">
        {!user.isLoggedIn ? (
          <>
            <li className="nav-item">
              <Link
                to="/signup"
                className="nav-link signup"
                onClick={closeMobileMenu}
              >
                Join Us
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/login"
                className="nav-link login"
                onClick={closeMobileMenu}
              >
                Sign In
              </Link>
            </li>
          </>
        ) : (
          <li className="nav-item profile-menu-wrapper" ref={profileMenuRef}>
            <button
              type="button"
              className="profile-icon-btn"
              data-tooltip="Open user navigation menu"
              onClick={() => setProfileMenuOpen((prev) => !prev)}
            >
              <FontAwesomeIcon icon={faUser} className="profile-icon" />
            </button>
            {isProfileMenuOpen && (
              <ul className="profile-dropdown">
                {user.role === "admin" && (
                  <>
                    <li>
                      <Link
                        to="/admin"
                        className="dropdown-item"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                    </li>
                  </>
                )}
                {user.role === "creator" && (
                  <>
                    <li>
                      <Link
                        to="/creator-profile"
                        className="dropdown-item"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/creator-dashboard"
                        className="dropdown-item"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/creator-appointments"
                        className="dropdown-item"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        Appointments
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/creator-portfolio"
                        className="dropdown-item"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        Portfolio
                      </Link>
                    </li>
                  </>
                )}
                {user.role === "brand" && (
                  <>
                    <li>
                      <Link
                        to="/brand-profile"
                        className="dropdown-item"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/your-campaigns"
                        className="dropdown-item"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        Your Campaigns
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/your-creators"
                        className="dropdown-item"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        Your Creators
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/subscription"
                        className="dropdown-item"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        Subscription
                      </Link>
                    </li>
                  </>
                )}
                <li className="dropdown-divider" />
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      setProfileMenuOpen(false);
                      handleLogout();
                    }}
                  >
                    Log Out
                  </button>
                </li>
              </ul>
            )}
          </li>
        )}
      </ul>

      <Link to="/" className="brand-mark mobile" onClick={closeMobileMenu}>
        <span className="brand-text">JELLY</span>
      </Link>
      {/* Mobile Hamburger Menu */}
      <div className="hamburger" onClick={toggleMobileMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* Mobile Menu */}
      <ul className={`nav-list mobile ${isMobileMenuOpen ? "open" : ""}`}>
        {!user.isLoggedIn ? (
          <>
            <li className="nav-item mobile">
              <Link
                to="/signup"
                className="nav-link signup"
                onClick={closeMobileMenu}
              >
                Join Us
              </Link>
            </li>
            <li className="nav-item mobile">
              <Link
                to="/login"
                className="nav-link login"
                onClick={closeMobileMenu}
              >
                Sign In
              </Link>
            </li>
          </>
        ) : (
          <>
            {user.role === "creator" && (
              <>
                <li className="nav-item mobile">
                  <Link
                    to="/your-mentees"
                    className="nav-link"
                    onClick={closeMobileMenu}
                  >
                    Brand Matches
                  </Link>
                </li>
                <li className="nav-item mobile">
                  <Link
                    to="/mentee-requests"
                    className="nav-link"
                    onClick={closeMobileMenu}
                  >
                    Collab Requests
                  </Link>
                </li>
                <li className="nav-item mobile">
                  <Link
                    to="/mentor-appointments"
                    className="nav-link"
                    onClick={closeMobileMenu}
                  >
                    Content Calendar
                  </Link>
                </li>
              </>
            )}
            {user.role === "brand" && (
              <>
                <li className="nav-item mobile">
                  <Link
                    to="/your-mentors"
                    className="nav-link"
                    onClick={closeMobileMenu}
                  >
                    Campaign & Creator Management
                  </Link>
                </li>
                <li className="nav-item mobile">
                  <Link
                    to="/appointments"
                    className="nav-link"
                    onClick={closeMobileMenu}
                  >
                    Campaign Planner
                  </Link>
                </li>
                <li className="nav-item mobile">
                  <Link
                    to="/feedback"
                    className="nav-link"
                    onClick={closeMobileMenu}
                  >
                    Collab Notes
                  </Link>
                </li>
                <li className="nav-item mobile">
                  <Link
                    to="/search"
                    className="nav-link"
                    onClick={closeMobileMenu}
                  >
                    <i className="fas fa-search"></i> Discover Creators
                  </Link>
                </li>
              </>
            )}
            <li className="nav-item mobile">
              <button
                onClick={handleLogoutAndCloseMenu}
                className="nav-link logout-button"
              >
                Log Out
              </button>
            </li>
            <li className="nav-item mobile">
              <FontAwesomeIcon
                icon={faUser}
                className="profile-icon"
                onClick={() =>
                  navigate(
                    user.role === "creator"
                      ? "/creator-profile"
                      : "/brand-profile",
                  )
                }
              />
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Header;
