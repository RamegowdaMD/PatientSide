import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUserMd, FaCalendarAlt, FaFileMedical } from 'react-icons/fa';

function PatientDashboard() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
    setUserInfo(storedUserInfo);
    document.title = "Patient Dashboard | HealthConnect";
  }, []);

  return (
    <Container className="py-5">
      <h2 className="mb-4">Welcome back, {userInfo?.name}!</h2>
      <p className="text-muted mb-5">Here's your health summary. Manage your appointments and records with ease.</p>
      
      <Row>
        {/* Main Action Cards */}
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

      {/* Upcoming Appointments List */}
      <h4 className="mt-4">Upcoming Appointments</h4>
      <Card className="mt-3 auth-card">
          <ListGroup variant="flush">
              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>Dr. Alice Williams (Cardiology)</strong>
                    <p className="mb-0 text-muted">Tomorrow at 10:30 AM - Video Call</p>
                  </div>
                  <Button variant="accent" size="sm">Join Call</Button>
              </ListGroup.Item>
               <ListGroup.Item className="text-center text-muted p-3">
                  You have no other upcoming appointments.
              </ListGroup.Item>
          </ListGroup>
      </Card>
    </Container>
  );
}

export default PatientDashboard;
// // PatientDashboard.js
// import React, { useState, useEffect } from 'react';
// import { Container, Card, Button, ListGroup, Badge, Alert } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// // Note: FaUserMd is not used in this component, so it can be removed if you like.

// function PatientDashboard() {
//   const [userInfo, setUserInfo] = useState(null);
//   const [appointments, setAppointments] = useState([]); // Correct initial state
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
//     setUserInfo(storedUserInfo);
//     document.title = "Patient Dashboard | HealthConnect";

//     const fetchAppointments = async () => {
//       if (!storedUserInfo?.token) {
//         setLoading(false); // Stop loading if no token
//         return;
//       }
//       setLoading(true);
//       try {
//         const config = { headers: { Authorization: `Bearer ${storedUserInfo.token}` } };
//         const { data } = await axios.get('/api/appointments/patient', config);
        
//         // --- FIX IS HERE ---
//         // We must guarantee that 'appointments' is always an array.
//         if (Array.isArray(data)) {
//             setAppointments(data);
//         } else {
//             // If the API returns something else (e.g., an object or null), default to an empty array.
//             setAppointments([]);
//             console.warn("API response for patient appointments was not an array:", data);
//         }

//       } catch (err) {
//         setError('Failed to fetch your appointments.');
//         // Also ensure the state is an empty array on error.
//         setAppointments([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAppointments();
//   }, []);

//   const getStatusBadge = (status) => {
//     switch (status) {
//       case 'Pending': return 'warning';
//       case 'Confirmed': return 'success';
//       case 'Completed': return 'secondary';
//       case 'Cancelled': return 'danger';
//       default: return 'primary';
//     }
//   };

//   return (
//     <Container className="py-5">
//       <h2 className="mb-4">Welcome back, {userInfo?.name}!</h2>
//       <p className="text-muted mb-5">Manage your appointments and health records.</p>
      
//       {/* Cards for "Find a Doctor", etc. would go here */}

//       <h4 className="mt-4">My Appointments</h4>
//       <Card className="mt-3 auth-card">
//         {loading ? <p className="p-3">Loading appointments...</p> :
//          error ? <Alert variant="danger" className="m-3">{error}</Alert> :
//           <ListGroup variant="flush">
//             {appointments.length > 0 ? (
//               appointments.map(app => (
//                 <ListGroup.Item key={app._id} className="d-flex justify-content-between align-items-center flex-wrap">
//                   <div className='py-2'>
//                     {/* Using optional chaining (?.) for extra safety */}
//                     <strong>Dr. {app.doctor?.name} ({app.doctor?.specialty || 'General'})</strong>
//                     <p className="mb-0 text-muted">
//                         Status: <Badge bg={getStatusBadge(app.status)}>{app.status}</Badge>
//                     </p>
//                     {app.status === 'Confirmed' && (
//                         <p className="mb-0 text-success fw-bold">
//                             Confirmed for: {new Date(app.appointmentDate).toLocaleDateString()} at {app.appointmentTime}
//                         </p>
//                     )}
//                   </div>
//                   <div className='py-2'>
//                     <Button variant="outline-primary" size="sm">View Details</Button>
//                   </div>
//                 </ListGroup.Item>
//               ))
//             ) : (
//               <ListGroup.Item className="text-center text-muted p-3">
//                 You have no appointments. <Link to="/">Book one now!</Link>
//               </ListGroup.Item>
//             )}
//           </ListGroup>
//         }
//       </Card>
//     </Container>
//   );
// }

// export default PatientDashboard;