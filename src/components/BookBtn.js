import React from "react";

export default function Button() {
  return (
    <>
      <a
        href="https://lushfulaesthetics.square.site/"
        target="_blank"
        rel="noreferrer"
      >
        <button
          className="py-3 px-6 bg-main-green hover:bg-main-green-shade rounded text-white uppercase "
          type="button"
        >
          Book Now
        </button>
      </a>
    </>
  );
}
