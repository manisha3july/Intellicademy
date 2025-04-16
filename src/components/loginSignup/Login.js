import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ show, handleClose }) {
  const [logData, setLogData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const navigates = useNavigate();

  const logHandleChange = (e) => {
    const { name, value } = e.target;
    setLogData({ ...logData, [name]: value });
  };

  const validateLog = () => {
    let errors = {};
    if (!logData.name.trim()) errors.name = "Username is required";
    if (!logData.password.trim()) errors.password = "Password is required";
    if (!logData.userType) errors.userType = "Please select a user type";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogIn = async (e) => {
    e.preventDefault();

    if (!validateLog()) return;

    try {
      const response = await axios.get("http://localhost:3006/users");
      const users = response.data;

      const matchedUser = users.find(
        (user) =>
          user.name === logData.name &&
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
          if (matchedUser.userType === "Admin") {
            navigates("/admin");
          } else if (matchedUser.userType === "Faculty") {
            navigates("/faculty");
          } else {
            navigates("/student");
          }
        }, 1500);
      } else {
        setErrors({
          ...errors,
          general: "Invalid username, password, or user type.",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors({ ...errors, general: "Server error. Try again later." });
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
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={logData.name}
              onChange={logHandleChange}
              placeholder="Enter your full name"
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={logData.password}
              onChange={logHandleChange}
              placeholder="Enter password"
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
            <Button type="submit" variant="primary">
              Log In
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default Login;
