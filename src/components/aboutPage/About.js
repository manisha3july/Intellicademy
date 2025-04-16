import React from "react";
import HeroImgTxt from "../banner/HeroImgTxt";
import GraphData from "../dashboard/GraphData";
import AboutSegments from "../landing/AboutSegments";
import Team from "./Team";
import Values from "./Values";

function About() {
  return (
    <>
      {/* <HeroInner bgimage={AboutImg} title='ABOUT' >    </HeroInner>  */}
      <HeroImgTxt title="Why Intellacdemy?" />
      <div className="container py-5">
        <div className="row d-flex align-items-center justify-content-center">
          <div className="col-sm-4">
            <GraphData chartType="pie" studentCount={4} professionals={3} entrepreneurs={3} />
          </div>
          <div className="col-sm-8">
            <AboutSegments />
          </div>
        </div>
        <Values />
        <Team />
      </div>

    </>
  );
}

export default About;
