// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Card, Badge, ListGroup, Button } from 'react-bootstrap';
// import { FaUserInjured, FaCalendarCheck, FaClock } from 'react-icons/fa';

// function DoctorDashboard() {
//   const [userInfo, setUserInfo] = useState(null);

//   useEffect(() => {
//     const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
//     setUserInfo(storedUserInfo);
//     document.title = "Doctor Dashboard | HealthConnect";
//   }, []);

//   return (
//     <Container className="py-5">
//       <h2 className="mb-4">Doctor Dashboard</h2>
//       <p className="text-muted mb-5">Welcome, {userInfo?.name}. Manage your schedule and patient consultations.</p>

//        <Row>
//         <Col md={4} className="mb-4">
//           <Card className="h-100 text-center service-card">
//             <Card.Body>
//               <FaUserInjured size={40} className="text-primary mb-3" />
//               <Card.Title>Patient Requests</Card.Title>
//               <Card.Text>
//                 You have <Badge bg="danger">3 new</Badge> appointment requests.
//               </Card.Text>
//               <Button variant="primary">View Requests</Button>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={4} className="mb-4">
//           <Card className="h-100 text-center service-card">
//             <Card.Body>
//               <FaCalendarCheck size={40} className="text-primary mb-3" />
//               <Card.Title>Today's Schedule</Card.Title>
//               <Card.Text>You have 8 appointments scheduled for today.</Card.Text>
//               <Button variant="outline-primary">View Full Schedule</Button>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={4} className="mb-4">
//            <Card className="h-100 text-center service-card">
//             <Card.Body>
//               <FaClock size={40} className="text-primary mb-3" />
//               <Card.Title>Manage Availability</Card.Title>
//               <Card.Text>Update your consultation hours and availability.</Card.Text>
//               <Button variant="outline-primary">Set Timings</Button>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       <h4 className="mt-4">Upcoming Consultations</h4>
//       <Card className="mt-3 auth-card">
//           <ListGroup variant="flush">
//               <ListGroup.Item className="d-flex justify-content-between align-items-center">
//                   <div>
//                     <strong>John Doe (ID: #12345)</strong>
//                     <p className="mb-0 text-muted">Next at 11:00 AM - Video Call</p>
//                   </div>
//                   <Button variant="accent" size="sm">Start Consultation</Button>
//               </ListGroup.Item>
//               <ListGroup.Item className="d-flex justify-content-between align-items-center">
//                   <div>
//                     <strong>Jane Smith (ID: #67890)</strong>
//                     <p className="mb-0 text-muted">Today at 11:30 AM - In-Clinic</p>
//                   </div>
//                    <Button variant="outline-secondary" size="sm">View Details</Button>
//               </ListGroup.Item>
//           </ListGroup>
//       </Card>
//     </Container>
//   );
// }

// export default DoctorDashboard;

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, ListGroup, Button, Alert } from 'react-bootstrap';
import { FaUserInjured, FaCalendarCheck } from 'react-icons/fa';
import axios from 'axios';

function DoctorDashboard() {
  const [userInfo, setUserInfo] = useState(null);
  const [appointments, setAppointments] = useState([]); // Initial state is correct (an array)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
    setUserInfo(storedUserInfo);
    document.title = "Doctor Dashboard | HealthConnect";

    const fetchAppointments = async () => {
      if (!storedUserInfo?.token) return;
      setLoading(true);
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${storedUserInfo.token}`,
          },
        };
        const { data } = await axios.get('/api/appointments/doctor', config);
        
        // --- FIX IS HERE ---
        // Ensure that what we set is always an array.
        // If the API returns a valid array, use it. Otherwise, use an empty array.
        if (Array.isArray(data)) {
            setAppointments(data);
        } else {
            // This prevents a crash if the API returns null, an object, or anything else.
            setAppointments([]); 
            console.warn("API did not return an array for appointments:", data);
        }

      } catch (err) {
        setError('Failed to fetch appointments.');
        // Ensure state is an empty array on error too
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);
  
  const handleApprove = async (appointmentId) => {
    // A good practice is to ensure userInfo is loaded before allowing this action
    if (!userInfo) return;

    try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const { data } = await axios.put(
            `/api/appointments/${appointmentId}`, 
            { status: 'Confirmed', appointmentDate: new Date(), appointmentTime: 'TBD' },
            config
        );
        // Refresh list by replacing the updated item
        setAppointments(prevAppointments => 
            prevAppointments.map(app => app._id === appointmentId ? data : app)
        );
    } catch (err) {
        alert('Could not update appointment.');
        console.error("Failed to approve appointment:", err);
    }
  };


  // This will now work safely because `appointments` is guaranteed to be an array.
  const pendingRequests = appointments.filter(a => a.status === 'Pending');
  const confirmedCount = appointments.filter(a => a.status === 'Confirmed').length;

  return (
    <Container className="py-5">
      <h2 className="mb-4">Doctor Dashboard</h2>
      <p className="text-muted mb-5">Welcome, {userInfo?.name}. Manage your patient consultations.</p>

      <Row>
        <Col md={6} className="mb-4">
          <Card className="h-100 text-center service-card">
            <Card.Body>
              <FaUserInjured size={40} className="text-primary mb-3" />
              <Card.Title>New Patient Requests</Card.Title>
              <Card.Text>
                You have <Badge bg="danger">{pendingRequests.length}</Badge> new appointment requests.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Card className="h-100 text-center service-card">
            <Card.Body>
              <FaCalendarCheck size={40} className="text-primary mb-3" />
              <Card.Title>Confirmed Appointments</Card.Title>
              <Card.Text>You have {confirmedCount} confirmed appointments.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h4 className="mt-4">Patient Appointment Requests</h4>
      <Card className="mt-3 auth-card">
        {loading ? <p className="p-3">Loading requests...</p> : 
         error ? <Alert variant="danger" className="m-3">{error}</Alert> :
         <ListGroup variant="flush">
          {pendingRequests.length > 0 ? (
            pendingRequests.map(app => (
              <ListGroup.Item key={app._id} className="d-flex justify-content-between align-items-center flex-wrap">
                <div className='py-2'>
                  <strong>{app.patient?.name || 'Unknown Patient'}</strong>
                  <p className="mb-1 text-muted">Problem: {app.problemDescription}</p>
                  <small>Requested on: {new Date(app.createdAt).toLocaleDateString()}</small>
                </div>
                <div className='py-2'>
                  <Button variant="success" size="sm" className="me-2" onClick={() => handleApprove(app._id)}>Approve</Button>
                  <Button variant="outline-danger" size="sm">Decline</Button>
                </div>
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item className="text-center text-muted p-3">
              No new appointment requests.
            </ListGroup.Item>
          )}
        </ListGroup>
       }
      </Card>
    </Container>
  );
}

export default DoctorDashboard;