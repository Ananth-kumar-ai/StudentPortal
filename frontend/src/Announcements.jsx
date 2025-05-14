import React from 'react';

const Announcements = () => {
    const announcements = [
        {
            title: "New Feature Released!",
            content: "We’ve launched dark mode support across the platform.",
            date: "May 10, 2025"
        },
        {
            title: "Scheduled Maintenance",
            content: "Our services will be down for scheduled maintenance on May 15th from 2 AM to 4 AM UTC.",
            date: "May 9, 2025"
        },
        {
            title: "Welcome New Users!",
            content: "We’re excited to welcome over 1,000 new members to our community this month.",
            date: "May 1, 2025"
        }
    ];

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4 display-5 text-primary">📢 Announcements</h1>
            {announcements.map((announcement, index) => (
                <div key={index} className="card mb-4 shadow-sm">
                    <div className="card-body">
                        <h5 className="card-title text-success fw-bold">{announcement.title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{announcement.date}</h6>
                        <p className="card-text">{announcement.content}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Announcements;
