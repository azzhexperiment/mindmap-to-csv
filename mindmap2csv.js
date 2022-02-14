// TODO: change back to on button click
// document.getElementById("convert").addEventListener("click", fileTransform);
document.addEventListener("click", fileTransform);

/**
 * TODO: rename this function
 * @param {Node} parentNode
 */
function buildCsvFromRootNode(node, csvDocument) {
  // First append text to row

  // Then loop

  // Bottom of NodeList
  if (!node.children.length) return;

  // Add new row

  for (let i = 0; i < node.childElementCount; i++) {
    console.log("Node number:", i);
    let childNode = node.children[i];
    console.log("childNode text is:", childNode.getAttribute("text"));

    // Loop through root nodes

    // Append new row
    //   csvDocument += row + "\r\n";
  }

  // Make this loop through all children

  return getChildNode(parentNode.children);
}

/**
 * Convert the input OPML to CSV and trigger a download
 */
function fileTransform() {
  const xmlDocument = parseInputToXml();
  const csvDocument = convertXmlToCsv(xmlDocument);
  console.log(csvDocument);
  //   doAutoDownloadCsv();
}

/**
 * Parse input text into XML using browser build in DOM parser.
 *
 * @returns {XMLDocument}
 */
function parseInputToXml() {
  //   const content = document.getElementById("content").value;
  // TODO: REMOVE TEMP DATA
  const content = `<?xml version="1.0" encoding="UTF-8"?>
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

  const xmlDocument = new DOMParser().parseFromString(content, "text/xml");

  return xmlDocument;
}

/**
 * Convert parsed XMLDocument to a CSV array then trigger auto download
 *
 * @param {XML} xmlDocument
 */
function convertXmlToCsv(xmlDocument) {
  let csvHeader = "data:text/csv;charset=utf-8,";

  let maxWidth = 0,
    col = 0,
    csvDocument;

  const documentRootNode = xmlDocument.getElementsByTagName("body")[0];

  if (!documentRootNode.children.length) {
    let csvData = buildCsvFromRootNode(documentRootNode);
    csvDocument = csvHeader + csvData.map((e) => e.join(",")).join("\n");
  } else {
    // sth bad happens jk
  }

  // Align last 2 non-empty cells in each row to same column
  //   doAlignLastTwoColumns(csvDocument);

  return csvDocument;
}

/**
 * Trigger auto download of the CSV file
 *
 * @param {String} csvDocument
 */
function doAutoDownloadCsv(csvDocument) {
  let encodedUri = encodeURI(csvDocument);
  window.open(encodedUri);
}
