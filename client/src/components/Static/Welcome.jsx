import Login from "./Login";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div>
      <h1>
        Welcome to the <span>Boge Group</span> CPI Sheet Generator
      </h1>
      <p>Please Login or Register Below</p>
      <Login />
      <Link to="/register">Register</Link>
    </div>
  );
};

export default Welcome;
