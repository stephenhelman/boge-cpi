const fs = require("fs");
const PDF = require("pdf-parse");
const fns = require("date-fns");
const { differenceInDays } = fns;

/* let dataBuffer = fs.readFileSync(
  "/Users/stephenhelman/Desktop/Richard Taylor/Edwin Jambo/Stephen - TU.pdf"
); */

const formatData = (data, bureau) => {
  // PDF text
  const text = Array.from(data.text).join("").split(/\W/);
  const newArray = [];
  for (i = 0; i <= text.length; i++) {
    if (text[i] !== "") {
      newArray.push(text[i]);
    }
  }
  //client info
  const client = {
    "Credit Bureau": bureau,
    "Fico Score": "",
    "Open accounts": "",
    "Average account age": "",
    "Credit used": "",
    "Credit limit": "",
    "Utilization %": "",
    "Total Inquiries": "",
    "Inquiries 3 mos": "",
    "Inquiries 6 mos": "",
    "Account Info": [],
    "Inquiries Info": [],
  };

  let count = 0;
  let pointer = 0;
  let originalPointer = 0;

  const accountsRaw = [];
  const accountsFinal = [];
  const inquiriesRaw = [];
  const inquiriesFinal = [];

  for (i = 0; i <= newArray.length; i++) {
    //Getting fico score count = 0
    if (
      newArray[i] === "At" &&
      newArray[i + 1] === "a" &&
      newArray[i + 2] === "glance" &&
      count === 0
    ) {
      const score = newArray[i + 6];
      client["Fico Score"] = score;
      count++;
    }

    //Getting number of accounts count = 1
    if (
      (newArray[i] === "Open" && newArray[i + 2] === "Self") ||
      (newArray[i + 2] === "Accounts" && count === 1)
    ) {
      const accounts = newArray[i + 1].slice(8);
      client["Open accounts"] = accounts;
      count++;
    }

    //Getting utilization $$ count = 2
    if (newArray[i] === "Credit" && newArray[i + 1] === "used" && count === 2) {
      let utilization = "";
      if (/\d/.test(newArray[i + 2]) && /\d/.test(newArray[i + 3])) {
        utilization = `${newArray[i + 2]}${newArray[i + 3]}`;
      } else if (/\d/.test(newArray[i + 2]) && !/\d/.test(newArray[i + 3])) {
        utilization = newArray[i + 2];
      } else {
        return;
      }
      client["Credit used"] = utilization;
      count++;
    }

    //Getting total credit card limits count = 3
    if (
      newArray[i] === "Credit" &&
      newArray[i + 1] === "limit" &&
      count === 3
    ) {
      let limit = "";
      if (/\d/.test(newArray[i + 2]) && /\d/.test(newArray[i + 3])) {
        limit = `${newArray[i + 2]}${newArray[i + 3]}`;
      } else if (/\d/.test(newArray[i + 2]) && !/\d/.test(newArray[i + 3])) {
        limit = newArray[i + 2];
      } else {
        return;
      }
      client["Credit limit"] = limit;
      const utilization = Math.round(
        (Number(client["Credit used"]) / Number(client["Credit limit"])) * 100
      );
      client["Utilization %"] = `${utilization}%`;
      count++;
    }

    //Getting average credit age count = 4
    //TODO - Fix for no months
    if (newArray[i] === "Average" && newArray[i + 2] === "age" && count === 4) {
      //specify years if not available
      let age;

      age = `${newArray[i + 3]} ${newArray[i + 4]} ${newArray[i + 5]} ${
        newArray[i + 6]
      }`;
      if (newArray[i + 6] !== "mos") {
        age = `${newArray[i + 3]} ${newArray[i + 4]}`;
      }
      client["Average account age"] = age;
      count++;
    }
    //Collect account information count = 5
    if (
      newArray[i] === "info" &&
      newArray[i - 1] === "Account" &&
      count === 5
    ) {
      const accountStart = i - 1;
      const accountEnd = newArray.indexOf("statement", accountStart);
      const account = newArray.slice(accountStart, accountEnd);
      accountsRaw.push(account);
      if (accountsRaw.length === Number(client["Open accounts"])) {
        count++;
      }
    }

    //Format account information count = 6
    if (count === 6) {
      accountsRaw.forEach((account) => {
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
        };
        account.forEach((cell, index) => {
          //getting account name
          if (cell.includes("name")) {
            const endOfNameIndex = account.indexOf("Account", index);
            const name = account
              .slice(index, endOfNameIndex)
              .join(" ")
              .replace("name", "");
            accountObj["Account Name"] = name;
          }

          //getting opening date
          if (cell.includes("opened")) {
            const endOfOpenedIndex = account.indexOf("Open", index);
            if (endOfOpenedIndex - index < 3) {
              accountObj["Date Opened"] = "-";
              return;
            }
            const openedDate = account
              .slice(index, endOfOpenedIndex - 1)
              .join(" ")
              .replace("opened", "");
            const openedYear = account[endOfOpenedIndex - 1];
            const fullOpened = `${openedDate}, ${openedYear}`;
            accountObj["Date Opened"] = fullOpened;
          }

          //getting account type
          if (cell.includes("type")) {
            let endOfTypeIndex;
            //EX
            if (bureau === "Experian") {
              endOfTypeIndex = account.indexOf("StatusOpen");
            }
            //TU "Open account" | "Revolving account" | "Installment account"
            if (bureau === "TransUnion") {
              endOfTypeIndex = account.indexOf("account", index);
            }
            //EQ
            if (bureau === "Equifax") {
              endOfTypeIndex = account.indexOf("account", index) - 1;
            }
            const type = account
              .slice(index, endOfTypeIndex)
              .join(" ")
              .replace("type", "");
            accountObj["Account Type"] = type;
          }

          //getting account status
          if (cell.includes("Status") && cell.length > 6) {
            const endOfStatusIndex = account.indexOf("Balance", index);
            const status = account
              .slice(index, endOfStatusIndex)
              .join(" ")
              .replace("Status", "");
            accountObj["Account Status"] = status;
          }
          //getting account balance
          if (
            cell.includes("Balance") &&
            account.indexOf("Balance", index) !== -1
          ) {
            const endOfBalanceIndex = account.indexOf("Balance", index + 1);
            let balance;
            if (endOfBalanceIndex === -1) {
              return;
            }
            if (endOfBalanceIndex - index === 0) {
              balance = account
                .slice(index + 1, endOfBalanceIndex + 1)
                .join("");
            } else {
              balance = account.slice(index + 1, endOfBalanceIndex).join("");
            }
            accountObj["Current Balance"] = balance;
          }
          //getting reporting date
          if (cell.includes("updated") && account[index - 1] !== "Status") {
            let endOfReportingDate;
            let reportingDate;

            //work around for loans
            endOfReportingDate = account.indexOf("Credit", index);
            reportingDate = account
              .slice(index + 1, endOfReportingDate - 1)
              .join();
            if (endOfReportingDate === -1) {
              endOfReportingDate = account.indexOf("Original", index);
              reportingDate = account
                .slice(index + 1, endOfReportingDate - 1)
                .join();
            }
            accountObj["Reporting Date"] = reportingDate;
          }
          //getting credit limit
          //work around loans
          if (
            (cell.includes("Original") && account[index + 1] === "balance") ||
            (cell.includes("Original") && account[index + 1] === "amount")
          ) {
            const endOfLimit = account.indexOf("Paid", index);
            const originalBalance = account
              .slice(index + 2, endOfLimit)
              .join("");

            if (endOfLimit === -1) {
              //monthly payment
              const endOfMonthlyPayment = account.indexOf("Monthly", index);
              const monthlyPayment = account.slice(
                index + 2,
                endOfMonthlyPayment
              );
              accountObj["Account Limit"] = monthlyPayment;
              accountObj["Account Utilization"] = "0";
              return;
            }

            if (originalBalance === "") {
              accountObj["Account Limit"] = "0";
              accountObj["Account Utilization"] = "n/a";
              return;
            }
            accountObj["Account Limit"] = originalBalance;
            //utilization
            const balance = accountObj["Current Balance"];
            const utilization = Math.round((balance / originalBalance) * 100);
            accountObj["Account Utilization"] = utilization;
          }
          //credit/charge card limits
          if (cell.includes("limit") && account[index - 1] === "Credit") {
            const endOfLimit = account.indexOf("Credit", index);
            const creditLimit = account.slice(index + 1, endOfLimit).join("");
            if (creditLimit === "") {
              accountObj["Account Limit"] = "0";
              accountObj["Account Utilization"] = "n/a";
              return;
            }
            accountObj["Account Limit"] = creditLimit;
            const balance = accountObj["Current Balance"];
            const utilization = Math.round((balance / creditLimit) * 100);
            accountObj["Account Utilization"] = utilization;
          }
          //getting AU or no AU
          if (cell.includes("Responsibility")) {
            const au = account[index].replace("Responsibility", "");
            accountObj["Account Responsibility"] = au;
          }
        });
        //push obj to accountsFinal
        accountsFinal.push(accountObj);
      });
      //update client accounts
      client["Account Info"] = accountsFinal;
      count++;
    }

    //inquiries count = 7

    if (newArray[i] === "Inquiries" && count === 7) {
      const scores = newArray.indexOf("scores", i);
      const inquiries = newArray.slice(i, scores);
      //get raw inquiry data
      //get first inquiry
      for (i = 0; i <= inquiries.length; i++) {
        if (!inquiriesRaw.length) {
          const endOfInquiry = inquiries.indexOf("until", 1);
          const inquiry = inquiries.slice(1, endOfInquiry + 3);
          inquiriesRaw.push(inquiry);
          pointer = endOfInquiry + 3;
          originalPointer = pointer;
        }

        if (inquiriesRaw.length > 0) {
          const endOfInquiry = inquiries.indexOf("until", pointer) + 3;
          if (endOfInquiry < originalPointer) {
            break;
          }
          const inquiry = inquiries.slice(pointer, endOfInquiry);
          inquiriesRaw.push(inquiry);
          pointer = endOfInquiry;
        }
      }
      inquiriesRaw.forEach((inquiry) => {
        const inquiryObj = {
          "Bank Name": "",
          "Inquiry Date": "",
          "Removal Date": "",
        };
        //getting the name
        const endOfName = inquiry.indexOf("Inquired");
        const name = inquiry.slice(0, endOfName).join(" "); //check

        //get the inquiry date date
        const day = inquiry.slice(endOfName + 2, endOfName + 4).join(" ");
        const year = inquiry[endOfName + 4];
        const inquiryDate = `${day}, ${year}`; //check

        //get the removal date
        const until = inquiry.indexOf("until") + 1;
        const removalDate = inquiry.slice(until).join(" "); //check
        inquiryObj["Bank Name"] = name;
        inquiryObj["Inquiry Date"] = inquiryDate;
        inquiryObj["Removal Date"] = removalDate;

        inquiriesFinal.push(inquiryObj);
      });
      client["Inquiries Info"] = inquiriesFinal;
      client["Total Inquiries"] = inquiriesFinal.length;
      //get number of inquiries
      let threeMonths = 0;
      let sixMonths = 0;
      const today = Date.now();
      inquiriesFinal.forEach((inquiry) => {
        const inquiryDate = inquiry["Inquiry Date"];
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
      client["Inquiries 3 mos"] = threeMonths;
      client["Inquiries 6 mos"] = sixMonths;
      count++;
    }
  }
  return client;
};

const parsePDFData = async (report, bureau) => {
  const data = await PDF(report);
  const reportData = formatData(data, bureau);
  return reportData;
};

module.exports = parsePDFData;
