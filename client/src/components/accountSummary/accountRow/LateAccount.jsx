import { useState } from "react";
import NameCell from "./NameCell";
import TypeCell from "./TypeCell";

const LateAccount = ({ account }) => {
  const [showStatus, setShowStatus] = useState(false);
  const latePayments = account["Times Late"];
  const { thirty, sixty, ninety, oneTwenty, oneFifty } = latePayments;

  const handleShowStatus = () => {
    setShowStatus((prev) => !prev);
  };

  return (
    <>
      <tr>
        <NameCell
          name={account["Account Name"]}
          responsibility={account["Account Responsibility"]}
        />
        <TypeCell type={account["Account Type"]} />
        <td className="accountsRow">{thirty}</td>
        <td className="accountsRow">{sixty}</td>
        <td className="accountsRow">{ninety}</td>
        <td className="accountsRow">{oneTwenty}</td>
        <td className="accountsRow">{oneFifty}</td>
        <td className="accountsRow">{account["Recent Late"]}</td>
        <td className="accountsRow">
          <p className="tableButton" onClick={handleShowStatus}>
            {!showStatus ? "Show " : "Hide"}
          </p>
        </td>
      </tr>
      {showStatus ? (
        <tr>
          <td colSpan="9" className="latePaymentStatus">
            {account["Account Status"]}
          </td>
        </tr>
      ) : null}
    </>
  );
};

export default LateAccount;
