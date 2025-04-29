import React, { useEffect, useState } from "react";
import axios from "axios"; // ✅ Import axios
import Section from "../Section";
import DemoVideo from "./DemoVideo";
import ModuleList from "./ModuleList";
import "./course.css";

function CoursePage() {
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    axios
      .get("/data/machineLearningCourse.json")
      .then((response) => {
        console.log("Axios Response:", response);
        setCourseData(response.data);
      })
      .catch((error) => {
        console.error("Error loading course data:", error.message);
      });
  }, []);

  if (!courseData) return <p>Loading...</p>;

  return (
    <Section className="py-5">
      <div className="container">
        <div className="heading justify-content-center flex-column gap-0 mb-3">
          <h1 className="text-center gap-0" style={{ fontWeight: 700, fontSize: "32px" }}>
            {courseData.courseTitle.split(" ")[0]}
            <span style={{ fontWeight: 500, color: "#6790E8" }}>
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
            <DemoVideo />
          </div>
          <div className="col-sm-6">
            <h4>What is machine learning?</h4>
            <p>{courseData.whatIsML}</p>
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

        <ModuleList courseModules={courseData.courseModules} />
      </div>
    </Section>
  );
}

export default CoursePage;
