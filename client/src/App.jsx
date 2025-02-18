import ReportsTable from "./components/creditReports/ReportsTable";
import "./app.css";
import { useState } from "react";
import FileUpload from "./components/form/FileUpload";
import AccountSummary from "./components/accountSummary/AccountSummary";
import { PulseLoader } from "react-spinners";

function App() {
  const [showModal, setShowModal] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {showModal ? (
        <FileUpload
          showModal={setShowModal}
          setShowModal={setShowModal}
          setIsLoading={setIsLoading}
        />
      ) : null}
      {!showModal && !isLoading ? (
        <>
          <ReportsTable setShowModal={setShowModal} />
          <AccountSummary />
        </>
      ) : (
        <PulseLoader color={"#000"} />
      )}
    </>
  );
}

export default App;
