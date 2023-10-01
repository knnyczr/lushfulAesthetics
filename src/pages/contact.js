import React from "react";
import { graphql } from "gatsby";
import ContactForm from "../components/ContactForm";
import { Helmet } from "react-helmet";

export { Head } from "../components/Layout";

export default function Contact({ data }) {
  const { disclosure, pageTitle, googleLocation, address, phoneNumber, email } =
    data.contentfulContactPage;

  return (
    <>
      <Helmet title={`Lushful Aesthetics | Contact`} />
      <div className="sm:px-0 d:px-12 lg:px-24 py-16 lg:py-24 flex flex-col justify-center items-center h-auto min-h-[50rem]">
        <h2 className="pb-16 uppercase text-3xl text-center md:text-4xl lg:text-5xl text-black font-serif font-semibold">
          {pageTitle}
        </h2>

        <div>
          <ContactForm
            address={address}
            phoneNumber={phoneNumber}
            email={email}
            googleLocation={googleLocation}
          />
        </div>
      </div>
    </>
  );
}

export const query = graphql`
  query ContactPageQuery {
    contentfulContactPage {
      disclosure {
        raw
      }
      pageTitle
      googleLocation
      address
      phoneNumber
      email
    }
  }
`;
