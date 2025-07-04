import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown, Form, Button, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
// npm install react-icons
import { FaSearch, FaUserCircle } from 'react-icons/fa';

function AppNavbar() {
  const [userInfo, setUserInfo] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    setUserInfo(null);
    navigate('/login');
  };
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${searchQuery}`);
    } else {
      navigate('/');
    }
  };

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm py-2 sticky-top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand-custom">
          VR HealthConnect
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form onSubmit={handleSearchSubmit} className="d-flex flex-grow-1 my-2 my-lg-0 mx-lg-5 search-bar-form">
            <InputGroup>
              <Form.Control
                type="search"
                placeholder="Search for doctors, medicines..."
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <InputGroup.Text>
                  <FaSearch />
              </InputGroup.Text>
            </InputGroup>
          </Form>
          

          <Nav className="ms-auto align-items-center">
            <Link to="https://medease-frontend-sigma.vercel.app/" size={22} className="me-2 fw-bold "  style={{ color: "black", opacity: 0.6, textDecoration: "none" }}>Pharmacy</Link>
            {userInfo ? (
              <NavDropdown 
                title={
                  <>
                    <FaUserCircle size={22} className="me-2 " style={{ color: 'var(--primary-color)'}} />
                    {userInfo.name}
                  </>
                } 
                id="username"
              >
                <NavDropdown.Item as={Link} to={userInfo.role === 'doctor' ? '/doctor-dashboard' : '/dashboard'}>
                  My Dashboard
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
            <>
              <Nav.Link as={Link} to="/login" className="fw-bold">
                <FaUserCircle className="me-1" /> Login
              </Nav.Link>
              <Nav.Link as={Link} to="/register" className="fw-bold">
                <FaUserCircle className="me-1" /> Sign Up
              </Nav.Link>
            </>
              
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;