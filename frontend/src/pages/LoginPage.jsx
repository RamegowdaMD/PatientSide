// src/pages/LoginPage.jsx
import React from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function LoginPage() {
  return (
    <Card className="mx-auto" style={{ maxWidth: '400px' }}>
      <Card.Header as="h4" className="text-center">Patient Login</Card.Header>
      <Card.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" required />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Login
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