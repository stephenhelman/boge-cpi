import { PulseLoader } from "react-spinners";
import ReportsTable from "./creditReports/ReportsTable";
import AccountSummary from "./accountSummary/AccountSummary";

const ClientSummary = ({ isLoading, setShowModal }) => {
  const renderedPage = isLoading ? (
    <PulseLoader color={"#000"} />
  ) : (
    <>
      <ReportsTable setShowModal={setShowModal} />
      <AccountSummary />
    </>
  );
  return renderedPage;
};

export default ClientSummary;
