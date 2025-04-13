import axios from "axios";
import { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const UserType = ["Admin", "Faculty", "Student"];
const EditUser = ({ show, handleClose, userData, refreshUsers }) => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name,
        password: userData.password,
        email: userData.email,
        userType: userData.userType,
        number: userData.number
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userData?.id) {
      alert("Invalid user data.");
      return;
    }

    setLoading(true);
    try {
      const { data: user } = await axios.put(
        `http://localhost:3006/users/${userData.id}`,
        formData
      );
      alert("User updated successfully!");
      handleClose();
      refreshUsers();
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
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
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="number"
              value={formData.number}
              onChange={handleChange}
              placeholder="Enter your Phone number"
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>




          <Form.Group className="mb-3">
            <Form.Label>User Type</Form.Label>
            <Form.Select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              isInvalid={!!errors.userType}
            >
              <option value="">Select User Type</option>
              {UserType.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditUser;
