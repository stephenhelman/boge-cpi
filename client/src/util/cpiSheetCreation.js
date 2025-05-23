import {
  buildRequest,
  buildBureauCreditReportObject,
  addName,
} from "./cpiSheetHelpers";

export const createCPIRequests = (client, clientName) => {
  const accounts = client.experian["Open Accounts"];

  const accountsTableRequests = buildRequest(accounts);
  const creditReportData = buildBureauCreditReportObject(client);
  const name = addName(clientName);
  return [...accountsTableRequests, ...creditReportData, ...name];
};
