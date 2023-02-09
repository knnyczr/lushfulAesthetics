import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";

const ShareButton = ({ category, uniqueIdentifier }) => {
  const [copySuccess, setCopySuccess] = useState("");
  const textAreaRef = useRef(null);
  const shareUrl = `https://www.lushfulaesthetics.com/blog/${category}/${uniqueIdentifier}`;

  const copyToClipboard = (e) => {
    textAreaRef.current.select();
    document.execCommand("copy");
    e.target.focus();
    setCopySuccess("Share Link Copied!");
  };

  return (
    <div>
      <textarea
        ref={textAreaRef}
        value={shareUrl}
        readOnly
        style={{ position: "absolute", left: "-9999px" }}
      />
      <button onClick={copyToClipboard}>
        <FontAwesomeIcon icon={faShareNodes} />
        {/* Share Link */}
      </button>
      {copySuccess && <p>{copySuccess}</p>}
    </div>
  );
};

export default ShareButton;
