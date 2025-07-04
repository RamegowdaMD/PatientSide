// // import React, { useState, useEffect } from 'react';
// // import { Button, Card, Row, Col, Container, Form, InputGroup } from 'react-bootstrap';
// // import { useSearchParams, Link, useNavigate } from 'react-router-dom';
// // import { FaStethoscope, FaPills, FaFlask, FaNewspaper, FaSearch } from 'react-icons/fa';

// // const mockDoctors = [
// //   { id: 1, name: 'Dr. Alice Williams', specialty: 'Cardiology', image: 'https://i.pravatar.cc/300?u=doc1', rating: 4.8 },
// //   { id: 2, name: 'Dr. Bob Johnson', specialty: 'Dermatology', image: 'https://i.pravatar.cc/300?u=doc2', rating: 4.9 },
// //   { id: 3, name: 'Dr. Carol White', specialty: 'Neurology', image: 'https://i.pravatar.cc/300?u=doc3', rating: 4.7 },
// //   { id: 4, name: 'Dr. David Green', specialty: 'Pediatrics', image: 'https://i.pravatar.cc/300?u=doc4', rating: 4.9 },
// // ];

// // const services = [
// //     { title: "Doctor Consultation", icon: <FaStethoscope size={30} />, link: "/doctors" },
// //     { title: "Order Medicines", icon: <FaPills size={30} />, link: "/medicines" },
// //     { title: "Lab Tests", icon: <FaFlask size={30} />, link: "/lab-tests" },
// //     { title: "Health Articles", icon: <FaNewspaper size={30} />, link: "/articles" },
// // ];

// // function HomePage() {
// //   const [filteredDoctors, setFilteredDoctors] = useState(mockDoctors);
// //   const [searchParams] = useSearchParams();
  
// //   useEffect(() => {
// //     const searchQuery = searchParams.get('search');
// //     document.title = "HealthConnect | Your Health, Our Priority"; // Set page title
// //     if (searchQuery) {
// //       const filtered = mockDoctors.filter(doctor =>
// //         doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //         doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
// //       );
// //       setFilteredDoctors(filtered);
// //     } else {
// //       setFilteredDoctors(mockDoctors);
// //     }
// //   }, [searchParams]);

// //   return (
// //     <Container className="py-4">
// //       {/* Hero Section */}
// //       <Card className="p-4 p-md-5 mb-5 text-center border-0 shadow-sm" style={{ backgroundColor: 'white' }}>
// //           <Row className="align-items-center">
// //               <Col md={6}>
// //                   <h1 className="display-5 fw-bold" style={{ color: 'var(--primary-color)'}}>Your Health, Delivered.</h1>
// //                   <p className="fs-5 text-muted">Consult with top doctors online, instantly.</p>
// //               </Col>
// //               <Col md={6}>
// //                   <img src="/doctor_illustration.svg" alt="Doctors" style={{ maxWidth: '300px' }} />
// //                   {/* You can find a similar SVG from sites like undraw.co */}
// //               </Col>
// //           </Row>
// //       </Card>
      
// //       {/* Services Section */}
// //       <Row className="mb-5 g-4">
// //         {services.map((service, index) => (
// //           <Col md={6} lg={3} key={index}>
// //             <Card as={Link} to={service.link} className="h-100 text-decoration-none service-card">
// //               <Card.Body className="d-flex align-items-center">
// //                 <div className="me-3 text-primary">{service.icon}</div>
// //                 <h5 className="mb-0 text-dark">{service.title}</h5>
// //               </Card.Body>
// //             </Card>
// //           </Col>
// //         ))}
// //       </Row>
      
// //       {/* Doctors Section */}
// //       <div className="d-flex justify-content-between align-items-center mb-4">
// //         <h2 className="mb-0">{searchParams.get('search') ? 'Search Results' : 'Top Rated Doctors'}</h2>
// //         <Button variant="outline-primary">View All</Button>
// //       </div>
// //       <Row>
// //         {filteredDoctors.length > 0 ? filteredDoctors.map(doctor => (
// //           <Col md={6} lg={3} key={doctor.id} className="mb-4">
// //             <Card className="h-100 text-start doctor-card">
// //               <Card.Img variant="top" src={doctor.image} />
// //               <Card.Body className="d-flex flex-column">
// //                 <Card.Title className="fw-bold">{doctor.name}</Card.Title>
// //                 <Card.Subtitle className="mb-2 text-muted">{doctor.specialty}</Card.Subtitle>
// //                 <div className="mt-auto">
// //                     <div className="d-flex justify-content-between align-items-center mb-3">
// //                         <span className="fw-bold" style={{color: '#f0ad4e'}}>⭐ {doctor.rating}</span>
// //                     </div>
// //                     <Button variant="accent" className="w-100 btn-accent">Book Consultation</Button>
// //                 </div>
// //               </Card.Body>
// //             </Card>
// //           </Col>
// //         )) : (
// //            <p className="text-center text-muted">No doctors found. Try a different search term.</p>
// //         )}
// //       </Row>
// //     </Container>
// //   );
// // }

// // export default HomePage;


// // HomePage.js

// import React, { useState, useEffect } from 'react';
// // ... other imports
// import { Link, useNavigate, useSearchParams } from 'react-router-dom';
// import { Container, Row, Col, Card, Button } from 'react-bootstrap';
// import axios from 'axios'; // Import axios

// function HomePage() {
//   const [doctors, setDoctors] = useState([]); // State for real doctors
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     document.title = "HealthConnect | Your Health, Our Priority";

//     const fetchDoctors = async () => {
//       try {
//         setLoading(true);
//         const { data } = await axios.get('/api/users/doctors');
        
//         const searchQuery = searchParams.get('search');
//         if (searchQuery) {
//           const filtered = data.filter(doctor =>
//             doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             (doctor.specialty && doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()))
//           );
//           setDoctors(filtered);
//         } else {
//           setDoctors(data);
//         }
//         setError('');
//       } catch (err) {
//         setError('Could not fetch doctors. Please try again later.');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDoctors();
//   }, [searchParams]);

//   // Handle click on "Book Consultation"
//   const handleBookingClick = (doctorId) => {
//       navigate(`/book-appointment/${doctorId}`);
//   };

//   return (
//     <Container className="py-4">
//       {/* ... Hero and Services sections are fine ... */}
      
//       {/* Doctors Section - Modified */}
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2 className="mb-0">{searchParams.get('search') ? 'Search Results' : 'Top Rated Doctors'}</h2>
//         <Button variant="outline-primary">View All</Button>
//       </div>
//       <Row>
//         {loading ? (
//           <p>Loading doctors...</p>
//         ) : error ? (
//           <p className="text-danger">{error}</p>
//         ) : doctors.length > 0 ? (
//           doctors.map(doctor => (
//             <Col md={6} lg={3} key={doctor._id} className="mb-4">
//               <Card className="h-100 text-start doctor-card">
//                 {/* Note: Use a placeholder if doctor.image doesn't exist yet */}
//                 <Card.Img variant="top" src={doctor.image || `https://i.pravatar.cc/300?u=${doctor._id}`} />
//                 <Card.Body className="d-flex flex-column">
//                   <Card.Title className="fw-bold">{doctor.name}</Card.Title>
//                   {/* You might need to add 'specialty' to your doctor registration process */}
//                   <Card.Subtitle className="mb-2 text-muted">{doctor.specialty || 'General Physician'}</Card.Subtitle>
//                   <div className="mt-auto">
//                     <div className="d-flex justify-content-between align-items-center mb-3">
//                       <span className="fw-bold" style={{color: '#f0ad4e'}}>⭐ {doctor.rating || '4.5'}</span>
//                     </div>
//                     {/* MODIFIED BUTTON */}
//                     <Button 
//                         variant="accent" 
//                         className="w-100 btn-accent" 
//                         onClick={() => handleBookingClick(doctor._id)}
//                     >
//                         Book Consultation
//                     </Button>
//                   </div>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))
//         ) : (
//            <p className="text-center text-muted">No doctors found. Try a different search term.</p>
//         )}
//       </Row>
//     </Container>
//   );
// }

// export default HomePage;



// frontend/src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

function HomePage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/users/doctors'); // ✅ Correct route
  
        const doctorList = Array.isArray(data) ? data : [];
        const searchQuery = searchParams.get('search');
  
        const filteredDoctors = searchQuery
          ? doctorList.filter(doctor =>
              doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              (doctor.specialty?.toLowerCase().includes(searchQuery.toLowerCase()))
            )
          : doctorList;
  
        setDoctors(filteredDoctors);
        setError('');
      } catch (err) {
        console.error(err);
        setError('Could not fetch doctors. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchDoctors();
  }, [searchParams]);
  

  const handleBookingClick = (doctorId) => {
    navigate(`/book-appointment/${doctorId}`);
  };

  return (
    <Container className="py-4">
      {/* You can add your Hero and Services sections back here if you wish */}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">{searchParams.get('search') ? 'Search Results' : 'Top Rated Doctors'}</h2>
        <Button variant="outline-primary">View All</Button>
      </div>

      <Row>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading doctors...</span>
            </Spinner>
          </div>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : doctors.length > 0 ? (
          doctors.map(doctor => (
            <Col md={6} lg={3} key={doctor._id} className="mb-4">
              <Card className="h-100 text-start doctor-card">
                <Card.Img
                  variant="top"
                  src={doctor.image || `https://i.pravatar.cc/300?u=${doctor._id}`}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fw-bold">{doctor.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{doctor.specialty || 'General Physician'}</Card.Subtitle>
                  <div className="mt-auto">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="fw-bold" style={{ color: '#f0ad4e' }}>
                        ⭐ {doctor.rating || '4.5'}
                      </span>
                    </div>
                    <Button
                      variant="primary" // Changed to primary for better visibility
                      className="w-100"
                      onClick={() => handleBookingClick(doctor._id)}
                    >
                      Book Consultation
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center text-muted">No doctors found.</p>
        )}
      </Row> 
    </Container>
  );
}

export default HomePage;