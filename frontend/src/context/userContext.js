import { createContext, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <UserContext.Provider value={{ user, setUser, searchTerm, setSearchTerm }}>
      {children}
    </UserContext.Provider>
  );
}
