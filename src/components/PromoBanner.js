import * as React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const promotions = [
  {
    text: "Book by 12/25 to get 20% OFF. CODE: DADDY25",
    link: "/link1",
  },
  { text: "2X points on 1/20-1/24", link: "/link1" },
  { text: "Refer your friend and get 20% OFF", link: "/link1" },
];

export default function PromoBanner() {
  const [currentPromotion, setCurrentPromotion] = useState(0);

  const handleNavClick = (direction) => {
    if (direction === "left") {
      setCurrentPromotion(
        (currentPromotion - 1 + promotions.length) % promotions.length
      );
    } else {
      setCurrentPromotion((currentPromotion + 1) % promotions.length);
    }
  };

  return (
    <div className="flex justify-center items-center mx-auto bg-main-green py-3 md:py-4 text-sm px-4 md:px-12 lg:px-4">
      <div className="flex justify-between items-center w-[600px] mx-auto">
        <button onClick={() => handleNavClick("left")}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <div>
          <p>
            <span>{promotions[currentPromotion].text}. </span>
            <a href={promotions[currentPromotion].link}>
              <span className="underline underline-offset-2">View all</span>
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
