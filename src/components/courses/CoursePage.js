import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom"; // ✅ Import useLocation
import axios from "axios";
import Section from "../Section";
import DemoVideo from "./DemoVideo";
import ModuleList from "./ModuleList";
import "./course.css";
import LoginModalContext from "../loginSignup/LoginModalContext"; // ✅ Import context

function CoursePage() {
  const [courseData, setCourseData] = useState(null);
  const location = useLocation();
   const { handleShow } = useContext(LoginModalContext); // ✅ Correct usage

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const selectedCourse = searchParams.get("course") || "machineLearning"; // default fallback

    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`/data/${selectedCourse}.json`);
        console.log("Axios Response:", response);
        setCourseData(response.data);
      } catch (error) {
        console.error("Error loading course data:", error.message);
      }
    };

    fetchCourseData();
  }, [location.search]); // 🚀 Dependency on URL changes (important!)

  if (!courseData) return <p>Loading...</p>;

  return (
    <Section className="py-5">
      <div className="container">
        <div className="heading justify-content-center flex-column gap-0 mb-3">
          <h1 className="text-center gap-0" style={{ fontWeight: 700, fontSize: "32px" }}>
            {courseData.courseTitle.split(" ")[0]}
            <span style={{color: "#6790E8" }}>
              {courseData.courseTitle.replace(courseData.courseTitle.split(" ")[0], "")}
            </span>
          </h1>
          <p>{courseData.tagline}</p>
        </div>

        <div className="text-center mb-5">
          <p>{courseData.description}</p>
        </div>

        <div className="row mb-5 d-flex align-items-center justify-content-center">
          <div className="col-sm-6">
            <DemoVideo videoPoster={courseData.videoPoster} videoPath={courseData.videoPath} />
          </div>
          <div className="col-sm-6">
            <h4>What is {courseData.courseTitle}?</h4>
            <p>{courseData.whatIsML}</p>
            <button style={{float:'left'}} className="btn blue_btn" onClick={handleShow}>ENROLL NOW</button>
          </div>
        </div>

        <div className="row mb-5 pt-3">
          <div className="col-sm-6">
            <div className="card shadow-sm border-0 p-4 course-card lightBlueBg">
              <h4 className="mb-4 text-primary fw-bold">🛠️ What You’ll Learn</h4>
              <ul className="list-unstyled">
                {courseData.whatYouWillLearn.map((item, i) => (
                  <li key={i} className="mb-2 d-flex align-items-start">
                    <span className="check-icon me-2">✅</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="card shadow-sm border-0 p-4 course-card lightBlueBg">
              <h4 className="mb-4 text-primary fw-bold">📘 Course Highlights</h4>
              <ul className="list-unstyled">
                {courseData.courseHighlights.map((item, i) => (
                  <li key={i} className="mb-2 d-flex align-items-start">
                    <span className="check-icon me-2">✅</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
{/* 
        <ModuleList courseModules={courseData.courseModules} /> */}
      </div>
    </Section>
  );
}

export default CoursePage;
