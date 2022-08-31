import React from "react";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

export default function Footer() {
  return (
    <>
      <div className="bg-main-green text-white lg:px-24 lg:pt-12 md:px-12 md:pt-12 md:pb-4 px-4 py-4">
        <div className="flex lg:flex-row lg:justify-between md:flex-col flex-col ">
          <div className="flex lg:flex-row lg:justify-between md:flex-col flex-col">
            <div className="lg:pr-32 md:pr-16 md:pb-8 pr-8 py-4 ">
              <Link to="/">
                <StaticImage
                  src="../images/lushful_logo.png"
                  alt="Lushful Aesthetics Logo"
                ></StaticImage>
              </Link>
            </div>

            <div className="lg:pr-32 md:pr-16 md:pb-8 py-4">
              <h2 className="mb-6 text-xl font-serif uppercase">Support</h2>
              <div className="font-medium md:text-lg flex flex-row ">
                <div className="flex flex-col mr-8">
                  <Link to="/book" className="hover:underline mr-4 mb-4">
                    Book an appointment
                  </Link>
                  <Link to="/about" className="hover:underline mr-4 mb-4">
                    About
                  </Link>
                </div>
                <div className="flex flex-col ">
                  <Link to="/faqs" className="hover:underline mr-4 mb-4 ">
                    FAQs
                  </Link>
                  <Link to="/contact" className="hover:underline mr-4 mb-4">
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-end py-4 md:pb-4">
            <Link
              to="https://twitter.com/LushfulAesth"
              target="_blank"
              className="mr-4 mb-4"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
              <span className="sr-only">Twitter page</span>
            </Link>
            <Link
              to="https://www.instagram.com/lushfulaesthetics/?hl=en"
              target="_blank"
              className="mr-4 mb-4"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Instagram page</span>
            </Link>

            <Link
              to="https://tiktok.com/LushfulAesth"
              target="_blank"
              className="text-base md:text-lg mb-4"
            >
              TikTok
            </Link>
          </div>
        </div>
        <hr className="my-6 border-white" />
        <div className="bg-main-green md:text-lg flex flex-row justify-between text-white font-serif ">
          <p className="text-xs md:text-sm">
            {`The information on this website, including articles authored by
            healthcare professionals, is for general information purposes only,
            does not constitute medical advice and is not intended to be relied
            upon for medical diagnosis or treatment. If you are experiencing an
            emergency, contact 911 or contact a medical provider immediately.
            Consistent with EverBody’s website privacy policy, EverBody is not
            responsible for the privacy practices or the content found at links
            to other websites.`}
          </p>
        </div>
        <hr className="my-6 border-white" />

        <div className="flex flex-col justify-center text-sm md:text-base md:flex-row pb-8 md:pb-2">
          <div className="py-4 md:py-0">
            <span className="mr-4">
              <Link to="/privacy">Privacy Policy</Link>
            </span>
            <span className="mr-4">
              <Link to="/hippa-policy">HIPAA Policy</Link>
            </span>
          </div>
          <span>
            © 2022 Lushful Aesthetics by InjectorChris. All rights reserved.
          </span>
        </div>
      </div>
    </>
  );
}
