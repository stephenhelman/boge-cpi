import AccountsHeader from "./AccountsHeader";
import Accounts from "./Accounts";
import { useState } from "react";

const AccountsTable = ({ accounts, identifier }) => {
  const [showTable, setShowTable] = useState(false);

  const toggleTable = () => {
    setShowTable((prev) => !prev);
  };

  return (
    <div className="accountsContainer">
      <div className="titleContainer">
        <h2 className="tableTitle">{identifier}</h2>
        <p className="tableButton" onClick={toggleTable}>
          {!showTable ? "Show" : "Hide"}
        </p>
      </div>
      {showTable ? (
        <table className="accountsTable">
          <AccountsHeader />
          <Accounts accounts={accounts} identifier={identifier} />
        </table>
      ) : null}
    </div>
  );
};

export default AccountsTable;
