import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import "./contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Please fill in your name.");
    } else if (!formData.email.trim()) {
      alert("Please fill in your email.");
    } else if (!formData.mobileNumber.trim()) {
      alert("Please fill in your mobile number.");
    } else if (!formData.message.trim()) {
      alert("Please fill in your message.");
    } else {
      alert("Thank you!");
      setFormData({
        name: "",
        email: "",
        mobileNumber: "",
        message: "",
      });
    }
  };

  return (
    <section className="contact-container lightBlueBg">
      <div className="container">
        <div className="row">
          {/* Contact Details Section */}
          <div className="col-sm-6">
            <div className="heading">
              <h3>Contact Us</h3>
            </div>
            <ul className="contact-list list">
              <li>
                <span className="icon">
                  <FontAwesomeIcon icon={faPhone} />
                </span>
                <p>7321930837</p>
              </li>
              <li>
                <span className="icon">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
                <p>manisha3july@gmail.com</p>
              </li>
              <li>
                <span className="icon">
                  <FontAwesomeIcon icon={faLocationDot} />
                </span>
                <p>Akshya Nagar 1st Block 1st Cross, Rammurthy Nagar, Bangalore-560016</p>
              </li>
            </ul>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.6000537684395!2d77.68606520986998!3d12.99741311426054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae16837f54dbc9%3A0xbed84d37fcf010ca!2sImpelsys!5e0!3m2!1sen!2sin!4v1742796413606!5m2!1sen!2sin"
              width="100%"
              height="200"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Contact Form Section */}
          <div className="col-sm-6">
            <div className="card shadow-lg p-4 border-0">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.name}
                    name="name"
                    placeholder="Enter your name"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={formData.email}
                    name="email"
                    placeholder="Enter your email"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Mobile Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    value={formData.mobileNumber}
                    name="mobileNumber"
                    placeholder="Enter your mobile number"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-control"
                    value={formData.message}
                    placeholder="Write your message"
                    name="message"
                    onChange={handleChange}
                    rows="4"
                  ></textarea>
                </div>
                <button type="submit" className="btn blue_btn w-100 py-2">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
