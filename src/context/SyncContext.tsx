import React, { createContext, ReactNode, useContext } from "react";
import { useConnectivity } from "../hooks/useConnectivity";
import { useSyncOfflineData } from "../hooks/useSyncOfflineData";

// Tipo do contexto de sincronização
interface SyncContextType {
  isOnline: boolean;
  isSyncing: boolean;
  pendingActionsCount: number;
  lastSyncError: Error | null;
  manualSync: () => void;
}

// Criando o contexto
const SyncContext = createContext<SyncContextType | null>(null);

// Hook para acessar o contexto
export const useSync = (): SyncContextType => {
  const context = useContext(SyncContext);
  if (!context) {
    throw new Error("useSync deve ser usado dentro de um SyncProvider");
  }
  return context;
};

interface SyncProviderProps {
  children: ReactNode;
}

// Componente Provider
export const SyncProvider: React.FC<SyncProviderProps> = ({ children }) => {
  const { isOnline } = useConnectivity();
  const { isSyncing, pendingActionsCount, lastSyncError, manualSync } =
    useSyncOfflineData();

  // Valor do contexto
  const value = {
    isOnline,
    isSyncing,
    pendingActionsCount,
    lastSyncError,
    manualSync,
  };

  return <SyncContext.Provider value={value}>{children}</SyncContext.Provider>;
};
