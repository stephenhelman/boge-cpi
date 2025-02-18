import axios from "axios";
import { useState } from "react";
import Information from "./Information";
import { formatData } from "../../util/formatClient";
import { useDispatch } from "react-redux";
import { setLogistics, setClient, reset } from "../../clientSlice";

const FileUpload = ({ showModal, setShowModal, setIsLoading }) => {
  const [showForm, setShowForm] = useState(false);
  const [showExperian, setShowExperian] = useState(false);
  const [showTransUnion, setShowTransUnion] = useState(false);
  const [showEquifax, setShowEquifax] = useState(false);
  const [experian, setExperian] = useState([]);
  const [transUnion, setTransUnion] = useState([]);
  const [equifax, setEquifax] = useState([]);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      (showExperian && !experian.name) ||
      (showTransUnion && !transUnion.name) ||
      (showEquifax && !equifax.name) ||
      (!experian.name && !transUnion.name && !equifax.name)
    ) {
      alert("Please upload a credit report to continue");
      return;
    }

    const formData = new FormData();

    const config = { headers: { "Content-Type": "multipart/form-data" } };
    //dev url
    /* let postUrl = "http://localhost:3500"; */

    //production url
    let postUrl = "https://boge-cpi.onrender.com/api";

    //determine which options are selected
    if (experian.name && !transUnion.name && !equifax.name) {
      formData.append("Experian", experian);
      postUrl += "/experian";
    }
    if (transUnion.name && !experian.name && !equifax.name) {
      formData.append("TransUnion", transUnion);
      postUrl += "/transunion";
    }
    if (equifax.name && !experian.name && !transUnion.name) {
      formData.append("Equifax", equifax);
      postUrl += "/equifax";
    }
    if (experian.name && transUnion.name && !equifax.name) {
      formData.append("Experian", experian);
      formData.append("TransUnion", transUnion);
      postUrl += "/multi";
    }
    if (experian.name && equifax.name && !transUnion.name) {
      formData.append("Experian", experian);
      formData.append("Equifax", equifax);
      postUrl += "/multi";
    }
    if (transUnion.name && equifax.name && !experian.name) {
      formData.append("TransUnion", transUnion);
      formData.append("Equifax", equifax);
      postUrl += "/multi";
    }
    if (experian.name && transUnion.name && equifax.name) {
      formData.append("Experian", experian);
      formData.append("TransUnion", transUnion);
      formData.append("Equifax", equifax);
    }
    setIsLoading(true);
    setShowModal(false);
    setShowForm(false);

    const results = await axios.post(postUrl, formData, config);
    const { data } = results.data;
    const client = {};
    if (data.experian) {
      const { experian } = data;
      client.experian = formatData(experian, "Experian");
    }
    if (data.transUnion) {
      const { transUnion } = data;
      client.transUnion = formatData(transUnion, "TransUnion");
    }
    if (data.equifax) {
      const { equifax } = data;
      client.equifax = formatData(equifax, "Equifax");
    }
    const bureau = Object.keys(client)[0];

    dispatch(
      setLogistics({
        client: client,
        bureau: client[bureau]["Credit Bureau"],
      })
    );

    setIsLoading(false);
  };

  const handleExperianUpload = (e) => {
    dispatch(setClient(null));
    setExperian(e.target.files[0]);
  };

  const handleTransUnionUpload = (e) => {
    dispatch(setClient(null));
    setTransUnion(e.target.files[0]);
  };

  const handleEquifaxUpload = (e) => {
    dispatch(setClient(null));
    setEquifax(e.target.files[0]);
  };

  const handleResetClicked = () => {
    dispatch(reset);
    setExperian([]);
    setTransUnion([]);
    setEquifax([]);
    setShowForm(false);
    setShowExperian(false);
    setShowTransUnion(false);
    setShowEquifax(false);
  };

  const information = !showForm ? (
    <Information
      setShowForm={setShowForm}
      setShowEquifax={setShowEquifax}
      setShowExperian={setShowExperian}
      setShowTransUnion={setShowTransUnion}
    />
  ) : null;

  const experianInputs = showExperian ? (
    <div className="inputContainer">
      <label htmlFor="Experian">Upload Experian File</label>
      <input
        id="Experian"
        type="file"
        onChange={handleExperianUpload}
        required
      />
    </div>
  ) : null;

  const transUnionInputs = showTransUnion ? (
    <div className="inputContainer">
      <label htmlFor="Transunion">Upload TransUnion File</label>
      <input
        id="TransUnion"
        type="file"
        onChange={handleTransUnionUpload}
        required
      />
    </div>
  ) : null;

  const equifaxInputs = showEquifax ? (
    <div className="inputContainer">
      <label htmlFor="Equifax">Upload Equifax File</label>
      <input id="Equifax" type="file" onChange={handleEquifaxUpload} required />
    </div>
  ) : null;

  const form = showForm ? (
    <form
      action="/"
      method="post"
      encType="multipart/form-data"
      onSubmit={handleSubmit}
      className="fileUpload"
    >
      <h2>Credit Report Upload Form</h2>
      <fieldset className="uploads">
        {experianInputs}
        {transUnionInputs}
        {equifaxInputs}
      </fieldset>

      <div className="buttonContainer">
        <button className="formButton" onClick={handleSubmit}>
          Upload
        </button>
        <button
          className="formButton"
          type="button"
          onClick={handleResetClicked}
        >
          Reset
        </button>
      </div>
    </form>
  ) : null;

  const modal = showModal ? (
    <div className="overlay">
      {information}
      {form}
    </div>
  ) : null;

  return modal;
};

export default FileUpload;
