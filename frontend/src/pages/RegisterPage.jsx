// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    console.log('Registering user:', formData.email);
    alert('Registration successful! (Simulation). Redirecting to login...');
    navigate('/login');
  };

  return (
    <Card className="mx-auto" style={{ maxWidth: '500px' }}>
      <Card.Header as="h4" className="text-center">Create a New Account</Card.Header>
      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="text" name="fullName" placeholder="Enter your full name" onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" placeholder="Enter email" onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="Password" onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">Register</Button>
        </Form>
        <div className="mt-3 text-center">
          <span>Already have an account? </span>
          <Link to="/login">Login here</Link>
        </div>
      </Card.Body>
    </Card>
  );
}

export default RegisterPage;