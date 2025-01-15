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
    googleAddressLink,
  },
}) {
  const lat = parseFloat(location.lat);
  const lng = parseFloat(location.lon);

  // console.log(googleAddressLink, lat, lng);
  const convertTransportation = (transportation) => {
    return transportation;
  };
  // px-4 sm:px-6 d:px-12 lg:px-24 py-16 lg:py-24
  // return (
  //   <div className="px-4 sm:px-6 d:px-12 lg:px-24 2xl:px-0 py-16 lg:py-24 flex justify-center items-center w-full max-w-[1536px] mx-auto">
  //     <div
  //       // style={{ width: `90%` }}
  //       className="border border-black py-8 px-4 lg:py-12 lg:px-10 flex justify-center items-center flex-col w-full"
  //     >
  //       <div className="mx-10 w-full h-auto flex justify-center items-center rounded">
  //         {/* <div style={{ width: "100%" }}> */}
  //         {/* TODO: inject screenshot here */}
  //         {/* <a
  //             href={googleAddressLink}
  //             target="_blank"
  //             rel="noreferrer"
  //             aria-label="View our location on Google Maps (opens in a new tab)"
  //           >
  //             {lat === 32.84575 ? (
  //               <StaticImage
  //                 alt="image of map, link for google maps"
  //                 src={"../images/lushful-sd-location.png"}
  //                 width={2000}
  //                 height={500}
  //               />
  //             ) : (
  //               <StaticImage
  //                 alt="image of map, link for google maps"
  //                 src={"../images/lushful-nyc-location.png"}
  //                 width={2000}
  //                 height={500}
  //               />
  //             )}
  //           </a>
  //           {/* <div className="mx-10 max-w-lg w-auto flex justify-center items-center rounded">
  //           </div> */}
  //         {/* </div> */}
  //         {/* TODO:  try this plugin:  https://www.npmjs.com/package/google-maps-react-markers */}
  //         {isClient && (
  //           <div
  //             style={{ height: "30vh", width: "100%" }}
  //             className="h-1/4 w-full"
  //           >
  //             <GoogleMapReact
  //               bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_API_KEY }}
  //               defaultCenter={{
  //                 lat: location.lat,
  //                 lng: location.lon,
  //               }}
  //               defaultZoom={14}
  //             >
  //               <a href={googleAddressLink}>
  //                 <div
  //                   className="marker"
  //                   lat={lat}
  //                   lng={lng}
  //                   style={{ color: "red", fontSize: "24px" }}
  //                 >
  //                   📍
  //                 </div>
  //               </a>
  //             </GoogleMapReact>
  //           </div>
  //         )}
  //       </div>

  //       <div className="flex flex-col justify-center max-w-3xl">
  //         <h2 className="font-serif font-bold text-2xl py-4">{title}</h2>
  //         {renderRichText(description, LocationCardOptions())}
  //         <div className="flex flex-col md:flex-row gap-6 justify-start items-start">
  //           <div>
  //             <a href={googleAddressLink} className="max-w-[250px]">
  //               {address}
  //             </a>
  //             {/* <div className="my-4">
  //               {HoursOfOperation(
  //                 renderRichText(
  //                   hoursOfOperation,
  //                   LocationCardOptions("hoursOfOperation")
  //                 )
  //               )}
  //             </div> */}
  //           </div>
  //           <div>
  //             <h2 className="font-sans text-lg font-medium">
  //               Nearest Transportation
  //             </h2>
  //             <>
  //               {convertTransportation(
  //                 renderRichText(
  //                   transportation,
  //                   LocationCardOptions(
  //                     key === "NYC" ? "transportationNYC" : "transportationSD"
  //                   )
  //                 )
  //               )}
  //             </>
  //           </div>
  //         </div>
  //         <div>
  //           <Button />
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="flex justify-center items-center ">
      <div className="border border-black py-8 px-4 lg:py-12 lg:px-10 flex flex-col w-full h-full">
        <div className="w-full h-auto flex items-center rounded">
          {isClient && (
            <div style={{ height: "30vh", width: "100%" }}>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: process.env.GATSBY_GOOGLE_MAPS_API_KEY,
                }}
                defaultCenter={{
                  lat: location.lat,
                  lng: location.lon,
                }}
                defaultZoom={14}
              >
                <a href={googleAddressLink}>
                  <div
                    className="marker"
                    lat={lat}
                    lng={lng}
                    style={{ color: "red", fontSize: "24px" }}
                  >
                    📍
                  </div>
                </a>
              </GoogleMapReact>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between max-w-4xl h-full mx-auto">
          <div>
            <h2 className="font-serif font-bold text-2xl py-4">{title}</h2>
            {renderRichText(description, LocationCardOptions())}
            <div className="flex flex-col md:flex-row  xl:flex-col gap-12 justify-start items-start mb-4">
              <div>
                <a href={googleAddressLink} className="max-w-[250px]">
                  {address}
                </a>
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
          </div>
          <div>
            <Button />
          </div>
        </div>
      </div>
    </div>
  );
}
