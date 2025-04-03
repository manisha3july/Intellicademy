import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./LatestPost.css";
import BlogImg from "../assets/blog.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Section from './Section';

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-next-arrow`}
      style={{ ...style, display: "flex", right: "80%" }}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faArrowRight} />
    </div>
  );
};
const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-prev-arrow`}
      style={{ ...style, display: "flex", left: "0%", zIndex: 1 }}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faArrowLeft} />
    </div>
  );
};

function LatestPost() {
    var settings = {
      dots: false,
      infinite: true,
      arrows: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />
    };

  return (
    <Section className='latestPost'>
      <div className='container'>
          <div className='row'>
            <div className='col-sm-12'>
            <div className='heading flex-column align-items-start'>
          <h3>LATEST POST</h3>
          <p>
            Artificial Intelligence (AI) is revolutionizing the way we learn. 
            From personalized learning experiences to AI-powered tutors, education 
            is evolving faster than ever. At AI Trend LMS, we embrace the latest AI 
            innovations to provide an intelligent, adaptive, and engaging learning environment.
          </p>
         
          </div>
            </div>
          </div>
          <div className=' row Blog_Wrap BlueBg p-4'>
            <div className=' col-sm-5 blog-img'>
               <img src= {BlogImg} className='img-fluid' />
            </div>
            <div className='col-sm-7'>
              {/* Slick Slider */}
          <Slider {...settings}>
            <div className='slide-item d-flex flex-column justify-content-center align-items-start'>
               <h4 className='text-white'>Personalized Learning with AI </h4>
               <p className='text-white'>Traditional education follows a one-size-fits-all approach, but AI is changing that. With intelligent algorithms, AI can analyze a learner’s progress and suggest tailored content, ensuring a customized learning experience.</p>
               <a href='#' className='btn white_btn' > Know More </a>
            </div>
            <div className='slide-item d-flex flex-column justify-content-center align-items-start'>
               <h4 className='text-white'>AI-Powered Tutors & Chatbots</h4>
               <p  className='text-white'>Imagine having a tutor available 24/7. AI-driven chatbots, like ChatGPT, provide instant answers, explain concepts, and guide learners through complex topics, making education more accessible.</p>
               <a href='#' className='btn white_btn' > Know More </a>
            </div>
            <div className='slide-item d-flex flex-column justify-content-center align-items-start'>
               <h4 className='text-white'>Hands-on AI Projects & Simulations</h4>
               <p className='text-white'>Learning AI isn't just about theory—it's about practice. Our platform offers real-world projects in Machine Learning, Deep Learning, Generative AI, Data Analytics, and Neural Networks, allowing learners to build AI solutions that solve real challenges.</p>
               <a href='#' className='btn white_btn' > Know More </a>
            </div>
            <div className='slide-item d-flex flex-column justify-content-center align-items-start'>
               <h4 className='text-white'>Keeping Up with AI Trends</h4>
               <p  className='text-white'>The AI field evolves rapidly, and staying updated is crucial. Our LMS continuously integrates the latest trends, from ChatGPT advancements to AI-powered automation, ensuring learners always have access to cutting-edge knowledge.</p>
               <a href='#' className='btn white_btn' > Know More </a>
            </div>
          </Slider>
            </div>
          </div>
    
          
        </div>
    </Section>
  );
}

export default LatestPost;
