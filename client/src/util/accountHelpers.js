import {
  rawAccountLoop,
  capitalize,
  formatUtilization,
  formatPaymentHistoryObject,
} from "./universalHelpers";

export const groupRawAccountData = (accountData, rawArray, client, source) => {
  const infoRegex = /\b(info)\b/;
  if (source === "open") {
    const numberOfAccounts = client["Total Accounts"];
    rawAccountLoop(accountData, rawArray, numberOfAccounts);
  }
  if (source === "closed") {
    let count = 0;
    accountData.forEach((element) => {
      infoRegex.test(element) ? count++ : (count += 0);
    });
    const numberOfAccounts = count / 2;
    rawAccountLoop(accountData, rawArray, numberOfAccounts);
  }
  if (source === "collections") {
    let count = 0;

    accountData.forEach((element) => {
      infoRegex.test(element) ? count++ : (count += 0);
    });
    const numberOfAccounts = count / 2;
    if (!numberOfAccounts) {
      return;
    }
    rawAccountLoop(accountData, rawArray, numberOfAccounts);
  }
  if (source === "public") {
    let count = 0;

    accountData.forEach((element) => {
      infoRegex.test(element) ? count++ : (count += 0);
    });
    const numberOfAccounts = count / 2;
    if (!numberOfAccounts) {
      return;
    }
    rawAccountLoop(accountData, rawArray, numberOfAccounts);
  }
};

export const parsePaymentHistory = (account) => {
  const start = account.indexOf("history");
  const end = account.indexOf("Contact", start);
  return {
    index: start,
    data: account.slice(start, end),
  };
};

export const formatPaymentHistory = (paymentHistoryData) => {
  const { data } = paymentHistoryData;
  const yearRegex = /\b[0-9]{4,4}\b/;
  const yearArray = [];
  const yearObject = {};
  const paymentHistoryObject = {
    years: yearArray,
    status: yearObject,
  };
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  //parse years and months from payment history data
  for (let i = 1; i < data.length; i++) {
    if (!yearRegex.test(data[i])) {
      break;
    }
    if (yearRegex.test(data[i])) {
      yearArray.push(data[i]);
    }
  }

  //group payment status per month
  months.forEach((month) => {
    const start = data.indexOf(month) + 1;
    const end = start + yearArray.length;
    yearObject[month] = data.slice(start, end);
  });
  return formatPaymentHistoryObject(paymentHistoryObject);
};

export const parseAccountName = (accountData) => {
  const start = accountData.findIndex((element) => element.includes("name"));
  const end = accountData.indexOf("Account", start);
  const rawAccountName = accountData.slice(start, end);
  return { index: end, data: rawAccountName.join(" ").replace("name", "") };
};

export const parseOpeningDate = (accountData) => {
  const start = accountData.findIndex((element) => element.includes("opened"));
  if (!/[0-9]{1,2},/.test(accountData[start + 1])) {
    return {
      index: start + 1,
      data: "-",
    };
  }
  const end = start + 3;
  const openedDate = accountData
    .slice(start, end)
    .join(" ")
    .replace("opened", "");
  return {
    index: end,
    data: openedDate,
  };
};

export const parseAccountType = (accountData, openIndex) => {
  const start = accountData.indexOf("Account", openIndex);
  const end = accountData.findLastIndex((element) =>
    element.includes("Status")
  );
  const accountType = accountData
    .slice(start + 1, end)
    .join(" ")
    .replace("type", "")
    .split(" ");
  const capitalAccountType = accountType
    .map((element) => capitalize(element))
    .join(" ");
  return { index: end, data: capitalAccountType };
};

export const parseAccountStatus = (accountData, typeIndex) => {
  const start = typeIndex;
  const end = accountData.indexOf("Balance", start) - 1;
  const accountStatus = accountData
    .slice(start, end)
    .join(" ")
    .replace("Status", "")
    .replace(".", "");

  return {
    index: end,
    data: accountStatus,
  };
};

export const parseAccountBalance = (accountData) => {
  const index = accountData.findIndex((element) => element.includes("Balance"));
  const balance = accountData[index].replace("Balance", "");
  return balance;
};

export const parseReportingDate = (accountData) => {
  const start = accountData.findLastIndex((element) =>
    element.includes("updated")
  );

  const updated = accountData[start].replace("updated", "");
  const monthRegex = /[A-z]{1,3}/;
  if (!monthRegex.test(updated)) {
    return "-";
  }

  const reportingDate = accountData[start + 1].replace(",", "");
  return reportingDate;
};

export const parseAccountLimit = (accountData, accountObj) => {
  const type = accountObj["Account Type"];
  //credit/charge cards/revolving
  if (
    type.includes("Card") ||
    type.includes("Revolving") ||
    type.includes("Line")
  ) {
    const index = accountData.findIndex((element) => element.includes("limit"));

    return accountData[index].replace("limit", "");
  } else if (type.includes("Installment")) {
    //unsecured/installments/mortgages
    const index = accountData.findIndex((element) =>
      element.includes("balance")
    );
    const limit = accountData[index].replace("balance", "");

    return limit;
  } else {
    return accountObj["Current Balance"];
  }
};

export const parseResponsibility = (accountData) => {
  const start = accountData.findIndex((element) =>
    element.includes("Responsibility")
  );
  const end = accountData.indexOf("Your");
  const responsibility = accountData
    .slice(start, end)
    .join(" ")
    .replace("Responsibility", "")
    .split(" ");
  const capitalResponsibility = responsibility
    .map((element) => capitalize(element))
    .join(" ");
  return capitalResponsibility;
};

export const calculateUtilization = (accountObj) => {
  const balance = accountObj["Current Balance"];
  const limit = accountObj["Account Limit"];
  const utilization = formatUtilization(balance, limit);
  return `${utilization}%`;
};

export const groupRawInquiryData = (inquiryData, rawArray) => {
  let count = 0;
  inquiryData.forEach((element) => (element === "until" ? count++ : null));
  const data = inquiryData.slice(1);
  let index = 0;
  for (let i = 1; i <= count; i++) {
    const start = index;
    const end = data.indexOf("until", index) + 3;
    rawArray.push(data.slice(start, end));
    index = end;
  }
};

export const formatInquiries = (inquiryData, finalArray) => {
  const poBoxRegex = /P(\.?)O(\.?)/;
  const addressRegex = /\d{1,5}/;

  inquiryData.forEach((inquiry) => {
    const inquiryObj = {
      name: "",
      dateOpen: "",
      type: "",
      dateRemove: "",
    };
    //get the name
    const endOfName = inquiry.indexOf("Inquired", 0);
    const inquiryName = inquiry.slice(0, endOfName).join(" ");
    inquiryObj.name = inquiryName;

    //get the inquiry date
    const startDate = inquiry.indexOf("on", endOfName);
    const endDate = inquiry.indexOf("Business", startDate);
    const inquiryDate = inquiry.slice(startDate + 1, endDate).join(" ");
    inquiryObj.dateOpen = inquiryDate;

    //get the type
    const startType = inquiry.indexOf("Type:", endDate);
    const endType =
      inquiry
        .slice(startType)
        .findIndex(
          (element) => poBoxRegex.test(element) || addressRegex.test(element)
        ) + startType;
    const inquiryType = inquiry.slice(startType, endType).join(" ");
    inquiryObj.type = inquiryType;

    //get the fall off date
    const startRemoval = inquiry.indexOf("until") + 1;
    const removalDate = inquiry.slice(startRemoval).join(" ");
    inquiryObj.dateRemove = removalDate;

    finalArray.push(inquiryObj);
  });
};

export const dollarsToNumbers = (value) => {
  if (!value) {
    return value.toString();
  }
  return Number(value.replace(/\D/, "").split(",").join(""));
};

export const numbersToDollars = (value) => {
  if (!value) {
    return value.toString();
  }

  const valueToReturn = value.toString().split("");
  const length = valueToReturn.length;
  if (length <= 3) {
    valueToReturn.unshift("$");
    return valueToReturn.join("");
  }
  const commaInsert = length - 3;
  valueToReturn.splice(commaInsert, 0, ",");
  valueToReturn.unshift("$");
  return valueToReturn.join("");
};

export const payDown = (account) => {
  const balance = dollarsToNumbers(account["Current Balance"]);
  const limit = dollarsToNumbers(account["Account Limit"]);
  const utilization = Math.round((balance / limit) * 100);
  const type = account["Account Type"];

  if (utilization > 30) {
    if (type.includes("Card") || type.includes("Revolving")) {
      const thirtyPercent = limit * 0.3;
      return balance - thirtyPercent;
    }
  }
  return 0;
};

export const areThereDerogatoryMarks = (profile) => {
  const collections = profile["Collection Accounts"].length;
  const publicRecords = profile["Public Records"].length;
  const derogatoryMarks = collections + publicRecords;
  return derogatoryMarks;
};

export const mostRecentLatePayment = (paymentHistory) => {
  const lateRegex = /\b[0-9]{2,3}\b/;
  const years = Object.keys(paymentHistory);
  let latePayment = "n/a";
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  years.forEach((year) => {
    const index = paymentHistory[year].findLastIndex((element) =>
      lateRegex.test(element)
    );
    if (index > -1) {
      const lateMonth = months[index];
      const lateYear = year;
      latePayment = `${lateMonth} ${lateYear}`;
      return latePayment;
    }
  });
  return latePayment;
};

const loopAccountsForLates = (accounts, array) => {
  if (!accounts.length) {
    return;
  }
  accounts.forEach((account) => {
    if (account["Recent Late"] !== "n/a") {
      array.push(account["Recent Late"]);
    }
  });
};

export const bureauMostRecentLatePayment = (bureau) => {
  const openAccounts = bureau["Open Accounts"];
  const closedAccounts = bureau["Closed Accounts"];
  const collections = bureau["Collection Accounts"];
  const publicRecords = bureau["Public Records"];

  const latePayments = [];
  const categories = [openAccounts, closedAccounts, collections, publicRecords];

  categories.forEach((category) => {
    loopAccountsForLates(category, latePayments);
  });
  return latePayments;
};

export const lateAccountsGrouping = (bureau) => {
  const lateAccounts = [];

  const openAccounts = bureau["Open Accounts"];
  const closedAccounts = bureau["Closed Accounts"];
  const collections = bureau["Collection Accounts"];
  const publicRecords = bureau["Public Records"];

  const categories = [openAccounts, closedAccounts, collections, publicRecords];

  const loopAccountsToGroup = (accounts) => {
    if (!accounts.length) {
      return;
    }
    accounts.forEach((account) => {
      if (account["Recent Late"] !== "n/a") {
        lateAccounts.push(account);
      }
    });
  };

  categories.forEach((category) => {
    loopAccountsToGroup(category);
  });

  return lateAccounts;
};

const countLatePayment = (history, type) => {
  let counter = 0;
  const paymentHistory = Object.values(history);
  paymentHistory.forEach((year) => {
    year.forEach((month) => {
      if (month === type) {
        counter++;
      } else {
        return;
      }
    });
  });
  return counter;
};

export const addLatePaymentsToAccount = (paymentHistory) => {
  const latePaymentObject = {
    thirty: countLatePayment(paymentHistory, "30"),
    sixty: countLatePayment(paymentHistory, "60"),
    ninety: countLatePayment(paymentHistory, "90"),
    oneTwenty: countLatePayment(paymentHistory, "120"),
    oneFifty: countLatePayment(paymentHistory, "150"),
  };

  return latePaymentObject;
};

export const calculatePayDown = (account) => {
  const balance = dollarsToNumbers(account["Current Balance"]);
  const limit = dollarsToNumbers(account["Account Limit"]);
  const utilization = Math.round((balance / limit) * 100);
  const type = account["Account Type"];

  if (utilization > 30) {
    if (type.includes("Card") || type.includes("Revolving")) {
      const thirtyPercent = limit * 0.3;
      return numbersToDollars(balance - thirtyPercent);
    }
  }
  return "0";
};

export const calculateThirtyPercent = (account) => {
  const limit = account["Account Limit"];
  const numbers = dollarsToNumbers(limit);
  const thirtyPercent = Math.round(numbers * 0.3);
  return numbersToDollars(thirtyPercent);
};
