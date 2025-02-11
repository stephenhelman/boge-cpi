const ReportsTable = ({ client, setClient, setShowModal }) => {
  if (!Object.keys(client).length) {
    return null;
  }
  const experian = client?.experian ? client.experian : null;
  const transUnion = client?.transUnion ? client.transUnion : null;
  const equifax = client?.equifax ? client.equifax : null;

  const experianHeader = experian ? (
    <td className="reportsHeaderTop">Experian</td>
  ) : null;

  const transUnionHeader = transUnion ? (
    <td className="reportsHeaderTop">Transunion</td>
  ) : null;

  const equifaxHeader = equifax ? (
    <td className="reportsHeaderTop">Equifax</td>
  ) : null;

  const tableData = (
    <>
      <tr>
        <th className="reportsHeader">Credit Score</th>
        {experian ? (
          <td className="reportsCell">{experian["Fico Score"]}</td>
        ) : null}
        {transUnion ? (
          <td className="reportsCell">{transUnion["Fico Score"]}</td>
        ) : null}
        {equifax ? (
          <td className="reportsCell">{equifax["Fico Score"]}</td>
        ) : null}
      </tr>
      <tr>
        <th className="reportsHeader">Payment History</th>
        <td className="reportsCell">TODO</td>
      </tr>
      <tr>
        <th className="reportsHeader">Total Utilization</th>
        {experian ? (
          <td className="reportsCell">{experian["Utilization %"]}</td>
        ) : null}
        {transUnion ? (
          <td className="reportsCell">{transUnion["Utilization %"]}</td>
        ) : null}
        {equifax ? (
          <td className="reportsCell">{equifax["Utilization %"]}</td>
        ) : null}
      </tr>
      <tr>
        <th className="reportsHeader">Total Credit Limit</th>
        {experian ? (
          <td className="reportsCell">{experian["Credit limit"]}</td>
        ) : null}
        {transUnion ? (
          <td className="reportsCell">{transUnion["Credit limit"]}</td>
        ) : null}
        {equifax ? (
          <td className="reportsCell">{equifax["Credit limit"]}</td>
        ) : null}
      </tr>
      <tr>
        <th className="reportsHeader">Derogatory Marks</th>
        <td className="reportsCell">TODO</td>
      </tr>
      <tr>
        <th className="reportsHeader">Total Accounts</th>
        {experian ? (
          <td className="reportsCell">{experian["Open accounts"]}</td>
        ) : null}
        {transUnion ? (
          <td className="reportsCell">{transUnion["Open accounts"]}</td>
        ) : null}
        {equifax ? (
          <td className="reportsCell">{equifax["Open accounts"]}</td>
        ) : null}
      </tr>
      <tr>
        <th className="reportsHeader">Avg Age History</th>
        {experian ? (
          <td className="reportsCell">{experian["Average account age"]}</td>
        ) : null}
        {transUnion ? (
          <td className="reportsCell">{transUnion["Average account age"]}</td>
        ) : null}
        {equifax ? (
          <td className="reportsCell">{equifax["Average account age"]}</td>
        ) : null}
      </tr>
      <tr>
        <th className="reportsHeader">Total Inquiries</th>
        {experian ? (
          <td className="reportsCell">{experian["Total Inquiries"]}</td>
        ) : null}
        {transUnion ? (
          <td className="reportsCell">{transUnion["Total Inquiries"]}</td>
        ) : null}
        {equifax ? (
          <td className="reportsCell">{equifax["Total Inquiries"]}</td>
        ) : null}
      </tr>
      <tr>
        <th className="reportsHeader">Inquiries &#40;Last 3 Months&#41;</th>
        {experian ? (
          <td className="reportsCell">{experian["Inquiries 3 mos"]}</td>
        ) : null}
        {transUnion ? (
          <td className="reportsCell">{transUnion["Inquiries 3 mos"]}</td>
        ) : null}
        {equifax ? (
          <td className="reportsCell">{equifax["Inquiries 3 mos"]}</td>
        ) : null}
      </tr>
      <tr>
        <th className="reportsHeader">Inquiries &#40;Last 6 Months&#41;</th>
        {experian ? (
          <td className="reportsCell">{experian["Inquiries 6 mos"]}</td>
        ) : null}
        {transUnion ? (
          <td className="reportsCell">{transUnion["Inquiries 6 mos"]}</td>
        ) : null}
        {equifax ? (
          <td className="reportsCell">{equifax["Inquiries 6 mos"]}</td>
        ) : null}
      </tr>
    </>
  );

  const handleNewReport = () => {
    setClient({});
    setShowModal(true);
  };

  return (
    <div className="reportsContainer">
      <table className="reportsTable">
        <thead>
          <tr>
            <td></td>
            {experianHeader}
            {transUnionHeader}
            {equifaxHeader}
          </tr>
        </thead>
        <tbody>{tableData}</tbody>
      </table>
      <button onClick={handleNewReport} className="newButton">
        New
      </button>
    </div>
  );
};

export default ReportsTable;
