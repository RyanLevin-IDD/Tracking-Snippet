
function doPost(e) { 
  try {
    let data;
    
    if (e.postData.type === "application/json") {
      data = JSON.parse(e.postData.contents);
    } else {
      data = JSON.parse(e.postData.contents);
    }

    // Validate required fields
    if (!data.DomainName) {
      data.DomainName = "localHost";
    }

    // Write data to sheet
    addTrackingData(data);

    // Respond with success
    return ContentService
      .createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader("Access-Control-Allow-Origin", "*");

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.message }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader("Access-Control-Allow-Origin", "*");
  }
}


function addTrackingData(data) { //Handle adding new data to sheet
  //Get or create tab
  const sheet = getOrCreateTab(data.DomainName);
  
  //Write data row
  writeRow(sheet, data);
}

//Helpers
function getOrCreateTab(domainName) { //If tab with name "domain name" not exist create it
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(domainName);
  if (!sheet) {sheet = createNewTab(ss, domainName);}
  return sheet;
}

function createNewTab(ss,domainName) { //Creates new tab "domainName" with headers
  // Create sheet
  const sheet = ss.insertSheet(domainName);
  // Define headers
  const headers = ["Date/Time", "Website", "IP", "SessionId", "Request (URL)"];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  return sheet;
}

function writeRow(sheet, data) { //Write rows to the buttom of the sheet
  const values = [
    [
      data.Time || "",
      data.DomainName || "",
      data.IP || "",
      data.SessionId || "",
      data.Request || ""
    ]
  ];
  // Append row at the bottom
  sheet.getRange(sheet.getLastRow() + 1, 1, 1, values[0].length).setValues(values);
}