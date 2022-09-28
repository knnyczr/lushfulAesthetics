import React from "react";
import { graphql } from "gatsby";
import ContactForm from "../components/ContactForm";
import { Helmet } from "react-helmet";
import { renderRichText } from "gatsby-source-contentful/rich-text";

export default function Contact({ data }) {
  const { disclosure, pageTitle } = data.contentfulContactPage;
  const { address } = data.contentfulHomePage;

  // console.log(`here is the address`,address);

  return (
    <>
      <Helmet title={`Lushful Aesthetics | Contact`} />
      <div className="px-4 sm:px-6 d:px-12 lg:px-24 py-16 lg:py-24 flex flex-col justify-center items-center">
        <h2 className="pb-8 uppercase text-2xl font-semibold ">{pageTitle}</h2>
        <div className="mb-16 ext-lg lg:text-2xl text-center ">
          {renderRichText(disclosure)}
        </div>

        <div>
          <ContactForm address={address} />
        </div>
      </div>
    </>
  );
}

export const query = graphql`
  # query will go here
  query ContactPageQuery {
    contentfulContactPage {
      disclosure {
        raw
      }
      pageTitle
    }
    contentfulHomePage {
      id
      address {
        raw
      }
    }
  }
`;
