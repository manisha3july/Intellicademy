import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@popperjs/core"; // ✅ Explicitly import Popper.js
import "./index.css";
import App from "./App";
import About from "./components/About";
import AIconcepts from "./components/AIconcepts";
import LatestPost from "./components/LatestPost";
import Contact from "./components/Contact";
import Signup from "./components/Signup";
import Layout from "./components/Layout"; // Import Layout
import Home from "./components/Home"
import reportWebVitals from "./reportWebVitals";
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
          <Route path="Home" element={<Home />} />
          <Route path="About" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="aIconcepts" element={<AIconcepts />} />
          <Route path="latestPost" element={<LatestPost />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
