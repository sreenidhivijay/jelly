import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

function Header() {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false); // Manage mobile menu state

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false); // Close the mobile menu when an option is selected
  };

  const handleLogoutAndCloseMenu = () => {
    handleLogout();       // Log out the user
    closeMobileMenu();    // Close the mobile menu
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
            <li className="nav-item">
              <Link to="/creator-dashboard" className="nav-link" onClick={closeMobileMenu}>Dashboard</Link>
            </li>
          )}
        </ul>
      </div>

      <ul className="nav-right">
        {!user.isLoggedIn ? (
          <>
            <li className="nav-item"><Link to="/signup" className="nav-link signup" onClick={closeMobileMenu}>Join Us</Link></li>
            <li className="nav-item"><Link to="/login" className="nav-link login" onClick={closeMobileMenu}>Sign In</Link></li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <button onClick={handleLogoutAndCloseMenu} className="nav-link logout-button">Log Out</button>
            </li>
            <li className="nav-item">
              <button
                type="button"
                className="profile-icon-btn"
                onClick={() => {
                  closeMobileMenu();
                  navigate(user.role === "creator" ? "/creator-profile" : "/brand-profile");
                }}
              >
                <FontAwesomeIcon icon={faUser} className="profile-icon" />
              </button>
            </li>
          </>
        )}
      </ul>

      {/* Mobile Hamburger Menu */}
      <div className="hamburger" onClick={toggleMobileMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* Mobile Menu */}
      <ul className={`nav-list mobile ${isMobileMenuOpen ? 'open' : ''}`}>
        {!user.isLoggedIn ? (
          <>
            <li className="nav-item mobile"><Link to="/signup" className="nav-link signup" onClick={closeMobileMenu}>Join Us</Link></li>
            <li className="nav-item mobile"><Link to="/login" className="nav-link login" onClick={closeMobileMenu}>Sign In</Link></li>
          </>
        ) : (
          <>
            {user.role === "creator" && (
              <li className="nav-item mobile">
                <Link to="/creator-dashboard" className="nav-link" onClick={closeMobileMenu}>Dashboard</Link>
              </li>
            )}
            <li className="nav-item mobile">
              <button onClick={handleLogoutAndCloseMenu} className="nav-link logout-button">Log Out</button>
            </li>
            <li className="nav-item mobile">
              <FontAwesomeIcon
                icon={faUser}
                className="profile-icon"
                onClick={() => navigate(user.role === "creator" ? "/creator-profile" : "/brand-profile")}
              />
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Header;
