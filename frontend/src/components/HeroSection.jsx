import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { colors } from './colors';
import Spline from '@splinetool/react-spline';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <div style={styles.hero}>
      {/* Left Side: Content */}
      <div style={styles.content} className='head'>
        <h1 style={styles.heading}>
          <Typewriter
            words={[
              'Welcome to the Student Management Portal',
              'Effortlessly manage student records, courses, and results',
              'Empowering educators with smart administration tools'
            ]}            
            loop={Infinity}
            cursor
            cursorStyle='|'
            typeSpeed={70}
            deleteSpeed={25}
            delaySpeed={1000}
          />
        </h1>

        <p style={styles.subheading} className="slide-in-right">
          Manage students, courses, and more with ease.
        </p>
      </div>

      {/* Right Side: Spline Model */}
      <div style={styles.splineContainer} className='spline'>
        <Spline
          scene="https://prod.spline.design/djq0SdCWtons2hOf/scene.splinecode"
          style={styles.spline}
        />
      </div>
    </div>
  );
};


const styles = {
  hero: {
    display: 'flex',
    justifyContent: 'space-between', // Space between content and Spline
    alignItems: 'center',
    height: '85vh', // 85% of the viewport height
    backgroundColor: colors.background,
    overflow: 'hidden', // Ensure overflow is hidden
    margin: 'auto', // Center the hero section vertically and horizontally
    maxWidth: '1200px', // Optional: Limit the maximum width of the hero section
    width: '90%', // Optional: Adjust the width as needed
  },
  content: {
    flex: 1, // Take up remaining space
    maxWidth: '600px', // Limit content width
  },
  heading: {
    fontSize: '48px',
    marginBottom: '20px',
    color: colors.text,
  },
  subheading: {
    fontSize: '24px',
    color: colors.text,
    marginBottom: '40px',
  },
  buttons: {
    display: 'flex',
    gap: '20px',
  },
  primaryButton: {
    padding: '12px 24px',
    backgroundColor: colors.accent,
    color: colors.secondary,
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  secondaryButton: {
    padding: '12px 24px',
    backgroundColor: 'transparent',
    color: colors.accent,
    border: `2px solid ${colors.accent}`,
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  splineContainer: {
    flex: 1, // Take up remaining space
    display: 'flex',
    justifyContent: 'flex-end', // Align Spline to the right
    alignItems: 'center',
    height: '100%', // Make the container take full height
    width: '50%', // Adjust the width of the container
    overflow: 'visible', // Ensure the model is not cut off
  },
  spline: {
    width: '100%', // Adjust the width of the Spline model
    height: '100%', // Adjust the height of the Spline model
    objectFit: 'contain', // Ensures the model scales properly and fits entirely
  },
};

export default HeroSection;
