import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../aboutPage/about.css";
import Section from "../Section.js";
import counters from '../utils/aboutData.js';

function AboutCard() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const [counts, setCounts] = useState(counters.map(() => 0));

  useEffect(() => {
   
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          console.log(entries)
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
      const duration = 2000; // 2 seconds
      const steps = 50; // Number of animation steps
      const stepTime = duration / steps;

      const intervals = counters.map((counter, index) => {
        let start = 0;
        const end = counter.target;
        const increment = Math.ceil(end / steps);

        return setInterval(() => {
          setCounts((prevCounts) => {
            const newCounts = [...prevCounts];
            if (newCounts[index] < end) {
              newCounts[index] = Math.min(newCounts[index] + increment, end);
            } else {
              clearInterval(intervals[index]);
            }
            return newCounts;
          });
        }, stepTime);
      });

      return () => {
        intervals.forEach(clearInterval);
      };
    }
  }, [isVisible]);

  return (
    <Section ref={sectionRef} className="About-section p-5">
      <div className="row d-flex justify-content-around">
        {counters.map((counter, index) => (
          <div className="col-lg-3 col-sm mb-3" key={index}>
            <div className="about-card lightBlueBg d-flex align-items-center justify-content-center flex-column p-4">
              <FontAwesomeIcon icon={counter.icon} size="4x" className="blueColor mb-4" />
              <h3 className="mb-2">{counts[index]}+</h3>
              <h4 className="mb-2 text-center">{counter.title}</h4>
              <p className="text-center">{counter.text}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

export default AboutCard;
