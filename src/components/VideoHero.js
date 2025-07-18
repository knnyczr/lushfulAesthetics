import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

export default function VideoHero({ videoSrc, fallbackImage }) {
  const [showOverlay, setShowOverlay] = useState(false);

  const handleWatchVideo = () => {
    setShowOverlay(true);
    // Here you could integrate with a video modal or player
    console.log("Watch Overview Video clicked");
  };

  return (
    <div className="relative w-full max-w-[1536px] mx-auto overflow-hidden">
      {/* Video Background */}
      <div className="relative w-full h-[400px] lg:h-auto lg:aspect-[19/9] lg:max-h-[800px]">
        {videoSrc ? (
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={videoSrc} type="video/mp4" />
            {/* Fallback for browsers that don't support video */}
            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
              <p className="text-white">Video not supported</p>
            </div>
          </video>
        ) : (
          // Fallback with aesthetic clinic imagery simulation
          <div className="w-full h-full bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 relative overflow-hidden">
            {/* Simulated background pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full opacity-10"></div>
              <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-white rounded-full opacity-5"></div>
              <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-white rounded-full opacity-8"></div>
            </div>
            {/* Overlay for aesthetic clinic feel */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-30"></div>
          </div>
        )}
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>

      {/* Text Overlay */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
        {/* Main Heading */}
        <h1 className="font-serif font-bold text-white text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight mb-6">
          The <em className="font-serif italic">Art</em> Of
          <br />
          Aesthetic Innovation
        </h1>
        
        {/* Subtitle */}
        <h2 className="text-white text-sm md:text-base lg:text-lg font-light tracking-wider mb-2 uppercase">
          SHAFER CLINIC FIFTH AVENUE BY DR. DAVID SHAFER MD, FACS
        </h2>
        
        {/* Description */}
        <p className="text-white text-xs md:text-sm lg:text-base font-light tracking-wider mb-8 uppercase">
          PLASTIC SURGERY, DERMATOLOGY & MEDICAL SPA IN NYC
        </p>
        
        {/* Watch Video Button */}
        <button
          onClick={handleWatchVideo}
          className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full transition-all duration-300 group"
          aria-label="Watch Overview Video"
        >
          <FontAwesomeIcon 
            icon={faPlay} 
            className="text-black text-lg md:text-xl lg:text-2xl ml-1 group-hover:scale-110 transition-transform duration-300" 
          />
        </button>
        
        {/* Button Label */}
        <span className="text-white text-sm font-light mt-4 tracking-wide">
          Watch Overview Video
        </span>
      </div>
    </div>
  );
}