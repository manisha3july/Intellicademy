import React, { useEffect, useState } from "react";
import Section from "../Section";
import axios from "axios";
import DeleteUser from "./DeleteUser";
import EditUser from "./EditUser";
import "../loginSignup/signup.css";
import "./dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faUserPen,
  faUsers,
  faBookOpen,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import SearchBox from "./SearchBox";
import Signup from "../loginSignup/Signup";
import GraphData from "./GraphData";
import useCourseManager from "./useCourseManager";
import CourseList from "./CourseList";
import CreateCourse from "./CreateCourse";
import TeacherImg from "../../assets/teacher.png";
import StudentInfo from "./StudentInfo";
import ScheduleMeeting from "./ScheduleMeeting";

function FacultyPage() {
  const [usersData, setUsersData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [chartType] = useState("pie");
  const [allUsersData, setAllUsersData] = useState([]);
  const [activeTab, setActiveTab] = useState("course");

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showStudentInfo, setShowStudentInfo] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const {
    courses,
    editingCourse,
    editingCourseId,
    handleCourseSubmit,
    handleCourseEdit,
    handleDeleteCourse,
    clearEdit,
  } = useCourseManager();

  useEffect(() => {
    fetchUsersData();
  }, []);

  const fetchUsersData = async () => {
    try {
      const { data } = await axios.get("http://localhost:3006/users");
      if (!currentUser) {
        setUsersData([]);
        return;
      }
      const filteredUsers = data.filter(
        (user) => user.userType === "Student" || user.id === currentUser.id
      );
      setUsersData(filteredUsers);
      setAllUsersData(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsersData([]);
    }
  };

  const handleEdit = (user) => {
    setShowModal(true);
    setSelectedUser({ ...user });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await DeleteUser(id);
      fetchUsersData();
    }
  };

  const handleStudentInfo = (studentId) => {
    const student = usersData.find((u) => u.id === studentId);
    if (student) {
      setSelectedStudent(student);
      setShowStudentInfo(true);
    }
  };

  const studentCount = allUsersData.filter(
    (user) => user.userType === "Student"
  ).length;
  const facultyCount = allUsersData.filter(
    (user) => user.userType === "Faculty"
  ).length;
  const adminCount = allUsersData.filter(
    (user) => user.userType === "Admin"
  ).length;

  const filteredUsers = usersData.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Section className="adminContainer lightBlueBg">
      <div className="container">
        <h5
          className="mb-2 text-center"
          style={{ fontWeight: 700, fontSize: "25px" }}
        >
          Welcome{" "}
          <span style={{ fontWeight: 500, color: "#6790E8" }}>
            {currentUser.name}
          </span>{" "}
          to Faculty Dashboard
        </h5>

        <div className="row my-4">
          <div className="col-sm-12">
            {/* Tabs */}
            <div className="btn-group TabFacouter mb-3 w-100" role="group">
              <div className="d-flex w-100 border-bottom border-dark">
                <button
                  className={`btn ${
                    activeTab === "course" ? "TabBtn" : "TabBtn-outline"
                  }`}
                  onClick={() => setActiveTab("course")}
                >
                  Add Course <FontAwesomeIcon icon={faBookOpen} />
                </button>
                <button
                  className={`btn ${
                    activeTab === "user" ? "TabBtn" : "TabBtn-outline"
                  }`}
                  onClick={() => setActiveTab("user")}
                >
                  Add User <FontAwesomeIcon icon={faUsers} />
                </button>
                <button
                  className={`btn ${
                    activeTab === "meeting" ? "TabBtn" : "TabBtn-outline"
                  }`}
                  onClick={() => setActiveTab("meeting")}
                >
                  Schedule Meeting <FontAwesomeIcon icon={faUsers} />
                </button>
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === "course" && (
              <div className="tab-content">
                <div className="row">
                  <div className="col-sm-5">
                    <img src={TeacherImg} alt="Teacher" className="img-fluid" />
                  </div>
                  <div className="col-sm-7">
                    <CreateCourse
                      onSubmit={handleCourseSubmit}
                      courseToEdit={editingCourse}
                      clearEdit={clearEdit}
                    />
                  </div>
                </div>
                <CourseList
                  courses={courses}
                  onEdit={handleCourseEdit}
                  onDelete={handleDeleteCourse}
                  editingCourseId={editingCourseId}
                />
              </div>
            )}

            {activeTab === "user" && (
              <div className="tab-content">
                <div className="row">
                  <div className="col-sm-4">
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
                  <div className="col-sm-8">
                    <Signup onUserAdded={fetchUsersData} />
                  </div>
                </div>

                {showStudentInfo ? (
                 <div className="row">

                  <div className="col-sm-12">
                   <StudentInfo
                    student={selectedStudent}
                    onBack={() => setShowStudentInfo(false)}
                  />
     
                  </div>
                  </div>
                ) : (
                  <div>
                    <div className="row">
                      <div className="col-sm-4 mb-3">
                        <SearchBox
                          searchTerm={searchTerm}
                          onSearchChange={setSearchTerm}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-12">
                        <table className="table table-bordered table-striped bg-white">
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
                                .filter(
                                  (user) =>
                                    user.userType === "Faculty" ||
                                    user.userType === "Student"
                                )
                                .sort((a, b) => {
                                  if (
                                    a.userType === "Faculty" &&
                                    b.userType === "Student"
                                  )
                                    return -1;
                                  if (
                                    a.userType === "Student" &&
                                    b.userType === "Faculty"
                                  )
                                    return 1;
                                  return 0;
                                })
                                .map((user) => (
                                  <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.number}</td>
                                    <td>{user.userType}</td>
                                    <td>
                                      <div className="d-flex justify-content-center align-items-center gap-1">
                                        <button
                                          className="btn btn-edit"
                                          onClick={() => handleEdit(user)}
                                          style={{
                                            background: "#6790E8",
                                            color: "#fff",
                                          }}
                                        >
                                          <FontAwesomeIcon icon={faUserPen} />
                                        </button>
                                        {user.id !== currentUser.id && (
                                          <>
                                            <button
                                              className="btn"
                                              style={{
                                                backgroundColor: "#f43c3c",
                                                color: "#fff",
                                              }}
                                              onClick={() =>
                                                handleDelete(user.id)
                                              }
                                            >
                                              <FontAwesomeIcon
                                                icon={faTrashCan}
                                              />
                                            </button>
                                            <button
                                              className="btn"
                                              style={{
                                                backgroundColor: "#333",
                                                color: "#fff",
                                              }}
                                              onClick={() =>
                                                handleStudentInfo(user.id)
                                              }
                                            >
                                              <FontAwesomeIcon
                                                icon={faCircleInfo}
                                              />
                                            </button>
                                          </>
                                        )}
                                      </div>
                                    </td>
                                  </tr>
                                ))
                            ) : (
                              <tr>
                                <td colSpan="5" className="text-center">
                                  No users found or loading...
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "meeting" && (
              <div className="tab-content">
                <ScheduleMeeting currentUser={currentUser}  />
              </div>
            )}
          </div>
        </div>

        <EditUser
          show={showModal}
          handleClose={handleCloseModal}
          userData={selectedUser}
          refreshUsers={fetchUsersData}
        />
      </div>
    </Section>
  );
}

export default FacultyPage;
