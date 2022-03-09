const downloadButton = document.getElementById("convert");

let csvDocument = "data:text/csv;charset=utf-8,",
  col = [];

downloadButton.onclick = fileTransform;

/**
 * Convert the input OPML to CSV and trigger a download
 */
function fileTransform() {
  const xmlDocument = parseInputToXml();

  convertXmlToCsv(xmlDocument);
  doAutoDownloadCsv();

  console.log("xmlDocument");
  console.log(xmlDocument);

  console.log("Final output");
  console.log(csvDocument);

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
    <title>Mall</title>
  </head>
  <body>
    <outline text="FE" _mubu_text="%3Cspan%3EFE%3C/span%3E" _note="" _mubu_note="">
      <outline text="Mall Section" _mubu_text="%3Cspan%3EMall%20Section%3C/span%3E" _note="" _mubu_note="">
        <outline text="Banner" _mubu_text="%3Cspan%3EBanner%3C/span%3E" _note="" _mubu_note="">
          <outline text="Carousel" _mubu_text="%3Cspan%3ECarousel%3C/span%3E" _note="" _mubu_note="">
            <outline text="Attributes" _mubu_text="%3Cspan%3EAttributes%3C/span%3E" _note="" _mubu_note="">
              <outline text="Position" _mubu_text="%3Cspan%3EPosition%3C/span%3E" _note="" _mubu_note="">
                <outline text="PC" _mubu_text="%3Cspan%3EPC%3C/span%3E" _note="" _mubu_note="">
                  <outline text="Left" _mubu_text="%3Cspan%3ELeft%3C/span%3E" _note="" _mubu_note=""/>
                </outline>
                <outline text="RN/RW" _mubu_text="%3Cspan%3ERN/RW%3C/span%3E" _note="" _mubu_note="">
                  <outline text="Full width, above shops" _mubu_text="%3Cspan%3EFull%20width,%20above%20shops%3C/span%3E" _note="" _mubu_note="">
                    <outline text="can change position?" _mubu_text="%3Cspan%20class=%22%20text-color-red%22%3Ecan%20change%20position?%3C/span%3E" _note="" _mubu_note=""/>
                  </outline>
                </outline>
              </outline>
              <outline text="Height" _mubu_text="%3Cspan%3EHeight%3C/span%3E" _note="" _mubu_note="">
                <outline text="PC" _mubu_text="%3Cspan%3EPC%3C/span%3E" _note="" _mubu_note="">
                  <outline text="2 rows" _mubu_text="%3Cspan%3E2%20rows%3C/span%3E" _note="" _mubu_note=""/>
                </outline>
                <outline text="RN/RW" _mubu_text="%3Cspan%3ERN/RW%3C/span%3E" _note="" _mubu_note="">
                  <outline text="Fixed height &lt; 1 row of shop icons" _mubu_text="%3Cspan%3EFixed%20height%20&amp;lt;%201%20row%20of%20shop%20icons%3C/span%3E" _note="" _mubu_note=""/>
                </outline>
              </outline>
              <outline text="Scroll" _mubu_text="%3Cspan%3EScroll%3C/span%3E" _note="" _mubu_note="">
                <outline text="Animation" _mubu_text="%3Cspan%3EAnimation%3C/span%3E" _note="" _mubu_note="">
                  <outline text="Swipe to jump across banners, no partial scroll" _mubu_text="%3Cspan%3ESwipe%20to%20jump%20across%20banners,%20no%20partial%20scroll%3C/span%3E" _note="" _mubu_note=""/>
                </outline>
                <outline text="Duration" _mubu_text="%3Cspan%3EDuration%3C/span%3E" _note="" _mubu_note="">
                  <outline text="Auto scroll time" _mubu_text="%3Cspan%3EAuto%20scroll%20time%3C/span%3E" _note="" _mubu_note=""/>
                </outline>
                <outline text="End" _mubu_text="%3Cspan%3EEnd%3C/span%3E" _note="" _mubu_note="">
                  <outline text="Last -&gt; First and First -&gt; Last" _mubu_text="%3Cspan%3ELast%20-&amp;gt;%20First%20and%20First%20-&amp;gt;%20Last%3C/span%3E" _note="" _mubu_note=""/>
                </outline>
              </outline>
            </outline>
            <outline text="Elements" _mubu_text="%3Cspan%3EElements%3C/span%3E" _note="" _mubu_note="">
              <outline text="Banner image" _mubu_text="%3Cspan%3EBanner%20image%3C/span%3E" _note="" _mubu_note=""/>
              <outline text="Ribbons" _mubu_text="%3Cspan%20class=%22%20text-color-red%22%3ERibbons%3C/span%3E" _note="" _mubu_note=""/>
              <outline text="Redirection URL" _mubu_text="%3Cspan%3ERedirection%20URL%3C/span%3E" _note="" _mubu_note=""/>
            </outline>
            <outline text="Display logic" _mubu_text="%3Cspan%3EDisplay%20logic%3C/span%3E" _note="" _mubu_note="">
              <outline text="Min number of banners required to display" _mubu_text="%3Cspan%3EMin%20number%20of%20banners%20required%20to%20display%3C/span%3E" _note="" _mubu_note=""/>
              <outline text="Max number of banners that can be displayed" _mubu_text="%3Cspan%3EMax%20number%20of%20banners%20that%20can%20be%20displayed%3C/span%3E" _note="" _mubu_note=""/>
              <outline text="Rulesets" _mubu_text="%3Cspan%3ERulesets%3C/span%3E" _note="" _mubu_note=""/>
            </outline>
          </outline>
        </outline>
        <outline text="Shops" _mubu_text="%3Cspan%3EShops%3C/span%3E" _note="" _mubu_note="">
          <outline text="Attributes" _mubu_text="%3Cspan%3EAttributes%3C/span%3E" _note="" _mubu_note="">
            <outline text="Position" _mubu_text="%3Cspan%3EPosition%3C/span%3E" _note="" _mubu_note="">
              <outline text="PC" _mubu_text="%3Cspan%3EPC%3C/span%3E" _note="" _mubu_note="">
                <outline text="Right" _mubu_text="%3Cspan%3ERight%3C/span%3E" _note="" _mubu_note=""/>
              </outline>
              <outline text="RN/RW" _mubu_text="%3Cspan%3ERN/RW%3C/span%3E" _note="" _mubu_note="">
                <outline text="Below" _mubu_text="%3Cspan%3EBelow%3C/span%3E" _note="" _mubu_note=""/>
              </outline>
            </outline>
            <outline text="Rows" _mubu_text="%3Cspan%3ERows%3C/span%3E" _note="" _mubu_note="">
              <outline text="PC" _mubu_text="%3Cspan%3EPC%3C/span%3E" _note="" _mubu_note="">
                <outline text="2" _mubu_text="%3Cspan%3E2%3C/span%3E" _note="" _mubu_note=""/>
              </outline>
              <outline text="RN/RW" _mubu_text="%3Cspan%3ERN/RW%3C/span%3E" _note="" _mubu_note="">
                <outline text="1" _mubu_text="%3Cspan%3E1%3C/span%3E" _note="" _mubu_note=""/>
              </outline>
            </outline>
            <outline text="Count" _mubu_text="%3Cspan%3ECount%3C/span%3E" _note="" _mubu_note="">
              <outline text="PC" _mubu_text="%3Cspan%3EPC%3C/span%3E" _note="" _mubu_note="">
                <outline text="Pages" _mubu_text="%3Cspan%3EPages%3C/span%3E" _note="" _mubu_note=""/>
                <outline text="7 &lt; = n &lt;= 23" _mubu_text="%3Cspan%3E7%20&amp;lt;%20=%20n%20&amp;lt;=%2023%3C/span%3E" _note="" _mubu_note=""/>
              </outline>
              <outline text="RN/RW" _mubu_text="%3Cspan%3ERN/RW%3C/span%3E" _note="" _mubu_note="">
                <outline text="Has 6" _mubu_text="%3Cspan%3EHas%206%3C/span%3E" _note="" _mubu_note="">
                  <outline text="Hide Mall section" _mubu_text="%3Cspan%3EHide%20Mall%20section%3C/span%3E" _note="" _mubu_note=""/>
                </outline>
                <outline text="Has 7" _mubu_text="%3Cspan%3EHas%207%3C/span%3E" _note="" _mubu_note="">
                  <outline text="Display Mall section" _mubu_text="%3Cspan%3EDisplay%20Mall%20section%3C/span%3E" _note="" _mubu_note=""/>
                  <outline text="Display 7 shops" _mubu_text="%3Cspan%3EDisplay%207%20shops%3C/span%3E" _note="" _mubu_note=""/>
                </outline>
                <outline text="Has 15" _mubu_text="%3Cspan%3EHas%2015%3C/span%3E" _note="" _mubu_note="">
                  <outline text="Display Mall section" _mubu_text="%3Cspan%3EDisplay%20Mall%20section%3C/span%3E" _note="" _mubu_note=""/>
                  <outline text="Display 15 shops" _mubu_text="%3Cspan%3EDisplay%2015%20shops%3C/span%3E" _note="" _mubu_note=""/>
                </outline>
                <outline text="Has 16" _mubu_text="%3Cspan%3EHas%2016%3C/span%3E" _note="" _mubu_note="">
                  <outline text="Display Mall section" _mubu_text="%3Cspan%3EDisplay%20Mall%20section%3C/span%3E" _note="" _mubu_note=""/>
                  <outline text="Display first 15 shops" _mubu_text="%3Cspan%3EDisplay%20first%2015%20shops%3C/span%3E" _note="" _mubu_note=""/>
                </outline>
              </outline>
            </outline>
            <outline text="Type" _mubu_text="%3Cspan%3EType%3C/span%3E" _note="" _mubu_note="">
              <outline text="Sold spots" _mubu_text="%3Cspan%3ESold%20spots%3C/span%3E" _note="" _mubu_note="">
                <outline text="isSoldSpot == yes" _mubu_text="%3Cspan%3EisSoldSpot%20==%20yes%3C/span%3E" _note="" _mubu_note="">
                  <outline text="Start time &lt;= current time &lt;= end time" _mubu_text="%3Cspan%3EStart%20time%20&amp;lt;=%20current%20time%20&amp;lt;=%20end%20time%3C/span%3E" _note="" _mubu_note="">
                    <outline text="Display" _mubu_text="%3Cspan%3EDisplay%3C/span%3E" _note="" _mubu_note=""/>
                  </outline>
                  <outline text="Start time &lt;= current time &lt;= end time" _mubu_text="%3Cspan%3EStart%20time%20&amp;lt;=%20current%20time%20&amp;lt;=%20end%20time%3C/span%3E" _note="" _mubu_note="">
                    <outline text="Display" _mubu_text="%3Cspan%3EDisplay%3C/span%3E" _note="" _mubu_note=""/>
                  </outline>
                  <outline text="else" _mubu_text="%3Cspan%3Eelse%3C/span%3E" _note="" _mubu_note="">
                    <outline text="Hide" _mubu_text="%3Cspan%3EHide%3C/span%3E" _note="" _mubu_note=""/>
                  </outline>
                </outline>
                <outline text="isSoldSpot == no" _mubu_text="%3Cspan%3EisSoldSpot%20==%20no%3C/span%3E" _note="" _mubu_note="">
                  <outline text="Hide" _mubu_text="%3Cspan%3EHide%3C/span%3E" _note="" _mubu_note=""/>
                </outline>
              </outline>
              <outline text="Recommendation spots" _mubu_text="%3Cspan%3ERecommendation%20spots%3C/span%3E" _note="" _mubu_note=""/>
              <outline text="Reserved spots" _mubu_text="%3Cspan%3EReserved%20spots%3C/span%3E" _note="" _mubu_note=""/>
            </outline>
          </outline>
          <outline text="Elements" _mubu_text="%3Cspan%3EElements%3C/span%3E" _note="" _mubu_note="">
            <outline text="Shop card" _mubu_text="%3Cspan%3EShop%20card%3C/span%3E" _note="" _mubu_note="">
              <outline text="Product image" _mubu_text="%3Cspan%3EProduct%20image%3C/span%3E" _note="" _mubu_note=""/>
              <outline text="Brand logo" _mubu_text="%3Cspan%3EBrand%20logo%3C/span%3E" _note="" _mubu_note="">
                <outline text="Has brand logo" _mubu_text="%3Cspan%3EHas%20brand%20logo%3C/span%3E" _note="" _mubu_note=""/>
              </outline>
              <outline text="Ribbon" _mubu_text="%3Cspan%20class=%22%20text-color-red%22%3ERibbon%3C/span%3E" _note="" _mubu_note=""/>
              <outline text="Promotion text" _mubu_text="%3Cspan%3EPromotion%20text%3C/span%3E" _note="" _mubu_note="">
                <outline text="Length" _mubu_text="%3Cspan%3ELength%3C/span%3E" _note="" _mubu_note=""/>
                <outline text="Colour" _mubu_text="%3Cspan%3EColour%3C/span%3E" _note="" _mubu_note=""/>
              </outline>
              <outline text="Redirection URL" _mubu_text="%3Cspan%3ERedirection%20URL%3C/span%3E" _note="" _mubu_note=""/>
            </outline>
            <outline text="See more" _mubu_text="%3Cspan%3ESee%20more%3C/span%3E" _note="" _mubu_note="">
              <outline text="Click" _mubu_text="%3Cspan%3EClick%3C/span%3E" _note="" _mubu_note="">
                <outline text="Redirect to Shopee Mall page" _mubu_text="%3Cspan%3ERedirect%20to%20Shopee%20Mall%20page%3C/span%3E" _note="" _mubu_note=""/>
              </outline>
            </outline>
          </outline>
          <outline text="Display logic" _mubu_text="%3Cspan%3EDisplay%20logic%3C/span%3E" _note="" _mubu_note="">
            <outline text="Count" _mubu_text="%3Cspan%3ECount%3C/span%3E" _note="" _mubu_note="">
              <outline text="Min number of banners required to display" _mubu_text="%3Cspan%3EMin%20number%20of%20banners%20required%20to%20display%3C/span%3E" _note="" _mubu_note=""/>
              <outline text="Max number of banners that can be displayed" _mubu_text="%3Cspan%3EMax%20number%20of%20banners%20that%20can%20be%20displayed%3C/span%3E" _note="" _mubu_note=""/>
            </outline>
            <outline text="Ruleset" _mubu_text="%3Cspan%3ERuleset%3C/span%3E" _note="" _mubu_note="">
              <outline text="composite rules" _mubu_text="%3Cspan%3Ecomposite%20rules%3C/span%3E" _note="" _mubu_note=""/>
            </outline>
            <outline text="Shop label" _mubu_text="%3Cspan%3EShop%20label%3C/span%3E" _note="" _mubu_note="">
              <outline text="check this out" _mubu_text="%3Cspan%20class=%22%20text-color-blue%22%3Echeck%20this%20out%3C/span%3E" _note="" _mubu_note=""/>
            </outline>
            <outline text="Inactivity" _mubu_text="%3Cspan%3EInactivity%3C/span%3E" _note="" _mubu_note="">
              <outline text="Hide if no login L30D at every end of month" _mubu_text="%3Cspan%3EHide%20if%20no%20login%20L30D%20at%20every%20end%20of%20month%3C/span%3E" _note="" _mubu_note=""/>
            </outline>
            <outline text="Anormally" _mubu_text="%3Cspan%20class=%22%20text-color-red%22%3EAnormally%3C/span%3E" _note="" _mubu_note="">
              <outline text="Shop banned" _mubu_text="%3Cspan%3EShop%20banned%3C/span%3E" _note="" _mubu_note="">
                <outline text="Shop cards suspended" _mubu_text="%3Cspan%3EShop%20cards%20suspended%3C/span%3E" _note="" _mubu_note=""/>
              </outline>
              <outline text="Shop blacklisted by Shopee" _mubu_text="%3Cspan%3EShop%20blacklisted%20by%20Shopee%3C/span%3E" _note="" _mubu_note="">
                <outline text="Shop cards suspended" _mubu_text="%3Cspan%3EShop%20cards%20suspended%3C/span%3E" _note="" _mubu_note=""/>
              </outline>
              <outline text="Shop blacklisted by user" _mubu_text="%3Cspan%3EShop%20blacklisted%20by%20user%3C/span%3E" _note="" _mubu_note="">
                <outline text="User cannot see cards from blacklisted shops" _mubu_text="%3Cspan%3EUser%20cannot%20see%20cards%20from%20blacklisted%20shops%3C/span%3E" _note="" _mubu_note=""/>
              </outline>
              <outline text="User blacklisted by shop" _mubu_text="%3Cspan%3EUser%20blacklisted%20by%20shop%3C/span%3E" _note="" _mubu_note="">
                <outline text="User cannot see cards from blacklisted shops" _mubu_text="%3Cspan%3EUser%20cannot%20see%20cards%20from%20blacklisted%20shops%3C/span%3E" _note="" _mubu_note=""/>
              </outline>
            </outline>
            <outline text="Front loading date" _mubu_text="%3Cspan%3EFront%20loading%20date%3C/span%3E" _note="" _mubu_note=""/>
            <outline text="Diamond platinum partners and brands having homepage/brand highlight activation" _mubu_text="%3Cspan%3EDiamond%20platinum%20partners%20and%20brands%20having%20homepage/brand%20highlight%20activation%3C/span%3E" _note="" _mubu_note=""/>
          </outline>
        </outline>
        <outline text="Other content" _mubu_text="%3Cspan%3EOther%20content%3C/span%3E" _note="" _mubu_note="">
          <outline text="Shopee Mall section header" _mubu_text="%3Cspan%3EShopee%20Mall%20section%20header%3C/span%3E" _note="" _mubu_note=""/>
          <outline text="See More &gt;" _mubu_text="%3Cspan%3ESee%20More%20&amp;gt;%3C/span%3E" _note="" _mubu_note=""/>
          <outline text="Other content" _mubu_text="%3Cspan%3EOther%20content%3C/span%3E" _note="" _mubu_note="">
            <outline text="Click" _mubu_text="%3Cspan%3EClick%3C/span%3E" _note="" _mubu_note="">
              <outline text="Redirect to explanation page" _mubu_text="%3Cspan%3ERedirect%20to%20explanation%20page%3C/span%3E" _note="" _mubu_note=""/>
            </outline>
          </outline>
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

  // FIXME: This assumes at least 1 children. What if there is just a root node?
  // TODO: figure out if ^ is even a valid problem
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
      col.append(node.children.length - 1);
      buildCsvFromNode(node.children[i]);
    }
  } else {
    csvDocument += "\r\n";
    for (let i = 1; i < col; i++) {
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
