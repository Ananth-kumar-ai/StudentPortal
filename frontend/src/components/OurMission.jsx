import React, { useEffect, useState } from 'react';

const Stat = ({ label, target }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = parseInt(target);
        const duration = 2000;
        const step = Math.max(1, Math.ceil(duration / end));

        const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start >= end) clearInterval(timer);
        }, step);

        return () => clearInterval(timer);
    }, [target]);

    return (
        <div className="text-center mb-4">
            <h3 className="fw-bold text-white display-6">{count.toLocaleString()}+</h3>
            <p className="text-white-50 mb-0">{label}</p>
        </div>
    );
};

const OurMission = () => {
    return (
        <div className="py-5 bg-dark text-white">
            <div className="container">
                <div className="row g-0 shadow-lg rounded overflow-hidden">
                    {/* Mission Text */}
                    <div className="col-md-6 p-5 bg-dark">
                        <h2 className="fw-bold mb-4">Our Mission</h2>
                        <p>
                            We believe that education should be accessible, transparent, and empowering. Student Portal was developed
                            to provide students with a seamless way to manage their academic journey, reducing administrative
                            barriers and helping them focus on what matters most: learning and growth.
                        </p>
                        <p className="mt-3">
                            By centralizing academic information and providing intuitive tools for tracking progress, we aim to
                            enhance the educational experience for students and contribute to their success.
                        </p>
                    </div>

                    {/* Stats Section */}
                    <div
                        className="col-md-6 p-5 d-flex flex-column justify-content-center"
                        style={{ background: 'linear-gradient(to right, #1D4ED8, #1E3A8A)' }}
                    >
                        <h3 className="fw-bold mb-4 text-white text-center">Key Statistics</h3>
                        <div className="row">
                            <div className="col-6">
                                <Stat label="Active Students" target="1000" />
                            </div>
                            <div className="col-6">
                                <Stat label="Satisfaction Rate" target="95" />
                            </div>
                            <div className="col-6">
                                <Stat label="Departments" target="50" />
                            </div>
                            <div className="col-6">
                                <Stat label="Support" target="24" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OurMission;
