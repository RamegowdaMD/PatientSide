import React from 'react';
import { Card } from 'react-bootstrap';

function DoctorDashboardPage() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    return (
        <div>
            <h2>Doctor Dashboard</h2>
            <Card>
                <Card.Header as="h5">Welcome, Dr. {userInfo ? userInfo.name : 'Doctor'}!</Card.Header>
                <Card.Body>
                    <Card.Text>
                        This is your dashboard. Here you will be able to manage your appointments,
                        view patient records, and write prescriptions.
                    </Card.Text>
                </Card.Body>
            </Card>
            {/* Add components for managing appointments, patients etc. here */}
        </div>
    );
}

export default DoctorDashboardPage;