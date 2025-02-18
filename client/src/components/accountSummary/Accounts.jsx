import Account from "./accountRow/Account";

const Accounts = ({ accounts, identifier }) => {
  if (!accounts.length) {
    return (
      <tbody>
        <tr>
          <td
            colSpan="11"
            className="noPaymentHistory"
          >{`${identifier}: None Present `}</td>
        </tr>
      </tbody>
    );
  }
  const renderedAccounts = accounts.map((account, index) => {
    return <Account account={account} key={index} />;
  });
  return <tbody>{renderedAccounts}</tbody>;
};

export default Accounts;
