import React from "react";
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types";

export default function LocationCardOptions(type, key) {
  switch (type) {
    case "hoursOfOperation":
      return {
        renderNode: {
          [BLOCKS.PARAGRAPH]: (node, children) => (
            <div className="mb-4">
              <p className="font-sans">{children}</p>
            </div>
          ),
          [BLOCKS.LIST_ITEM]: (node, children) => (
            <li className="font-serif font-medium h-auto mx-2 my-1 list-none">
              {children}
            </li>
          ),
        },
      };
    case "transportationNYC":
      return {
        renderNode: {
          [BLOCKS.OL_LIST]: (node, children) => (
            <ol className="flex flex-wrap">{children}</ol>
          ),
          [BLOCKS.LIST_ITEM]: (node, children) => {
            const nycTransportationKeys = {
              4: "#00933C",
              5: "#00933C",
              6: "#00933C",
              7: "#00933C",
              S: "#808183",
              N: "#FCCC0A",
              Q: "#FCCC0A",
              R: "#FCCC0A",
              1: "#EE352E",
              2: "#EE352E",
              3: "#EE352E",
            };
            const extractedValue = children[0].props.children.props.children;
            const backgroundColor =
              nycTransportationKeys[extractedValue] || "#000000";
            return (
              <li
                className="rounded-full flex items-center justify-center mx-2 my-1 text-white w-10 h-10"
                style={{ backgroundColor }}
              >
                {children}
              </li>
            );
          },
          [BLOCKS.HEADING_3]: (node, children) => (
            <h2 className="font-sans text-lg font-bold ">{children}</h2>
          ),
          [BLOCKS.PARAGRAPH]: (node, children) => (
            <div className="w-4 h-4 px-4 py-2">
              <span className="font-sans">{children}</span>
            </div>
          ),
        },
      };
    case "transportationSD":
      return {
        renderNode: {
          [BLOCKS.OL_LIST]: (node, children) => (
            <ol className="list-none ">{children}</ol>
          ),
          [BLOCKS.LIST_ITEM]: (node, children) => (
            <li className="font-sans font-medium h-auto mx-2 my-1 list-none">
              {children}
            </li>
          ),
          [BLOCKS.HEADING_3]: (node, children) => (
            <h2 className="font-sans text-xl font-bold ">{children}</h2>
          ),
        },
      };
    default:
      return {
        renderNode: {
          [BLOCKS.PARAGRAPH]: (node, children) => (
            <div className="mb-4">
              <p className="font-sans">{children}</p>
            </div>
          ),
        },
      };
  }
}
