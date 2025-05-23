import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <nav>
        <ul>
          <Link to="/home">Home</Link>
          <Link to="/clients">Client List</Link>
          <Link to="/clients/new">New Client</Link>
          <Link to="/admin">Admin</Link>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
