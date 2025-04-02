import React, { useState } from "react";
import "./signup.css"; // Import custom styles

const countryCityData = {
  USA: ["New York", "Los Angeles", "Chicago", "Houston"],
  Canada: ["Toronto", "Vancouver", "Montreal", "Calgary"],
  UK: ["London", "Manchester", "Birmingham", "Glasgow"],
  India: ["Mumbai", "Delhi", "Bangalore", "Hyderabad"],
};

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    city: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "country") {
      setFormData({ ...formData, country: value, city: "" });
    }
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
    if (!formData.city) errors.city = "City is required";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
      console.log("Form Submitted", formData);
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        country: "",
        city: "",
      });
    }
  };

  return (
    <section className="signup-section">
      <div className="container">
        <div className="signup-container">
          {submitted ? (
            <div className="alert alert-success text-center">🎉 Sign-up successful!</div>
          ) : (
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
                  <div className='row'>
                  <div className="col-sm-6  mb-3">
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
                  <div className='row'>

                  <div className="col-sm-6 mb-3">
                    <label className="form-label">Country</label>
                    <select
                      name="country"
                      className={`form-control ${errors.country ? "is-invalid" : ""}`}
                      value={formData.country}
                      onChange={handleChange}
                    >
                      <option value="">Select Country</option>
                      {Object.keys(countryCityData).map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                    {errors.country && <div className="invalid-feedback">{errors.country}</div>}
                  </div>

                  <div className="col-sm-6  mb-3">
                    <label className="form-label">City</label>
                    <select
                      name="city"
                      className={`form-control ${errors.city ? "is-invalid" : ""}`}
                      value={formData.city}
                      onChange={handleChange}
                      disabled={!formData.country}
                    >
                      <option value="">Select City</option>
                      {formData.country &&
                        countryCityData[formData.country].map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                    </select>
                    {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                  </div>
</div>
                  <button type="submit" className="btn blue_btn w-100">
                    Sign Up
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Signup;
