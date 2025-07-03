// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const API_URL = 'http://localhost:5001/api/users/login';
      const userData = { email, password };
      const { data } = await axios.post(API_URL, userData);

      // Save user info to localStorage
      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);

      // --- CONDITIONAL REDIRECTION ---
      // Check the role from the response data and navigate accordingly
      if (data.role === 'doctor') {
        navigate('/doctor-dashboard');
      } else {
        navigate('/dashboard'); // Default patient dashboard
      }
      
      window.location.reload(); // Reload to update navbar and other components

    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'An error occurred during login.');
    }
  };

  return (
    <Card className="mx-auto" style={{ maxWidth: '400px' }}>
      <Card.Header as="h4" className="text-center">Account Login</Card.Header>
      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </Form>
        <div className="mt-3 text-center">
          <span>Don't have an account? </span>
          <Link to="/register">Register here</Link>
        </div>
      </Card.Body>
    </Card>
  );
}

export default LoginPage;