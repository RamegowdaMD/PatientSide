// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

// Import your components and pages
import AppNavbar from './components/AppNavbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import DoctorDashboardPage from './pages/DoctorDashboardPage';
// import VRPage from './pages/VRPage';

// Import the base App CSS if you have custom styles
import './App.css';

function App() {
  return (
    <>
      <AppNavbar />
      <Container className="my-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          {/* <Route path="/vr-experience" element={<VRPage />} /> */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboardPage />} /> 
        </Routes>
      </Container>
    </>
  );
}

export default App;