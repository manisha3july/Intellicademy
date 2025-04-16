import React from "react";
import "./Hero.css";
import Section from "../Section";
import HeroImg from '../../assets/blog-hero.png'
import { motion } from "framer-motion";


function HeroImgTxt({title}) {
  return (
   <Section className='lightBlueBg pt-5 pb-5'>
     <div className="container">
     <div className="row d-flex align-items-center justify-content-center">
      <div className="col-sm-8">
         <motion.h1  initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }} className="text-center">{title}</motion.h1>
          <p className="text-center">Because staying current in AI isn’t optional — it’s essential. Intellacdemy isn’t just an education platform; it’s your launchpad to the future.</p>
        <p className="text-center">Join our growing community of forward-thinkers and innovators. Let’s explore what’s next, together.</p>
      </div>
        <div className="col-sm-4">
          <img src={HeroImg} className="img-fluid"/>
        </div>
      </div>
     </div>
   </Section>
  )
}

export default HeroImgTxt