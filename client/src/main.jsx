import { store } from "./app/store.js";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="1085659038028-ubq6heis0ebujuikii136l1rt6o8a5so.apps.googleusercontent.com">
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
    </Provider>
  </GoogleOAuthProvider>
);
