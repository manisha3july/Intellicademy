import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Section from "../Section";
import Team1 from "../../assets/Team1.jpg";
import teamDetail from "../utils/teamDetail";
import "./team.css";

function Team() {
  var settings = {
    dots: true,
    infinite: true,
    arrows: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true
  };

  return (
    <Section className={"team-container py-5"}>
      <div className="container">
        <div className="heading justify-content-center">
          <h3 className="text-center">Our Team</h3>
        </div>

      <div className="team-outer mt-5 mb-4">
        <div className="team-inner">
          <Slider {...settings}>
            {teamDetail.map((team, index) => (
              <div className="team-box" key={index}>
                <div className="team-box-inner">
                  <div className="team-img">
                    <img src={team.image} className="img-fluid" />
                  </div>
                  <div className="team-content">
                    <h4>{team.name}</h4>
                    <p>
                      <b>{team.title}</b>
                    </p>
                    <p>{team.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      </div>
    </Section>
  );
}

export default Team;
