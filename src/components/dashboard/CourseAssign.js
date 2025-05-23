import React, { useEffect, useState } from "react";
import axios from "axios";

const CourseAssign = ({ studentId, onAssignSuccess }) => {
  const [courses, setCourses] = useState([]);
  const [selectedCourseIds, setSelectedCourseIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:3006/courses");
        setCourses(res.data);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      }
    };

    fetchCourses();
  }, []);

  const handleCheckboxChange = (e) => {
    const courseId = e.target.value;
    setSelectedCourseIds((prevSelected) =>
      prevSelected.includes(courseId)
        ? prevSelected.filter((id) => id !== courseId)
        : [...prevSelected, courseId]
    );
  };

  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedCourseIds([]);
    } else {
      setSelectedCourseIds(courses.map((course) => course.id));
    }
    setSelectAll(!selectAll);
  };

  useEffect(() => {
    setSelectAll(selectedCourseIds.length === courses.length);
  }, [selectedCourseIds, courses]);

  const assignCourses = async () => {
    try {
      const res = await axios.get("http://localhost:3006/enrolled");
      const entry = res.data.find((e) => e.studentId === studentId);

      if (entry) {
        await axios.put(`http://localhost:3006/enrolled/${entry.id}`, {
          studentId,
          courses: selectedCourseIds,
        });
      } else if (selectedCourseIds.length > 0) {
        await axios.post("http://localhost:3006/enrolled", {
          studentId,
          courses: selectedCourseIds,
        });
      }

      onAssignSuccess();
    } catch (err) {
      console.error("Error assigning courses:", err);
    }
  };

  const removeCourses = async () => {
    try {
      const res = await axios.get("http://localhost:3006/enrolled");
      const entry = res.data.find((e) => e.studentId === studentId);

      if (entry) {
        await axios.put(`http://localhost:3006/enrolled/${entry.id}`, {
          studentId,
          courses: [],
        });
        setSelectedCourseIds([]); // Clear selection on UI
        setSelectAll(false);
        onAssignSuccess();
      }
    } catch (err) {
      console.error("Error removing courses:", err);
    }
  };

  return (
    <div className="my-3">
      <div>
        <h5>Select Courses:</h5>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="select-all"
            checked={selectAll}
            onChange={handleSelectAllChange}
          />
          <label className="form-check-label" htmlFor="select-all">
            Select All
          </label>
        </div>
        {courses.map((course) => (
          <div key={course.id} className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id={`course-${course.id}`}
              value={course.id}
              checked={selectedCourseIds.includes(course.id)}
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor={`course-${course.id}`}>
              {course.title}
            </label>
          </div>
        ))}
      </div>

      <button
        className="btn btn-primary mt-2 me-2"
        onClick={assignCourses}
        disabled={selectedCourseIds.length === 0}
      >
        Assign Courses
      </button>

      <button
        className="btn btn-danger mt-2"
        onClick={removeCourses}
        disabled={selectedCourseIds.length === 0}
      >
        Remove All Courses
      </button>
    </div>
  );
};

export default CourseAssign;
