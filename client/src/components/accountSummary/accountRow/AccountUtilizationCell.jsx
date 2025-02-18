import { formatUtilization } from "../../../util/universalHelpers";

const AccountUtilizationCell = ({ balance, limit }) => {
  const utilization = formatUtilization(balance, limit);
  return <td className="accountsRow">{utilization}%</td>;
};

export default AccountUtilizationCell;
