import NameCell from "./NameCell";
import TypeCell from "./TypeCell";
import DueDateCell from "./DueDateCell";
import ReportingDateCell from "./ReportingDateCell";
import AccountLimitCell from "./AccountLimitCell";
import AccountBalanceCell from "./AccountBalanceCell";
import AccountUtilizationCell from "./AccountUtilizationCell";
import ThirtyPercentCell from "./ThirtyPercentCell";
import PayDownCell from "./PayDownCell";
import OpeningDateCell from "./OpeningDateCell";
import PaymentHistoryToggle from "./PaymentHistoryToggle";
import HistoryRow from "../paymentHistory/HistoryRow";
import { useState } from "react";

const Account = ({ account }) => {
  const [showHistory, setShowHistory] = useState(false);
  const togglePaymentHistory = () => setShowHistory((prev) => !prev);

  return (
    <>
      <tr>
        <NameCell
          name={account["Account Name"]}
          responsibility={account["Account Responsibility"]}
        />
        <TypeCell type={account["Account Type"]} />
        <DueDateCell />
        <ReportingDateCell reportingDate={account["Reporting Date"]} />
        <AccountLimitCell limit={account["Account Limit"]} />
        <AccountBalanceCell balance={account["Current Balance"]} />
        <AccountUtilizationCell
          balance={account["Current Balance"]}
          limit={account["Account Limit"]}
        />
        <ThirtyPercentCell limit={account["Account Limit"]} />
        <PayDownCell
          type={account["Account Type"]}
          limit={account["Account Limit"]}
          balance={account["Current Balance"]}
        />
        <OpeningDateCell date={account["Date Opened"]} />
        <PaymentHistoryToggle togglePaymentHistory={togglePaymentHistory} />
      </tr>
      {showHistory ? (
        <HistoryRow paymentHistory={account["Payment History"]} />
      ) : null}
    </>
  );
};

export default Account;
