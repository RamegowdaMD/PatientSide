
// src/pages/DoctorCallPage.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Spinner, Alert, Form } from 'react-bootstrap';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { useSelector } from 'react-redux';
import { FaPhone, FaPhoneSlash, FaUser, FaStethoscope, FaFileMedical, FaBroadcastTower } from 'react-icons/fa';

// --- Agora Credentials - MUST MATCH YOUR WORKING UNITY APP ---
const AGORA_APP_ID = "4fcfc82cc31a4a9dbf53241ac8f3ac3b";
const STATIC_CHANNEL_NAME = "join"; // From your working HTML example
const AGORA_TOKEN = "007eJxTYNA8cfdv+kQb43mOus4v9pZ6MB+dMLclQzJN7smUdDOlKQkKDCZpyWnJFkbJycaGiSaJlilJaabGRiaGickWacaJycZJ5/ZkZDQEMjLwhZkwMjJAIIjPwpCVn5nHwAAAJ24evg=="; // From your working HTML example

const DoctorCallPage = () => {
  const { appointmentId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);

  // --- State Management ---
  const [appointment, setAppointment] = useState(null);
  const [prescriptionNotes, setPrescriptionNotes] = useState(''); // Simplified to a single notes field for now
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // State for call status - mirrors your HTML example
  const [isDoctorConnected, setIsDoctorConnected] = useState(false);
  const [isPatientConnected, setIsPatientConnected] = useState(false);

  // --- Refs for Agora objects that persist across re-renders ---
  const agoraClient = useRef(null);
  const localAudioTrack = useRef(null);

  // --- Data Fetching ---
  useEffect(() => {
    // This part is for displaying patient info and doesn't affect the call
    const fetchAppointmentDetails = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const { data } = await axios.get(`/api/appointments/${appointmentId}`, config);
        setAppointment(data);
        setPrescriptionNotes(data.notes || ''); // Assuming you might have a notes field
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch appointment details.');
      } finally {
        setLoading(false);
      }
    };
    if (userInfo && appointmentId) fetchAppointmentDetails();
  }, [appointmentId, userInfo]);


  // --- Call Logic - A direct translation of your working HTML/JS ---

  // 1. Initialize the Agora Client and set up listeners
  // We use a useCallback to ensure this function reference is stable
  const initializeAgoraClient = useCallback(() => {
    if (agoraClient.current) {
        console.log("Agora client already initialized.");
        return;
    }
    
    console.log("Initializing Agora Client...");
    const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    agoraClient.current = client;

    // Event for when the PATIENT joins and publishes audio
    client.on("user-published", async (user, mediaType) => {
        console.log(`EVENT: Patient (UID: ${user.uid}) published a stream of type: ${mediaType}`);
        await client.subscribe(user, mediaType);
        if (mediaType === "audio") {
            user.audioTrack.play();
            setIsPatientConnected(true);
            console.log("✅ Patient audio is playing. UI should update.");
        }
    });

    // Event for when the PATIENT leaves
    client.on("user-left", (user) => {
        console.log(`EVENT: Patient (UID: ${user.uid}) has left.`);
        setIsPatientConnected(false);
    });

  }, []);

  // Effect to initialize the client once on component mount
  useEffect(() => {
    initializeAgoraClient();
  }, [initializeAgoraClient]);

  // 2. Doctor Joins the Call
  const handleJoinCall = async () => {
    if (!agoraClient.current) {
        console.error("Agora client is not initialized.");
        setError("Cannot join call, client not ready.");
        return;
    }
    try {
        setError('');
        // Join the channel
        await agoraClient.current.join(AGORA_APP_ID, STATIC_CHANNEL_NAME, AGORA_TOKEN, null);

        // Create and publish local audio track
        const track = await AgoraRTC.createMicrophoneAudioTrack();
        localAudioTrack.current = track; // Store reference to the track
        await agoraClient.current.publish([track]);

        // Update state to reflect connection
        setIsDoctorConnected(true);
        console.log("Doctor has joined and published audio successfully.");
    } catch (err) {
        console.error("Failed to join call", err);
        setError(`Failed to join call: ${err.message}`);
    }
  };

  // 3. Doctor Leaves the Call
  const handleLeaveCall = async () => {
    // Release the microphone track
    if (localAudioTrack.current) {
        localAudioTrack.current.stop();
        localAudioTrack.current.close();
        localAudioTrack.current = null;
    }
    // Leave the Agora channel
    if (agoraClient.current) {
        await agoraClient.current.leave();
    }
    // Reset all status states
    setIsDoctorConnected(false);
    setIsPatientConnected(false);
    console.log("Doctor has left the channel.");
  };

  // Cleanup effect to automatically leave call when component unmounts
  useEffect(() => {
    return () => {
        if (isDoctorConnected) {
            handleLeaveCall();
        }
    }
  }, [isDoctorConnected]);

  // Function to save prescription notes (you can expand this later)
  const handleSavePrescription = async () => {
      // Your backend logic here...
  };

  // --- Render Logic ---
  if (loading) return <Container className="text-center py-5"><Spinner animation="border" /></Container>;
  if (!appointment && !loading) return <Container className="py-5"><Alert variant="danger">{error || 'Appointment not found.'}</Alert></Container>;

  return (
    <Container className="py-5">
      <Link to="/doctor/schedule" className="btn btn-light mb-4">← Back to Schedule</Link>
      {error && <Alert variant="danger" className="mt-2">{error}</Alert>}
      <Row>
        {/* Left Column: Patient Info & Call Controls */}
        <Col md={5}>
          <Card className="mb-4">
            <Card.Header as="h5"><FaUser className="me-2" /> Patient Information</Card.Header>
            <Card.Body>
              <Card.Title>{appointment?.patient?.name}</Card.Title>
              <Card.Text>
                <strong className="d-block mb-2"><FaStethoscope className="me-2" />Problem:</strong>
                {appointment?.problemDescription}
              </Card.Text>
            </Card.Body>
          </Card>
          
          {/* This Card exactly mirrors the UI state from your HTML example */}
          <Card className="text-center">
            <Card.Header as="h5"><FaBroadcastTower className="me-2" /> Consultation Controls</Card.Header>
            <Card.Body>
              <div className="d-grid gap-2">
                {!isDoctorConnected ? (
                  <Button variant="success" size="lg" onClick={handleJoinCall}>
                    <FaPhone className="me-2" /> Join Call
                  </Button>
                ) : (
                  <Button variant="danger" size="lg" onClick={handleLeaveCall}>
                    <FaPhoneSlash className="me-2" /> Leave Call
                  </Button>
                )}
              </div>
              <hr/>
              {/* Doctor's own status */}
              <Alert variant={isDoctorConnected ? 'success' : 'secondary'}>
                  <strong>Your Status:</strong> {isDoctorConnected ? "Connected" : "Not Connected"}
              </Alert>
              {/* Patient's status - only shown if the doctor is connected */}
              {isDoctorConnected && (
                <Alert variant={isPatientConnected ? 'success' : 'warning'}>
                    <strong>Patient Status:</strong> {isPatientConnected ? "Patient is in the call" : "Waiting for patient..."}
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Right Column: Prescription Box (Simplified) */}
        <Col md={7}>
          <Card>
            <Card.Header as="h5"><FaFileMedical className="me-2" /> Prescription Notes</Card.Header>
            <Card.Body>
              <Form onSubmit={(e) => { e.preventDefault(); handleSavePrescription(); }}>
                <Form.Group controlId="prescriptionNotes">
                  <Form.Label>Enter notes for this consultation:</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={15}
                    value={prescriptionNotes}
                    onChange={(e) => setPrescriptionNotes(e.target.value)}
                    placeholder="e.g., Patient reported symptoms started 3 days ago..."
                    disabled={!isDoctorConnected} // Only enable when in a call
                  />
                </Form.Group>
                <Button 
                  variant="primary" 
                  type="submit" 
                  className="mt-3" 
                  disabled={!isDoctorConnected || !prescriptionNotes.trim()}
                >
                  Save Notes
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DoctorCallPage;