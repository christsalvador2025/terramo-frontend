"use client";

import React, { createContext, useContext, ReactNode } from "react";
// import { Client } from "@/types/client";
import { Client } from "@/components/client/dashboard/types/client"

interface ClientContextType {
  client: Client;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

interface ClientProviderProps {
  children: ReactNode;
  client: Client;
}

export const ClientProvider: React.FC<ClientProviderProps> = ({
  children,
  client,
}) => {
  return (
    <ClientContext.Provider value={{ client }}>
      {children}
    </ClientContext.Provider>
  );
};

export const useClient = (): Client => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error("useClient must be used within a ClientProvider");
  }
  return context.client;
};
