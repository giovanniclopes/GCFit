import { useEffect, useState } from "react";

/**
 * Hook para monitorar a conectividade da internet do usuário
 * @returns Um objeto com informações sobre o estado da conexão
 */
export function useConnectivity() {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [wasOffline, setWasOffline] = useState<boolean>(false);
  const [reconnectedAt, setReconnectedAt] = useState<Date | null>(null);

  useEffect(() => {
    // Handler para quando o usuário fica offline
    const handleOffline = () => {
      setIsOnline(false);
      setWasOffline(true);
    };

    // Handler para quando o usuário fica online novamente
    const handleOnline = () => {
      setIsOnline(true);
      if (wasOffline) {
        setReconnectedAt(new Date());
      }
    };

    // Registrar os event listeners
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Limpeza ao desmontar o componente
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [wasOffline]);

  return {
    isOnline,
    wasOffline,
    reconnectedAt,
    /**
     * Redefine o estado de wasOffline para false após uma sincronização
     */
    clearReconnectionState: () => {
      setWasOffline(false);
      setReconnectedAt(null);
    },
  };
}
