const downloadButton = document.getElementById("convert");

let csvDocument = "data:text/csv;charset=utf-8,",
  col = 0;

downloadButton.addEventListener("click", fileTransform);

/**
 * Convert the input OPML to CSV and trigger a download
 */
function fileTransform() {
  const xmlDocument = parseInputToXml();
  convertXmlToCsv(xmlDocument);

  // TODO: list enum possible response types
  // no nodes, no content, does not start with <outline> etc
  if (csvDocument !== 0) {
    console.log("Final output");
    console.log(csvDocument);

    doAutoDownloadCsv();
  } else {
    window.alert("Invalid document content. Nothing parsed.");
  }

  // Reset app
  csvDocument = "data:text/csv;charset=utf-8,";

  return;
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
  <outline text="L1 - 100">
  </outline>
  <outline text="L1 - 200">
    <outline text="L2 - 210">
    </outline>
    <outline text="L2 - 220">
        <outline text="L3 - 221">
        </outline>
    </outline>
  </outline>
  <outline text="L1 - 300">
    <outline text="L2 - 310">
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
  let maxWidth = 0;

  // This assumes opening tag inside <body> to be <outline>
  // A valid assumption since we are supposed to work with OPML
  // This reduces the computation effort as compared to parsing <body> first
  let documentRootNode = xmlDocument.getElementsByTagName("outline")[0] ?? "";

  console.log("RootNode");
  console.log(documentRootNode);

  // FIXME: This assumes at least 1 children. What if there is just a root node?
  if (documentRootNode.children.length) {
    csvDocument = buildCsvFromNode(documentRootNode, csvDocument);
  } else {
    // TODO: enum possible outcomes
    // TODO: log self instead?
    csvDocument = "This document has no content";
  }
}

/**
 * @param {Node} node
 * @param {String} csvDocument
 */
function buildCsvFromNode(node) {
  csvDocument += node.getAttribute("text");

  if (node.children.length) {
    csvDocument += ",";
    for (let i = 0; i < node.children.length; i++) {
      // Save the number of columns to space out
      col = !i ? node.children.length : col;
      buildCsvFromNode(node.children[i]);
    }
  } else {
    csvDocument += "\r\n";
    for (let i = 0; i < col; i++) {
      csvDocument += ",";
    }
  }

  return csvDocument;
}

/**
 * Trigger auto download of the CSV file
 * TODO: figure out why this called multiple times
 *
 * @param {String} csvDocument
 */
function doAutoDownloadCsv() {
  var encodedUri = encodeURI(csvDocument);
  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "my_data.csv");
  link.click();
}
