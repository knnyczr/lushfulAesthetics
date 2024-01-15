import React from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ImageModal({ imagePair, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center p-4 z-50">
      <div className="p-4 rounded flex overflow-auto max-w-full max-h-full">
        <div className="flex w-full max-w-4xl">
          {/* Before Image */}
          <div className="w-1/2 relative">
            <img
              src={imagePair.before}
              alt="Before"
              className="w-full h-full object-cover aspect-[3/4]"
            />
            <div className="absolute w-full h-full top-0 left-0 flex items-end justify-end text-white text-lg font-bold pr-6 pb-6 bg-gradient-to-t from-black/50 to-transparent">
              BEFORE
            </div>
          </div>
          {/* After Image */}
          <div className="w-1/2 relative">
            <img
              src={imagePair.after}
              alt="After"
              className="w-full h-full object-cover aspect-[3/4]"
            />
            <div className="absolute w-full h-full top-0 left-0 flex items-end justify-start text-white text-lg font-bold pl-6 pb-6 bg-gradient-to-t from-black/50 to-transparent">
              AFTER
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="flex flex-row absolute top-0 right-0 px-4 py-4 md:px-12 lg:px-4"
        >
          <FontAwesomeIcon
            className="text-white text-4xl p-4 font-light "
            icon={faClose}
          />
        </button>
      </div>
    </div>
  );
}
