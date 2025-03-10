import { useNavigate } from "react-router-dom";
import useOptions from "../../hooks/useOptions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { reset } from "../../clientSlice";

const Information = () => {
  const {
    setShowExperian,
    setShowTransUnion,
    setShowEquifax,
    showExperian,
    showTransUnion,
    showEquifax,
  } = useOptions();
  const dispatch = useDispatch();

  useEffect(() => {
    setShowExperian(false);
    setShowTransUnion(false);
    setShowTransUnion(false);
    dispatch(reset());
  }, []);
  const navigate = useNavigate();
  const handleShowForm = (e) => {
    e.preventDefault();
    navigate("upload");
  };

  const handleExperianChecked = () => {
    setShowExperian((prev) => !prev);
  };

  const handleTransUnionChecked = () => {
    setShowTransUnion((prev) => !prev);
  };

  const handleEquifaxChecked = () => {
    setShowEquifax((prev) => !prev);
  };

  return (
    <div className="overlay">
      <form onSubmit={handleShowForm} className="infoSelect">
        <p>Which credit reports are you uploading?</p>
        <div className="checkContainer">
          <input
            type="checkbox"
            name="experian"
            id="experian"
            onChange={handleExperianChecked}
            checked={showExperian}
          />
          <label htmlFor="experian">Experian</label>
        </div>
        <div className="checkContainer">
          <input
            type="checkbox"
            name="transUnion"
            id="transUnion"
            onChange={handleTransUnionChecked}
            checked={showTransUnion}
          />
          <label htmlFor="transUnion">TransUnion</label>
        </div>
        <div className="checkContainer">
          <input
            type="checkbox"
            name="equifax"
            id="equifax"
            onChange={handleEquifaxChecked}
            checked={showEquifax}
          />
          <label htmlFor="equifax">Equifax</label>
        </div>
        <button className="infoButton">Prepare Upload</button>
      </form>
    </div>
  );
};

export default Information;
