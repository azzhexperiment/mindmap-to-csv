// @ts-check

// TODO: escape symbols inside the quotes
// TODO: escape whatever funky symbol that requires escaping
// TODO: save current branch as v1
// TODO: fork a branch and refactor code to parse opml into obj for processing
// TODO: convert to react app with tsx

/******************************************************************************\
  GLOBAL CONSTANTS
\******************************************************************************/

const CONVERT = document.getElementById("convert");
const ALIGN_COUNT = document.getElementById("align-count")["value"];

/******************************************************************************\
  GLOBAL VARIABLES
\******************************************************************************/

let csvDocument = "data:text/csv;charset=utf-8,",
  arrStrings = [],
  arrChildrenCount = [],
  arrDepths = [],
  unprocessedChildrenCount = 0,
  currentDepth = 0;

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
  const xmlDocument = new DOMParser().parseFromString(string, "text/xml");

  return xmlDocument;
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

  console.log(arrStrings);

  buildCsvFromTextArray();

  //   appendNewCellToCsv(node);

  //   if (isNodeHasChildren(node)) {
  //     updateOverallColumnChildrenCount(node);
  //     appendCommaToCsv();

  //     for (let i = 0; i < node.children.length; i++) {
  //       updateCurrentDepth();
  //       buildCsvFromNode(node.children[i]);
  //     }
  //   }

  //   updateCurrentProcessedChildrenCount();

  //   if (unprocessedChildrenCount === 0) {
  //     arrChildrenCount.pop();
  //     updateCurrentDepth();
  //   } else {
  //     doPrepareNewRow();
  //   }

  /**
   * @param {Object} node
   */
  function buildTextArrayFromNode(node) {
    arrStrings.push(getCleanTextFromNode(node));

    if (isNodeHasChildren(node)) {
      updateOverallColumnChildrenCount(node);
      //   appendCommaToCsv();

      for (let i = 0; i < node.children.length; i++) {
        updateCurrentDepth();
        buildTextArrayFromNode(node.children[i]);
      }
    }

    arrDepths.push(currentDepth);

    updateCurrentProcessedChildrenCount();

    if (unprocessedChildrenCount === 0) {
      arrChildrenCount.pop();
      updateCurrentDepth();
    } else {
      // add new row and prepend empty cells
      arrStrings.push("\r\n");

      for (let i = 0; i < currentDepth; i++) {
        arrStrings.push(",");
      }
    }

    /**
     * @param {Element} node
     *
     * @returns {String}
     */
    function getCleanTextFromNode(node) {
      return '"' + node.getAttribute("text").trim().replace('"', '""') + '"';
    }
  }

  function buildCsvFromTextArray() {
    //   appendNewCellToCsv(node);
    //   if (isNodeHasChildren(node)) {
    //     updateOverallColumnChildrenCount(node);
    //     appendCommaToCsv();
    //     for (let i = 0; i < node.children.length; i++) {
    //       updateCurrentDepth();
    //       buildCsvFromNode(node.children[i]);
    //     }
    //   }
    //   updateCurrentProcessedChildrenCount();
    //   if (unprocessedChildrenCount === 0) {
    //     arrChildrenCount.pop();
    //     updateCurrentDepth();
    //   } else {
    //     doPrepareNewRow();
    //   }
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

function appendNewRowToCsv() {
  csvDocument += "\r\n";
}

function appendCommaToCsv() {
  csvDocument += ",";
}

/**
 * @param {Element} node
 */
function isNodeHasChildren(node) {
  return node.children.length ? true : false;
}

function updateCurrentDepth() {
  currentDepth = arrChildrenCount.length;
  //   console.log("Current depth is", currentDepth);
}

function updateCurrentProcessedChildrenCount() {
  arrChildrenCount[currentDepth - 1] -= 1;
  unprocessedChildrenCount = arrChildrenCount[currentDepth - 1];

  // console.log("Processed nodes:", arrChildrenCount);
  // console.log("Current column unprocessed nodes:", unprocessedChildrenCount);
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
  arrDepths = [];
  arrChildrenCount = [];
  unprocessedChildrenCount = 0;
  currentDepth = 0;
}
