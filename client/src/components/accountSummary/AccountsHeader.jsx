const AccountsHeader = () => {
  return (
    <thead>
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
    </thead>
  );
};

export default AccountsHeader;
