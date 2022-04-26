// @ts-check

// TODO: escape symbols inside the quotes
// TODO: escape whatever funky symbol that requires escaping
// TODO: save current branch as v1
// TODO: fork a branch and refactor code to parse opml into obj for processing
// TODO: convert to react app with tsx

/******************************************************************************\
  GLOBAL CONSTANTS
\******************************************************************************/

const END_OF_ROW = "THIS_IS_AN_END_OF_ROW_TOKEN";

const CONVERT = document.getElementById("convert");
const ALIGN_COUNT = document.getElementById("align-count")["value"];

/******************************************************************************\
  GLOBAL VARIABLES
\******************************************************************************/

let csvDocument = "data:text/csv;charset=utf-8,",
  arrStrings = [],
  arrChildrenCount = [],
  unprocessedChildrenCount = 0,
  currentDepth = 0,
  maxDepth = 0;

/******************************************************************************\
  INIT
\******************************************************************************/

CONVERT.onclick = magic;

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

    console.log(csvDocument);

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
 * Parse input text into XML using browser build in DOM parser.
 *
 * @param {String} string
 *
 * @returns {XMLDocument}
 */
function parseStringToXml(string) {
  return new DOMParser().parseFromString(string, "text/xml");
}

/**
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

  console.log(arrStrings);

  /**
   * @param {Object} node
   */
  function buildTextArrayFromNode(node) {
    arrStrings.push(getCleanTextFromNode(node));

    if (isNodeHasChildren(node)) {
      updateOverallColumnChildrenCount(node);

      for (let i = 0; i < node.children.length; i++) {
        updateCurrentDepth();
        buildTextArrayFromNode(node.children[i]);
      }
    }

    updateMaxDepth(currentDepth);
    updateCurrentProcessedChildrenCount();

    if (unprocessedChildrenCount === 0) {
      arrChildrenCount.pop();
      updateCurrentDepth();
    } else {
      //   arrStrings.push(END_OF_ROW); // EOR token for column alignment
      arrStrings.push("\r\n");

      for (let i = 0; i < currentDepth; i++) {
        arrStrings.push(",");
      }
    }
  }

  function buildCsvFromTextArray() {
    for (let i = 0; i < arrStrings.length - 1; i++) {
      csvDocument += arrStrings[i];

      if (arrStrings[i] !== ",") {
        csvDocument += ",";
      }

      // TODO: add alignment logic here

      //   arrStrings.splice(maxDepth, arrStrings.length);
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

function updateCurrentDepth() {
  currentDepth = arrChildrenCount.length;
}

/**
 * @param {Number} currentDepth
 */
function updateMaxDepth(currentDepth) {
  if (currentDepth > maxDepth) {
    maxDepth = currentDepth;
  }
}

function updateCurrentProcessedChildrenCount() {
  arrChildrenCount[currentDepth - 1] -= 1;
  unprocessedChildrenCount = arrChildrenCount[currentDepth - 1];
}

/**
 * @param {Element} node
 */
function updateOverallColumnChildrenCount(node) {
  arrChildrenCount.push(node.children.length);
}

/**
 * Re-initiate global constants
 */
function resetApp() {
  csvDocument = "data:text/csv;charset=utf-8,";
  arrChildrenCount = [];
  unprocessedChildrenCount = 0;
  currentDepth = 0;
  maxDepth = 0;
}
