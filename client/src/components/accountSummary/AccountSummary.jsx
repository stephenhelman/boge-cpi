import { useSelector } from "react-redux";
import AccountsTable from "./AccountsTable";
import BureauButtons from "./BureauButtons";
import { selectCurrentBureau, selectCurrentClient } from "../../clientSlice";

const AccountSummary = () => {
  const client = useSelector(selectCurrentClient);
  const bureau = useSelector(selectCurrentBureau);

  const experian = client?.experian ? client.experian : null;
  const transUnion = client?.transUnion ? client.transUnion : null;
  const equifax = client?.equifax ? client.equifax : null;

  let openAccounts;
  let closedAccounts;
  let collections;
  let publicRecords;

  if (bureau === "Experian") {
    openAccounts = client.experian["Open Accounts"];
    closedAccounts = client.experian["Closed Accounts"];
    collections = client.experian["Collection Accounts"];
    publicRecords = client.experian["Public Records"];
  }
  if (bureau === "TransUnion") {
    openAccounts = client.transUnion["Open Accounts"];
    closedAccounts = client.transUnion["Closed Accounts"];
    collections = client.transUnion["Collection Accounts"];
    publicRecords = client.transUnion["Public Records"];
  }
  if (bureau === "Equifax") {
    openAccounts = client.equifax["Open Accounts"];
    closedAccounts = client.equifax["Closed Accounts"];
    collections = client.equifax["Collection Accounts"];
    publicRecords = client.equifax["Public Records"];
  }

  const categories = [
    { identifier: "Open Accounts", data: openAccounts },
    { identifier: "Closed Accounts", data: closedAccounts },
    { identifier: "Collection Accounts", data: collections },
    { identifier: "Public Records", data: publicRecords },
  ];

  const renderedTables = categories.map((category, index) => {
    return (
      <AccountsTable
        accounts={category.data}
        identifier={category.identifier}
        key={index}
      />
    );
  });
  return (
    <div className="accountSummary">
      {renderedTables}
      <BureauButtons
        experian={experian}
        transUnion={transUnion}
        equifax={equifax}
      />
    </div>
  );
};

export default AccountSummary;
