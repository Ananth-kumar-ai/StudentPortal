import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChartLine,
    faBookOpen,
    faGraduationCap,
    faCalendarAlt,
    faUserFriends,
    faCogs,
} from '@fortawesome/free-solid-svg-icons';
import './About.css'; // Make sure to create this CSS file

const features = [
    {
        icon: faChartLine,
        title: "Check Attendance",
        description: "Monitor your daily attendance in each subject and get alerts when you're falling short.",
    },
    {
        icon: faBookOpen,
        title: "View Internals",
        description: "Detailed internal marks for each assessment with subject-wise breakdown and trends.",
    },
    {
        icon: faGraduationCap,
        title: "Manage Credits",
        description: "Track your completed and pending credits. Visualize your degree progress easily.",
    },
    {
        icon: faCalendarAlt,
        title: "Academic Calendar",
        description: "Stay updated with semester schedules, exam dates, and holidays.",
    },
    {
        icon: faUserFriends,
        title: "Faculty Connect",
        description: "Find your teachers’ contact info and consultation hours with ease.",
    },
    {
        icon: faCogs,
        title: "Settings & Preferences",
        description: "Customize your dashboard, notification preferences, and dark mode settings.",
    }
];

const About = () => {
    return (
        <div className="container-fluid py-5 about-section text-light">
            <h1 className="text-center mb-5 fw-bold">Student Dashboard Features</h1>
            <div className="row g-4 px-4">
                {features.map((feature, index) => (
                    <div className="col-12 col-md-6 col-lg-4" key={index}>
                        <div className="feature-card h-100 text-center">
                            <FontAwesomeIcon icon={feature.icon} size="3x" className="feature-icon mb-3" />
                            <h4 className="fw-semibold mb-2">{feature.title}</h4>
                            <p className="feature-desc">{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default About;
