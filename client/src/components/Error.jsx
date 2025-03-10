import { useSelector } from "react-redux";
import { selectCurrentSource } from "../clientSlice";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  const handleNewReport = () => {
    navigate("/");
  };

  const source = useSelector(selectCurrentSource);

  let experian;
  let transUnion;
  let equifax;
  if (source.length) {
    experian = source[0];
    transUnion = source[1];
    equifax = source[2];
  }

  return (
    <div className="error">
      <h1 className="errorTitle">
        One or more credit reports you are uploading are not compatible with
        this software.
      </h1>
      <h2 className="errorTitle">Please check the source and try again.</h2>
      <h3 className="errorDescription">
        Credit reports with errors:{" "}
        {experian === false ? (
          <span className="errorBureau">Experian </span>
        ) : null}
        {transUnion === false ? (
          <span className="errorBureau">TransUnion </span>
        ) : null}
        {equifax === false ? (
          <span className="errorBureau">Equifax</span>
        ) : null}
      </h3>

      <button onClick={handleNewReport} className="newButton">
        Try Again
      </button>
    </div>
  );
};

export default Error;
