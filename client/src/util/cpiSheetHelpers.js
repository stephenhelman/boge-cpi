import { calculateThirtyPercent, calculatePayDown } from "./accountHelpers";

const accountsTable = [
  {
    tableRow: [2052, 2050, 2048, 2046, 2044, 2042, 2040, 2036, 2034],
  },
  {
    tableRow: [2073, 2071, 2069, 2067, 2065, 2063, 2061, 2057, 2055],
  },
  {
    tableRow: [2094, 2092, 2090, 2088, 2086, 2084, 2082, 2078, 2076],
  },
  {
    tableRow: [2115, 2113, 2111, 2109, 2107, 2105, 2103, 2099, 2097],
  },
  {
    tableRow: [2136, 2134, 2132, 2130, 2128, 2126, 2124, 2120, 2118],
  },
  {
    tableRow: [2157, 2155, 2153, 2151, 2149, 2147, 2145, 2141, 2139],
  },
  {
    tableRow: [2178, 2176, 2174, 2172, 2170, 2168, 2166, 2162, 2160],
  },
  {
    tableRow: [2199, 2197, 2195, 2193, 2191, 2189, 2187, 2183, 2181],
  },
  {
    tableRow: [2220, 2218, 2216, 2214, 2212, 2210, 2208, 2204, 2202],
  },
];

const creditReportTable = [
  {
    creditScore: [559, 543, 527],
  },
  {
    utilization: [681, 660, 639],
  },
  {
    creditLimit: [748, 726, 704],
  },
  {
    derogatoryMarks: [809, 789, 769],
  },
  {
    totalAccounts: [864, 846, 828],
  },
  {
    age: [922, 903, 884],
  },
  {
    inquiries: [980, 961, 942],
  },
  {
    threeMonths: [1065, 1037, 1009],
  },
  {
    sixMonths: [1150, 1122, 1094],
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
