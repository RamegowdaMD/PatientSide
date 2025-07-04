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