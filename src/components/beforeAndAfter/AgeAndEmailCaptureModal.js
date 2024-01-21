import React, { useContext, useEffect } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { graphql, useStaticQuery } from "gatsby";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../../images/logo-footer.svg";
import { Context } from "../Context";

export default function AgeAndEmailCaptureModal({
  heroImage,
  setIsVerifyAgePopupOpen,
  shouldCaptureEmail,
  shouldVerifyAge,
}) {
  const { user, setUser } = useContext(Context);
  const image = getImage(heroImage.gatsbyImageData);

  const {
    contentfulAgeAndEmailCapturePopup: {
      verifyAgeTitle,
      verifyAgeBodyContent,
      verifyAgeDisclaimer,
      verifyAgeWcookieTitle,
      verifyAgeWcookieContent,
      verifyAgeWcookieDisclaimer,
      emailCaptureTitle,
      emailCaptureContent,
      emailCaptureDisclaimer,
    },
  } = useStaticQuery(graphql`
    query AgeAndEmailCaptureModal {
      contentfulAgeAndEmailCapturePopup {
        verifyAgeTitle
        verifyAgeBodyContent
        verifyAgeDisclaimer {
          raw
        }
        verifyAgeWcookieTitle
        verifyAgeWcookieContent
        verifyAgeWcookieDisclaimer
        emailCaptureTitle
        emailCaptureContent
        emailCaptureDisclaimer {
          raw
        }
      }
    }
  `);

  useEffect(() => {
    // TODO: get mailchimp info ready here
    // TODO: conditional render components based on should capture email or verifyAge
    // console.log(
    //   "here is the extrapolated values",
    //   user,
    //   setUser,
    //   shouldCaptureEmail,
    //   shouldVerifyAge
    // );
  }, [
    //mailchimp data
    user,
    setUser,
  ]);

  const renderInputs = (
    <div className="w-full md:flex md:flex-row md:gap-2">
      <input
        aria-label="Name"
        id="name"
        className="my-2 p-5 placeholder-shown:font-serif placeholder-shown:text-black w-full"
        type="text"
        placeholder="Name"
        onChange={(e) => setUser({ ...user, name: e.target.value })}
      />
      <input
        aria-label="Email"
        id="email"
        className="my-2 p-5 placeholder-shown:font-serif w-full"
        type="text"
        placeholder="Email"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
    </div>
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
              <Logo />
            </div>
          </div>
          <form className="flex flex-col items-center">
            <h1 className="font-serif text-4xl text-center text-white md:text-2xl lg:text-3xl">
              {/* need to check if user has successfully submitted for another service instead of user.name and user.email */}
              {shouldVerifyAge
                ? user.name && user.email
                  ? verifyAgeWcookieTitle
                  : verifyAgeTitle
                : emailCaptureTitle}
            </h1>
            <p className="text-center py-4 text-white">
              {shouldVerifyAge
                ? user.name && user.email
                  ? verifyAgeWcookieContent
                  : verifyAgeBodyContent
                : emailCaptureContent}
            </p>

            <div
              className={
                shouldVerifyAge && user.name && user.email
                  ? "flex flex-wrap gap-1"
                  : ""
              }
            >
              {shouldVerifyAge && user.name && user.email ? (
                <input type="checkbox" id="ageCheckBox" />
              ) : (
                renderInputs
              )}

              {shouldVerifyAge ? (
                user.name && user.email ? (
                  <label
                    for="ageCheckBox"
                    className="text-center text-white text-xs"
                  >
                    {/* TODO: DISCLAIMERS NEED RENDER RICH TEXT */}
                    {verifyAgeWcookieDisclaimer}
                  </label>
                ) : (
                  <p className="text-center text-white text-xs">
                    {verifyAgeDisclaimer}
                  </p>
                )
              ) : (
                <p className="text-center text-white text-xs">
                  {emailCaptureDisclaimer}
                </p>
              )}
            </div>
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
