import React, { useContext, useState } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { graphql, useStaticQuery } from "gatsby";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../../images/logo-footer.svg";
import { Context } from "../Context";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import servicePageOptions from "../../helpers/servicePageOptions";
import { useSiteMetadata } from "../../hooks/use-site-metadata";
import nameFilter from "../../helpers/nameFilter";
import isEmail from "../../helpers/isEmail";
import { SafeRichText } from "../SafeRichText";

export default function AgeAndEmailCaptureModal({
  heroImage,
  isVerifyAgePopupOpen,
  setIsVerifyAgePopupOpen,
  serviceTitle,
  // shouldCaptureEmail,
  shouldVerifyAge,
}) {
  const { user, setUser } = useContext(Context);
  const [tempUser, setTempUser] = useState(user);
  const image = getImage(heroImage.gatsbyImageData);
  const website_url = useSiteMetadata().siteUrl;
  const options = servicePageOptions(website_url);
  const [submitState, setSubmitState] = useState("notSubmitted");
  // notSubmitted, loading, success, fail
  const [loadingMessage, setLoadingMessage] = useState("");

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

  async function getUserFromMailChimp(user) {
    return await (() => {
      return fetch("/api/mailchimp_get_user", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          first: user.name.first,
          last: user.name.last,
          email: user.email,
        }),
      });
    })().then((res) => res.json());
  }

  async function setUserTags(user) {
    await (() => {
      return fetch("/api/mailchimp_set_tags", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ ...user, serviceTitle }),
      });
    })()
      .then((res) => res.json())
      .then((res) => {
        setSubmitState("success");
        setUser({
          ...user,
          hasCheckedOrCreatedMailChimpForUser: true,
        });
        setIsVerifyAgePopupOpen({
          flags: { shouldCaptureEmail: false, shouldVerifyAge: false },
          isOpen: false,
        });
      })
      .catch((err) => {
        setSubmitState("success");
        setUser({
          ...user,
          hasCheckedOrCreatedMailChimpForUser: false,
        });
        setIsVerifyAgePopupOpen({
          flags: { shouldCaptureEmail: false, shouldVerifyAge: false },
          isOpen: false,
        });
      });
  }

  async function setNewUserToMailchimpList(user) {
    return await (() => {
      return fetch("/api/mailchimp_add_user_to_list", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          ...user,
        }),
      });
    })().then((res) => res.json());
  }

  async function handleSubmit() {
    setSubmitState("loading");
    setTimeout(() => {
      setLoadingMessage(`Working on it, please don't refresh`);
    }, 2000);

    if (isEmail(tempUser.email) && !user.hasCheckedOrCreatedMailChimpForUser) {
      const getUserResponse = await getUserFromMailChimp(tempUser);

      if (getUserResponse.success) {
        // If mailchimp user exists, we we set tags on them
        setUserTags(tempUser);
      }

      if (getUserResponse.error) {
        // if user does not exist, add them as a list memember.
        const setNewUserToMailChimpListResponse =
          await setNewUserToMailchimpList(tempUser);

        if (!setNewUserToMailChimpListResponse.error) {
          setUserTags(tempUser);
        }
      }
    } else if (
      isEmail(tempUser.email) &&
      user.hasCheckedOrCreatedMailChimpForUser
    ) {
      setUserTags(tempUser);
    } else {
      setSubmitState("fail");
    }
    setLoadingMessage("");
  }

  const renderInputs = (
    <div className="w-full md:flex md:flex-row md:gap-2">
      <input
        aria-label="First & Last name"
        id="name"
        className="my-2 p-5 placeholder-shown:font-serif placeholder-shown:text-black w-full"
        type="text"
        placeholder="First & Last name"
        onChange={(e) =>
          setTempUser({ ...tempUser, name: nameFilter(e.target.value) })
        }
      />
      <input
        aria-label="Email"
        id="email"
        className="my-2 p-5 placeholder-shown:font-serif w-full"
        type="text"
        placeholder="Email"
        onChange={(e) => setTempUser({ ...tempUser, email: e.target.value })}
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
        className="flex h-4/5 md:w-3/4x lg:h-4/5"
      >
        <div className="flex flex-nowrap flex-col justify-between px-6 lg:px-10 w-full md:w-1/2 relative">
          <div className="w-full py-4 md:py-8 flex flex-row justify-between items-center">
            <button
              onClick={() =>
                setIsVerifyAgePopupOpen({
                  ...isVerifyAgePopupOpen,
                  isOpen: false,
                })
              }
            >
              <FontAwesomeIcon
                className="text-white text-4xl font-light"
                icon={faClose}
              />
            </button>
            <div className="w-[120px] sm:w-[160px] md:w-[200px] lg:w-[250px]">
              <Logo />
            </div>
          </div>
          <form
            className="flex flex-col items-center"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            {/* TODO: Refactor 3 states */}
            <h1 className="font-serif text-2xl text-center text-white lg:text-3xl">
              {/* need to check if user has successfully submitted for another service instead of user.name and user.email */}
              {shouldVerifyAge
                ? user.name && user.email
                  ? verifyAgeWcookieTitle
                  : verifyAgeTitle
                : emailCaptureTitle}
            </h1>
            <p className="text-center py-3 md:py-4 text-white text-sm md:text-base leading-5">
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
              {/* if we need to verify age, and we have a user and email */}
              {shouldVerifyAge && user.name && user.email ? (
                <input type="checkbox" id="ageCheckBox" />
              ) : (
                // we dont have name or email
                renderInputs
              )}

              {/* if we need to verify age */}
              {shouldVerifyAge ? (
                // if we have cookie
                user.name && user.email ? (
                  <label
                    htmlFor="ageCheckBox"
                    className="text-center text-white text-xs"
                  >
                    {verifyAgeWcookieDisclaimer}
                  </label>
                ) : (
                  // no cookie, check age
                  <div className="text-center text-white text-xs">
                    {/* {renderRichText(verifyAgeDisclaimer, options)} */}
                    <SafeRichText
                      field={verifyAgeDisclaimer}
                      options={options}
                    />
                  </div>
                )
              ) : (
                // no need to verify age, capture email disclaimer
                <div className="text-center text-white text-xs">
                  {/* {renderRichText(emailCaptureDisclaimer, options)} */}
                  <SafeRichText
                    field={emailCaptureDisclaimer}
                    options={options}
                  />
                </div>
              )}
            </div>
            <button
              style={{
                borderRadius: `5px`,
                backgroundColor: `#FFF`,
                width: `160px`,
                minHeight: `24px`,
              }}
              className="my-4 lgmy-5 p-4 lg:p-5 uppercase text-main-green flex justify-center"
              type="submit"
            >
              {submitState !== "loading" ? (
                `Continue`
              ) : (
                <svg
                  className="animate-spin -ml-1 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="rgb(186, 186, 160)"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="rgb(186, 186, 160)"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
            </button>
            {submitState === "fail" && (
              <p className="text-[#B80014]">{`Enter a valid email`}</p>
            )}
            {submitState === "loading" && (
              <p className="text-white">{`${loadingMessage}`}</p>
            )}
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
