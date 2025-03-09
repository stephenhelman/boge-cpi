import { useSelector } from "react-redux";
import AccountsTable from "./AccountsTable";
import BureauButtons from "./BureauButtons";
import { selectCurrentBureau, selectCurrentClient } from "../../clientSlice";
import InquiriesSummary from "../inquiries/InquiriesSummary";

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
  let lateAccounts;
  let inquiries;

  if (bureau === "Experian") {
    openAccounts = client.experian["Open Accounts"];
    closedAccounts = client.experian["Closed Accounts"];
    collections = client.experian["Collection Accounts"];
    publicRecords = client.experian["Public Records"];
    lateAccounts = client.experian["Late Accounts"];
    inquiries = client.experian["Inquiries Info"];
  }
  if (bureau === "TransUnion") {
    openAccounts = client.transUnion["Open Accounts"];
    closedAccounts = client.transUnion["Closed Accounts"];
    collections = client.transUnion["Collection Accounts"];
    publicRecords = client.transUnion["Public Records"];
    lateAccounts = client.transUnion["Late Accounts"];
    inquiries = client.transUnion["Inquiries Info"];
  }
  if (bureau === "Equifax") {
    openAccounts = client.equifax["Open Accounts"];
    closedAccounts = client.equifax["Closed Accounts"];
    collections = client.equifax["Collection Accounts"];
    publicRecords = client.equifax["Public Records"];
    lateAccounts = client.equifax["Late Accounts"];
    inquiries = client.equifax["Inquiries Info"];
  }

  const categories = [
    { identifier: "Open Accounts", data: openAccounts },
    { identifier: "Closed Accounts", data: closedAccounts },
    { identifier: "Collection Accounts", data: collections },
    { identifier: "Public Records", data: publicRecords },
    { identifier: "Accounts Ever Late", data: lateAccounts },
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
      <InquiriesSummary inquiries={inquiries} />
      <BureauButtons
        experian={experian}
        transUnion={transUnion}
        equifax={equifax}
      />
    </div>
  );
};

export default AccountSummary;
