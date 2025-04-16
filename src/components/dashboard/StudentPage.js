import React, { useEffect, useState } from "react";
import Section from "../Section";
import axios from "axios";
import EditUser from "./EditUser";
import "../loginSignup/signup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";

function StudentPage() {
  const [usersData, setUsersData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")));

  // Fetch the user data
  useEffect(() => {
    fetchUsersData();
  }, []);

  const fetchUsersData = async () => {
    try {
      const UsersResult = await axios.get("http://localhost:3006/users");

      const currentUser = JSON.parse(localStorage.getItem("user"));
      if (!currentUser) {
        setUsersData([]);
        return;
      }

      // Ensure only the current student or students are shown
      const filteredUsers = UsersResult.data.filter(
        (user) => user.userType === "Student" || user.id === currentUser.id
      );

      setUsersData(filteredUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsersData([]);
    }
  };

  const handleEdit = async (user) => {
    console.log("Editing user:", user);
    setShowModal(true);
    setSelectedUser({
      id: user.id,
      name: user.name,
      password: user.password,
      email: user.email,
      number: user.number,
      userType: user.userType,
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleUserUpdate = (updatedUserData) => {
    // Update the current user data in localStorage
    localStorage.setItem("user", JSON.stringify(updatedUserData));

    // Also update the state of currentUser to reflect the changes
    setCurrentUser(updatedUserData);

    // Refresh the users data
    fetchUsersData();
  };

  return (
    <Section className="adminContainer lightBlueBg">
      <div className="container">
        <h5 style={{ fontWeight: "500" }} className="mb-4">
          Welcome {currentUser.name} to Student Dashboard
        </h5>
        <EditUser
          show={showModal}
          handleClose={handleCloseModal}
          userData={selectedUser}
          refreshUsers={fetchUsersData}
          onUpdateUser={handleUserUpdate}
          currentUserType={currentUser.userType} 
        />
        <div className="row">
          <div className="col-sm-4">
          <div className="card p-5">
            <p>Name: {currentUser.name}</p>
            <p>Email: {currentUser.email}</p>
            <p>Password: {currentUser.password}</p>
            <p>Number: {currentUser.number}</p>
            <p>User Type: {currentUser.userType}</p>
            <div>
              <button
                className="btn btn-edit"
                onClick={() => handleEdit(currentUser)}
                style={{
                  padding: "5px 10px",
                  background: "#6790E8",
                  color: "#fff",
                  float: "left",
                  marginRight: "5px",
                }}
              >
                <FontAwesomeIcon icon={faUserPen} />
              </button>
            </div>
          </div>
          </div>
          




        </div>
      </div>
    </Section>
  );
}

export default StudentPage;
