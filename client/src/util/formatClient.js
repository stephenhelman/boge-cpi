import { parseRawReportData } from "./universalHelpers";
import { assignClientInfo, parseInquiryNumbers } from "./clientHelpers";
import {
  groupRawAccountData,
  groupRawInquiryData,
  formatInquiries,
  bureauMostRecentLatePayment,
  lateAccountsGrouping,
} from "./accountHelpers";
import { formatRawAccountData } from "./formatAccounts";
import { fundingReadiness } from "./fundingReadiness";

export const formatData = (data, bureau) => {
  //establish client
  const client = {
    "Credit Bureau": bureau,
    "Credit Score": "",
    "Late Payments": "n/a",
    "Utilization %": "",
    "Credit Limit": "",
    "Total Accounts": "",
    "Average Age History": "",
    "Total Inquiries": "",
    "Inquiries 3 mos": "",
    "Inquiries 6 mos": "",
    "Credit Used": "",
    "Open Accounts": [],
    "Closed Accounts": [],
    "Collection Accounts": [],
    "Public Records": [],
    "Inquiries Info": [],
    "Late Accounts": [],
  };

  // PDF text
  const parsedReport = Array.from(data.text)
    .join("")
    .split("\n")
    .join(" ")
    .split(" ");

  //raw data arrays - not formatted - array of all string data from corresponding section
  const accountSummary = parseRawReportData(parsedReport, 0, "information");

  const personalInfo = parseRawReportData(
    parsedReport,
    accountSummary.index,
    "Open"
  );

  const openAccounts = parseRawReportData(
    parsedReport,
    personalInfo.index,
    "Closed"
  );

  const closedAccounts = parseRawReportData(
    parsedReport,
    openAccounts.index,
    "Collection"
  );

  const collections = parseRawReportData(
    parsedReport,
    closedAccounts.index,
    "Public"
  );

  const publicRecords = parseRawReportData(
    parsedReport,
    collections.index,
    "Inquiries"
  );
  const inquiries = parseRawReportData(
    parsedReport,
    publicRecords.index,
    "FICO"
  );

  assignClientInfo(accountSummary, client);

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

  //raw open accounts
  groupRawAccountData(openAccounts.data, openAccountsRaw, client, "open");

  //raw closed accounts
  groupRawAccountData(closedAccounts.data, closedAccountsRaw, client, "closed");

  //raw collection accounts
  groupRawAccountData(collections.data, collectionsRaw, client, "collections");

  //raw public records
  groupRawAccountData(publicRecords.data, publicRecordsRaw, client, "public");

  //raw inquiries
  groupRawInquiryData(inquiries.data, inquiriesRaw);

  //final open account data
  formatRawAccountData(
    openAccountsRaw,
    openAccountsFinal,
    client,
    "Open Accounts"
  );

  //final closed account data
  formatRawAccountData(
    closedAccountsRaw,
    closedAccountsFinal,
    client,
    "Closed Accounts"
  );

  //final collections data
  formatRawAccountData(
    collectionsRaw,
    collectionsFinal,
    client,
    "Collection Accounts"
  );

  //final public records data
  formatRawAccountData(
    publicRecordsRaw,
    publicRecordsFinal,
    client,
    "Public Records"
  );

  //most recent late payment
  const latePayments = bureauMostRecentLatePayment(client);
  client["Late Payments"] = latePayments;

  //late accounts
  const lateAccounts = lateAccountsGrouping(client);
  client["Late Accounts"] = lateAccounts;

  //final inquiries data
  formatInquiries(inquiriesRaw, inquiriesFinal);

  //add inquiries to client
  parseInquiryNumbers(inquiriesFinal, client);

  /* console.log(client); */

  /* fundingReadiness(client); */

  return client;
};
