import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const EditUser = ({
  show,
  handleClose,
  userData,
  onUpdateUser,
  currentUserType,
  profileImage, // Receive the profile image here
}) => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
    userType: "",
    number: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // Track selected image
  const [imagePreview, setImagePreview] = useState(profileImage); // Preview image

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const isSelf = userData?.id === currentUser?.id;
  const isFaculty = currentUser?.userType === "Faculty";

  const allowedUserTypes = isFaculty
    ? ["Student"]
    : ["Admin", "Faculty", "Student"];

  useEffect(() => {
    // Initialize form data with user info when modal is opened
    if (userData) {
      setFormData({
        name: userData.name,
        password: userData.password,
        email: userData.email,
        userType: userData.userType,
        number: userData.number,
      });
    }

    // If profileImage is passed and is different from the current preview, update imagePreview
    if (profileImage !== imagePreview) {
      setImagePreview(profileImage);
    }
  }, [userData, profileImage]); // Trigger effect when userData or profileImage changes

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result); // Set the preview image to the selected file
    };
    reader.readAsDataURL(file); // Convert to Base64
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userData?.id) {
      alert("Invalid user data.");
      return;
    }

    setLoading(true);
    try {
      // If a new profile picture was selected, convert it to base64 and include in the formData
      const updatedData = { ...formData, profileImage: imagePreview };

      const { data: updatedUser } = await axios.put(
        `http://localhost:3006/users/${userData.id}`,
        updatedData
      );

      alert("User updated successfully!");

      // ✅ If the edited user is the currently logged-in user, update localStorage
      if (updatedUser.id === currentUser?.id) {
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }

      if (typeof onUpdateUser === "function") {
        onUpdateUser(updatedUser); // Send back the updated user data
      }

      handleClose();
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      backdrop={loading ? "static" : true}
      keyboard={!loading}
    >
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
              placeholder="Update your email"
              isInvalid={!!errors.email}
              disabled={currentUserType === "Student"}
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
              value={formData.password}
              onChange={handleChange}
              placeholder="Update password"
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="number"
              name="number"
              value={formData.number}
              onChange={handleChange}
              placeholder="Update your phone number"
              isInvalid={!!errors.number}
            />
            <Form.Control.Feedback type="invalid">
              {errors.number}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Profile Image Change */}
          <Form.Group className="mb-3">
            <Form.Label>Profile Picture</Form.Label>
            <div className="d-flex justify-content-center">
              <img
                src={imagePreview || "https://via.placeholder.com/100"}
                alt="Profile"
                className="rounded-circle"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            </div>
            <input
              type="file"
              onChange={handleImageChange}
              className="form-control mt-2"
            />
          </Form.Group>

          {!isSelf && (
            <Form.Group className="mb-3">
              <Form.Label>User Type</Form.Label>
              <Form.Select
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                required
              >
                <option value="">Select Type</option>
                {allowedUserTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          )}

          <Modal.Footer>
            <button className="btn btn_dark" onClick={handleClose}>
              Close
            </button>
            <button  type="submit" className="btn btn_blue"  disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>
            {/* <Button variant="primary"></Button> */}
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditUser;
