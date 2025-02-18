import {
  dollarsToNumbers,
  numbersToDollars,
} from "../../../util/accountHelpers";

const PayDownCell = ({ type, balance, limit }) => {
  //if account type does not match, return 0

  const utilization = Math.round(
    (dollarsToNumbers(balance) / dollarsToNumbers(limit)) * 100
  );
  if (utilization > 30) {
    if (
      type === "Credit Card" ||
      type === "Charge Card" ||
      type === "Revolving"
    ) {
      const thirtyPercent = dollarsToNumbers(limit) * 0.3;
      return (
        <td className="accountsRow">
          {numbersToDollars(dollarsToNumbers(balance) - thirtyPercent)}
        </td>
      );
    }
  }
  return <td className="accountsRow">0</td>;
};

export default PayDownCell;
