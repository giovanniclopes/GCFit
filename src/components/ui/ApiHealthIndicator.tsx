import { useApolloClient } from "@apollo/client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useConnectivity } from "../../hooks/useConnectivity";
import { checkApiHealth } from "../../services/apollo";

interface ApiHealthIndicatorProps {
  className?: string;
}

/**
 * Componente que mostra o estado da conexão com a API GraphQL
 */
const ApiHealthIndicator: React.FC<ApiHealthIndicatorProps> = ({
  className = "",
}) => {
  const client = useApolloClient();
  const { isOnline } = useConnectivity();
  const [isApiHealthy, setIsApiHealthy] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState<boolean>(false);

  useEffect(() => {
    // Verificar o estado da API quando o componente montar ou quando a conexão mudar
    if (isOnline && !isChecking) {
      checkApiStatus();
    }

    // Verificar periodicamente (a cada 60 segundos)
    const interval = setInterval(() => {
      if (isOnline && !isChecking) {
        checkApiStatus();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [isOnline]);

  const checkApiStatus = async () => {
    setIsChecking(true);
    try {
      const isHealthy = await checkApiHealth(client);
      setIsApiHealthy(isHealthy);
    } catch (error) {
      setIsApiHealthy(false);
    } finally {
      setIsChecking(false);
    }
  };

  // Se ainda não verificamos o estado ou estamos verificando, mostrar um indicador neutro
  if (isApiHealthy === null || isChecking) {
    return (
      <div className={`flex items-center ${className}`}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="w-3 h-3 bg-yellow-400 rounded-full mr-2"
        />
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Verificando API...
        </span>
      </div>
    );
  }

  // Se a API estiver saudável
  if (isApiHealthy) {
    return (
      <div className={`flex items-center ${className}`}>
        <div className="w-3 h-3 bg-green-500 rounded-full mr-2" />
        <span className="text-xs text-gray-500 dark:text-gray-400">
          API conectada
        </span>
      </div>
    );
  }

  // Se a API não estiver saudável
  return (
    <div className={`flex items-center ${className}`}>
      <div className="w-3 h-3 bg-red-500 rounded-full mr-2" />
      <span className="text-xs text-gray-500 dark:text-gray-400">
        API desconectada
      </span>
      <button
        onClick={checkApiStatus}
        disabled={isChecking}
        className="ml-2 text-xs text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
      >
        Tentar novamente
      </button>
    </div>
  );
};

export default ApiHealthIndicator;
