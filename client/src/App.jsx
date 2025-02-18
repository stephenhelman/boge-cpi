import ReportsTable from "./components/creditReports/ReportsTable";
import "./app.css";
import { useState } from "react";
import FileUpload from "./components/form/FileUpload";
import AccountSummary from "./components/accountSummary/AccountSummary";

function App() {
  const [showModal, setShowModal] = useState(true);

  return (
    <>
      {showModal ? (
        <FileUpload showModal={setShowModal} setShowModal={setShowModal} />
      ) : null}
      {!showModal ? (
        <>
          <ReportsTable setShowModal={setShowModal} />
          <AccountSummary />
        </>
      ) : null}
    </>
  );
}

export default App;
