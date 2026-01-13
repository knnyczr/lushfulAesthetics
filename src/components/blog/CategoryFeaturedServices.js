import React from "react";
import { Link } from "gatsby";
import { renderRichText } from "gatsby-source-contentful/rich-text";

export default function CategoryFeaturedServices({ featuredServices }) {
  const getPlainTextFromRichText = (richText) => {
    try {
      const doc =
        richText &&
        typeof richText === "object" &&
        typeof richText.raw === "string"
          ? JSON.parse(richText.raw)
          : typeof richText === "string"
          ? JSON.parse(richText)
          : richText;
      if (!doc || !Array.isArray(doc.content)) return "";

      const texts = [];
      const walk = (node) => {
        if (!node) return;
        if (node.nodeType === "text" && typeof node.value === "string") {
          texts.push(node.value);
        }
        if (Array.isArray(node.content)) {
          node.content.forEach(walk);
        }
      };
      doc.content.forEach(walk);
      return texts.join(" ").replace(/\s+/g, " ").trim();
    } catch {
      return "";
    }
  };
  return (
    <>
      <h1 className="uppercase font-bold font-sans text-xl mb-4">
        Featured Services
      </h1>
      <div className="h-0.5 bg-black mb-4" />
      <div className="w-100 flex flex-row h-auto overflow-auto snap-mandatory snap-x md:flex-col">
        {featuredServices.map((service, idx) => {
          console.log("Featured Services:", renderRichText(service.intro));
          return (
            <div className="mb-5 mr-4 last:mr-0 md:mr-0 lg:mr-0" key={idx}>
              <Link to={`/${service.slug}/`}>
                <div
                  className="h-[20rem] md:h-auto lg:max-h-[32rem] w-full aspect-[4/3] lg:aspect-[3/2]"
                  style={{
                    backgroundImage: `url(${service.heroImage.url})`,
                    backgroundSize: `cover`,
                    backgroundPosition: `center`,
                  }}
                />
                <h2 className="uppercase font-sans text-xl font-medium">
                  {service.serviceTitle}
                </h2>
                <p className="">
                   {getPlainTextFromRichText(service.intro).slice(0, 70)}
                                    ...
                </p>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
