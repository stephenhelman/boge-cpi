import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HistoryYear = ({ year }) => {
  const numRegex = /[0-9]{2,3}/;
  const payments = year[1].map((payment, index) => {
    if (payment === "") {
      return (
        <span key={index} className="gridCell clear">
          <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
        </span>
      );
    }

    if (payment === "CO" || payment === "ND" || numRegex.test(payment)) {
      return (
        <span className="gridCell derogatory" key={index}>
          {payment}
        </span>
      );
    }

    return (
      <span key={index} className="gridCell">
        {payment}
      </span>
    );
  });
  return (
    <div className="paymentHistoryYears">
      <span className="gridCell">{year[0]}</span>
      {payments}
    </div>
  );
};

export default HistoryYear;
