import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";

const OptionsContext = createContext({});

export const OptionsProvider = ({ children }) => {
  const [showExperian, setShowExperian] = useState(false);
  const [showTransUnion, setShowTransUnion] = useState(false);
  const [showEquifax, setShowEquifax] = useState(false);

  return (
    <OptionsContext.Provider
      value={{
        showExperian,
        showTransUnion,
        showEquifax,
        setShowExperian,
        setShowTransUnion,
        setShowEquifax,
      }}
    >
      <Outlet>{children}</Outlet>
    </OptionsContext.Provider>
  );
};

export default OptionsContext;
