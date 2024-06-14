import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

export default function PromoBanner({ allPromosLink, promos }) {
  const [currentPromotion, setCurrentPromotion] = useState(0);

  const handleNavClick = (direction) => {
    if (direction === "left") {
      setCurrentPromotion(
        (currentPromotion - 1 + promos.length) % promos.length
      );
    } else {
      setCurrentPromotion((currentPromotion + 1) % promos.length);
    }
  };

  return (
    <div className="flex justify-center items-center mx-auto bg-main-green p-3 md:p-4 text-sm">
      <button
        className="flex items-center p-3 md:py-0"
        onClick={() => handleNavClick("left")}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
      <div>
        <p className="text-center">
          <span>{promos[currentPromotion].promoOffer} </span>
          <a href={allPromosLink}>
            <span className="underline underline-offset-2">Book now</span>
          </a>
        </p>
      </div>
      <button
        className="flex items-center p-3 md:py-0"
        onClick={() => handleNavClick("right")}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
    </div>
  );
}
