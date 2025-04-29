import React from "react";

const DemoVideo = () => {
  return (
    <div className="max-w-3xl mx-auto p-4 rounded-2xl shadow-lg bg-white">
      
      <div className="rounded-lg overflow-hidden">
        <video
          controls
          style={{width:'100%'}}
          className="w-full h-auto"
          poster="/thumbnail.jpg" // Optional: replace with a thumbnail image path
        >
          <source src="/demo-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default DemoVideo;
