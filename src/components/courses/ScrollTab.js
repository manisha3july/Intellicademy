import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './course.css'
const ScrollTab = () => {
  const scrollRef = useRef(null);
  const [activeId, setActiveId] = useState("Data-Driven");

  const sections = ["Data-Driven", "Iterative Learning", "Automation", "Self-Improvement"];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = scrollRef.current.scrollTop;
      const offsets = sections.map((id) => {
        const el = document.getElementById(id);
        return {
          id,
          offset: el ? el.offsetTop : 0,
        };
      });

      // Find the section that is currently in view
      let current = sections[0];
      for (let i = 0; i < offsets.length; i++) {
        if (scrollTop >= offsets[i].offset - 20) {
          current = offsets[i].id;
        }
      }

      setActiveId(current);
    };

    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [sections]);

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element && scrollRef.current) {
      const top = element.offsetTop;
      scrollRef.current.scrollTo({ top, behavior: "smooth" });
      setActiveId(id);
    }
  };

  return (
 
      <div className="row d-flex align-items-center justify-content-center">
        {/* Navigation */}
        <div className="col-md-4">
          <div id="list-example" className="list-group sticky-top" style={{borderRadius: '0'}}>
            {sections.map((id) => (
              <button
              style={{border:0}}
                key={id}
                className={`list-group-item list-group-item-action ${
                  activeId === id ? "active" : ""
                }`}
                onClick={() => handleScrollTo(id)}
              >
                {id}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="col-sm-7">
          <div
            ref={scrollRef}
            className="ps-4 tab_content"
            style={{ height: "150px", overflowY: "auto", position: "relative" }}
          >
            <h5 id="Data-Driven">Data-Driven</h5>
            <p>
              Machine Learning (ML) thrives on data. The more data it has access to,
              the better it can learn patterns, relationships, and insights.
              High-quality, diverse, and well-labeled datasets are essential
              for building reliable ML models.
            </p>

            <h5 id="Iterative Learning">Iterative Learning</h5>
            <p>
              ML models are not static. They continuously improve over time through
              iterative training cycles. As new data is collected and fed into
              the system, the model adapts, retrains, and often performs
              better. This process is similar to how humans learn: repetition
              and feedback drive improvement.
            </p>

              <h5 id="Automation">Automation</h5>
            <p>
              One of the most powerful features of ML is its ability to automate
              complex tasks that once required human intelligence. From image
              recognition to natural language processing, ML models can make
              decisions in real-time without explicit human input.
            </p>

              <h5 id="Self-Improvement">Self-Improvement</h5>
            <p>
              ML systems are inherently self-improving. They learn from mistakes,
              update themselves with fresh data, and gradually minimize errors.
              Over time, this allows the system to become more accurate and
              reliable, even in changing environments.
            </p>
          </div>
        </div>
      </div>
    
  );
};

export default ScrollTab;
