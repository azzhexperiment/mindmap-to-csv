const parser = new fxparser.XMLParser();
const Builder = new fxparser.XMLBuilder();
const Validator = new fxparser.Validator();

parser.parse(xmlContent);

document.getElementById("convert").addEventListener("click", printParsedData);

let content = document.getElementById("content").value;

if (XMLValidator.validate()) {
  const parser = new XMLParser();
  let jsonObj = parser.parse(content);

  const builder = new XMLBuilder();
  let sampleXmlData = builder.build(jsonObj);
}

// expand children

// loop thru and copy each to a cell in csv
let csvContent = "data:text/csv;charset=utf-8,";

// rows.forEach(function (rowArray) {
//   let row = rowArray.join(",");

//   // add new line to csv
//   csvContent += row + "\r\n";
// });

// Register max width to know where to place step and expectation
let max = 0;

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

// then trigger a download of the csv

/**
 * Each column starts with a <ul>
 * Each row contains only 1 <li>
 * Sibling <li> belonging under the same <ul> has to start on a new row
 * e.g.
 * <ul> <li> text 1_1 | <ul> <li> text 2_1
 *            ""      |      <li> text 2_2
 * <ul> <li> text 1_2 | <ul> <li> text 2_1
 */

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

/**
 * Better yet, parse OPML which is more consistent!
 * Just need to take note of how to split into levels
 */

function printParsedData() {
  let output = document.getElementById("output");

  output.innerText = sampleXmlData;
}
