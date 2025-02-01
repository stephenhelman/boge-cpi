const fs = require("fs");
const pdf = require("pdf-parse");

const { parseAccountSummary } = require("./helpers");

let dataBuffer = fs.readFileSync(
  "/Users/stephenhelman/Desktop/Richard Taylor/Edwin Jambo/Stephen.pdf"
);

const client = {
  "Credit Bureau": "Experian",
  "Credit Score": "",
  "Payment History": "",
  "Utilization %": "",
  "Credit Limit": "",
  "Derogatory Marks": "",
  "Total Accounts": "",
  "Average Age History": "",
  "Total Inquiries": "",
  "Inquiries 3 mos": "",
  "Inquiries 6 mos": "",
  "Credit used": "",
  "Account info": [],
  "Inquiries Info": [],
};

//parse pdf data
pdf(dataBuffer).then(function (data) {
  // PDF text
  const text = Array.from(data.text).join("").split(/\W/);
  const formattedText = [];
  text.forEach((index) => {
    if (index !== "") {
      formattedText.push(index);
    }
  });

  //raw data arrays - not formatted - array of all string data from corresponding section
  const accountSummary = parseAccountSummary(formattedText, "Experian");
  const openAccounts = [];
  const closedAccounts = [];
  const collections = [];
  const publicRecords = [];
  const inquiries = [];

  //raw data arrays - each account/inquiry information grouped - nested array
  const openAccountsRaw = [];
  const closedAccountsRaw = [];
  const collectionsRaw = [];
  const publicRecordsRaw = [];
  const inquiriesRaw = [];

  //formatted data - final array to be appended to client object
  const openAccountsFinal = [];
  const closedAccountsFinal = [];
  const collectionsFinal = [];
  const publicRecordsFinal = [];
  const inquiriesFinal = [];

  //pointers
  let count = 0;
  let pointer = 0;
  let pointerTwo = 0;
  let pointerThree = 0;

  //parse account summary data - count = 0
  //parse open accounts data - count = 1
  //parse closed accounts data - count = 2
  //parse collections data - count = 3
  //parse public records data - count = 4
  //parse inquires data - count = 5

  //update client info from account summary data - count = 6

  //parse open accounts and build raw array
  //parse closed accounts and build raw array
  //parse collections and build raw array
  //parse public records and parse raw array
  //parse inquiries and parse raw array

  //format and append open accounts
  //format and append closed accounts
  //format and append collections
  //format and append public records
  //format and append inquiries

  //send client data
});
