import React from 'react'
import "./Hero.css";
import Section from '../Section';



function Hero() {
  return (
    <Section className='hero_container d-flex align-items-center'>
        <div className='container'>
        <h1 className='text-white text-end'>Welcome to Intellicademy <br/> <span> The Future of AI Learning</span>
        </h1>
        </div>
    </Section>
  )
}

export default Hero