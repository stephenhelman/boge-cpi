import ReportsTable from "./creditReports/ReportsTable";
import AccountSummary from "./accountSummary/AccountSummary";

const ClientSummary = () => {
  const renderedPage = (
    <>
      <ReportsTable />
      <AccountSummary />
    </>
  );

  return renderedPage;
};

export default ClientSummary;
