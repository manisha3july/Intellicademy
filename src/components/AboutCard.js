import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./about.css";
import counters from './utils/aboutData.js'

function AboutCard() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const [counts, setCounts] = useState(counters.map(() => 0));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 } // Trigger animation when 50% visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      counters.forEach((counter, index) => {
        let start = 0;
        const end = counter.target;
        const duration = 2000; // Animation duration (2 seconds)
        const stepTime = Math.abs(Math.floor(duration / end));

        const timer = setInterval(() => {
          setCounts((prevCounts) => {
            const newCounts = [...prevCounts];
            if (newCounts[index] < end) {
              newCounts[index] += 1;
            } else {
              clearInterval(timer);
            }
            return newCounts;
          });
        }, stepTime);
      });
    }
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="About-section p-5">
      <div className="row d-flex justify-content-around">
        {counters.map((counter, index) => (
          <div className="col-sm-3" key={index}>
            <div className="about-card lightBlueBg d-flex align-items-center justify-content-center flex-column p-4">
              <FontAwesomeIcon icon={counter.icon} size="4x" className="blueColor mb-4" />
              <h3 className="mb-2">{counts[index]}+</h3>
              <h4 className="mb-2">{counter.title}</h4>
              <p className="text-center">{counter.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AboutCard;
