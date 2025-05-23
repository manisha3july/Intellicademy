import React, { useEffect, useState } from "react";
import Section from "../Section";
import axios from "axios";
import EditUser from "./EditUser";
import "../loginSignup/signup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

function StudentPage() {
  const [usersData, setUsersData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [courses, setCourses] = useState([]);
  const [enrolled, setEnrolled] = useState([]);
  const [studentMeetings, setStudentMeetings] = useState([]);

  // Fetch the user data
  useEffect(() => {
    fetchUsersData();
    fetchCourses();
    fetchStudentMeetings();
  }, []);

  useEffect(() => {
    if (courses.length > 0) {
      fetchEnrolledCourses();
    }
  }, [courses]);

  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:3006/courses");
      setCourses(res.data);
    } catch (err) {
      toast.error("Failed to fetch courses");
      console.error(err);
    }
  };

  const fetchEnrolledCourses = async () => {
    try {
      const res = await axios.get("http://localhost:3006/enrolled");

      const studentEntry = res.data.find(
        (entry) => entry.studentId === currentUser.id
      );
      if (!studentEntry) {
        setEnrolled([]);
        return;
      }

      const enrolledCourses = courses.filter((course) =>
        studentEntry.courses.includes(course.id)
      );

      setEnrolled(enrolledCourses);
    } catch (error) {
      console.error("Failed to fetch enrolled courses", error);
      toast.error("Could not load enrolled courses");
    }
  };
  const fetchStudentMeetings = async () => {
  try {
    const res = await axios.get("http://localhost:3006/schedule");
    const filteredMeetings = res.data.filter((meeting) =>
      meeting.selectedStudents?.includes(currentUser.id)
    );
    setStudentMeetings(filteredMeetings);
  } catch (err) {
    console.error("Failed to fetch meetings", err);
    toast.error("Failed to load meetings");
  }
};

  const onEnroll = async (courseId) => {
    try {
      const res = await axios.get("http://localhost:3006/enrolled");
      const existingEntry = res.data.find(
        (entry) => entry.studentId === currentUser.id
      );

      if (existingEntry) {
        const alreadyEnrolled = existingEntry.courses.includes(courseId);
        if (alreadyEnrolled) {
          toast.info("Already enrolled in this course.");
          return;
        }

        const updatedCourses = [...existingEntry.courses, courseId];

        await axios.put(`http://localhost:3006/enrolled/${existingEntry.id}`, {
          ...existingEntry,
          courses: updatedCourses,
        });
      } else {
        await axios.post("http://localhost:3006/enrolled", {
          studentId: currentUser.id,
          courses: [courseId],
        });
      }

      toast.success("Enrollment successful!");
      fetchEnrolledCourses();
    } catch (error) {
      console.error("Enrollment failed", error);
      toast.error("Failed to enroll. Try again.");
    }
  };

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
        <h5
          style={{ fontWeight: "700", fontSize: "25px", textAlign: "center" }}
          className="mb-5"
        >
          Welcome{" "}
          <span style={{ fontWeight: "500", color: " #6790E8" }}>
            {currentUser.name}{" "}
          </span>
      
        </h5>
        <EditUser
          show={showModal}
          handleClose={handleCloseModal}
          userData={selectedUser}
          refreshUsers={fetchUsersData}
          onUpdateUser={handleUserUpdate}
          currentUserType={currentUser.userType}
        />




<div className="student-meetings-section mt-3 mb-3">
  <h4>Scheduled Meetings</h4>
  {studentMeetings.length === 0 ? (
    <p className="text-muted">No meetings scheduled for you yet.</p>
  ) : (
    <ul className="list-group">
      {studentMeetings.map((meeting, index) => (
        <li key={index} className="meeting-item">
          <div>
            <strong>{meeting.topic}</strong><br />
          
          </div>
            {new Date(meeting.date).toLocaleDateString()} at {meeting.time}
          {meeting.meetingUrl && (
            <a
              href={meeting.meetingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-primary"
            >
              Join Meeting
            </a>
          )}
        </li>
      ))}
    </ul>
  )}
</div>






        <div className="enrolle-course mb-5">
          <h4>All Enrolled Courses</h4>
          <div className="row">
            <div className="col-md-12 d-flex flex-wrap gap-2">
              {enrolled.length === 0 ? (
                <div className="w-100 text-center text-muted">
                  <p>You have not enrolled in any courses yet.</p>
                </div>
              ) : (
                enrolled.map((enCourse) => (
                  <div
                    key={enCourse.id}
                    className="courseCard"
                    style={{ maxWidth: "300px" }}
                  >
                    <div className="card h-100 shadow-sm">
                      <img
                        src={
                          enCourse.imageUrl?.trim()
                            ? enCourse.imageUrl
                            : "https://via.placeholder.com/300x200?text=No+Image"
                        }
                        className="card-img-top"
                        alt={enCourse.title}
                        style={{ maxHeight: "200px", objectFit: "cover" }}
                      />
                      <div className="card-body">
                        <h5
                          className="card-title"
                          style={{ fontWeight: "700" }}
                        >
                          {enCourse.title}
                        </h5>
                        <p
                          className="card-text"
                          style={{ fontSize: "14px", lineHeight: "18px" }}
                        >
                          {enCourse.description}
                        </p>
                        <p
                          className="text-muted"
                          style={{ fontSize: "14px", lineHeight: "18px" }}
                        >
                          <strong>Duration:</strong> {enCourse.duration}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="mb-5">
          {courses.length === 0 ? (
            <p>No courses added yet.</p>
          ) : (
            <>
              <h4>All Courses</h4>
              <div className="row d-flex align-items-start">
                <div className="col-md-12 d-flex flex-wrap gap-2">
                  {courses.map((course) => (
                    <div
                      key={course.id}
                      className="courseCard"
                      style={{ maxWidth: "300px" }}
                    >
                      <div className="card h-100 shadow-sm">
                        <img
                          src={
                            course.imageUrl?.trim()
                              ? course.imageUrl
                              : "https://via.placeholder.com/300x200?text=No+Image"
                          }
                          className="card-img-top"
                          alt={course.title}
                          style={{ maxHeight: "200px", objectFit: "cover" }}
                        />
                        <div className="card-body">
                          <h5
                            className="card-title"
                            style={{ fontWeight: "700" }}
                          >
                            {course.title}
                          </h5>
                          <p
                            className="card-text"
                            style={{ fontSize: "14px", lineHeight: "18px" }}
                          >
                            {course.description}
                          </p>
                          <p
                            className="text-muted"
                            style={{ fontSize: "14px", lineHeight: "18px" }}
                          >
                            <strong>Duration:</strong> {course.duration}
                          </p>
                          {enrolled.some((c) => c.id === course.id) ? (
                            <button className="btn btn-sm btn-success" disabled>
                              ENROLLED
                            </button>
                          ) : (
                            <button
                              className="btn btn-sm btn_blue"
                              onClick={() => onEnroll(course.id)}
                            >
                              ENROLL NOW
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Section>
  );
}

export default StudentPage;
