import React from "react";

const DemoVideo = ({ videoPath, videoPoster }) => {
  const fullVideoPath = process.env.PUBLIC_URL + videoPath;
  const fullPosterPath = process.env.PUBLIC_URL + videoPoster;

  console.log("Video Path:", fullVideoPath); // Debug log

  return (
    <div className="max-w-3xl mx-auto p-4 rounded-2xl shadow-lg bg-white">
      <div className="rounded-lg overflow-hidden">
        {/* ✅ Force re-render by key */}
        <video
          key={fullVideoPath}
          controls
          style={{ width: "100%" }}
          className="w-full h-auto"
          poster={fullPosterPath}
        >
          <source src={fullVideoPath} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default DemoVideo;


