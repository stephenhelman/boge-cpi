const AccountsTable = ({ client, bureau, setBureau }) => {
  if (!Object.keys(client).length) {
    return null;
  }
  const payDown = (account) => {
    const balance = Number(account["Current Balance"]);
    const limit = Number(account["Account Limit"]);
    const utilization = Math.round((balance / limit) * 100);

    if (utilization > 30) {
      if (
        account["Account Type"] === "Credit card" ||
        account["Account Type"] === "Charge card" ||
        account["Account Type"] === "Revolving"
      ) {
        const thirtyPercent = limit * 0.3;
        return balance - thirtyPercent;
      }
    }
    return 0;
  };
  const experian = client?.experian ? client.experian : null;
  const transUnion = client?.transUnion ? client.transUnion : null;
  const equifax = client?.equifax ? client.equifax : null;

  const experianRows = experian
    ? experian["Account Info"].map((account, index) => {
        return (
          <tr key={index}>
            <td className="accountsRow">{account["Account Name"]}</td>
            <td className="accountsRow">{account["Account Type"]}</td>
            <td className="accountsRow">TODO</td>
            <td className="accountsRow">{account["Reporting Date"]}</td>
            <td className="accountsRow">${account["Account Limit"]}</td>
            <td className="accountsRow">${account["Current Balance"]}</td>
            <td className="accountsRow">{account["Account Utilization"]}%</td>
            <td className="accountsRow">
              ${Math.round(Number(account["Account Limit"]) * 0.3)}
            </td>
            <td className="accountsRow">{`$${payDown(account)}`}</td>
            <td className="accountsRow">{account["Date Opened"]}</td>
          </tr>
        );
      })
    : null;

  const transUnionRows = transUnion
    ? transUnion["Account Info"].map((account, index) => {
        return (
          <tr key={index}>
            <td className="accountsRow">{account["Account Name"]}</td>
            <td className="accountsRow">{account["Account Type"]}</td>
            <td className="accountsRow">TODO</td>
            <td className="accountsRow">{account["Reporting Date"]}</td>
            <td className="accountsRow">${account["Account Limit"]}</td>
            <td className="accountsRow">${account["Current Balance"]}</td>
            <td className="accountsRow">{account["Account Utilization"]}%</td>
            <td className="accountsRow">
              ${Math.round(Number(account["Account Limit"]) * 0.3)}
            </td>
            <td className="accountsRow">{`$${payDown(account)}`}</td>
            <td className="accountsRow">{account["Date Opened"]}</td>
          </tr>
        );
      })
    : null;

  const equifaxAccountRows = equifax
    ? equifax["Account Info"].map((account, index) => {
        return (
          <tr key={index}>
            <td className="accountsRow">{account["Account Name"]}</td>
            <td className="accountsRow">{account["Account Type"]}</td>
            <td className="accountsRow">TODO</td>
            <td className="accountsRow">{account["Reporting Date"]}</td>
            <td className="accountsRow">${account["Account Limit"]}</td>
            <td className="accountsRow">${account["Current Balance"]}</td>
            <td className="accountsRow">{account["Account Utilization"]}%</td>
            <td className="accountsRow">
              ${Math.round(Number(account["Account Limit"]) * 0.3)}
            </td>
            <td className="accountsRow">{`$${payDown(account)}`}</td>
            <td className="accountsRow">{account["Date Opened"]}</td>
          </tr>
        );
      })
    : null;

  const onExperianClick = () => setBureau("Experian");
  const onTransUnionClick = () => setBureau("TransUnion");
  const onEquifaxClick = () => setBureau("Equifax");

  const activeClass = "active";

  const experianButton = experian ? (
    <button
      className={bureau === "Experian" ? activeClass : null}
      onClick={onExperianClick}
    >
      Experian
    </button>
  ) : null;

  const transUnionButton = transUnion ? (
    <button
      className={bureau === "TransUnion" ? activeClass : null}
      onClick={onTransUnionClick}
    >
      TransUnion
    </button>
  ) : null;

  const equifaxButton = equifax ? (
    <button
      className={bureau === "Equifax" ? activeClass : null}
      onClick={onEquifaxClick}
    >
      Equifax
    </button>
  ) : null;

  let renderedAccounts;
  if (bureau === "Experian") {
    renderedAccounts = experianRows;
  }
  if (bureau === "TransUnion") {
    renderedAccounts = transUnionRows;
  }
  if (bureau === "Equifax") {
    renderedAccounts = equifaxAccountRows;
  }

  return (
    <div className="accountsContainer">
      <table className="accountsTable">
        <thead>
          <tr>
            <th colSpan="10" className="accountsHeaderMain">
              Current Personal Cards
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className="accountsHeader">Company</th>
            <th className="accountsHeader">Lending Product</th>
            <th className="accountsHeader">Due Date</th>
            <th className="accountsHeader">Reporting Date</th>
            <th className="accountsHeader">Current Limit</th>
            <th className="accountsHeader">Total Used In $</th>
            <th className="accountsHeader">Total Used In %</th>
            <th className="accountsHeader">30% of Current Limit In $</th>
            <th className="accountsHeader">Amount to Pay Down</th>
            <th className="accountsHeader">Account Opening</th>
          </tr>
          {renderedAccounts}
        </tbody>
      </table>
      <div className="buttonsContainer">
        {experianButton}
        {transUnionButton}
        {equifaxButton}
      </div>
    </div>
  );
};

export default AccountsTable;
