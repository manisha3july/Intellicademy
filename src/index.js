import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import ReactDOM from "react-dom/client";
import { HashRouter as Router, Routes, Route } from "react-router-dom";  // ✅ Import Routes and Route
import "./index.css";
import App from "./App";
import Product from "./components/Product";
import Customer from "./components/Customer";
import Home from "./components/Home";
import StudentFarm from './components/StudentFarm';
import reportWebVitals from "./reportWebVitals";
import "@fortawesome/react-fontawesome";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/product" element={<Product />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/home" element={<Home />} />
        <Route path="/studentfarm" element={<StudentFarm />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
