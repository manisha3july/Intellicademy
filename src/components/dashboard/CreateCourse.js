// CreateCourse.jsx
import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

function CreateCourse({ onSubmit, courseToEdit, clearEdit }) {
  const [course, setCourse] = useState({
    title: "",
    description: "",
    duration: "",
    imageUrl: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (courseToEdit) {
      setCourse(courseToEdit);
      setImagePreview(courseToEdit.imageUrl || null);
    }
  }, [courseToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCourse((prev) => ({ ...prev, imageUrl: reader.result }));
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const validate = () => {
    const errors = {};
    if (!course.title) errors.title = "Title is required";
    if (!course.description) errors.description = "Description is required";
    if (!course.duration) errors.duration = "Duration is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.warn("Please fill in all fields");
      return;
    }
    onSubmit(course);
    setCourse({ title: "", description: "", duration: "", imageUrl: "" });
    setImagePreview(null);
  };

  return (
    <>
      <h4>{courseToEdit ? "Edit Course" : ""}</h4>
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "800px", margin: "0 auto" }}
        className="card p-4 mb-4 courseCreateform"
      >
        <div className="form-group mb-3">
          <label>Title</label>
          <input
            name="title"
            value={course.title}
            onChange={handleChange}
            className={`form-control ${formErrors.title ? "is-invalid" : ""}`}
          />
          {formErrors.title && (
            <div className="invalid-feedback">{formErrors.title}</div>
          )}
        </div>

        <div className="form-group mb-3">
          <label>Description</label>
          <textarea
            name="description"
            value={course.description}
            onChange={handleChange}
            rows="3"
            className={`form-control ${
              formErrors.description ? "is-invalid" : ""
            }`}
          />
          {formErrors.description && (
            <div className="invalid-feedback">{formErrors.description}</div>
          )}
        </div>

        <div className="form-group mb-3">
          <label>Duration</label>
          <input
            name="duration"
            value={course.duration}
            onChange={handleChange}
            className={`form-control ${
              formErrors.duration ? "is-invalid" : ""
            }`}
          />
          {formErrors.duration && (
            <div className="invalid-feedback">{formErrors.duration}</div>
          )}
        </div>

        <div className="form-group mb-3">
          <label>Course Image</label>
          <input
            type="file"
            className="form-control"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="preview"
              className="img-fluid mt-2"
              style={{ maxWidth: 200 }}
            />
          )}
        </div>

        <button
          type="submit"
          style={{ maxWidth: "160px", margin: " 0 auto" }}
          className="btn blue_btn mb-2"
        >
          {courseToEdit ? "Update Course" : "Add Course"}
        </button>
        {courseToEdit && (
          <button
            style={{ maxWidth: "140px", margin: " 0 auto" }}
            type="button"
            className="btn blue_btn "
            onClick={clearEdit}
          >
            Cancel
          </button>
        )}
      </form>
      <ToastContainer />
    </>
  );
}

export default CreateCourse;
