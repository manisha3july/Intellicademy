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
import Signup from "../loginSignup/Signup";
import UserTypeFilter from "./UserTypeFilter";

function AdminPage() {
  const [usersData, setUsersData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [chartType, setChartType] = useState("bar");
  const [userTypeFilter, setUserTypeFilter] = useState("");

  const filteredUsers = usersData.filter((user) => {
    const matchesSearch = user.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = userTypeFilter
      ? user.userType === userTypeFilter
      : true;
    return matchesSearch && matchesType;
  });

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
        <div className="heading d-flex align-items-center flex-column">
          <p className="mb-0">Admin Dashboard</p>
          <h5 style={{ fontWeight: "700", fontSize: "32px" }} className="mb-2">
            Welcome{" "}
            <span style={{ fontWeight: "500", color: " #6790E8" }}>
              {currentUser.name}{" "}
            </span>
          </h5>
        </div>

        <EditUser
          show={showModal}
          handleClose={handleCloseModal}
          userData={selectedUser}
          refreshUsers={fetchUsersData}
        />
        <div className="row  d-flex justify-content-center">
          <div
            className=" col-sm-6 p-4 mb-3 d-flex justify-content-between"
            style={{
              backgroundColor: "#fff",
              boxShadow: "rgba(0, 0, 0, 0.3) 0px 4px 5px 0px",
            }}
          >
            <SearchBox searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            <UserTypeFilter
              userType={userTypeFilter}
              onChange={setUserTypeFilter}
            />
          </div>
        </div>

        <div
          className="p-4 mb-2"
          style={{
            backgroundColor: "#fff",
            boxShadow: " rgba(0, 0, 0, 0.3) 0px 4px 5px 0px",
          }}
        >
          <div className="row ">
            <div className="col-sm-12 ">
              <div className="table-responsive " style={{}}>
                <table
                  className="table table-bordered mb-0 table-striped"
                  style={{ backgroundColor: "#fff" }}
                >
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>

                      <th>Number</th>
                      <th>User Type</th>
                      <th>Actions</th>
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
                                {user.id !== currentUser.id && (
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
                                )}
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
          </div>
        </div>
        <div className="row d-flex align-item-center justify-content-start">
          <div className="col-sm-6 d-flex align-item-center justify-content-center  flex-column">
            <GraphChange chartType={chartType} setChartType={setChartType} />
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
          <div className="col-sm-6 d-flex align-item-center justify-content-center flex-column">
            <Signup onUserAdded={fetchUsersData} />
          </div>
        </div>
      </div>
    </Section>
  );
}

export default AdminPage;
