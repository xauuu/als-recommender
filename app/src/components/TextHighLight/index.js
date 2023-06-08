import React, { useEffect } from "react";
import Parser from "html-react-parser";

const Highlight = ({ text = "", highlight = "", handeInputChange }) => {
  useEffect(() => {
    if (!highlight || !text) return;
    try {
      var sentences = highlight.split(/[\\.!\?]/).map((sentence) => sentence.trim());
      sentences.pop();
      var regex = new RegExp(sentences.join("|"), "gi");
      if (regex.test(text)) {
        document.getElementById("input").innerHTML = text.replace(regex, (match) => `<span class="highlight">${match}</span>`);
      }
    } catch (error) {
      console.log(error);
    }
  }, [highlight, text]);

  return (
    <div
      id="input"
      className="plain-text-only"
      role="textbox"
      contentEditable={true}
      data-gramm_editor={false}
      suppressContentEditableWarning={true}
      placeholder="Paste or write about your topic then click the Summarize button."
      onInput={handeInputChange}
    ></div>
  );
};
export default Highlight;
