import "./app.css";
import { useState } from "react";
import FileUpload from "./components/form/FileUpload";
import ClientSummary from "./components/clientSummary";

function App() {
  const [showModal, setShowModal] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {showModal ? (
        <FileUpload
          showModal={showModal}
          setShowModal={setShowModal}
          setIsLoading={setIsLoading}
        />
      ) : null}
      {!showModal ? (
        <ClientSummary setShowModal={setShowModal} isLoading={isLoading} />
      ) : null}
    </>
  );
}

export default App;
