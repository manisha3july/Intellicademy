import React from "react";

const DemoVideo = ({ videoPath, videoPoster }) => {
  console.log("Video Path:", videoPath); // Ensure video path is passed correctly

  return (
    <div className="max-w-3xl mx-auto p-4 rounded-2xl shadow-lg bg-white">
      <div className="rounded-lg overflow-hidden">
        <video
          controls
          style={{ width: "100%" }}
          className="w-full h-auto"
          poster={process.env.PUBLIC_URL + videoPoster} // Optional: Use a thumbnail image here
        >
          <source src={process.env.PUBLIC_URL + videoPath} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default DemoVideo;
