import React from "react";
import "./Hero.css";

function MovingTitle() {
  // Destructure 'image' prop

  const backgrounStyle = {
    backgroundColor: "#6790E8",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "400px",
    width: "100%",
    overflow: "hidden",
  };

  return (
    <div className={`portfolio2-text-outer `} style={backgrounStyle} > 
    <div class="hero2-lang textScroll">
      <div> About Us</div>
      <div> About Us</div>
    </div>
  </div>
  );
}

export default MovingTitle;
