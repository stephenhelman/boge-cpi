import { useState } from "react";
import InquiriesHeader from "./InquiriesHeader";
import Inquiries from "./Inquiries";

const InquiriesTable = ({ inquiries, identifier }) => {
  const [showTable, setShowTable] = useState(false);
  const toggleTable = () => {
    setShowTable((prev) => !prev);
  };

  return (
    <div className="inquiryContainer">
      <div className="titleContainer">
        <h3 className="tableTitle">{identifier}</h3>
        <p className="tableButton" onClick={toggleTable}>
          {!showTable ? "Show" : "Hide"}
        </p>
      </div>
      {showTable ? (
        <table className="accountsTable">
          <InquiriesHeader />
          <Inquiries inquiries={inquiries} identifier={identifier} />
        </table>
      ) : null}
    </div>
  );
};

export default InquiriesTable;
