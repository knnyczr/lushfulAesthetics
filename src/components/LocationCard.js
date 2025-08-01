import React from "react";
import Button from "../components/BookBtn";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import LocationCardOptions from "../helpers/LocationCardOptions";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { Link } from "gatsby";

const isClient = typeof window !== "undefined";

export default function LocationCard({
  data: {
    title,
    address,
    description,
    transportation,
    key,
    location,
    addressLink,
    phoneNumber,
    email,
    offeredServices,
  },
}) {
  const lat = parseFloat(location.lat);
  const lng = parseFloat(location.lon);

  const convertTransportation = (transportation) => {
    return transportation;
  };

  const handleMarkerClick = () => {
    window.open(addressLink, "_blank");
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${process.env.GATSBY_GOOGLE_MAPS_API_KEY}`,
  });

  return (
    <div className="flex justify-center items-center ">
      <div className="flex flex-col w-full h-full border border-black py-8 px-4 mx-2 lg:py-12 lg:px-10 ">
        <div className="w-full h-auto flex items-center rounded">
          {isClient && isLoaded && (
            <div style={{ height: "30vh", width: "100%" }}>
              <GoogleMap
                mapContainerStyle={{
                  width: "100%",
                  height: "100%",
                }}
                center={{
                  lat: lat,
                  lng: lng,
                }}
                zoom={15}
              >
                <Marker
                  position={{ lat: lat, lng: lng }}
                  icon={{
                    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Google_Maps_pin.svg/40px-Google_Maps_pin.svg.png?20171209021230",
                    scaledSize: new window.google.maps.Size(23, 36),
                  }}
                  onClick={handleMarkerClick}
                />
              </GoogleMap>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between max-w-4xl h-full mx-auto">
          <div>
            <h2 className="font-serif font-bold text-2xl py-4">{title}</h2>
            <p className="mb-6">
              {renderRichText(description, LocationCardOptions())}
            </p>
            {offeredServices?.references && (
              <div className="mb-6">
                <h3 className="font-sans font-bold text-lg mb-2">
                  Offered Services
                </h3>
                <ul className="list-none">
                  {offeredServices.references.map((service, index) => (
                    <li
                      key={index}
                      className="font-sans font-medium h-auto mx-2 my-1 list-none"
                    >
                      <Link to={`/${service.slug}`}>
                        {service.serviceTitle}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-col md:flex-row  xl:flex-col gap-12 justify-start items-start mb-4">
              <div>
                <a href={addressLink} className="max-w-[250px]">
                  {address}
                </a>
                <div className="py-2">
                  <a
                    className="font-sans font-bold text-lg"
                    href={`tel:${phoneNumber}`}
                  >
                    {phoneNumber}
                  </a>
                </div>
                <div className="py-2 underline">
                  <a href={`$mailto:${email}`}>{email}</a>
                </div>
              </div>
              <div>
                <h2 className="font-sans text-lg font-medium">
                  Nearest Transportation
                </h2>
                {convertTransportation(
                  renderRichText(
                    transportation,
                    LocationCardOptions(
                      key === "NYC" ? "transportationNYC" : "transportationSD"
                    )
                  )
                )}
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
