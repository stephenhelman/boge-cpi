import { differenceInDays } from "date-fns";
import { formatUtilization } from "./universalHelpers";

export const assignClientInfo = (accountSummary, client) => {
  //Credit Score
  const { data } = accountSummary;
  const ficoIndex = data.indexOf("FICO");
  const score = data[ficoIndex + 3]; //check

  //Credit Usage and Limit
  const usedIndex = data.indexOf("used:", ficoIndex);
  const limitIndex = data.indexOf("limit:", usedIndex);
  const endOfCreditIndex = data.indexOf("Debt", limitIndex);
  const creditUsed = data.slice(usedIndex + 1, limitIndex - 1).join("");
  const creditLimit = data.slice(limitIndex + 1, endOfCreditIndex).join("");

  //utilization %
  const utilization = formatUtilization(creditUsed, creditLimit);

  //Open Accounts
  const totalAccountsIndex = data.indexOf("Open", ficoIndex);
  const totalAccounts = data[totalAccountsIndex + 1].replace("accounts", ""); //check

  //Credit Age
  const startAge = data.indexOf("age", endOfCreditIndex) + 1;
  const endAge = data.indexOf("Oldest", startAge);
  const averageAge = data.slice(startAge, endAge).join(" "); //check
  //Derogatory Marks

  //assign client info
  client["Credit Score"] = score;
  client["Utilization %"] = `${utilization}%`;
  client["Credit Limit"] = creditLimit;
  client["Total Accounts"] = totalAccounts;
  client["Average Age History"] = averageAge;
  client["Credit Used"] = creditUsed;
};

export const parseInquiryNumbers = (finalArray, client) => {
  let threeMonths = 0;
  let sixMonths = 0;
  const today = Date.now();
  finalArray.forEach((inquiry) => {
    const inquiryDate = inquiry.dateOpen;
    if (differenceInDays(today, inquiryDate) <= 90) {
      threeMonths++;
    }
    if (
      differenceInDays(today, inquiryDate) > 90 &&
      differenceInDays(today, inquiryDate) <= 180
    ) {
      sixMonths++;
    }
  });
  client["Total Inquiries"] = finalArray.length;
  client["Inquiries 3 mos"] = threeMonths;
  client["Inquiries 6 mos"] = sixMonths;
  client["Inquiries Info"] = finalArray;
};
