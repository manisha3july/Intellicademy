import React from 'react'

// import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import segments from '../utils/segments';
import { color } from 'framer-motion';
function AboutSegments() {

    const cardStyle = {

    }
    return (
        <div>
             <div className='heading ' style={{justifyContent:'center'}}><h3 className='text-center'>Our Impact</h3></div>
          <p className="text-center mb-4">Who's Learning with Intellacdemy?</p>
          <div className="d-flex flex-wrap gap-3">
        {segments.map((segment, index) => (
          <div
            key={index}
            className="card d-flex flex-column"
            style={{ maxWidth: "250px", width:"100%" }}
          >
            <div className="card-body d-flex flex-column align-items-center">

            <FontAwesomeIcon icon={segment.icon}   className={`fa-2x  mb-3`} style={{color: `${segment.color}`}} />
            
             <div className='text-center'>
             <h5 className="card-title">{segment.title}</h5>
              <p className="card-text" style={{fontSize:'14px', marginBottom:'5px'}}>{segment.description}</p>
              <div className="h4 fw-bold">{segment.percent}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
        </div>
      );
}

export default AboutSegments