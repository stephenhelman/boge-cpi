const Information = ({
  setShowForm,
  setShowExperian,
  setShowTransUnion,
  setShowEquifax,
}) => {
  const handleShowForm = (e) => {
    e.preventDefault();
    setShowForm(true);
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
    <form onSubmit={handleShowForm} className="infoSelect">
      <p>Which credit reports are you uploading?</p>
      <div className="checkContainer">
        <input
          type="checkbox"
          name="experian"
          id="experian"
          onChange={handleExperianChecked}
        />
        <label htmlFor="experian">Experian</label>
      </div>
      <div className="checkContainer">
        <input
          type="checkbox"
          name="transUnion"
          id="transUnion"
          onChange={handleTransUnionChecked}
        />
        <label htmlFor="transUnion">TransUnion</label>
      </div>
      <div className="checkContainer">
        <input
          type="checkbox"
          name="equifax"
          id="equifax"
          onChange={handleEquifaxChecked}
        />
        <label htmlFor="equifax">Equifax</label>
      </div>
      <button className="infoButton">Prepare Upload</button>
    </form>
  );
};

export default Information;
