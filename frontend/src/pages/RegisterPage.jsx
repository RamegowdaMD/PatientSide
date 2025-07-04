// // src/pages/RegisterPage.jsx
// import React, { useState } from 'react';
// import { Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function RegisterPage() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [role, setRole] = useState('patient'); // Default role is 'patient'

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const navigate = useNavigate();

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (password !== confirmPassword) {
//       setError('Passwords do not match.');
//       return;
//     }
//     setError(null);
//     setLoading(true);

//     try {
//       const API_URL = 'http://localhost:5001/api/users/register';
//       const userData = { name, email, password, role }; // Pass the role to the backend

//       await axios.post(API_URL, userData);
//       setLoading(false);
//       alert('Registration successful! Please log in.');
//       navigate('/login');

//     } catch (err) {
//       setLoading(false);
//       setError(err.response?.data?.message || 'An error occurred during registration.');
//     }
//   };

//   return (
//     <Card className="mx-auto" style={{ maxWidth: '500px' }}>
//       <Card.Header as="h4" className="text-center">Create a New Account</Card.Header>
//       <Card.Body>
//         {error && <Alert variant="danger">{error}</Alert>}
//         <Form onSubmit={handleSubmit}>
//           {/* --- NEW ROLE SELECTION --- */}
//           <Form.Group className="mb-3">
//             <Form.Label>I am a:</Form.Label>
//             <div className="d-flex">
//               <Form.Check
//                 type="radio"
//                 label="Patient"
//                 name="role"
//                 id="role-patient"
//                 value="patient"
//                 checked={role === 'patient'}
//                 onChange={(e) => setRole(e.target.value)}
//                 className="me-3"
//               />
//               <Form.Check
//                 type="radio"
//                 label="Doctor"
//                 name="role"
//                 id="role-doctor"
//                 value="doctor"
//                 checked={role === 'doctor'}
//                 onChange={(e) => setRole(e.target.value)}
//               />
//             </div>
//           </Form.Group>

//           <Form.Group className="mb-3" controlId="formName">
//             <Form.Label>Full Name</Form.Label>
//             <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
//           </Form.Group>

//           <Form.Group className="mb-3" controlId="formEmail">
//             <Form.Label>Email address</Form.Label>
//             <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//           </Form.Group>

//           <Form.Group className="mb-3" controlId="formPassword">
//             <Form.Label>Password</Form.Label>
//             <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//           </Form.Group>

//           <Form.Group className="mb-3" controlId="formConfirmPassword">
//             <Form.Label>Confirm Password</Form.Label>
//             <Form.Control type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
//           </Form.Group>
          
//           <Button variant="primary" type="submit" className="w-100" disabled={loading}>
//             {loading ? 'Registering...' : 'Register'}
//           </Button>
//         </Form>
//         <div className="mt-3 text-center">
//           <span>Already have an account? </span>
//           <Link to="/login">Login here</Link>
//         </div>
//       </Card.Body>
//     </Card>
//   );
// }

// export default RegisterPage;
import React, { useState } from 'react';
import { Form, Button, Card, Alert, Container, Row, Col, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('patient');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await axios.post('http://localhost:5001/api/users/register', { name, email, password, role });
      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
      setLoading(false);
    }
  };

  return (
    <Container className="auth-wrapper">
      <Row className="justify-content-center w-100">
        <Col md={8} lg={6} xl={5}>
          <Card className="p-4 auth-card">
            <Card.Body>
              <div className="text-center mb-4">
                  <h3 className="fw-bold " style={{ color: 'var(--primary-color)' }}>Create Your Account</h3>
                  <p className="text-muted">Get started with your health journey today!</p>
              </div>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-500">I am a:</Form.Label>
                  <div>
                    <Form.Check inline type="radio" label="Patient" name="role" value="patient" checked={role === 'patient'} onChange={(e) => setRole(e.target.value)} />
                    <Form.Check inline type="radio" label="Doctor" name="role" value="doctor" checked={role === 'doctor'} onChange={(e) => setRole(e.target.value)} />
                  </div>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </Form.Group>
                 <Form.Group className="mb-4">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 py-2" disabled={loading}>
                  {loading ? <Spinner animation="border" size="sm" /> : 'Create Account'}
                </Button>
              </Form>
              <div className="mt-4 text-center">
                <small>Already have an account? <Link to="/login" style={{ color: 'var(--primary-color)', fontWeight: '500' }}>Login</Link></small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default RegisterPage;