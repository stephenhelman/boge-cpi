import { areThereDerogatoryMarks } from "../../util/accountHelpers";
import {
  selectCurrentClient,
  reset,
  selectCurrentSource,
} from "../../clientSlice";
import { useSelector, useDispatch } from "react-redux";
import { analyzeLatePayments, compareLates } from "../../util/universalHelpers";

const ReportsTable = ({ setShowModal }) => {
  const client = useSelector(selectCurrentClient);
  const source = useSelector(selectCurrentSource);
  const dispatch = useDispatch();
  const experian = client?.experian ? client.experian : null;
  const transUnion = client?.transUnion ? client.transUnion : null;
  const equifax = client?.equifax ? client.equifax : null;

  const latePayments = analyzeLatePayments(client);
  const mostRecentLate = compareLates(latePayments)[0];

  const experianHeader = experian ? (
    <td className="reportsHeaderTop">Experian</td>
  ) : null;

  const transUnionHeader = transUnion ? (
    <td className="reportsHeaderTop">TransUnion</td>
  ) : null;

  const equifaxHeader = equifax ? (
    <td className="reportsHeaderTop">Equifax</td>
  ) : null;

  const tableData = (
    <>
      <tr>
        <th className="reportsHeader">Credit Score</th>
        {experian ? (
          <td className="reportsCell">{experian["Credit Score"]}</td>
        ) : null}
        {transUnion ? (
          <td className="reportsCell">{transUnion["Credit Score"]}</td>
        ) : null}
        {equifax ? (
          <td className="reportsCell">{equifax["Credit Score"]}</td>
        ) : null}
      </tr>
      <tr>
        <th className="reportsHeader">Most Recent Late Payment</th>
        <td className="reportsCell latePayment" colSpan="3">
          {mostRecentLate ? mostRecentLate : "No Late Payments"}
        </td>
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
          <td className="reportsCell">{experian["Credit Limit"]}</td>
        ) : null}
        {transUnion ? (
          <td className="reportsCell">{transUnion["Credit Limit"]}</td>
        ) : null}
        {equifax ? (
          <td className="reportsCell">{equifax["Credit Limit"]}</td>
        ) : null}
      </tr>
      <tr>
        <th className="reportsHeader">Derogatory Marks</th>

        {experian ? (
          <td className="reportsCell">{areThereDerogatoryMarks(experian)}</td>
        ) : null}
        {transUnion ? (
          <td className="reportsCell">{areThereDerogatoryMarks(transUnion)}</td>
        ) : null}
        {equifax ? (
          <td className="reportsCell">{areThereDerogatoryMarks(equifax)}</td>
        ) : null}
      </tr>
      <tr>
        <th className="reportsHeader">Total Accounts</th>
        {experian ? (
          <td className="reportsCell">{experian["Total Accounts"]}</td>
        ) : null}
        {transUnion ? (
          <td className="reportsCell">{transUnion["Total Accounts"]}</td>
        ) : null}
        {equifax ? (
          <td className="reportsCell">{equifax["Total Accounts"]}</td>
        ) : null}
      </tr>
      <tr>
        <th className="reportsHeader">Avg Age History</th>
        {experian ? (
          <td className="reportsCell">{experian["Average Age History"]}</td>
        ) : null}
        {transUnion ? (
          <td className="reportsCell">{transUnion["Average Age History"]}</td>
        ) : null}
        {equifax ? (
          <td className="reportsCell">{equifax["Average Age History"]}</td>
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
    dispatch(reset());
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
