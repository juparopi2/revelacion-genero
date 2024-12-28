"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  nombre: string;
  celular: string;
  genero: string;
}

const UserContext = createContext(
  {} as { user: User; setUser: React.Dispatch<React.SetStateAction<User>> }
);

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
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
