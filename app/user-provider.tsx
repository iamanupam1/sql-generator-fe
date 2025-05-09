"use client";
import { createContext, useState, useContext, ReactNode, FC } from "react";
import { ConnectionDetails, User } from "./types";

interface UserDatabase {
  connection: ConnectionDetails;
  collections: any[];
}

interface UserContextType {
  user: User | null;
  userDatabase: UserDatabase | null;
  connectDB: (userData: UserDatabase) => void;
  disconnectDB: () => void;
}

interface ContextProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextType>({
  user: null,
  userDatabase: null,
  connectDB: () => {},
  disconnectDB: () => {},
});

export const ContextProvider: FC<ContextProviderProps> = ({ children }) => {
  const [userDatabase, setUserDatabase] = useState<UserDatabase | null>(null);

  const connectDB = (userData: UserDatabase) => {
    setUserDatabase(userData);
  };

  const disconnectDB = () => {
    setUserDatabase(null);
  };

  return (
    <UserContext.Provider value={{ userDatabase, connectDB, disconnectDB }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserDatabase = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserDatabase must be used within a ContextProvider");
  }

  return context;
};
