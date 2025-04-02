import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AboutImg from "../assets/AI.jpg";
import { faBookOpenReader } from "@fortawesome/free-solid-svg-icons";
import "./about.css";
function About() {
  return (
    <section className="About-section p-5">
      <div className="row d-flex justify-content-around">
        <div className="col-sm-5">
          <img src={AboutImg} className="img-fluid" />
        </div>
        <div className="col-sm-6">
          <div className="about-box">
            <p>
              <b>Stay Ahead with the Latest AI Trends & Innovations</b>
            </p>
            <p>
              AI is evolving faster than ever, and staying updated is the key to
              success. AI Trend LMS is designed to provide cutting-edge AI
              education, empowering learners with real-world knowledge, hands-on
              projects, and industry insights.
            </p>
          </div>
          <div className="heading">
            <FontAwesomeIcon
              icon={faBookOpenReader}
              size="3x"
              className="blueColor"
            />
            <h3>Our Mission</h3>
          </div>
          <p>
          To empower learners worldwide with AI-driven education, bridging the gap between knowledge and real-world applications while keeping up with the rapidly evolving AI landscape. We strive to make AI education accessible, engaging, and practical, fostering innovation, critical thinking, and problem-solving skills. Our mission is to equip individuals with the tools and knowledge needed to thrive in an AI-powered future, ensuring inclusivity, adaptability, and continuous learning in an ever-changing digital world.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
