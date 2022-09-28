import React, { useRef } from "react";
import Button from "../components/BookBtn";
import { StaticImage } from "gatsby-plugin-image";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function ContactForm({
  address,
  phoneNumber,
  email,
  googleLocation,
}) {
  return (
    <>
      <div className="px-4 py-12 sm:px-6 md:px-12 lg:px-24 flex justify-center items-center ">
        <div className="py-8 px-3 flex justify-center items-center flex-col md:flex-row">
          <div className="mx-4 md:mx-10 w-full max-w-md h-80 flex justify-center items-center rounded">
            <a href={`${googleLocation}`} target="_blank" rel="noreferrer">
              <StaticImage
                alt="image of map, link for google maps"
                src="../images/Lushful_address.png"
                width={600}
              />
            </a>
          </div>

          <div className="flex flex-col justify-center">
            <div className="font-medium text-2xl my-8 md:my-4">
              {/* {renderRichText(address)} */}
              {address}
            </div>
            <div className="font-medium my-4">
              {/* <a href={`tel:${phone}`}>{renderRichText(phoneNmber)}</a> */}
              <FontAwesomeIcon icon={faPhone} className="mr-4" />
              <a href={`tel:+1${phoneNumber}`}>{phoneNumber}</a>
            </div>
            <div className="font-medium mb-8">
              {" "}
              {/* <div>{renderRichText(email)}</div>  */}
              <FontAwesomeIcon icon={faEnvelope} className="mr-4" />
              <a href={`mailto:${email}`}>{email}</a>
            </div>
            <div>
              <Button />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
