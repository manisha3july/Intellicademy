// useCourseManager.js
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function useCourseManager() {
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
        await axios.put(`http://localhost:3006/courses/${editingCourse.id}`, course);
        toast.success("Course updated successfully");
      } else {
        await axios.post("http://localhost:3006/courses", course);
        toast.success("Course added successfully");
      }
      fetchCourses();
      clearEdit();
    } catch (error) {
      toast.error("Error saving course");
    }
  };

  const handleCourseEdit = (course) => {
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
    setEditingCourseId(null);
  };

  return {
    courses,
    editingCourse,
    editingCourseId,
    handleCourseSubmit,
    handleCourseEdit,
    handleDeleteCourse,
    clearEdit,
  };
}
