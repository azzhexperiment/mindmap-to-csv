// @ts-check

// TODO: escape symbols inside the quotes
// TODO: escape whatever funky symbol that requires escaping
// TODO: save current branch as v1
// TODO: fork a branch and refactor code to parse opml into obj for processing
// TODO: convert to react app with tsx

/******************************************************************************\
  GLOBAL CONSTANTS
\******************************************************************************/

const downloadButton = document.getElementById("convert");

/******************************************************************************\
  GLOBAL VARIABLES
\******************************************************************************/

let csvDocument = "data:text/csv;charset=utf-8,",
  arrChildrenCount = [],
  unprocessedChildrenCount = 0,
  currentDepth = 0;

/******************************************************************************\
  INIT
\******************************************************************************/

downloadButton.onclick = magic;

/******************************************************************************\
  WHERE MAGIC HAPPENS
\******************************************************************************/

/**
 * Convert the input OPML to CSV and trigger a download
 */
function magic() {
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
  const input = document.querySelector("input");
  const inputString = await input.files[0].text();

  return inputString;
}

/**
 * Parse input text into XML using browser build in DOM parser.
 *
 * @param {String} string
 *
 * @returns {XMLDocument}
 */
function parseStringToXml(string) {
  const xmlDocument = new DOMParser().parseFromString(string, "text/xml");

  return xmlDocument;
}

/**
 * @param {XMLDocument} xmlDocument
 */
function convertXmlToCsv(xmlDocument) {
  // This assumes opening tag inside <body> to be <outline>
  // A valid assumption since we are supposed to work with OPML
  // This reduces the computation effort as compared to parsing <body> first
  const rootNode = xmlDocument.getElementsByTagName("outline")[0];

  // FIXME: This assumes at least 1 children. What if there is just a root node?
  // TODO: figure out if ^ is even a valid problem
  if (isNodeHasChildren(rootNode)) {
    buildCsvFromNode(rootNode);
  } else {
    // TODO: enum possible outcomes
    // TODO: log self instead?
    csvDocument = "This document has no content";
  }
}

/**
 * @param {Object} node
 */
function buildCsvFromNode(node) {
  appendNewCellToCsv(node);

  if (isNodeHasChildren(node)) {
    updateOverallColumnChildrenCount(node);
    appendCommaToCsv();

    for (let i = 0; i < node.children.length; i++) {
      updateCurrentDepth();
      buildCsvFromNode(node.children[i]);
    }
  }

  updateCurrentProcessedChildrenCount();

  if (unprocessedChildrenCount === 0) {
    arrChildrenCount.pop();
    updateCurrentDepth();
  } else {
    doPrepareNewRow();
  }
}

/**
 * Append new row to CSV and prepend corresponding number of empty cells
 */
function doPrepareNewRow() {
  appendNewRowToCsv();

  for (let i = 0; i < currentDepth; i++) {
    appendCommaToCsv();
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
 * @TODO escape single quotes here
 *
 * @param {Element} node
 */
function appendNewCellToCsv(node) {
  csvDocument +=
    '"' + node.getAttribute("text").trim().replace('"', '""') + '"';
}

function appendNewRowToCsv() {
  csvDocument += "\r\n";
}

function appendCommaToCsv() {
  csvDocument += ",";
}

function updateCurrentDepth() {
  currentDepth = arrChildrenCount.length;
  //   console.log("Current depth is", currentDepth);
}

function updateCurrentProcessedChildrenCount() {
  arrChildrenCount[currentDepth - 1] -= 1;
  unprocessedChildrenCount = arrChildrenCount[currentDepth - 1];

  //   console.log("Processed nodes:", arrChildrenCount);
  //   console.log("Current column unprocessed nodes:", unprocessedChildrenCount);
}

/**
 * @param {Element} node
 */
function updateOverallColumnChildrenCount(node) {
  arrChildrenCount.push(node.children.length);

  //   console.log("Nodes per column:", arrChildrenCount);
}

function resetApp() {
  csvDocument = "data:text/csv;charset=utf-8,";
  arrChildrenCount = [];
  currentDepth = 0;
}
