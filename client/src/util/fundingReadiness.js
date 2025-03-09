//Ready To Fund Stats
//700+ Credit Score
//No late payments
//no derogatory marks
//2-5 personal guarantee cards(Combined limit of 5-10k, 1 card 1k plus)
//<30% utilization
//< 3 inquiries/bureau in 6 months
//< 3 opened accounts in past 6 months
//personal income 40k+

import { differenceInDays } from "date-fns";
import { dollarsToNumbers } from "./accountHelpers";

//main variable functions
//check credit score function //check
//if over 700 return true else false
//check payment history function //check
//if no late payments return true else false
//check derogatory function //check
//if no derogatory return true else false
//check total card limits function //check
//if total limits higher than 5k return true else false
//check total number of cards function //check
//if number of personal credit cards more than 2 return true else false
//check for card with highest limit function //check
//if highest limit is higher than 5k return true
//check for a single personal card with at least 1k function //check
//if 1 card with at least 1k return true else false
//check credit age function //check
//if age is greater than 1.5 years return true else false
//check card utilization function //check
//if utilization less than 30% return true else false
//check number of inquiries in 6 months function //check
//if inquires in 3 mos and 6 mos = less than 3 return true else false
//check how many accounts opened recently function //check
//if recent accounts less than 3 return true else false

//intermediate functions down the flow chart
//check time of most recent late payment function
//if greater than 6 months return true else false
//check for approval of cards after recent late payment if less than 6 months ago function
//if accounts opened and cards approved return true else false
//check if there are accounts approved within 6 months function
//if approved within 6 months return true else false
//if total number of cards less than 2, but card limit greater than 10k return true

//tips for best results
//check utilization on each personal card function
//if >30% on card, add to array and return array else return empty array

//outcomes
//Ready for Funding
//All variables are true

//Credit Repair
//some scores over 700
// False: score, paymentHistory, timeSinceLate, creditLimits - PCB as well
// False: score, approvedForCardsWithinTime, creditLimits - PCB as well
// False: score, creditLimits - PCB as well
// False: score, approvedForCardsWithinTime, inquires - Age accounts

//all scores below 700
//False: score, paymentHistory, timeSinceLate

const client = {
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
};

//check credit score
const checkCreditScore = (bureau) => {
  const score = Number(bureau["Credit Score"]);
  if (score >= 700) {
    return true;
  } else {
    return false;
  }
};

//check for late payments
const checkLatePayment = (bureau) => {
  const latePayments = bureau["Late Payments"];
  if (!latePayments.length) {
    return true;
  } else {
    return false;
  }
};

//check for derogatory marks
const checkDerogatoryMarks = (bureau) => {
  const collections = bureau["Collection Accounts"];
  const publicRecords = bureau["Public Records"];
  const totalDerogatoryMarks = collections.length + publicRecords.length;

  if (totalDerogatoryMarks <= 0) {
    return true;
  } else {
    return false;
  }
};

//check total limits of all card accounts
const addCardLimits = (bureau) => {
  const openAccounts = bureau["Open Accounts"];
  const cardRegex = /C(h|r)(a|e)(r|d)(g|i)(e|t)\sCard/;
  const cardAccounts = openAccounts.filter((account) => {
    if (cardRegex.test(account["Account Type"])) {
      return account;
    }
  });

  const cardLimits = cardAccounts.map((account) => {
    return dollarsToNumbers(account["Account Limit"]);
  });

  const totalLimits = cardLimits.reduce((a, b) => a + b);

  if (totalLimits >= 5000) {
    return true;
  } else {
    return false;
  }
};

//check for number of personal cards
const checkNumberOfPersonalAccounts = (bureau) => {
  const openAccounts = bureau["Open Accounts"];
  const cardRegex = /C(h|r)(a|e)(r|d)(g|i)(e|t)\sCard/;
  const cardAccounts = openAccounts.filter((account) => {
    if (cardRegex.test(account["Account Type"])) {
      return account;
    }
  });
  const personalCardAccounts = cardAccounts.filter((account) => {
    if (account["Account Responsibility"] === "Individual") {
      return account;
    }
  });

  if (personalCardAccounts.length >= 2) {
    return true;
  } else {
    return false;
  }
};

//check for highest limit on personal cards
const checkForHighestLimitPersonalCard = (bureau) => {
  const openAccounts = bureau["Open Accounts"];
  const cardRegex = /C(h|r)(a|e)(r|d)(g|i)(e|t)\sCard/;
  const cardAccounts = openAccounts.filter((account) => {
    if (cardRegex.test(account["Account Type"])) {
      return account;
    }
  });

  const personalCardAccounts = cardAccounts.filter((account) => {
    if (account["Account Responsibility"] === "Individual") {
      return account;
    }
  });

  const cardLimits = personalCardAccounts.map((account) => {
    return dollarsToNumbers(account["Account Limit"]);
  });

  const sorted = cardLimits.sort((a, b) => {
    if (a > b) {
      return -1;
    }
    if (a < b) {
      return 1;
    }
    return 0;
  });

  if (sorted[0] >= 5000) {
    return true;
  } else {
    return false;
  }
};

//check for a single card to have more than 1k limit
const checkForSingleCardLimit = (bureau) => {
  const openAccounts = bureau["Open Accounts"];
  const cardRegex = /C(h|r)(a|e)(r|d)(g|i)(e|t)\sCard/;
  const cardAccounts = openAccounts.filter((account) => {
    if (cardRegex.test(account["Account Type"])) {
      return account;
    }
  });

  const personalCardAccounts = cardAccounts.filter((account) => {
    if (account["Account Responsibility"] === "Individual") {
      return account;
    }
  });

  const cardLimits = personalCardAccounts.map((account) => {
    return dollarsToNumbers(account["Account Limit"]);
  });
  const isMinLimit = cardLimits.some((limit) => limit >= 1000);

  return isMinLimit;
};

//check for credit age
const checkCreditAge = (bureau) => {
  const age = bureau["Average Age History"].split(" ");
  let years;
  let months;
  if (age.length === 4) {
    years = age[0];
    months = age[2];
  }
  if (age.length === 2) {
    years = age[0];
    months = 0;
  }

  const ageHistory = Number(years) + Number(months) / 12;
  if (ageHistory >= 1.5) {
    return true;
  } else {
    return false;
  }
};

//check account utilization
const checkUtilization = (bureau) => {
  const utilization = bureau["Utilization %"].replace("%", "");

  if (utilization <= 30) {
    return true;
  } else {
    return false;
  }
};

//check total inquiries within 6 months
const checkInquiries = (bureau) => {
  const threeMonths = bureau["Inquiries 3 mos"];
  const sixMonths = bureau["Inquiries 6 mos"];

  const totalSensitiveInquiries = threeMonths + sixMonths;
  if (totalSensitiveInquiries <= 3) {
    return true;
  } else {
    return false;
  }
};

//check accounts opened in 6 months timeframe
const checkAccountsOpened = (bureau) => {
  const openAccounts = bureau["Open Accounts"];
  const closedAccounts = bureau["Closed Accounts"];
  const collections = bureau["Collection Accounts"];
  const publicRecords = bureau["Public Records"];

  const accounts = [openAccounts, closedAccounts, collections, publicRecords];

  const accountsRecentlyOpened = [];

  accounts.forEach((category) => {
    const today = Date.now();
    category.forEach((account) => {
      const difference = differenceInDays(today, account["Date Opened"]);
      if (difference <= 180) {
        accountsRecentlyOpened.push(account);
      } else {
        return;
      }
    });
  });
  if (accountsRecentlyOpened.length <= 3) {
    return true;
  } else {
    return false;
  }
};

export const fundingReadiness = (bureau) => {
  let score = checkCreditScore(bureau);
  let latePayments = checkLatePayment(bureau);
  let derogatoryMarks = checkDerogatoryMarks(bureau);
  let limits = addCardLimits(bureau);
  let utilization = checkUtilization(bureau);
  let personalAccounts = checkNumberOfPersonalAccounts(bureau);
  let highestLimit = checkForHighestLimitPersonalCard(bureau);
  let singleCardLimit = checkForSingleCardLimit(bureau);
  let creditAge = checkCreditAge(bureau);
  let inquiries = checkInquiries(bureau);
  let recentlyOpenedAccounts = checkAccountsOpened(bureau);

  const readyToFund = [
    { score: score },
    { latePayments: latePayments },
    { derogatoryMarks: derogatoryMarks },
    { limits: limits },
    { utilization: utilization },
    { personalAccounts: personalAccounts },
    { highestLimit: highestLimit },
    { singleCardLimit: singleCardLimit },
    { creditAge: creditAge },
    { inquiries: inquiries },
    { recentlyOpenedAccounts: recentlyOpenedAccounts },
  ];
  return readyToFund;
};
