import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@popperjs/core";
import "./index.css";

import App from "./App";
import About from "./components/aboutPage/About";
import AIconcepts from "./components/landing/AIconcepts";
import Signup from "./components/loginSignup/Signup";
import Layout from "./components/Layout";
import Blog from "./components/blog/Blog";
import AdminPage from "./components/dashboard/AdminPage";
import FacultyPage from "./components/dashboard/FacultyPage";
import StudentPage from "./components/dashboard/StudentPage";
import CoursePage from "./components/courses/CoursePage";
import ContactPage from "./components/ContactPage";

import reportWebVitals from "./reportWebVitals";

// Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="about" element={<About />} />
          <Route path="blog" element={<Blog />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="signup" element={<Signup />} />
         
          <Route path="courses" element={<CoursePage />} />
           <Route path="/admin" element={<AdminPage />} />
            <Route path="/faculty" element={<FacultyPage />} />
          <Route path="/student" element={<StudentPage />} />
        </Route>
       
        {/* Dashboard routes - no Layout */}
       
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
