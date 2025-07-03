// src/pages/DashboardPage.jsx
import React from 'react';
import { Card, Table, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const patientData = { name: 'John Doe', email: 'john.doe@example.com', memberSince: '2023-01-15' };
const prescriptions = [
  { id: 1, date: '2024-05-20', drug: 'Lisinopril 10mg', doctor: 'Dr. Williams', notes: 'Take one daily with food.' },
  { id: 2, date: '2024-04-12', drug: 'Amoxicillin 500mg', doctor: 'Dr. Johnson', notes: 'Finish the entire course.' },
];

function DashboardPage() {
  return (
    <div>
      <h2>Patient Dashboard</h2>
      <Row className="mb-4">
        <Col md={4}>
          <Card>
            <Card.Header as="h5">Patient Information</Card.Header>
            <Card.Body>
              <p><strong>Name:</strong> {patientData.name}</p>
              <p><strong>Email:</strong> {patientData.email}</p>
              <p><strong>Member Since:</strong> {patientData.memberSince}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card>
            <Card.Header as="h5">Virtual Reality Experience</Card.Header>
            <Card.Body>
              <Card.Text>Explore a calming virtual environment or view medical models in VR. Requires a compatible VR headset.</Card.Text>
              <Button as={Link} to="/vr-experience" variant="info">Launch VR Experience</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <h3>Prescription Details</h3>
      <Card>
        <Table striped bordered hover responsive>
          <thead><tr><th>Date</th><th>Drug</th><th>Prescribed By</th><th>Notes</th></tr></thead>
          <tbody>
            {prescriptions.map(p => (
              <tr key={p.id}><td>{p.date}</td><td>{p.drug}</td><td>{p.doctor}</td><td>{p.notes}</td></tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}

export default DashboardPage;