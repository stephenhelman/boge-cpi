import { differenceInMonths } from "date-fns";
//capitalize words
export const capitalize = (val) => {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
};

//parse through the report data and return the specified information as a raw array
export const parseRawReportData = (bulkDataArray, index, term) => {
  const end = bulkDataArray.indexOf(term, index);
  const dataArray = bulkDataArray.slice(index, end);
  return {
    index: end,
    data: dataArray,
  };
};

//format the utilization
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

//loop through the raw account array and return a raw account
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

//format payment history
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

//analyze the late payments
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

//compare late payments to determine which is most recent
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

//determine source of PDF download
const pdfSourceParse = (source) => {
  let pdfSource;
  if (!source) return null;
  const creator = source?.Creator;
  if (!creator) {
    const producer = source?.Producer.split(" ");
    if (producer.includes("Quartz")) {
      return pdfSource;
    }
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

//determine if the pdf that was uploaded is formatted correct
export const determinePDFSource = (source) => {
  const experian = source?.experian ? source.experian : null;
  const transUnion = source?.transUnion ? source.transUnion : null;
  const equifax = source?.equifax ? source.equifax : null;

  let experianSource = pdfSourceParse(experian);
  let transUnionSource = pdfSourceParse(transUnion);
  let equifaxSource = pdfSourceParse(equifax);

  const sourceArray = [experianSource, transUnionSource, equifaxSource];

  return sourceArray;
};
