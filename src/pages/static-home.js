import React from "react";
import VideoHero from "../components/VideoHero";
import Layout from "../components/Layout";

export default function StaticHomePage() {
  return (
    <Layout>
      <div>
        {/* New Video Hero Section */}
        <VideoHero />

        {/* Vision Statement Section */}
        <div className="px-4 md:px-12 lg:px-24 py-24 lg:py-36 flex flex-col justify-start md:justify-center md:items-center">
          <div className="max-w-screen-2xl font-serif font-bold text-black text-2xl md:text-3xl lg:text-4xl text-center leading-10">
            Transforming lives through innovative aesthetic medicine and personalized care.
          </div>
        </div>

        {/* Placeholder for other sections */}
        <div className="bg-gray-100 py-16 px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Additional Content</h2>
          <p className="text-gray-600">
            This static version demonstrates the new video hero implementation. 
            In production, this would include the full homepage content from Contentful.
          </p>
        </div>
      </div>
    </Layout>
  );
}

export const Head = () => (
  <>
    <title>Lushful Aesthetics - Static Demo</title>
    <meta name="description" content="Lushful Aesthetics - The Art of Aesthetic Innovation" />
  </>
);