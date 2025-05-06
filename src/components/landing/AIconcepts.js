import React from "react";
import { Link } from "react-router-dom";

import "./AIconcepts.css";
import aiConceptsData from "../utils/aiConceptData";
import Section from "../Section";

// Convert to camelCase (e.g., "Machine Learning" → "machineLearning")
const toCamelCase = (str) =>
  str
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .split(" ")
    .map((word, index) =>
      index === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join("");

function AIconcepts() {
  return (
    <Section className="aiConcept">
      {aiConceptsData.map((concept, index) => {
        const camelTitle = toCamelCase(concept.title);

        return (
          <div className="aiconceptOuter" key={index}>
            <div className="container">
              <div className="row aiconceptInner d-flex align-items-center justify-content-between">
                <div className="col-md-4 col-sm-12 text-center">
                  <img
                    src={concept.img}
                    className="img-fluid concept-image"
                    alt={concept.alt}
                  />
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
                    <Link
                      className="btn blue_btn"
                      to={`/courses?course=${camelTitle}`}
                      aria-label={`Learn more about ${concept.title}`}
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </Section>
  );
}

export default AIconcepts;
