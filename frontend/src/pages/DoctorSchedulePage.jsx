
// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import { Container, Table, Alert, Spinner, Button } from 'react-bootstrap';

// const DoctorSchedulePage = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   const { userInfo } = useSelector((state) => state.auth);

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         setLoading(true);
//         const config = {
//           headers: {
//             Authorization: `Bearer ${userInfo.token}`,
//           },
//         };

//         const { data } = await axios.get('/api/appointments/doctor/confirmed', config);
//         setAppointments(data);
//         setLoading(false);
//       } catch (err) {
//         setError(err.response?.data?.message || err.message);
//         setLoading(false);
//       }
//     };

//     if (userInfo) {
//       fetchAppointments();
//     }
//   }, [userInfo]);

//   const handleJoinCall = (appointmentId) => {
//     // Replace this with your actual video call logic, such as navigation or popup
//     alert(`Joining call for appointment ID: ${appointmentId}`);
//     // e.g., navigate(`/video-call/${appointmentId}`);
//   };

//   return (
//     <Container className="mt-5">
//       <h2>My Schedule (Confirmed Appointments)</h2>
//       {loading ? (
//         <div className="text-center">
//           <Spinner animation="border" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </Spinner>
//         </div>
//       ) : error ? (
//         <Alert variant="danger">{error}</Alert>
//       ) : appointments.length === 0 ? (
//         <Alert variant="info">You have no confirmed appointments in your schedule.</Alert>
//       ) : (
//         <Table striped bordered hover responsive className="mt-4">
//           <thead>
//             <tr>
//               <th>Patient Name</th>
//               <th>Date</th>
//               <th>Time</th>
//               <th>Problem Description</th>
//               <th>Action</th> {/* New Column */}
//             </tr>
//           </thead>
//           <tbody>
//             {appointments.map((appt) => (
//               <tr key={appt._id}>
//                 <td>{appt.patient?.name || 'N/A'}</td>
//                 <td>{new Date(appt.appointmentDate).toLocaleDateString()}</td>
//                 <td>{appt.appointmentTime}</td>
//                 <td>{appt.problemDescription}</td>
//                 <td>
//                   <Button
//                     variant="success"
//                     onClick={() => handleJoinCall(appt._id)}
//                   >
//                     Join Call
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       )}
//     </Container>
//   );
// };

// export default DoctorSchedulePage;


// src/pages/DoctorSchedulePage.js
// Changes are highlighted with comments

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Container, Table, Alert, Spinner, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate

const DoctorSchedulePage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate(); // 2. Initialize useNavigate

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const { data } = await axios.get('/api/appointments/doctor/confirmed', config);
        setAppointments(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    if (userInfo) {
      fetchAppointments();
    }
  }, [userInfo]);

  // 3. Update the handleJoinCall function
  const handleJoinCall = (appointmentId) => {
    // Navigate to the dedicated call page for the doctor
    navigate(`/doctor/call/${appointmentId}`);
  };

  return (
    <Container className="mt-5">
      <h2>My Schedule (Confirmed Appointments)</h2>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : appointments.length === 0 ? (
        <Alert variant="info">You have no confirmed appointments in your schedule.</Alert>
      ) : (
        <Table striped bordered hover responsive className="mt-4">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Problem Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt._id}>
                <td>{appt.patient?.name || 'N/A'}</td>
                <td>{new Date(appt.appointmentDate).toLocaleDateString()}</td>
                <td>{appt.appointmentTime}</td>
                <td>{appt.problemDescription}</td>
                <td>
                  <Button
                    variant="success"
                    onClick={() => handleJoinCall(appt._id)}
                  >
                    Join Call
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default DoctorSchedulePage;