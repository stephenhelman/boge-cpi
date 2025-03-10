import { useContext } from "react";
import OptionsContext from "../components/context/OptionsProvider";

// allows us to use auth context in other parts of the app using a custom hook
const useOptions = () => {
  return useContext(OptionsContext);
};

export default useOptions;
