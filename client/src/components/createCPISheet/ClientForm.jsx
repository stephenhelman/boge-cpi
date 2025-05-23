import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import {
  copyTemplate,
  updateDocument,
  getUserInfo,
} from "../../util/googleUtil";
import { useSelector } from "react-redux";
import { selectCurrentClient } from "../../clientSlice";
import { PulseLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const ClientForm = () => {
  const [selectValue, setSelectValue] = useState("");
  const [loggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("Opening File...");
  const client = useSelector(selectCurrentClient);
  const navigate = useNavigate();

  const onSelectChange = (e) => {
    setSelectValue(e.target.value);
  };

  const onInputChange = (e) => {
    setName(e.target.value);
  };

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setToken(tokenResponse.access_token);
      const userInfo = await getUserInfo(tokenResponse.access_token);
      setIsLoggedIn(true);
      setUser(userInfo.data);
    },
    scope:
      "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.photos.readonly https://www.googleapis.com/auth/documents",
  });

  let statusMessage;
  if (status === "copying") {
    statusMessage = <p className="statusMessage">Copying CPI Template...</p>;
  } else if (status === "transferring") {
    statusMessage = (
      <p className="statusMessage">Transferring Credit Data...</p>
    );
  } else {
    statusMessage = <p className="statusMessage">Opening File...</p>;
  }

  const onFormSubmit = async (e) => {
    e.preventDefault();

    const domain = user.email.split("@")[1];
    const bogeRegex = /bogegroupmedia.com/;
    if (!bogeRegex.test(domain)) {
      return alert("You must be logged into your Boge Group Email to continue");
    }
    setIsLoading(true);
    setStatus("copying");
    const newDoc = await copyTemplate(name, selectValue, token);
    setStatus("transferring");
    await updateDocument(token, newDoc, client, name);

    setStatus("Opening File...");
    setTimeout(() => {
      setIsLoading(false);
      window.open(
        "https://docs.google.com/document/d/" + newDoc + "/edit",
        "_blank"
      );
    }, 500);
  };

  const backToClient = () => navigate("/summary");

  return (
    <div className="saveForm">
      <div className="outputContainer">
        <h2>How to save to Google Docs</h2>
        <p>1. Login to your work Google email</p>
        <p>
          2. Make sure you add&nbsp;
          <a
            href="https://docs.google.com/document/d/18L2TySvr18VywZgKNeUGloPIeaVC58phmND7_KtdTPI/edit?tab=t.0"
            target="_blank"
          >
            this CPI Sheet template
          </a>
        </p>
        <p>3. Add the client&apos;s full name</p>
        <p>4. Add the program the client is in</p>
        <p>5. Click &quot;Create CPI Sheet&quot;</p>
        <p>6. Once open, share permissions with FFA Success</p>
      </div>
      <form className="cpiForm" onSubmit={onFormSubmit}>
        <div>
          <div className="cpiInputContainer">
            <label htmlFor="name">Client Name:</label>
            <input
              type="text"
              onChange={onInputChange}
              value={name}
              placeholder="John Smith"
              required
            />
          </div>
          <div className="cpiInputContainer">
            <label htmlFor="program">Program:</label>
            <select
              name="program"
              id="program"
              value={selectValue}
              onChange={onSelectChange}
              required
            >
              <option value="">Select a program</option>
              <option value="FFA">
                Business Credit Blueprint - Startup Accelerator
              </option>
              <option value="FFA-FO">
                Business Credit Blueprint - Unlimited
              </option>
              <option value="FFA-FO">
                Business Credit Blueprint - One Round
              </option>
              <option value="PCB">Personal Credit Blueprint</option>
            </select>
          </div>
          {!loggedIn && (
            <button className="cpiFormButton" type="button" onClick={login}>
              Login to Google
            </button>
          )}
          {loggedIn && (
            <button className="cpiFormButton" type="submit">
              Create CPI Sheet
            </button>
          )}
          <button
            type="button"
            className="cpiFormButton"
            onClick={backToClient}
          >
            Return to Client
          </button>
        </div>
        {isLoading && (
          <div className="loader">
            {statusMessage}
            <PulseLoader color="#000" />
          </div>
        )}
      </form>
    </div>
  );
};

export default ClientForm;
