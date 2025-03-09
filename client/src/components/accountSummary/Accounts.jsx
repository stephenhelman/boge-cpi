import Account from "./accountRow/Account";
import LateAccount from "./accountRow/LateAccount";

const Accounts = ({ accounts, identifier }) => {
  let renderedAccounts;

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

  if (identifier !== "Accounts Ever Late") {
    renderedAccounts = accounts.map((account, index) => {
      return <Account account={account} key={index} />;
    });
  } else {
    renderedAccounts = accounts.map((account, index) => {
      return <LateAccount account={account} key={index} />;
    });
  }

  return <tbody>{renderedAccounts}</tbody>;
};

export default Accounts;
