'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useGetClientByIdQuery } from '@/lib/redux/features/clients/clientApiSlicev2';
import { SingleClient } from '@/_types/clients';

interface ClientDashboardContextType {
  client: SingleClient | undefined;
  isLoading: boolean;
  error: any;
}

const ClientDashboardContext = createContext<ClientDashboardContextType | undefined>(undefined);

export const useClient = () => {
  const context = useContext(ClientDashboardContext);
  if (context === undefined) {
    throw new Error('useClient must be used within a ClientDashboardProvider');
  }
  return context;
};

interface ClientDashboardProviderProps {
  children: ReactNode;
  clientId: string;
}

export default function ClientDashboardProvider({ children, clientId }: ClientDashboardProviderProps) {
  const { data: client, isLoading, error } = useGetClientByIdQuery(clientId);

  return (
    <ClientDashboardContext.Provider value={{ client, isLoading, error }}>
      {children}
    </ClientDashboardContext.Provider>
  );
}
