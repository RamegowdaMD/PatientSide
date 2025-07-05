import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

// Import your components and pages
import AppNavbar from "./components/AppNavbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import BookingPage from "./pages/BookingPage";
import PatientDashboard from "./pages/PatientDashboard"; // Import new
import DoctorDashboard from "./pages/DoctorDashboard"; // Import new
import ProtectedRoute, { DoctorRoute } from "./components/ProtectedRoute"; // Import protectors
import AppointmentDetailsPage from "./pages/AppointmentDetailsPage";
import DoctorSchedulePage from "./pages/DoctorSchedulePage";
import DoctorCallPage from "./pages/DoctorCallPage";

// Import the CSS
import "./App.css";

function App() {
  return (
    <>
      <AppNavbar />
      <main>
        {/* We remove the Container from here to allow pages to control their own layout (e.g. fluid containers) */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Patient Route */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <PatientDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/book-appointment/:doctorId"
            element={
              <ProtectedRoute>
                <BookingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/appointment/:appointmentId"
            element={
              <ProtectedRoute>
                <AppointmentDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/schedule"
            element={
              <DoctorRoute>
                <DoctorSchedulePage />
              </DoctorRoute>
            }
          />

          {/* Protected Doctor Route */}
          <Route
            path="/doctor-dashboard"
            element={
              <DoctorRoute>
                <DoctorDashboard />
              </DoctorRoute>
            }
          />
          <Route
            path="/doctor/call/:appointmentId"
            element={<DoctorCallPage />}
          />

          {/* Add a fallback route for any other path */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
