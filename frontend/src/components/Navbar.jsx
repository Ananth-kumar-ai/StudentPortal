import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { colors } from './colors';

const Navbar = ({ auth, setAuth }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuth({ isAuthenticated: false, user: null });
    navigate('/');
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
    <header style={styles.navbarWrapper}>
      <nav style={styles.navbar}>
        <div style={styles.brand}>
          <Link to="/" style={styles.brandText}>🎓 Student Portal</Link>
        </div>

        <div style={styles.links}>
          <Link to="/att" style={styles.link}>Attendance</Link>
          <Link to="/int" style={styles.link}>Internals</Link>
          <Link to="/Ann" style={styles.link}>Announcements</Link>
          <Link to="/Time" style={styles.link}>Timetable</Link>
        </div>

        <div style={styles.auth}>
          {auth.isAuthenticated ? (
            <div style={styles.profileContainer} ref={dropdownRef}>
              <div
                style={styles.profileButton}
                onClick={() => setDropdownOpen((prev) => !prev)}
              >
                {auth.user?.Regno}
              </div>
              <div
                style={{
                  ...styles.dropdown,
                  opacity: dropdownOpen ? 1 : 0,
                  transform: dropdownOpen ? 'translateY(0)' : 'translateY(-10px)',
                  pointerEvents: dropdownOpen ? 'auto' : 'none',
                }}
              >
                <p style={styles.dropdownText}><strong>Email:</strong> {auth.user?.email}</p>
                <button onClick={handleLogout} style={styles.logoutButton}>Log Out</button>
              </div>
            </div>
          ) : (
            <Link to="/login" style={styles.loginButton}>Log In</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

const styles = {
  navbarWrapper: {
    width: '100%',
    backgroundColor: colors.primary || '#1e1e2f',
    padding: '10px 0',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    position: 'sticky',
    top: 0,
    zIndex: 999,
  },
  navbar: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: {
    fontSize: '22px',
    fontWeight: 'bold',
  },
  brandText: {
    color: colors.secondary || '#f1f1f1',
    textDecoration: 'none',
  },
  links: {
    display: 'flex',
    gap: '25px',
  },
  link: {
    color: colors.secondary || '#f1f1f1',
    textDecoration: 'none',
    fontSize: '16px',
    position: 'relative',
    transition: 'color 0.3s',
  },
  auth: {
    display: 'flex',
    alignItems: 'center',
  },
  loginButton: {
    padding: '8px 16px',
    backgroundColor: colors.accent || '#00bcd4',
    color: '#fff',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '15px',
    fontWeight: 'bold',
    transition: 'background 0.3s ease',
  },
  profileContainer: {
    position: 'relative',
    cursor: 'pointer',
  },
  profileButton: {
    backgroundColor: colors.accent || '#00bcd4',
    color: '#fff',
    padding: '8px 16px',
    borderRadius: '20px',
    fontWeight: '500',
    fontSize: '15px',
    transition: 'background 0.3s ease',
  },
  dropdown: {
    position: 'absolute',
    top: '50px',
    right: 0,
    backgroundColor: '#2c2c3e',
    padding: '15px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
    minWidth: '220px',
    transition: 'all 0.3s ease',
    zIndex: 1000,
  },
  dropdownText: {
    color: '#ddd',
    marginBottom: '10px',
    fontSize: '14px',
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background 0.3s ease',
  },
};

export default Navbar;
