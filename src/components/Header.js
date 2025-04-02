import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo-1.png";
import logodark from "../assets/logo.png";
import { Navbar, Nav, Button, Container, Dropdown } from "react-bootstrap";
import "./header.css";

const Header = ({ handleShow }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const isSignupPage = location.pathname === "/signup";
  const isLandingPage = location.pathname === "/";
  return (
    <Navbar
      expand="lg"
      fixed="top"
      className={`navbar ${isLandingPage ? "fixed-top" : "position-relative bg-white text-black"}
      ${isScrolled ? "navbar-light bg-white text-black animate" : "bg-transparent text-white"}`}
    >
      <Container>
        {/* Logo on the left */}
        <Navbar.Brand href="/">
          <img
            src={isLandingPage && !isScrolled ?  logo : logodark}
            className="logo-img"
            alt="Company Logo"
          />
        </Navbar.Brand>

        {/* Navbar Toggle for Mobile */}
        <Navbar.Toggle aria-controls="navbar-nav" className="border-0" />

        <Navbar.Collapse id="navbar-nav" className="justify-content-center">
          <Nav className="align-items-center">
            <Nav.Link  href="" className={isLandingPage && !isScrolled ? "text-white" : "text-black"} >
              Home
            </Nav.Link>
            <Nav.Link href="#" className={isLandingPage && !isScrolled ? "text-white" : "text-black"}>
              About
            </Nav.Link>

            {/* AI Concepts Dropdown */}
            <Dropdown ref={dropdownRef} show={dropdownOpen} onToggle={toggleDropdown}>
              <Dropdown.Toggle
                variant="link"
                className={`nav-link dropdown-toggle ${isLandingPage  && !isScrolled ? "text-white" : "text-black"}`}
              >
                AI Concepts
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#">Machine Learning</Dropdown.Item>
                <Dropdown.Item href="#">Deep Learning</Dropdown.Item>
                <Dropdown.Item href="#">Generative AI</Dropdown.Item>
                <Dropdown.Item href="#">Data Analytics</Dropdown.Item>
                <Dropdown.Item href="#">Neural Networks</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Nav.Link href="#" className={isLandingPage  && !isScrolled ? "text-white" : "text-black"}>
              Blog
            </Nav.Link>
            <Nav.Link href="#" className={isLandingPage  && !isScrolled ? "text-white" : "text-black"}>
              Contact Us
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>

        {/* Buttons on the Right */}
        <div className="d-flex align-items-center">
          {!isLoggedIn && (
            <Button
              variant={isLandingPage && !isScrolled ? "outline-light" : " blueHeaderBtn"}
              className="me-2"
              onClick={handleShow}
            >
              Login
            </Button>
          )}
          <Button
            variant={isLandingPage && !isScrolled ? "outline-light" : " blueHeaderBtn"}
            onClick={() => navigate("/signup")}
          >
            Sign up
          </Button>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
