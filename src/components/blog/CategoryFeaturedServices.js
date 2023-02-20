import React from "react";
import { Link } from "gatsby";
import { renderRichText } from "gatsby-source-contentful/rich-text";

export default function CategoryFeaturedServices({ featuredServices }) {
  return (
    <div className="order-last md:order-2 px-4 md:col-start-4 md:px-2 md:row-span-2">
      <h1 className="uppercase font-bold font-sans text-xl mb-4">
        Featured Services
      </h1>
      <div className="h-0.5 bg-black mb-4" />
      <div className="w-100 flex flex-row h-auto overflow-auto snap-mandatory snap-x md:flex-col">
        {featuredServices.map((service, idx) => {
          return (
            <div className="mb-5 mr-4 last:mr-0 md:mr-0 lg:mr-0" key={idx}>
              <Link to={`/${service.slug}`}>
                <div
                  className="h-60 w-60 md:h-40 md:w-auto"
                  style={{
                    backgroundImage: `url(${service.heroImage.url})`,
                    backgroundSize: `cover`,
                  }}
                />
                <h2 className="uppercase font-sans text-xl font-medium">
                  {service.serviceTitle}
                </h2>
                <p className="hidden md:block">
                  {renderRichText(service.intro)[0].props.children[0].slice(
                    0,
                    70
                  )}
                  ...
                </p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
