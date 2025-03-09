import { differenceInDays } from "date-fns";

const Inquiry = ({ inquiry }) => {
  const { name, type, dateOpen, dateRemove } = inquiry;
  const formatType = type.replace("Type:", "");
  const today = Date.now();
  return (
    <tr>
      <td className="accountsRow">{name}</td>
      <td className="accountsRow">{formatType}</td>
      <td className="accountsRow">{dateOpen}</td>
      <td className="accountsRow">{dateRemove}</td>
      <td className="accountsRow">{differenceInDays(today, dateOpen)}</td>
    </tr>
  );
};

export default Inquiry;
