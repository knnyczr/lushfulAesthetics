import React from "react";

export default function ImageWithOverlay({ src, alt, overlayText, type }) {
  const overlayClass =
    type === "Before" ? "justify-end pr-6" : "justify-start pl-6";

  return (
    <div className="relative w-1/2">
      <img
        src={src}
        alt={alt}
        className="w-full h-auto object-cover aspect-[3/4]"
      />
      <div
        className={`absolute w-full h-full top-0 left-0 flex items-end ${overlayClass} text-white font-medium pb-6 bg-gradient-to-t from-black/50 to-transparent`}
      >
        {overlayText}
      </div>
    </div>
  );
}
