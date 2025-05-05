import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import Login from './components/Login';
import About from './components/About';
import Signup from './Signup';
import Attendence from './Attendence';
import Internals from './Internals';
import Timetable from './Timetable';
import Announcements from './Announcements';
import OurMission from './components/OurMission';
import Testimonials from './Testimonials';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute
import './App.css'; // Import a CSS file for global styles

const App = () => {
  const [auth, setAuth] = useState({ isAuthenticated: false, user: null });

  // Check authentication status on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (token && storedUser) {
      setAuth({ isAuthenticated: true, user: storedUser });
    }
  }, []);

  return (
    <Router>
      <div className="dark-theme" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Pass auth state and setter to Navbar */}
        <Navbar auth={auth} setAuth={setAuth} />
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection />
              <About /> {/* Render the component below HeroSection */}
              <OurMission/>
              <Testimonials/>
            </>
          } />
          <Route path="/login" element={<Login setAuth={setAuth} />} />
          <Route path="/About" element={<About />} />
          <Route path="/signup" element={<Signup />} />


          {/* Protected Routes */}
          <Route
            path="/att"
            element={
              <ProtectedRoute auth={auth}>
                <Attendence />
              </ProtectedRoute>
            }
          />
          <Route
            path="/int"
            element={
              <ProtectedRoute auth={auth}>
                <Internals />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ann"
            element={
              <ProtectedRoute auth={auth}>
                <Announcements />
              </ProtectedRoute>
            }
          />
          <Route
            path="/time"
            element={
              <ProtectedRoute auth={auth}>
                <Timetable />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;