import React  from "react";
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types";

export default function beforeAndAfterContainerOptions() {
    return {
        renderMark: {
            [MARKS.BOLD]: (text) => (
                <span className="font-sans font-bold mb-1">{text}</span>
            ),
            [MARKS.ITALIC]: (text) => (
                <span className="font-sans italic mb-1">{text}</span>
            ),
        },
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