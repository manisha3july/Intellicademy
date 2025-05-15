import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Section from "../Section";
import blogData from "../utils/blogData";
import Hero from "../banner/HeroInner";
import BlogImg from "../../assets/blogHero.jpg";
import "./Blog.css";
function Blog() {
  return (
    <Section className="BlogPage-container " >
    
        <Hero bgimage={BlogImg} title="Our Blog" />
        
  <div class="container mb-5 pt-5">
        <div className="row">
          {blogData.map((Bdata) => (
            <div className="col-sm-4 mb-3">
              <div className="card p-4  d-flex justify-content-center">
               <div className="d-flex align-items-center justify-content-center"> <FontAwesomeIcon icon={Bdata.icon} size="2xl" className="icon_style" /></div>
                <h5 className="card-title   fw-bold">{Bdata.title}</h5>
                <p className="card-text">{Bdata.description}</p>

                <p className="card-text ">
                  <i> {Bdata.author}</i>
                </p>
                <a
                  href={Bdata.url}
                  className="btn btn-primary bg-color width_cust"
                  target="_blank"
                >
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

export default Blog;
