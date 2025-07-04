// src/pages/PatientDashboard.jsx
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ListGroup,
  Spinner,
  Alert,
  Badge,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaUserMd, FaCalendarAlt, FaFileMedical } from "react-icons/fa";
import axios from "axios";

function PatientDashboard() {
  const [userInfo, setUserInfo] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUserInfo(storedUserInfo);
    document.title = "Patient Dashboard | HealthConnect";

    const fetchAppointments = async () => {
      if (!storedUserInfo?.token) {
        setError("You are not logged in.");
        setLoading(false);
        return;
      }

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${storedUserInfo.token}`,
          },
        };

        const { data } = await axios.get(
          "/api/appointments/patient",
          config
        );

        if (Array.isArray(data)) {
          setAppointments(data);
        } else {
          setAppointments([]);
          setError("Unexpected response format from server.");
        }
      } catch (err) {
        console.error("Error fetching appointments:", err);

        const errMsg =
          err.response?.data?.message ||
          err.message ||
          "An unexpected error occurred. Please check your connection and try again.";

        setError(errMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Confirmed":
        return "success";
      case "Pending":
        return "warning";
      case "Completed":
        return "secondary";
      case "Cancelled":
        return "danger";
      default:
        return "primary";
    }
  };

  return (
    <Container className="py-5">
      <h2 className="mb-4">Welcome back, {userInfo?.name || "Patient"}!</h2>
      <p className="text-muted mb-5">
        Here's your health summary. Manage your appointments and records with ease.
      </p>

      <Row>
        <Col md={4} className="mb-4">
          <Card className="h-100 text-center service-card">
            <Card.Body>
              <FaUserMd size={40} className="text-primary mb-3" />
              <Card.Title>Find a Doctor</Card.Title>
              <Card.Text>Search and book consultations with top specialists.</Card.Text>
              <Button as={Link} to="/" variant="primary">Search Now</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="h-100 text-center service-card">
            <Card.Body>
              <FaCalendarAlt size={40} className="text-primary mb-3" />
              <Card.Title>My Appointments</Card.Title>
              <Card.Text>View your upcoming and past appointments.</Card.Text>
              <Button variant="outline-primary">View Schedule</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="h-100 text-center service-card">
            <Card.Body>
              <FaFileMedical size={40} className="text-primary mb-3" />
              <Card.Title>My Health Records</Card.Title>
              <Card.Text>Access your prescriptions and lab reports securely.</Card.Text>
              <Button variant="outline-primary">View Records</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h4 className="mt-4">My Appointments</h4>
      <Card className="mt-3 auth-card">
        {loading ? (
          <div className="text-center p-3">
            <Spinner animation="border" />
            <p className="mt-2 mb-0">Loading your appointments...</p>
          </div>
        ) : error ? (
          <Alert variant="danger" className="m-3">{error}</Alert>
        ) : (
          <ListGroup variant="flush">
            {appointments.length > 0 ? (
              appointments.map((app) => (
                <ListGroup.Item
                  key={app._id}
                  className="d-flex justify-content-between align-items-center flex-wrap"
                >
                  <div className="py-2">
                    <strong>Dr. {app.doctor?.name} ({app.doctor?.specialty || "General"})</strong>
                    <p className="mb-0 text-muted">
                      Status:{" "}
                      <Badge bg={getStatusBadge(app.status)}>{app.status}</Badge>
                    </p>
                    {app.status === "Confirmed" && app.appointmentDate && (
                      <p className="mb-0 text-success fw-bold">
                        Confirmed for:{" "}
                        {new Date(app.appointmentDate).toLocaleDateString()} at{" "}
                        {app.appointmentTime}
                      </p>
                    )}
                  </div>
                  <div className="py-2">
                    <Button
                      as={Link}
                      to={`/appointment/${app._id}`}
                      variant="outline-primary"
                      size="sm"
                    >
                      View Details
                    </Button>
                  </div>
                </ListGroup.Item>
              ))
            ) : (
              <ListGroup.Item className="text-center text-muted p-3">
                You have no appointments. <Link to="/">Book one now!</Link>
              </ListGroup.Item>
            )}
          </ListGroup>
        )}
      </Card>
    </Container>
  );
}

export default PatientDashboard;
