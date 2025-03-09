import { useDispatch } from "react-redux";
import { reset } from "../clientSlice";
import { useSelector } from "react-redux";
import { selectCurrentSource } from "../clientSlice";
import { determinePDFSource } from "../util/universalHelpers";

const Error = ({ setShowModal }) => {
  const dispatch = useDispatch();
  const handleNewReport = () => {
    dispatch(reset());
    setShowModal(true);
  };

  const source = useSelector(selectCurrentSource);
  const pdfSource = determinePDFSource(source);

  const experian = pdfSource[0];
  const transUnion = pdfSource[1];
  const equifax = pdfSource[2];

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
