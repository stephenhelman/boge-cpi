import { calculateThirtyPercent, calculatePayDown } from "./accountHelpers";

const accountsTable = [
  {
    tableRow: [2053, 2051, 2049, 2047, 2045, 2043, 2041, 2037, 2035],
  },
  {
    tableRow: [2074, 2072, 2070, 2068, 2066, 2064, 2062, 2058, 2056],
  },
  {
    tableRow: [2095, 2093, 2091, 2089, 2087, 2085, 2083, 2079, 2077],
  },
  {
    tableRow: [2116, 2114, 2112, 2110, 2108, 2106, 2104, 2100, 2098],
  },
  {
    tableRow: [2137, 2135, 2133, 2131, 2129, 2127, 2125, 2121, 2119],
  },
  {
    tableRow: [2158, 2156, 2154, 2152, 2150, 2148, 2146, 2142, 2140],
  },
  {
    tableRow: [2179, 2177, 2175, 2173, 2171, 2169, 2167, 2163, 2161],
  },
  {
    tableRow: [2200, 2198, 2196, 2194, 2192, 2190, 2188, 2184, 2182],
  },
  {
    tableRow: [2221, 2219, 2217, 2215, 2213, 2211, 2209, 2205, 2203],
  },
];

const creditReportTable = [
  {
    creditScore: [560, 544, 528],
  },
  {
    utilization: [682, 661, 640],
  },
  {
    creditLimit: [749, 727, 705],
  },
  {
    derogatoryMarks: [810, 790, 770],
  },
  {
    totalAccounts: [865, 847, 829],
  },
  {
    age: [923, 904, 885],
  },
  {
    inquiries: [981, 962, 943],
  },
  {
    threeMonths: [1066, 1038, 1010],
  },
  {
    sixMonths: [1151, 1123, 1095],
  },
];

const nameIndex = 46;

//function to build out table for accounts
//function to build out table for credit report info

//universal text insertion builder
const buildInsertObj = (data, index) => {
  return {
    insertText: {
      location: {
        index: index,
      },
      text: data,
    },
  };
};

//function to add the name
export const addName = (name) => {
  return [buildInsertObj(`: ${name}`, nameIndex)];
};

//function to determine index
const determineIndex = (client) => {
  const bureau = client["Credit Bureau"];
  let index;
  if (bureau === "Experian") {
    index = 2;
  }
  if (bureau === "TransUnion") {
    index = 1;
  }
  if (bureau === "Equifax") {
    index = 0;
  }
  return index;
};

//build object for credit score
const addCreditScore = (client) => {
  const score = client["Credit Score"];
  const index = determineIndex(client);
  return buildInsertObj(score, creditReportTable[0].creditScore[index]);
};

//build object for utilization
const addUtilization = (client) => {
  const utilization = client["Utilization %"];
  const index = determineIndex(client);
  return buildInsertObj(utilization, creditReportTable[1].utilization[index]);
};

//build object for credit limit
const addLimit = (client) => {
  const limit = client["Credit Limit"];
  const index = determineIndex(client);
  return buildInsertObj(limit, creditReportTable[2].creditLimit[index]);
};

//build object for derogatory marks
const addDerogatoryMarks = (client) => {
  const derogatory =
    client["Collection Accounts"].length + client["Public Records"].length;
  const index = determineIndex(client);
  return buildInsertObj(
    derogatory.toString(),
    creditReportTable[3].derogatoryMarks[index]
  );
};

//build object for total accounts
const addTotalAccounts = (client) => {
  const totalAccounts = client["Total Accounts"];
  const index = determineIndex(client);
  return buildInsertObj(
    totalAccounts,
    creditReportTable[4].totalAccounts[index]
  );
};

//build object for credit age
const addCreditAge = (client) => {
  const age = client["Average Age History"];
  const index = determineIndex(client);
  return buildInsertObj(age, creditReportTable[5].age[index]);
};

//build object for inquiries
const addInquiries = (client) => {
  const inquiries = client["Total Inquiries"].toString();
  const index = determineIndex(client);
  return buildInsertObj(inquiries, creditReportTable[6].inquiries[index]);
};

//build object for three month inquiries
const addThreeMonths = (client) => {
  const threeMonths = client["Inquiries 3 mos"].toString();
  const index = determineIndex(client);
  return buildInsertObj(threeMonths, creditReportTable[7].threeMonths[index]);
};

//build object for six month inquiries
const addSixMonths = (client) => {
  const sixMonths = client["Inquiries 6 mos"].toString();
  const index = determineIndex(client);
  return buildInsertObj(sixMonths, creditReportTable[8].sixMonths[index]);
};

export const buildBureauCreditReportObject = (client) => {
  const requests = [];
  const functions = [
    addSixMonths,
    addThreeMonths,
    addInquiries,
    addCreditAge,
    addTotalAccounts,
    addDerogatoryMarks,
    addLimit,
    addUtilization,
    addCreditScore,
  ];
  const experian = client.experian ? client.experian : null;
  const transUnion = client.transUnion ? client.transUnion : null;
  const equifax = client.equifax ? client.equifax : null;

  functions.forEach((func) => {
    if (equifax) requests.push(func(equifax));
    if (transUnion) requests.push(func(transUnion));
    if (experian) requests.push(func(experian));
  });
  return requests;
};

//function to format accounts for insertion
const buildAccountObjectForInsertion = (account) => {
  return {
    name: account["Account Name"],
    type: account["Account Type"],
    reporting: account["Reporting Date"],
    limit: account["Account Limit"],
    balance: account["Current Balance"],
    utilization: account["Account Utilization"],
    thirtyPercent: calculateThirtyPercent(account),
    payDown: calculatePayDown(account),
    openingDate: account["Date Opened"],
  };
};

//function to add a table row to google doc
const addTableRowToDoc = (requestsArray, tableStartIndex, lastRow) => {
  const insertRow = {
    insertTableRow: {
      insertBelow: true,
      tableCellLocation: {
        rowIndex: lastRow,
        tableStartLocation: {
          index: tableStartIndex,
        },
      },
    },
  };
  requestsArray.push(insertRow);
};

//function to add a table row to the indexes
const addTableRow = (tableObject) => {
  const tableRow = {
    tableRow: [],
  };
  const index = tableObject.length - 1;
  tableObject[index].tableRow.forEach((element) => {
    tableRow.tableRow.push(element + 21);
  });
  tableObject.push(tableRow);
};

//function to build out table for credit report info
export const buildRequest = (accounts) => {
  const newAccountsArray = accounts.map((account) => {
    return buildAccountObjectForInsertion(account);
  });
  const requests = [];
  const numAccounts = newAccountsArray.length;
  if (numAccounts > 9) {
    const difference = numAccounts - 9;
    for (let i = difference; i > 0; i--) {
      addTableRowToDoc(requests, 1818, 9);
      addTableRow(accountsTable);
    }
  }

  //build insert request for each part of account
  for (let i = numAccounts - 1; i >= 0; i--) {
    const account = Object.values(newAccountsArray[i]).reverse();
    const indexes = Object.values(accountsTable[i]);

    indexes[0].forEach((element, index) => {
      requests.push(buildInsertObj(account[index], element));
    });
  }
  return requests;
};
