import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";  // Ensure Bootstrap CSS is included

function Login({ show, handleClose }) {
  const [logData, setLogData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const logHandleChange = (e) => {
    const { name, value } = e.target;
    setLogData({ ...logData, [name]: value });
  };

  const validateLog = () => {
    let errors = {};
    if (!logData.name.trim()) errors.name = "Username is required";
    if (!logData.password.trim()) errors.password = "Password is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogIn = (e) => {
    e.preventDefault();
    if (validateLog()) {
      setSuccessMessage(`Thank you for logging in, ${logData.name}!`);
      setTimeout(() => {
        setSuccessMessage("");
        setLogData({ name: "", email: "", password: "" });
        handleClose(); // Close modal after success
      }, 2000);
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
