import React from "react";
import { graphql } from "gatsby";
import ContactForm from "../components/ContactForm";
import HelmetWithMetaDesc from "../components/HelmetWithMeta";
import LocationCard from "../components/LocationCard";

export { Head } from "../components/Layout";

export default function Contact({ data }) {
  const {
    disclosure,
    pageTitle,
    googleLocation,
    address,
    phoneNumber,
    email,
    metaTitle,
    metaDescription,
    newYorkTitle,
    newYorkDescriptiveText,
    newYorkAddress,
    newYorkHoursOfOperation,
    newYorkNearestTransportation,
    sanDiegoTitle,
    sanDiegoDescriptiveText,
    sanDiegoAddress,
    sanDiegoHoursOfOperation,
    sanDiegoNearestTransportation,
    newYorkLocationLatLon,
    sanDiegoLocationLatLon,
  } = data.contentfulContactPage;

  return (
    <>
      <HelmetWithMetaDesc
        metaTitle={metaTitle}
        metaDescription={metaDescription}
      />
      <div className="sm:px-0 d:px-12 lg:px-24 py-16 lg:py-24 flex flex-col justify-center items-center h-auto min-h-[50rem]">
        <h2 className="pb-16 uppercase text-3xl text-center md:text-4xl lg:text-5xl text-black font-serif font-semibold">
          {pageTitle}
        </h2>

        <div>
          {/* <ContactForm
            address={address}
            phoneNumber={phoneNumber}
            email={email}
            googleLocation={googleLocation}
          /> */}
          <LocationCard
            data={{
              title: newYorkTitle,
              description: newYorkDescriptiveText,
              address: newYorkAddress,
              hoursOfOperation: newYorkHoursOfOperation,
              transportation: newYorkNearestTransportation,
              location: newYorkLocationLatLon,
              phoneNumber: phoneNumber,
              email: email,
              key: "NYC",
            }}
          />
          <LocationCard
            data={{
              title: sanDiegoTitle,
              description: sanDiegoDescriptiveText,
              address: sanDiegoAddress,
              hoursOfOperation: sanDiegoHoursOfOperation,
              transportation: sanDiegoNearestTransportation,
              location: sanDiegoLocationLatLon,
              phoneNumber: phoneNumber,
              email: email,
              key: "SD",
            }}
          />
        </div>
      </div>
    </>
  );
}

export const query = graphql`
  query ContactPageQuery {
    contentfulContactPage {
      metaTitle
      metaDescription
      disclosure {
        raw
      }
      pageTitle
      googleLocation
      address
      phoneNumber
      email
      newYorkTitle
      newYorkDescriptiveText {
        raw
      }
      newYorkAddress
      newYorkHoursOfOperation {
        raw
      }
      newYorkNearestTransportation {
        raw
      }
      sanDiegoTitle
      sanDiegoDescriptiveText {
        raw
      }
      sanDiegoAddress
      sanDiegoHoursOfOperation {
        raw
      }
      sanDiegoNearestTransportation {
        raw
      }
      newYorkLocationLatLon {
        lat
        lon
      }
      sanDiegoLocationLatLon {
        lat
        lon
      }
    }
  }
`;
