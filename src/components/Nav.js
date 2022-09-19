import React, { useState, useEffect } from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import { Transition } from "@headlessui/react";
import Button from "./BookBtn";
import Logo from "../images/lushful-aesthetic-logo-side.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import {
  faTiktok,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuItems, setMenuItems] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState({
    "facial-treatments": false,
    "body-treatments": false,
  });

  function closeMenu() {
    setIsOpen(false);
    setSubMenuOpen(!subMenuOpen);
  }

  const {
    contentfulServicesMenu: {
      aestheticServices,
      sexualEnhancementServices,
      slugDictionaries,
    },
    contentfulFooterContent: {
      socialInstagram,
      socialTiktok,
      socialTwitter,
      youtube,
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
        sexualEnhancementServices {
          ... on ContentfulPackagePage {
            slug
            packagePageTitle
          }
          ... on ContentfulServicePage {
            slug
            serviceTitle
          }
        }
        bookNowLinkReference {
          bookNowLink
        }
        slugDictionaries {
          slugTitle
          slug
        }
      }
      contentfulFooterContent {
        socialInstagram
        socialTiktok
        socialTwitter
        youtube
      }
    }
  `);

  useEffect(() => {
    class Node {
      constructor(slug, title) {
        this.slug = slug;
        this.title = title;
        this.children = [];
      }
    }

    class ServicesTree {
      constructor() {
        this.slug = "services";
        this.title = "Services";
        this.children = [];
      }
      get completeMenu() {
        return this.children;
      }
      add(arr, service) {
        let count = 0;
        while (count < arr.length) {
          let current = this;
          for (let i = 0; i < arr.length; i++) {
            let found = current.children.find((node) => node.slug === arr[i]);

            if (!found) {
              let slugDictionary = slugDictionaries.find(
                (definition) => definition.slug === arr[i]
              )?.slugTitle;
              if (!slugDictionary) {
                slugDictionary =
                  service.serviceTitle || service.packagePageTitle;
              }
              let newNode = new Node(arr[i], slugDictionary);
              current.children.push(newNode);
              current = newNode;
            } else {
              current = found;
            }

            count++;
          }
        }
      }
    }

    let menuTree = new ServicesTree();

    aestheticServices
      .map((service) => service.slug.split("/"))
      .forEach((arr, i) => menuTree.add(arr, aestheticServices[i]));

    sexualEnhancementServices
      .map((service) => service.slug.split("/"))
      .forEach((arr, i) => menuTree.add(arr, sexualEnhancementServices[i]));

    setMenuItems(menuTree);
  }, [aestheticServices, sexualEnhancementServices, slugDictionaries]);

  return (
    <div>
      <nav className="bg-white">
        <div className="flex justify-between items-center px-4 py-4 d:px-12 lg:px-24">
          <div className="w-48 lg:w-60 py-auto">
            <Link to="/">
              <Logo />
            </Link>
          </div>

          <div className="flex items-center justify-end h-16">
            <div className="flex justify-end items-center">
              <div className="hidden md:block ">
                <div className="flex items-baseline space-x-4">
                  <div className="group z-50">
                    <button
                      className="group-hover:text-main-green px-4 py-4 rounded-md text-base md:text-lg font-medium uppercase"
                      onClick={() => setMenuOpen(!menuOpen)}
                    >
                      Services
                    </button>
                    {menuOpen && (
                      <div className="pointer-events-auto flex flex-col absolute top-24 left-0 pl-20 p-10 w-full shadow-md bg-main-green text-main-green-shade duration-300">
                        <div
                          className="flex flex-row gap-10 "
                          onClick={() => setMenuOpen(!menuOpen)}
                        >
                          {menuItems &&
                            menuItems.children.map((service) => {
                              return (
                                <div
                                  className="flex flex-col ml-20"
                                  key={service.slug}
                                >
                                  <h3 className="mb-2 text-lg font-bold ">
                                    {service.title}
                                  </h3>
                                  <div
                                    className={`flex ${
                                      service.slug ===
                                        "sexual-enhancement-services" &&
                                      "flex-col"
                                    }`}
                                  >
                                    {service.children.map((serviceCategory) => {
                                      return (
                                        <>
                                          {serviceCategory.children.length ? (
                                            <div
                                              className="flex flex-col"
                                              key={`DIV-${serviceCategory.slug}`}
                                            >
                                              <h4 className="mb-2 text-lg">
                                                {serviceCategory.title}
                                              </h4>
                                              <div className="flex flex-col">
                                                {serviceCategory.children.map(
                                                  (serviceSubCategory) => (
                                                    <>
                                                      {serviceSubCategory
                                                        .children.length ? (
                                                        <>
                                                          <h5
                                                            key={`${serviceSubCategory.slug}`}
                                                          >
                                                            {
                                                              serviceSubCategory.title
                                                            }
                                                          </h5>
                                                          {serviceSubCategory.children.map(
                                                            (lowestService) => (
                                                              <Link
                                                                key={`Link-${serviceSubCategory.slug}${lowestService.slug}`}
                                                                to={`/${service.slug}/${serviceCategory.slug}/${serviceSubCategory.slug}/${lowestService.slug}`}
                                                                className="hover:text-white ml-6"
                                                              >
                                                                {
                                                                  lowestService.title
                                                                }
                                                              </Link>
                                                            )
                                                          )}
                                                        </>
                                                      ) : (
                                                        <Link
                                                          key={`Link-${serviceCategory.slug}`}
                                                          to={`/${service.slug}/${serviceCategory.slug}/${serviceSubCategory.slug}`}
                                                          className="hover:text-white"
                                                        >
                                                          {
                                                            serviceSubCategory.title
                                                          }
                                                        </Link>
                                                      )}
                                                    </>
                                                  )
                                                )}
                                              </div>
                                            </div>
                                          ) : (
                                            <Link
                                              key={`LINK-${serviceCategory.slug}`}
                                              to={`/${service.slug}/${serviceCategory.slug}`}
                                              className="hover:text-white "
                                            >
                                              <div className="flex flex-col">
                                                {serviceCategory.title}
                                              </div>
                                            </Link>
                                          )}
                                        </>
                                      );
                                    })}
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    )}
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
                    Contact
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
                    className="block h-5 w-5"
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
                    className="block h-5 w-5"
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
              // onClick={() => setIsOpen(!isOpen)}
            >
              {/* {console.log(ref)} */}
              <div
                ref-setter={ref}
                className="px-2 py-5 space-y-1 sm:px-3 bg-main-green flex flex-col h-screen"
              >
                <div className="group">
                  <h1 className="text-white  px-6 py-3 rounded-md text-base md:text-lg font-medium uppercase ">
                    Services
                  </h1>
                  <div className="z-1000 group-hover:flex flex-col left-0 px-8 w-full bg-main-green text-white duration-300">
                    <div className="flex flex-col">
                      {menuItems &&
                        menuItems.children.map((service) => {
                          return (
                            <div
                              className={`flex flex-col ${
                                service.slug ===
                                  "sexual-enhancement-services" && "pt-2"
                              }`}
                              key={service.slug}
                            >
                              <h3 className="text-lg font-medium">
                                {service.title}
                              </h3>
                              {service.children.map((serviceCategory) => (
                                <>
                                  {serviceCategory.children.length ? (
                                    <>
                                      <h4
                                        className="text-lg font-semiBold ml-4"
                                        key={`inner-${serviceCategory.slug}`}
                                        onClick={() =>
                                          setSubMenuOpen((prev) => ({
                                            ...prev,
                                            [serviceCategory.slug]:
                                              !prev[serviceCategory.slug],
                                          }))
                                        }
                                      >
                                        <span className="flex flex-row justify-between">
                                          {serviceCategory.title}
                                          {subMenuOpen[serviceCategory.slug] ? (
                                            <FontAwesomeIcon
                                              className="hover:cursor-pointer"
                                              icon={faAngleUp}
                                            />
                                          ) : (
                                            <FontAwesomeIcon
                                              className="hover:cursor-pointer"
                                              icon={faChevronDown}
                                            />
                                          )}
                                        </span>
                                      </h4>
                                      {subMenuOpen[serviceCategory.slug] && (
                                        <>
                                          {serviceCategory.children.map(
                                            (serviceSubCategory) => (
                                              <>
                                                {serviceSubCategory.children
                                                  .length ? (
                                                  <>
                                                    <h5
                                                      className="ml-8 font-bold"
                                                      key={`H5-${serviceSubCategory.slug}`}
                                                    >
                                                      {serviceSubCategory.title}
                                                    </h5>
                                                    {serviceSubCategory.children.map(
                                                      (lowestservice) => (
                                                        <Link
                                                          onClick={() =>
                                                            closeMenu()
                                                          }
                                                          key={`${serviceSubCategory.slug}${lowestservice.slug}`}
                                                          to={`/${service.slug}/${serviceCategory.slug}/${serviceSubCategory.slug}/${lowestservice.slug}`}
                                                          className="hover:text-black ml-12  "
                                                        >
                                                          {lowestservice.title}
                                                        </Link>
                                                      )
                                                    )}
                                                  </>
                                                ) : (
                                                  <Link
                                                    onClick={() => closeMenu()}
                                                    key={`LINK-${serviceSubCategory.slug}`}
                                                    to={`/${service.slug}/${serviceCategory.slug}/${serviceSubCategory.slug}`}
                                                    className="hover:text-black ml-8"
                                                  >
                                                    {serviceSubCategory.title}
                                                  </Link>
                                                )}
                                              </>
                                            )
                                          )}
                                        </>
                                      )}
                                    </>
                                  ) : (
                                    <Link
                                      onClick={() => closeMenu()}
                                      key={`outter-${serviceCategory.slug}`}
                                      to={`/${service.slug}/${serviceCategory.slug}`}
                                      className="hover:text-black ml-4"
                                    >
                                      {serviceCategory.title}
                                    </Link>
                                  )}
                                </>
                              ))}
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>

                <Link
                  to="/about"
                  className=" text-white hover:text-main-green-shade px-6 py-1 rounded-md text-base md:text-lg font-medium uppercase"
                >
                  About
                </Link>

                <Link
                  to="/contact"
                  className=" text-white hover:text-main-green-shade px-6 py-1 rounded-md text-base md:text-lg font-medium uppercase"
                >
                  Contact Us
                </Link>

                <Link
                  to="/financing"
                  className=" text-white hover:text-main-green-shade px-6 py-1 rounded-md text-base md:text-lg font-medium uppercase"
                >
                  Financing
                </Link>

                <div className="pt-16">
                  <div className="flex flex-row justify-center pt-5 md:pb-16 text-white">
                    {socialTwitter && socialTwitter.startsWith("https://www.") && (
                      <a
                        href={`${socialTwitter}`}
                        target="_blank"
                        rel="noreferrer"
                        className="mr-6 mb-4"
                      >
                        <FontAwesomeIcon
                          className="fa-2x hover:black"
                          icon={faTwitter}
                        />
                      </a>
                    )}
                    {socialInstagram &&
                      socialInstagram.startsWith("https://www.") && (
                        <a
                          href={`${socialInstagram}`}
                          target="_blank"
                          rel="noreferrer"
                          className="mr-6 mb-4"
                        >
                          <FontAwesomeIcon
                            className="fa-2x hover:black"
                            icon={faInstagram}
                          />
                        </a>
                      )}
                    {socialTiktok && socialTiktok.startsWith("https://www.") && (
                      <a
                        href={`${socialTiktok}`}
                        target="_blank"
                        rel="noreferrer"
                        className="mr-6 mb-4"
                      >
                        <FontAwesomeIcon
                          className="fa-2x hover:black"
                          icon={faTiktok}
                        />
                      </a>
                    )}

                    {youtube && youtube.startsWith("https://www.") && (
                      <a
                        href={`${youtube}`}
                        target="_blank"
                        rel="noreferrer"
                        className="mr-6 mb-4"
                      >
                        <FontAwesomeIcon
                          className="fa-2x hover:black"
                          icon={faYoutube}
                        />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Transition>

        {/* TESTING HOVER DROPDOWN MENU DOWNHERE!!! */}
        {/* <div className="group z-500">
          <button className="group-hover:text-main-green px-6 py-6 rounded-md text-base md:text-lg font-medium uppercase ">
            Services
          </button>
          <div className=" hidden group-hover:flex flex-col absolute left-0 pl-20 p-10 w-full shadow-md bg-main-green text-white  duration-300">
            <div className="grid grid-cols-2 gap-20">
              {menuItems &&
                menuItems.children.map((service) => {
                  return (
                    <div className="flex flex-col" key={service.slug}>
                      <h3 className="mb-2 font-bold text-main-green-shade border-b-2 border-main-green-shade pb-2 uppercase tracking-wide">
                        {service.title}
                      </h3>
                      {service.children.map((serviceCategory) => (
                        <>
                          {serviceCategory.children.length ? (
                            <>
                              <span
                                className="mb-2 font-serif text-lg  cursor-pointer "
                                key={`${serviceCategory.slug}`}
                                onClick={() => setMenuopen(!menuOpen)}
                              >
                                {serviceCategory.title} {`->`}
                              </span>
                              <div>
                                {menuOpen ? (
                                  <>
                                    {serviceCategory.children.map(
                                      (serviceSubCategory) => (
                                        <>
                                          {serviceSubCategory.children
                                            .length ? (
                                            <>
                                              <h5
                                                className="ml-6 font-bold text-lg text-main-green-shade"
                                                key={`${serviceSubCategory.slug}`}
                                              >
                                                {`Fillers`}
                                              </h5>
                                              {serviceSubCategory.children.map(
                                                (lowestservice) => (
                                                  <div className="flex flex-row">
                                                    <Link
                                                      to={`/${service.slug}/${serviceCategory.slug}/${serviceSubCategory.slug}/${lowestservice.slug}`}
                                                      className="hover:text-white ml-12"
                                                    >
                                                      <h5>
                                                        {
                                                          serviceSubCategory.title
                                                        }{" "}
                                                      </h5>
                                                    </Link>
                                                  </div>
                                                )
                                              )}
                                            </>
                                          ) : (
                                            <div>
                                              <Link
                                                to={`/${service.slug}/${serviceCategory.slug}/${serviceSubCategory.slug}`}
                                                className="hover:text-white ml-6 text-lg"
                                              >
                                                {serviceSubCategory.title}
                                              </Link>
                                            </div>
                                          )}
                                        </>
                                      )
                                    )}
                                  </>
                                ) : (
                                  <></>
                                )}
                              </div>
                            </>
                          ) : (
                            <Link
                              to={`/${service.slug}/${serviceCategory.slug}`}
                              className="hover:text-white"
                            >
                              {serviceCategory.title}
                            </Link>
                          )}
                        </>
                      ))}
                    </div>
                  );
                })}
            </div>
          </div>
        </div> */}
      </nav>
    </div>
  );
}
