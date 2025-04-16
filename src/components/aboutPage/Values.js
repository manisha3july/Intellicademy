import React, { useState } from "react";
import { Container, Nav, Tab } from "react-bootstrap";

const values = [
  {
    key: "curiosity",
    icon: "fas fa-lightbulb",
    title: "Curiosity-Driven",
    text: "We believe curiosity is the spark of all innovation. Our content is designed to inspire exploration and experimentation.",
  },
  {
    key: "evolving",
    icon: "fas fa-sync-alt",
    title: "Always Evolving",
    text: "Just like AI, we constantly adapt — updating our courses, tools, and content to keep pace with the latest advancements.",
  },
  {
    key: "community",
    icon: "fas fa-users",
    title: "Community First",
    text: "Learning is better together. We foster a collaborative, global environment where knowledge flows in every direction.",
  },
  {
    key: "impact",
    icon: "fas fa-bullseye",
    title: "Impact-Oriented",
    text: "Our focus isn’t just on learning for learning’s sake. We care about real-world application, real results, and real change.",
  },
];

function Values() {
  const [activeTab, setActiveTab] = useState(values[0].key);

  return (
    <section className="py-5 bg-light">
      <Container>
        <h3 className="text-center mb-4">Our Values</h3>
        <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
          <Nav variant="pills" className="justify-content-center mb-4 flex-wrap">
            {values.map((val) => (
              <Nav.Item key={val.key}>
                <Nav.Link eventKey={val.key} className="text-center mx-2 px-3 py-2">
                  <i className={`${val.icon} me-2`}></i>
                  {val.title}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
          <Tab.Content>
            {values.map((val) => (
              <Tab.Pane eventKey={val.key} key={val.key}>
                <div className="text-center px-4 px-md-5">
                  <h5 className="mb-3 text-primary">{val.title}</h5>
                  <p className="lead">{val.text}</p>
                </div>
              </Tab.Pane>
            ))}
          </Tab.Content>
        </Tab.Container>
      </Container>
    </section>
  );
}

export default Values;
