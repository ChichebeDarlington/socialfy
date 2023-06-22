import { useState, createContext, useEffect, useContext } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [state, setState] = useState({
    user: {},
    token: "",
  });

  useEffect(() => {
    setState(JSON.parse(localStorage.getItem("auth")));
  }, []);

  return (
    <UserContext.Provider value={{ state, setState }}>
      {children}
    </UserContext.Provider>
  );
};

export const useStateContext = () => useContext(UserContext);

export { UserContext, UserProvider };
