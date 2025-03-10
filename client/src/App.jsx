import { Routes, Route } from "react-router-dom";
import "./app.css";
import Layout from "./components/Layout";
import Information from "./components/form/Information";
import FileUpload from "./components/form/FileUpload";
import ClientSummary from "./components/ClientSummary";
import Error from "./components/Error";
import { OptionsProvider } from "./components/context/OptionsProvider";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<OptionsProvider />}>
          <Route index element={<Information />} />
          <Route path="upload" element={<FileUpload />} />
        </Route>
        <Route path="summary" element={<ClientSummary />} />
        <Route path="error" element={<Error />} />
      </Route>
    </Routes>
  );
}

export default App;
