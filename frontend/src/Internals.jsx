import React, { useEffect, useState } from 'react';

const Internals = () => {
  const [internalsData, setInternalsData] = useState(null); // Single user's data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch internal marks data for the logged-in user
    const fetchInternalsData = async () => {
      const token = localStorage.getItem('token'); // Get the token from localStorage

      if (!token) {
        setError('Unauthorized: No token provided');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/internals', {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch internal marks data');
        }

        const data = await response.json();
        setInternalsData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInternalsData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Internal Marks</h1>
      <table style={{ margin: '0 auto', borderCollapse: 'collapse', width: '80%' }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Regno</th>
            <th style={tableHeaderStyle}>T1</th>
            <th style={tableHeaderStyle}>T2</th>
            <th style={tableHeaderStyle}>T3</th>
            <th style={tableHeaderStyle}>T4</th>
            <th style={tableHeaderStyle}>T5</th>
          </tr>
        </thead>
        <tbody>
          <tr style={tableRowStyle}>
            <td style={tableCellStyle}>{internalsData.Regno}</td>
            <td style={tableCellStyle}>{internalsData.internals.T1}</td>
            <td style={tableCellStyle}>{internalsData.internals.T2}</td>
            <td style={tableCellStyle}>{internalsData.internals.T3}</td>
            <td style={tableCellStyle}>{internalsData.internals.T4}</td>
            <td style={tableCellStyle}>{internalsData.internals.T5}</td>
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

export default Internals;