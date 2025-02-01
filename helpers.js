//parse account summary data
const parseAccountSummary = (bulkDataArray, source) => {
  for (i = 0; i <= bulkDataArray.length; i++) {
    //determine source
    if ((source = "Experian")) {
      if (
        bulkDataArray[i] === "At" &&
        bulkDataArray[i + 1] === "a" &&
        bulkDataArray[i + 2] === "glance"
      ) {
        //"At a glance"
        const endOfAccountSummary = bulkDataArray.indexOf("Personal", i);
        const accountSummary = bulkDataArray.slice(i, endOfAccountSummary);
        return accountSummary;
      }
    }

    if ((source = "Credit Karma")) {
      //TODO - work on parsing this kind of credit report
    }
  }
};

module.exports = { parseAccountSummary };
