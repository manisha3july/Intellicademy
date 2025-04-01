import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo-1.png";
import logodark from "../assets/logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@popperjs/core";
import "./header.css";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // ✅ Ref for dropdown

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 150);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Close dropdown when clicking outside
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

  return (
    <header
      className={`navbar navbar-expand-lg fixed-top ${
        isSignupPage ? "position-relative bg-white text-black" : ""
      } ${isScrolled ? "navbar-light bg-white text-black animate" : "bg-transparent text-white"}`}
    >
      <div className="container">
        <nav className="headertop d-flex flex-wrap align-items-center justify-content-between">
          <a href="/" className="d-flex align-items-center mb-3 mb-md-0 text-dark text-decoration-none">
            <img src={isSignupPage || isScrolled ? logodark : logo} className="logo-img" alt="Company Logo" />
          </a>

          <ul className="nav nav-pills">
            <li>
              <a href="#" className={`nav-link px-2 ${isSignupPage || isScrolled ? "text-black" : "text-white"}`}>
                Home
              </a>
            </li>
            <li>
              <a href="#" className={`nav-link px-2 ${isSignupPage || isScrolled ? "text-black" : "text-white"}`}>
                About
              </a>
            </li>
            {/* ✅ Dropdown Menu with Outside Click Handling */}
            <li className="nav-item dropdown" ref={dropdownRef}>
              <button
                className={`nav-link dropdown-toggle ${isSignupPage || isScrolled ? "text-black" : "text-white"}`}
                onClick={toggleDropdown}
              >
                AI Concepts
              </button>
              <ul className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}>
                <li><a className="dropdown-item" href="#">Machine Learning</a></li>
                <li><a className="dropdown-item" href="#">Deep Learning</a></li>
                <li><a className="dropdown-item" href="#">Generative AI</a></li>
                <li><a className="dropdown-item" href="#">Data Analytics</a></li>
                <li><a className="dropdown-item" href="#">Neural Networks</a></li>
              </ul>
            </li>
            <li>
              <a href="#" className={`nav-link px-2 ${isSignupPage || isScrolled ? "text-black" : "text-white"}`}>
                Blog
              </a>
            </li>
            <li>
              <a href="#" className={`nav-link px-2 ${isSignupPage || isScrolled ? "text-black" : "text-white"}`}>
                Contact Us
              </a>
            </li>
          </ul>

          <div className="text-end">
            {!isLoggedIn && (
              <button
                type="button"
                className={`btn me-2 ${isSignupPage || isScrolled ? "blueHeaderBtn" : "btn-outline-light"}`}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Login
              </button>
            )}
            <button
              type="button"
              className={`btn me-2 ${isSignupPage || isScrolled ? "blueHeaderBtn" : "btn-outline-light"}`}
              onClick={() => navigate("/signup")}
            >
              Sign up
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
