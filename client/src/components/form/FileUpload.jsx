import axios from "axios";
import { useState } from "react";
import { formatData } from "../../util/formatClient";
import { useDispatch } from "react-redux";
import { setLogistics, setSource, reset } from "../../clientSlice";
import { PulseLoader } from "react-spinners";
import useOptions from "../../hooks/useOptions";
import { useNavigate } from "react-router-dom";
import { determinePDFSource } from "../../util/universalHelpers";

const FileUpload = () => {
  const [experianReport, setExperianReport] = useState([]);
  const [transUnionReport, setTransUnionReport] = useState([]);
  const [equifaxReport, setEquifaxReport] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { showExperian, showTransUnion, showEquifax } = useOptions();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      (showExperian && !experianReport.name) ||
      (showTransUnion && !transUnionReport.name) ||
      (showEquifax && !equifaxReport.name) ||
      (!experianReport.name && !transUnionReport.name && !equifaxReport.name)
    ) {
      alert("Please upload a credit report to continue");
      return;
    }
    setIsLoading(true);
    const formData = new FormData();

    const config = { headers: { "Content-Type": "multipart/form-data" } };
    //dev url
    /*    let postUrl = "http://localhost:3500"; */

    //production url
    let postUrl = "https://boge-cpi.onrender.com/api";

    //determine which options are selected
    if (experianReport.name && !transUnionReport.name && !equifaxReport.name) {
      formData.append("Experian", experianReport);
      postUrl += "/experian";
    }
    if (transUnionReport.name && !experianReport.name && !equifaxReport.name) {
      formData.append("TransUnion", transUnionReport);
      postUrl += "/transunion";
    }
    if (equifaxReport.name && !experianReport.name && !transUnionReport.name) {
      formData.append("Equifax", equifaxReport);
      postUrl += "/equifax";
    }
    if (experianReport.name && transUnionReport.name && !equifaxReport.name) {
      formData.append("Experian", experianReport);
      formData.append("TransUnion", transUnionReport);
      postUrl += "/multi";
    }
    if (experianReport.name && equifaxReport.name && !transUnionReport.name) {
      formData.append("Experian", experianReport);
      formData.append("Equifax", equifaxReport);
      postUrl += "/multi";
    }
    if (transUnionReport.name && equifaxReport.name && !experianReport.name) {
      formData.append("TransUnion", transUnionReport);
      formData.append("Equifax", equifaxReport);
      postUrl += "/multi";
    }
    if (experianReport.name && transUnionReport.name && equifaxReport.name) {
      formData.append("Experian", experianReport);
      formData.append("TransUnion", transUnionReport);
      formData.append("Equifax", equifaxReport);
    }

    const results = await axios.post(postUrl, formData, config);

    const { data } = results;

    const client = {};
    const source = {};

    data.experian ? (source.experian = data.experian.info) : null;
    data.transUnion ? (source.transUnion = data.transUnion.info) : null;
    data.equifax ? (source.equifax = data.experian.equifax) : null;

    const sourceArray = determinePDFSource(source);
    if (sourceArray.includes(false)) {
      dispatch(setSource(sourceArray));
      setIsLoading(false);
      return navigate("/error");
    }

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
        source: sourceArray,
      })
    );
    setIsLoading(false);
    navigate("/summary");
  };

  const handleExperianUpload = (e) => {
    setExperianReport(e.target.files[0]);
  };

  const handleTransUnionUpload = (e) => {
    setTransUnionReport(e.target.files[0]);
  };

  const handleEquifaxUpload = (e) => {
    setEquifaxReport(e.target.files[0]);
  };

  const handleResetClicked = () => {
    dispatch(reset());
    setExperianReport([]);
    setTransUnionReport([]);
    setEquifaxReport([]);
    navigate("/");
  };

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
      <label htmlFor="TransUnion">Upload TransUnion File</label>
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

  const form = (
    <div className="overlay">
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
    </div>
  );

  const rendered = isLoading ? <PulseLoader color={"#000"} /> : form;

  return rendered;
};

export default FileUpload;
