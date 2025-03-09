import ReportsTable from "./creditReports/ReportsTable";
import AccountSummary from "./accountSummary/AccountSummary";
import { PulseLoader } from "react-spinners";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCurrentSource } from "../clientSlice";
import { determinePDFSource } from "../util/universalHelpers";
import Error from "./Error";

const ClientSummary = ({ setShowModal, isLoading }) => {
  const [isError, setIsError] = useState(false);
  const source = useSelector(selectCurrentSource);

  useEffect(() => {
    const pdfSource = determinePDFSource(source);
    if (pdfSource.includes(false)) {
      setIsError(true);
    }
  }, []);

  const renderedPage = isError ? (
    <Error setShowModal={setShowModal} />
  ) : (
    <>
      <ReportsTable setShowModal={setShowModal} />
      <AccountSummary />
    </>
  );

  return isLoading ? <PulseLoader color="#000" /> : renderedPage;
};

export default ClientSummary;
