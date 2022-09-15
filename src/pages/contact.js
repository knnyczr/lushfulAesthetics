import React from "react";
import ContactForm from "../components/ContactForm";
import { Helmet } from "react-helmet";

export default function contact() {
  return (
    <>
      <Helmet title={`Lushful Aesthetics | Contact`} />
      <div className="px-4 sm:px-6 d:px-12 lg:px-24 py-16 lg:py-24 flex flex-col justify-center items-center">
        <h2 className="pb-8 uppercase text-2xl font-semibold ">Contact</h2>
        <div className="mb-16 ext-lg lg:text-2xl text-center ">
          <p>
            For customer service inquireis or assistance, please email us.
            <br />
            You can also browse our FAQs to see if we've already answered your
            question.
            <br />
            If you are experiencing a medical emergency, contact 911 or a
            medical provider immediately.
          </p>
        </div>

        <div>
          <ContactForm />
        </div>
      </div>
    </>
  );
}
