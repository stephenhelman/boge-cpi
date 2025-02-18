import { formatPaymentHistoryObject } from "../../../util/universalHelpers";
import HistoryMonths from "./HistoryMonths";
import HistoryYear from "./HistoryYear";

const HistoryRow = ({ paymentHistory }) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const years = Object.entries(paymentHistory)
    .reverse()
    .map((year, index) => {
      return <HistoryYear year={year} key={index} months={months} />;
    });

  return (
    <tr>
      <td colSpan="11" className="paymentHistoryDisplay">
        {years.length ? (
          <div className="paymentHistoryGrid">
            <HistoryMonths months={months} />
            {years}
          </div>
        ) : (
          <div className="noPaymentHistory">No Payment History Available</div>
        )}
      </td>
    </tr>
  );
};

export default HistoryRow;
