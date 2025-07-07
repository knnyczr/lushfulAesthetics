import React from "react";
import { graphql } from "gatsby";
import HelmetWithMetaDesc from "../../components/HelmetWithMeta";
import LocationCard from "../../components/LocationCard";

export { Head } from "../../components/Layout";

export default function Contact({ data }) {
  const {
    phoneNumber,
    email,
    metaTitle,
    metaDescription,
    ContactPageTitle,
    ContactAddress,
    addressLink,
    locationLatLon,
    contactPageDescriptionRichText,
    locationCardTitle,
    locationNearestTransportation,
  } = data.contentfulContactPage;

  return (
    <>
      <HelmetWithMetaDesc
        metaTitle={metaTitle}
        metaDescription={metaDescription}
      />
      <div className="sm:px-0 d:px-12 lg:px-24 py-16 lg:py-24 flex flex-col justify-center items-center h-auto min-h-[50rem]">
        <h1 className="pb-16 uppercase text-3xl text-center md:text-4xl lg:text-5xl text-black font-serif font-semibold">
          {`${ContactPageTitle}`}
        </h1>

        <div>
          <LocationCard
            data={{
              title: locationCardTitle,
              description: contactPageDescriptionRichText,
              address: ContactAddress,
              addressLink,
              hoursOfOperation: "newYorkHoursOfOperation",
              transportation: locationNearestTransportation,
              location: locationLatLon,
              phoneNumber: phoneNumber,
              email: email,
              key: "NYC",
            }}
          />
        </div>
      </div>
    </>
  );
}

export const query = graphql`
  query ContactPageQuery {
    contentfulContactPage(id: { eq: "27aafb18-969b-5d82-81ba-317faf01a80e" }) {
      email
      phoneNumber
      locationCardTitle
      contactPageDescriptionRichText {
        raw
      }
      locationNearestTransportation {
        raw
      }
      metaTitle
      metaDescription
      ContactPageTitle
      contactPageSubtitle
      ContactAddress
      addressLink
      locationLatLon {
        lat
        lon
      }
      contactPageDescription {
        contactPageDescription
      }
      offeredServices {
        references {
          slug
        }
        raw
      }
    }
  }
`;
