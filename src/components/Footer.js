import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFacebook, faSquareTwitter, faLinkedin, faInstagram, faYoutube} from '@fortawesome/free-brands-svg-icons';

import "./contact.css";
// import {} from "@fortawesome/free-solid-svg-icons";
import "./Footer.css"; 

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          {/* Company Info */}
          <div className="footer-section">
            <h4 className="blueColor">About Intellicademy</h4>
            <p>
              AI Concepts provides cutting-edge courses on AI, Machine Learning,
              Deep Learning, and Data Science to help professionals and
              businesses innovate and grow.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="footer-section">
            <h4 className="blueColor">Explore</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Courses</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Testimonials</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="blueColor">Quick Links</h4>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Support</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="footer-section newsletter">
            <h4>Subscribe to Our Newsletter</h4>
            <p>Stay updated with the latest AI trends, courses, and insights.</p>
            <form>
              <input type="email" placeholder="Enter your email" required />
              <button type="submit  " className="blue_btn">Subscribe</button>
            </form>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="footer-bottom">
          <div className="social-icons">
            <a href="#" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faSquareFacebook} />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faSquareTwitter} />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
             <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faYoutube} />
            </a>
          </div>
          <p>© 2024 AI Concepts. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
