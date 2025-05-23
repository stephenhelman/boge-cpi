import { calculatePayDown, calculateThirtyPercent } from "./accountHelpers";
import { buildBureauCreditReportObject } from "./cpiSheetHelpers";

export const doc = [
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

export const buildRequest = (accounts) => {
  const newAccountsArray = accounts.map((account) => {
    return buildAccountObjectForInsertion(account);
  });
  const requests = [];
  const numAccounts = newAccountsArray.length;
  if (numAccounts > 9) {
    const difference = numAccounts - 9;
    for (let i = difference; i > 0; i--) {
      addTableRowToDoc(requests, 1818, doc.length);
      addTableRow(doc);
    }
  }

  //insert rows for each extra account id needed
  //add new rows and indexes to beginning of doc array
  //build insert request for each part of account
  for (let i = doc.length - 1; i >= 0; i--) {
    const account = Object.values(newAccountsArray[i]).reverse();
    const indexes = Object.values(doc[i]);

    indexes[0].forEach((element, index) => {
      requests.push(buildInsertObj(account[index], element));
    });
  }
  return requests;
};
