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
import { ServicesTree } from "../helpers/navTree";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuItems, setMenuItems] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState({
    "facial-aesthetic-services": false,
    "body-aesthetic-services": false,
    "sexual-enhancement-services": false,
  });

  function closeMenu() {
    setIsOpen(false);
    setSubMenuOpen(!subMenuOpen);
  }

  const {
    contentfulServicesMenu: {
      sexualEnhancementServices,
      bodyAestheticServices,
      facialInjectableServices,
      facialAestheticServices,
      slugDictionaries,
    },
    contentfulFooterContent: {
      socialInstagram,
      socialTiktok,
      socialTwitter,
      youtube,
      storeLink,
    },
  } = useStaticQuery(graphql`
    query NavQuery {
      site {
        siteMetadata {
          title
        }
      }
      contentfulServicesMenu {
        bodyAestheticServices {
          ... on ContentfulServicePage {
            slug
            serviceTitle
          }
        }
        facialAestheticServices {
          ... on ContentfulServicePage {
            slug
            serviceTitle
          }
        }
        facialInjectableServices {
          ... on ContentfulServicePage {
            slug
            serviceTitle
          }
        }
        sexualEnhancementServices {
          ... on ContentfulServicePage {
            slug
            serviceTitle
          }
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
        storeLink
      }
    }
  `);

  useEffect(() => {
    let menuTree = new ServicesTree(slugDictionaries);

    facialInjectableServices
      .map((service) => service.slug.split("/"))
      .forEach((arr, i) => menuTree.add(arr, facialInjectableServices[i]));

    facialAestheticServices
      .map((service) => service.slug.split("/"))
      .forEach((arr, i) => menuTree.add(arr, facialAestheticServices[i]));

    bodyAestheticServices
      .map((service) => service.slug.split("/"))
      .forEach((arr, i) => menuTree.add(arr, bodyAestheticServices[i]));

    sexualEnhancementServices
      .map((service) => service.slug.split("/"))
      .forEach((arr, i) => menuTree.add(arr, sexualEnhancementServices[i]));

    setMenuItems(menuTree);
  }, [
    sexualEnhancementServices,
    slugDictionaries,
    bodyAestheticServices,
    facialAestheticServices,
  ]);

  return (
    <div className="bg-white sticky top-0 z-50 shadow-sm ">
      <nav className="max-w-[1536px] mx-auto">
        <div className="flex items-center px-4 py-4 md:px-12 lg:px-4">
          <div className="w-48 lg:w-60 mr-auto">
            <Link to="/">
              <Logo />
            </Link>
          </div>

          <div className="flex items-center justify-between h-16">
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
                      <div className="pointer-events-auto flex flex-col absolute top-24 left-0 p-10 w-full shadow-md bg-main-green text-white duration-300 ">
                        <div
                          className="flex flex-row items-start gap-10  "
                          onClick={() => setMenuOpen(!menuOpen)}
                        >
                          {menuItems &&
                            menuItems.children.map((service) => {
                              return (
                                <div
                                  className="flex flex-col ml-8 md:items-left lg:ml-20"
                                  key={service.slug}
                                >
                                  <h3 className="mb-2 text-lg font-bold ">
                                    {service.title}
                                  </h3>
                                  <div className={`flex flex-col`}>
                                    {service.children.map((serviceCategory) => {
                                      return (
                                        <div className="flex flex-col">
                                          {serviceCategory.children.length ? (
                                            <div className=" flex flex-col">
                                              <h3>{serviceCategory.title}</h3>
                                              {serviceCategory.children.map(
                                                (serviceCategoryChild) => (
                                                  <Link
                                                    key={`LINK-${serviceCategoryChild.slug}`}
                                                    to={`/${service.slug}/${serviceCategory.slug}/${serviceCategoryChild.slug}/`}
                                                    className="ml-6 hover:text-main-green-shade text-left"
                                                  >
                                                    {serviceCategoryChild.title}
                                                  </Link>
                                                )
                                              )}
                                            </div>
                                          ) : (
                                            <Link
                                              key={`LINK-${serviceCategory.slug}`}
                                              to={`/${service.slug}/${serviceCategory.slug}/`}
                                              className="hover:text-main-green-shade text-left"
                                            >
                                              {serviceCategory.title}
                                            </Link>
                                          )}
                                        </div>
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
                  <a
                    href={storeLink}
                    target="_blank"
                    className="text-black hover:text-main-green px-3 py-2 rounded-md text-base lg:text-lg font-medium uppercase"
                  >
                    Shop
                  </a>

                  <Link
                    to="/about/"
                    className="text-black hover:text-main-green px-3 py-2 rounded-md text-base lg:text-lg font-medium uppercase"
                  >
                    About
                  </Link>

                  <Link
                    to="/contact/"
                    className="text-black hover:text-main-green px-3 py-2 rounded-md text-base md:text-lg font-medium uppercase"
                  >
                    Contact
                  </Link>

                  <Link
                    to="/financing/"
                    className="text-black hover:text-main-green px-3 py-2 rounded-md text-base md:text-lg font-medium uppercase"
                  >
                    Financing
                  </Link>
                  <Link
                    to="/blog/"
                    className="text-black hover:text-main-green px-3 py-2 rounded-md text-base md:text-lg font-medium uppercase"
                  >
                    Blog
                  </Link>
                  <Link
                    to="/training/"
                    className="text-black hover:text-main-green px-3 py-2 rounded-md text-base md:text-lg font-medium uppercase"
                  >
                    Training
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
            <div className="md:hidden" id="mobile-menu">
              <div
                ref-setter={ref}
                className="px-2 py-5 space-y-1 sm:px-3 bg-main-green flex flex-col min-h-screen"
              >
                <div className="group">
                  <h1 className="text-white px-6 py-3 rounded-md text-base md:text-lg font-medium uppercase ">
                    Services
                  </h1>
                  <div className="z-1000 group-hover:flex flex-col left-0 px-8 w-full bg-main-green text-white duration-300">
                    <div className="flex flex-col">
                      {menuItems &&
                        menuItems.children.map((service) => {
                          return (
                            <div key={service.slug} className="mb-3">
                              <button
                                className={`flex flex-row items-center text-left`}
                                onClick={() =>
                                  setSubMenuOpen((prev) => ({
                                    ...prev,
                                    [service.slug]: !prev[service.slug],
                                  }))
                                }
                              >
                                <h3 className="text-lg font-medium mr-3">
                                  {service.title}
                                </h3>
                                <span className="flex flex-row justify-between">
                                  {!subMenuOpen[service.slug] ? (
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
                              </button>
                              {subMenuOpen[`${service.slug}`] && (
                                <div className="flex flex-col ml-3">
                                  {service.children.map((serviceCategory) => (
                                    <div>
                                      {serviceCategory.children.length ? (
                                        <div className="flex flex-col">
                                          <h3>{serviceCategory.title}</h3>
                                          {serviceCategory.children.map(
                                            (serviceCategoryChild) => (
                                              <Link
                                                onClick={() => closeMenu()}
                                                key={`LINK-${serviceCategoryChild.slug}`}
                                                to={`/${service.slug}/${serviceCategory.slug}/${serviceCategoryChild.slug}/`}
                                                className="ml-3 hover:text-main-green-shade text-left pb-1"
                                              >
                                                {serviceCategoryChild.title}
                                              </Link>
                                            )
                                          )}
                                        </div>
                                      ) : (
                                        <Link
                                          onClick={() => closeMenu()}
                                          key={`LINK-${serviceCategory.slug}`}
                                          to={`/${service.slug}/${serviceCategory.slug}/`}
                                          className="hover:text-main-green-shade text-left pb-1"
                                        >
                                          {serviceCategory.title}
                                        </Link>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
                <a
                  onClick={() => closeMenu()}
                  href={storeLink}
                  target="_blank"
                  className=" text-white hover:text-main-green-shade px-6 py-1 rounded-md text-base md:text-lg font-medium uppercase"
                >
                  Shop
                </a>

                <Link
                  onClick={() => closeMenu()}
                  to="/about/"
                  className=" text-white hover:text-main-green-shade px-6 py-1 rounded-md text-base md:text-lg font-medium uppercase"
                >
                  About
                </Link>

                <Link
                  onClick={() => closeMenu()}
                  to="/contact/"
                  className=" text-white hover:text-main-green-shade px-6 py-1 rounded-md text-base md:text-lg font-medium uppercase"
                >
                  Contact Us
                </Link>

                <Link
                  onClick={() => closeMenu()}
                  to="/financing/"
                  className=" text-white hover:text-main-green-shade px-6 py-1 rounded-md text-base md:text-lg font-medium uppercase"
                >
                  Financing
                </Link>

                <Link
                  onClick={() => closeMenu()}
                  to="/blog/"
                  className=" text-white hover:text-main-green-shade px-6 py-1 rounded-md text-base md:text-lg font-medium uppercase"
                >
                  Blog
                </Link>

                <Link
                  onClick={() => closeMenu()}
                  to="/training/"
                  className=" text-white hover:text-main-green-shade px-6 py-1 rounded-md text-base md:text-lg font-medium uppercase"
                >
                  Training
                </Link>

                <div className="pt-16">
                  <div className="flex flex-row justify-center pt-5 md:pb-16 text-white">
                    {socialTwitter &&
                      socialTwitter.startsWith("https://www.") && (
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
                    {socialTiktok &&
                      socialTiktok.startsWith("https://www.") && (
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
      </nav>
    </div>
  );
}
