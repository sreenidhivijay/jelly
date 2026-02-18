import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

const LOGO_URL =
  'https://jnkversestore.com/cdn/shop/files/jnkverse-white.png?v=1743662118&width=200';

function Header() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false); // Manage mobile menu state

  const handleLogout = () => {
    setUser({ isLoggedIn: false, role: null });
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
              <img src={LOGO_URL} alt="Jnkverse logo" className="nav-logo" />
            </Link>
          </li>
          {user.isLoggedIn && user.role === "creator" && (
            <>
              <li className="nav-item"><Link to="/your-mentees" className="nav-link" onClick={closeMobileMenu}>Discover</Link></li>
              <li className="nav-item"><Link to="/mentee-requests" className="nav-link" onClick={closeMobileMenu}>Collab Requests</Link></li>
              <li className="nav-item"><Link to="/mentor-appointments" className="nav-link" onClick={closeMobileMenu}>Content Calendar</Link></li>
              <li className="nav-item"><Link to="/marketplace" className="nav-link" onClick={closeMobileMenu}>Content Calendar</Link></li>

            </>
          )}
          {user.isLoggedIn && user.role === "brand" && (
            <>
              <li className="nav-item"><Link to="/your-mentors" className="nav-link" onClick={closeMobileMenu}>Campaign & Creator Management</Link></li>
              <li className="nav-item"><Link to="/appointments" className="nav-link" onClick={closeMobileMenu}>Campaign Planner</Link></li>
              <li className="nav-item"><Link to="/feedback" className="nav-link" onClick={closeMobileMenu}>Collab Notes</Link></li>
              <li className="nav-item">
                <Link to="/search" className="nav-link" onClick={closeMobileMenu}>
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
                  navigate(user.role === "creator" ? "/mentor-profile" : "/mentee-profile");
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
              <>
                <li className="nav-item mobile"><Link to="/your-mentees" className="nav-link" onClick={closeMobileMenu}>Brand Matches</Link></li>
                <li className="nav-item mobile"><Link to="/mentee-requests" className="nav-link" onClick={closeMobileMenu}>Collab Requests</Link></li>
                <li className="nav-item mobile"><Link to="/mentor-appointments" className="nav-link" onClick={closeMobileMenu}>Content Calendar</Link></li>
              </>
            )}
            {user.role === "brand" && (
              <>
                <li className="nav-item mobile"><Link to="/your-mentors" className="nav-link" onClick={closeMobileMenu}>Campaign & Creator Management</Link></li>
                <li className="nav-item mobile"><Link to="/appointments" className="nav-link" onClick={closeMobileMenu}>Campaign Planner</Link></li>
                <li className="nav-item mobile"><Link to="/feedback" className="nav-link" onClick={closeMobileMenu}>Collab Notes</Link></li>
                <li className="nav-item mobile">
                  <Link to="/search" className="nav-link" onClick={closeMobileMenu}>
                    <i className="fas fa-search"></i> Discover Creators
                  </Link>
                </li>
              </>
            )}
            <li className="nav-item mobile">
              <button onClick={handleLogoutAndCloseMenu} className="nav-link logout-button">Log Out</button>
            </li>
            <li className="nav-item mobile">
              <FontAwesomeIcon
                icon={faUser}
                className="profile-icon"
                onClick={() => navigate(user.role === "creator" ? "/mentor-profile" : "/mentee-profile")}
              />
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Header;
