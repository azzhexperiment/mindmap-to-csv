// @ts-check

// TODO: escape symbols inside the quotes
// TODO: escape whatever funky symbol that requires escaping
// TODO: convert to react app with tsx

/******************************************************************************\
  GLOBAL
\******************************************************************************/

const CONVERT = document.getElementById("convert");

let csvDocument = "data:text/csv;charset=utf-8,",
  strings = [],
  rowStrings = [],
  childrenCounts = [],
  maxDepth = 0,
  alignCount = 0,
  currentDepth = 0,
  unprocessedChildrenCount = 0;

/******************************************************************************\
  INIT
\******************************************************************************/

CONVERT.onclick = convertInputOpmlFileToCsv;

/******************************************************************************\
  BUSINESS LOGIC
\******************************************************************************/

/**
 * Convert the input OPML to CSV and trigger a download
 */
function convertInputOpmlFileToCsv() {
  parseInputFileToString().then((string) => {
    let inputXML = parseStringToXml(string);

    convertXmlToCsv(inputXML);
    doAutoDownloadCsv();

    resetApp();
  });
}

/**
 * Parse input text into XML using browser build in DOM parser.
 *
 * @returns {Promise<String>} inputString
 */
async function parseInputFileToString() {
  return await document.querySelector("input").files[0].text();
}

/**
 * Parse input text into XML using browser browser built-in DOM parser.
 *
 * @param {String} string
 *
 * @returns {XMLDocument}
 */
function parseStringToXml(string) {
  return new DOMParser().parseFromString(string, "text/xml");
}

/**
 *
 * @param {XMLDocument} xmlDocument
 */
function convertXmlToCsv(xmlDocument) {
  const rootNode = xmlDocument.getElementsByTagName("outline")[0];

  if (isNodeHasChildren(rootNode)) {
    buildCsvFromNode(rootNode);
  } else {
    // TODO: what other possible outcomes are there?
    window.alert("This document has no content");
  }
}

/**
 * @param {Object} node
 */
function buildCsvFromNode(node) {
  buildTextArrayFromNode(node);
  buildCsvFromTextArray();

  /**
   * Given a node, obtain its cleaned text and recursively get children text.
   *
   * @param {Object} node
   */
  function buildTextArrayFromNode(node) {
    strings.push(getCleanTextFromNode(node));

    if (isNodeHasChildren(node)) {
      updateOverallColumnChildrenCount(node);

      for (let i = 0; i < node.children.length; i++) {
        updateCurrentDepth();
        buildTextArrayFromNode(node.children[i]);
      }
    }

    updateCurrentProcessedChildrenCount();

    if (unprocessedChildrenCount === 0) {
      childrenCounts.pop();
      updateCurrentDepth();
    } else {
      strings.push("\r\n");

      // Reduce 1 comma here as Array.join() will inject 1 more later
      // Will create an extra row of empty commas at the bottom row
      for (let i = 0; i < currentDepth - 1; i++) {
        strings.push("");
      }
    }
  }

  /**
   * Clean up previously obtained strings into rows and join them to output.
   */
  function buildCsvFromTextArray() {
    buildRowStrings();

    alignColumns();

    csvDocument += rowStrings.flat().join();

    /**
     * Split strings into rows by using "\r\n" as delimiter
     */
    function buildRowStrings() {
      rowStrings.push([]);

      strings.forEach((string) => {
        rowStrings[rowStrings.length - 1].push(string);

        if (string === "\r\n") {
          rowStrings.push([]);
        }
      });
    }

    /**
     * Right align columns based on indicated align count
     */
    function alignColumns() {
      let maxDepth = getMaxDepth();
      updateAlignCount();

      rowStrings.forEach((row) => {
        while (row.length < maxDepth) {
          row.splice(row.length - alignCount - 1, 0, "");
        }
      });
    }
  }
}

/**
 * Generate a download link for the CSV output and append it to convert button,
 * then triggers auto download of the CSV file
 */
function doAutoDownloadCsv() {
  const encodedUri = encodeURI(csvDocument);
  const link = document.createElement("a");

  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "my_data.csv");
  link.click();
}

/******************************************************************************\
 * HELPER FUNCTIONS
\******************************************************************************/

/**
 * @param {Element} node
 */
function isNodeHasChildren(node) {
  return node.children.length ? true : false;
}

/**
 * @param {Element} node
 *
 * @returns {String}
 */
function getCleanTextFromNode(node) {
  // TODO: figure out if double quotes correctly escaped or if needed
  return '"' + node.getAttribute("text").trim().replace('"', '""') + '"';
}

/**
 * @returns {Number}
 */
function getMaxDepth() {
  let depths = [];

  rowStrings.forEach((row) => {
    depths.push(row.length);
  });

  return Math.max(...depths);
}

function updateAlignCount() {
  alignCount = document.getElementById("align-count")["value"];
}

function updateCurrentDepth() {
  currentDepth = childrenCounts.length;
}

function updateCurrentProcessedChildrenCount() {
  childrenCounts[currentDepth - 1] -= 1;
  unprocessedChildrenCount = childrenCounts[currentDepth - 1];
}

/**
 * @param {Element} node
 */
function updateOverallColumnChildrenCount(node) {
  childrenCounts.push(node.children.length);
}

/**
 * Re-initiate global constants
 */
function resetApp() {
  csvDocument = "data:text/csv;charset=utf-8,";
  strings = [];
  rowStrings = [];
  childrenCounts = [];
  maxDepth = 0;
  alignCount = 0;
  currentDepth = 0;
  unprocessedChildrenCount = 0;
}
