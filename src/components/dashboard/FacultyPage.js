import React, { use } from "react";
import { useEffect, useState } from "react";
import Section from "../Section";
import axios from "axios";
import DeleteUser from "./DeleteUser";
import EditUser from "./EditUser";
import "../loginSignup/signup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faUserPen } from "@fortawesome/free-solid-svg-icons";
import SearchBox from "./SearchBox";




function FacultyPage() {
  const [usersData, setUsersData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [facultyData, setFacultyData] = useState([]);

  const filteredUsers = usersData.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const currentUser = JSON.parse(localStorage.getItem("user"));

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

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;
    await DeleteUser(id);
    fetchUsersData();
  };

  return (
    <Section className="adminContainer lightBlueBg">
      <div className="container">
        <h5 style={{ fontWeight: "500" }} className="mb-4">
          {" "}
          Welcome {currentUser.name} to Faculty Dashboard
        </h5>
        <EditUser
          show={showModal}
          handleClose={handleCloseModal}
          userData={selectedUser}
          refreshUsers={fetchUsersData}
        />
       <SearchBox searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <div className="row ">
          <table
            className="table table-bordered table-striped"
            style={{ backgroundColor: "#fff" }}
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Number</th>
                <th>User Type</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                 filteredUsers
                  .filter(
                    (user) =>
                      user.userType === "Faculty" || user.userType === "Student"
                  ).sort((a, b) => {
                    // Prioritize Faculty before Student
                    if (a.userType === "Faculty" && b.userType === "Student") return -1;
                    if (a.userType === "Student" && b.userType === "Faculty") return 1;
                    return 0; // Keep same order if both are the same type
                  })
                  .map((user, index) => (
                    <tr key={user.id}>
                      <td >{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.password}</td>
                      <td>{user.number}</td>
                      <td>{user.userType}</td>
                      <td>
                       <div style={{display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                       <button
                          className="btn btn-edit"
                          onClick={() => handleEdit(user)}
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
                        <button
                          className="btn btn-delete"
                          style={{
                            backgroundColor: "#f43c3c",
                            padding: "5px 10px",
                            color: "#fff",
                          }}
                          onClick={() => handleDelete(user.id)}
                        >
                          <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                       </div>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No users found or loading...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Section>
  );
}

export default FacultyPage;
