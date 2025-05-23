import React, { useEffect, useState } from "react";
import axios from "axios";
import EditUser from "./EditUser";
import "./dashboard.css";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isImageSelected, setIsImageSelected] = useState(false);  // Track if an image is selected
  const [isImageUploaded, setIsImageUploaded] = useState(false); // Track if image is uploaded

  useEffect(() => {
    fetchUserData();
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const fetchUserData = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
    if (userData?.profileImage) {
      setPreviewUrl(userData.profileImage);
      setIsImageUploaded(true);  // Image is already uploaded if there's a profile image
    }
  };

  const handleEditClick = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleUserUpdate = (updatedUser) => {
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser); // Update user state
    setPreviewUrl(updatedUser.profileImage); // Update previewUrl with the new image
    setIsImageUploaded(true); // Mark that the image has been uploaded
    handleCloseModal();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedImage(file);
    setIsImageSelected(true); // Image is selected but not uploaded yet

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result); // Update previewUrl with the selected image
    };
    reader.readAsDataURL(file); // Convert to Base64
  };

  const handleImageUpload = async () => {
    if (!selectedImage || !user) return;

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result;

        const updatedUser = {
          ...user,
          profileImage: base64Image,
        };

        // Update user data with new image
        const response = await axios.put(`http://localhost:3006/users/${user.id}`, updatedUser);
        handleUserUpdate(response.data); // Update local storage and state
        alert("Profile image updated!");
      };
      reader.readAsDataURL(selectedImage);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image.");
    }
  };

  if (!user) return <div>Loading user profile...</div>;

  return (
    <div className="Profile-container py-5">
      <div className="card p-4" style={{ maxWidth: "500px" }}>
        <div className="text-center mb-3">
          <img
            src={previewUrl || "https://via.placeholder.com/100"}
            alt="Profile"
            className="rounded-circle"
            style={{ width: "200px", height: "200px", objectFit: "cover" }}
          />
        </div>

        {/* Conditionally render file input and button if no image has been uploaded */}
        {!isImageUploaded && (
          <div>
            <input 
              type="file" 
              onChange={handleImageChange} 
              className="form-control mb-2" 
            />
            <button className="btn btn-light btn-sm mb-3" onClick={handleImageUpload}>
              Upload Image
            </button>
          </div>
        )}

        <div className="mb-3">
          <strong>Name:</strong> {user.name}
        </div>
        <div className="mb-3">
          <strong>Email:</strong> {user.email}
        </div>
        <div className="mb-3">
          <strong>Phone:</strong> {user.number}
        </div>
        <div className="mb-3">
          <strong>User Type:</strong> {user.userType}
        </div>

        <button className="btn blue_btn mt-3" onClick={handleEditClick}>
          Edit Profile
        </button>
      </div>

      <EditUser
        show={showModal}
        handleClose={handleCloseModal}
        userData={user}
        onUpdateUser={handleUserUpdate}
        currentUserType={user.userType}
        profileImage={previewUrl}
      />
    </div>
  );
}

export default ProfilePage;
