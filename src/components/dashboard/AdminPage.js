import React, { use } from "react";
import { useEffect, useState, useCallback } from "react";
import Section from "../Section";
import axios from "axios";
import DeleteUser from "./DeleteUser";
import EditUser from "./EditUser";
import "../loginSignup/signup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faUserPen } from "@fortawesome/free-solid-svg-icons";
import GraphData from "./GraphData";
import GraphChange from "./GraphChange";
import SearchBox from "./SearchBox";


function AdminPage() {
  const [usersData, setUsersData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [chartType, setChartType] = useState("pie");

  const filteredUsers = usersData.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchUsersData();
  }, []);

  const fetchUsersData = async () => {
    const UsersRes = await axios.get("http://localhost:3006/users");
    setUsersData(UsersRes.data);
  };

  const currentUser = JSON.parse(localStorage.getItem("user"));

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

  const studentCount = usersData.filter(
    (user) => user.userType === "Student"
  ).length;
  const facultyCount = usersData.filter(
    (user) => user.userType === "Faculty"
  ).length;
  const adminCount = usersData.filter(
    (user) => user.userType === "Admin"
  ).length;

  return (
    <Section className="adminContainer lightBlueBg">
      <div className="container">
        <h5 style={{ fontWeight: "500" }} className="mb-4">
          {" "}
          Welcome {currentUser.name} to Admin Dashboard
        </h5>

        <EditUser
          show={showModal}
          handleClose={handleCloseModal}
          userData={selectedUser}
          refreshUsers={fetchUsersData}
        />

        <SearchBox searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        <div className="row mt-2">
          <div className="col-sm-8">
            <div className="table-responsive">
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
                    .sort((a, b) => {
                      const order = { Admin: 0, Faculty: 1, Student: 2 };
                      return order[a.userType] - order[b.userType];
                    })
                    .map((user) => (
                      <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.password}</td>
                        <td>{user.number}</td>
                        <td>{user.userType}</td>
                        <td>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <button
                              className="btn btn-edit"
                              onClick={() => handleEdit(user)}
                              style={{
                                padding: "5px 10px",
                                background: "#6790E8",
                                color: "#fff",
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
          <div className="col-sm-4">
          <GraphChange chartType={chartType} setChartType={setChartType}  />
            <GraphData
              studenTitle="Students"
              facultyTitle="Faculties"
              adminTitle="Admin"
              studentCount={studentCount}
              facultyCount={facultyCount}
              adminCount={adminCount}
              chartType={chartType}
            />
           
          </div>
        </div>
      </div>
    </Section>
  );
}

export default AdminPage;
