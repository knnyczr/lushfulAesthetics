import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        //replace the following to enable email services from https://www.emailjs.com/
        // "service_xpoo0vx", // "YOUR_SERVICE_ID",
        // "template_apc4yqb", // "YOUR_TEMPLATE_ID",
        form.current,
        "ZHjXYxcVxVwVDSINi" // "YOUR_PUBLIC_KEY"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("message sent");
          alert("thanks for submitting the form");
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  };

  return (
    <>
      <div>
        <form
          ref={form}
          onSubmit={sendEmail}
          className="flex flex-col justify-start items-start"
        >
          <label className="font-semibold text-sm ">
            Name<span>*</span>
          </label>
          <input
            className="bg-main-green w-96 h-10 rounded mb-4 text-white px-3"
            type="text"
            name="from_name"
            required
          />
          <label className="font-semibold text-sm ">
            Email<span>*</span>
          </label>
          <input
            className="bg-main-green w-96 h-10 rounded mb-4 text-white px-3"
            type="email"
            name="email"
            required
          />
          <label className="font-semibold text-sm ">
            Subject<span>*</span>
          </label>
          <input
            className="bg-main-green w-96 h-10 rounded mb-4 text-white px-3"
            type="text"
            name="subject"
            required
          />
          <label className="font-semibold text-sm ">
            Message<span>*</span>
          </label>
          <textarea
            className="bg-main-green w-96 h-30 rounded mb-4 text-white px-3"
            name="message"
            type="text"
            required
            rows="4"
            cols="50"
          />
          <input
            className="py-3 px-6 bg-main-green hover:bg-main-green-shade rounded text-white  uppercase"
            type="submit"
            value="Send!"
          />
        </form>
      </div>
    </>
  );
}
