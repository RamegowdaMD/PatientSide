// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');


const userRoutes = require('./routes/userRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const prescriptionRoutes = require('./routes/prescriptionRoutes');
const vrRoutes = require('./routes/vrRoutes');
const  appointmentRoutes = require('./routes/appointmentRoutes')


dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Main Routes

// app.use('/api/doctors', doctorRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/vr', vrRoutes);
app.use('/api/users', userRoutes);
app.use('/api/appointments', appointmentRoutes);

// Simple test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));