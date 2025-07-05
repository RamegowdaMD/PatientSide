// // frontend/src/pages/DoctorDashboard.jsx

// import React, { useState, useEffect } from 'react';
// // Import LinkContainer for navigation
// import { LinkContainer } from 'react-router-bootstrap'; 
// import { Container, Row, Col, Card, Badge, ListGroup, Button, Alert } from 'react-bootstrap';
// import { FaUserInjured, FaCalendarCheck } from 'react-icons/fa';

// import axios from 'axios';

// function DoctorDashboard() {
//   const [userInfo, setUserInfo] = useState(null);
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   // No changes needed in this useEffect block
//   useEffect(() => {
//     const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
//     setUserInfo(storedUserInfo);
//     document.title = "Doctor Dashboard | HealthConnect";

//     const fetchAppointments = async () => {
//       if (!storedUserInfo?.token) return;
//       setLoading(true);
//       try {
//         const config = {
//           headers: {
//             Authorization: `Bearer ${storedUserInfo.token}`,
//           },
//         };
//         const { data } = await axios.get('/api/appointments/doctor', config);
        
//         if (Array.isArray(data)) {
//             setAppointments(data);
//         } else {
//             setAppointments([]); 
//             console.warn("API did not return an array for appointments:", data);
//         }

//       } catch (err) {
//         setError('Failed to fetch appointments.');
//         setAppointments([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAppointments();
//   }, []);
  
//   // No changes needed in this handler
//   const handleApprove = async (appointmentId) => {
//     if (!userInfo) return;

//     try {
//         const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
//         const { data } = await axios.put(
//             `/api/appointments/${appointmentId}`, 
//             { status: 'Confirmed', appointmentDate: new Date(), appointmentTime: 'TBD' },
//             config
//         );
//         setAppointments(prevAppointments => 
//             prevAppointments.map(app => app._id === appointmentId ? data : app)
//         );
//     } catch (err) {
//         alert('Could not update appointment.');
//         console.error("Failed to approve appointment:", err);
//     }
//   };


//   const pendingRequests = appointments.filter(a => a.status === 'Pending');
//   const confirmedCount = appointments.filter(a => a.status === 'Confirmed').length;

//   return (
//     <Container className="py-5">
//       <h2 className="mb-4">Doctor Dashboard</h2>
//       <p className="text-muted mb-5">Welcome, {userInfo?.name}. Manage your patient consultations.</p>

//       <Row>
//         <Col md={6} className="mb-4">
//           <Card className="h-100 text-center service-card">
//             <Card.Body>
//               <FaUserInjured size={40} className="text-primary mb-3" />
//               <Card.Title>New Patient Requests</Card.Title>
//               <Card.Text>
//                 You have <Badge bg="danger">{pendingRequests.length}</Badge> new appointment requests.
//               </Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>

//         {/* === MODIFIED CARD FOR CONFIRMED APPOINTMENTS === */}
//         <Col md={6} className="mb-4">
//           <Card className="h-100 text-center service-card">
//             <Card.Body className="d-flex flex-column justify-content-center">
//               <FaCalendarCheck size={40} className="text-success mb-3" />
//               <Card.Title>Confirmed Appointments</Card.Title>
//               <Card.Text>
//                 You have {confirmedCount} confirmed appointments.
//               </Card.Text>
//               {/* ADDED THIS BUTTON TO LINK TO THE SCHEDULE PAGE */}
//               <LinkContainer to="/doctor/schedule">
//                 <Button variant="success" className="mt-2">View Schedule</Button>
//               </LinkContainer>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       <h4 className="mt-4">Patient Appointment Requests</h4>
//       <Card className="mt-3 auth-card">
//         {/* The rest of the component is unchanged */}
//         {loading ? <p className="p-3">Loading requests...</p> : 
//          error ? <Alert variant="danger" className="m-3">{error}</Alert> :
//          <ListGroup variant="flush">
//           {pendingRequests.length > 0 ? (
//             pendingRequests.map(app => (
//               <ListGroup.Item key={app._id} className="d-flex justify-content-between align-items-center flex-wrap">
//                 <div className='py-2'>
//                   <strong>{app.patient?.name || 'Unknown Patient'}</strong>
//                   <p className="mb-1 text-muted">Problem: {app.problemDescription}</p>
//                   <small>Requested on: {new Date(app.createdAt).toLocaleDateString()}</small>
//                 </div>
//                 <div className='py-2'>
//                   <Button variant="success" size="sm" className="me-2" onClick={() => handleApprove(app._id)}>Approve</Button>
//                   <Button variant="outline-danger" size="sm">Decline</Button>
//                 </div>
//               </ListGroup.Item>
//             ))
//           ) : (
//             <ListGroup.Item className="text-center text-muted p-3">
//               No new appointment requests.
//             </ListGroup.Item>
//           )}
//         </ListGroup>
//        }
//       </Card>
//     </Container>
//   );
// }

// export default DoctorDashboard;

// // frontend/src/pages/DoctorDashboard.jsx

// import React, { useState, useEffect } from 'react';
// // Import LinkContainer for navigation
// import { LinkContainer } from 'react-router-bootstrap'; 
// import { Container, Row, Col, Card, Badge, ListGroup, Button, Alert } from 'react-bootstrap';
// import { FaUserInjured, FaCalendarCheck } from 'react-icons/fa';

// import axios from 'axios';

// function DoctorDashboard() {
//   const [userInfo, setUserInfo] = useState(null);
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   // No changes needed in this useEffect block
//   useEffect(() => {
//     const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
//     setUserInfo(storedUserInfo);
//     document.title = "Doctor Dashboard | HealthConnect";

//     const fetchAppointments = async () => {
//       if (!storedUserInfo?.token) return;
//       setLoading(true);
//       try {
//         const config = {
//           headers: {
//             Authorization: `Bearer ${storedUserInfo.token}`,
//           },
//         };
//         const { data } = await axios.get('/api/appointments/doctor', config);
        
//         if (Array.isArray(data)) {
//             setAppointments(data);
//         } else {
//             setAppointments([]); 
//             console.warn("API did not return an array for appointments:", data);
//         }

//       } catch (err) {
//         setError('Failed to fetch appointments.');
//         setAppointments([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAppointments();
//   }, []);
  
//   // No changes needed in this handler
//   const handleApprove = async (appointmentId) => {
//     if (!userInfo) return;

//     try {
//         const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
//         const { data } = await axios.put(
//             `/api/appointments/${appointmentId}`, 
//             { status: 'Confirmed', appointmentDate: new Date(), appointmentTime: 'TBD' },
//             config
//         );
//         setAppointments(prevAppointments => 
//             prevAppointments.map(app => app._id === appointmentId ? data : app)
//         );
//     } catch (err) {
//         alert('Could not update appointment.');
//         console.error("Failed to approve appointment:", err);
//     }
//   };


//   const pendingRequests = appointments.filter(a => a.status === 'Pending');
//   const confirmedCount = appointments.filter(a => a.status === 'Confirmed').length;

//   return (
//     <Container className="py-5">
//       <h2 className="mb-4">Doctor Dashboard</h2>
//       <p className="text-muted mb-5">Welcome, {userInfo?.name}. Manage your patient consultations.</p>

//       <Row>
//         <Col md={6} className="mb-4">
//           <Card className="h-100 text-center service-card">
//             <Card.Body>
//               <FaUserInjured size={40} className="text-primary mb-3" />
//               <Card.Title>New Patient Requests</Card.Title>
//               <Card.Text>
//                 You have <Badge bg="danger">{pendingRequests.length}</Badge> new appointment requests.
//               </Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>

//         {/* === MODIFIED CARD FOR CONFIRMED APPOINTMENTS === */}
//         <Col md={6} className="mb-4">
//           <Card className="h-100 text-center service-card">
//             <Card.Body className="d-flex flex-column justify-content-center">
//               <FaCalendarCheck size={40} className="text-success mb-3" />
//               <Card.Title>Confirmed Appointments</Card.Title>
//               <Card.Text>
//                 You have {confirmedCount} confirmed appointments.
//               </Card.Text>
//               {/* ADDED THIS BUTTON TO LINK TO THE SCHEDULE PAGE */}
//               <LinkContainer to="/doctor/schedule">
//                 <Button variant="success" className="mt-2">View Schedule</Button>
//               </LinkContainer>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       <h4 className="mt-4">Patient Appointment Requests</h4>
//       <Card className="mt-3 auth-card">
//         {/* The rest of the component is unchanged */}
//         {loading ? <p className="p-3">Loading requests...</p> : 
//          error ? <Alert variant="danger" className="m-3">{error}</Alert> :
//          <ListGroup variant="flush">
//           {pendingRequests.length > 0 ? (
//             pendingRequests.map(app => (
//               <ListGroup.Item key={app._id} className="d-flex justify-content-between align-items-center flex-wrap">
//                 <div className='py-2'>
//                   <strong>{app.patient?.name || 'Unknown Patient'}</strong>
//                   <p className="mb-1 text-muted">Problem: {app.problemDescription}</p>
//                   <small>Requested on: {new Date(app.createdAt).toLocaleDateString()}</small>
//                 </div>
//                 <div className='py-2'>
//                   <Button variant="success" size="sm" className="me-2" onClick={() => handleApprove(app._id)}>Approve</Button>
//                   <Button variant="outline-danger" size="sm">Decline</Button>
//                 </div>
//               </ListGroup.Item>
//             ))
//           ) : (
//             <ListGroup.Item className="text-center text-muted p-3">
//               No new appointment requests.
//             </ListGroup.Item>
//           )}
//         </ListGroup>
//        }
//       </Card>
//     </Container>
//   );
// }

// export default DoctorDashboard;
// frontend/src/pages/DoctorDashboard.jsx

import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap'; 
import { Container, Row, Col, Card, Badge, ListGroup, Button, Alert } from 'react-bootstrap';
import { FaUserInjured, FaCalendarCheck } from 'react-icons/fa';
import axios from 'axios';

function DoctorDashboard() {
  const [userInfo, setUserInfo] = useState(null);
  const [appointments, setAppointments] = useState([]);
  // State to manage date and time for each appointment approval
  const [appointmentDetails, setAppointmentDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // No changes needed in this useEffect block
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
        
        if (Array.isArray(data)) {
            setAppointments(data);
        } else {
            setAppointments([]); 
            console.warn("API did not return an array for appointments:", data);
        }

      } catch (err) {
        setError('Failed to fetch appointments.');
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Handler to update the date and time state for a specific appointment
  const handleDetailChange = (appointmentId, field, value) => {
    setAppointmentDetails(prev => ({
        ...prev,
        [appointmentId]: {
            ...prev[appointmentId],
            [field]: value
        }
    }));
  };
  
  // MODIFIED: handleApprove now reads date/time from state
  const handleApprove = async (appointmentId) => {
    if (!userInfo) return;

    const details = appointmentDetails[appointmentId];

    // Validate that date and time have been entered
    if (!details || !details.date || !details.time) {
        alert('Please select a date and time for the appointment before approving.');
        return;
    }

    try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        
        // Send the selected date and time in the request payload
        const { data } = await axios.put(
            `/api/appointments/${appointmentId}`, 
            { 
                status: 'Confirmed', 
                appointmentDate: details.date, 
                appointmentTime: details.time 
            },
            config
        );
        
        // Update the main appointments list to reflect the change
        setAppointments(prevAppointments => 
            prevAppointments.map(app => app._id === appointmentId ? data : app)
        );

        // Optional: Clear the details for the approved appointment from the temporary state
        setAppointmentDetails(prev => {
            const newDetails = { ...prev };
            delete newDetails[appointmentId];
            return newDetails;
        });

    } catch (err) {
        alert('Could not update the appointment. Please try again.');
        console.error("Failed to approve appointment:", err);
    }
  };


  const pendingRequests = appointments.filter(a => a.status === 'Pending');
  const confirmedCount = appointments.filter(a => a.status === 'Confirmed').length;

  return (
    <Container className="py-5">
      <h2 className="mb-4">Doctor Dashboard</h2>
      <p className="text-muted mb-5">Welcome, Dr. {userInfo?.name}. Manage your patient consultations.</p>

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
            <Card.Body className="d-flex flex-column justify-content-center">
              <FaCalendarCheck size={40} className="text-success mb-3" />
              <Card.Title>Confirmed Appointments</Card.Title>
              <Card.Text>
                You have {confirmedCount} confirmed appointments.
              </Card.Text>
              <LinkContainer to="/doctor/schedule">
                <Button variant="success" className="mt-2">View Schedule</Button>
              </LinkContainer>
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
                <div className='py-2 me-3'>
                  <strong>{app.patient?.name || 'Unknown Patient'}</strong>
                  <p className="mb-1 text-muted">Problem: {app.problemDescription}</p>
                  <small>Requested on: {new Date(app.createdAt).toLocaleDateString()}</small>
                </div>

                {/* MODIFIED: Added inputs for date/time and grouped actions */}
                <div className='py-2 d-flex align-items-center flex-wrap'>
                  <div className="me-3">
                    <input 
                      type="date"
                      className="form-control form-control-sm mb-1"
                      aria-label="Appointment Date"
                      min={new Date().toISOString().split("T")[0]} // Prevent selecting past dates
                      value={appointmentDetails[app._id]?.date || ''}
                      onChange={(e) => handleDetailChange(app._id, 'date', e.target.value)}
                    />
                    <input 
                      type="time"
                      className="form-control form-control-sm"
                      aria-label="Appointment Time"
                      value={appointmentDetails[app._id]?.time || ''}
                      onChange={(e) => handleDetailChange(app._id, 'time', e.target.value)}
                    />
                  </div>
                  <div className="d-flex flex-nowrap">
                    <Button variant="success" size="sm" className="me-2" onClick={() => handleApprove(app._id)}>Approve</Button>
                    <Button variant="outline-danger" size="sm">Decline</Button>
                  </div>
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


//doctor dashboard