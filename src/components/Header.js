import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import logo from "../assets/logo-1.png";
import logodark from "../assets/logo.png";
import { Navbar, Nav, Button, Container, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'; // logout icon
import "./header.css";

const Header = ({ handleShow }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userRole, setUserRole] = useState(null); // State for storing the role
  const dropdownRef = useRef(null);

  // Check login state on mount and set user role
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
      const parsedUser = JSON.parse(user);
      setUserRole(parsedUser.userType); // assuming userType is stored in the user object
    } else {
      setIsLoggedIn(false);
      setUserRole(null);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserRole(null); // Reset userRole on logout
    navigate("/"); // Navigate to home or login page
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 150);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (isOpen) => setDropdownOpen(isOpen);

  const isSignupPage = location.pathname === "/signup";
  const isLandingPage = location.pathname === "/";
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <Navbar
      expand="lg"
      fixed="top"
      style={
        isScrolled || !isLandingPage
          ? { boxShadow: "0px 0px 14px rgba(0,0,0,0.3)" }
          : {}
      }
      className={`navbar ${isLandingPage ? "fixed-top" : "position-relative bg-white text-black"} 
        ${isScrolled ? "navbar-light bg-white text-black animate" : "bg-transparent text-white"}`}
    >
      <Container>
        {/* Logo */}
        <Navbar.Brand href="/">
          <img
            src={isLandingPage && !isScrolled ? logo : logodark}
            className="logo-img"
            alt="Company Logo"
          />
        </Navbar.Brand>

        {/* Mobile Toggle */}
        <Navbar.Toggle aria-controls="navbar-nav" className="border-0" />

        <Navbar.Collapse id="navbar-nav" className="justify-content-center">
          <Nav className="align-items-center">
            {/* <Nav.Link
              as={Link}
              to="/"
              className={isLandingPage && !isScrolled ? "text-white" : "text-black"}
            >
              Home
            </Nav.Link> */}
            <Nav.Link
              as={Link}
              to="/about"
              className={isLandingPage && !isScrolled ? "text-white" : "text-black"}
            >
              About
            </Nav.Link>

            {/* Courses Dropdown */}
            <Dropdown
              ref={dropdownRef}
              show={dropdownOpen}
              onToggle={toggleDropdown}
            >
              <Dropdown.Toggle
                variant="link"
                className={`nav-link dropdown-toggle ${isLandingPage && !isScrolled ? "text-white" : "text-black"}`}
              >
                All Courses
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/courses?course=machineLearning">
                  Machine Learning
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/courses?course=deepLearning">
                  Deep Learning
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/courses?course=generativeAi">
                  Generative AI
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/courses?course=dataAnalytics">
                  Data Analytics
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/courses?course=neuralNetworks">
                  Neural Networks
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Nav.Link
              as={Link}
              to="/blog"
              className={isLandingPage && !isScrolled ? "text-white" : "text-black"}
            >
              Blog
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/contact"
              className={isLandingPage && !isScrolled ? "text-white" : "text-black"}
            >
              Contact Us
            </Nav.Link>

            {/* Conditional Dashboard Link based on user role */}
            {isLoggedIn && userRole && (
              <Nav.Link
                as={Link}
                to={
                  userRole === "Admin"
                    ? "/admin"
                    : userRole === "Student"
                    ? "/student"
                    : userRole === "Faculty"
                    ? "/faculty"
                    : "/"
                }
                className={isLandingPage && !isScrolled ? "text-white" : "text-black"}
              >
                Dashboard
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>

        {/* Auth Buttons */}
        <div className="d-flex align-items-center">
          {isLoggedIn ? (
            <Button
              variant={isLandingPage && !isScrolled ? "outline-light" : "blueHeaderBtn"}
              onClick={handleLogout}
            >
              <FontAwesomeIcon icon={faRightFromBracket} className="me-2" />
              Logout
            </Button>
          ) : (
            <>
              {!isAdminPage && (
                <>
                  <Button
                    variant={isLandingPage && !isScrolled ? "outline-light" : "blueHeaderBtn"}
                    className="me-2"
                    onClick={handleShow}
                  >
                    Login
                  </Button>
                  <Button
                    variant={isLandingPage && !isScrolled ? "outline-light" : "blueHeaderBtn"}
                    onClick={() => navigate("/signup")}
                  >
                    Sign up
                  </Button>
                </>
              )}
            </>
          )}
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
