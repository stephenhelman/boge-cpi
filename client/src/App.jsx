import { Routes, Route } from "react-router-dom";
import "./app.css";
import Layout from "./components/Layout";
//import Welcome from "./components/Static/Welcome";
//import Register from "./components/Static/Register";
//import RequireAuth from "./components/Static/RequireAuth";
import Information from "./components/form/Information";
import FileUpload from "./components/form/FileUpload";
import ClientSummary from "./components/ClientSummary";
import Error from "./components/Error";
import { OptionsProvider } from "./components/context/OptionsProvider";
import ClientForm from "./components/createCPISheet/ClientForm";
//import Login from "./components/Static/Login";
//import Dashboard from "./components/Static/Dashboard";

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
        <Route path="save" element={<ClientForm />} />
      </Route>
    </Routes>
  );

  /* <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route element={<RequireAuth />}>
        <Route path="home" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="clients">
            <Route index element={<ClientList />} />
            <Route path="new">
              <Route element={<OptionsProvider />}>
                <Route index element={<Information />} />
                <Route path="upload" element={<FileUpload />} />
              </Route>
            </Route>
          </Route>

          <Route path="summary" element={<ClientSummary />} />
          <Route path="save" element={<ClientForm />} />
          <Route path="error" element={<Error />} />
        </Route>
      </Route>
    </Routes> */
}

export default App;
