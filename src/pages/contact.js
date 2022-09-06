import React from "react";

export default function contact() {
  const sendEmail = (e) => {
    e.preventDefault();
    alert("thanks for submitting the form");
  };

  return (
    <>
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
          <form
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
      </div>
    </>
  );
}
