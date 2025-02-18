import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectCurrentBureau, setBureau } from "../../clientSlice";

const BureauButtons = ({ transUnion, equifax, experian }) => {
  const dispatch = useDispatch();
  const bureau = useSelector(selectCurrentBureau);
  const activeClass = "active";

  const onExperianClick = () => dispatch(setBureau("Experian"));
  const onTransUnionClick = () => dispatch(setBureau("TransUnion"));
  const onEquifaxClick = () => dispatch(setBureau("Equifax"));

  const experianButton = experian ? (
    <button
      className={`bureauButton ${bureau === "Experian" ? activeClass : ""}`}
      onClick={onExperianClick}
    >
      Experian
    </button>
  ) : null;

  const transUnionButton = transUnion ? (
    <button
      className={`bureauButton ${bureau === "TransUnion" ? activeClass : ""}`}
      onClick={onTransUnionClick}
    >
      TransUnion
    </button>
  ) : null;

  const equifaxButton = equifax ? (
    <button
      className={`bureauButton ${bureau === "Equifax" ? activeClass : ""}`}
      onClick={onEquifaxClick}
    >
      Equifax
    </button>
  ) : null;
  return (
    <div className="buttonsContainer">
      {experianButton}
      {transUnionButton}
      {equifaxButton}
    </div>
  );
};

export default BureauButtons;
