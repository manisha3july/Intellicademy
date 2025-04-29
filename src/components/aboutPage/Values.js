import React, { useState } from "react";
import { Container, Row, Col, Nav, Tab } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import values from '../utils/values'




function Values() {
  const [activeTab, setActiveTab] = useState(values[0].key);

  return (
    <section className="py-5 bg-light">
      <Container>
        <h3 className="text-center mb-5">Our Values</h3>
        <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
          <Row className="d-flex">
            <Col md={4}>
              <Nav className="flex-column">
                {values.map((val) => (
                  <Nav.Item key={val.key}>
                    <Nav.Link
                      eventKey={val.key}
                      style={
                         activeTab === val.key
                          ? { backgroundColor: "#fff", color: "#6790E8", border: 'soild 2px #6790E8',
                            border: 'solid 2px #6790E8', padding: '15px', fontWeight : "700" }
                          : { backgroundColor: "#6790E8", color: "#fff" , padding: '15px' }
                      }
                      className="mb-2"
                    >
                   
                   
                      {val.title}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </Col>
            <Col md={8}>
              <div
                style={{
                  maxHeight: "300px",
                  overflowY: "auto",
                  backgroundColor: "#fff",
                  padding: "20px",
                  borderRadius: "8px",
                  height: '100%',
                  boxShadow: "rgba(0, 0, 0, 0.3) 3px 2px 10px -2px",
                  display: 'flex',
                  alignItems: 'center',
                  borderLeft: 'solid 5px #6790e8',
                  textAlign:'center'
                }}
              >
                <Tab.Content>
                  {values.map((val) => (
                    <Tab.Pane eventKey={val.key} key={val.key}>
                       <FontAwesomeIcon icon={val.icon} style={{fontSize: "80px", color: '#6790e8', marginBottom: '15px'}} />
                      <h5 className="mb-2"><b>{val.title}</b></h5>
                      <p className="lead">{val.text}</p>
                    </Tab.Pane>
                  ))}
                </Tab.Content>
              </div>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </section>
  );
}

export default Values;
