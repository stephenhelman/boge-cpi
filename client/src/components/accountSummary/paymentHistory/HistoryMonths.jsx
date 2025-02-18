import React from "react";

const HistoryMonths = ({ months }) => {
  const monthsDisplay = months.map((month, index) => {
    return (
      <span className="gridCell" key={index}>
        {month}
      </span>
    );
  });
  return (
    <div className="paymentHistoryMonths">
      <span></span>
      {monthsDisplay}
    </div>
  );
};

export default HistoryMonths;
