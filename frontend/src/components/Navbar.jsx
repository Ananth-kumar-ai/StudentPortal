import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ auth, setAuth }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuth({ isAuthenticated: false, user: null });
    navigate('/');
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark sticky-top shadow-lg" style={styles.navbar}>
        <div className="container-xl">
          {/* Brand */}
          <Link className="navbar-brand fw-bold d-flex align-items-center" to="/" style={styles.brand}>
            <span style={styles.emoji}>🎓</span> Student Portal
          </Link>

          {/* Hamburger Menu Toggle */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-controls="navbarContent"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Content */}
          <div className={`collapse navbar-collapse ${mobileMenuOpen ? 'show' : ''}`} id="navbarContent">
            {/* Links - Desktop and Mobile */}
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/att"
                  onClick={() => setMobileMenuOpen(false)}
                  style={styles.navLink}
                >
                  Attendance
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/int"
                  onClick={() => setMobileMenuOpen(false)}
                  style={styles.navLink}
                >
                  Internals
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/Ann"
                  onClick={() => setMobileMenuOpen(false)}
                  style={styles.navLink}
                >
                  Announcements
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/Time"
                  onClick={() => setMobileMenuOpen(false)}
                  style={styles.navLink}
                >
                  Timetable
                </Link>
              </li>
            </ul>

            {/* Auth Section */}
            <div className="d-flex align-items-center" ref={dropdownRef}>
              {auth.isAuthenticated ? (
                <div className="dropdown">
                  <button
                    className="btn btn-primary dropdown-toggle rounded-pill px-4"
                    type="button"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    aria-expanded={dropdownOpen}
                    aria-haspopup="true"
                  >
                    {auth.user?.Regno}
                  </button>
                  <ul
                    className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}
                    style={styles.dropdown}
                  >
                    <li>
                      <span className="dropdown-item-text" style={styles.dropdownText}>
                        <strong>Email:</strong> {auth.user?.email}
                      </span>
                    </li>
                    <li>
                      <button
                        className="dropdown-item btn btn-danger w-100 text-start"
                        onClick={handleLogout}
                      >
                        Log Out
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link
                  className="btn btn-primary rounded-pill px-4"
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log In
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Inline Styles */}
      <style>
        {`
          .navbar {
            background: linear-gradient(to right, #4338ca, #7e22ce, #4338ca);
          }
          .navbar-brand {
            color: #d1d5db !important;
          }
          .nav-link {
            color: #d1d5db !important;
            transition: color 0.3s, transform 0.3s;
          }
          .nav-link:hover {
            color: #ffffff !important;
            transform: scale(1.05);
          }
          .collapse.navbar-collapse.show {
            background-color: #1e293b;
            padding: 1rem;
            border-radius: 0.5rem;
            margin-top: 0.5rem;
          }
          .dropdown-menu {
            background-color: #1e293b;
            border: none;
            border-radius: 0.75rem;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            min-width: 220px;
          }
          .dropdown-item-text, .dropdown-item {
            color: #d1d5db !important;
          }
          .dropdown-item:hover {
            background-color: #334155 !important;
            color: #ffffff !important;
          }
          .btn-primary {
            background-color: #06b6d4 !important;
            border-color: #06b6d4 !important;
          }
          .btn-primary:hover {
            background-color: #0891b2 !important;
            border-color: #0891b2 !important;
          }
          .btn-danger {
            background-color: #dc2626 !important;
            border-color: #dc2626 !important;
          }
          .btn-danger:hover {
            background-color: #b91c1c !important;
            border-color: #b91c1c !important;
          }
        `}
      </style>
    </header>
  );
};

const styles = {
  navbar: {
    zIndex: 50,
  },
  brand: {
    color: '#d1d5db',
  },
  emoji: {
    fontSize: '1.75rem',
    marginRight: '0.5rem',
  },
  navLink: {
    fontSize: '1rem',
  },
  dropdown: {
    transform: 'translateY(0)',
  },
  dropdownText: {
    fontSize: '0.875rem',
  },
};

export default Navbar;
