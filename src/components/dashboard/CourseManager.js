import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import CreateCourse from "./CreateCourse";
import CourseList from "./CourseList.js";

function CourseManager() {
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [editingCourseId, setEditingCourseId] = useState(null);

  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:3006/courses");
      setCourses(res.data);
    } catch (err) {
      toast.error("Failed to fetch courses");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleCourseSubmit = async (course) => {
    try {
      if (editingCourse) {
        await axios.put(
          `http://localhost:3006/courses/${editingCourse.id}`,
          course
        );
        toast.success("Course updated successfully");
      } else {
        await axios.post("http://localhost:3006/courses", course);
        toast.success("Course added successfully");
      }
      fetchCourses();
      setEditingCourse(null);
      setEditingCourseId(null); // ✅ Reset edit state to show Delete again
    } catch (error) {
      toast.error("Error saving course");
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setEditingCourseId(course.id);
  };

  const handleDeleteCourse = async (id) => {
    try {
      await axios.delete(`http://localhost:3006/courses/${id}`);
      setCourses((prev) => prev.filter((c) => c.id !== id));
      toast.success("Course deleted");
    } catch (err) {
      toast.error("Failed to delete course");
    }
  };

  const clearEdit = () => {
    setEditingCourse(null);
    setEditingCourseId(null); // ✅ Also reset here if edit is canceled
  };

  return (
    <div>
      <CreateCourse
        onSubmit={handleCourseSubmit}
        courseToEdit={editingCourse}
        clearEdit={clearEdit}
      />
      <CourseList
        courses={courses}
        onEdit={handleEdit}
        onDelete={handleDeleteCourse}
        editingCourseId={editingCourseId}
      />
    </div>
  );
}

export default CourseManager;
