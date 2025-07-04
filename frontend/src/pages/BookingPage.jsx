// src/pages/BookingPage.js
import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function BookingPage() {
  const { doctorId } = useParams(); // Gets doctorId from the URL
  const navigate = useNavigate();
  const [problemDescription, setProblemDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    document.title = "Book Appointment | HealthConnect";
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
        setUserInfo(JSON.parse(storedUserInfo));
    } else {
        // If user is not logged in, redirect them
        navigate('/login');
    }
  }, [navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!problemDescription.trim()) {
      setError('Please describe your health problem.');
      return;
    }
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        '/api/appointments',
        { doctorId, problemDescription },
        config
      );

      setLoading(false);
      setSuccess('Your appointment request has been sent successfully! You will be notified once the doctor confirms it.');
      // Optionally redirect after a few seconds
      setTimeout(() => navigate('/dashboard'), 3000);

    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred.');
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <Card className="p-4 auth-card" style={{ width: '100%', maxWidth: '500px' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Book a Consultation</h2>
          <p className="text-muted text-center mb-4">Please describe your issue for the doctor.</p>
          
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="problemDescription" className="mb-4">
              <Form.Label>Health Problem / Symptoms</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="E.g., I have been experiencing a persistent cough and fever for the last 3 days..."
                value={problemDescription}
                onChange={(e) => setProblemDescription(e.target.value)}
                required
              />
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100" disabled={loading}>
              {loading ? 'Submitting...' : 'Request Appointment'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default BookingPage;