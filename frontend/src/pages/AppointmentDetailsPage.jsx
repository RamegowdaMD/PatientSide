// src/pages/AppointmentDetailsPage.js
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Container, Row, Col, Card, Button, Spinner, Alert, Badge
} from 'react-bootstrap';
import axios from 'axios';
import {
  FaUserMd, FaCalendarCheck, FaStethoscope, FaHourglassHalf
} from 'react-icons/fa';

function AppointmentDetailsPage() {
  const { appointmentId } = useParams();
  const navigate = useNavigate();

  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'Appointment Details | HealthConnect';

    const fetchAppointmentDetails = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo?.token) {
          setError('Authentication failed. Please log in again.');
          setLoading(false);
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const { data } = await axios.get(`/api/appointments/${appointmentId}`, config);
        setAppointment(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(
          err.response?.data?.message ||
          'An unexpected error occurred. Please check your connection and try again.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAppointmentDetails();
  }, [appointmentId]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Confirmed': return 'success';
      case 'Pending': return 'warning';
      case 'Completed': return 'secondary';
      case 'Cancelled': return 'danger';
      default: return 'primary';
    }
  };

  const handleJoinCall = () => {
    // 🔁 You can update this to open a video call or navigate to /vr/room/:appointmentId
    navigate(`/vr/room/${appointmentId}`);
  };

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" />
        <p>Loading Details...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
        <div className="text-center mt-3">
          <Button variant="primary" as={Link} to="/dashboard">Back to Dashboard</Button>
        </div>
      </Container>
    );
  }

  if (!appointment) {
    return (
      <Container className="py-5 text-center">
        <Alert variant="warning">No appointment found.</Alert>
        <Button as={Link} to="/dashboard">Back to Dashboard</Button>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Link to="/dashboard" className="btn btn-light mb-4">← Back to Dashboard</Link>
      <Row>
        {/* Left Column */}
        <Col md={7} lg={8}>
          <Card className="mb-4">
            <Card.Header as="h5">
              <FaStethoscope className="me-2" /> Problem Description
            </Card.Header>
            <Card.Body>
              <Card.Text style={{ fontSize: '1.1rem' }}>
                {appointment.problemDescription}
              </Card.Text>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header as="h5">
              <FaCalendarCheck className="me-2" /> Appointment Status
            </Card.Header>
            <Card.Body>
              <p>
                <strong>Status:</strong>{' '}
                <Badge bg={getStatusBadge(appointment.status)} pill>
                  {appointment.status}
                </Badge>
              </p>

              {appointment.status === 'Pending' && (
                <Alert variant="info" className="d-flex align-items-center">
                  <FaHourglassHalf className="me-2" />
                  Your request has been sent. The doctor will confirm soon.
                </Alert>
              )}

              {appointment.status === 'Confirmed' && (
                <div className="text-success fw-bold">
                  <p>Date: {new Date(appointment.appointmentDate).toLocaleDateString()}</p>
                  <p>Time: {appointment.appointmentTime}</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Right Column */}
        <Col md={5} lg={4}>
          <Card className="text-center">
            <Card.Header as="h5">
              <FaUserMd className="me-2" /> Consulting Doctor
            </Card.Header>
            <Card.Img
              variant="top"
              src={
                appointment.doctor?.image ||
                `https://i.pravatar.cc/300?u=${appointment.doctor?._id}`
              }
              className="p-3"
              alt="Doctor Profile"
            />
            <Card.Body>
              <Card.Title>Dr. {appointment.doctor?.name}</Card.Title>
              <Card.Subtitle className="mb-3 text-muted">
                {appointment.doctor?.specialty || 'General Physician'}
              </Card.Subtitle>

              {appointment.status === 'Confirmed' ? (
                <Button
                  variant="success"
                  size="lg"
                  className="w-100"
                  onClick={handleJoinCall}
                >
                  Join Call
                </Button>
              ) : (
                <>
                  <Button variant="secondary" size="lg" className="w-100" disabled>
                    Join Call
                  </Button>
                  <small className="text-muted d-block mt-2">
                    This will be enabled once the appointment is confirmed.
                  </small>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AppointmentDetailsPage;
