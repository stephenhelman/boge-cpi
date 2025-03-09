const AccountsHeader = ({ identifier }) => {
  let renderedHeader = (
    <tr>
      <th className="accountsHeader">Company</th>
      <th className="accountsHeader">Lending Product</th>
      <th className="accountsHeader">Due Date</th>
      <th className="accountsHeader">Reporting Date</th>
      <th className="accountsHeader">Current Limit</th>
      <th className="accountsHeader">Total Used In $</th>
      <th className="accountsHeader">Total Used In %</th>
      <th className="accountsHeader">30% In $</th>
      <th className="accountsHeader">Pay Down Amount</th>
      <th className="accountsHeader">Open Date</th>
      <th className="accountsHeader">Payment History Toggle</th>
    </tr>
  );

  if (identifier === "Accounts Ever Late") {
    renderedHeader = (
      <tr>
        <th className="accountsHeader">Company</th>
        <th className="accountsHeader">Lending Product</th>
        <th className="accountsHeader">Late 30</th>
        <th className="accountsHeader">Late 60</th>
        <th className="accountsHeader">Late 90</th>
        <th className="accountsHeader">Late 120</th>
        <th className="accountsHeader">Late 150</th>
        <th className="accountsHeader">Most Recent Late</th>
        <th className="accountsHeader">Status</th>
      </tr>
    );
  }

  return <thead>{renderedHeader}</thead>;
};

export default AccountsHeader;
