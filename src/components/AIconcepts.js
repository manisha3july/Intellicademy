import React from "react";

import "./AIconcepts.css";
import aiConceptsData  from "./utils/aiConceptData";

function AIconcepts() {
  return (
    <section className="aiConcept">
      {aiConceptsData.map((concept, index) => (
        <div className="aiconceptOuter" key={index}>
          <div className="container">
            <div className="row aiconceptInner d-flex align-items-center justify-content-between">
              <div className="col-md-4 col-sm-12 text-center">
                <img src={concept.img} className="img-fluid concept-image" alt={concept.alt} />
              </div>
              <div className="col-md-7 col-sm-12">
                <div className="conceptBox">
                  <h3 className="mb-2">{concept.title}</h3>
                  <p>{concept.description}</p>
                  <ul className="list">
                    {concept.topics.map((topic, i) => (
                      <li key={i}>✅ {topic}</li>
                    ))}
                  </ul>
                  <a className="btn blue_btn" href="#" aria-label={`Learn more about ${concept.title}`}>
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default AIconcepts;
