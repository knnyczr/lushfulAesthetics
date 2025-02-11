import React  from "react";
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types";

export default function beforeAndAfterContainerOptions() {
    return {
        renderNode: {
            [INLINES.HYPERLINK]: ({ data }, children) => (
                    <a
                      className="underline font-sans"
                      href={data.uri ? data.uri : ""}
                      target={`"_blank"`}
                      rel={`"noopener noreferrer"`}
                    >
                      {children}
                    </a>
            ),
        }
    }
}