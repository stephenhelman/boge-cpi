import { useState } from "react";
import InquiriesTable from "./InquiriesTable";

const InquiriesSummary = ({ inquiries }) => {
  const [showTable, setShowTable] = useState(false);
  const ninety = inquiries?.ninety;
  const oneEighty = inquiries?.oneEighty;
  const other = inquiries?.other;

  const toggleTable = () => {
    setShowTable((prev) => !prev);
  };
  const categories = [
    { identifier: "90 Days (3 Months)", data: ninety },
    { identifier: "180 Days (6 Months)", data: oneEighty },
    { identifier: "Other (6 Months+)", data: other },
  ];

  const renderedTables = categories.map((category, index) => {
    return (
      <InquiriesTable
        inquiries={category.data}
        identifier={category.identifier}
        key={index}
      />
    );
  });

  return (
    <div className="inquiriesContainer">
      <div className="titleContainer">
        <h2 className="tableTitle">Inquiries</h2>
        <p className="tableButton" onClick={toggleTable}>
          {!showTable ? "Show" : "Hide"}
        </p>
      </div>
      {showTable ? renderedTables : null}
    </div>
  );
};

export default InquiriesSummary;
