import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-dark text-light pt-5 pb-3">
      <div className="container">
        <div className="row gy-4">
          {/* EduPortal Info */}
          <div className="col-md-3">
            <h5 className="fw-bold">
              <i className="fas fa-graduation-cap me-2"></i>EduPortal
            </h5>
            <p>
              Empowering students with the tools they need to manage their academic journey effectively.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-light fs-5"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="text-light fs-5"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-light fs-5"><i className="fab fa-instagram"></i></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-3">
            <h6 className="fw-bold">QUICK LINKS</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light text-decoration-none">Home</a></li>
              <li><a href="/login" className="text-light text-decoration-none">Login</a></li>
              <li><a href="/signup" className="text-light text-decoration-none">Sign Up</a></li>
            </ul>
          </div>

          {/* Features */}
          <div className="col-md-3">
            <h6 className="fw-bold">FEATURES</h6>
            <ul className="list-unstyled">
              <li><a href="/att" className="text-light text-decoration-none">Attendance Tracking</a></li>
              <li><a href="/int" className="text-light text-decoration-none">Internal Assessment</a></li>
              <li><a href="/Time" className="text-light text-decoration-none">Timetable</a></li>
              <li><a href="/Ann" className="text-light text-decoration-none">Announcements</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-3">
            <h6 className="fw-bold">CONTACT</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <i className="fas fa-map-marker-alt me-2"></i>
                123 University Avenue,<br />College Town, CT 10001
              </li>
              <li className="mb-2">
                <i className="fas fa-phone-alt me-2"></i>
                +1 (555) 123-4567
              </li>
              <li>
                <i className="fas fa-envelope me-2"></i>
                info@eduportal.edu
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-secondary mt-4" />
        <p className="text-center text-secondary small mb-0">
          © 2025 EduPortal. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
