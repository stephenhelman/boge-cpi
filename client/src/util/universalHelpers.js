import { differenceInMonths } from "date-fns";

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

export const analyzeLatePayments = (client) => {
  const experianLates = client?.experian
    ? client.experian["Late Payments"]
    : null;
  const transUnionLates = client?.transUnion
    ? client.transUnion["Late Payments"]
    : null;
  const equifaxLates = client?.equifax ? client.equifax["Late Payments"] : null;

  const experian = experianLates ? compareLates(experianLates)[0] : null;
  const transUnion = transUnionLates ? compareLates(transUnionLates)[0] : null;
  const equifax = equifaxLates ? compareLates(equifaxLates)[[0]] : null;
  const lateArray = [];
  if (experian) {
    lateArray.push(experian);
  }
  if (transUnion) {
    lateArray.push(transUnion);
  }
  if (equifax) {
    lateArray.push(equifax);
  }
  return lateArray;
};

export const compareLates = (lateArray) => {
  const today = Date.now();

  return [...lateArray].sort((a, b) => {
    const differenceA = differenceInMonths(today, a);
    const differenceB = differenceInMonths(today, b);

    if (differenceA > differenceB) {
      return 1;
    }
    if (differenceA < differenceB) {
      return -1;
    }
  });
};

const pdfSourceParse = (source) => {
  let pdfSource;
  if (!source) return null;
  const creator = source?.Creator;
  if (!creator) {
    pdfSource = false;
    return pdfSource;
  }
  const splitSource = creator.split(" ");
  splitSource.forEach((element) => {
    if (element.includes("Helper")) {
      pdfSource = false;
      return pdfSource;
    }
  });
  return pdfSource;
};

export const determinePDFSource = (source) => {
  const experian = source?.experian ? source.experian : null;
  const transUnion = source?.transUnion ? source.transUnion : null;
  const equifax = source?.equifax ? source.equifax : null;

  let experianSource = pdfSourceParse(experian);
  let transUnionSource = pdfSourceParse(transUnion);
  let equifaxSource = pdfSourceParse(equifax);

  const sourceArray = [experianSource, transUnionSource, equifaxSource];
  console.log(sourceArray);

  return sourceArray;
};
