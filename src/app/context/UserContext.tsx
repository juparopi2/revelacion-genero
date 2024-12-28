"use client";

import { createContext, useContext, useState, useEffect } from "react";

export interface User {
  nombre: string;
  celular: string;
  genero: string;
}

const UserContext = createContext({} as any);

export const UserContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<User>({
    nombre: "",
    celular: "",
    genero: "",
  });

  useEffect(() => {
    if (user.genero != "") {
      document.documentElement.classList["add"](user.genero);
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
