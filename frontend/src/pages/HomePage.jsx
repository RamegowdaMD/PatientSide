// src/pages/HomePage.jsx
import React, { useState } from 'react';
import { Form, Button, InputGroup, Card, Row, Col } from 'react-bootstrap';

const mockDoctors = [
  { id: 1, name: 'Dr. Alice Williams', specialty: 'Cardiology' },
  { id: 2, name: 'Dr. Bob Johnson', specialty: 'Dermatology' },
  { id: 3, name: 'Dr. Carol White', specialty: 'Neurology' },
];

function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState(mockDoctors);

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = mockDoctors.filter(doctor =>
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredDoctors(filtered);
  };

  return (
    <div>
      <div className="p-5 mb-4 bg-light rounded-3 text-center">
        <h1>Find Your Doctor & Book a Consultation</h1>
        <p>Search by name or specialty to find the right doctor for you.</p>
        <Form onSubmit={handleSearch}>
          <InputGroup className="mb-3 mx-auto" style={{ maxWidth: '600px' }}>
            <Form.Control
              placeholder="Search for doctors (e.g., 'Cardiology' or 'Dr. Alice')"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="primary" type="submit">Search</Button>
          </InputGroup>
        </Form>
      </div>

      <h2>Featured Doctors</h2>
      <Row>
        {filteredDoctors.map(doctor => (
          <Col md={4} key={doctor.id} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{doctor.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{doctor.specialty}</Card.Subtitle>
                <Card.Text>
                  Experienced and certified {doctor.specialty.toLowerCase()} specialist.
                </Card.Text>
                <Button variant="success">Book Consultation</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default HomePage;