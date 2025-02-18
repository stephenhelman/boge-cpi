const NameCell = ({ name, responsibility }) => {
  if (responsibility === "Authorized User") {
    return (
      <td className="nameCell">
        <div>{name}</div>
        <div className="authorizedUser">{responsibility}</div>
      </td>
    );
  }
  return <td className="accountsRow ">{name}</td>;
};

export default NameCell;
