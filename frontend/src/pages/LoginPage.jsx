
import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Alert, Container, Row, Col, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient'); // Add role state, default to 'patient'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('userInfo')) {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      navigate(userInfo.role === 'doctor' ? '/doctor-dashboard' : '/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // *** SEND ROLE TO BACKEND ***
      const { data } = await axios.post('http://localhost:5001/api/users/login', { email, password, role });
      
      localStorage.setItem('userInfo', JSON.stringify(data));
      
      // Navigate based on the role returned from the backend
      if (data.role === 'doctor') {
        navigate('/doctor-dashboard');
      } else {
        navigate('/dashboard');
      }
      window.location.reload(); // To refresh navbar state

    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials for the selected role.');
      setLoading(false);
    }
  };

  return (
    <Container className="auth-wrapper">
      <Row className="justify-content-center w-100">
        <Col md={7} lg={5} xl={4}>
          <Card className="p-4 auth-card">
            <Card.Body>
              <div className="text-center mb-4">
                  <h3 className="fw-bold" style={{ color: 'var(--primary-color)' }}>Login to HealthConnect</h3>
                  <p className="text-muted">Welcome back! Please enter your details.</p>
              </div>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>

                {/* --- NEW ROLE SELECTOR --- */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-500">Login as a:</Form.Label>
                  <div className="d-flex">
                    <Form.Check
                      inline
                      type="radio"
                      label="Patient"
                      name="role"
                      id="role-patient-login"
                      value="patient"
                      checked={role === 'patient'}
                      onChange={(e) => setRole(e.target.value)}
                      className="me-4"
                    />
                    <Form.Check
                      inline
                      type="radio"
                      label="Doctor"
                      name="role"
                      id="role-doctor-login"
                      value="doctor"
                      checked={role === 'doctor'}
                      onChange={(e) => setRole(e.target.value)}
                    />
                  </div>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 py-2" disabled={loading}>
                  {loading ? <Spinner animation="border" size="sm" /> : 'Login'}
                </Button>
              </Form>
              <div className="mt-4 text-center">
                <small>Don't have an account? <Link to="/register" style={{ color: 'var(--primary-color)', fontWeight: '500' }}>Sign Up</Link></small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;