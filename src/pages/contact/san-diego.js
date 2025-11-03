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
    ContactAddress,
    locationLatLon,
    contactPageDescriptionRichText,
    locationCardTitle,
    addressLink,
    locationNearestTransportation,
    offeredServices,
  } = data.contentfulContactPage;

  return (
    <>
      <HelmetWithMetaDesc
        metaTitle={metaTitle}
        metaDescription={metaDescription}
      />
      <div className="sm:px-0 d:px-12 lg:px-24 py-16 lg:py-24 flex flex-col justify-center items-center h-auto min-h-[50rem]">
        <h1 className="pb-16 px-2 uppercase text-3xl text-center md:text-4xl lg:text-5xl text-black font-serif font-semibold">
          Contact Us at Our Hillcrest, San Diego Aesthetic Clinic
        </h1>
        <LocationCard
          data={{
            title: locationCardTitle,
            description: contactPageDescriptionRichText,
            address: ContactAddress,
            addressLink,
            hoursOfOperation: "sanDiegoHoursOfOperation",
            transportation: locationNearestTransportation,
            location: locationLatLon,
            phoneNumber: phoneNumber,
            email: email,
            offeredServices,
            key: "SD",
          }}
        />
      </div>
    </>
  );
}

export const query = graphql`
  query ContactPageQuery {
    contentfulContactPage(id: { eq: "270f104d-e518-5b0b-93bd-ba8c6e4ab050" }) {
      phoneNumber
      email
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
          serviceTitle
        }
      }
    }
  }
`;
