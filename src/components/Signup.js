import React, { useState, useEffect } from "react";
import "./signup.css"; // Import custom styles
import Section from "./Section";
import axios from "axios";
import AdminPage from './AdminPage'
import { useNavigate } from "react-router-dom";

const UserType = ['Admin', 'Faculty', 'Student'];

const Signup = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    userType: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:3006/users');
      console.log(res.data);
      const submitData = await axios.post("http://localhost:3006/users", formData);
      alert(`Thank you, ${formData.name}! Your info has been submitted.`);
      navigate("/admin"); // This will route to AdminPage
    } catch (error) {
      alert('Data not loaded');
    }
  };

  const handleChange = (e) => {
    
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Invalid email format";
    if (!formData.password) errors.password = "Password is required";
    else if (formData.password.length < 6) errors.password = "Password must be at least 6 characters";
    if (!formData.confirmPassword) errors.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword) errors.confirmPassword = "Passwords do not match";
    if (!formData.country) errors.country = "Country is required";
    if (!formData.userType) errors.userType = "User type is required";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

  

    if (validateForm()) {
      setSubmitted(true);
      fetchData()
      console.log("Form Submitted", formData);
     
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        country: "",
        userType: "",
      });
    }
  };

  return (
    <Section className="signup-section">
      
      <div className="container">
    
      
           
      <div className="signup-container">
            <div className="card signup-card">
              <div className="card-body">
                <h2 className="text-center mb-4">Create an Account</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      className={`form-control ${errors.name ? "is-invalid" : ""}`}
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      className={`form-control ${errors.email ? "is-invalid" : ""}`}
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>

                  <div className="row">
                    <div className="col-sm-6 mb-3">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        name="password"
                        className={`form-control ${errors.password ? "is-invalid" : ""}`}
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                      />
                      {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>

                    <div className="col-sm-6 mb-3">
                      <label className="form-label">Confirm Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm password"
                      />
                      {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-6 mb-3">
                      <label className="form-label">Country</label>
                      <input
                        type="text"
                        name="country"
                        className={`form-control ${errors.country ? "is-invalid" : ""}`}
                        value={formData.country}
                        onChange={handleChange}
                        placeholder="Enter your country"
                      />
                      {errors.country && <div className="invalid-feedback">{errors.country}</div>}
                    </div>

                    <div className="col-sm-6 mb-3">
                      <label className="form-label">User Type</label>
                      <select
                        name="userType"
                        className={`form-control ${errors.userType ? "is-invalid" : ""}`}
                        value={formData.userType}
                        onChange={handleChange}
                      >
                        <option value="">Select User Type</option>
                        {UserType.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      {errors.userType && <div className="invalid-feedback">{errors.userType}</div>}
                    </div>
                  </div>

                  <button type="submit" className="btn blue_btn w-100">
                    Sign Up
                  </button>
                </form>
              </div>
            </div>
            </div>
        
      </div>
    </Section>
  );
};

export default Signup;
