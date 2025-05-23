import React, { useEffect, useState } from "react";
import { Button, Alert } from "react-bootstrap";
import axios from "axios";
import CourseAssign from "./CourseAssign";

const StudentInfo = ({ student, onBack }) => {
  const [assignedCourses, setAssignedCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [courses, setCourses] = useState([]);

  // Fetch all courses and enrolled courses when student changes
  useEffect(() => {
    if (student?.id) {
      fetchCourses();
    }
  }, [student.id]);

  // Fetch all courses
  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:3006/courses");
      setCourses(response.data);
      fetchEnrolledCourses(response.data); // fetch enrolled after we have courses
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError("Failed to load courses. Please try again.");
    }
  };

  // Fetch enrolled data and map to course details
  const fetchEnrolledCourses = async (allCourses) => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3006/enrolled");
      const entry = res.data.find((e) => e.studentId === student.id);

      if (!entry || !entry.courses || entry.courses.length === 0) {
        setAssignedCourses([]);
      } else {
        const enrolled = allCourses.filter((course) =>
          entry.courses.includes(course.id)
        );
        setAssignedCourses(enrolled);
      }
    } catch (err) {
      console.error("Error fetching enrolled courses:", err);
      setError("Failed to load enrolled courses.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
     

      <div className="row">
        <div className="col-sm-8">
          <h4 className="my-3">Student Details</h4>
          <ul className="list-group mb-4">
            <li className="list-group-item">
              <strong>Name:</strong> {student.name}
            </li>
            <li className="list-group-item">
              <strong>Email:</strong> {student.email}
            </li>
            <li className="list-group-item">
              <strong>Phone:</strong> {student.number}
            </li>
            <li className="list-group-item">
              <strong>User Type:</strong> {student.userType}
            </li>
          </ul>
        </div>
        <div className="col-sm-4">
          <CourseAssign
            studentId={student.id}
            onAssignSuccess={() => fetchCourses()} // Re-fetch everything
          />
        </div>
      </div>

      {/* Course Assign Component */}

      <h4>Assigned Courses</h4>

      {loading && <p>Loading courses...</p>}
      {error && <Alert variant="danger">{error}</Alert>}
      {!loading && !error && assignedCourses.length === 0 && (
        <p>No courses assigned.</p>
      )}

      {assignedCourses.length > 0 && (
        <div className="row">
          {assignedCourses.map((course) => (
            <div key={course.id} className="col-md-4 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{course.title}</h5>
                  <p className="card-text">{course.description}</p>
                  <p className="text-muted">
                    <strong>Duration:</strong> {course.duration}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      
      <button className="btn btn_dark mt-2" style={{margin: '0 auto', display: 'flex', padding: '10px 40px'}} onClick={onBack}>
  Back
      </button>
    </div>
  );
};

export default StudentInfo;
