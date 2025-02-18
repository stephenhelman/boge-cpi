import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const PaymentHistoryToggle = ({ togglePaymentHistory }) => {
  return (
    <td className="accountsRow">
      <button className="paymentHistory" onClick={togglePaymentHistory}>
        <FontAwesomeIcon icon={faClock} />
      </button>
    </td>
  );
};

export default PaymentHistoryToggle;
