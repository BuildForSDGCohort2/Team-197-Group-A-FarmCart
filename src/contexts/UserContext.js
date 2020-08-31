import React, { createContext } from "react";

export const UserContext = createContext([]);

const SetUserContext = ({ children }) => {
  // Yet to replace with actual user.
  const user = "team-197-group-a";

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
}; // setUserContext

const UserProvider = SetUserContext;

export default UserProvider;
