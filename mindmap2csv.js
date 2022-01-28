document.getElementById("convert").addEventListener("click", convertOPMLToCsv);

/**
 * Convert the input OPML to CSV and trigger a download
 */
function convertOPMLToCsv() {
  let xmlDoc = parseInputToXML();
  let csvDoc = convertXmlToCsv(xmlDoc);

  downloadCsv(csvDoc);
}

/**
 * Parse input text into XML using browser build in DOM parser.
 */
function parseInputToXML() {
  //   let content = document.getElementById("content").value;
  // TODO: REMOVE TEMP DATA
  let content = `<?xml version="1.0" encoding="UTF-8"?>
<opml version="2.0">
  <head>
    <title></title>
    <dateModified></dateModified>
    <ownerName></ownerName>
  </head>
  <body>
<outline text="Top level">
  <outline text="child L1">
  </outline>
  <outline text="child L1">
    <outline text="child L2">
    </outline>
  </outline>
</outline>
  </body>
</opml>
`;
  let xmlDoc = new DOMParser().parseFromString(content, "text/xml");

  console.log("Parsing input to XML");
  console.log(xmlDoc);

  return xmlDoc;
}

/**
 * Convert parsed XMLDocument to a CSV array then trigger auto download
 *
 * @param {XML} xmlDoc
 */
function convertXmlToCsv(xmlDoc) {
  // Declare a CSV datatype to house the final output which will be downloaded
  let csvDoc = "data:text/csv;charset=utf-8,";

  // Register max width to know where to place step and expectation
  let maxWidth = 0;

  // Register current width to know how many commas to insert for column consistency
  let parentCol = 0;

  /**
   * ISSUE
   * If obtaining a elements by tag name, the output is a HTMLCollection
   * which is an array that loses parent/children relationship.
   *
   * Temp solution is to use 1 single parent node as object
   */
  let docRootNode = xmlDoc.getElementsByTagName("outline")[0];

  // TODO: loop thru root nodes to create more rows
  console.log("docRootNode have content:");
  console.log(docRootNode);
  console.log("docRootNode children count:", docRootNode.childElementCount);

  // Loop thru
  let rootNode, rootText;

  for (let i = 0; i < docRootNode.childElementCount; i++) {
    rootNode = docRootNode.childNodes[i];
    console.log("childNode has type: ", typeof rootNode);
    console.log(rootNode);
    // Set parent text
    rootText = rootNode.getAttribute("text");

    console.log(rootText);

    // Obtain children nodes
    childrenNodes = rootNode.childrenNodes;
    console.log(childrenNodes);
  }

  // Sadly object does not have forEach method
  //   rootNodes.forEach((rootNode) => {});

  // rows.forEach(function (rowArray) {
  //   let row = rowArray.join(",");

  //   // add new line to csv
  //   csvDoc += row + "\r\n";
  // });

  const getNodeText = (node) => {
    let nodes = [];
    let children = node.children;

    children.forEach((child) => {
      nodes.push(child.childNodes[0]);
    });
  };

  const getChildNode = (node) => {
    return node.children;
  };

  // Start loop
  // while (Content.text !== "") {
  //   // need to account for certain formats that has empty li as styled bullets
  //   let text = content.text;
  //   let content = content.childNode;

  //   // Add text to csv cell
  //   // Array.append()

  //   max++;
  // }

  // Then separate effort to move the last 2 non-empty cells in each row to the same column

  return csvDoc;
}

/**
 * Trigger auto download of the CSV file
 *
 * @param {CSV} data
 */
function downloadCsv(data) {
  // download logic here
}
