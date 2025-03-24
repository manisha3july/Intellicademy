import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faBrain } from "@fortawesome/free-solid-svg-icons";
import "./about.css";
function AboutCard() {
  return (
    <section className="About-section p-5">
      <div className="row d-flex justify-content-around ">
        <div className="col-sm-3 ">
          <div className="about-card lightBlueBg d-flex align-item-center justify-content-center flex-column align-items-center p-4">
         
            <FontAwesomeIcon icon={faBookOpen} size="4x"
              className="blueColor mb-4" />
              <h3 className=" mb-2">100+</h3>
              <h4 className=" mb-2">AI Courses  </h4>
              <p className="text-center">Covering Machine Learning, Deep Learning, NLP, and more.</p>
          </div>
        </div>
        <div className="col-sm-3 ">
          <div className="about-card lightBlueBg d-flex align-item-center justify-content-center flex-column align-items-center p-4">
         
            <FontAwesomeIcon icon={faBrain} size="4x"
              className="blueColor mb-4" />
              
              <h3 className=" mb-2">50+</h3>
              <h4 className=" mb-2">Industry Experts </h4>
              <p className="text-center">Learn from AI professionals and leaders.</p>
          </div>
        </div>
        <div className="col-sm-3 ">
          <div className="about-card lightBlueBg d-flex align-item-center justify-content-center flex-column align-items-center p-4">
         
            <FontAwesomeIcon icon={faBookOpen} size="4x"
              className="blueColor mb-4" />
              <h3 className=" mb-2">95%</h3>
              <h4 className=" mb-2">Success Rate  </h4>
              <p className="text-center">Learners upskill and advance in their careers.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutCard;
