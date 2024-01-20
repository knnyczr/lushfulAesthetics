import React, { useEffect } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../../images/logo-footer.svg";

export default function AgeAndEmailCaptureModal({
  heroImage,
  setIsVerifyAgePopupOpen,
}) {
  const image = getImage(heroImage.gatsbyImageData);

  useEffect(
    () => {
      // TODO: get mailchimp info ready here
    },
    [
      //mailchimp data
    ]
  );
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      <div
        style={{
          width: `96%`,
          backgroundColor: `#BABAA0`,
        }}
        className="flex h-4/5 md:w-3/4 md:min-h-3/5 lg:h-4/5"
      >
        <div className="flex flex-nowrap flex-col justify-between px-10 w-full md:w-1/2 relative">
          <div className="w-full h-10 pt-16 md:pt-20 flex flex-row justify-between items-center">
            <button onClick={() => setIsVerifyAgePopupOpen(false)}>
              <FontAwesomeIcon
                className="text-white text-4xl font-light"
                icon={faClose}
              />
            </button>
            <div className="w-3/4 md:w-1/2 lg:w-3/5 xl:w-1/2">
              {/* this aria hidden into a react component needs testing */}
              <Logo aria-hidden={true} />
            </div>
          </div>
          <form className="flex flex-col items-center">
            <h1 className="font-serif text-4xl text-center text-white md:text-2xl lg:text-3xl">{`Verify your age`}</h1>
            <p className="text-center py-4 text-white">{`Verify your age and sign up with your email to receive updates on our latest products and exclusive access to view this content.`}</p>
            <div className="w-full md:flex md:flex-row md:gap-2">
              <input
                aria-label="Name"
                id="name"
                className="my-2 p-5 placeholder-shown:font-serif placeholder-shown:text-black w-full"
                type="text"
                placeholder="Name"
              />
              <input
                aria-label="Email"
                id="email"
                className="my-2 p-5 placeholder-shown:font-serif w-full"
                type="text"
                placeholder="Email"
              />
            </div>
            <p className="text-center text-white text-xs">{`By submitting this form and opting in for text messages, you agree to receive promotional and reminder texts from Lushful Aesthetics at the provided phone number, which may include messages sent by an automated system. Your consent is not required for any purchase. Message and data rates may apply. The frequency of messages varies. You can opt out at any time by replying STOP or following the unsubscribe link (if available). See our Privacy Policy and Terms for more details.`}</p>
            <button
              style={{
                borderRadius: `5px`,
                backgroundColor: `#FFF`,
                width: `160px`,
              }}
              className="my-5 p-5 uppercase text-main-green"
              type="button"
            >{`Continue`}</button>
          </form>
          <div />
        </div>
        <div className="hidden md:block md:w-1/2 relative ">
          <GatsbyImage
            image={image}
            alt={`decorative image: ${heroImage.description}`}
            className="h-full w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}
