import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ show, handleClose }) {
  const [logData, setLogData] = useState({
    name: "",
    email: "",
    password: "",
    userType: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state
  const navigate = useNavigate();

  // Reset form when modal closes
  useEffect(() => {
    if (!show) {
      setLogData({ name: "", email: "", password: "", userType: "" });
      setErrors({});
      setSuccessMessage("");
    }
  }, [show]);

  const logHandleChange = (e) => {
    const { name, value } = e.target;
    setLogData({ ...logData, [name]: value });
  };

  const validateLog = () => {
    let errors = {};
    if (!logData.email.trim()) errors.email = "Email is required";
    if (!logData.password.trim()) errors.password = "Password is required";
    if (!logData.userType) errors.userType = "Please select a user type";

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (logData.email && !emailRegex.test(logData.email)) {
      errors.email = "Please enter a valid email address";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogIn = async (e) => {
    e.preventDefault();

    if (!validateLog()) return;

    setLoading(true); // Set loading state

    try {
      const response = await axios.get("http://localhost:3006/users");
      const users = response.data;

      // Check if email exists at all
      const emailExists = users.find(user => user.email === logData.email);
      if (!emailExists) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          general: "This email ID is not registered. Please sign up."
        }));
        setLoading(false); // Stop loading
        return;
      }

      const matchedUser = users.find(
        (user) =>
          user.email === logData.email &&
          user.password === logData.password &&
          user.userType === logData.userType
      );

      if (matchedUser) {
        localStorage.setItem("user", JSON.stringify(matchedUser));
        setSuccessMessage(`Welcome, ${matchedUser.name}!`);

        setTimeout(() => {
          setSuccessMessage("");
          setLogData({ name: "", email: "", password: "", userType: "" });
          handleClose();
          // Handle redirection based on user type (standardizing userType to lower case for comparison)
          const userType = matchedUser.userType.toLowerCase();
          if (userType === "admin") {
            navigate("/admin");
          } else if (userType === "faculty") {
            navigate("/faculty");
          } else if (userType === "student") {
            navigate("/student");
          }
        }, 1500);
      } else {
        setErrors({
          general: "Invalid Email, password, or user type."
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors({ general: "Server error. Try again later." });
    } finally {
      setLoading(false); // Stop loading after the request is complete
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {successMessage && (
          <Alert variant="success" className="text-center">
            {successMessage}
          </Alert>
        )}

        {errors.general && (
          <Alert variant="danger" className="text-center">
            {errors.general}
          </Alert>
        )}

        <Form onSubmit={handleLogIn}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={logData.email}
              onChange={logHandleChange}
              placeholder="Enter your email"
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={logData.password}
              onChange={logHandleChange}
              placeholder="Enter your password"
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>User Type</Form.Label>
            <Form.Select
              name="userType"
              value={logData.userType}
              onChange={logHandleChange}
              isInvalid={!!errors.userType}
            >
              <option value="">-- Select User Type --</option>
              <option value="Admin">Admin</option>
              <option value="Faculty">Faculty</option>
              <option value="Student">Student</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.userType}
            </Form.Control.Feedback>
          </Form.Group>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? "Logging In..." : "Log In"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default Login;
