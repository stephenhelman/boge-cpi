import {
  numbersToDollars,
  dollarsToNumbers,
} from "../../../util/accountHelpers";

const ThirtyPercentCell = ({ limit }) => {
  const numbers = dollarsToNumbers(limit);
  const thirtyPercent = Math.round(numbers * 0.3);
  const dollars = numbersToDollars(thirtyPercent);

  return <td className="accountsRow">{dollars}</td>;
};

export default ThirtyPercentCell;
