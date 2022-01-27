import { useState } from "react";

import HtmlInput from "./components/HtmlInput/HtmlInput";
import HtmlUpload from "./components/HtmlUpload/HtmlUpload";

const App = () => {
  // This method requires a single parent node

  // First parse a html document

  // let file = openHtmlDocument().getContent()

  // Then location the first <ul> node where the content is at

  let content = document.body.querySelector("ul");
  // expand children
  // loop thru and copy each to a cell in csv

  // add new line to csv

  // Register max width to know where to place step and expectation
  let max = 0;

  // Start loop

  while (content.text) {
    // need to account for certain formats that has empty li as styled bullets
    let text = content.text;
    let content = content.childNode;

    // Add text to csv cell
    // Array.append()

    max++;
  }

  // Add new line to csvd arrray
  // appendNewline()

  // Then separate effort to move the last 2 non-empty cells in each row to the same column

  // then trigger a download of the csv
  return (
    <div>
      <h1>Mindmap 2 csv tool</h1>
      <HtmlInput />
      <HtmlUpload />
    </div>
  );
};

export default App;
