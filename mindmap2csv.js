// TODO: change back to on button click
// document.getElementById("convert").addEventListener("click", fileTransform);
document.addEventListener("click", fileTransform);

/**
 * @param {Node} parentNode
 */
function buildCsvFromRootNode(node, csvDocument) {
  // First append text to row

  // Then loop

  // Bottom of NodeList
  // TODO: enum possible error types?
  // ^ is it still necessary if accomplished in function before that

  // TODO: figure out how to get object length or how to descend
  if (!node.children.length) return 0;

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

  // TODO: list enum possible response types
  // no nodes, no content, does not start with <outline> etc
  if (csvDocument !== 0) {
    console.log(csvDocument);
    // doAutoDownloadCsv();
  } else {
    window.alert("Invalid document content. Nothing parsed.");
  }
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
<outline text="Top level root node">
  <outline text="child L1 - 010">
  </outline>
  <outline text="child L1 - 020">
    <outline text="child L2 - 021 ">
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
 * @param {XMLDocument} xmlDocument
 */
function convertXmlToCsv(xmlDocument) {
  let csvHeader = "data:text/csv;charset=utf-8,";

  let maxWidth = 0,
    col = 0,
    csvDocument,
    documentRootNode;

  // This assumes opening tag inside <body> to be <outline>
  // A valid assumption since we are supposed to work with OPML
  // This reduces the computation effort as compared to parsing <body> first
  if (xmlDocument.getElementsByTagName("outline")[0]) {
    documentRootNode = xmlDocument.getElementsByTagName("outline")[0];
  } else {
    return 0;
  }

  if (documentRootNode.children.length) {
    // TODO: cast documentRootNode.children from HTMLCollection to object
    console.log(documentRootNode.children);

    let csvData = buildCsvFromRootNode(documentRootNode);

    if (csvData !== 0) {
      csvDocument = csvHeader + csvData.map((e) => e.join(",")).join("\n");
    } else {
      console.log("csvDocument is not mapped");
    }
  } else {
    // TODO: enum possible outcomes
    csvDocument = "This document has no content";
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
