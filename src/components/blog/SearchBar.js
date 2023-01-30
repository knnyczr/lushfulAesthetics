import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar() {
  return (
    <>
      <div className="lg:px-24 lg:pt-12 md:px-12 md:pt-12 md:pb-12 px-4 py-4">
        <div className="bg-main-green w-full md:w-96 rounded ">
          <form className="flex items-center">
            <button className="text-white px-4 py-2" type="submit">
              <FontAwesomeIcon icon={faSearch} color="black" />
            </button>
            <input
              className="bg-main-green px-4 py-2 text-black placeholder:text-black/30 w-full"
              type="text"
              placeholder="Search..."
            />
          </form>
        </div>
      </div>
    </>
  );
}
