//universal arsing function
const parseRawReportData = (bulkDataArray, source, index, term) => {
  //determine source
  if (source === "Experian") {
    const end = bulkDataArray.indexOf(term, index);
    const dataArray = bulkDataArray.slice(index, end);
    return {
      index: end,
      data: dataArray,
    };
  }
  if (source === "Credit Karma") {
    //TODO - work on parsing this kind of credit report
  }
};

//pull basic client info
const assignClientInfo = (accountSummary, client) => {
  //Credit Score
  const { data } = accountSummary;
  const ficoIndex = data.indexOf("FICO");
  const score = data[ficoIndex + 3]; //check

  //Credit Usage and Limit
  const usedIndex = data.indexOf("used", ficoIndex);
  const limitIndex = data.indexOf("limit", usedIndex);
  const endOfCreditIndex = data.indexOf("Debt", limitIndex);
  const creditUsed = data.slice(usedIndex + 1, limitIndex - 1).join(""); //check
  const creditLimit = data.slice(limitIndex + 1, endOfCreditIndex).join(""); //check

  //utilization %
  const utilization = Math.round(
    (Number(creditUsed) / Number(creditLimit)) * 100 //check
  );

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
  client["Utilization %"] = utilization;
  client["Credit Limit"] = creditLimit;
  client["Total Accounts"] = totalAccounts;
  client["Average Age History"] = averageAge;
  client["Credit Used"] = creditUsed;
};

module.exports = {
  parseRawReportData,
  assignClientInfo,
};
