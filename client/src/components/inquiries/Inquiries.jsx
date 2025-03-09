import { differenceInDays } from "date-fns";
import Inquiry from "./Inquiry";

const Inquiries = ({ inquiries, identifier }) => {
  let renderedInquiries;

  if (!inquiries.length) {
    return (
      <tbody>
        <tr>
          <td
            colSpan="11"
            className="noPaymentHistory"
          >{`${identifier}: No inquiries present during this timeframe `}</td>
        </tr>
      </tbody>
    );
  }

  const sortedInquires = [...inquiries].sort((a, b) => {
    const today = Date.now();
    const differenceA = differenceInDays(today, a.dateOpen);
    const differenceB = differenceInDays(today, b.dateOpen);

    if (differenceA > differenceB) return 1;
    if (differenceA < differenceB) return -1;
    if (differenceA === differenceB) return 0;
  });

  renderedInquiries = sortedInquires.map((inquiry, index) => {
    return <Inquiry inquiry={inquiry} key={index} />;
  });

  return <tbody>{renderedInquiries}</tbody>;
};

export default Inquiries;
