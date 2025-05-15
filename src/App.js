import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "./components/banner/Hero.js";
import AboutTextImg from "./components/landing/AboutTextImg.js";
import AboutInfoCard from "./components/landing/AboutInfoCard.js";
import AIconcepts from "./components/landing/AIconcepts.js";
import LatestPost from "./components/landing/LatestPost.js";
import Contact from "./components/landing/Contact.js";

function App() {

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger); // Register ScrollTrigger

    gsap.to(".anibox", {
      scrollTrigger: {
        trigger: ".anibox",
       
        start: "top 10%", // Start when .anibox enters viewport
        end: "top 10%", // End at 50% of viewport
        scrub: 2, // Smooth animation while scrolling
        markers:false, // Debugging markers (remove after testing)
      },
      y: 50, // Move down 200px
      opacity: 1, // Ensure visibility
      duration: 1,
    });
  }, []);
  
  return (
    <>
     
    <Hero />
    <AboutTextImg />
    <AboutInfoCard />
    <AIconcepts />
    <LatestPost />
    <Contact/>
    

    </>
  );
}

export default App;
