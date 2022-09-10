import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import Button from "./BookBtn";
import { useStaticQuery, graphql, Link } from "gatsby";
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image";
import Logo from "../images/logo-sm.svg";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  // {contentfulServiceMenu:{aestheticServices}}
  // Data.contentfulServicesMenu.aesthticServices
  // Data.contentfulServicesMenu.bookNOwLinkReference.bookNowLink
  console.log(Logo);
  const {
    contentfulServicesMenu: {
      aestheticServices,
      bookNowLinkReference: { bookNowLink },
    },
  } = useStaticQuery(graphql`
    query NavQuery {
      site {
        siteMetadata {
          title
        }
      }
      contentfulServicesMenu {
        aestheticServices {
          ... on ContentfulPackagePage {
            packagePageTitle
            slug
          }
          ... on ContentfulServicePage {
            serviceTitle
            slug
          }
        }
        bookNowLinkReference {
          bookNowLink
        }
      }
    }
  `);

  // console.log("nav console: ", data);
  console.log("nav console: ", aestheticServices, bookNowLink);
  return (
    <div>
      <nav className="bg-white">
        <div className="flex justify-between px-4 py-4 sm:px-6 d:px-12 lg:px-24">
          <div className="w-20">
            <Link to="/">
              <Logo />
            </Link>
          </div>

          <div className="flex items-center justify-end h-16">
            <div className="flex justify-end items-center">
              <div className="hidden md:block ">
                <div className="ml-10 flex items-baseline space-x-4 ">
                  {/* <Link
                    to="/services"
                    className=" text-black hover:text-main-green px-3 py-2 rounded-md text-base md:text-lg font-medium uppercase"
                  >
                    Services
                  </Link> */}

                  <div className="group z-50">
                    <button className="group-hover:text-main-green px-6 py-6 rounded-md text-base md:text-lg font-medium uppercase ">
                      Services
                    </button>
                    <div className="hidden group-hover:flex flex-col absolute left-0 pl-40 p-10 w-full bg-main-green text-black duration-300">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                        <div className="flex flex-col">
                          <h3 className="mb-4 text-xl">Category 1</h3>
                          <a href="#" className=" hover:text-white">
                            Sample Link 1
                          </a>
                          <a href="#" className=" hover:text-white">
                            Sample Link 2
                          </a>
                          <a href="#" className=" hover:text-white">
                            Sample Link 3
                          </a>
                          <a href="#" className=" hover:text-white">
                            Sample Link 4
                          </a>
                          <a href="#" className=" hover:text-white">
                            Sample Link 5
                          </a>
                        </div>

                        <div className="flex flex-col">
                          <h3 className="mb-4 text-xl">Category 2</h3>
                          <a href="#" className=" hover:text-white">
                            Sample Link 1
                          </a>
                          <a href="#" className=" hover:text-white">
                            Sample Link 2
                          </a>
                          <a href="#" className=" hover:text-white">
                            Sample Link 3
                          </a>
                          <a href="#" className=" hover:text-white">
                            Sample Link 4
                          </a>
                          <a href="#" className=" hover:text-white">
                            Sample Link 5
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Link
                    to="/about"
                    className=" text-black hover:text-main-green px-3 py-2 rounded-md text-base lg:text-lg font-medium uppercase"
                  >
                    About
                  </Link>

                  <Link
                    to="/contact"
                    className=" text-black hover:text-main-green px-3 py-2 rounded-md text-base md:text-lg font-medium uppercase"
                  >
                    Contact US
                  </Link>

                  <Link
                    to="/financing"
                    className=" text-black hover:text-main-green px-3 py-2 rounded-md text-base md:text-lg font-medium uppercase"
                  >
                    Financing
                  </Link>
                </div>
              </div>
            </div>
            <div className="mx-4 my-4">
              <Button />
            </div>
            <div className="-mr-2 flex md:hidden z-1000">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-main-green inline-flex items-center justify-center p-3 rounded text-white hover:bg-main-green-shade"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div
              className="md:hidden"
              id="mobile-menu"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div
                ref={ref}
                className="px-2 py-16 space-y-1 sm:px-3 bg-main-green text-center flex flex-col"
              >
                <Link
                  to="/services"
                  className=" text-white hover:text-main-green-shade px-6 py-6 rounded-md text-base md:text-lg font-medium uppercase"
                >
                  Services
                </Link>

                <Link
                  to="/about"
                  className=" text-white hover:text-main-green-shade px-6 py-6 rounded-md text-base md:text-lg font-medium uppercase"
                >
                  About
                </Link>

                <Link
                  to="/contact"
                  className=" text-white hover:text-main-green-shade px-6 py-6 rounded-md text-base md:text-lg font-medium uppercase"
                >
                  Contact Us
                </Link>

                <Link
                  to="/financing"
                  className=" text-white hover:text-main-green-shade px-6 py-6 rounded-md text-base md:text-lg font-medium uppercase"
                >
                  Financing
                </Link>

                <div>
                  <div className="flex flex-row justify-center pt-12 md:pb-16 text-white">
                    <a
                      href="https://twitter.com/LushfulAesth"
                      target="_blank"
                      rel="noreferrer"
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
                    </a>
                    <a
                      href="https://www.instagram.com/lushfulaesthetics/?hl=en"
                      target="_blank"
                      rel="noreferrer"
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
                    </a>
                    <a
                      href="/tiktop.com"
                      target="_blank"
                      rel="noreferrer"
                      className="text-base md:text-lg mb-4"
                    >
                      TikTok
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Transition>
        {/* TESTING HOVER DROPDOWN MENU DOWNHERE!!! */}
        {/* <div class="relative w-screen flex justify-start items-center text-black drop-shadow-md">
          
          <div class="group">
            <button class="group-hover:text-main-green px-6 py-6 rounded-md text-base md:text-lg font-medium uppercase ">
              Services &darr;
            </button>
            <div class="hidden group-hover:flex flex-col absolute left-0 p-10 w-full bg-main-green text-black duration-300">
              <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
                <div class="flex flex-col">
                  <h3 class="mb-4 text-xl">Category 1</h3>
                  <a href="#" class=" hover:text-white">
                    Sample Link 1
                  </a>
                  <a href="#" class=" hover:text-white">
                    Sample Link 2
                  </a>
                  <a href="#" class=" hover:text-white">
                    Sample Link 3
                  </a>
                  <a href="#" class=" hover:text-white">
                    Sample Link 4
                  </a>
                  <a href="#" class=" hover:text-white">
                    Sample Link 5
                  </a>
                </div>

                <div class="flex flex-col">
                  <h3 class="mb-4 text-xl">Category 2</h3>
                  <a href="#" class=" hover:text-white">
                    Sample Link 1
                  </a>
                  <a href="#" class=" hover:text-white">
                    Sample Link 2
                  </a>
                  <a href="#" class=" hover:text-white">
                    Sample Link 3
                  </a>
                  <a href="#" class=" hover:text-white">
                    Sample Link 4
                  </a>
                  <a href="#" class=" hover:text-white">
                    Sample Link 5
                  </a>
                </div>
              </div>
            </div>
            
          </div>
        </div> */}
      </nav>
    </div>
  );
}
