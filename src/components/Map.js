import React from "react";
import GoogleMapReact from "google-map-react";

// npmjs.com/package/google-map-react
// TODO:  need more time building this map component

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function Map({ coordinates }) {
  const defaultProps = {
    center: {
      lat: coordinates.lat,
      lng: coordinates.lon,
    },
    zoom: 15,
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={coordinates.lat}
          lng={coordinates.lon}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
}
