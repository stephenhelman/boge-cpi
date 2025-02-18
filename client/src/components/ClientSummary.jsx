import ReportsTable from "./creditReports/ReportsTable";
import AccountSummary from "./accountSummary/AccountSummary";
import { PulseLoader } from "react-spinners";

const ClientSummary = ({ setShowModal, isLoading }) => {
  const renderedPage = isLoading ? (
    <PulseLoader color="#000" />
  ) : (
    <>
      <ReportsTable setShowModal={setShowModal} />
      <AccountSummary />
    </>
  );

  return renderedPage;
};

export default ClientSummary;
