import React from "react";
import VideoHero from "../components/VideoHero";

export default function VideoHeroTestPage() {
  return (
    <div className="min-h-screen">
      <VideoHero />
      
      <div className="py-16 px-8 text-center bg-white">
        <h2 className="text-xl mb-4 font-serif font-bold">Test Content Below Hero</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          This page demonstrates the new video hero component with the design matching the provided mockup.
          The hero section includes "The Art Of Aesthetic Innovation" heading, clinic information, 
          and a "Watch Overview Video" button.
        </p>
      </div>
    </div>
  );
}

export const Head = () => <title>Video Hero Test - Lushful Aesthetics</title>;