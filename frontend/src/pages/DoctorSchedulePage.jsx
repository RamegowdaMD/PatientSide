// frontend/src/pages/DoctorSchedulePage.jsx

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Container, Table, Alert, Spinner } from 'react-bootstrap';

const DoctorSchedulePage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Get user info from Redux state (adjust if you use Context or something else)
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        // Call the new backend endpoint
        const { data } = await axios.get('/api/appointments/doctor/confirmed', config);
        setAppointments(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    if (userInfo) {
      fetchAppointments();
    }
  }, [userInfo]);

  return (
    <Container className="mt-5">
      <h2>My Schedule (Confirmed Appointments)</h2>
      {loading ? (
        <div className="text-center">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : appointments.length === 0 ? (
        <Alert variant="info">You have no confirmed appointments in your schedule.</Alert>
      ) : (
        <Table striped bordered hover responsive className="mt-4">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Problem Description</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt._id}>
                <td>{appt.patient?.name || 'N/A'}</td>
                <td>{new Date(appt.appointmentDate).toLocaleDateString()}</td>
                <td>{appt.appointmentTime}</td>
                <td>{appt.problemDescription}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default DoctorSchedulePage;