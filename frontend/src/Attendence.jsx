import React, { useEffect, useState } from 'react';

const Attendence = () => {
  const [attendanceData, setAttendanceData] = useState(null); // Single user's data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch attendance data for the logged-in user
    const fetchAttendanceData = async () => {
      const token = localStorage.getItem('token'); // Get the token from localStorage

      try {
        const response = await fetch('http://localhost:5000/api/attendance', {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch attendance data');
        }

        const data = await response.json();
        setAttendanceData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Attendance</h1>
      <table style={{ margin: '0 auto', borderCollapse: 'collapse', width: '80%' }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Regno</th>
            <th style={tableHeaderStyle}>Subject 1 Attendance</th>
            <th style={tableHeaderStyle}>Subject 2 Attendance</th>
            <th style={tableHeaderStyle}>Subject 3 Attendance</th>
            <th style={tableHeaderStyle}>Overall Attendance</th>
          </tr>
        </thead>
        <tbody>
          <tr style={tableRowStyle}>
            <td style={tableCellStyle}>{attendanceData.Regno}</td>
            <td style={tableCellStyle}>{attendanceData.attendance.Sub1att}%</td>
            <td style={tableCellStyle}>{attendanceData.attendance.Sub2att}%</td>
            <td style={tableCellStyle}>{attendanceData.attendance.Sub3att}%</td>
            <td style={tableCellStyle}>{attendanceData.attendance.Allatt}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

// Styles for the table
const tableHeaderStyle = {
  border: '1px solid #ddd',
  padding: '10px',
  backgroundColor: '#f2f2f2',
};

const tableRowStyle = {
  border: '1px solid #ddd',
};

const tableCellStyle = {
  border: '1px solid #ddd',
  padding: '10px',
};

export default Attendence;