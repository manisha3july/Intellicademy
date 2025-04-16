import React from "react";
import "./Hero.css";
import Section from "../Section";
import { motion } from "framer-motion";

function HeroInner({ bgimage, title }) {
  // Destructure 'image' prop

  const backgroundImg = {
    backgroundImage: `url(${bgimage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "400px",
    width: "100%",
  };

  return (
    <Section
      className="hero_inner_container d-flex align-items-end"
      style={backgroundImg}
    >
      <div className="container">
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }} className="title_box">
          <h1>
          {title}
          </h1>
          </motion.div>
        </div>
    </Section>
  );
}

export default HeroInner;
