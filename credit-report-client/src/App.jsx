import ReportsTable from "./components/creditReports/ReportsTable";
import AccountsTable from "./components/creditAcounts/AccountsTable";
import "./app.css";
import { useState } from "react";
import FileUpload from "./components/form/FileUpload";

function App() {
  const [client, setClient] = useState({});
  const [showModal, setShowModal] = useState(true);
  const [bureau, setBureau] = useState("");
  return (
    <>
      {showModal ? (
        <FileUpload
          setClient={setClient}
          showModal={setShowModal}
          setShowModal={setShowModal}
          setBureau={setBureau}
        />
      ) : null}

      {Object.keys(client).length ? (
        <>
          <ReportsTable
            client={client}
            setClient={setClient}
            setShowModal={setShowModal}
          />
          <AccountsTable
            client={client}
            bureau={bureau}
            setBureau={setBureau}
          />
        </>
      ) : null}
    </>
  );
}

export default App;
