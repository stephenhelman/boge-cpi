export const capitalize = (val) => {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
};

export const parseRawReportData = (bulkDataArray, index, term) => {
  const end = bulkDataArray.indexOf(term, index);
  const dataArray = bulkDataArray.slice(index, end);
  return {
    index: end,
    data: dataArray,
  };
};

export const formatUtilization = (balance, limit) => {
  if (limit === "-") {
    return 0;
  }
  if (!limit || !balance) {
    return 0;
  }
  return Math.round(
    (Number(balance.replace(/\D/, "").split(",").join("")) /
      Number(limit.replace(/\D/, "").split(",").join(""))) *
      100
  );
};

export const rawAccountLoop = (accountData, rawArray, numberOfAccounts) => {
  let index = 0;
  for (let i = 1; i <= numberOfAccounts; i++) {
    const start = accountData.indexOf("info", index);
    const end = accountData.indexOf("info", start + 1);
    if (end < start) {
      const account = accountData.slice(start);
      rawArray.push(account);
      return;
    }
    const account = accountData.slice(start, end);
    rawArray.push(account);
    index = end + 1;
  }
};

export const formatPaymentHistoryObject = (paymentHistoryObj) => {
  const { years, status } = paymentHistoryObj;
  const formattedPaymentHistory = {};
  for (let i = 0; i < years.length; i++) {
    const paymentArray = [];
    const totalPayments = Object.values(status);
    totalPayments.forEach((month) => {
      paymentArray.push(month[i]);
    });
    formattedPaymentHistory[years[i]] = paymentArray;
  }
  return formattedPaymentHistory;
};
