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
    <div className="flex justify-center items-center mx-auto bg-main-green py-3 md:py-4 text-sm px-4 md:px-12 lg:px-4">
      <div className="flex justify-between items-center w-[700px] mx-auto text-center">
        <button onClick={() => handleNavClick("left")}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <div>
          <p>
            <span>{promos[currentPromotion].promoOffer} </span>
            <a href={allPromosLink}>
              <span className="underline underline-offset-2">Book now</span>
            </a>
          </p>
        </div>
        <button onClick={() => handleNavClick("right")}>
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </div>
    </div>
  );
}
