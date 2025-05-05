import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';
import './Testimonials.css'; // Add this CSS file

const testimonials = [
  {
    name: "Sarah Johnson",
    course: "Computer Science, Year 3",
    feedback: "EduPortal completely transformed how I manage my academic life. The attendance tracking and grade monitoring features are game-changers!",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Michael Chen",
    course: "Electrical Engineering, Year 2",
    feedback: "The timetable and announcement features ensure I never miss an important class or deadline. It's become an essential part of my daily routine.",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
  },
  {
    name: "Emily Rodriguez",
    course: "Business Administration, Year 4",
    feedback: "As a busy student juggling multiple responsibilities, having all my academic information in one place has been incredibly helpful.",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  }
];

export default function Testimonials() {
  return (
    <section className="bg-dark text-white py-5 testimonials-section">
      <div className="container">
        <h2 className="text-center fw-bold mb-5">What Students Say</h2>
        <div className="row g-4 justify-content-center">
          {testimonials.map((t, index) => (
            <div key={index} className="col-md-4">
              <div className="testimonial-card h-100 p-4 text-light rounded-4 shadow-lg position-relative">
                <FaQuoteLeft className="quote-icon text-info" />
                <div className="d-flex align-items-center mb-3">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="rounded-circle me-3 avatar-img"
                    width="55"
                    height="55"
                  />
                  <div>
                    <h6 className="mb-0">{t.name}</h6>
                    <small className="text-light-emphasis">{t.course}</small>
                  </div>
                </div>
                <p className="fst-italic feedback-text">"{t.feedback}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
