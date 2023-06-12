import addToMailchimp from "gatsby-plugin-mailchimp";
import { set } from "lodash";
import React, { useState } from "react";

export default function Newsletter() {
  // Since `addToMailchimp` returns a promise, you
  // can handle the response in two different ways:
  let [email, setEmail] = useState("");
  let [listFields, setListFields] = useState("");

  // Note that you need to send an email & optionally, listFields
  // these values can be pulled from React state, form fields,
  // or wherever.  (Personally, I recommend storing in state).

  // // 1. via `.then`
  // _handleSubmit = (e) => {
  //   e.preventDefault();
  //   addToMailchimp(email, listFields) // listFields are optional if you are only capturing the email address.
  //     .then((data) => {
  //       // I recommend setting data to React state
  //       // but you can do whatever you want (including ignoring this `then()` altogether)
  //       console.log(data);
  //     })
  //     .catch(() => {
  //       // unnecessary because Mailchimp only ever
  //       // returns a 200 status code
  //       // see below for how to handle errors
  //     });
  // };

  // 2. via `async/await`
  const handleSubmit = async (e) => {
    // e.preventDefault();
    const result = await addToMailchimp(email, listFields);
    // I recommend setting `result` to React state
    // but you can do whatever you want
    console.log(result);
  };
  // tailwindcss class style for a box with a border around it
  console.log(email);
  return (
    <div className="border border-solid border-black px-10 py-10 mt-10">
      <form
        className="flex flex-col"
        onSubmit={() => handleSubmit(email, { listFields })}
      >
        <h1 className="text-center uppercase text-lg">Blog Mailing List</h1>
        <input
          className="bg-main-green rounded px-4 py-3 my-5"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="bg-main-green rounded py-3 w-1/3 font-extrabold uppercase italic"
          type="submit"
          value="Join"
        />
      </form>
    </div>
  );
}
