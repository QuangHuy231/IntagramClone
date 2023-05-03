import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get(`/auth/get-user`).then(({ data }) => {
      setUser(data);
    });
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, searchTerm, setSearchTerm }}>
      {children}
    </UserContext.Provider>
  );
}
