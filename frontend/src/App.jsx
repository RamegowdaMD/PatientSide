

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Container } from 'react-bootstrap';

// // Import your components and pages
// import AppNavbar from './components/AppNavbar';
// import HomePage from './pages/HomePage';
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import BookingPage from './pages/BookingPage';
// import PatientDashboard from './pages/PatientDashboard'; // Import new
// import DoctorDashboard from './pages/DoctorDashboard';   // Import new
// import ProtectedRoute, { DoctorRoute } from './components/ProtectedRoute'; // Import protectors

// // Import the CSS
// import './App.css';

// function App() {
//   return (
// <>
//       <AppNavbar />
//       <main>
//         {/* We remove the Container from here to allow pages to control their own layout (e.g. fluid containers) */}
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<HomePage />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/register" element={<RegisterPage />} />

//           {/* Protected Patient Route */}
//           <Route 
//             path="/dashboard" 
//             element={
//               <ProtectedRoute>
//                 <PatientDashboard />
//               </ProtectedRoute>
//             } 
//           />

// <Route 
//     path="/book-appointment/:doctorId" 
//     element={
//         <ProtectedRoute>
//             <BookingPage />
//         </ProtectedRoute>
//     } 
// />
          
//           {/* Protected Doctor Route */}
//           <Route 
//             path="/doctor-dashboard" 
//             element={
//               <DoctorRoute>
//                 <DoctorDashboard />
//               </DoctorRoute>
//             } 
//           />
          
//           {/* Add a fallback route for any other path */}
//           <Route path="*" element={<HomePage />} /> 
//         </Routes>
//       </main>
//       </>
//   );
// }

// export default App;

// frontend/src/App.jsx

// import React from 'react';
// import { Routes, Route } from 'react-router-dom';

// // Import your components and pages
// import AppNavbar from './components/AppNavbar';
// import HomePage from './pages/HomePage';
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import BookingPage from './pages/BookingPage';
// import PatientDashboard from './pages/PatientDashboard';
// import DoctorDashboard from './pages/DoctorDashboard';
// // IMPORT THE NEW PAGE
// import DoctorSchedulePage from './pages/DoctorSchedulePage'; 
// import ProtectedRoute, { DoctorRoute } from './components/ProtectedRoute';

// // Import the CSS
// import './App.css';

// function App() {
//   return (
//     <>
//       <AppNavbar />
//       <main>
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<HomePage />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/register" element={<RegisterPage />} />

//           {/* Protected Patient Route */}
//           <Route 
//             path="/dashboard" 
//             element={
//               <ProtectedRoute>
//                 <PatientDashboard />
//               </ProtectedRoute>
//             } 
//           />
//           <Route 
//             path="/book-appointment/:doctorId" 
//             element={
//                 <ProtectedRoute>
//                     <BookingPage />
//                 </ProtectedRoute>
//             } 
//           />
          
//           {/* Protected Doctor Route */}
//           <Route 
//             path="/doctor-dashboard" 
//             element={
//               <DoctorRoute>
//                 <DoctorDashboard />
//               </DoctorRoute>
//             } 
//           />
          
//           {/* === ADD THIS NEW ROUTE FOR THE DOCTOR'S SCHEDULE === */}
//           <Route 
//             path="/doctor/schedule" 
//             element={
//               <DoctorRoute>
//                 <DoctorSchedulePage />
//               </DoctorRoute>
//             } 
//           />
          
//           {/* Fallback route */}
//           <Route path="*" element={<HomePage />} /> 
//         </Routes>
//       </main>
//     </>
//   );
// }

// export default App;



// frontend/src/App.jsx

import React from 'react';
// We ONLY import Routes and Route here. NO BrowserRouter!
import { Routes, Route } from 'react-router-dom';

// Import your components and pages
import AppNavbar from './components/AppNavbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BookingPage from './pages/BookingPage';
import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import DoctorSchedulePage from './pages/DoctorSchedulePage'; // Make sure this is imported
import ProtectedRoute, { DoctorRoute } from './components/ProtectedRoute';

// Import the CSS
import './App.css';

function App() {
  // This component now lives INSIDE the BrowserRouter from main.jsx
  return (
    <>
      <AppNavbar />
      <main>
        {/* The Routes component will work perfectly now because it's within a Router context */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Patient Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><PatientDashboard /></ProtectedRoute>} />
          <Route path="/book-appointment/:doctorId" element={<ProtectedRoute><BookingPage /></ProtectedRoute>} />
          
          {/* Protected Doctor Routes */}
          <Route path="/doctor-dashboard" element={<DoctorRoute><DoctorDashboard /></DoctorRoute>} />
          <Route path="/doctor/schedule" element={<DoctorRoute><DoctorSchedulePage /></DoctorRoute>} />
          
          {/* Fallback route */}
          <Route path="*" element={<HomePage />} /> 
        </Routes>
      </main>
    </>
  );
}

export default App;