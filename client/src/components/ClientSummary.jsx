import ReportsTable from "./creditReports/ReportsTable";
import AccountSummary from "./accountSummary/AccountSummary";

const ClientSummary = ({ setShowModal }) => {
  const renderedPage = (
    <>
      <ReportsTable setShowModal={setShowModal} />
      <AccountSummary />
    </>
  );

  return renderedPage;
};

export default ClientSummary;
