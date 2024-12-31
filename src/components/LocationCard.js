import React, { useState } from "react";
import Button from "../components/BookBtn";
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import LocationCardOptions from "../helpers/LocationCardOptions";
import HoursOfOperation from "./LocationCardHoursOfOperation";
import GoogleMapReact from "google-map-react";

const isClient = typeof window !== "undefined";

export default function LocationCard({
  data: {
    title,
    address,
    description,
    hoursOfOperation,
    transportation,
    key,
    location,
  },
}) {
  console.log(
    title,
    address,
    JSON.parse(description.raw),
    JSON.parse(hoursOfOperation.raw),
    JSON.parse(transportation.raw)
  );

  const lat = parseFloat(location.lat);
  const lng = parseFloat(location.lon);

  const convertTransportation = (transportation) => {
    return transportation;
  };
  // px-4 sm:px-6 d:px-12 lg:px-24 py-16 lg:py-24
  return (
    <div className="px-4 py-12 sm:px-6 md:px-12 lg:px-6 flex justify-center items-center">
      <div
        style={{ width: `90%` }}
        className="border border-black py-8 px-3 lg:py-10 lg:px-12 flex justify-center items-center flex-col"
      >
        <div className="mx-10 w-full h-auto flex justify-center items-center rounded">
          {isClient && (
            <div style={{ height: "25vh", width: "100%" }}>
              <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_API_KEY }}
                defaultCenter={{
                  lat: location.lat,
                  lng: location.lon,
                }}
                defaultZoom={14}
              >
                <div
                  className="marker"
                  lat={lat}
                  lng={lng}
                  style={{ color: "red", fontSize: "24px" }}
                >
                  📍
                </div>
              </GoogleMapReact>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center max-w-2xl">
          <h2 className="font-serif font-bold text-2xl py-4">{title}</h2>
          {renderRichText(description, LocationCardOptions())}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="max-w-[250px]">{address}</p>
              <div className="my-4">
                {HoursOfOperation(
                  renderRichText(
                    hoursOfOperation,
                    LocationCardOptions("hoursOfOperation")
                  )
                )}
              </div>
            </div>
            <div>
              <h2 className="font-sans text-lg font-medium">
                Nearest Transportation
              </h2>
              <>
                {convertTransportation(
                  renderRichText(
                    transportation,
                    LocationCardOptions(
                      key === "NYC" ? "transportationNYC" : "transportationSD"
                    )
                  )
                )}
              </>
            </div>
          </div>
          <div>
            <Button />
          </div>
        </div>
      </div>
    </div>
  );
}
