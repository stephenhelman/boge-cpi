import {
  parsePaymentHistory,
  formatPaymentHistory,
  parseAccountName,
  parseOpeningDate,
  parseAccountType,
  parseAccountStatus,
  parseAccountBalance,
  parseReportingDate,
  parseAccountLimit,
  parseResponsibility,
  calculateUtilization,
  mostRecentLatePayment,
} from "./accountHelpers";

export const formatRawAccountData = (
  rawAccountData,
  formattedAccountArray,
  client,
  source
) => {
  if (!rawAccountData.length) {
    return;
  }
  rawAccountData.forEach((account) => {
    const accountObj = {
      "Account Name": "",
      "Account Type": "",
      "Account Status": "",
      "Reporting Date": "",
      "Date Opened": "",
      "Current Balance": "",
      "Account Limit": "",
      "Account Utilization": "",
      "Account Responsibility": "",
      "Payment History": "",
      "Recent Late": "",
    };

    //Payment History
    const paymentHistoryRaw = parsePaymentHistory(account);
    const paymentHistoryFinal = formatPaymentHistory(paymentHistoryRaw);
    accountObj["Payment History"] = paymentHistoryFinal;

    //Late Payment
    const latePayment = mostRecentLatePayment(paymentHistoryFinal);
    accountObj["Recent Late"] = latePayment;

    const { index } = paymentHistoryRaw;
    const accountData = account.slice(0, index);

    //Account Name
    const accountName = parseAccountName(accountData);
    accountObj["Account Name"] = accountName.data;

    //Date Opened
    const openingDate = parseOpeningDate(accountData);
    accountObj["Date Opened"] = openingDate.data;

    //Account Type
    const accountType = parseAccountType(accountData, openingDate.index);
    accountObj["Account Type"] = accountType.data;

    //Account Status
    const accountStatus = parseAccountStatus(accountData, accountType.index);
    accountObj["Account Status"] = accountStatus.data;

    //Account Balance
    const accountBalance = parseAccountBalance(accountData);
    accountObj["Current Balance"] = accountBalance;

    //Reporting Date
    const reportingDate = parseReportingDate(accountData);
    accountObj["Reporting Date"] = reportingDate;

    //Credit Limit / Original Balance
    const accountLimit = parseAccountLimit(accountData, accountObj);
    accountObj["Account Limit"] = accountLimit;

    //Account Responsibility
    const responsibility = parseResponsibility(accountData);
    accountObj["Account Responsibility"] = responsibility;

    //Utilization
    const utilization = calculateUtilization(accountObj);
    accountObj["Account Utilization"] = utilization;

    if (source !== "Open Accounts") {
      accountObj["Reporting Date"] = "-";
    }

    formattedAccountArray.push(accountObj);
  });

  client[source] = formattedAccountArray;
};
